export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  created_at: string;
}

export interface Lead {
  id: string;
  user_id: string;
  company: string;
  contact: string;
  lead_score: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  estimated_value: number;
  created_at: string;
}

export interface Candidate {
  id: string;
  user_id: string;
  name: string;
  skills: string[];
  experience: number;
  education: string;
  score: number;
  status: 'applied' | 'screening' | 'interview' | 'offered' | 'hired' | 'rejected';
  role: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  project_name: string;
  risk_score: number;
  budget: number;
  status: 'active' | 'at_risk' | 'delayed' | 'completed' | 'cancelled';
  progress: number;
  deadline: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  user_id: string;
  customer: string;
  amount: number;
  due_date: string;
  payment_status: 'paid' | 'pending' | 'overdue';
  payment_probability: number;
  created_at: string;
}

export interface AiAction {
  id: string;
  user_id: string;
  action: string;
  agent_type: 'crm' | 'hr' | 'project' | 'finance' | 'general';
  details: Record<string, unknown>;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
