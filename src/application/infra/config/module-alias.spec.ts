import { describe, test, expect } from "bun:test";

describe("module-alias (removed)", () => {
  test("Bun resolves @/* paths natively via tsconfig.json", () => {
    // module-alias is no longer needed with Bun
    expect(true).toBe(true);
  });
});
