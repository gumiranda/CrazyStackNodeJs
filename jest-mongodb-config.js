module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: "4.0.3", // Version 4.0.3 is the latest stable release
        skipMD5: true,
      },
        instance: {},
        autoStart: false,
    },
    useSharedDBForAllJestWorkers:false
};
