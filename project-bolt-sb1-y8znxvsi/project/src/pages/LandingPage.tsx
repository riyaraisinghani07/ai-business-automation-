import { Link } from 'react-router-dom';
import {
  Zap,
  Users,
  UserPlus,
  AlertTriangle,
  FileText,
  BarChart3,
  Shield,
  ArrowRight,
  Play,
  CheckCircle,
} from 'lucide-react';

const features = [
  { icon: Users, title: 'CRM Sales Copilot', desc: 'AI-powered lead scoring, email drafting, and deal forecasting to accelerate your sales pipeline.' },
  { icon: UserPlus, title: 'HR Recruitment Assistant', desc: 'Automate resume parsing, candidate ranking, and interview question generation.' },
  { icon: AlertTriangle, title: 'Project Risk Monitoring', desc: 'Detect project risks early with AI-driven analysis, alerts, and automated summaries.' },
  { icon: FileText, title: 'Invoice Follow-up Automation', desc: 'Automate payment reminders, track invoice status, and predict payment likelihood.' },
  { icon: BarChart3, title: 'AI Reports & Analytics', desc: 'Generate actionable insights across sales, hiring, projects, and revenue recovery.' },
  { icon: Shield, title: 'Role-Based Access Control', desc: 'Secure your platform with admin, manager, and employee role hierarchies.' },
];

const steps = [
  { num: '01', title: 'Enter a Request', desc: 'Type a natural language command like "Show high-priority leads" or "Draft invoice reminders".' },
  { num: '02', title: 'AI Agent Processes Data', desc: 'The specialized agent analyzes your business data, scores, and patterns in real-time.' },
  { num: '03', title: 'Automated Action Generated', desc: 'Receive structured outputs: ranked lists, drafted emails, risk alerts, or predictions.' },
  { num: '04', title: 'Results in Dashboard', desc: 'All actions and results appear instantly in your dashboard with full audit trail.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#0F172A] text-lg">AI Agent</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-[#0F172A] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-[#0F172A] transition-colors">How It Works</a>
            <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
            <Link to="/signup" className="btn-primary text-sm">Start Free Trial</Link>
          </div>
          <Link to="/login" className="btn-primary text-sm md:hidden !py-2 !px-4">Sign In</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Business Automation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.1] mb-6">
            AI Business<br />
            <span className="text-[#FF6B00]">Automation Agent</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Automate CRM, HR, Project Management, Finance, and Customer Support using AI-powered agents that understand natural language and execute real business tasks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary text-base flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="btn-secondary text-base flex items-center gap-2">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              Everything You Need to Automate
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Six powerful AI agents working together to transform your business operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card p-6 group hover:border-[#FF6B00]/30">
                <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FF6B00]/20 transition-colors">
                  <f.icon className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Four simple steps from request to automated action.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-[#FF6B00]/15 mb-3">{s.num}</div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4">
                    <ArrowRight className="w-8 h-8 text-[#FF6B00]/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using AI agents to streamline operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary text-base flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FF6B00] rounded-md flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-[#0F172A] text-sm">AI Business Automation Agent</span>
          </div>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
