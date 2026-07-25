import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart3, Users, Clock, Sparkles } from 'lucide-react';
import LeadForm from '../components/LeadForm';

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Mini CRM for Digital Agencies & SaaS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
          Capture, Manage & Convert <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
            Every Qualified Lead
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          LeadDesk Mini gives high-performing digital agencies and SaaS teams the exact pipeline visibility required to respond faster, track statuses, and close deals effortlessly.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Submit a Lead</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-sm font-semibold transition-all"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Features</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Speed, Clarity, & High Conversion
          </p>
          <p className="text-slate-400 text-sm">
            Everything your team needs to collect inquiry details, filter by budget range, and track status flow without complex overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all space-y-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Instant Lead Capture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Zod-validated lead form ensures clean budget criteria, verified contact information, and structured project specs right out of the box.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Real-Time CRM Metrics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Live metrics dashboard tracking Total, New, Contacted, and Closed leads using TanStack Query cache invalidation for instant feedback.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Enterprise JWT Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              HTTP-only cookie auth, bcrypt password hashing (12 rounds), helmet HTTP headers, and strict rate limiting on all endpoints.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="bg-slate-900/50 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Why LeadDesk Mini</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Designed specifically for qualification task excellence
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Rather than bundling bloated enterprise features nobody uses, LeadDesk Mini focuses on solid software architecture, strict security controls, and responsive user experience.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'TanStack Query (React Query) for smart caching and zero boilerplate fetching',
                  'Client & Server Zod schema validation — never trust frontend input alone',
                  'HTTP-only Cookie authentication preventing XSS token theft',
                  'Clean MongoDB indexes on email, status, and name fields for fast search',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-700/60 pb-6">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl">
                  CRM
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">LeadDesk Mini CRM</h4>
                  <p className="text-xs text-indigo-400 font-medium">Digital Heroes Full Stack Task</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 font-medium">Status Flow</p>
                  <p className="text-sm font-bold text-slate-200 mt-1">New → Contacted → Closed</p>
                </div>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 font-medium">Debounced Search</p>
                  <p className="text-sm font-bold text-slate-200 mt-1">Instant Regex Filter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="contact" className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Get in Touch</h2>
          <p className="text-3xl font-extrabold text-white tracking-tight">Ready to Start Your Project?</p>
          <p className="text-slate-400 text-sm">Submit your inquiry details below to generate a new lead in our CRM system.</p>
        </div>

        <LeadForm />
      </section>
    </div>
  );
}
