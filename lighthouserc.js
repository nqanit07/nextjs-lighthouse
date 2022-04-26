module.exports = {
    ci: {
        collect: {
            startServerCommand: "export PORT=3000 && yarn start",
            url: ["https://google.com"],
            numberOfRuns: 1,
            settings: {
                "configPath": "./.github/workflows/lighthouse-config.js"
            }
            
        },
        assert: {
            assertions: {
                "first-contentful-paint": ["warn", {maxNumericValue: 4000}],
            },
        },
        upload: {
            target: "temporary-public-storage"
        }
    }
}
