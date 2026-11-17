// Independent educational content; examples are illustrative and should be validated with learners.
export const CONTENT = {
  "orientation": {
    "objectives": [
      "Identify a real audience and job-to-be-done rather than starting with a product pitch.",
      "Separate the problem you observed from assumptions about what users want.",
      "Define a small deliverable and a disconfirming test before spending money."
    ],
    "sections": [
      {
        "title": "Start with a real person, not a feature",
        "paragraphs": [
          "A builder begins by observing where people lose time, money, access, or confidence. Describe an actual group and the situation they face. “Creators need a platform” is too broad; “independent musicians cannot find an easy way to document who owns each recording” is specific enough to investigate.",
          "A problem statement should say who experiences the friction, when it occurs, and what they do today. Ask three people to walk you through the last time it happened. Their existing workaround is evidence; their praise of your idea is not.",
          "Avoid collecting private information you do not need. Speak with volunteers, disclose your purpose, and record patterns rather than identifying individuals."
        ]
      },
      {
        "title": "Value means a change someone can notice",
        "paragraphs": [
          "An idea can be cultural, commercial, educational, or community-driven. Its value is not determined by whether it has a token. Describe the before-and-after state: a learner can publish a portfolio, a neighborhood group can coordinate volunteer shifts, or an artist can distribute a rights checklist.",
          "Your first deliverable should be observable within a short sprint: a downloadable guide, a tested landing page, a working signup prototype, or one facilitated workshop. A vision statement cannot replace that deliverable."
        ]
      },
      {
        "title": "Test the riskiest assumption first",
        "paragraphs": [
          "Before building a full app, ask what must be true for the idea to matter. Maybe participants must return weekly, or collaborators must agree to the licensing model. Create a low-cost test and choose a result that would make you change direction.",
          "Record the result as evidence, including the uncomfortable parts. A “no” from users can save months of work. The purpose of the first experiment is learning, not proving that the founder was right."
        ]
      }
    ],
    "example": {
      "title": "A community music rights starter kit",
      "context": "A local group of independent artists says they want help collaborating without ownership disputes.",
      "steps": [
        "Interview three artists about their last collaboration and record the common point of confusion.",
        "Create a one-page checklist of contributor names, permission to reuse material, and decision owners.",
        "Run one voluntary pilot with two artists; ask whether they can complete the checklist without help.",
        "Record where they struggle, revise the checklist, and decide whether a digital tool is necessary."
      ],
      "outcome": "Evidence is two completed pilot checklists and specific feedback—not a promise about future token prices."
    },
    "antiPattern": "A builder announces “the future of creator ownership” and spends weeks designing a logo before confirming anyone needs the workflow.",
    "template": [
      {
        "key": "audience",
        "label": "Who experiences the problem?",
        "prompt": "Name a specific group and a real situation they encounter.",
        "example": "Independent musicians coordinating shared song releases."
      },
      {
        "key": "friction",
        "label": "What happens today?",
        "prompt": "Describe the current workaround, pain, and evidence you have.",
        "example": "Credits are exchanged through scattered messages and errors cause disputes."
      },
      {
        "key": "deliverable",
        "label": "What will you ship first?",
        "prompt": "Define a small, observable release that people can actually try.",
        "example": "A one-page, reusable collaboration rights checklist tested by two artists."
      },
      {
        "key": "proof",
        "label": "What would change your mind?",
        "prompt": "Set a test, a measure, and a result that would cause revision.",
        "example": "If two pilots cannot use it unassisted, redesign before writing software."
      }
    ],
    "rubric": [
      "A real audience and situation are named.",
      "The current workaround is described separately from guesses.",
      "The first deliverable can be shown or tested.",
      "A disconfirming test and decision rule are explicit."
    ]
  },
  "literacy": {
    "objectives": [
      "Sketch a simple system showing browser, data storage, server, and third-party services.",
      "Identify evidence provenance and distinguish an address, a name, and an authenticated identity.",
      "Apply a basic secrets-handling and account-security checklist."
    ],
    "sections": [
      {
        "title": "Follow the data, not the brand names",
        "paragraphs": [
          "A webpage, an API, a database, and a blockchain do different jobs. The browser renders the interface. A backend can authorize account actions. A database stores application records. An API makes selected functions available. A blockchain records transactions under its network rules. Do not assume a polished interface has any of the latter.",
          "For every feature, ask: Where is the authoritative record? Who can change it? What happens offline? If a practice quiz writes only to localStorage, that record belongs to the browser and can be edited. It cannot be treated as proof of identity, qualification, or payment.",
          "A useful data-flow drawing is three boxes—user, application, and storage—with arrows labeled by the data transferred and the permission required."
        ]
      },
      {
        "title": "Research sources require context",
        "paragraphs": [
          "A screenshot can show what someone posted, but it does not establish that the underlying claim was true. Record who published a source, its publication date, its original URL, and what it actually measures. An old chart shared today is still an old chart.",
          "Differentiate reported figures, direct observations, and your interpretation. A dashboard that shows a transaction can verify a recorded transaction; it cannot prove that a project has legitimate founders, future buyers, or a sustainable business.",
          "If two sources disagree, inspect definitions and time windows before treating one as malicious."
        ]
      },
      {
        "title": "Security begins with simple operational habits",
        "paragraphs": [
          "Use a password manager and unique passwords, enable multifactor authentication where available, and limit who can access shared accounts. Never paste a private key, seed phrase, or secret API token into a public repository or an untrusted form.",
          "Treat on-chain wallets as an optional specialization. For non-crypto builders, the equivalent risks are shared admin passwords, publicly exposed access tokens, improperly configured cloud storage, and phishing emails. Protecting authority is the common skill."
        ]
      }
    ],
    "example": {
      "title": "Map a workshop registration website",
      "context": "A nonprofit wants a page where attendees reserve a place at a free class.",
      "steps": [
        "Draw browser → registration endpoint → database; label who is allowed to read and write each record.",
        "State what information is essential to register and omit unnecessary personal data.",
        "Explain why a localStorage confirmation would not prove a reservation on another device.",
        "Add a plan for email confirmation, deletion requests, and who can export registrations."
      ],
      "outcome": "The result is an architecture sketch with data sources, access boundaries, and a failure case."
    },
    "antiPattern": "Copying a token symbol or a convincing screenshot as if either proves authenticity; storing an administrator password inside public JavaScript.",
    "template": [
      {
        "key": "audience",
        "label": "System and user action",
        "prompt": "Describe one useful action your system supports and who performs it.",
        "example": "A volunteer registers for a free training workshop."
      },
      {
        "key": "friction",
        "label": "Data flow",
        "prompt": "List each component and what information flows to it.",
        "example": "Browser sends selected session and email to an authenticated registration API."
      },
      {
        "key": "deliverable",
        "label": "Authority and privacy",
        "prompt": "Explain which part decides success and what data must be protected.",
        "example": "The server checks seat capacity and stores only contact information needed for reminders."
      },
      {
        "key": "proof",
        "label": "Failure and safety test",
        "prompt": "Describe one way the flow can fail and how you will detect or reduce that risk.",
        "example": "Two registrations arrive for the last seat; server transaction prevents double booking."
      }
    ],
    "rubric": [
      "A concrete user action and system boundary are identified.",
      "Components and information flows are traceable.",
      "Authority and minimum-data needs are explicit.",
      "At least one realistic failure test is included."
    ]
  },
  "execution": {
    "objectives": [
      "Convert a broad idea into a two-week sprint with a measurable deliverable.",
      "Define a testable acceptance criterion instead of a promise.",
      "Maintain a decision log when assumptions change or work is delayed."
    ],
    "sections": [
      {
        "title": "Choose an outcome, then cut scope",
        "paragraphs": [
          "Execution is a series of decisions under constraints. A sprint goal should describe what a user can accomplish at the end, not how hard the team plans to work. “Help visitors register for one workshop” is measurable; “build the ultimate community platform” is not.",
          "Identify the smallest path through the task. Separate must-have functions from attractive extras. A prototype with one reliable operation and a clear limitation is more useful than a dozen buttons that imply nonexistent services.",
          "Make the owner and deadline visible. A task without an owner is a wish; an owner without time or evidence cannot be held accountable."
        ]
      },
      {
        "title": "Define acceptance before implementation",
        "paragraphs": [
          "Write the check you will perform before coding. For a registration form: can a visitor submit valid input, see a truthful confirmation, and recover from an error? Acceptance criteria protect users from shipping illusions.",
          "Distinguish output measures from outcomes. A page launched is an output. People successfully completing a registration is an outcome. Track both, and avoid measuring success with social impressions alone."
        ]
      },
      {
        "title": "Review progress without hiding problems",
        "paragraphs": [
          "At the end of a sprint, compare actual evidence with the acceptance criteria. Record what worked, what failed, and what the team will change. A missed deadline is a planning signal, not an excuse to erase the original commitment.",
          "A decision log should note the assumption, available evidence, decision owner, date, and trigger for reconsideration. It makes learning reusable after people rotate off a project."
        ]
      }
    ],
    "example": {
      "title": "A two-week first release",
      "context": "A small team wants to help neighborhood volunteers coordinate a cleanup day.",
      "steps": [
        "Define one outcome: volunteers can reserve a shift and see the meeting location.",
        "Assign one owner to intake, one to confirmation text, and one to test the mobile page.",
        "Acceptance test: five volunteers can register on phones and receive accurate instructions.",
        "At day fourteen, publish observed completion rates, failures, and a prioritized next iteration."
      ],
      "outcome": "The sprint delivers a tested flow and a decision log; logos, incentives, and gamification wait."
    },
    "antiPattern": "A roadmap lists fifteen features, no owners or acceptance tests, then announces that the launch was a success based on impressions.",
    "template": [
      {
        "key": "audience",
        "label": "Sprint outcome and audience",
        "prompt": "State one change a specific user should be able to accomplish in two weeks.",
        "example": "Five volunteers can register for a cleanup shift without staff assistance."
      },
      {
        "key": "friction",
        "label": "Tasks and owners",
        "prompt": "List two to four tasks, a responsible person or role, and dependencies.",
        "example": "Designer: form layout; organizer: shift inventory; tester: mobile walkthrough."
      },
      {
        "key": "deliverable",
        "label": "Acceptance evidence",
        "prompt": "Describe exactly what can be demonstrated and how success will be measured.",
        "example": "Five successful registrations; each receives correct location and shift time."
      },
      {
        "key": "proof",
        "label": "Review and contingency",
        "prompt": "Define the review date, what failure looks like, and a fallback.",
        "example": "If registration fails for two users, return to a manual signup sheet while fixing the form."
      }
    ],
    "rubric": [
      "The goal is testable and tied to a user.",
      "Every necessary task has an owner or role.",
      "Acceptance criteria can be independently checked.",
      "A review and fallback decision are specified."
    ]
  },
  "governance": {
    "objectives": [
      "Separate the power to propose, approve, and execute a consequential action.",
      "Design a clear decision and escalation matrix for a small team.",
      "Identify conflicts of interest and document how they are handled."
    ],
    "sections": [
      {
        "title": "Authority and participation are different",
        "paragraphs": [
          "When a community votes on a direction, the result may help shape priorities, but it does not automatically make a purchase legal, authorize a transfer, or create ownership rights. Governance names who can decide and who may act on the decision.",
          "Start with a simple three-column matrix: proposal owner, reviewer, and executor. A small team may combine some roles for low-risk changes; the higher the potential harm, the stronger the separation should be. Financial transfers and access to personal data deserve particular care.",
          "Write the rule before the conflict happens: number of approvals required, recusals, emergency exceptions, and how an incorrect decision is reversed."
        ]
      },
      {
        "title": "Multisignature is one specialized control",
        "paragraphs": [
          "A multisignature wallet can require several independent approvals for an on-chain transaction. That can reduce single-key misuse, but it does not prove the participants are competent or free from conflicts. It also creates recovery and coordination costs.",
          "The same principle works outside crypto: two-person approval for a grant disbursement, a second reviewer before publishing sensitive information, or a documented change request for administrator access. Do not turn an educational quiz into authority over any of these systems.",
          "If multiple signers secretly share one recovery phrase or routinely approve without reviewing, a multisignature design offers a false sense of security."
        ]
      },
      {
        "title": "Design an appeal and an audit trail",
        "paragraphs": [
          "Every consequential decision needs a record of what was requested, who reviewed evidence, what was approved, and when it changed. An audit trail should avoid publishing private applicant information.",
          "Give rejected participants a way to understand the criteria and request correction. Clear appeals protect trust without granting anyone a guaranteed outcome."
        ]
      }
    ],
    "example": {
      "title": "Deciding on a community equipment purchase",
      "context": "A creative collective requests equipment using a shared budget.",
      "steps": [
        "Organizer submits a written request and comparison of two prices.",
        "A reviewer who has no financial relationship to the supplier checks evidence and budget.",
        "Two authorized members approve the expense; someone else records the receipt.",
        "If a reviewer has a personal relationship to the supplier, they recuse themselves and document the replacement reviewer."
      ],
      "outcome": "A clear trail explains who proposed, checked, approved, paid, and later reviewed the outcome."
    },
    "antiPattern": "The same person requests money, approves it, spends it, and marks the project complete with no receipts or recusal process.",
    "template": [
      {
        "key": "audience",
        "label": "Decision and affected people",
        "prompt": "Describe one consequential decision and who it may affect.",
        "example": "Authorize purchase of shared recording equipment for community workshops."
      },
      {
        "key": "friction",
        "label": "Proposal and review roles",
        "prompt": "Who proposes, who checks evidence, and who must abstain if conflicted?",
        "example": "Program lead proposes; independent treasurer compares quotes; vendor relatives recuse."
      },
      {
        "key": "deliverable",
        "label": "Approval and execution controls",
        "prompt": "Name required approvals, execution authority, records and limits.",
        "example": "Two authorized budget approvals are required; payment and receipt recorded separately."
      },
      {
        "key": "proof",
        "label": "Dispute or emergency scenario",
        "prompt": "Describe how a mistake, conflict or urgent exception will be handled.",
        "example": "Suspend release, document conflict, assign independent reviewer, notify affected members."
      }
    ],
    "rubric": [
      "The decision's consequences and affected people are stated.",
      "Proposal, review and execution roles are explicit.",
      "Conflict and approval controls are credible.",
      "The dispute or exception path leaves an audit trail."
    ]
  },
  "custody": {
    "objectives": [
      "Build a basic threat model for one project asset or permission.",
      "Distinguish technical, operational, legal and reputational risks.",
      "Create an incident response checklist that prioritizes affected people."
    ],
    "sections": [
      {
        "title": "Protect what matters before adding features",
        "paragraphs": [
          "Risk management begins by identifying an asset: a domain name, an account, a database, a creator's rights documentation, a shared budget, or a wallet if the project uses crypto. For each asset, ask who can access it and what harm follows from compromise.",
          "A risk register lists the threat, likelihood, impact, owner, preventative control, and response if prevention fails. Not every risk needs an expensive tool; sometimes the right response is two-factor authentication, a backup owner, a clearly published refund policy, or no collection of sensitive data.",
          "Prioritize risks that harm participants, not just risks that embarrass the founder."
        ]
      },
      {
        "title": "Credentials and custody are responsibilities",
        "paragraphs": [
          "Passwords, API tokens, signing keys, and recovery codes give real authority. They should never appear in public code, screenshots, support messages, or a learning exercise. Use least-privilege access, separate recovery options, and revocation procedures.",
          "For crypto-specialized teams, token mint authority, allocation, liquidity, wallet signing, fees, and privileged holders require independent review and truthful disclosure. No pair or contract guarantees demand, appreciation, or liquidity. These are optional advanced cases, not prerequisites for every builder."
        ]
      },
      {
        "title": "Practice a failure response before it happens",
        "paragraphs": [
          "An incident response plan should say who notices, who can temporarily restrict access, how evidence is preserved, when affected people are informed, and how services recover. Avoid pretending that changing a public announcement fixes compromised credentials.",
          "For a lost admin account, the plan may involve suspending tokens, reviewing access logs, and rotating credentials. For a stolen personal device, the plan may involve revoking sessions and restoring backed-up records. The details differ, but rehearsing a realistic case improves readiness."
        ]
      }
    ],
    "example": {
      "title": "A suspicious login alert",
      "context": "A volunteer coordinator receives a notification that someone accessed the project's shared email account.",
      "steps": [
        "Pause sensitive actions and use a trusted device to verify the provider's account activity.",
        "Revoke unknown sessions, rotate the password and recovery codes, and enforce multifactor authentication.",
        "Check whether mailing lists or private registrations were exposed; document facts rather than guessing.",
        "Notify affected participants appropriately and assign a review of access permissions."
      ],
      "outcome": "A timed response plan with owners and evidence is more useful than declaring the issue solved."
    },
    "antiPattern": "A team shares an administrator password in group chat, grants every volunteer full access, and assumes two-factor authentication alone removes all risk.",
    "template": [
      {
        "key": "audience",
        "label": "Asset and possible harm",
        "prompt": "Identify one real asset and who is harmed if it is misused or lost.",
        "example": "Shared workshop registration list; participants risk exposure of contact details."
      },
      {
        "key": "friction",
        "label": "Threat and likelihood",
        "prompt": "Describe a plausible incident, its impact, and the conditions that make it possible.",
        "example": "Phished organizer account could let outsiders export the attendee list."
      },
      {
        "key": "deliverable",
        "label": "Prevention and owner",
        "prompt": "Specify protective controls, responsible owner, and a test.",
        "example": "Separate accounts, MFA, restricted export, quarterly access review by project lead."
      },
      {
        "key": "proof",
        "label": "Response and recovery",
        "prompt": "List first response, evidence, notification decision, and restoration plan.",
        "example": "Revoke access, preserve logs, assess exposure, notify people if required, restore from backup."
      }
    ],
    "rubric": [
      "The asset and affected people are identified.",
      "Threat and impact are plausible, not generic.",
      "A named owner and concrete protective controls exist.",
      "Response steps cover containment, evidence and recovery."
    ]
  },
  "long-term": {
    "objectives": [
      "Design a sustainable plan for maintenance and handoff beyond the first launch.",
      "Connect measurable user outcomes to responsible resource choices.",
      "Document original intellectual property, contributor rights and continuing obligations."
    ],
    "sections": [
      {
        "title": "The launch is the start of operations",
        "paragraphs": [
          "A product that works on release day still needs someone to respond to bugs, renew infrastructure, update content and listen to users. In a small community project, maintenance is often more difficult than the initial build. Identify the minimum monthly cost in both cash and human time.",
          "Choose one outcome that shows the project improves capacity over time: repeat course participation, completed creative work, reduced organizer effort, or reliable access to a community resource. Avoid measuring success only in clicks, impressions, or speculative asset prices.",
          "If the project depends on one unpaid person, document what will happen when that person needs to step away."
        ]
      },
      {
        "title": "Respect ownership and collaboration",
        "paragraphs": [
          "Original cultural work can become lasting intellectual property, but contributors must understand ownership, reuse rights, credit, and the circumstances under which work can be removed. A remix, logo, course, dataset or character may have several creators with different rights.",
          "Write the permission model in plain language before publishing shared assets. Where you use outside work, check its license or get direct permission. Do not assume anything found online is free to repackage.",
          "The same standard applies to AI-generated output: evaluate source obligations, brand confusion, and rights claims before treating generated materials as exclusively yours."
        ]
      },
      {
        "title": "Plan for exit as well as growth",
        "paragraphs": [
          "A responsible operating plan includes an orderly shutdown: export or deletion for user data, ownership of remaining assets, public notice, and preservation of documentation if a service stops. It is better to close a small program honestly than leave participants with broken promises.",
          "A project should still have a meaningful reason to exist if a related token drops in value or disappears. Durable community value is demonstrated through delivered work and relationships, not guaranteed financial results."
        ]
      }
    ],
    "example": {
      "title": "Maintaining a free neighborhood learning library",
      "context": "Volunteers create a website with open lessons and community events.",
      "steps": [
        "Estimate hosting, moderation and content-update hours for the next twelve months.",
        "Choose a monthly review date and one owner responsible for responding to broken links and accessibility feedback.",
        "Publish contributor attribution and licensing terms before accepting new teaching materials.",
        "Document a succession plan: who can export content, transfer domains and responsibly close user accounts."
      ],
      "outcome": "The completed operating plan can survive the departure of the founder or a change in funding."
    },
    "antiPattern": "A project claims permanence, depends entirely on one person's account, publishes material without permissions, and has no backup or shutdown policy.",
    "template": [
      {
        "key": "audience",
        "label": "Continuing value",
        "prompt": "Name who benefits after launch and one measurable long-term outcome.",
        "example": "New learners can still access revised lessons every month, with reported completion feedback."
      },
      {
        "key": "friction",
        "label": "Maintenance and resources",
        "prompt": "Estimate operating costs, human hours, and who owns recurring work.",
        "example": "Two hours of content review monthly and one hosting invoice, owned by the program steward."
      },
      {
        "key": "deliverable",
        "label": "Contributor rights and continuity",
        "prompt": "Describe content/asset ownership, permissions and a practical backup plan.",
        "example": "Each contributor signs a plain-language reuse permission; copies of materials are versioned."
      },
      {
        "key": "proof",
        "label": "Handoff or shutdown test",
        "prompt": "Specify how users are protected if the original team stops maintaining it.",
        "example": "A secondary steward rehearses content export; participants receive advance notice and deletion instructions."
      }
    ],
    "rubric": [
      "Long-term user value is measurable.",
      "Maintenance costs, effort and ownership are explicit.",
      "Rights, attribution, and backups are addressed.",
      "There is a credible handoff or shutdown process."
    ]
  }
};
