---
name: writing-rules
description: Sixteen structural rules for prose a reader will see (email, docs, web pages, posts, deck copy, reports, UI strings), plus conventions for marketing copy, titles and labels, and paragraph prose. Load before drafting or reviewing any outward-facing words. Ships prose-lint.mjs, a mechanical linter for the rules a regex can catch.
---

# Writing rules

Canonical source for the copywriter and prose-reviewer agents. Rules 1 to 8 are adapted from stop-slop (github.com/hardikpandya/stop-slop, MIT, Hardik Pandya); rules 9 to 16 fill the gaps a stylometric review found (participial tails, disjuncts, concession, nominalization, variation, appositives, delexicalized chunks, register).

**Scope.** These rules govern anything a reader other than the writer will see: email, documents, websites, posts, messages, deck copy, reports, published pages. Chat replies to the person you work for are out of scope. Content requested mid-chat is still content.

**Enforcement.** Mechanical rules are checked by `prose-lint.mjs`, which sits beside this file: `node <this skill's directory>/prose-lint.mjs <file>` prints JSON findings and exits 1 when it finds any. Judgment-only rules (13, 16, rhythm nuance, scoring) belong to the `prose-reviewer` agent.

---

## The sixteen rules

Every rule leads with the why: the specific way the pattern makes writing harder to understand, longer than it needs to be, or easier to put down.

### 1. False agency

**Why it fails the reader:** an agentless claim cannot be acted on. If "the data tells us" something, the reader cannot ask who read it, what they assumed, or whether to trust them. The prose hides the human because naming the human invites accountability, and readers feel that dodge even when they can't name it.

Inanimate things do not perform human verbs. Name the human. If no specific person fits, use "you."

| Wrote | Means |
| --- | --- |
| "a complaint becomes a fix" | Someone fixed it. |
| "the decision emerges" | Someone decided. |
| "the data tells us" | Someone read it and drew a conclusion. |
| "the market rewards" | Buyers pay for things. |
| "the culture shifts" | People changed behavior. |

### 2. Binary contrast

**Why it fails the reader:** the telegraphed reversal ("it isn't X, it's Y") makes the reader process X, discard X, then process Y: double the work for half a sentence of content. It manufactures drama the content hasn't earned, and it is now so recognizable as machine cadence that it costs trust on sight.

Kill: "It isn't X, it's Y" / "not X, it's Y" / "The answer isn't X. It's Y." / "The question isn't X" / "It feels like X. It's actually Y." / "stops being X and starts being Y" / "not just X but also Y" / "Not only X but also Y". State Y directly.

### 3. Negative listing

**Why it fails the reader:** every sentence spent on what a thing *isn't* is a sentence the reader waits through with no information gained. The striptease structure ("Not a X. Not a Y. A Z.") asks for patience it never repays.

State Z. The reader does not need the runway. (Exception: answering a real objection out loud; see Marketing copy.)

### 4. Vague declarative

**Why it fails the reader:** "The implications are significant" contains zero information: it announces that something matters without saying what, and the reader who trusts the announcement is left holding nothing. Repeated, it teaches the reader that your emphasis means nothing.

Kill: "The implications are significant" / "The reasons are structural" / "The stakes are high" / "cannot be overstated". Name the specific implication or cut the sentence.

### 5. Wh- starter

**Why it fails the reader:** "What makes this hard is the token budget" buries the actual subject four words deep and turns a statement into a quiz-show reveal. One is fine; as a habit it becomes metronomic and the reader starts skimming for the payload after the "is."

Restructure to lead with the subject or the verb: "The token budget is the constraint." Same treatment for paragraphs starting with "So" and sentences starting with "Look,". Real questions ending in "?" are fine.

### 6. Narrator from a distance

**Why it fails the reader:** "People tend to underestimate X" floats above the scene: nobody in particular did anything, so nothing lands on the reader personally and nothing sticks. Prose written from orbit is prose nobody feels addressed by.

Kill: "People tend to" / "Nobody designed this" / "This is why" / "This happens because". Put the reader in the room. "You" beats "People." (Professional register on client-facing pages overrides this; see Marketing copy.)

### 7. Rhythm

**Why it fails the reader:** uniform sentence length is the acoustic signature of machine prose. Human attention rides on variation; three same-length sentences in a row put the reader into skim mode, and a tricolon in every list reads as filler even when the items are real.

* Three consecutive sentences of the same length: break one.
* Three-item lists: prefer two, or one.
* Every paragraph ending on a punchy one-liner: vary the endings.
* If a line reads like a pull-quote, rewrite it.
* Do not stack short staccato sentences for effect. In chat, a single fragment close-out is exempt.
* Shape counts as much as length. Three sentences in a row built subject, verb, fact, stop fail whatever their length. A paragraph of one-fact sentences is a list wearing paragraph clothes; join the facts that depend on each other.
* Score rhythm by reading the paragraph aloud, never by counting. The linter's length check is a floor; the ear is the gate. (In the copywriter agent's first run, the reviewer scored a six-same-shape paragraph Rhythm 8; the owner ranked it poorly on structure.)

### 8. Scoring

**Why it exists:** every other rule fails silently without a revision pass. Scoring forces the pass.

Before delivering prose, rate 1 to 10 on each: Directness (statements or announcements), Rhythm (varied or metronomic), Trust (respects reader intelligence), Authenticity (sounds human), Density (anything cuttable). Below 35/50, revise.

Two checks come before the numbers, because the numbers reward rule absence and miss the two things a reader notices first:

* **Clarity test.** Write the one sentence a first-time reader would use to restate the finding. If the paragraph never states that sentence, rewrite. Then check: every scale, term and comparison is introduced before it is used; every "they", "those", "other" has a referent in the same sentence; every number carries its comparison ("under a minute, against a reviewer hour"); the paragraph ends on what the finding means for the reader.
* **Read-aloud test.** Read it aloud once. A line that exists to sound good, a metaphor, a symmetrical close, a same-shape run: rewrite before scoring. See "Paragraph prose" below.

A reviewer verdict of `revise` means apply the rewrites and send the text back once; ship on the second verdict, never on a self-score after edits.

### 9. Participial tails

**Why it fails the reader:** "…, highlighting the importance of X" tacks an unearned conclusion onto a fact: the reader is told what the fact means instead of being shown evidence and left to conclude. It reads as the writer grading their own sentence. This is the single strongest LLM tell in current stylometry.

Kill trailing "-ing" clauses that editorialize: "…, underscoring the need for" / "…, demonstrating the value of" / "…, showcasing its ability to". If the implication matters, give it its own sentence with an actor. If it doesn't, the fact stands alone.

### 10. Fronted disjuncts

**Why it fails the reader:** "Ultimately," / "Importantly," / "Crucially," claim significance before the sentence has earned any. They are paragraph glue: words that occupy the emphatic first position while carrying no content, so the reader learns to skip sentence openings entirely.

Kill sentence-initial "Ultimately / Importantly / Crucially / Notably / Interestingly / Essentially / Fundamentally / Significantly / Arguably." If the point is important, the content should show it. ("Moreover / Furthermore / Additionally" are already banned phrases: same disease.)

### 11. Symmetric concession

**Why it fails the reader:** "While X, it's also true that Y" gives both sides equal weight and refuses to commit, so the reader finishes the sentence not knowing what you actually believe, which is the one thing they came for. Balance-as-a-structure is hedging at the paragraph level.

Kill: "While X, it's also true that Y" / "That said, …" as a reflex / "On the other hand" without a real fork. State the position. If a caveat genuinely changes what the reader should do, give it one plain sentence.

### 12. Nominalization

**Why it fails the reader:** "the implementation of the pipeline" buries a live verb inside an abstract noun, adds two function words, and pushes the actor out of the sentence. Stacked nominalizations are what makes prose feel bureaucratic: everything happens, nobody does anything, and sentences run 30% longer for it.

Rewrite "the implementation of X" as "implement X" / "we implemented X". Watch for "-tion / -ment / -ance of" chains.

### 13. Elegant variation

**Why it fails the reader:** cycling synonyms for one referent ("the tool… the platform… the solution…") forces the reader to stop and verify that all three are the same thing. Precision beats variety; the repeated plain name is invisible, the synonym parade is a distraction.

Call a thing by one name and keep it. Vary sentences, not referents. (Judgment call, enforced by the reviewer agent, not the linter.)

### 14. Appositive restatement

**Why it fails the reader:** "X, a powerful way to Y," explains the thing you just named, doubling the length of the mention and signaling you don't trust the reader to know or infer. One definition at first use is service; a definition welded to every mention is padding.

Kill comma-appositives that re-describe: ", a powerful way to" / ", a tool that lets you" / ", an approach for". Define once if needed, then use the name bare.

### 15. Delexicalized chunks

**Why it fails the reader:** "plays a crucial role in" and "serves as" are weak verb + inflated noun combinations that occupy space without asserting anything checkable. The reader cannot picture what happened. This rule is pattern-level on purpose: banning individual chunks just breeds new ones.

Kill weak-verb formulas: "plays a \[crucial/key/vital\] role" / "serves as" / "acts as a" / "stands as" / "is a testament to". Replace with the concrete verb: what does it actually do?

### 16. Register flattening

**Why it fails the reader:** when a Slack message, a legal letter, and a launch post all land in the same polished mid-formal tone, the tone stops carrying information; uniform polish is itself the machine tell, independent of any single phrase. Readers trust writing that sounds like it knows where it is.

Match register to surface and audience: terse and fragmentary in chat, plain and direct in email, third-person professional on client-facing pages (see Marketing copy). If two deliverables for different audiences read identically, one of them is wrong. (Judgment call: reviewer agent.)

---

## Banned words

delve, tapestry, landscape (metaphorical), vibrant, robust, pivotal, multifaceted, nuanced, comprehensive, holistic, synergy, leverage (as verb), utilize, embark, foster, underscore, garner, beacon, realm, paramount, profound, testament, endeavor, intricate/intricacies, transformative, groundbreaking, cutting-edge, revolutionary, seamlessly, resonate, encompass, bespoke, quintessential, trajectory, confluence, underpinning, meticulous/meticulously, bolstered, supercharge, empower/empowering, agent-led

## Banned phrases

* "In today's \[ever-evolving/fast-paced/digital\] world"
* "It's important/worth noting that"
* "Let's delve/dive into"
* "At the end of the day"
* "In conclusion / In summary / In essence"
* "Moreover" / "Furthermore" / "Additionally"
* "Game-changer" / "Game-changing"
* "Harness the power of" / "Unlock the potential"
* "Navigate the complexities" / "At the forefront of"
* "As mentioned earlier/above" / "First and foremost"
* "Here's the thing" / "Here's what nobody tells you"
* "Not only X but also Y"
* "I hope this email finds you well"
* "Reaching out" / "Touching base" / "Circle back"
* "Per my last email"
* "Certainly!" / "Absolutely!" / "Great question!" as openers

AI-assistant filler to avoid: "happy to help", "let me know if you need anything else", "I hope this helps", "feel free to". Corporate filler: "circle back", "drive value", "stakeholders", "delight customers", "ecosystem".

## Formatting rules

* **No em dashes.** Never use the unicode em dash. No exceptions. Use periods, semicolons, parentheses, commas, or regular hyphens. Applies to all surfaces.
* No formulaic openings.
* No summary paragraphs restating what was just said.
* No hedge stacking. One qualifier max.
* No therapist mode.
* No false directness ("Honestly?" "Let me be direct:").
* No excessive exclamation marks. One per message max.
* No colon-heavy titles.
* No clipping abbreviations in prose: sec → second, info → information, prod → production. Standard acronyms (API, QA, CEO) fine.
* Plain language over vivid jargon: "thrashing" → "slowing down", "spin up" → "start". Match verb to audience.

## Writing voice

* Lead with the point. Action, decision, or news in the first sentence.
* Contractions, active voice, most sentences under 15 words.
* Specific over abstract: numbers, names, dates.
* Close with a clear next step: who does what by when.
* Assert, don't hedge. Vary sentence openings.
* Anglo-Saxon words: "use" not "utilize", "help" not "facilitate".
* Read it aloud; if you wouldn't say it over coffee, rewrite it.

## Marketing copy

Conventions from the owner's edit pass over a live offer page, shown before and after. The examples here and below use Acme, an invented vendor of fleet maintenance software. Scope: landing pages, offer pages, one-pagers, ad and deck copy. They sit on top of the sixteen rules and win where they collide.

| Convention | Before | After |
| --- | --- | --- |
| **Name the artifact** | "an audit, a plan" | "a fleet maintenance playbook" |
| **Open on the verb** | "Three days on site. An audit, a plan..." | "Build a fleet maintenance playbook in three days..." |
| **Cut the explanatory tail** | "Fleets of 50 to 500 trucks, where every technician already has a full board." | "Fleets of 50 to 500 trucks." |
| **Fragments in promise and CTA slots** | "The audit and the plan stay with your team, whatever happens with the software." | "Keep the playbook. Software purchase optional." |
| **Answer the objection out loud** | "Nine in ten fleets sit on the first two levels." | "This is not a sales pitch." |
| **Claim the shift** | "Reliability engineering benches sit at national carriers, so this is the normal case." | "Only mega carriers have reliability engineers and data driven maintenance. Not anymore!" |
| **Operational nouns** | "no way to see what a change does" | "no visibility to the goal line" |
| **Professional register** | "We meet you wherever you are." | Third person. "your team" and "our team" occasionally, bare "you" and "we" rarely. |

Notes that matter more than the table:

* **Name the artifact** means the buyer can picture the thing: a playbook, a map, a scorecard. Abstract nouns like "insight" fail on sight.
* **Answer the objection out loud** licenses a negation that rules 2 and 3 otherwise ban. "This is not a sales pitch" names the reader's suspicion; that differs from defining a thing by its opposite.
* **Fragments** are welcome in promise boxes, chips and CTAs. Not in body prose.
* **Professional register** overrides rule 6 on client-facing pages: "your team" beats "you", and "people" is still banned.
* The owner's own copy outranks the banned-word list. A banned word the owner writes into a headline, such as "bespoke", ships.

## Titles, headings and labels

Scope: any short line that names something rather than argues it. Deck title slides and slide headings; document, report and artifact titles; H1 to H3 section headings; email subject lines; chart titles and axis labels; table headers; chips, badges, nav items, tabs, button and field labels; PR and commit titles. The evidence came from deck titles, and the reading is about words, so it carries to every one of these surfaces. The owner rated their own deck titles across four blind ballot rounds, and these rules are what the ratings said. They win over the sixteen rules and over Marketing copy.

**Why it fails the reader:** a title is read in under a second and never re-read. A verb asks the reader to do something before they know what the thing is; a claim asks them to agree before they have seen the evidence; a teaser asks them to solve a puzzle. All three spend the reader's second on the writer's cleverness. A label spends it on the noun.

* **Every word earns its spot.** The ballot moved on word choice, concision and clarity, not on structure. Colon or no colon, Title Case or sentence case, single noun or list of three, buyer named or not: all within ±0.13 on a 0-2 scale, noise. The noun phrase decided: "Work order intake, triage and tracking" and "Warranty claim recovery for fleets" shipped; "fleet telematics" was Never in every one of its eight dressings because it is a category Acme does not own. Name the real capability or the real steps.
* **Label, not sentence.** A title is a noun phrase that says what the thing is or does; a command or a claim is a sentence, and sentences get struck. In round one the owner picked the label option 5/5 and struck all ten imperative and claim variants, three of which had shipped ("Catch it before the truck rolls", "Uptime is the whole job.").
* **No puzzles.** A title that needs the next slide to make sense ("Two trucks, one inspection") is struck on sight. Same for a heading that needs its paragraph, or a subject line that needs the email opened. If the reader cannot say what the thing is from the line alone, rewrite.
* **No metadata in the line.** A date, version or audience stamp cost 0.38 and no stamped title reached Ship. Dates, versions and audiences live in the eyebrow, the byline or the header DL, never in the title or heading.
* **Marketing conventions do not reach titles or headings.** "Open on the verb" and "Claim the shift" are rules for landing-page hero copy and CTAs. On a title, heading or label they read as slop. A button is the one label that takes a verb, because it does something.
* **Banned in titles and everywhere else:** "agent-led". The owner struck the term itself, whatever title carried it. It capped every title it appeared in at Fine. Do not swap in another tech qualifier; the title reads better without one.

Worked examples from the ballot:

| Rated | Title | Why |
| --- | --- | --- |
| Ship | Work order intake, triage and tracking | Three real steps, nothing else |
| Ship | Acme: Warranty Claim Recovery for Fleets | Names the product, the capability and the buyer |
| Ship | Payment fraud assessment for AP teams | Capability plus buyer, six words |
| Fine | Acme: agent-led warranty claim recovery | Same noun phrase, one word too many |
| Never | Acme: fleet telematics | Category the product does not own |
| Struck | Two trucks, one inspection | Puzzle; needs the next slide |
| Struck | Catch it before the truck rolls | Command before the reader knows the thing |

## Paragraph prose

Scope: body prose of any length, on any surface: page sections, posts, blog openings, case studies, one-pager bodies, docs, report sections. From the owner's review of the copywriter agent's first run (thirteen samples; the paragraph-scale ones ranked poorly on word choice, sentence structure and clarity even though every one passed the linter and scored 37 to 42 with the reviewer). The sixteen rules still apply; these are the tells that got through them.

**Why it fails the reader:** each of these lines spends the reader's attention on the writer's craft instead of on the fact. A reader who notices the writing stops trusting it.

| Tell | Struck example | Fix |
| --- | --- | --- |
| Aphoristic topic sentence | "The cost lands at both ends of the term." | Open on the fact the paragraph is about. |
| Metaphor flourish | "the fleet's brake health has had a full season to drift", "a reading on a schedule" | The literal noun: "the brake pads have worn". |
| Parallel-clause kicker | "late to the breakdown and late to the renewal", "weeks old instead of months" | End on the consequence, stated once, no symmetry. |
| Superlative garnish | "the contract a fleet manager most wants" | Cut the superlative; "a contract". |
| Antithesis as engine | every paragraph built on fall/improve, breakdown/renewal, weeks/months | One idea per paragraph; the contrast, if real, gets one sentence. |
| Same-shape run | "The agent saw only X. The technicians had Y. The agent matched Z." | Join dependent facts; vary subject and clause order. |
| Fact list as paragraph | seven sentences, seven facts, no sentence needing the last | State the finding, then the facts that support it, in the order a reader needs them. |
| Slack verbs | "drew 50 trucks", "had its agent grade each one", "landed more than one band apart", "keep the final call on those" | The concrete verb: sampled, graded, differed by, decides. |
| Stacked modifiers | "a carrier's 400-truck, $12M maintenance budget" | One modifier per noun; move the rest to their own clause. |
| Referent drift | "senior technicians", "technicians", "they" for one party | One name, kept (rule 13), and no bare "they" across a sentence boundary. |

Clarity, checked before scoring (rule 8):

1. The finding is stated in one sentence a reader could repeat.
2. Every scale, term and comparison is introduced before it is used (an A to E scale is named before "graded A or E").
3. Every number carries the thing it is compared to, in the same sentence.
4. Every "other", "those", "they" has its referent in the same sentence.
5. The paragraph closes on what the finding means for the reader, not on a flourish.

Source fidelity, the three misses from the same run:

* A caveat, limitation or quote attributed to the company or the source is copied, never inferred. If the source states none, say so in the return; do not write one and label it inferred.
* A number, cadence or example from a chart or slide labelled illustrative, sample or example is not a product fact. Leave it out, or mark it inferred in the copy itself, not only in the return.
* Marking a phrase "inferred" in the return does not license a claim in the company's mouth ("Acme reports one caveat: ...").

## Brand names

Spell and case every brand exactly as its brand kit does. When the brief names a brand and gives no kit, ask for one before drafting.
