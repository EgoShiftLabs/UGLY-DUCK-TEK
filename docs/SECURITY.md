# UGLY DUCK TEK — Security and Privacy (V0.2)

This is a public, static, browser-local practice app. **It has no student accounts, private server, issuing authority, wallet connection, NFT minting or official program permissions.**

## What a browser-local pass means

- Quiz answers are shipped in public client code. A user can edit quiz scores, lesson progress and self-reviewed artifacts.
- The four-part practice exercise has a minimum length and a self-review acknowledgement. That is **not** proof of authorship, ability or instructor assessment.
- `bodybagz.local-practice.v1` is a self-reported, editable completion receipt. It must never authorize funds, minting, governance or official enrollment.
- `udt.local-portfolio.v1` is a self-reported private draft export, not a signed portfolio or verifiable credential.
- The app uses independent `ugly-duck-tek.practice.v1` localStorage with additive fields. It does not read data from the BodyBagz ecosystem or Watchtower Crypto domains.
- Prior browser records retain earlier scores and free-form notes, but old quiz-only completion is not represented as the new applied-practice completion.

## Operational boundaries

- Browser storage may be lost and is **not encrypted, automatically synced, moderated or backed up**.
- Do not enter passwords, wallet recovery phrases, confidential business information or participant personal data in exercise responses.
- User-entered writing is escaped when re-rendered. Length limits and validation are applied to state and artifact drafts.
- The application uses system fonts and no runtime JavaScript library dependencies beyond browser APIs.
- An HTML meta Content Security Policy restricts script sources, object embedding and network access. Inline styles remain permitted for current UI progress rendering. Meta CSP cannot enforce all directives available to HTTP headers. A future server should implement an audited response-header policy.
- The browser confirmation before reset warns that removing local data is irreversible on that device; exported copies remain the user's responsibility.

## Future trusted certification

Before an official credential, build identity and consent, proper server-side assessment control, a rigorous practical evaluation rubric with human oversight, appeals, data retention/deletion policies, a verifiable issuer, expiration/revocation, and an independent verifier. Neither BodyBagz Forge nor any third party should grant privileges based on localStorage or user-edited JSON.

Report vulnerabilities privately to repository maintainers rather than posting secrets in public issues.
