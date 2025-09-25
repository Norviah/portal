"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

import { 
  Calendar, 
  Users, 
  DollarSign, 
  FileText, 
  Camera, 
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Upload,
  Eye,
  Phone,
  Mail
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
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: string;
  managerEmail: string;
  managerPhone: string;
  teamSize: number;
  nextMilestone: string;
  daysRemaining: number;
  lastUpdate: string;
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'overdue';
  progress: number;
}

export default function ClientProjectPage() {
  const [user, setUser] = useState<User | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock project data
    setProject({
      id: "1",
      name: "Modern Home Renovation",
      description: "Complete renovation of a 3-bedroom family home including kitchen, bathrooms, and living areas",
      status: "active",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      budget: 150000,
      spent: 97500,
      manager: "Sarah Johnson",
      managerEmail: "sarah@trio.com",
      managerPhone: "(555) 123-4567",
      teamSize: 8,
      nextMilestone: "Kitchen Installation",
      daysRemaining: 85,
      lastUpdate: "2024-10-08T10:30:00Z"
    });

    // Mock milestones data
    setMilestones([
      {
        id: "1",
        name: "Planning & Permits",
        description: "Complete planning phase and obtain all necessary permits",
        dueDate: "2024-02-15",
        status: "completed",
        progress: 100
      },
      {
        id: "2",
        name: "Foundation Work",
        description: "Foundation preparation and concrete work",
        dueDate: "2024-04-30",
        status: "completed",
        progress: 100
      },
      {
        id: "3",
        name: "Framing & Structure",
        description: "Structural framing and basic construction",
        dueDate: "2024-08-15",
        status: "in-progress",
        progress: 75
      },
      {
        id: "4",
        name: "Kitchen Installation",
        description: "Kitchen cabinets, appliances, and fixtures installation",
        dueDate: "2024-11-15",
        status: "upcoming",
        progress: 0
      },
      {
        id: "5",
        name: "Final Walkthrough",
        description: "Final inspection and project completion",
        dueDate: "2024-12-31",
        status: "upcoming",
        progress: 0
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'upcoming': return <Clock className="h-4 w-4 text-gray-400" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Details"
          description="Detailed view of your project progress and information"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Overview", href: "#" },
            { label: "Project Details", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Project Header */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.startDate} - {project.endDate}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {project.daysRemaining} days remaining
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Team
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{project.progress}%</div>
                <Progress value={project.progress} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Budget Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${project.spent.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">of ${project.budget.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Team Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{project.teamSize}</div>
                <p className="text-xs text-gray-600">team members</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Next Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-gray-900">{project.nextMilestone}</div>
                <p className="text-xs text-gray-600">upcoming</p>
              </CardContent>
            </Card>
          </div>

          {/* Project Details */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>Basic project details and specifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Project Type:</span>
                        <span className="text-sm">Home Renovation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Start Date:</span>
                        <span className="text-sm">{project.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Expected Completion:</span>
                        <span className="text-sm">{project.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Total Budget:</span>
                        <span className="text-sm font-bold">${project.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Amount Spent:</span>
                        <span className="text-sm">${project.spent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Remaining Budget:</span>
                        <span className="text-sm">${(project.budget - project.spent).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Project Manager</CardTitle>
                    <CardDescription>Your main point of contact</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{project.manager}</div>
                        <div className="text-sm text-gray-600">Project Manager</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{project.managerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{project.managerPhone}</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                  <CardDescription>Track your project's key milestones and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">Due: {milestone.dueDate}</span>
                            {milestone.status === 'in-progress' && (
                              <div className="flex items-center space-x-2">
                                <Progress value={milestone.progress} className="w-20 h-1" />
                                <span className="text-xs text-gray-500">{milestone.progress}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Project Team</h3>
                <p className="text-gray-600">Meet your project team members</p>
              </div>
            </TabsContent>

            <TabsContent value="files" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Project Files</h3>
                <p className="text-gray-600">Access project documents and files</p>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <div className="text-center py-8">
                <Camera className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">Project Gallery</h3>
                <p className="text-gray-600">View photos and progress updates</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
