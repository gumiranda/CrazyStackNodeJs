module.exports = {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  setupFiles: ["dotenv/config"],
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!**/test/**",
    "!**/index.ts",
    "!**/*test.ts",
    "!**/*spec.ts",
    "!**/*specdb.ts",
  ],
  preset: "@shelf/jest-mongodb",
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
