module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: "jest",
        },
        binary: {
            version: "4.0.3", // Version 4.0.3 is the latest stable release
            skipMD5: true,
        },
        autoStart: false,
    },
};
