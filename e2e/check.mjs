// The F4 service demo's end-to-end check (hulbu/hulbu#515). The station runs it as the `e2e` service; the
// flow's input `suite` arrives as HULBU_INPUT_SUITE.
import { existsSync, readFileSync } from "node:fs";

const suite = process.env.HULBU_INPUT_SUITE ?? "smoke";
if (!["smoke", "full"].includes(suite)) {
  console.log(`e2e: unknown suite ${suite}`);
  process.exit(2);
}
const last = readFileSync("DEMO.md", "utf8").trim().split("\n").at(-1) ?? "";
const run = /^Service demo, run (\S+)\.$/.exec(last)?.[1];
const want = `The end-to-end check passes for run ${run}.`;
if (!run || (existsSync("E2E.md") && readFileSync("E2E.md", "utf8").includes(want))) {
  console.log(`e2e ${suite}: passed`);
  process.exit(0);
}
console.log(`FAIL e2e ${suite}: E2E.md must contain the line "${want}".`);
console.log("Fix: add that line to E2E.md (create the file if it is missing), commit, push, and report done.");
process.exit(1);
