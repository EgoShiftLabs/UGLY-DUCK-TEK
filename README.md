# UGLY DUCK TEK — Applied Builder Academy (V0.2)

**Builders before hype.** Learn practical digital skills by making real decisions and producing your own project artifacts.

**Live application:** https://egoshiftlabs.github.io/UGLY-DUCK-TEK/  
**Parent cultural hub:** https://egoshiftlabs.github.io/BodyBagz-Ecosystem/

UGLY DUCK TEK is an independent, free-to-practice learning product. You do not need to own or buy any crypto asset to participate. The six-track foundation introduces digital project literacy, evidence evaluation, execution, collaboration, safety, and sustainable creative work.

## What learners actually do

Each track provides:

1. **Learning outcomes and expanded instruction** — three substantive sections covering concepts, tradeoffs and practical choices.
2. **A worked example** — a realistic project with a four-step approach and a demonstrable outcome.
3. **An anti-pattern** — a plausible mistake and why it matters.
4. **A portfolio exercise** — four distinct prompts with written responses (30–900 characters each), plus learner self-review against four criteria.
5. **Five decision scenarios** — practice questions with four plausible choices and a written explanation of each scenario's recommended action.

Track completion now has **two distinct components**: (a) 4/5 or higher on a browser-local knowledge check and (b) one saved, structured self-reviewed artifact. A full local practice receipt requires both components in all six tracks. The separate private portfolio export can be used after just one artifact.

Neither quiz scores nor exercise submissions are graded or authenticated by an independent reviewer. They are personal practice records, **not a certificate, NFT, issuer, employment qualification or admission to BAGZ Forge**.

### The six tracks

| Track | Applied artifact |
|---|---|
| Builder Orientation | Audience, current friction, first deliverable and disconfirming test |
| Digital Systems & Evidence | User action, data flow, access/privacy control and failure case |
| Execution Discipline | Two-week outcome, tasks/owners, acceptance evidence and contingency |
| Collaboration & Governance | Decision scope, review roles, authorization and appeal process |
| Digital Safety & Operations | Asset/threat, impact, protections and response/recovery |
| Long-Term Builder Mindset | Continuing value, maintenance, contributor rights and handoff |

[Curriculum and facilitation guidance](docs/CURRICULUM.md)

## Deployments and privacy

**GitHub Pages is enabled and deployed from `main`.** The source and application are independently hosted at the published link above. The app is a static frontend, not a server-based classroom.

- The local state key is `ugly-duck-tek.practice.v1`; it is independent of BodyBagz hub or Watchtower Crypto storage.
- Browser data can be modified, lost by clearing site data or accessed by scripts running on the same origin. There is no account sync, encryption or server backup.
- Export **portfolio JSON** to back up your practical responses before changing devices or clearing browser data. Exports may contain personal project ideas; store them privately.
- **Practice receipt:** `bodybagz.local-practice.v1`, with the unchanged V1 interchange fields. This file is never evidence of verified ability.
- **Portfolio:** `udt.local-portfolio.v1`, a separate standalone self-reviewed draft format, not a credential.
- Past V0.1 quiz scores and free-form notes are retained on the same device. Scores no longer count as full-course applied completion until structured exercises are added.

The matching V1 practice interchange contract was pinned to the BodyBagz hub's immutable source commit `690ca6e66dc705ce6eb2b963932a873dea73342f`. No direct cross-origin storage, certification checks or automatic Forge submissions exist.

## Run and test locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
npm run quality
```

The GitHub Actions pipeline runs additional desktop and mobile Chromium tests (Playwright installed only in CI). The automated tests cover decisions, artifacts, prior-record compatibility, private exports, reset confirmation/cancellation, and mobile course navigation. A physical-device and screen-reader review remains a future quality requirement.

No third-party fonts are downloaded by the application. A restrictive in-document CSP governs JavaScript, styles, images and connections. This CSP is not a substitute for an origin-level HTTP response header.

## Remaining work

V0.2 is a meaningful **self-guided learning prototype**, not an accredited educational product. The next stage must validate these lessons and the quality of actual student work. It may include richer feedback, peer or mentor rubrics, improved case exercises and optional portfolios students choose to share.

Official certificates require assessment integrity, controlled identity and records, human-reviewed work, privacy policy, appeals, revocation and an independent credential verifier. No NFT or token feature should precede those safeguards.

[Security and privacy](docs/SECURITY.md) · [Product roadmap](docs/ROADMAP.md) · [Changelog](docs/CHANGELOG.md)
