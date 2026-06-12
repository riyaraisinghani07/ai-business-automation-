import { useState } from 'react';
import {
  Users,
  TrendingUp,
  Mail,
  Target,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
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
import { mockLeads } from '../lib/mockData';

const statusBadge: Record<string, string> = {
  new: 'badge-info',
  contacted: 'badge-info',
  qualified: 'badge-warning',
  proposal: 'badge-warning',
  negotiation: 'badge-danger',
  won: 'badge-success',
  lost: 'badge-danger',
};

export default function CRMPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showChat, setShowChat] = useState(false);

  const filtered = mockLeads.filter(l => {
    const matchSearch = l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.contact.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const qualified = mockLeads.filter(l => ['qualified', 'proposal', 'negotiation'].includes(l.status)).length;
  const won = mockLeads.filter(l => l.status === 'won').length;
  const convRate = mockLeads.length > 0 ? ((won / mockLeads.length) * 100).toFixed(1) : '0';
  const totalPipeline = mockLeads.filter(l => !['won', 'lost'].includes(l.status)).reduce((s, l) => s + l.estimated_value, 0);

  const pipelineChartData = [
    { stage: 'New', value: mockLeads.filter(l => l.status === 'new').length },
    { stage: 'Contacted', value: mockLeads.filter(l => l.status === 'contacted').length },
    { stage: 'Qualified', value: mockLeads.filter(l => l.status === 'qualified').length },
    { stage: 'Proposal', value: mockLeads.filter(l => l.status === 'proposal').length },
    { stage: 'Negotiation', value: mockLeads.filter(l => l.status === 'negotiation').length },
    { stage: 'Won', value: won },
  ];

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">CRM Sales Copilot</h1>
          <p className="text-slate-500 text-sm mt-1">Manage leads and automate sales workflow</p>
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
          { label: 'Qualified Leads', value: qualified, icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Conversion Rate', value: `${convRate}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Revenue Forecast', value: `$${(totalPipeline / 1000).toFixed(0)}K`, icon: Users, color: 'text-[#FF6B00]', bg: 'bg-orange-50' },
          { label: 'Total Leads', value: mockLeads.length, icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
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
            agentType="crm"
            placeholder="Ask the Sales Copilot..."
            suggestedPrompts={[
              'Show top 10 leads likely to convert this month',
              'Generate follow-up email',
              'Forecast deals this quarter',
            ]}
          />
        </div>
      )}

      {/* Pipeline Chart */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">Sales Pipeline</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={pipelineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
            <Bar dataKey="value" fill="#FF6B00" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Lead Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="input-field pl-9 !py-2 text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="input-field pl-9 !py-2 text-sm pr-8 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-slate-500 uppercase border-b border-slate-200">
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Est. Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 20).map(lead => (
                <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#0F172A]">{lead.company}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{lead.contact}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold ${scoreColor(lead.lead_score)}`}>
                      {lead.lead_score}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusBadge[lead.status]}>{lead.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">${lead.estimated_value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 20 && (
          <div className="p-3 text-center text-sm text-slate-400">
            Showing 20 of {filtered.length} leads
          </div>
        )}
      </div>
    </div>
  );
}
