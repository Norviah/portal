"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";

import { Shield, Users, DollarSign, FileText, Settings, AlertTriangle, CheckCircle, Clock, TrendingUp, Plus, Download, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const activities = [
    {
      id: "act-1",
      type: "system" as const,
      title: "New project created",
      description: "Modern Home Renovation project added to system",
      timestamp: "2024-10-08T10:30:00Z",
      status: "completed" as const
    },
    {
      id: "act-2", 
      type: "system" as const,
      title: "User role updated",
      description: "John Manager promoted to senior manager",
      timestamp: "2024-10-08T08:15:00Z",
      status: "completed" as const
    },
    {
      id: "act-3",
      type: "system" as const,
      title: "System maintenance completed",
      description: "Database optimization and security updates applied",
      timestamp: "2024-10-07T14:20:00Z",
      status: "completed" as const
    }
  ];

  const quickActions = [
    {
      id: "create-project",
      label: "Create New Project",
      icon: Plus,
      onClick: () => console.log("Create project"),
      variant: "default" as const
    },
    {
      id: "generate-report",
      label: "Generate Report",
      icon: BarChart3,
      onClick: () => console.log("Generate report"),
      variant: "outline" as const
    },
    {
      id: "export-data",
      label: "Export Data",
      icon: Download,
      onClick: () => console.log("Export data"),
      variant: "outline" as const
    },
    {
      id: "system-settings",
      label: "System Settings",
      icon: Settings,
      onClick: () => console.log("System settings"),
      variant: "outline" as const
    }
  ];

  return (
    <SidebarProvider>
      <AppSidebar role="admin" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 min-h-screen">
        <DashboardHeader
          title="Admin Dashboard"
          description="System overview and management controls"
          breadcrumbs={[
            { label: "Admin Dashboard", href: "#" },
            { label: "System Overview", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Welcome Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Welcome back, <span className="font-semibold text-red-700 dark:text-red-400">{user?.name}</span>! Monitor system performance and manage resources.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Projects</h3>
                <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg">
                  <FileText className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">12</div>
              <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">+2 from last month</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Active Users</h3>
                <div className="p-2 bg-green-500 dark:bg-green-600 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">47</div>
              <p className="text-xs text-green-600 dark:text-green-300 font-medium">+5 from last week</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Revenue</h3>
                <div className="p-2 bg-purple-500 dark:bg-purple-600 rounded-lg">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">$2.4M</div>
              <p className="text-xs text-purple-600 dark:text-purple-300 font-medium">+12% from last month</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">System Health</h3>
                <div className="p-2 bg-orange-500 dark:bg-orange-600 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-1">99.9%</div>
              <p className="text-xs text-orange-600 dark:text-orange-300 font-medium">Uptime this month</p>
              <div className="mt-2">
                <Badge className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700/50">Excellent</Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <Tabs defaultValue="projects" className="space-y-6">
                <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm grid w-full grid-cols-3">
                  <TabsTrigger value="projects" className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300">Projects</TabsTrigger>
                  <TabsTrigger value="users" className="data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/50 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300">Users</TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-6">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50">
                        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Project Management</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">Overview of all active and completed projects</p>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Project</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Client</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Progress</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
                            <TableCell className="font-medium text-gray-800 dark:text-gray-200">Modern Home Renovation</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">John Smith</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700/50">In Progress</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={65} className="w-20 h-2" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">65%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" className="border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">Manage</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                            <TableCell className="font-medium text-gray-800 dark:text-gray-200">Office Building</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">ABC Corp</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700/50">Planning</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={25} className="w-20 h-2" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">25%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" className="border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20">Manage</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                <TabsContent value="users" className="space-y-6">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 border border-green-200 dark:border-green-700/50">
                        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">User Management</h3>
                        <p className="text-sm text-green-600 dark:text-green-300 mt-1">Manage user accounts and permissions</p>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Name</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Email</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Role</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">John Manager</TableCell>
                              <TableCell>manager@trio.com</TableCell>
                              <TableCell>
                                <Badge variant="default">Manager</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">Active</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">Edit</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Jane Client</TableCell>
                              <TableCell>client@trio.com</TableCell>
                              <TableCell>
                                <Badge variant="secondary">Client</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">Active</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">Edit</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700/50">
                        <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">System Settings</h3>
                        <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">Configure system-wide settings and preferences</p>
                      </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">Feature Visibility Controls</h4>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">Control which features are visible to different user roles</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Payment Forecast</span>
                                <Button variant="outline" size="sm" className="border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">Configure</Button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Invoice Management</span>
                                <Button variant="outline" size="sm" className="border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">Configure</Button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Decision Tracking</span>
                                <Button variant="outline" size="sm" className="border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">Configure</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                {/* System Alerts */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-800 dark:text-orange-200">
                      <AlertTriangle className="h-4 w-4" />
                      System Alerts
                    </h3>
                    <div className="space-y-3">
                      <Alert className="border-orange-200 dark:border-orange-700/50 bg-orange-50 dark:bg-orange-900/20">
                        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <AlertDescription className="text-orange-800 dark:text-orange-200">
                          Database backup scheduled for tonight at 2 AM
                        </AlertDescription>
                      </Alert>
                      <Alert className="border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          All systems operational
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <ActivityFeed activities={activities} />

                {/* Quick Actions */}
                <QuickActions actions={quickActions} />
              </div>
            </div>
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
