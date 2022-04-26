module.exports = {
    ci: {
        collect: {
            numberOfRuns: 1,
            staticDistDir: './.next',
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
