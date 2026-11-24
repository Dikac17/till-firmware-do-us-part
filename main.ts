import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I take you as my partner, to update and to hold, in sickness and in low battery, until a factory reset do us part.";

// Gate validation (per RULES.txt): UTF-8 text, 1–200 chars, single line, not blank.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1–200 chars, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back verification: the file on disk must be byte-identical to the entry.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
