import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Users,
  Zap,
  Shield,
  BarChart3,
  Menu,
  X,
  CalendarDays,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 text-slate-900">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled
            ? "bg-white/80 shadow-sm backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={20} />
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                Campus Vinculum
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden items-center gap-6 md:flex">
              <a
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                For Campus
              </a>
              <a
                href="#download"
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                How It Works
              </a>

              <Link
                to="/login"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex items-center md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
              <a
                href="#features"
                className="block text-sm font-medium text-slate-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#benefits"
                className="block text-sm font-medium text-slate-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Campus
              </a>
              <a
                href="#download"
                className="block text-sm font-medium text-slate-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>

              <Link
                to="/login"
                className="mt-2 block rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              {/* <Link
                to="/signup"
                className="block rounded-full border border-blue-600 px-4 py-2 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link> */}
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT (add padding-top to clear fixed nav) */}
      <main className="pt-20">
        {/* HERO */}
        <section className="py-16 md:py-24">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 md:flex-row">
            {/* Text */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Unified Campus Engagement Platform
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Connect Students, Alumni & Faculty
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  on one smart campus hub.
                </span>
              </h1>
              <p className="max-w-xl text-sm text-slate-600 sm:text-base">
                Campus Vinculum brings clubs, events, discussions, placements and
                announcements into a single powerful platform – no more scattered
                WhatsApp groups or missed updates.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {/* <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700"
                >
                  <Zap size={18} />
                  <span>Get Started</span>
                </Link> */}
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-700 hover:text-blue-800"
                >
                  Go to Login →
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex-1">
              <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 shadow-xl md:h-72 md:w-72">
                <GraduationCap
                  size={120}
                  className="text-white/90 drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PURPOSE */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Built for Modern Campuses
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                Campus Vinculum connects every stakeholder in your institution –
                students, clubs, faculty and alumni – and keeps everyone on the
                same page.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Users size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Student Engagement
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Discover clubs, join events, track schedules and never miss an
                  important announcement from your campus community.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Collaborative Discussions
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Dedicated discussion spaces for clubs, batches and committees
                  with structured conversations instead of noisy chats.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-white">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Placements & Alumni
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Centralize job postings, alumni interactions and mentoring
                  opportunities to boost student career outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Platform Features
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                Everything your campus needs in one place.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: MdSpaceDashboardIcon,
                  title: "Role-Based Dashboards",
                  desc: "Personalized views for students, faculty, alumni and admins.",
                },
                {
                  icon: Users,
                  title: "Clubs & Communities",
                  desc: "Manage club members, events, announcements and discussions.",
                },
                {
                  icon: CalendarDays,
                  title: "Events & Schedules",
                  desc: "Track academic calendars, club events and live sessions.",
                },
                {
                  icon: Briefcase,
                  title: "Jobs & Internships",
                  desc: "Curated opportunities from alumni and placement cell.",
                },
                {
                  icon: Shield,
                  title: "Secure Access",
                  desc: "JWT-based auth with role-specific permissions and controls.",
                },
                {
                  icon: BarChart3,
                  title: "Analytics for Admins",
                  desc: "Insights on engagement, events, and student participation.",
                },
              ].map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <IconComponent size={22} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section id="benefits" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Why Your Campus Will Love It
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                Designed to reduce chaos and increase engagement.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "No More Scattered Channels",
                  desc: "Centralize communication instead of handling dozens of WhatsApp groups.",
                },
                {
                  title: "Higher Event Participation",
                  desc: "Students see all relevant events and reminders in one place.",
                },
                {
                  title: "Structured Collaboration",
                  desc: "Dedicated spaces for discussions, announcements and resources.",
                },
                {
                  title: "Better Alumni Connect",
                  desc: "Bridge the gap between students and alumni through jobs and mentoring.",
                },
                {
                  title: "Clear Oversight for Admins",
                  desc: "Admins get a unified view of campus activities and engagement.",
                },
                {
                  title: "Future-Ready Platform",
                  desc: "Extensible architecture for integrating chatbots, live sessions and more.",
                },
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / HOW IT WORKS */}
        <section id="download" className="bg-gradient-to-r from-blue-600 to-indigo-500 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Ready to Modernize Your Campus?
            </h2>
            <p className="mt-3 text-sm text-blue-100 md:text-base">
              Get your students, faculty and alumni on a single, unified platform
              in just a few steps.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                to="/signup"
                className="inline-flex w-full max-w-md items-center gap-3 rounded-2xl bg-white px-5 py-3 text-left text-slate-900 shadow-lg hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Zap size={22} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Request Access</div>
                  <div className="text-xs text-slate-500">
                    Create an account and start exploring the platform.
                  </div>
                </div>
              </Link>

              <p className="text-xs text-blue-100">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-white underline decoration-blue-200/70 underline-offset-2 hover:text-slate-100"
                >
                  Log in here
                </Link>
                .
              </p>

              <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-xs md:text-sm">
                <p className="font-medium">Campus admin or faculty?</p>
                <Link
                  to="/login"
                  className="mt-1 inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-blue-700 hover:bg-white"
                >
                  Go to Dashboard Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <GraduationCap size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  Campus Vinculum
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-600">
                A connected campus experience for students, alumni and faculty.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </h4>
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <a href="#features" className="hover:text-blue-600">
                  Features
                </a>
                <a href="#benefits" className="block hover:text-blue-600">
                  For Campus
                </a>
                <a href="#download" className="block hover:text-blue-600">
                  Get Started
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Resources
              </h4>
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <a href="#" className="hover:text-blue-600">
                  Documentation
                </a>
                <a href="#" className="block hover:text-blue-600">
                  Support
                </a>
                <a href="#" className="block hover:text-blue-600">
                  FAQs
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </h4>
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <div>Admin: admin@campusvinculum.com</div>
                <div>Support: support@campusvinculum.com</div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4 text-center text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} Campus Vinculum. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Simple helper to mimic dashboard-like icon using lucide */
function MdSpaceDashboardIcon(props) {
  return <Shield {...props} />;
}
