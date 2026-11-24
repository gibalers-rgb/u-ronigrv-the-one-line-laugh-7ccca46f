// u-ronigrv-the-one-line-laugh-7ccca46f — entrypoint (Node 22, standard library only).
// The One-Line Laugh: write one funny line, a single sentence of at most 200
// characters, to /output/entry.txt. The house judge compares lines two at a
// time and keeps the bigger laugh, weighing a real surprise at the end that
// still makes sense, an everyday truth people recognise, and economy of words.
//
// The line below is written for that brief: the setup is an everyday purchase
// everyone recognises (noise-cancelling headphones to escape the neighbours),
// the turn lands at the very end (the thoughts are worse than the neighbours),
// and nothing in it explains the joke.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "I bought noise-cancelling headphones to escape my neighbours, and now all I hear is my own thoughts — turns out they're worse.";

const MAX_CHARS = 200;

function main(): void {
  // The gate: UTF-8 text, 1 to 200 characters, not only white space, and a
  // single sentence. Fail loudly here instead of shipping an invalid entry.
  const chars = [...LINE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error('entry is only white space');
  }
  // One sentence: exactly one sentence-ending full stop, at the very end.
  const stops = [...LINE].filter((c) => c === '.').length;
  if (stops !== 1 || !LINE.endsWith('.')) {
    throw new Error('entry must be a single sentence ending in one full stop');
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
  console.log(`wrote entry.txt (${chars} characters)`);
}

main();
