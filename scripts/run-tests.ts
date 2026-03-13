import { Glob } from "bun";
import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "fs";
import path from "path";

const CONCURRENCY = parseInt(process.env.TEST_CONCURRENCY ?? "4", 10);
const COVERAGE = process.argv.includes("--coverage");
const COVERAGE_DIR = path.resolve("coverage");

interface TestResult {
  file: string;
  passed: number;
  failed: number;
  errors: number;
  exitCode: number;
  duration: number;
  output: string;
}

// Phase 1: Discover test files
const glob = new Glob("**/*.spec.ts");
const files: string[] = [];
for await (const file of glob.scan({ cwd: "src", absolute: false })) {
  files.push(`src/${file}`);
}
files.sort();
console.log(`Found ${files.length} test files. Running with concurrency=${CONCURRENCY}...\n`);

// Phase 2: Run each file in isolated subprocess
if (COVERAGE) {
  rmSync(COVERAGE_DIR, { recursive: true, force: true });
  mkdirSync(COVERAGE_DIR, { recursive: true });
}

async function runTest(file: string, index: number): Promise<TestResult> {
  const start = performance.now();
  const args = ["bun", "test", file];
  if (COVERAGE) {
    args.push("--coverage", "--coverage-reporter=lcov", `--coverage-dir=${path.join(COVERAGE_DIR, `part-${index}`)}`);
  }
  const proc = Bun.spawn(args, {
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env },
  });
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;
  const output = stdout + stderr;
  // Match bun test summary lines (e.g. " 5 pass", " 0 fail", " 1 error")
  // These appear at start of line with leading space(s)
  const passMatch = output.match(/^\s+(\d+)\s+pass$/m);
  const failMatch = output.match(/^\s+(\d+)\s+fail$/m);
  const errorMatch = output.match(/^\s+(\d+)\s+error$/m);
  return {
    file,
    passed: passMatch ? parseInt(passMatch[1], 10) : 0,
    failed: failMatch ? parseInt(failMatch[1], 10) : 0,
    errors: errorMatch ? parseInt(errorMatch[1], 10) : 0,
    exitCode,
    duration: performance.now() - start,
    output,
  };
}

async function runAll(): Promise<TestResult[]> {
  const results: TestResult[] = [];
  let idx = 0;
  const startTime = performance.now();

  async function worker() {
    while (idx < files.length) {
      const i = idx++;
      if (i >= files.length) break;
      const file = files[i];
      const result = await runTest(file, i);
      results.push(result);
      if (result.exitCode !== 0) {
        console.log(`  FAIL [${i + 1}/${files.length}] ${file} (${result.failed} failed, ${result.errors} errors)`);
      } else {
        process.stdout.write(`\r  PASS [${i + 1}/${files.length}] ${file}${"".padEnd(20)}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
  return results;
}

// Phase 3: Execute and report
const startTime = performance.now();
const results = await runAll();
const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);

const totalPass = results.reduce((s, r) => s + r.passed, 0);
const totalFail = results.reduce((s, r) => s + r.failed, 0);
const totalErrors = results.reduce((s, r) => s + r.errors, 0);
const failedFiles = results.filter((r) => r.exitCode !== 0);

console.log(`\n\n${"=".repeat(60)}`);
console.log(`  ${files.length} files | ${totalPass} pass | ${totalFail} fail | ${totalErrors} errors`);
console.log(`  ${failedFiles.length} files failed | ${elapsed}s`);
console.log("=".repeat(60));

if (failedFiles.length > 0) {
  console.log("\nFAILURES:\n");
  for (const f of failedFiles) {
    console.log(`--- ${f.file} (${f.failed} fail, ${f.errors} errors) ---`);
    console.log(f.output);
  }
}

// Phase 4: Merge coverage, generate HTML report, and open in browser
if (COVERAGE) {
  console.log("\nMerging coverage reports...");
  let merged = "";
  const glob2 = new Glob("part-*/lcov.info");
  for await (const file of glob2.scan({ cwd: COVERAGE_DIR, absolute: true })) {
    try {
      merged += readFileSync(file, "utf-8") + "\n";
    } catch {}
  }
  if (!merged) {
    console.log("No coverage data collected.");
  } else {
    const lcovPath = path.join(COVERAGE_DIR, "lcov.info");
    writeFileSync(lcovPath, merged);

    // Parse lcov into per-file stats
    // Strategy: collect all parts per file, then merge using "best part" approach
    // to avoid instrumentation artifacts from inflating uncovered line counts
    interface FileCov {
      linesFound: number;
      linesHit: number;
      fnFound: number;
      fnHit: number;
      lineHits: Map<number, number>;
    }
    interface PartData {
      lineHits: Map<number, number>;
      fnFound: number;
      fnHit: number;
    }
    // Collect all parts per file
    const fileParts = new Map<string, PartData[]>();
    let currentFile = "";
    let currentLines = new Map<number, number>();
    let fnf = 0, fnh = 0;

    for (const line of merged.split("\n")) {
      if (line.startsWith("SF:")) {
        currentFile = line.slice(3).replace(/\\/g, "/");
        currentLines = new Map();
        fnf = 0; fnh = 0;
      } else if (line.startsWith("DA:")) {
        const [ln, cnt] = line.slice(3).split(",").map(Number);
        currentLines.set(ln, Math.max(currentLines.get(ln) ?? 0, cnt));
      } else if (line.startsWith("FNF:")) {
        fnf = parseInt(line.slice(4), 10);
      } else if (line.startsWith("FNH:")) {
        fnh = parseInt(line.slice(4), 10);
      } else if (line === "end_of_record" && currentFile) {
        if (!fileParts.has(currentFile)) {
          fileParts.set(currentFile, []);
        }
        fileParts.get(currentFile)!.push({
          lineHits: currentLines,
          fnFound: fnf,
          fnHit: fnh,
        });
        currentFile = "";
      }
    }

    // Merge parts per file using "best part" strategy
    const fileMap = new Map<string, FileCov>();
    for (const [file, parts] of fileParts) {
      // Find the part with highest coverage ratio to use as baseline
      let bestPart: PartData | null = null;
      let bestRatio = -1;
      for (const part of parts) {
        const total = part.lineHits.size;
        const hit = [...part.lineHits.values()].filter(v => v > 0).length;
        const ratio = total > 0 ? hit / total : 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestPart = part;
        }
      }
      // Start with the best part's line set
      const mergedHits = new Map(bestPart!.lineHits);
      let maxFnf = bestPart!.fnFound;
      let maxFnh = bestPart!.fnHit;
      // Merge in covered lines from other parts
      for (const part of parts) {
        maxFnf = Math.max(maxFnf, part.fnFound);
        maxFnh = Math.max(maxFnh, part.fnHit);
        for (const [ln, cnt] of part.lineHits) {
          const prev = mergedHits.get(ln);
          if (prev !== undefined) {
            mergedHits.set(ln, Math.max(prev, cnt));
          } else if (cnt > 0) {
            // Only add new lines if they were actually hit
            mergedHits.set(ln, cnt);
          }
        }
      }
      fileMap.set(file, {
        linesFound: mergedHits.size,
        linesHit: [...mergedHits.values()].filter(v => v > 0).length,
        fnFound: maxFnf,
        fnHit: maxFnh,
        lineHits: mergedHits,
      });
    }

    // Aggregate by folder
    interface FolderCov { lf: number; lh: number; files: number; }
    const folders = new Map<string, FolderCov>();
    let totalLF = 0, totalLH = 0;

    for (const [file, cov] of fileMap) {
      totalLF += cov.linesFound;
      totalLH += cov.linesHit;
      const folder = file.includes("/") ? file.slice(0, file.lastIndexOf("/")) : ".";
      const f = folders.get(folder) ?? { lf: 0, lh: 0, files: 0 };
      f.lf += cov.linesFound;
      f.lh += cov.linesHit;
      f.files++;
      folders.set(folder, f);
    }

    const pct = (h: number, f: number) => f === 0 ? 100 : Math.round((h / f) * 10000) / 100;
    const totalPct = pct(totalLH, totalLF);
    const barColor = (p: number) => p >= 80 ? "#22c55e" : p >= 50 ? "#eab308" : "#ef4444";
    const badgeColor = (p: number) => p >= 80 ? "badge-high" : p >= 50 ? "badge-med" : "badge-low";

    // Sort files and folders
    const sortedFiles = [...fileMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const sortedFolders = [...folders.entries()].sort((a, b) => a[0].localeCompare(b[0]));

    // Terminal summary
    console.log(`\n  Coverage: ${totalLH}/${totalLF} lines (${totalPct}%)\n`);
    console.log("  Top uncovered folders:");
    for (const [folder, f] of sortedFolders.slice().sort((a, b) => pct(a[1].lh, a[1].lf) - pct(b[1].lh, b[1].lf)).slice(0, 10)) {
      const p = pct(f.lh, f.lf);
      console.log(`    ${p.toFixed(1).padStart(6)}%  ${folder} (${f.files} files)`);
    }

    // Generate HTML
    const fileRows = sortedFiles.map(([file, cov]) => {
      const p = pct(cov.linesHit, cov.linesFound);
      return `<tr>
        <td class="file-path">${file}</td>
        <td class="num">${cov.linesFound}</td>
        <td class="num">${cov.linesHit}</td>
        <td class="num"><span class="${badgeColor(p)}">${p.toFixed(1)}%</span></td>
        <td><div class="bar"><div class="bar-fill" style="width:${p}%;background:${barColor(p)}"></div></div></td>
      </tr>`;
    }).join("\n");

    const folderRows = sortedFolders.map(([folder, f]) => {
      const p = pct(f.lh, f.lf);
      return `<tr>
        <td class="file-path">${folder}/</td>
        <td class="num">${f.files}</td>
        <td class="num">${f.lf}</td>
        <td class="num">${f.lh}</td>
        <td class="num"><span class="${badgeColor(p)}">${p.toFixed(1)}%</span></td>
        <td><div class="bar"><div class="bar-fill" style="width:${p}%;background:${barColor(p)}"></div></div></td>
      </tr>`;
    }).join("\n");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Coverage Report — ${totalPct}%</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0f172a;color:#e2e8f0;padding:24px}
  h1{font-size:1.5rem;margin-bottom:4px}
  .summary{display:flex;gap:24px;align-items:center;margin:16px 0 24px;padding:16px;background:#1e293b;border-radius:8px}
  .big-pct{font-size:2.5rem;font-weight:700;color:${barColor(totalPct)}}
  .stat{display:flex;flex-direction:column;gap:2px}
  .stat-val{font-size:1.2rem;font-weight:600}
  .stat-label{font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em}
  .tabs{display:flex;gap:0;margin-bottom:0}
  .tab{padding:8px 20px;background:#1e293b;border:1px solid #334155;cursor:pointer;font-size:.85rem;color:#94a3b8}
  .tab:first-child{border-radius:8px 0 0 0}
  .tab:last-child{border-radius:0 8px 0 0}
  .tab.active{background:#334155;color:#f1f5f9;border-bottom-color:#334155}
  .panel{display:none;background:#1e293b;border:1px solid #334155;border-top:0;border-radius:0 0 8px 8px;overflow:auto;max-height:70vh}
  .panel.active{display:block}
  table{width:100%;border-collapse:collapse;font-size:.82rem}
  th{text-align:left;padding:8px 12px;background:#334155;color:#94a3b8;font-weight:600;position:sticky;top:0;text-transform:uppercase;font-size:.7rem;letter-spacing:.05em}
  td{padding:6px 12px;border-bottom:1px solid #1e293b}
  tr:hover td{background:#334155}
  .file-path{font-family:"Fira Code",monospace;font-size:.78rem;max-width:500px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .num{text-align:right;font-variant-numeric:tabular-nums}
  .bar{width:120px;height:8px;background:#334155;border-radius:4px;overflow:hidden}
  .bar-fill{height:100%;border-radius:4px;transition:width .3s}
  .badge-high{background:#166534;color:#86efac;padding:2px 8px;border-radius:4px;font-weight:600;font-size:.75rem}
  .badge-med{background:#854d0e;color:#fde047;padding:2px 8px;border-radius:4px;font-weight:600;font-size:.75rem}
  .badge-low{background:#991b1b;color:#fca5a5;padding:2px 8px;border-radius:4px;font-weight:600;font-size:.75rem}
  input[type=search]{background:#0f172a;border:1px solid #334155;color:#e2e8f0;padding:8px 12px;border-radius:6px;width:300px;margin:0 0 12px;font-size:.85rem}
  input[type=search]::placeholder{color:#64748b}
</style>
</head>
<body>
<h1>Coverage Report</h1>
<p style="color:#64748b;font-size:.85rem">Generated ${new Date().toLocaleString()} — ${fileMap.size} source files</p>

<div class="summary">
  <div class="big-pct">${totalPct}%</div>
  <div class="stat"><span class="stat-val">${totalLH.toLocaleString()} / ${totalLF.toLocaleString()}</span><span class="stat-label">Lines Covered</span></div>
  <div class="stat"><span class="stat-val">${fileMap.size}</span><span class="stat-label">Source Files</span></div>
  <div class="stat"><span class="stat-val">${sortedFolders.length}</span><span class="stat-label">Folders</span></div>
</div>

<div class="tabs">
  <div class="tab active" onclick="switchTab('files')">Files</div>
  <div class="tab" onclick="switchTab('folders')">Folders</div>
</div>

<div id="files" class="panel active">
  <div style="padding:12px 12px 0"><input type="search" id="filter" placeholder="Filter files..." oninput="filterFiles()"></div>
  <table>
    <thead><tr><th>File</th><th>Lines</th><th>Covered</th><th>Coverage</th><th></th></tr></thead>
    <tbody id="file-body">${fileRows}</tbody>
  </table>
</div>
<div id="folders" class="panel">
  <table>
    <thead><tr><th>Folder</th><th>Files</th><th>Lines</th><th>Covered</th><th>Coverage</th><th></th></tr></thead>
    <tbody>${folderRows}</tbody>
  </table>
</div>

<script>
function switchTab(id){
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===(id==='files'?0:1)));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id===id));
}
function filterFiles(){
  const q=document.getElementById('filter').value.toLowerCase();
  document.querySelectorAll('#file-body tr').forEach(r=>{
    r.style.display=r.children[0].textContent.toLowerCase().includes(q)?'':'none';
  });
}
</script>
</body>
</html>`;

    const htmlPath = path.join(COVERAGE_DIR, "index.html");
    writeFileSync(htmlPath, html);
    console.log(`\n  HTML report: ${htmlPath}`);

    // Open in browser
    const openCmd = process.platform === "win32" ? "cmd" : process.platform === "darwin" ? "open" : "xdg-open";
    const openArgs = process.platform === "win32" ? ["cmd", "/c", "start", "", htmlPath] : [openCmd, htmlPath];
    Bun.spawn(openArgs, { stdout: "ignore", stderr: "ignore" });
    console.log("  Opening in browser...\n");
  }
}

process.exit(failedFiles.length > 0 ? 1 : 0);
