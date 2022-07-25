import { Result, Test } from "./parse-json";
import stripAnsi from 'strip-ansi';

// import stripAnsi from "strip-ansi";
import { ResultStatus, TestStatus } from "./playwright-json";
import { md, numberToEmoji, printTable, wrapInDetails } from "./markdown-utils.js";

export function generateMarkdown(resultsByStatus: Record<TestStatus, Test[]>): string {
	return md`
		- ${statusToEmoji('expected')} ${resultsByStatus.expected.length} passed
		- ${statusToEmoji('skipped')} ${resultsByStatus.skipped.length} skipped
		- ${statusToEmoji('flaky')} ${resultsByStatus.flaky.length} flaky
		- ${statusToEmoji('unexpected')} ${resultsByStatus.unexpected.length} failed

		### ❌ Failed tests (${resultsByStatus.unexpected.length})
		${resultsByStatus.unexpected.map(printTest).join('\n\n---\n\n')}

		`;
}

function printTest(test: Test, index: number): string {
	return wrapInDetails(
		getTestTitle(test, index),
		md`
		${printResult(test.results[0])}

		${test.results.slice(1).map(r => wrapInDetails(`Retry ＃${r.retry}`, printResult(r))).join('')}
		`
	);
}

function printResult(result: Result): string {
	return md`
		${printResultTable(result)}

		${printResultError(result)}
		`;
}

function printResultTable(result: Result): string {
	const header = result.retry > 0 ? `${numberToEmoji(result.retry)} Retry ＃${result.retry}` : `${statusToEmoji(result.status)} First run`

	return printTable([
		[header, ''],
		['Project', result.test.projectName],
		['File', result.test.spec.file],
		['Title', result.test.spec.title],
		['Trace', '[trace.zip](https://google.com)'], // todo
	]);
}

function printResultError(result: Result): string {
	return md`
		#### Error
		<pre>
		${stripAnsi(result.error.stack) /*TODO replace ansi red/green colors with bold*/}
		</pre>
		`;
}

function getTestTitle(test: Test, index: number): string {
	return [`${index + 1}. ${statusToEmoji(test.status)} ${test.spec.suite.title}`, test.spec.title].join(' › ')
}

function statusToEmoji(status: TestStatus | ResultStatus) {
	switch (status) {
		case 'expected':
		case 'passed':
			return '✅';
		case 'unexpected':
		case 'failed':
			return '❌';
		case 'flaky':
			return '⏭';
		case 'skipped':
			return '🤞';
	}
}

