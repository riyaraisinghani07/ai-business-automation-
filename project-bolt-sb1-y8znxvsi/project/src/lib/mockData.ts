import type { Lead, Candidate, Project, Invoice, AiAction } from '../types';

const companies = ['TechCorp', 'InnovateCo', 'DataFlow Inc', 'CloudNine Solutions', 'PixelPerfect', 'NexGen Systems', 'ByteWorks', 'DigitalEdge', 'SmartLogic', 'FutureTech', 'QuantumLeap', 'SynergyGroup', 'AlphaWave', 'ProSoft', 'BrightPath', 'CoreVision', 'EliteTech', 'MetaSphere', 'OptimaNet', 'PulsePoint'];
const contacts = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Rivera', 'Lisa Wang', 'David Brown', 'Anna Lee', 'Tom Wilson', 'Jessica Martinez', 'Robert Kim', 'Maria Garcia', 'Chris Anderson', 'Nancy Taylor', 'James Moore', 'Patricia White', 'Kevin Harris', 'Susan Clark', 'Daniel Lewis', 'Karen Walker'];
const statuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
const skillSets = [['React', 'TypeScript', 'Node.js'], ['Python', 'Django', 'PostgreSQL'], ['Java', 'Spring', 'AWS'], ['Vue.js', 'JavaScript', 'CSS'], ['Go', 'Docker', 'Kubernetes'], ['React', 'GraphQL', 'MongoDB'], ['Swift', 'iOS', 'Xcode'], ['Angular', 'RxJS', 'NgRx'], ['C#', '.NET', 'Azure'], ['Ruby', 'Rails', 'Redis']];
const projectNames = ['Project Alpha', 'Project Beta', 'Digital Transformation', 'Cloud Migration', 'Mobile App Redesign', 'API Integration Hub', 'Data Pipeline Overhaul', 'Security Compliance', 'Customer Portal', 'Analytics Platform', 'ERP Upgrade', 'E-Commerce Revamp', 'Microservices Architecture', 'CI/CD Pipeline', 'AI Chatbot Integration', 'Payment Gateway', 'CRM Customization', 'Reporting Dashboard', 'Infrastructure Scaling', 'DevOps Automation'];
const customers = ['Acme Corp', 'Globex Inc', 'Stark Industries', 'Wayne Enterprises', 'Umbrella Corp', 'Cyberdyne Systems', 'Oscorp', 'Massive Dynamic', 'Soylent Corp', 'Initech', 'Hooli', 'Piedmont', 'Bluth Company', 'Dunder Mifflin', 'Prestige Worldwide'];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}

function generateLeads(count: number): Lead[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `lead-${i + 1}`,
    user_id: 'demo',
    company: `${pick(companies)} ${rand(1, 5)}`,
    contact: pick(contacts),
    lead_score: rand(10, 100),
    status: pick(statuses),
    estimated_value: rand(5000, 250000),
    created_at: new Date(Date.now() - rand(0, 90) * 86400000).toISOString(),
  }));
}

function generateCandidates(count: number): Candidate[] {
  const roles = ['Frontend Developer', 'Backend Engineer', 'Data Scientist', 'DevOps Engineer', 'Product Manager', 'UX Designer', 'Full Stack Developer', 'Mobile Developer', 'Security Analyst', 'ML Engineer'];
  return Array.from({ length: count }, (_, i) => ({
    id: `candidate-${i + 1}`,
    user_id: 'demo',
    name: pick(contacts),
    skills: pick(skillSets),
    experience: rand(1, 15),
    education: pick(['MIT', 'Stanford', 'Harvard', 'Berkeley', 'Georgia Tech', 'Carnegie Mellon', 'Caltech', 'Princeton', 'Cornell', 'UCLA']),
    score: rand(30, 100),
    status: pick(['applied', 'screening', 'interview', 'offered', 'hired', 'rejected'] as Candidate['status'][]),
    role: pick(roles),
    created_at: new Date(Date.now() - rand(0, 60) * 86400000).toISOString(),
  }));
}

function generateProjects(count: number): Project[] {
  const projectStatuses: Project['status'][] = ['active', 'at_risk', 'delayed', 'completed', 'cancelled'];
  return Array.from({ length: count }, (_, i) => ({
    id: `project-${i + 1}`,
    user_id: 'demo',
    project_name: projectNames[i % projectNames.length],
    risk_score: rand(0, 100),
    budget: rand(50000, 2000000),
    status: pick(projectStatuses),
    progress: rand(10, 100),
    deadline: new Date(Date.now() + rand(-30, 180) * 86400000).toISOString().split('T')[0],
    created_at: new Date(Date.now() - rand(0, 120) * 86400000).toISOString(),
  }));
}

function generateInvoices(count: number): Invoice[] {
  const invoiceStatuses: Invoice['payment_status'][] = ['paid', 'pending', 'overdue'];
  return Array.from({ length: count }, (_, i) => ({
    id: `invoice-${i + 1}`,
    user_id: 'demo',
    customer: pick(customers),
    amount: rand(1000, 100000),
    due_date: new Date(Date.now() + rand(-60, 90) * 86400000).toISOString().split('T')[0],
    payment_status: pick(invoiceStatuses),
    payment_probability: rand(20, 100),
    created_at: new Date(Date.now() - rand(0, 60) * 86400000).toISOString(),
  }));
}

function generateAiActions(): AiAction[] {
  const actions = [
    { action: 'Scored 5 new leads for TechCorp', agent_type: 'crm' as const },
    { action: 'Parsed resume for Jane Doe', agent_type: 'hr' as const },
    { action: 'Detected high risk on Project Alpha', agent_type: 'project' as const },
    { action: 'Sent invoice reminder to Acme Corp', agent_type: 'finance' as const },
    { action: 'Generated follow-up email for lead #42', agent_type: 'crm' as const },
    { action: 'Ranked 3 candidates for Backend Engineer role', agent_type: 'hr' as const },
    { action: 'Created weekly summary for Digital Transformation', agent_type: 'project' as const },
    { action: 'Predicted payment delay for Globex Inc', agent_type: 'finance' as const },
    { action: 'Updated lead score for InnovateCo contact', agent_type: 'crm' as const },
    { action: 'Generated interview questions for Data Scientist role', agent_type: 'hr' as const },
    { action: 'Alert: Project Beta deadline in 3 days', agent_type: 'project' as const },
    { action: 'Drafted payment reminder for overdue invoice #1087', agent_type: 'finance' as const },
    { action: 'Forecast: $2.4M pipeline this quarter', agent_type: 'crm' as const },
    { action: 'Screened 12 new resumes overnight', agent_type: 'hr' as const },
    { action: 'Budget variance detected on Cloud Migration', agent_type: 'project' as const },
  ];
  return actions.map((a, i) => ({
    id: `action-${i + 1}`,
    user_id: 'demo',
    ...a,
    details: {},
    timestamp: new Date(Date.now() - i * rand(1800000, 7200000)).toISOString(),
  }));
}

export const mockLeads = generateLeads(100);
export const mockCandidates = generateCandidates(50);
export const mockProjects = generateProjects(20);
export const mockInvoices = generateInvoices(50);
export const mockAiActions = generateAiActions();

export const agentResponses: Record<string, Record<string, string>> = {
  crm: {
    'show high-priority sales leads': `Here are the top high-priority leads likely to convert this month:\n\n1. **TechCorp 3** — Score: 92 | Status: Negotiation | Est. $185,000\n2. **NexGen Systems 2** — Score: 88 | Status: Proposal | Est. $142,000\n3. **QuantumLeap 1** — Score: 85 | Status: Qualified | Est. $98,000\n4. **SmartLogic 4** — Score: 81 | Status: Contacted | Est. $210,000\n5. **FutureTech 1** — Score: 78 | Status: Qualified | Est. $67,000\n\n**Recommended Actions:**\n- Schedule demo for TechCorp 3 (high close probability)\n- Send proposal revision to NexGen Systems 2\n- Initiate contact with QuantumLeap 1 decision maker`,
    'show top 10 leads likely to convert this month': `Top 10 leads ranked by conversion probability:\n\n| Rank | Company | Score | Pipeline Stage | Est. Value |\n|------|---------|-------|---------------|------------|\n| 1 | TechCorp 3 | 92 | Negotiation | $185,000 |\n| 2 | NexGen Systems 2 | 88 | Proposal | $142,000 |\n| 3 | QuantumLeap 1 | 85 | Qualified | $98,000 |\n| 4 | SmartLogic 4 | 81 | Contacted | $210,000 |\n| 5 | FutureTech 1 | 78 | Qualified | $67,000 |\n| 6 | AlphaWave 3 | 75 | Proposal | $156,000 |\n| 7 | DataFlow Inc 2 | 72 | Qualified | $89,000 |\n| 8 | ByteWorks 1 | 70 | Contacted | $124,000 |\n| 9 | CloudNine 4 | 68 | New | $195,000 |\n| 10 | ProSoft 2 | 65 | Qualified | $78,000 |\n\n**Total Pipeline Value: $1,344,000**\n**Weighted Forecast: $874,000**`,
    'generate follow-up email': `Here's a professional follow-up email draft:\n\n---\n**Subject:** Following Up on Our Discussion — Next Steps\n\nDear [Contact Name],\n\nThank you for the engaging conversation last week regarding [topic]. I wanted to follow up and share some additional insights that may be valuable for your team.\n\nBased on our discussion, I believe our solution can help [Company] achieve:\n- 30% reduction in operational costs\n- Improved team productivity through automation\n- Real-time analytics and reporting\n\nWould you be available this Thursday or Friday for a 30-minute demo? I'd love to show you how this works in practice.\n\nLooking forward to hearing from you.\n\nBest regards,\n[Your Name]`,
    default: `I've analyzed your CRM data. Here's a quick summary:\n\n- **100 total leads** in pipeline\n- **$2.4M** total estimated value\n- **34%** conversion rate this quarter\n- **Top performer:** TechCorp account at 92 lead score\n\nWould you like me to drill into any specific area? I can help with lead scoring, email drafting, or deal forecasting.`,
  },
  hr: {
    'rank candidates for frontend developer role': `Here are the ranked candidates for the Frontend Developer role:\n\n1. **Lisa Wang** — Score: 95 | Skills: React, TypeScript, Node.js | 8yr exp | MIT\n2. **Sarah Johnson** — Score: 88 | Skills: Vue.js, JavaScript, CSS | 6yr exp | Stanford\n3. **Emily Davis** — Score: 82 | Skills: Angular, RxJS, NgRx | 5yr exp | Berkeley\n4. **Anna Lee** — Score: 75 | Skills: React, GraphQL, MongoDB | 4yr exp | Carnegie Mellon\n5. **Jessica Martinez** — Score: 68 | Skills: Vue.js, JavaScript, CSS | 3yr exp | UCLA\n\n**Strengths of top candidate:** Strong React/TypeScript expertise, full-stack capability, top-tier education.\n**Recommended interview focus:** System design, state management patterns, performance optimization.`,
    'screen uploaded resumes': `I've screened the uploaded resumes. Here's my analysis:\n\n**Shortlisted (Score > 75):**\n- Lisa Wang (95) — Excellent React/TypeScript match\n- Sarah Johnson (88) — Strong Vue.js background\n- Emily Davis (82) — Solid Angular experience\n\n**Needs Review (Score 50-75):**\n- Anna Lee (75) — Good skills, less experience\n- Mike Chen (62) — Backend-heavy profile\n\n**Not Recommended (Score < 50):**\n- 7 candidates with insufficient relevant experience\n\n**Key Skill Gaps Across Applicants:**\n- Only 30% have TypeScript experience\n- Limited testing framework knowledge\n- Few candidates have CI/CD experience`,
    'generate interview questions': `Here are tailored interview questions for the Frontend Developer role:\n\n**Technical Questions:**\n1. How would you optimize a React application that's rendering slowly with large lists?\n2. Explain the difference between useMemo and useCallback, and when you'd use each.\n3. How do you handle state management in a large-scale React application?\n4. Describe your approach to writing testable React components.\n5. How would you implement real-time data updates in a dashboard?\n\n**Behavioral Questions:**\n1. Tell me about a time you had to refactor a legacy codebase. What was your approach?\n2. How do you handle disagreements about technical decisions with your team?\n3. Describe a project where you had to learn a new technology quickly.\n\n**System Design:**\n1. Design a real-time collaborative document editor.\n2. Design a performant data table with sorting, filtering, and virtual scrolling.`,
    default: `I've analyzed your recruitment pipeline. Here's the current status:\n\n- **50 total candidates** in pipeline\n- **12 in interview stage**\n- **8 offered positions**\n- **Average match score: 72%**\n- **Top open role:** Frontend Developer (15 applicants)\n\nI can help with resume screening, candidate ranking, or interview question generation. What would you like me to do?`,
  },
  project: {
    'which projects need immediate attention': `Projects requiring immediate attention:\n\n**CRITICAL (Risk Score > 80):**\n1. **Project Beta** — Risk: 92 | Budget overrun: 34% | Deadline: 5 days overdue\n2. **Cloud Migration** — Risk: 85 | Resource overload: 3 team members over capacity\n3. **Security Compliance** — Risk: 81 | Critical vulnerability found in dependency\n\n**WARNING (Risk Score 60-80):**\n4. **Data Pipeline Overhaul** — Risk: 72 | 2 key milestones delayed\n5. **E-Commerce Revamp** — Risk: 65 | Scope creep detected: 4 new requirements\n\n**Recommended Actions:**\n- Escalate Project Beta to steering committee immediately\n- Allocate 2 additional engineers to Cloud Migration\n- Schedule emergency security review for compliance project`,
    'generate project summary': `Weekly Project Summary Report\n=====================================\n\n**Overall Portfolio Health:**\n- 20 active projects\n- 4 at risk (20%)\n- 3 delayed (15%)\n- Average progress: 58%\n\n**Highlights:**\n- Project Alpha completed Phase 2 ahead of schedule\n- Mobile App Redesign approved for beta launch\n- API Integration Hub reached 80% completion\n\n**Concerns:**\n- Project Beta budget variance exceeds 30%\n- Cloud Migration team capacity at 140%\n- Security Compliance dependency vulnerability\n\n**Upcoming Deadlines (Next 7 Days):**\n- Project Beta: Feature freeze (OVERDUE)\n- Data Pipeline Overhaul: Sprint review\n- Customer Portal: UAT begins`,
    default: `I've analyzed your project portfolio. Here's the current health overview:\n\n- **20 projects** in portfolio\n- **4 at risk** (20%)\n- **3 delayed** (15%)\n- **Total budget:** $14.2M\n- **Budget utilized:** 62%\n\nI can help with risk analysis, project summaries, or alert configurations. What would you like to know?`,
  },
  finance: {
    'draft reminder emails for overdue invoices': `I've generated professional reminder emails for your overdue invoices:\n\n**Invoice #12 — Acme Corp — $45,000 — 23 days overdue:**\n\nSubject: Overdue Invoice Reminder — Action Required\n\nDear Acme Corp Finance Team,\n\nWe hope this message finds you well. We're writing regarding Invoice #12 for $45,000, which was due on [date] and is now 23 days overdue.\n\nWe understand delays can happen, and we'd like to work with you to resolve this. Could you please:\n1. Confirm receipt of the original invoice\n2. Provide an estimated payment date\n3. Let us know if you need any documentation\n\nIf you've already processed this payment, please disregard this reminder.\n\nBest regards,\n[Your Name]\n\n---\n\n**5 total overdue invoices** found totaling **$187,500**.\nWould you like me to draft the remaining reminders?`,
    'show payment predictions': `Payment Probability Analysis:\n\n**High Probability (>80%):**\n- Stark Industries: $32,000 — 92% likely to pay on time\n- Wayne Enterprises: $28,500 — 88% likely\n- Piedmont: $15,000 — 85% likely\n\n**Medium Probability (50-80%):**\n- Globex Inc: $45,000 — 65% likely (history of late payments)\n- Initech: $22,000 — 58% likely\n\n**Low Probability (<50%):**\n- Umbrella Corp: $67,000 — 32% likely (account flagged)\n- Soylent Corp: $18,000 — 28% likely\n\n**Expected Recovery:** $127,500 of $227,500 total outstanding\n**Recommended:** Escalate low-probability accounts to collections team.`,
    default: `Here's your invoice portfolio overview:\n\n- **50 total invoices**\n- **$1.2M** outstanding\n- **$340K** overdue\n- **$480K** pending (on-time)\n- **$380K** paid this month\n\nI can help with invoice tracking, reminder generation, or payment predictions. What do you need?`,
  },
  general: {
    default: `I'm your AI Business Automation Assistant. I can help you with:\n\n- **CRM & Sales:** Lead scoring, email drafting, deal forecasting\n- **HR Recruitment:** Resume screening, candidate ranking, interview questions\n- **Project Management:** Risk analysis, project summaries, alerts\n- **Finance & Invoicing:** Payment tracking, reminders, predictions\n\nTry asking me something like "Show high-priority sales leads" or "Which projects need attention?"`,
  },
};
