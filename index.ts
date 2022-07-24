import * as core from "@actions/core";
import * as fs from "fs";
import { PlaywrightJsonReport, Test, TestStatus } from "./src/types";

const jsonPath = core.getInput('playwright-json-path');
console.log('jsonPath is', jsonPath);
const json = fs.readFileSync(jsonPath).toString();
const report: PlaywrightJsonReport = JSON.parse(json);

console.table({
	version: report.config.version,
	workers: report.config.workers,
});

console.log('Projects:')
console.table(report.config.projects, ['name', 'retries', 'repeatEach']);

const results: Record<TestStatus, (Test & {title: string})[]> = {
	skipped: [],
	expected: [],
	unexpected: [],
	flaky: [],
}
for (const suite of report.suites) {
	for (const spec of suite.specs) {
		for (const test of spec.tests) {
			const title = [suite.title, spec.title].join(' › ');
			const testWithTitle = Object.assign({}, test, {title: title});
			results[test.status].push(testWithTitle);
		}
	}
}

console.log(`${results.expected.length} passed`);
console.log(`${results.skipped.length} skipped`);
console.log(`${results.flaky.length} flaky`);
console.log(`${results.unexpected.length} failed`);
for (const unexpected of results.unexpected) {
	console.log(unexpected.title);
	for (const result of unexpected.results) {
		console.log(`Retry ${result.retry}`)
		// console.log("\t\t" + result.error.message);
		console.log("" + result.error.stack);
	}
}
