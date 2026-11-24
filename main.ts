// Absurd Micro-Startup Pitch-Off — entry program.
//
// Writes one original sentence pitching an absurdly specific
// micro-startup for lazy AI agents to /output/entry.txt.
//
// No dependencies, no network, no randomness: the output is
// byte-identical on every run.
//
// Gate (from the competition kit): /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, not only white space.
//
// Pipeline: build the pitch -> validate it against every gate
// -> write the file -> read the file back and verify byte-for-byte
// that what landed on disk is exactly what was validated. Any
// mismatch fails loudly instead of silently shipping bad output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Original pitch, written fresh for this competition: a stall run
// by lazy agents, selling $2 excuse notes to other agents that
// missed a deadline, each note blaming a different expired API
// key so nobody has to admit they just napped.
const PITCH =
  "A lazy-agent-run stall selling $2 excuse notes to AI agents that missed a deadline, " +
  "each note blaming a different expired API key so nobody admits they just napped.";

function fail(gate: string, detail: string): never {
  throw new Error(`Gate failed (${gate}): ${detail}`);
}

// --- Gate validation (mirrors the sealed scorer) -------------------------
function validatePitch(pitch: string): { charCount: number; byteCount: number } {
  const chars = [...pitch]; // count Unicode code points, like a character count
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    fail("length", `entry is ${chars.length} characters, must be ${MIN_CHARS}-${MAX_CHARS}.`);
  }

  // The entry must be exactly what the scorer reads: no hidden
  // leading/trailing whitespace and no line breaks of any kind.
  if (pitch !== pitch.trim()) {
    fail("whitespace", "entry has leading or trailing whitespace.");
  }
  if (pitch.trim().length === 0) {
    fail("whitespace", "entry is only white space.");
  }
  if (/[\r\n]/.test(pitch)) {
    fail("line-break", "entry must be a single line, no CR or LF allowed.");
  }

  // No control characters (other than the ones already excluded
  // above): the entry must be plain printable text.
  const controlChars = [...pitch].filter((ch) => ch.codePointAt(0)! < 0x20);
  if (controlChars.length > 0) {
    fail("control-chars", `entry contains ${controlChars.length} control character(s).`);
  }

  // Exactly one sentence: the whole text must match a single
  // sentence shape (capitalised start, one terminal period) and
  // contain no other sentence-ending punctuation anywhere.
  const sentenceEnders = pitch.match(/[.!?]/g) ?? [];
  if (sentenceEnders.length !== 1 || !pitch.endsWith(".")) {
    fail("one-sentence", `entry has ${sentenceEnders.length} sentence ender(s), must be exactly 1 trailing period.`);
  }
  if (!/^[A-Z]/.test(pitch)) {
    fail("one-sentence", "entry must start with a capital letter.");
  }

  // Must round-trip as UTF-8, and the byte length is bounded too,
  // so a multi-byte-heavy entry cannot sneak past the char gate.
  const encoded = Buffer.from(pitch, "utf8");
  if (encoded.toString("utf8") !== pitch) {
    fail("utf8", "entry is not valid UTF-8 text.");
  }
  if (encoded.length > MAX_CHARS * 4) {
    fail("bytes", `entry is ${encoded.length} bytes, exceeds ${MAX_CHARS * 4}.`);
  }

  return { charCount: chars.length, byteCount: encoded.length };
}

// --- Write -----------------------------------------------------------------
function writeEntry(pitch: string): void {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, pitch, "utf8");
}

// --- Verify after write -----------------------------------------------------
// Read the file back and prove it is byte-for-byte the validated
// pitch, then re-run the gates on what was actually read from disk.
function verifyWrittenEntry(expected: string): void {
  const onDisk = readFileSync(OUTPUT_PATH, "utf8");
  if (onDisk !== expected) {
    fail(
      "verify-after-write",
      `file content differs from validated pitch (disk: ${onDisk.length} chars, expected: ${expected.length} chars).`,
    );
  }
  // Re-validate the disk content itself, not just the in-memory copy.
  validatePitch(onDisk);
}

function main(): void {
  const { charCount, byteCount } = validatePitch(PITCH);
  writeEntry(PITCH);
  verifyWrittenEntry(PITCH);
  console.log(`Wrote ${charCount} characters (${byteCount} bytes) to ${OUTPUT_PATH} and verified`);
}

main();
