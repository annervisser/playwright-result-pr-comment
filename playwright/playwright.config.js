// @ts-check
const {devices} = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
	testDir: './tests',
	outputDir: '../example-result/traces',
	reporter: [
		['json', {outputFile: '../example-result/report.json'}],
		/*['html', { outputFolder: '../example-result/html', open: 'never' }]*/
	],
	use: {
		trace: 'on-first-retry',
	},
	retries: 1,

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		}
	]
};

module.exports = config;
