const BANNED_WORDS = [
  'delve', 'tapestry', 'vibrant', 'robust', 'pivotal', 'multifaceted', 'nuanced',
  'holistic', 'synergy', 'utilize', 'embark', 'foster', 'underscore', 'garner',
  'beacon', 'realm', 'paramount', 'profound', 'testament', 'endeavor', 'intricate',
  'intricacies', 'transformative', 'groundbreaking', 'cutting-edge', 'revolutionary',
  'seamlessly', 'resonate', 'encompass', 'quintessential', 'confluence',
  'underpinning', 'meticulous', 'meticulously', 'bolstered', 'supercharge',
  'empower', 'empowering', 'agent-led', 'comprehensive', 'trajectory', 'bespoke',
];

const BANNED_PHRASES = [
  /in today's (ever-evolving|fast-paced|digital) world/i,
  /it'?s (important|worth) noting/i,
  /let'?s (delve|dive) in/i,
  /at the end of the day/i,
  /^in (conclusion|summary|essence)\b/i,
  /^(moreover|furthermore|additionally)\b/i,
  /game-chang(er|ing)/i,
  /harness the power/i,
  /unlock the (potential|power)/i,
  /navigate the complexit/i,
  /at the forefront of/i,
  /first and foremost/i,
  /here'?s (the thing|what nobody tells you)/i,
  /i hope this email finds you well/i,
  /(reaching out|touching base|circle back)/i,
  /per my last email/i,
  /^(certainly|absolutely|great question)!/i,
];

const FALSE_AGENCY = [
  /the data (tells|shows) us/i,
  /the (decision|answer|pattern) emerges/i,
  /the market rewards/i,
  /the culture shifts/i,
  /\ba complaint becomes a fix\b/i,
];

const VAGUE_DECLARATIVE = [
  /the implications are (significant|profound|far-reaching)/i,
  /the reasons are structural/i,
  /the stakes are high/i,
  /this is the deepest problem/i,
  /cannot be overstated/i,
];

const DELEX_CHUNKS = [
  /\bplays? an? (crucial|key|vital|important|central|pivotal) role/i,
  /\bserves? as\b/i,
  /\bacts? as an?\b/i,
  /\bstands? as an?\b/i,
  /is a testament to/i,
];

const DISJUNCTS = /^(Ultimately|Importantly|Crucially|Notably|Interestingly|Essentially|Fundamentally|Significantly|Arguably|Undoubtedly),/;

function blank(text, re) {
  return text.replace(re, m => m.replace(/[^\n]/g, ' '));
}

function regions(text, openRe) {
  const out = [];
  for (const m of text.matchAll(openRe)) {
    if (out.length && m.index < out.at(-1)[1]) continue;
    const walk = new RegExp(`<(/?)${m[1]}\\b`, 'gi');
    walk.lastIndex = m.index;
    let depth = 0, end = text.length, t;
    while ((t = walk.exec(text)) !== null) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) { end = t.index; break; }
    }
    out.push([m.index, end]);
  }
  return out;
}

function stripNonProse(text) {
  let t = text;
  t = blank(t, /```[\s\S]*?```/g);
  t = blank(t, /~~~[\s\S]*?~~~/g);
  t = blank(t, /<script[\s\S]*?<\/script>/gi);
  t = blank(t, /<style[\s\S]*?<\/style>/gi);
  t = blank(t, /`[^`\n]+`/g);
  const tables = regions(t, /<(table)\b/gi);
  const blockEnds = new Set();
  t = t.replace(/<\/(li|p|h[1-6]|tr|td|th|div|section)>|<br\s*\/?>/gi, (m, _tag, offset) => {
    blockEnds.add(offset);
    return '.' + ' '.repeat(m.length - 1);
  });
  t = blank(t, /<[^>\n]+>/g);
  return { prose: t, tables, blockEnds };
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function excerptAt(text, index, len = 60) {
  return text.slice(index, index + len).replace(/\s+/g, ' ').trim();
}

function sentences(text) {
  const out = [];
  const re = /[^.!?\n]+[.!?]?/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const s = m[0].trim();
    if (s.length > 1) out.push({ s, index: m.index + (m[0].length - m[0].trimStart().length), end: m.index + m[0].length - 1 });
  }
  return out;
}

export function lint(text) {
  const { prose, tables, blockEnds } = stripNonProse(text);
  const findings = [];
  const add = (rule, index) => findings.push({ rule, line: lineOf(prose, index), excerpt: excerptAt(prose, index) });

  for (const m of prose.matchAll(/\u2014/g)) add('em-dash', m.index);
  for (const w of BANNED_WORDS) {
    for (const m of prose.matchAll(new RegExp(`\\b${w}\\b`, 'gi'))) add('banned-word', m.index);
  }
  for (const m of prose.matchAll(/\bleverages?\b(?!\s+(?:point|ratio))/gi)) add('banned-word', m.index);
  for (const re of [/not only\b[^.]{0,80}\bbut also\b/gi]) {
    for (const m of prose.matchAll(re)) add('binary-contrast', m.index);
  }
  for (const m of prose.matchAll(/\bthe \w+(?:tion|sion|ment|ance|ence|ization)s? of\b/gi)) add('nominalization', m.index);
  for (const m of prose.matchAll(/, an? \w+(?: \w+)? (?:way|tool|approach|method|solution|framework|means) (?:to|of|for)\b/gi)) add('appositive-restatement', m.index);
  for (const grp of [FALSE_AGENCY, VAGUE_DECLARATIVE, DELEX_CHUNKS, BANNED_PHRASES]) {
    const rule = grp === FALSE_AGENCY ? 'false-agency'
      : grp === VAGUE_DECLARATIVE ? 'vague-declarative'
      : grp === DELEX_CHUNKS ? 'delexicalized-chunk' : 'banned-phrase';
    for (const re of grp) {
      const flags = re.flags.includes('g') ? re.flags : re.flags + 'g';
      const global = new RegExp(re.source.replace(/^\^/, '(?<=^|[.!?]\\s{1,3})'), flags);
      for (const m of prose.matchAll(global)) add(rule, m.index);
    }
  }
  for (const m of prose.matchAll(/\bit'?s also true\b|\bthat said,/gi)) add('symmetric-concession', m.index);

  const sents = sentences(prose);
  for (const { s, index } of sents) {
    if (/^(What|When|Where|Which|Who|Why|How)\b/.test(s) && !s.endsWith('?')) add('wh-starter', index);
    if (DISJUNCTS.test(s)) add('fronted-disjunct', index);
    if (/^Not (a|an|the|just)\b/.test(s)) add('negative-listing', index);
    if (/\b(isn't|is not|aren't|wasn't|weren't)\b[^.]{0,60},\s*(it'?s|they'?re|it is|they are)\b/i.test(s)) add('binary-contrast', index);
    if (/^(People|Nobody|Everyone|Most \w+)\s+(tend|don't|do not|never|always)/i.test(s)) add('narrator-distance', index);
    if (/^While\b[^,]{0,80},/.test(s) && /\balso\b/i.test(s)) add('symmetric-concession', index);
    if (/,\s+[a-z]+ing\s+(the|that|its|a|an|how|why)\b[^,;]*[.!?]$/.test(s)) add('participial-tail', index);
  }

  for (let i = 0; i + 2 < sents.length; i++) {
    if (sents.slice(i, i + 3).some((x) => x.s.includes('|') || blockEnds.has(x.end) || tables.some(([s, e]) => x.index >= s && x.index < e))) continue;
    const [a, b, c] = [sents[i], sents[i + 1], sents[i + 2]].map(x => x.s.replace(/\s+/g, " ").length);
    const max = Math.max(a, b, c), min = Math.min(a, b, c);
    if (min > 20 && (max - min) / max < 0.15) {
      add('rhythm', sents[i].index);
      i += 2;
    }
  }

  return findings;
}

import { fileURLToPath } from 'node:url';
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { readFileSync } = await import('node:fs');
  const file = process.argv[2];
  const text = file && file !== '-' ? readFileSync(file, 'utf8') : readFileSync(0, 'utf8');
  const findings = lint(text);
  console.log(JSON.stringify(findings, null, 1));
  process.exit(findings.length ? 1 : 0);
}
