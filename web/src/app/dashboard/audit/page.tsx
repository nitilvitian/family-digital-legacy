"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, LogIn, Upload, FileText, Users } from "lucide-react";
import { useState } from "react";

const ACTION_ICONS: Record<string, any> = {
  login: LogIn,
  upload: Upload,
  download: FileText,
  delete: FileText,
  access_request: Users,
};

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // TODO: Fetch audit logs from Supabase

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Audit Logs</h1>
        <p className="text-slate-600">
          Track all actions and changes to your vault
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Action Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedAction === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAction(null)}
          >
            All Actions
          </Button>
          {["login", "logout", "upload", "delete", "access_request", "access_approval"].map(
            (action) => (
              <Button
                key={action}
                variant={selectedAction === action ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAction(action)}
              >
                {action.replace("_", " ").charAt(0).toUpperCase() +
                  action.replace("_", " ").slice(1)}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Logs Table */}
      <Card>
        <CardContent className="pt-6">
          {auditLogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-medium text-slate-900">
                No audit logs yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Your actions will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Action
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Resource
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Timestamp
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      id: 1,
                      action: "login",
                      resource: "User Session",
                      timestamp: "2024-06-23 08:30:00",
                      status: "success",
                      ip: "192.168.1.1",
                    },
                    {
                      id: 2,
                      action: "upload",
                      resource: "Document: tax_return_2024.pdf",
                      timestamp: "2024-06-23 08:25:00",
                      status: "success",
                      ip: "192.168.1.1",
                    },
                    {
                      id: 3,
                      action: "access_request",
                      resource: "Document: insurance_policy.pdf",
                      timestamp: "2024-06-23 08:20:00",
                      status: "pending",
                      ip: "192.168.1.100",
                    },
                  ].map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {ACTION_ICONS[log.action]
                            ? (() => {
                                const Icon = ACTION_ICONS[log.action];
                                return <Icon className="h-4 w-4 text-slate-400" />;
                              })()
                            : null}
                          <span className="capitalize">
                            {log.action.replace(/_/g, " ")}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {log.resource}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {log.timestamp}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            log.status === "success"
                              ? "bg-green-100 text-green-800"
                              : log.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {log.status.charAt(0).toUpperCase() +
                            log.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {log.ip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing 1 to 10 of 100 logs
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
