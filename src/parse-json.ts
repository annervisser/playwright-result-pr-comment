import {
	PlaywrightJsonConfig,
	PlaywrightJsonReport,
	PlaywrightJsonResult,
	PlaywrightJsonSpec,
	PlaywrightJsonSuite,
	PlaywrightJsonTest
} from "./playwright-json";

export type Config = PlaywrightJsonConfig;

type Override<T, S> = Omit<T, keyof S> & S;
export type Suite = PlaywrightJsonSuite;
export type Spec = Override<PlaywrightJsonSpec, { suite: Suite }>;
export type Test = Override<PlaywrightJsonTest, { spec: Spec, results: Result[] }>;
export type Result = Override<PlaywrightJsonResult, { test: Test }>;

export function parseJson(json: string): {
	config: Config
	tests: Test[]
	errors: unknown[]
} {
	const report: PlaywrightJsonReport = JSON.parse(json);

	const tests: Test[] = [];

	for (const suite of report.suites) {
		for (const spec of suite.specs) {
			assign(spec, {suite});
			for (const test of spec.tests) {
				const results = test.results;
				assignArray(results, {test: test as Test});
				assign(test, {spec, results});
				tests.push(test);
			}
		}
	}

	return {
		config: report.config,
		tests,
		errors: report.errors,
	};
}

function assign<T, A>(target: T, source: A): asserts target is T & A {
	Object.assign(target, source);
}

function assignArray<T, A>(target: T[], source: A): asserts target is Array<T & A> {
	target.forEach(t => assign(t, source));
}
