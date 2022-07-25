import { Result, Test } from "./parse-json";
import stripAnsi from 'strip-ansi';

// import stripAnsi from "strip-ansi";
import { TestStatus } from "./playwright-json";
import { numberToEmoji, wrapInDetails } from "./markdown-utils.js";

export function generateMarkdown(
	resultsByStatus: Record<TestStatus, Test[]>
): string {
	return (`
- ${statusToEmoji('expected')} ${resultsByStatus.expected.length} passed
- ${statusToEmoji('skipped')} ${resultsByStatus.skipped.length} skipped
- ${statusToEmoji('flaky')} ${resultsByStatus.flaky.length} flaky
- ${statusToEmoji('unexpected')} ${resultsByStatus.unexpected.length} failed

### Failed tests
${resultsByStatus.unexpected.map(printTest).join('')}
`);
}

function printTest(test: Test): string {
	return wrapInDetails(
		getTestTitle(test),
		`
${printResult(test.results[0])}

${test.results.slice(1).map(r => `
${wrapInDetails(`Retry ＃${r.retry}`, printResult(r))}
`).join('')}
`);
}

function printResult(result: Result): string {
	return `
${printResultTable(result)}

${printResultError(result)}
	`;
}

function printResultTable(result: Result): string {
	const header = result.retry > 0 ? `${numberToEmoji(result.retry)} Retry ＃${result.retry}` : 'First run'

	return `
| ${header} |                                 |
|-----------|---------------------------------|
| Project   | ${result.test.projectName}      |
| File      | ${result.test.spec.file}        |
| Title     | ${result.test.spec.title}       |
| Trace     | [trace.zip](https://google.com) |
	`;
}

function printResultError(result: Result): string {
	return `
#### Error
<pre>
${stripAnsi(result.error.stack) /*TODO replace ansi red/green colors with bold*/}
</pre>

	`;
}

function getTestTitle(test: Test): string {
	return [`${statusToEmoji(test.status)} ${test.spec.suite.title}`, test.spec.title].join(' › ')
}

function statusToEmoji(status: TestStatus) {
	switch (status) {
		case 'expected':
			return '✅';
		case 'unexpected':
			return '❌';
		case 'flaky':
			return '⏭';
		case 'skipped':
			return '🤞';
	}
}

