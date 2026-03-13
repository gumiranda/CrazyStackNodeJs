import { Glob } from "bun";

const CONCURRENCY = parseInt(process.env.TEST_CONCURRENCY ?? "4", 10);

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
async function runTest(file: string): Promise<TestResult> {
  const start = performance.now();
  const proc = Bun.spawn(["bun", "test", file], {
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
      const result = await runTest(file);
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

process.exit(failedFiles.length > 0 ? 1 : 0);
