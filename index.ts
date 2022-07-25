import * as core from "@actions/core";
import { generateReport } from "./src/main.js";

const jsonPath = core.getInput('playwright-json-path');
const output = generateReport(jsonPath);
console.log(output);
