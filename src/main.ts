import fs from "node:fs";
import { TestStatus } from "./playwright-json.js";
import { parseJson, Test } from "./parse-json.js";
import { generateMarkdown } from "./generate-markdown.js";

export function generateReport(jsonPath: string): string {
	const json = fs.readFileSync(jsonPath).toString();
	const report = parseJson(json);

	const resultsByStatus: Record<TestStatus, Test[]> = {
		skipped: [],
		expected: [],
		unexpected: [],
		flaky: [],
	}

	for (const test of report.tests) {
		resultsByStatus[test.status].push(test);
	}

	return generateMarkdown(resultsByStatus);
}
