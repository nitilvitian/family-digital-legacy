"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  Clock,
  Shield,
  ArrowRight,
  Plus,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // TODO: Fetch user data from Supabase
  const stats = [
    { label: "Total Documents", value: "0", icon: FileText },
    { label: "Active Nominees", value: "0", icon: Users },
    { label: "Last Activity", value: "Today", icon: Clock },
    { label: "Inactivity Days", value: "90", icon: Shield },
  ];

  const recentActivity = [
    { id: 1, action: "Signed in", timestamp: "2 minutes ago" },
    { id: 2, action: "Updated settings", timestamp: "1 hour ago" },
    { id: 3, action: "Added document", timestamp: "2 hours ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="text-slate-600">
          Manage your digital legacy and family continuity
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with FamilyVault
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/documents">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            </Link>
            <Link href="/dashboard/nominees">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add Nominee
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Configure Security
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Complete these steps to secure your vault
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { step: 1, title: "Connect Storage", done: false },
              { step: 2, title: "Upload Documents", done: false },
              { step: 3, title: "Add Nominees", done: false },
              { step: 4, title: "Configure Recovery", done: false },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    item.done
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {item.step}
                </div>
                <span className="text-sm text-slate-700">{item.title}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest actions and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-sm text-slate-700">{activity.action}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6 flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">
              Need Help Getting Started?
            </h3>
            <p className="text-sm text-blue-800 mt-1">
              Check our documentation and guides to learn how to make the most of
              FamilyVault.
            </p>
            <Button variant="link" className="mt-2 pl-0 text-blue-600">
              Read Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
