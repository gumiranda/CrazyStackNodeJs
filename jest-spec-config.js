const config = require("./jest.config");
config.testMatch = ["**/**.spec.ts"];
config.maxWorkers = 2;
module.exports = config;
