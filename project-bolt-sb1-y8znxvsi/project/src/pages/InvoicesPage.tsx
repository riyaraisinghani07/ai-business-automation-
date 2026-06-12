import { useState } from 'react';
import {
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import ChatInterface from '../components/ChatInterface';
import { mockInvoices } from '../lib/mockData';

const INVOICE_COLORS: Record<string, string> = {
  paid: '#10b981',
  pending: '#f59e0b',
  overdue: '#ef4444',
};

const statusBadge: Record<string, string> = {
  paid: 'badge-success',
  pending: 'badge-warning',
  overdue: 'badge-danger',
};

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showChat, setShowChat] = useState(false);

  const filtered = mockInvoices.filter(i => {
    const matchSearch = i.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || i.payment_status === statusFilter;
    return matchSearch && matchStatus;
  });

  const paid = mockInvoices.filter(i => i.payment_status === 'paid');
  const pending = mockInvoices.filter(i => i.payment_status === 'pending');
  const overdue = mockInvoices.filter(i => i.payment_status === 'overdue');

  const paidAmount = paid.reduce((s, i) => s + i.amount, 0);
  const pendingAmount = pending.reduce((s, i) => s + i.amount, 0);
  const overdueAmount = overdue.reduce((s, i) => s + i.amount, 0);
  const recoveryRate = mockInvoices.length > 0
    ? ((paid.length / mockInvoices.length) * 100).toFixed(1)
    : '0';

  const statusData = [
    { name: 'Paid', value: paid.length },
    { name: 'Pending', value: pending.length },
    { name: 'Overdue', value: overdue.length },
  ];

  const amountData = [
    { status: 'Paid', amount: paidAmount },
    { status: 'Pending', amount: pendingAmount },
    { status: 'Overdue', amount: overdueAmount },
  ];

  const probColor = (prob: number) => {
    if (prob >= 80) return 'text-emerald-600';
    if (prob >= 50) return 'text-amber-600';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Invoice Follow-up Agent</h1>
          <p className="text-slate-500 text-sm mt-1">Automate payment collection and reminders</p>
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
          { label: 'Total Invoices', value: mockInvoices.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Recovery Rate', value: `${recoveryRate}%`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending', value: `$${(pendingAmount / 1000).toFixed(0)}K`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Overdue', value: `$${(overdueAmount / 1000).toFixed(0)}K`, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
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
            agentType="finance"
            placeholder="Ask the Invoice Agent..."
            suggestedPrompts={[
              'Draft reminder emails for overdue invoices',
              'Show payment predictions',
              'Track invoice status',
            ]}
          />
        </div>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Invoice Status Distribution</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={INVOICE_COLORS[entry.name.toLowerCase()]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {statusData.map((entry, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: INVOICE_COLORS[entry.name.toLowerCase()] }} />
                  <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Amount by Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={amountData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="status" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={v => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Amount']}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {amountData.map((entry, i) => (
                  <Cell key={i} fill={INVOICE_COLORS[entry.status.toLowerCase()]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search invoices..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-slate-500 uppercase border-b border-slate-200">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment Prob.</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 20).map(inv => (
                <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#0F172A]">{inv.customer}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{inv.due_date}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadge[inv.payment_status]}>{inv.payment_status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold ${probColor(inv.payment_probability)}`}>
                      {inv.payment_probability}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 20 && (
          <div className="p-3 text-center text-sm text-slate-400">
            Showing 20 of {filtered.length} invoices
          </div>
        )}
      </div>
    </div>
  );
}
