import { generateReport } from "./src/main.js";
import fs from "node:fs";

const jsonPath = './.github/example-report.json';
console.log('Generating report based on', jsonPath);
const output = generateReport(jsonPath);

const outputPath = './out.md';
console.log('Writing output to', outputPath);
fs.writeFileSync(outputPath, output);
