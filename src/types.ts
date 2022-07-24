export interface PlaywrightJsonReport {
	config: Config;
	suites: Suite[];
	errors: unknown[];
}

export interface Config {
	forbidOnly: boolean;
	fullyParallel: boolean;
	globalSetup?: unknown;
	globalTeardown?: unknown;
	globalTimeout: number;
	grep: unknown;
	grepInvert?: unknown;
	maxFailures: number;
	metadata: unknown;
	preserveOutput: string;
	projects: Project[];
	reporter: string[][];
	reportSlowTests: {
		max: number;
		threshold: number;
	};
	rootDir: string;
	quiet: boolean;
	shard?: unknown;
	updateSnapshots: string;
	version: string;
	workers: number;
	webServer?: unknown;
	_webServers: unknown[];
	_globalOutputDir: string;
	_configDir: string;
	_testGroupsCount: number;
}

export interface Project {
	outputDir: string;
	repeatEach: number;
	retries: number;
	name: string;
	testDir: string;
	testIgnore: unknown[];
	testMatch: string[];
	timeout: number;
}

export interface Suite {
	title: string;
	file: string;
	line: number;
	column: number;
	specs: Spec[];
}

export interface Spec {
	title: string;
	ok: boolean;
	tags: unknown[];
	tests: Test[];
	file: string;
	line: number;
	column: number;
}

export type TestStatus = 'skipped' | 'expected' | 'unexpected' | 'flaky';

export interface Test {
	timeout: number;
	annotations: unknown[];
	expectedStatus: string;
	projectName: string;
	results: Result[];
	status: TestStatus;
}

export interface Result {
	workerIndex: number;
	status: string;
	duration: number;
	error: Error;
	stdout: Stdout[];
	stderr: unknown[];
	retry: number;
	attachments: Attachment[];
	errorLocation: ErrorLocation;
}

export interface Error {
	message: string;
	stack: string;
}

export interface Stdout {
	text: string;
}

export interface Attachment {
	name: string;
	contentType: string;
	path: string;
}

export interface ErrorLocation {
	file: string;
	column: number;
	line: number;
}

