import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/hi2';
import PublicLayout from '../../layouts/PublicLayout';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';

const features = [
  { icon: 'HiBolt', title: 'Lightning fast', desc: 'Keyboard-first triage and instant search across every project, bug, and note.' },
  { icon: 'HiViewColumns', title: 'Flexible views', desc: 'Switch between list, grid, and board layouts to match how your team works.' },
  { icon: 'HiShieldCheck', title: 'Granular permissions', desc: 'Role-based access for admins, managers, developers, and testers out of the box.' },
  { icon: 'HiChartBar', title: 'Real-time analytics', desc: 'Track velocity, bug burn-down, and priority distribution with live dashboards.' },
  { icon: 'HiBell', title: 'Smart notifications', desc: 'Get notified on mentions, status changes, and escalations without the noise.' },
  { icon: 'HiArrowsRightLeft', title: 'Integrations', desc: 'Connect Slack, GitHub, and Linear so your workflow stays in sync.' },
];

const stats = [
  { value: '12k+', label: 'Teams onboarded' },
  { value: '4.2M', label: 'Bugs resolved' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '38ms', label: 'Median response' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Eng Lead, Northwind', quote: 'BugFlow replaced three tools for us. Triage time dropped by 60% in the first month.', avatar: 'https://i.pravatar.cc/100?img=47' },
  { name: 'Marcus Webb', role: 'CTO, Lumen Labs', quote: 'The dashboards are genuinely beautiful. Our PMs finally enjoy looking at bug reports.', avatar: 'https://i.pravatar.cc/100?img=33' },
  { name: 'Dana Kim', role: 'QA Manager, Orbit', quote: 'Priority and status filters just work. Onboarding new testers takes minutes, not days.', avatar: 'https://i.pravatar.cc/100?img=44' },
];

export default function Landing() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-200 border border-base-300 text-sm mb-6 animate-fade-in">
            <span className="badge badge-xs badge-success" /> New: AI-assisted bug triage
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Ship better software with a bug tracker your team actually loves.
          </h1>
          <p className="mt-6 text-lg text-base-content/60 max-w-2xl mx-auto">
            BugFlow brings projects, bugs, and notes into one fast, beautiful workspace — built for high-velocity engineering teams.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register"><Button size="lg" className="px-8">Start for free</Button></Link>
            <Link to="/login"><Button size="lg" variant="outline" className="px-8">Sign in</Button></Link>
          </div>
          <p className="mt-4 text-sm text-base-content/40">No credit card required · Free for up to 5 members</p>

          {/* Product preview */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-base-300 bg-base-200/50 shadow-2xl overflow-hidden">
              <div className="h-10 border-b border-base-300 flex items-center gap-2 px-4 bg-base-100">
                <span className="w-3 h-3 rounded-full bg-error/60" />
                <span className="w-3 h-3 rounded-full bg-warning/60" />
                <span className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-3 text-xs text-base-content/40">bugflow.app/dashboard</span>
              </div>
              <div className="grid grid-cols-12 gap-0 text-left">
                <div className="col-span-3 border-r border-base-300 p-4 hidden md:block bg-base-100">
                  <div className="h-3 w-20 bg-base-300 rounded mb-4" />
                  {[1,2,3,4,5].map((i) => <div key={i} className="h-8 bg-base-200 rounded mb-2" />)}
                </div>
                <div className="col-span-12 md:col-span-9 p-6 bg-base-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[1,2,3,4].map((i) => <div key={i} className="h-20 rounded-xl bg-base-200 border border-base-300" />)}
                  </div>
                  <div className="h-40 rounded-xl bg-base-200 border border-base-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-base-300 bg-base-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">{s.value}</p>
              <p className="text-sm text-base-content/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need to track issues</h2>
          <p className="mt-4 text-base-content/60">A complete toolkit for triage, prioritization, and resolution — without the bloat.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = Icons[f.icon];
            return (
              <div key={f.title} className="card bg-base-100 border border-base-300 rounded-2xl p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-base-content/60 mt-2">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-base-200/40 border-y border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why teams switch to BugFlow</h2>
            <p className="mt-4 text-base-content/60">Most bug trackers feel like they were built in 2008. BugFlow is fast, focused, and designed for the way modern teams actually work.</p>
            <ul className="mt-8 space-y-4">
              {['Keyboard-first triage with command palette', 'Real-time collaboration and mentions', 'Custom workflows per project', 'Beautiful, distraction-free UI'].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-success/15 text-success grid place-items-center shrink-0 mt-0.5"><Icons.HiCheck className="h-4 w-4" /></span>
                  <span className="text-base-content/80">{p}</span>
                </li>
              ))}
            </ul>
            <Link to="/register" className="mt-8 inline-block"><Button>Get started free</Button></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['HiBolt','HiChartBar','HiShieldCheck','HiViewColumns'].map((icon, i) => {
              const Icon = Icons[icon];
              return (
                <div key={icon} className={`card bg-base-100 border border-base-300 rounded-2xl p-6 ${i % 2 ? 'mt-8' : ''}`}>
                  <Icon className="h-8 w-8 text-primary mb-3" />
                  <p className="text-sm text-base-content/60">Live metrics, burn-down charts, and priority breakdowns across every project.</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by engineering teams</h2>
          <p className="mt-4 text-base-content/60">From startups to scale-ups, teams rely on BugFlow to ship with confidence.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="card bg-base-100 border border-base-300 rounded-2xl p-6">
              <div className="flex gap-1 text-warning mb-4">{'★★★★★'}</div>
              <p className="text-base-content/80">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-base-300">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-base-content/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-3xl bg-base-200 border border-base-300 p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to fix bugs faster?</h2>
          <p className="mt-4 text-base-content/60 max-w-xl mx-auto">Join thousands of teams who replaced their clunky bug tracker with BugFlow.</p>
          <Link to="/register" className="mt-8 inline-block"><Button size="lg" className="px-8">Create your workspace</Button></Link>
        </div>
      </section>

      <Footer />
    </PublicLayout>
  );
}
