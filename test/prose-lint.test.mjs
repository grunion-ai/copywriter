import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lint } from '../skills/writing-rules/prose-lint.mjs';

const rules = (t) => lint(t).map((f) => f.rule);
const flags = (t, rule) => assert.ok(rules(t).includes(rule), `expected ${rule}: ${t} -> ${JSON.stringify(rules(t))}`);
const clean = (t) => assert.deepEqual(rules(t), [], `expected clean: ${t}`);

const FAIL = {
  'em-dash': 'The fleet grew \u2014 fast.',
  'banned-word': 'The team will leverage the data.',
  'binary-contrast': 'It is not only fast but also cheap.',
  nominalization: 'The implementation of the pipeline took a week.',
  'appositive-restatement': 'Use the planner, a powerful way to schedule shifts.',
  'false-agency': 'The data tells us to hire.',
  'vague-declarative': 'The implications are significant.',
  'delexicalized-chunk': 'The dispatcher plays a key role in routing.',
  'banned-phrase': 'At the end of the day the trucks ran.',
  'symmetric-concession': 'That said, the shop stayed open.',
  'wh-starter': 'What makes this hard is the budget.',
  'fronted-disjunct': 'Ultimately, the fleet chose the cheaper plan.',
  'negative-listing': 'Not a tool. Not a service. A habit.',
  'narrator-distance': 'People tend to skip the inspection.',
  'participial-tail': 'The shop closed early, highlighting the need for more staff.',
  rhythm: 'The truck left the depot at six. The driver checked the brake lines. The shop logged the mileage too.',
};
for (const [rule, text] of Object.entries(FAIL)) flags(text, rule);

for (const t of [
  'The fund reserves as much cash as it can.',
  'Our contacts as a group signed off.',
  'The page displays a key role chart.',
  'The crane withstands an impact.',
  'The planner schedules shifts for each depot.',
  'Fragments are fine. Keep the playbook. Software purchase optional.',
  'This is not a sales pitch.',
  'Which truck failed?',
]) clean(t);

for (const t of ['The report is comprehensive.', 'Its trajectory is clear.', 'A bespoke plan.']) flags(t, 'banned-word');

flags('The engine serves as the source.', 'delexicalized-chunk');
flags('The log acts as a ledger.', 'delexicalized-chunk');
flags('It stands as a reminder.', 'delexicalized-chunk');

clean('```\nThe data tells us\n```\n');
clean('Run `utilize` in the shell.');
clean('<script>const robust = 1;</script>');

const skill = readFileSync(new URL('../skills/writing-rules/SKILL.md', import.meta.url), 'utf8');
const list = skill.split('## Banned words')[1].split('\n## ')[0].trim().split('\n')[0];
const JUDGED_BY_REVIEWER = new Set(['landscape']);
for (const raw of list.split(',')) {
  const word = raw.replace(/\(.*?\)/g, '').trim().split('/')[0];
  if (!word || JUDGED_BY_REVIEWER.has(word)) continue;
  flags(`They ${word} it.`, 'banned-word');
}

console.log('prose-lint: ok');
