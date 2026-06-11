import { useState } from 'react';
import {
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  Award,
  FileText,
  Users,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChatInterface from '../components/ChatInterface';
import { mockCandidates } from '../lib/mockData';

const statusBadge: Record<string, string> = {
  applied: 'badge-info',
  screening: 'badge-warning',
  interview: 'badge-info',
  offered: 'badge-success',
  hired: 'badge-success',
  rejected: 'badge-danger',
};

export default function HRPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showChat, setShowChat] = useState(false);

  const filtered = mockCandidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchRole = roleFilter === 'all' || c.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roles = [...new Set(mockCandidates.map(c => c.role))];
  const hired = mockCandidates.filter(c => c.status === 'hired').length;
  const inInterview = mockCandidates.filter(c => c.status === 'interview').length;
  const avgScore = mockCandidates.length > 0
    ? Math.round(mockCandidates.reduce((s, c) => s + c.score, 0) / mockCandidates.length)
    : 0;

  const funnelData = [
    { stage: 'Applied', count: mockCandidates.filter(c => c.status === 'applied').length },
    { stage: 'Screening', count: mockCandidates.filter(c => c.status === 'screening').length },
    { stage: 'Interview', count: inInterview },
    { stage: 'Offered', count: mockCandidates.filter(c => c.status === 'offered').length },
    { stage: 'Hired', count: hired },
  ];

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">HR Recruitment Assistant</h1>
          <p className="text-slate-500 text-sm mt-1">Automate hiring workflow with AI</p>
        </div>
        <button
          onClick={() => setShowChat(!showChat)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          {showChat ? 'Hide Chat' : 'AI Chat'}
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Candidates', value: mockCandidates.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Interview', value: inInterview, icon: UserPlus, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Hired', value: hired, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Match Score', value: `${avgScore}%`, icon: FileText, color: 'text-[#FF6B00]', bg: 'bg-orange-50' },
        ].map((kpi, i) => (
          <div key={i} className="kpi-card">
            <div className={`w-9 h-9 ${kpi.bg} rounded-lg flex items-center justify-center mb-2`}>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className="text-xl font-bold text-[#0F172A]">{kpi.value}</p>
            <p className="text-xs text-slate-500">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Chat panel */}
      {showChat && (
        <div className="card overflow-hidden" style={{ height: 400 }}>
          <ChatInterface
            agentType="hr"
            placeholder="Ask the HR Assistant..."
            suggestedPrompts={[
              'Rank candidates for Frontend Developer role',
              'Screen uploaded resumes',
              'Generate interview questions',
            ]}
          />
        </div>
      )}

      {/* Recruitment Funnel */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">Recruitment Funnel</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={funnelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Candidate Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search candidates or skills..."
              className="input-field pl-9 !py-2 text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="input-field pl-9 !py-2 text-sm pr-8 appearance-none"
            >
              <option value="all">All Roles</option>
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-slate-500 uppercase border-b border-slate-200">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Skills</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 20).map(c => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#0F172A]">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.skills.map((s, i) => (
                        <span key={i} className="badge-info text-[10px]">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.experience}yr</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold ${scoreColor(c.score)}`}>{c.score}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusBadge[c.status]}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 20 && (
          <div className="p-3 text-center text-sm text-slate-400">
            Showing 20 of {filtered.length} candidates
          </div>
        )}
      </div>
    </div>
  );
}
