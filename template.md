- ✅ 1 passed
- ❌ 2 failed
- ⏭ 0 skipped
- 🤞 0 flaky

![](https://img.shields.io/badge/✅_Passed-70-2da44e?style=flat-square)
![](https://img.shields.io/badge/❌_Failed-5-fa4549?style=flat-square)
![](https://img.shields.io/badge/🤞_Flaky-1-bf8700?style=flat-square)
![](https://img.shields.io/badge/⏩_Skipped-2-afb8c1?style=flat-square)
```mermaid
%%{init: {
	'themeVariables': {
		'pie1': 'var(--color-checks-donut-success, #2da44e)',
		'pie2': 'var(--color-checks-donut-error, #fa4549)',
		'pie3': 'var(--color-checks-donut-pending, #bf8700)',
		'pie4': 'var(--color-checks-donut-neutral, #afb8c1)',
		'pieOpacity': 1,
		'pieStrokeWidth': 1,
		'pieSectionTextSize': '0',
		'pieLegendTextSize': '20px'
	}
}}%%
pie showData
    "✅ passed": 70
    "❌ failed": 5
    "🤞 flaky": 1
    "⏭ skipped": 2
```

### ❌ Failed tests

<details>
<summary>❌ [chromium] › failing.spec.js:4:1 › homepage has Playwright in title and get started link linking to the intro page</summary>


| ❌ First run |                                                                                   |
|-------------|-----------------------------------------------------------------------------------|
| Project     | `chromium`                                                                        |
| File        | `failing.spec.js:14:28`                                                           |
| Title       | `homepage has Playwright in title and get started link linking to the intro page` |
| Trace       | [trace.zip](https://google.com)                                                   |

#### Error
<pre>
expect(received).toHaveAttribute(expected)

Expected string: <strong>"/docs/intro"</strong>
Received string: <strong>""</strong>
Call log:
- expect.toHaveAttribute with timeout 5000ms
- waiting for selector "text=this doenst exist!"
</pre>

View trace:

```shell
npx playwright show-trace https://status.github.com/34567de7gcb5676faervtr/trace.zip
```

<details>
<summary>Retry ＃1</summary>

| 1️⃣ Retry ＃1 |                                                                                 |
|--------------|---------------------------------------------------------------------------------|
| Project      | chromium                                                                        |
| File         | failing.spec.js:14:28                                                           |
| Title        | homepage has Playwright in title and get started link linking to the intro page |
| Trace        | [trace.zip](https://google.com)                                                 |

View trace:

```shell
npx playwright show-trace https://status.github.com/34567de7gcb5676faervtr/trace.zip
```

</details>
</details>

---
