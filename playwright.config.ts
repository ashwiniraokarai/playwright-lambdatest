import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    // glob pattern to match a single test
    // testMatch: ['tests/login.test.ts'],

    use: {
        headless: false,
        screenshot: 'on',
        video: 'on',
        launchOptions: {
            //slowMo: 2000,  
        },
    },
    // retries: 2,
    reporter: [['dot'], ['json', {
        outputFile: 'jsonReports/jsonReport.json'
    }], ['html', {
        open: 'never'
    }]],

};

export default config;
