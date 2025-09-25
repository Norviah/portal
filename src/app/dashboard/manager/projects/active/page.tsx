"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { 
  Plus, 
  Clock, 
  Users, 
  Calendar, 
  DollarSign,
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  teamSize: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  nextMilestone: string;
  daysRemaining: number;
}

export default function ManagerActiveProjectsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data for active projects
    setProjects([
      {
        id: "1",
        name: "Modern Home Renovation",
        client: "John Smith",
        status: "active",
        progress: 65,
        startDate: "2024-01-15",
        endDate: "2024-12-31",
        budget: 150000,
        spent: 97500,
        teamSize: 8,
        priority: "high",
        nextMilestone: "Kitchen Installation",
        daysRemaining: 85
      },
      {
        id: "2",
        name: "Office Building Construction",
        client: "ABC Corp",
        status: "active",
        progress: 25,
        startDate: "2024-03-01",
        endDate: "2025-06-30",
        budget: 500000,
        spent: 125000,
        teamSize: 15,
        priority: "medium",
        nextMilestone: "Foundation Complete",
        daysRemaining: 265
      },
      {
        id: "3",
        name: "Retail Space Renovation",
        client: "XYZ Retail",
        status: "active",
        progress: 40,
        startDate: "2024-06-01",
        endDate: "2024-11-30",
        budget: 75000,
        spent: 30000,
        teamSize: 5,
        priority: "urgent",
        nextMilestone: "Electrical Work",
        daysRemaining: 45
      }
    ]);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Active Projects"
          description="Manage your currently active projects"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "My Projects", href: "#" },
            { label: "Active Projects", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Active Projects</h1>
              <p className="text-gray-600 mt-1">Manage and monitor your currently active projects</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Project Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
                <p className="text-xs text-gray-600">Projects in progress</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">Across all projects</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {projects.reduce((sum, p) => sum + p.teamSize, 0)}
                </div>
                <p className="text-xs text-gray-600">Working on projects</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                </div>
                <p className="text-xs text-gray-600">Average completion</p>
              </CardContent>
            </Card>
          </div>

          {/* Projects Table */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="budget">Budget</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                        <TableHead className="font-semibold">Project</TableHead>
                        <TableHead className="font-semibold">Client</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                        <TableHead className="font-semibold">Progress</TableHead>
                        <TableHead className="font-semibold">Next Milestone</TableHead>
                        <TableHead className="font-semibold">Days Left</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500">
                                {project.startDate} - {project.endDate}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{project.client}</TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(project.priority)}>
                              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={project.progress} className="w-20 h-2" />
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{project.nextMilestone}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">{project.daysRemaining} days</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4">
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-2">Project Timeline</h3>
                    <p className="text-gray-600">Visual timeline view of all active projects</p>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-4">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold mb-2">Team Management</h3>
                    <p className="text-gray-600">Manage team members across all active projects</p>
                  </div>
                </TabsContent>

                <TabsContent value="budget" className="space-y-4">
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-semibold mb-2">Budget Overview</h3>
                    <p className="text-gray-600">Track budget allocation and spending across projects</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
