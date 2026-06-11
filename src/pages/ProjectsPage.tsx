import { useState } from 'react';
import {
  AlertTriangle,
  FolderKanban,
  Clock,
  DollarSign,
  MessageSquare,
  Search,
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
import { mockProjects } from '../lib/mockData';

const statusBadge: Record<string, string> = {
  active: 'badge-success',
  at_risk: 'badge-warning',
  delayed: 'badge-danger',
  completed: 'badge-info',
  cancelled: 'badge-danger',
};

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [showChat, setShowChat] = useState(false);

  const filtered = mockProjects.filter(p =>
    p.project_name.toLowerCase().includes(search.toLowerCase())
  );

  const atRisk = mockProjects.filter(p => p.status === 'at_risk').length;
  const delayed = mockProjects.filter(p => p.status === 'delayed').length;
  const totalBudget = mockProjects.reduce((s, p) => s + p.budget, 0);

  const riskDistribution = [
    { range: '0-20', count: mockProjects.filter(p => p.risk_score < 20).length, color: '#10b981' },
    { range: '20-40', count: mockProjects.filter(p => p.risk_score >= 20 && p.risk_score < 40).length, color: '#84cc16' },
    { range: '40-60', count: mockProjects.filter(p => p.risk_score >= 40 && p.risk_score < 60).length, color: '#f59e0b' },
    { range: '60-80', count: mockProjects.filter(p => p.risk_score >= 60 && p.risk_score < 80).length, color: '#f97316' },
    { range: '80-100', count: mockProjects.filter(p => p.risk_score >= 80).length, color: '#ef4444' },
  ];

  const riskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const riskBarColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Project Risk Agent</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor project health and detect risks</p>
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
          { label: 'Total Projects', value: mockProjects.length, icon: FolderKanban, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'At Risk', value: atRisk, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Delayed', value: delayed, icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Total Budget', value: `$${(totalBudget / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
            agentType="project"
            placeholder="Ask the Project Risk Agent..."
            suggestedPrompts={[
              'Which projects need immediate attention?',
              'Generate project summary',
              'Show high-risk projects',
            ]}
          />
        </div>
      )}

      {/* Risk Distribution Chart */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">Risk Score Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={riskDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {riskDistribution.map((entry, i) => (
                <rect key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Project Cards */}
      <div className="card p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="input-field pl-9 !py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(project => (
          <div key={project.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#0F172A]">{project.project_name}</h3>
                <span className={statusBadge[project.status]}>{project.status.replace('_', ' ')}</span>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${riskColor(project.risk_score)}`}>{project.risk_score}</p>
                <p className="text-[10px] text-slate-400 uppercase">Risk Score</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF6B00] rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Budget: ${project.budget.toLocaleString()}</span>
              <span>Deadline: {project.deadline}</span>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Risk Level</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${riskBarColor(project.risk_score)}`}
                  style={{ width: `${project.risk_score}%` }}
                />
              </div>
            </div>

            {project.risk_score >= 70 && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-2.5 py-1.5 rounded-lg">
                <AlertTriangle className="w-3 h-3" />
                {project.risk_score >= 80 ? 'Critical: Requires immediate attention' : 'Warning: Monitor closely'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
