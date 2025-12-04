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
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

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
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? "scrolled" : "transparent"}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo">
              <GraduationCap size={32} color="#1d4ed8" />
              <span className="nav-logo-text">Campus Vinculum</span>
            </div>

            <div className="nav-links">
              <a href="#features" className="nav-link desktop-only">
                Features
              </a>
              <a href="#benefits" className="nav-link desktop-only">
                For Campus
              </a>
              <a href="#download" className="nav-link desktop-only">
                How It Works
              </a>

              <Link to="/login" className="nav-button">
                Login
              </Link>

              <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a
                href="#features"
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#benefits"
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Campus
              </a>
              <a
                href="#download"
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <Link
                to="/login"
                className="mobile-menu-button"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="mobile-menu-button secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">Unified Campus Engagement Platform</div>
              <h1 className="hero-title">
                Connect Students, Alumni & Faculty
                <span className="hero-title-highlight">
                  on one smart campus hub.
                </span>
              </h1>
              <p className="hero-description">
                Campus Vinculum brings clubs, events, discussions, placements and
                announcements into a single powerful platform – no more scattered
                WhatsApp groups or missed updates.
              </p>
              <div className="hero-buttons">
                <Link to="/signup" className="hero-button-primary">
                  <Zap size={20} />
                  <span>Get Started</span>
                </Link>
                <Link to="/login" className="hero-button-secondary">
                  Go to Login
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-circle">
                <GraduationCap
                  size={128}
                  color="white"
                  style={{ opacity: 0.9 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="section section-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Built for Modern Campuses</h2>
            <p className="section-subtitle">
              Campus Vinculum connects every stakeholder in your institution –
              students, clubs, faculty and alumni – and keeps everyone on the
              same page.
            </p>
          </div>

          <div className="grid-3">
            <div className="purpose-card blue">
              <div className="purpose-icon blue">
                <Users size={24} color="white" />
              </div>
              <h3 className="card-title">Student Engagement</h3>
              <p className="card-description">
                Discover clubs, join events, track schedules and never miss an
                important announcement from your campus community.
              </p>
            </div>

            <div className="purpose-card green">
              <div className="purpose-icon green">
                <MessageSquare size={24} color="white" />
              </div>
              <h3 className="card-title">Collaborative Discussions</h3>
              <p className="card-description">
                Dedicated discussion spaces for clubs, batches and committees
                with structured conversations instead of noisy chats.
              </p>
            </div>

            <div className="purpose-card purple">
              <div className="purpose-icon purple">
                <Briefcase size={24} color="white" />
              </div>
              <h3 className="card-title">Placements & Alumni</h3>
              <p className="card-description">
                Centralize job postings, alumni interactions and mentoring
                opportunities to boost student career outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section section-light">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">
              Everything your campus needs in one place
            </p>
          </div>

          <div className="grid-3">
            {[
              {
                icon: MdSpaceDashboardIcon,
                title: "Role-Based Dashboards",
                desc: "Personalized views for students, faculty, alumni and admins."
              },
              {
                icon: Users,
                title: "Clubs & Communities",
                desc: "Manage club members, events, announcements and discussions."
              },
              {
                icon: CalendarDays,
                title: "Events & Schedules",
                desc: "Track academic calendars, club events and live sessions."
              },
              {
                icon: Briefcase,
                title: "Jobs & Internships",
                desc: "Curated opportunities from alumni and placement cell."
              },
              {
                icon: Shield,
                title: "Secure Access",
                desc: "JWT-based auth with role-specific permissions and controls."
              },
              {
                icon: BarChart3,
                title: "Analytics for Admins",
                desc: "Insights on engagement, events, and student participation."
              }
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div key={idx} className="feature-card">
                  <IconComponent
                    size={40}
                    color="#1d4ed8"
                    className="feature-icon"
                  />
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="card-description">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section section-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Your Campus Will Love It</h2>
            <p className="section-subtitle">
              Designed to reduce chaos and increase engagement
            </p>
          </div>

          <div className="grid-2">
            {[
              {
                title: "No More Scattered Channels",
                desc: "Centralize communication instead of handling dozens of WhatsApp groups."
              },
              {
                title: "Higher Event Participation",
                desc: "Students see all relevant events and reminders in one place."
              },
              {
                title: "Structured Collaboration",
                desc: "Dedicated spaces for discussions, announcements and resources."
              },
              {
                title: "Better Alumni Connect",
                desc: "Bridge the gap between students and alumni through jobs and mentoring."
              },
              {
                title: "Clear Oversight for Admins",
                desc: "Admins get a unified view of campus activities and engagement."
              },
              {
                title: "Future-Ready Platform",
                desc: "Extensible architecture for integrating chatbots, live sessions and more."
              }
            ].map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">
                  <div className="benefit-dot" />
                </div>
                <div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="card-description">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works / CTA Section */}
      <section id="download" className="download-section">
        <div className="download-container">
          <h2 className="download-title">Ready to Modernize Your Campus?</h2>
          <p className="download-subtitle">
            Get your students, faculty and alumni on a single, unified platform
            in just a few steps.
          </p>

          <div className="download-buttons">
            <Link to="/signup" className="download-button">
              <Zap size={32} />
              <div className="download-info">
                <div className="download-title-text">Request Access</div>
                <div className="download-subtitle-text">
                  Create an account and start exploring the platform.
                </div>
              </div>
            </Link>
            <p className="download-note">
              Already have an account?{" "}
              <Link to="/login" className="download-note-link">
                Log in here
              </Link>
              .
            </p>
          </div>

          <div className="admin-access">
            <p className="admin-access-text">Campus admin or faculty?</p>
            <Link to="/login" className="admin-access-button">
              Go to Dashboard Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <GraduationCap size={24} color="#1d4ed8" />
                <span className="footer-brand-text">Campus Vinculum</span>
              </div>
              <p className="footer-description">
                A connected campus experience for students, alumni and faculty.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Product</h4>
              <div className="footer-links">
                <a href="#features" className="footer-link">
                  Features
                </a>
                <a href="#benefits" className="footer-link">
                  For Campus
                </a>
                <a href="#download" className="footer-link">
                  Get Started
                </a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Resources</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">
                  Documentation
                </a>
                <a href="#" className="footer-link">
                  Support
                </a>
                <a href="#" className="footer-link">
                  FAQs
                </a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Contact</h4>
              <div className="footer-links">
                <div>Admin: admin@campusvinculum.com</div>
                <div>Support: support@campusvinculum.com</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Campus Vinculum. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Small helper so we can use an icon that matches your dashboard vibe.
 * You can also just directly use any lucide icon here.
 */
function MdSpaceDashboardIcon(props) {
  return <Shield {...props} />;
}
