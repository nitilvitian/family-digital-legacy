"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Lock, Shield, User, Save, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    inactivityDays: 90,
    storageProvider: "google_drive",
    emailNotifications: true,
    twoFactor: false,
  });

  const handleSave = () => {
    // TODO: Save settings to Supabase
    console.log("Saving settings:", settings);
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // TODO: Delete account
      console.log("Deleting account...");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600">Manage your account and security preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <CardTitle>Profile Information</CardTitle>
          </div>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) =>
                  setSettings({ ...settings, fullName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
              />
            </div>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-600" />
            <CardTitle>Security Settings</CardTitle>
          </div>
          <CardDescription>
            Manage your security and authentication preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-slate-600">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">
                {settings.twoFactor ? "Disable" : "Enable"}
              </Button>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium text-slate-900 mb-3">
                Change Password
              </p>
              <Button variant="outline">
                Update Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Recovery */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle>Privacy & Recovery</CardTitle>
          </div>
          <CardDescription>
            Configure inactivity recovery and access policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inactivity">Inactivity Recovery Period</Label>
            <select
              id="inactivity"
              value={settings.inactivityDays}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  inactivityDays: parseInt(e.target.value),
                })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>365 days</option>
            </select>
            <p className="text-xs text-slate-600 mt-2">
              If you're inactive for this period, nominees will be notified and
              can request access with dual verification.
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Label htmlFor="storage">Primary Storage Provider</Label>
            <select
              id="storage"
              value={settings.storageProvider}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  storageProvider: e.target.value,
                })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="google_drive">Google Drive</option>
              <option value="onedrive">Microsoft OneDrive</option>
              <option value="both">Both</option>
            </select>
          </div>

          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Control how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">
                Email Notifications
              </p>
              <p className="text-sm text-slate-600">
                Receive alerts and updates via email
              </p>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  emailNotifications: !settings.emailNotifications,
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
          <CardDescription className="text-red-800">
            Irreversible actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
          <p className="text-sm text-red-800">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
