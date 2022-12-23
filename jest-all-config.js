const config = require("./jest.config");
config.testMatch = ["**/**.specdb.ts", "**/**.test.ts", "**/**.spec.ts"];
module.exports = config;
