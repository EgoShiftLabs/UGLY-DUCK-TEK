// Extracted curriculum from the BodyBagz Ecosystem V0.2 integration baseline.
// A standalone education content module; no hub storage or account access.
const MC=(prompt,options,answer)=>({prompt,options,answer});
export const LESSONS=[
{id:"orientation",name:"Builder Orientation",subtitle:"Beyond the meme. Build for a real purpose.",time:"12 MIN",intro:"Culture can bring people together. That attention becomes sustainable only when communities deliver useful experiences, knowledge, services or creative work. BodyBagz welcomes original expression, but recognition is not a substitute for accountability.",principle:"A responsible builder can explain whom a project serves, what will be delivered, and what evidence will demonstrate progress.",points:["Define the audience and the problem before proposing a token.","Separate community excitement from verified demand.","Describe a concrete deliverable that exists without a speculative price."],task:"Write a one-paragraph concept: audience, concrete value, first deliverable, and what would change your mind.",questions:[
 MC("Which is the strongest starting point for a cultural project?",["Token price goals","A defined audience and useful outcome","A famous influencer's attention"],1),
 MC("What distinguishes a mission from a promotion?",["A measurable commitment to delivering value","A louder campaign","A claim that everyone will profit"],0),
 MC("A project without a token can still succeed when it…",["Delivers meaningful music, education or utility","Never releases anything","Promises a future listing"],0),
 MC("A useful first milestone is…",["Number of emojis posted","A published prototype with user feedback","An arbitrary market cap"],1),
 MC("The builder's responsibility includes…",["Avoiding inconvenient questions","Being clear about limitations and evidence","Creating urgency without facts"],1)
]},
{id:"literacy",name:"Digital & Web3 Literacy",subtitle:"Know what you're actually building on.",time:"16 MIN",intro:"Digital infrastructure includes websites, APIs, data sources, wallets, blockchains and smart contracts. A credible builder should know which parts are public information and which require trusted accounts or private credentials.",principle:"Always know which system stores data, who can modify it, and what constitutes a verified source of truth.",points:["Distinguish a client-side prototype from a secure backend.","Verify a token by its exact contract or mint address, not ticker alone.","Treat explorer data as evidence of transactions, not proof of the project's legitimacy."],task:"Draw a simple architecture showing your app, user data, public feeds and optional wallet signing.",questions:[
 MC("Why does a token ticker alone not identify a token?",["Tickers are unique worldwide","Different contracts can share the same ticker","Blockchain names are secret"],1),
 MC("What should be kept out of public frontend code?",["Read-only public documentation","Private keys and API credentials","UI styling"],1),
 MC("What does a blockchain explorer reliably show?",["On-chain records and transactions","The future market price","Whether everyone involved is honest"],0),
 MC("What is the main limitation of browser localStorage?",["It provides verified identity","It is local and is not secure multi-device account storage","It automatically backs up to a blockchain"],1),
 MC("Before using data in an analysis, a builder should check…",["Its source, timestamp, meaning and limitations","Only its visual appearance","Whether an influencer reposted it"],0)
]},
{id:"execution",name:"Execution Discipline",subtitle:"Ship, measure, improve.",time:"13 MIN",intro:"Hype rewards speed, but real capability requires repeatable execution. A team should define deliverables, assign ownership, establish evidence and publish progress without turning every update into a promise of future returns.",principle:"The smallest useful product tested by real people beats an enormous roadmap nobody can evaluate.",points:["Set one outcome and one short-term deliverable at a time.","Log decisions and learn from missed deadlines.","Design experiments that can fail without endangering users."],task:"Write a two-week build sprint with owner, deadline, demonstration criteria, and a fallback if the task slips.",questions:[
 MC("What is a verifiable milestone?",["A working feature that someone can test","We will shock the world soon","Number go up"],0),
 MC("When a sprint misses a deadline, the team should…",["Hide the slip","Explain causes and revise scope transparently","Blame the community"],1),
 MC("A builder experiment should have…",["A defined success criterion","An undisclosed price target","Only positive feedback"],0),
 MC("What is the best reason to cut scope?",["To avoid any users","To finish a useful, testable piece","To conceal risk"],1),
 MC("A decision log helps because it…",["Preserves assumptions and lessons","Guarantees a correct decision","Replaces accountability"],0)
]},
{id:"governance",name:"Governance & Multisig",subtitle:"Power needs boundaries.",time:"17 MIN",intro:"Governance defines who can decide, who can execute, and how a community can review decisions. Multisignature custody can require several approvals for sensitive actions, but only when independent signers and clear procedures actually exist.",principle:"Separate proposal, review, and authorization. Nobody should gain transaction authority merely by finishing a quiz.",points:["Document roles, quorum, emergency procedures and conflicts of interest.","Use independent verification before granting treasury or pairing privileges.","Treat community polling as input, not a substitute for lawful authorization."],task:"Draft an approval matrix showing who may propose, review and execute a treasury or liquidity action.",questions:[
 MC("What is a primary purpose of multisignature approval?",["Eliminate all technical risk","Require more than one authorized approval","Automatically guarantee profit"],1),
 MC("A certificate should automatically allow someone to mint on behalf of BodyBagz?",["Yes, with no review","No, execution requires separate authorization","Only on social media"],1),
 MC("A sound governance policy documents…",["Roles, quorum and conflicts","Only marketing slogans","An unlimited treasury budget"],0),
 MC("Community votes should be interpreted as…",["Input to an authorized process","Proof that a token is safe","Authority to access anyone's wallet"],0),
 MC("Independent signers improve security when…",["They share one seed phrase","Their keys and decisions are genuinely separate","They never review proposals"],1)
]},
{id:"custody",name:"Risk, Custody & Operations",subtitle:"Protect people before transactions.",time:"18 MIN",intro:"Builders face phishing, spoofed tokens, unreliable data, wallet concentration, opaque allocations and smart-contract powers. A responsible ecosystem checks technical and economic risk before anyone has access to assets or public launch permissions.",principle:"No one should be asked to expose a seed phrase, trust an unverified mint, or confuse a liquidity pair with guaranteed value.",points:["Never share keys, recovery phrases or wallet signing rights with an unverified tool.","Review token authorities, distributions, liquidity and fee disclosures.","Separate read-only research from transactions and hold a human approval gate."],task:"Create a risk checklist for a proposed $BAGZ quote-asset pairing, including technical eligibility and fee transparency.",questions:[
 MC("What should someone do if a website requests their wallet seed phrase?",["Enter it to continue","Refuse and leave","Share only half"],1),
 MC("A $BAGZ-quoted token pair guarantees demand for BAGZ.",["True","False","Only if promoted"],1),
 MC("Which is an important launch risk to disclose?",["Token supply and privileged allocations","Your favorite meme","The founder's birthday"],0),
 MC("What is safest for the first ecosystem pairing prototype?",["Automatic private-key access","Read-only eligibility research and explicit human review","Unrestricted one-click minting"],1),
 MC("A source URL and observation timestamp matter because…",["They help reviewers verify the evidence","They predict next week's price","They replace authorization"],0)
]},
{id:"long-term",name:"Long-Term Builder Mindset",subtitle:"Create what survives the cycle.",time:"14 MIN",intro:"Trends come and go. Culture persists when people build archives, skills, useful tools, community trust and work they are proud to pass forward. A project should have a credible purpose even if its token price never appreciates.",principle:"Build an ecosystem where participation expands people's capacity, not just their exposure to speculation.",points:["Create original intellectual property and respect others' rights.","Measure education, real participation, and useful products, not hype alone.","Plan for maintenance, handoff, funding sustainability and responsible shutdown."],task:"Outline a project that still matters in twelve months if token speculation disappears tomorrow.",questions:[
 MC("The strongest sign of long-term cultural value is…",["A project continues delivering meaning and utility","An influencer posts a rocket emoji","A short-lived price spike"],0),
 MC("Original cultural creation requires…",["Respect for intellectual property and contributors","Copying recognizable characters without rights","Hiding authorship"],0),
 MC("Which metric best reflects an educational program?",["Learners completing real work and applying skills","Token volatility","The number of misleading announcements"],0),
 MC("A sustainable handoff should include…",["Documentation and clear responsibilities","An inaccessible private key","No maintenance plan"],0),
 MC("Good builders should be prepared to…",["Change course when the evidence demands it","Ignore all criticism","Guarantee investment results"],0)
]}];

export const getLesson=id=>LESSONS.find(x=>x.id===id);
export const PASS_SCORE=4;
export function gradeLesson(id,answers){
 const lesson=getLesson(id);if(!lesson)throw Error("Unknown lesson");
 if(!Array.isArray(answers)||answers.length!==lesson.questions.length)throw Error("Answer all five questions");
 return lesson.questions.reduce((total,q,i)=>total+(Number(answers[i])===q.answer?1:0),0);
}
