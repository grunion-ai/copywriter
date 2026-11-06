# copywriter

copywriter is a Claude Code plugin with two agents and the writing rules they share. The copywriter agent drafts copy against those rules. The prose-reviewer agent checks finished drafts and returns a ship or revise verdict.

## Components

| Path | Description |
| --- | --- |
| `agents/copywriter.md` | Drafting agent (model `opus`). Drafts landing and offer pages, one-pagers, deck copy, posts, ad copy, client-facing report prose, UI strings, titles, headings, subject lines and labels. It runs the linter on each draft, scores it out of 50 (five measures, 1 to 10 each) and sends final deliverables to prose-reviewer. |
| `agents/prose-reviewer.md` | Read-only agent (model `sonnet`). Runs the linter, applies the judgment rules a regex cannot check, scores the draft out of 50 and returns a ship or revise verdict with concrete rewrites. |
| `skills/writing-rules/SKILL.md` | Sixteen writing rules for prose, each with the reason it fails the reader. Also banned words and phrases, formatting rules, marketing-copy conventions, title and label rules drawn from blind ratings of deck titles, and paragraph-prose tells. |
| `skills/writing-rules/prose-lint.mjs` | Dependency-free Node linter for the rules a regex can catch. |
| `test/prose-lint.test.mjs` | Linter tests. |

The plugin adds no hooks and makes no network calls. Neither agent sends, posts or publishes anything.

## Installation

The linter needs Node 18 or later.

In Claude Code:

```
/plugin marketplace add grunion-ai/copywriter
/plugin install copywriter@grunion-copywriter
```

To load the plugin for one session from a local clone:

```
claude --plugin-dir ./copywriter
```

For a manual install, copy `agents/*.md` into `~/.claude/agents/` and `skills/writing-rules/` into `~/.claude/skills/writing-rules/`.

Installed as a plugin, the agents appear as `copywriter:copywriter` and `copywriter:prose-reviewer`.

## Usage

Example requests in Claude Code:

- "use the copywriter agent to write the hero for this page from notes.md"
- "title this report, three options"
- "have prose-reviewer check docs/launch.md"

## Linter

```
node skills/writing-rules/prose-lint.mjs <file>
```

Pass `-` in place of a file to read from stdin. The linter prints a JSON array of `{rule, line, excerpt}` findings and exits 1 when it finds anything, 0 when the file is clean. It skips code fences, inline code, script and style blocks, and HTML tags.

From code, `lint` returns the same array:

```js
import { lint } from './skills/writing-rules/prose-lint.mjs';
const findings = lint(text);
```

## Tests

```
node test/prose-lint.test.mjs
```

The suite prints `prose-lint: ok` when every case passes.

## Credits

Rules 1 to 8 are adapted from [stop-slop](https://github.com/hardikpandya/stop-slop) by Hardik Pandya, under the MIT license. Rules 9 to 16 and the sections on titles, marketing copy and paragraph prose are this project's additions.

## License

MIT. See `LICENSE`.
