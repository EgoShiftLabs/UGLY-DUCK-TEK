# UGLY DUCK TEK — Independent Builder Academy

**Builders before hype.**

UGLY DUCK TEK is a standalone learning product within the BodyBagz cultural-development ecosystem. It teaches practical builder readiness: original value creation, Web3/digital literacy, execution, governance, risk/custody, and long-term mindset.

## Standalone application V0.1

- Six learning tracks, five knowledge questions each (30 total).
- Self-checked assessments with 4/5 minimum per track and unlimited practice retries.
- Real builder exercises with personal working notes (NOT independently graded).
- Local device progress, an editable local completion milestone, and a JSON practice export.
- Independent static frontend, its own storage key and tests.
- **No authenticated identity, official certification, NFT issuance, token-gating authority, account, wallet connection, or fee.**

The course uses the foundational six-module content drafted in the BodyBagz Ecosystem V0.2 integration preview. The learning product now has **no runtime import from that hub**, no shared localStorage key, and no credentials that another app can trust.

## Run it

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
npm run quality
```

The GitHub Actions quality workflow also runs a Playwright desktop/mobile interaction test covering fail-and-retry scoring, persisted notes, all six modules, export and no-JavaScript fallback.

### GitHub Pages

Pages is **not yet enabled** for this new repository. When ready, choose **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**. GitHub then determines when the site is deployed; the expected URL is:

https://egoshiftlabs.github.io/UGLY-DUCK-TEK/

Do not describe this address as live until the Pages deployment has succeeded.

## Integration contract pinned to hub V0.2

Export format: `bodybagz.local-practice.v1` (local, unverified). The immutable source reference is:

https://github.com/EgoShiftLabs/BodyBagz-Ecosystem/blob/690ca6e66dc705ce6eb2b963932a873dea73342f/contracts/practice.v1.schema.json

An exact standalone copy is kept at `contracts/practice.v1.schema.json` to ensure compatibility. The schema describes file interchange, **not** proof of learner identity. A user can edit or fabricate this data.

Never treat a local pass or exported JSON file as official eligibility for BAGZ Forge membership, token launch rights, funds, or governance. A future authentic certificate will require a separately audited issuer, learner identity, signed credentials, revocation, independent server-side verification, and consent.

## Next milestones

1. Separate curriculum content into publishable, accessible lessons with expanded examples, reading resources and practical exercises.
2. Introduce an evidence-based project portfolio and assessment rubric; basic multiple choice alone is not sufficient for serious certification.
3. Validate comprehension with pilot learners and accessibility tests, including screen readers and physical phones.
4. Design secure credential issuance as a separate future service, not browser-local authorization.
5. Eventually connect through explicit user consent to BAGZ Forge. This app must stay useful independently of any cryptocurrency purchase.

See [SECURITY.md](docs/SECURITY.md).
