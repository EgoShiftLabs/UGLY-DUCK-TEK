# UGLY DUCK TEK — Practice-only Security Model

Version 0.1 is a static, offline-friendly browser practice experience. All state is saved under `ugly-duck-tek.practice.v1` in the browser's localStorage and is neither encrypted nor backed up. Notes and progress can be modified by the user or any script running under the same origin.

- No authenticated accounts, API keys, private data server, wallets, seed phrases, official certificates or NFT minting.
- Quiz answers and logic are visible in the client. Passing scores are **not** evidence of identity or competence for high-trust purposes.
- The `bodybagz.local-practice.v1` export is an editable, unverified practice receipt. It must never authorize fund access or minting.
- Cross-origin module access to BodyBagz hub localStorage is deliberately absent. Do not create it during integration.
- Builder exercise text is escaped before rendering. Never enter private keys, secrets or sensitive personal information.
- Real credentials would require independent identity, secure assessment records, signed issuer claims, expiration/revocation, and server-side verification; client-side local pass flags cannot fulfill those requirements.

Report security issues privately to repository maintainers rather than posting secrets into public issues.
