function zip<A, B>(a: Array<A>|ReadonlyArray<A>, b: Array<B>|ReadonlyArray<B>): Array<A | B> {
	return a.map((k, i) => [k, b[i]]).flat();
}

export function md(parts: TemplateStringsArray, ...args: any[]) {
	const substituted = zip(parts, args).join('');
	let lines = substituted.split('\n');
	if (lines.length && lines.at(-1)?.trim().length === 0) {
		//remove line-break at start
		lines = lines.slice(1);
	}

	if (lines.length > 1 && lines.at(-1)?.trim().length === 0) {
		const partToRemove = lines.at(-1) ?? '';
		lines = lines.slice(0, -1);
		lines = lines.map(l => l.startsWith(partToRemove) ? l.slice(partToRemove.length) : l);
	}
	return lines.join('\n');
}

export function wrapInDetails(summary: string, details: string) {
	return md`
		<details>
		<summary>${summary}</summary>

		${details.trim()}

		</details>
		`;
}

export function printTable(data: string[][]): string {
	const columnSizes: number[] = data
		.map(r => r.map(c => c.length))
		.reduce((acc, cur) => acc.map((p, i) => Math.max(p, cur[i] ?? -1)))

	const printLine = (row: string[]) => {
		return `| ${columnSizes.map((s, i) => (row[i] ?? '').padEnd(s)).join(' | ')} |`;
	};
	const rows = data.map(printLine);
	rows.splice(1, 0, `|${columnSizes.map((s) => '-'.repeat(s + 2)).join('|')}|`)
	return rows.join('\n');
}

export function numberToEmoji(number: number) {
	const numberEmoji: Record<number, string> = {
		0: '0️⃣',
		1: '1️⃣',
		2: '2️⃣',
		3: '3️⃣',
		4: '4️⃣',
		5: '5️⃣',
		6: '6️⃣',
		7: '7️⃣',
		8: '8️⃣',
		9: '9️⃣',
	};
	return [...number.toString()].map(c => numberEmoji[Number.parseInt(c)] ?? c).join('');
}
