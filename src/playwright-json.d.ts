export interface PlaywrightJsonReport {
	config: PlaywrightJsonConfig;
	suites: PlaywrightJsonSuite[];
	errors: unknown[];
}

export interface PlaywrightJsonConfig {
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
	projects: PlaywrightJsonProject[];
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

export interface PlaywrightJsonProject {
	outputDir: string;
	repeatEach: number;
	retries: number;
	name: string;
	testDir: string;
	testIgnore: unknown[];
	testMatch: string[];
	timeout: number;
}

export interface PlaywrightJsonSuite {
	title: string;
	file: string;
	line: number;
	column: number;
	specs: PlaywrightJsonSpec[];
}

export interface PlaywrightJsonSpec {
	title: string;
	ok: boolean;
	tags: unknown[];
	tests: PlaywrightJsonTest[];
	file: string;
	line: number;
	column: number;
}

export type TestStatus = 'skipped' | 'expected' | 'unexpected' | 'flaky';

export interface PlaywrightJsonTest {
	timeout: number;
	annotations: unknown[];
	expectedStatus: string;
	projectName: string;
	results: PlaywrightJsonResult[];
	status: TestStatus;
}

export type ResultStatus = 'failed' | 'passed';

export interface PlaywrightJsonResult {
	workerIndex: number;
	status: ResultStatus;
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

