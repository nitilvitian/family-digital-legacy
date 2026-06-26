"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">FamilyVault</span>
          </div>
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Secure Your Family's{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Digital Legacy
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            FamilyVault helps families securely organize, store, and recover important documents,
            assets, and information when needed. Your files, your control.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose FamilyVault?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Zero Vendor Lock-in",
                description: "Your files stay in your Google Drive or OneDrive. Full control always.",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description: "End-to-end encryption, audit logs, and secure access controls.",
              },
              {
                icon: Users,
                title: "Nominee Management",
                description: "Add up to two nominees with granular access controls and approval workflows.",
              },
              {
                icon: Clock,
                title: "Inactivity Recovery",
                description: "Automatic access recovery for nominees if you become inactive.",
              },
              {
                icon: CheckCircle,
                title: "Complete Audit Trail",
                description: "Every action is logged and auditable for transparency and compliance.",
              },
              {
                icon: ArrowRight,
                title: "Easy Integration",
                description: "Simple setup with Google Drive or OneDrive. No complicated onboarding.",
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-lg bg-white p-8 shadow-sm">
                <feature.icon className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your account using Google OAuth. No passwords to remember.",
              },
              {
                step: "2",
                title: "Connect Storage",
                description: "Connect your Google Drive or OneDrive. We only access what you authorize.",
              },
              {
                step: "3",
                title: "Add Nominees",
                description: "Invite up to two trusted nominees with verified email addresses.",
              },
              {
                step: "4",
                title: "Manage Access",
                description:
                  "Control who can access what, and for how long. Everything is audited.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-8">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <span className="font-semibold text-blue-600">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-blue-600 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Built on Trust</h2>
          <p className="mt-4 text-lg text-blue-100">
            Your privacy and security are our highest priorities. We never store your files, only
            metadata. You maintain complete ownership.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "End-to-End Encryption", value: "✓" },
              { label: "Zero File Storage", value: "✓" },
              { label: "Immutable Audit Logs", value: "✓" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg bg-blue-500 p-4">
                <p className="text-sm font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to Secure Your Family's Future?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Start free today. No credit card required.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="mt-8">
              Create Your Vault
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Compliance"],
              },
              {
                title: "Resources",
                links: ["Docs", "API", "Support", "Community"],
              },
            ].map((column, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-900">{column.title}</h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2024 FamilyVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
