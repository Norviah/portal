"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { 
  CheckCircle, 
  AlertTriangle, 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield,
  Activity,
  Clock,
  Users,
  FileText,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface SystemMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  change: number;
  icon: any;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  title: string;
  description: string;
  timestamp: string;
}

export default function AdminSystemPage() {
  const [user, setUser] = useState<User | null>(null);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock system metrics
    setMetrics([
      {
        name: "CPU Usage",
        value: "45%",
        status: "good",
        change: -5,
        icon: Cpu
      },
      {
        name: "Memory Usage",
        value: "72%",
        status: "warning",
        change: 12,
        icon: HardDrive
      },
      {
        name: "Disk Space",
        value: "38%",
        status: "good",
        change: -2,
        icon: Database
      },
      {
        name: "Network Latency",
        value: "12ms",
        status: "good",
        change: -3,
        icon: Wifi
      },
      {
        name: "Active Users",
        value: "47",
        status: "good",
        change: 8,
        icon: Users
      },
      {
        name: "Database Connections",
        value: "23/100",
        status: "good",
        change: 2,
        icon: Server
      }
    ]);

    // Mock system alerts
    setAlerts([
      {
        id: "1",
        type: "info",
        title: "Scheduled Maintenance",
        description: "Database optimization completed successfully",
        timestamp: "2024-10-08T10:30:00Z"
      },
      {
        id: "2",
        type: "warning",
        title: "High Memory Usage",
        description: "Memory usage is above 70%. Consider scaling resources.",
        timestamp: "2024-10-08T09:15:00Z"
      },
      {
        id: "3",
        type: "info",
        title: "Backup Completed",
        description: "Daily backup completed successfully",
        timestamp: "2024-10-08T02:00:00Z"
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar role="admin" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 min-h-screen">
        <DashboardHeader
          title="System Health"
          description="Monitor system performance and health metrics"
          breadcrumbs={[
            { label: "Admin Dashboard", href: "/dashboard/admin" },
            { label: "System Health", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
            <p className="text-gray-600 mt-1">Monitor system performance and health metrics</p>
          </div>

          {/* System Status Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">{metric.name}</CardTitle>
                      {getStatusIcon(metric.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-8 w-8 text-gray-400" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="flex items-center text-sm">
                          {metric.change > 0 ? (
                            <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                          )}
                          <span className={metric.change > 0 ? 'text-red-500' : 'text-green-500'}>
                            {Math.abs(metric.change)}% from last hour
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* System Alerts and Details */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* System Alerts */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  <span>System Alerts</span>
                </CardTitle>
                <CardDescription>Recent system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <Alert key={alert.id} className="border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <AlertDescription className="text-sm">
                          <div className="font-medium text-gray-900">{alert.title}</div>
                          <div className="text-gray-600 mt-1">{alert.description}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(alert.timestamp).toLocaleString()}
                          </div>
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                ))}
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Performance Overview</span>
                </CardTitle>
                <CardDescription>System performance metrics over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Overall System Health</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-medium">45ms</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                    <Progress value={99} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed System Information */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Server Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Server Version</span>
                      <span className="font-medium">v2.4.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operating System</span>
                      <span className="font-medium">Ubuntu 22.04 LTS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Node.js Version</span>
                      <span className="font-medium">v18.17.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Database Version</span>
                      <span className="font-medium">PostgreSQL 14.8</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Resource Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU Cores</span>
                      <span className="font-medium">4 cores</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total RAM</span>
                      <span className="font-medium">16 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage</span>
                      <span className="font-medium">500 GB SSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network</span>
                      <span className="font-medium">1 Gbps</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                <p className="text-gray-600">Detailed performance analytics and monitoring</p>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Security Overview</h3>
                <p className="text-gray-600">Security monitoring and threat detection</p>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">System Logs</h3>
                <p className="text-gray-600">View and analyze system logs and events</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
