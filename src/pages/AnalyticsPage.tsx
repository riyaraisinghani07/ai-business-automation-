import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import { TrendingUp, Users, AlertTriangle, DollarSign, Lightbulb } from 'lucide-react';
import { mockProjects, mockInvoices } from '../lib/mockData';

const COLORS = ['#FF6B00', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const monthlySales = [
  { month: 'Jan', revenue: 120000, leads: 12, deals: 3 },
  { month: 'Feb', revenue: 180000, leads: 18, deals: 5 },
  { month: 'Mar', revenue: 150000, leads: 15, deals: 4 },
  { month: 'Apr', revenue: 220000, leads: 22, deals: 7 },
  { month: 'May', revenue: 280000, leads: 28, deals: 9 },
  { month: 'Jun', revenue: 250000, leads: 25, deals: 8 },
];

const hiringMetrics = [
  { month: 'Jan', applied: 8, hired: 1 },
  { month: 'Feb', applied: 12, hired: 2 },
  { month: 'Mar', applied: 15, hired: 3 },
  { month: 'Apr', applied: 10, hired: 2 },
  { month: 'May', applied: 18, hired: 4 },
  { month: 'Jun', applied: 14, hired: 3 },
];

const projectHealth = [
  { name: 'Active', value: mockProjects.filter(p => p.status === 'active').length },
  { name: 'At Risk', value: mockProjects.filter(p => p.status === 'at_risk').length },
  { name: 'Delayed', value: mockProjects.filter(p => p.status === 'delayed').length },
  { name: 'Completed', value: mockProjects.filter(p => p.status === 'completed').length },
];

const revenueByStatus = [
  { status: 'Paid', amount: mockInvoices.filter(i => i.payment_status === 'paid').reduce((s, i) => s + i.amount, 0) },
  { status: 'Pending', amount: mockInvoices.filter(i => i.payment_status === 'pending').reduce((s, i) => s + i.amount, 0) },
  { status: 'Overdue', amount: mockInvoices.filter(i => i.payment_status === 'overdue').reduce((s, i) => s + i.amount, 0) },
];

const insights = [
  { icon: TrendingUp, text: 'Sales increased 18% this month compared to last month.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Users, text: 'Candidate quality improved by 22% — average match score rose from 58% to 72%.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: AlertTriangle, text: 'Project Alpha has high delay risk (risk score: 92). Immediate review recommended.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: DollarSign, text: 'Revenue recovery rate stands at 68%. Overdue invoices total $187,500.', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: TrendingUp, text: 'Hiring pipeline velocity increased 30% — average time-to-hire dropped from 28 to 19 days.', color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Comprehensive business intelligence dashboard</p>
      </div>

      {/* AI Insights */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#FF6B00]" />
          AI Insights
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {insights.map((insight, i) => (
            <div key={i} className={`${insight.bg} rounded-lg p-4 flex items-start gap-3`}>
              <insight.icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
              <p className="text-sm text-slate-700 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Performance */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">Sales Performance</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={v => `$${v / 1000}K`} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']}
            />
            <Legend />
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="revenue" stroke="#FF6B00" fill="url(#salesGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hiring Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Hiring Metrics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={hiringMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend />
              <Line type="monotone" dataKey="applied" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Health Pie */}
        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Project Health</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={projectHealth}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {projectHealth.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {projectHealth.map((ph, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm text-slate-600">{ph.name}: {ph.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Recovery */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">Revenue Recovery</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueByStatus}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="status" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={v => `$${v / 1000}K`} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Amount']}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {revenueByStatus.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.status === 'Paid' ? '#10b981' : entry.status === 'Pending' ? '#f59e0b' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Analysis */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">Lead & Deal Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
            <Legend />
            <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="deals" stroke="#FF6B00" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
