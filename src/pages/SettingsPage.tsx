import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Shield, Bell, Palette, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    risk: true,
    invoice: true,
    weekly: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#FF6B00]/10 text-[#FF6B00]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Profile Settings</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-full flex items-center justify-center text-2xl font-bold text-[#FF6B00]">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-[#0F172A]">{name}</p>
                  <p className="text-sm text-slate-500 capitalize">{user?.role || 'Employee'}</p>
                </div>
              </div>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                  <input
                    type="text"
                    value={user?.role || 'employee'}
                    className="input-field bg-slate-50"
                    disabled
                  />
                </div>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Security Settings</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                  <input type="password" className="input-field" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                  <input type="password" className="input-field" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                  <input type="password" className="input-field" placeholder="Confirm new password" />
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <h3 className="text-sm font-medium text-[#0F172A] mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Enable 2FA</p>
                      <p className="text-xs text-slate-500">Add an extra layer of security</p>
                    </div>
                    <button className="btn-secondary text-xs !py-1.5 !px-3">Enable</button>
                  </div>
                </div>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Saved!' : 'Update Password'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Notification Preferences</h2>
              <div className="space-y-4 max-w-md">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'risk', label: 'Risk Alerts', desc: 'Get notified about high-risk projects' },
                  { key: 'invoice', label: 'Invoice Reminders', desc: 'Payment and overdue alerts' },
                  { key: 'weekly', label: 'Weekly Summary', desc: 'Weekly AI-generated reports' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={`w-10 h-6 rounded-full transition-colors relative ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-[#FF6B00]'
                          : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'translate-x-5'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
                <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Saved!' : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Appearance</h2>
              <div className="space-y-6 max-w-md">
                <div>
                  <h3 className="text-sm font-medium text-[#0F172A] mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', bg: 'bg-white', border: 'border-slate-200' },
                      { id: 'dark', label: 'Dark', bg: 'bg-slate-800', border: 'border-slate-600' },
                      { id: 'system', label: 'System', bg: 'bg-gradient-to-r from-white to-slate-800', border: 'border-slate-300' },
                    ].map(theme => (
                      <button
                        key={theme.id}
                        className={`p-4 rounded-lg border-2 text-center transition-colors ${
                          theme.id === 'light' ? 'border-[#FF6B00]' : `${theme.border} hover:border-[#FF6B00]/50`
                        }`}
                      >
                        <div className={`w-8 h-8 ${theme.bg} rounded-md mx-auto mb-2 border border-slate-200`} />
                        <span className="text-xs font-medium text-slate-700">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#0F172A] mb-3">Accent Color</h3>
                  <div className="flex gap-3">
                    {['#FF6B00', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444'].map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                          color === '#FF6B00' ? 'ring-2 ring-offset-2 ring-[#FF6B00]' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Saved!' : 'Save Appearance'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Role-Based Access Info */}
      <div className="card p-5">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#FF6B00]" />
          Role-Based Access Control
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { role: 'Admin', desc: 'Full access to all features, settings, and user management.', permissions: ['All features', 'User management', 'System settings', 'Audit logs', 'Data export'] },
            { role: 'Manager', desc: 'Access to team data, reports, and agent configurations.', permissions: ['Team dashboards', 'Agent configs', 'Reports', 'Approve actions'] },
            { role: 'Employee', desc: 'Access to personal workspace and assigned tasks.', permissions: ['Personal dashboard', 'Chat with agents', 'View reports', 'Submit requests'] },
          ].map((r, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-[#0F172A] mb-1">{r.role}</h4>
              <p className="text-xs text-slate-500 mb-3">{r.desc}</p>
              <ul className="space-y-1.5">
                {r.permissions.map((p, j) => (
                  <li key={j} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Check className="w-3 h-3 text-[#FF6B00]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
