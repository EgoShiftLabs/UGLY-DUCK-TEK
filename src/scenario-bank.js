// Applied scenario bank: answers are intentionally visible in this practice-only client, not certification-grade exam security.
export const SCENARIOS = {
  "orientation": [
    {
      "prompt": "A neighborhood group wants an app to organize volunteer rides. You have one week and no evidence of demand. What should you do first?",
      "options": [
        "Build registration and payment screens immediately",
        "Interview five riders and drivers about existing scheduling problems",
        "Design a campaign explaining why the app will go viral",
        "Recruit a celebrity spokesperson before asking users"
      ],
      "answer": 1,
      "why": "Direct observation of the last real scheduling failure reveals the actual problem before product decisions."
    },
    {
      "prompt": "Three artists praise your idea for a shared credits tool, but none has tried it. What does that evidence establish?",
      "options": [
        "The idea has verified product-market fit",
        "The tool is technically secure",
        "There is interest worth testing, but no proof it works",
        "You may promise future adoption based on the endorsements"
      ],
      "answer": 2,
      "why": "Stated enthusiasm is not the same as observed adoption or successful task completion."
    },
    {
      "prompt": "An education project can deliver only one item this month. Which first milestone is most testable?",
      "options": [
        "A published sample lesson completed by three learners with recorded feedback",
        "An announcement that the full academy will change the industry",
        "A token launch to create attention for future lessons",
        "A partnership page with logos and no confirmed partners"
      ],
      "answer": 0,
      "why": "A real artifact and recorded user outcome can be evaluated and improved."
    },
    {
      "prompt": "A pilot team discovers that participants do not understand its instructions. Which choice best demonstrates learning?",
      "options": [
        "Repeat the same instructions more loudly",
        "Hide the confusion to protect the launch narrative",
        "Add more promotional content before testing again",
        "Rewrite the instructions and rerun the test against a defined success measure"
      ],
      "answer": 3,
      "why": "A builder modifies the deliverable and checks whether the observed problem improves."
    },
    {
      "prompt": "A volunteer says they would use your guide but never follows through. What should you conclude?",
      "options": [
        "The guide will be successful once promoted widely",
        "Their statement is weak evidence; test whether they actually perform the task",
        "The volunteer must be excluded from future feedback",
        "You should add paid access so they take it seriously"
      ],
      "answer": 1,
      "why": "Observed behavior is stronger evidence than hypothetical intent."
    }
  ],
  "literacy": [
    {
      "prompt": "A course website stores completed quizzes only in browser localStorage. A learner signs in from another device. What should you expect?",
      "options": [
        "All scores appear because localStorage syncs automatically",
        "The learner can prove identity with the exported JSON",
        "Scores will not automatically appear because there is no shared authoritative service",
        "The scores become permanent once the browser displays a progress bar"
      ],
      "answer": 2,
      "why": "Browser-local storage is not a multi-device record or an identity authority."
    },
    {
      "prompt": "A screenshot claims a token project earned $2 million last month. Which verification step is strongest?",
      "options": [
        "Trace the original source, date, methodology and independently inspect the underlying figures",
        "Check whether the screenshot has a professional color palette",
        "Ask whether the biggest influencer agrees",
        "Assume the figure is correct if a price chart accompanies it"
      ],
      "answer": 0,
      "why": "Provenance, definitions, and independently checkable measurements matter more than presentation."
    },
    {
      "prompt": "You are diagramming workshop registration. Which system should prevent the final seat being sold twice?",
      "options": [
        "A hidden field in each visitor's browser",
        "A social media admin account",
        "A CSV downloaded once per week",
        "A server-side authoritative capacity check applied when reservations are recorded"
      ],
      "answer": 3,
      "why": "Authority must sit in a system that coordinates competing writes, not a visitor's browser."
    },
    {
      "prompt": "A contractor asks you to paste the project's API secret into a public issue to debug an integration. What is the safest next step?",
      "options": [
        "Post only the first 20 characters of the key",
        "Decline, use a protected channel, and rotate the key if already exposed",
        "Put the key in a public screenshot instead",
        "Use the same key in both staging and production to simplify debugging"
      ],
      "answer": 1,
      "why": "Secrets belong in controlled secret management, not public project records."
    },
    {
      "prompt": "An explorer shows a large transfer between wallets. Which conclusion is supported by that observation alone?",
      "options": [
        "The recipient is certainly the project's founder",
        "The transfer proves the project has a healthy business",
        "A transfer was recorded; ownership, motives and future value require separate evidence",
        "The transfer guarantees the asset is liquid"
      ],
      "answer": 2,
      "why": "On-chain data can show a transaction without proving identities, intent or viability."
    }
  ],
  "execution": [
    {
      "prompt": "Your sprint goal is to help five residents sign up for a class. Which criterion is testable?",
      "options": [
        "We will create a world-class community experience",
        "The design will look futuristic",
        "We will impress a local sponsor",
        "Five residents complete signup on phones and each receives accurate session details"
      ],
      "answer": 3,
      "why": "An acceptance criterion should specify observable behavior and expected results."
    },
    {
      "prompt": "Two days into a sprint, one feature blocks the launch but is not essential to the user goal. What is the best response?",
      "options": [
        "Record the tradeoff and defer the nonessential feature while protecting the core flow",
        "Hide the defect and claim the full feature exists",
        "Extend the project indefinitely without reassessing",
        "Replace the user goal with a publicity metric"
      ],
      "answer": 0,
      "why": "Explicit scope management keeps useful output and makes tradeoffs reviewable."
    },
    {
      "prompt": "A campaign drove 4,000 views, but only two people completed the workshop registration. Which measure should guide next action?",
      "options": [
        "Views alone: attention proves the program works",
        "The registration completion rate and points where users drop out",
        "The number of emojis in comments",
        "The market cap of a related token"
      ],
      "answer": 1,
      "why": "The relevant outcome is whether the user can accomplish the goal, not how many people saw the promotion."
    },
    {
      "prompt": "A feature misses its planned completion date. What should the decision log include?",
      "options": [
        "Only the revised launch date",
        "A note blaming the developer",
        "The original assumption, reason for delay, evidence and revised action owner",
        "A private statement that the team worked very hard"
      ],
      "answer": 2,
      "why": "A decision log preserves the sequence of commitments and what changed."
    },
    {
      "prompt": "You have no budget for a mobile app, but volunteers need shift reminders next week. Which first version is most reasonable?",
      "options": [
        "Pause all delivery until native apps exist",
        "Develop a custom blockchain notification protocol",
        "Launch a full membership system before testing reminders",
        "Use a simple consent-based email or SMS workflow and measure missed shifts"
      ],
      "answer": 3,
      "why": "A focused, low-cost approach tests the actual problem before committing to complex infrastructure."
    }
  ],
  "governance": [
    {
      "prompt": "A team member requests grant money to buy equipment from a store owned by their relative. What is the most defensible process?",
      "options": [
        "Allow them to approve because they know the vendor",
        "Document the conflict, recuse them from approval, and compare independent quotations",
        "Decline every future grant application",
        "Let the vendor certify that its prices are fair"
      ],
      "answer": 1,
      "why": "Independent review and conflict disclosure protect the legitimacy of decisions."
    },
    {
      "prompt": "A community poll favors releasing a shared mailing list publicly. What should the administrators do?",
      "options": [
        "Publish it because the poll was popular",
        "Treat the poll as a legal waiver",
        "Ignore the issue and announce that openness was approved",
        "Check consent and privacy obligations; community preference does not override participant rights"
      ],
      "answer": 3,
      "why": "Participation is input, not authority to disregard privacy or consent."
    },
    {
      "prompt": "A project uses a three-person multisignature wallet, but all signers store their recovery words in the same shared document. What is the risk?",
      "options": [
        "The shared document defeats much of the independent-approval security benefit",
        "Three signatures always prevent misuse regardless of key storage",
        "The wallet becomes safer as more people know the same recovery words",
        "No risk exists if the document is named confidential"
      ],
      "answer": 0,
      "why": "Signer independence matters; common secret custody creates a single point of failure."
    },
    {
      "prompt": "Who should approve granting a volunteer access to private learner data?",
      "options": [
        "Any team member who is online",
        "The volunteer's social-media followers",
        "A designated accountable owner using a documented minimum-access rule",
        "The volunteer automatically after completing practice quizzes"
      ],
      "answer": 2,
      "why": "Permission needs an authorized reviewer and a reason tied to the role."
    },
    {
      "prompt": "A participant believes an application was rejected unfairly. What design best protects trust?",
      "options": [
        "Remove all evaluation criteria from the site",
        "Publish criteria and offer a documented correction or appeal route",
        "Force the participant to promote the project before appeal",
        "Delete the submission record immediately"
      ],
      "answer": 1,
      "why": "Transparency and an appeal path allow mistakes to be corrected without promising acceptance."
    }
  ],
  "custody": [
    {
      "prompt": "A team discovers an administrator login from an unknown country. What is the best first sequence?",
      "options": [
        "Tweet that the attacker has been caught",
        "Delete all logs and restart the website",
        "Contain access, preserve evidence, rotate credentials and assess possible exposure",
        "Wait for a second login before acting"
      ],
      "answer": 2,
      "why": "Respond by containing the incident, preserving evidence and assessing harm."
    },
    {
      "prompt": "A workshop app collects birthdays, home addresses and medical details even though it only needs an email for reminders. What is the strongest design change?",
      "options": [
        "Collect only the information needed for the reminder and document retention",
        "Hide the extra fields behind a menu",
        "Tell users their data is secure without changing collection",
        "Move all extra fields into browser storage"
      ],
      "answer": 0,
      "why": "Data minimization reduces exposure and operational obligations."
    },
    {
      "prompt": "Two volunteers share an admin password so either can update event listings. What is a safer alternative?",
      "options": [
        "Post the password in a pinned group message",
        "Use a longer shared password but keep sharing it",
        "Ask one volunteer to approve every change over chat",
        "Provide separate limited-privilege accounts and log who changes what"
      ],
      "answer": 3,
      "why": "Individual accounts and least privilege allow accountability and revocation."
    },
    {
      "prompt": "A crypto-focused project is considering a quoted token launch. Which statement is appropriate to share?",
      "options": [
        "A quoted pair ensures demand for the quote token",
        "Eligibility, allocations, fees and liquidity must be verified; no return is guaranteed",
        "All token launches receive the same liquidity support",
        "A course practice record proves the builder is authorized"
      ],
      "answer": 1,
      "why": "Real risks and provider-specific mechanics need disclosure and independent authorization."
    },
    {
      "prompt": "Your project's public GitHub repository accidentally includes a live API key. What must happen?",
      "options": [
        "Remove the visible line in the next release; the key remains safe",
        "Rename the repository",
        "Revoke or rotate the exposed key, remove it from active use and inspect logs",
        "Make the repository private without changing credentials"
      ],
      "answer": 2,
      "why": "Once a secret is public it must be treated as compromised even if the file is edited later."
    }
  ],
  "long-term": [
    {
      "prompt": "A community resource has one volunteer who owns the domain and admin login. What is the most urgent continuity improvement?",
      "options": [
        "Give a successor documented, authorized recovery and handoff procedures",
        "Launch a promotional campaign before the volunteer leaves",
        "Assume a registrar will recover everything automatically",
        "Store passwords publicly so nobody can lose access"
      ],
      "answer": 0,
      "why": "Documented stewardship and authorized recovery reduce dependence on one person."
    },
    {
      "prompt": "An artist uses a collaborator's recording in a new release. The collaborator participated but no usage terms were documented. What should happen before distribution?",
      "options": [
        "Assume participation grants unlimited rights",
        "Remove the collaborator's credit so fewer people notice",
        "Confirm reuse permissions, ownership and attribution in writing",
        "Publish immediately and negotiate only after complaints"
      ],
      "answer": 2,
      "why": "Contributor rights and reuse permissions should be clear before publishing the work."
    },
    {
      "prompt": "The project is popular for one month but attendance then declines. Which evidence should guide the next investment?",
      "options": [
        "Initial launch-day impressions alone",
        "Rumors that a related token might increase in value",
        "The founder's confidence that success will return",
        "Retention and participant outcomes, plus direct feedback about why they stopped"
      ],
      "answer": 3,
      "why": "Sustained outcomes and feedback can reveal what deserves continued resources."
    },
    {
      "prompt": "A nonprofit plans to shut down its workshop registration site. Which closure plan best protects users?",
      "options": [
        "Leave the website online indefinitely without maintenance",
        "Notify participants, manage retention/deletion, transfer essential obligations and document the closure",
        "Sell all registration information to fund the next project",
        "Remove the domain without notice"
      ],
      "answer": 1,
      "why": "Responsible wind-down accounts for data, obligations and continuity."
    },
    {
      "prompt": "An independent learning tool loses its sponsor. Which strategy makes it most resilient?",
      "options": [
        "Document recurring costs, cut nonessential scope and plan a handoff or sustainable funding source",
        "Assume community enthusiasm guarantees ongoing hosting",
        "Require every learner to buy a speculative token",
        "Remove all project records and begin anew"
      ],
      "answer": 0,
      "why": "Maintenance plans and adaptable scope help preserve useful work independent of hype."
    }
  ]
};
