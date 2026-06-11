import {
  Users,
  FolderKanban,
  FileText,
  UserPlus,
  TrendingUp,
  TrendingDown,
  Clock,
  Bot,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { mockLeads, mockProjects, mockInvoices, mockAiActions } from '../lib/mockData';
import { Link } from 'react-router-dom';

const INVOICE_COLORS: Record<string, string> = {
  paid: '#10b981',
  pending: '#f59e0b',
  overdue: '#ef4444',
};

export default function DashboardPage() {
  const totalLeads = mockLeads.length;
  const openProjects = mockProjects.filter(p => p.status === 'active' || p.status === 'at_risk').length;
  const pendingInvoices = mockInvoices.filter(i => i.payment_status === 'pending' || i.payment_status === 'overdue').length;
  const activeEmployees = 48;

  const wonLeads = mockLeads.filter(l => l.status === 'won').length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0';
  const totalRevenue = mockLeads.filter(l => l.status === 'won').reduce((s, l) => s + l.estimated_value, 0);
  const overdueAmount = mockInvoices.filter(i => i.payment_status === 'overdue').reduce((s, i) => s + i.amount, 0);

  // Pipeline data
  const pipelineData = [
    { stage: 'New', count: mockLeads.filter(l => l.status === 'new').length },
    { stage: 'Contacted', count: mockLeads.filter(l => l.status === 'contacted').length },
    { stage: 'Qualified', count: mockLeads.filter(l => l.status === 'qualified').length },
    { stage: 'Proposal', count: mockLeads.filter(l => l.status === 'proposal').length },
    { stage: 'Negotiation', count: mockLeads.filter(l => l.status === 'negotiation').length },
    { stage: 'Won', count: mockLeads.filter(l => l.status === 'won').length },
  ];

  // Invoice status pie
  const invoiceStatusData = [
    { name: 'Paid', value: mockInvoices.filter(i => i.payment_status === 'paid').length },
    { name: 'Pending', value: mockInvoices.filter(i => i.payment_status === 'pending').length },
    { name: 'Overdue', value: mockInvoices.filter(i => i.payment_status === 'overdue').length },
  ];

  // Project status
  const projectStatusData = [
    { name: 'Active', value: mockProjects.filter(p => p.status === 'active').length, color: '#10b981' },
    { name: 'At Risk', value: mockProjects.filter(p => p.status === 'at_risk').length, color: '#f59e0b' },
    { name: 'Delayed', value: mockProjects.filter(p => p.status === 'delayed').length, color: '#ef4444' },
    { name: 'Completed', value: mockProjects.filter(p => p.status === 'completed').length, color: '#3b82f6' },
  ];

  // Trend data (simulated)
  const trendData = [
    { month: 'Jan', leads: 12, revenue: 120000 },
    { month: 'Feb', leads: 18, revenue: 180000 },
    { month: 'Mar', leads: 15, revenue: 150000 },
    { month: 'Apr', leads: 22, revenue: 220000 },
    { month: 'May', leads: 28, revenue: 280000 },
    { month: 'Jun', leads: 25, revenue: 250000 },
  ];

  const kpis = [
    { label: 'Total Leads', value: totalLeads, icon: Users, trend: '+12%', up: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Open Projects', value: openProjects, icon: FolderKanban, trend: '+3', up: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Invoices', value: pendingInvoices, icon: FileText, trend: '-5', up: false, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Employees', value: activeEmployees, icon: UserPlus, trend: '+2', up: true, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const agentIcons: Record<string, string> = {
    crm: 'Sales Agent',
    hr: 'HR Agent',
    project: 'Project Agent',
    finance: 'Finance Agent',
    general: 'AI Agent',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Overview of your business automation</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="kpi-card">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${kpi.bg} rounded-lg flex items-center justify-center`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{kpi.value.toLocaleString()}</p>
            <p className="text-sm text-slate-500">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-[#0F172A]">{conversionRate}%</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">Revenue (Won Deals)</p>
          <p className="text-3xl font-bold text-emerald-600">${(totalRevenue / 1000).toFixed(0)}K</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">Overdue Amount</p>
          <p className="text-3xl font-bold text-red-500">${(overdueAmount / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Pipeline */}
        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Sales Pipeline</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Bar dataKey="count" fill="#FF6B00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Invoice Status */}
        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Invoice Status</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={240}>
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {invoiceStatusData.map((entry, i) => (
                    <Cell key={i} fill={INVOICE_COLORS[entry.name.toLowerCase()]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {invoiceStatusData.map((entry, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: INVOICE_COLORS[entry.name.toLowerCase()] }} />
                  <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={v => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']}
              />
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="revenue" stroke="#FF6B00" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Project Status</h3>
          <div className="space-y-4 pt-2">
            {projectStatusData.map((ps, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-700">{ps.name}</span>
                  <span className="text-sm text-slate-500">{ps.value} projects</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(ps.value / mockProjects.length) * 100}%`,
                      backgroundColor: ps.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Activity Feed */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">AI Activity Feed</h3>
        <div className="space-y-3">
          {mockAiActions.slice(0, 8).map((action, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-8 h-8 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{action.action}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge-info text-[10px]">{agentIcons[action.agent_type]}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(action.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: '/crm', label: 'CRM Agent', color: 'bg-blue-50 text-blue-700' },
          { to: '/hr', label: 'HR Agent', color: 'bg-emerald-50 text-emerald-700' },
          { to: '/projects', label: 'Project Agent', color: 'bg-amber-50 text-amber-700' },
          { to: '/invoices', label: 'Finance Agent', color: 'bg-rose-50 text-rose-700' },
        ].map((link, i) => (
          <Link key={i} to={link.to} className={`card p-4 text-center ${link.color} hover:shadow-md transition-shadow`}>
            <p className="font-medium text-sm">{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
