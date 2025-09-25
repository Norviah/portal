"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Camera,
  FileText,
  Users,
  Settings,
  Target,
  Zap,
  Star,
  Eye,
  Download,
  Share
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  startDate: string;
  endDate: string;
  actualEndDate?: string;
  progress: number;
  tasks: Array<{
    id: string;
    name: string;
    status: 'completed' | 'in-progress' | 'pending';
    assignedTo: string;
    dueDate: string;
  }>;
  photos?: Array<{
    id: string;
    url: string;
    caption: string;
    date: string;
  }>;
}

interface ProjectProgress {
  id: string;
  projectName: string;
  overallProgress: number;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  phases: ProjectPhase[];
  team: Array<{
    name: string;
    role: string;
    avatar?: string;
  }>;
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  nextMilestone: {
    name: string;
    date: string;
    description: string;
  };
  recentUpdates: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'update' | 'milestone' | 'photo' | 'issue';
  }>;
}

export default function ClientProgressPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock project progress data
    setProjectProgress({
      id: "proj-1",
      projectName: "Modern Home Renovation",
      overallProgress: 65,
      status: "on-track",
      startDate: "2024-09-01",
      expectedEndDate: "2024-12-15",
      phases: [
        {
          id: "phase-1",
          name: "Planning & Design",
          description: "Initial planning, design approval, and permit acquisition",
          status: "completed",
          startDate: "2024-09-01",
          endDate: "2024-09-15",
          actualEndDate: "2024-09-14",
          progress: 100,
          tasks: [
            { id: "task-1", name: "Design consultation", status: "completed", assignedTo: "Emma Thompson", dueDate: "2024-09-05" },
            { id: "task-2", name: "Permit application", status: "completed", assignedTo: "Mike Chen", dueDate: "2024-09-10" },
            { id: "task-3", name: "Material selection", status: "completed", assignedTo: "Sarah Johnson", dueDate: "2024-09-15" }
          ],
          photos: [
            { id: "photo-1", url: "/photos/design-1.jpg", caption: "Initial design concepts", date: "2024-09-05" },
            { id: "photo-2", url: "/photos/design-2.jpg", caption: "Final approved design", date: "2024-09-14" }
          ]
        },
        {
          id: "phase-2",
          name: "Demolition",
          description: "Remove existing fixtures and prepare space for renovation",
          status: "completed",
          startDate: "2024-09-16",
          endDate: "2024-09-25",
          actualEndDate: "2024-09-24",
          progress: 100,
          tasks: [
            { id: "task-4", name: "Kitchen demolition", status: "completed", assignedTo: "David Rodriguez", dueDate: "2024-09-20" },
            { id: "task-5", name: "Living room demolition", status: "completed", assignedTo: "David Rodriguez", dueDate: "2024-09-25" }
          ],
          photos: [
            { id: "photo-3", url: "/photos/demo-1.jpg", caption: "Kitchen before demolition", date: "2024-09-16" },
            { id: "photo-4", url: "/photos/demo-2.jpg", caption: "Kitchen after demolition", date: "2024-09-24" }
          ]
        },
        {
          id: "phase-3",
          name: "Construction",
          description: "Main construction work including electrical, plumbing, and framing",
          status: "in-progress",
          startDate: "2024-09-26",
          endDate: "2024-11-15",
          progress: 75,
          tasks: [
            { id: "task-6", name: "Electrical rough-in", status: "completed", assignedTo: "Mike Chen", dueDate: "2024-10-10" },
            { id: "task-7", name: "Plumbing rough-in", status: "completed", assignedTo: "Mike Chen", dueDate: "2024-10-15" },
            { id: "task-8", name: "Framing", status: "in-progress", assignedTo: "David Rodriguez", dueDate: "2024-10-25" },
            { id: "task-9", name: "Drywall installation", status: "pending", assignedTo: "David Rodriguez", dueDate: "2024-11-05" }
          ],
          photos: [
            { id: "photo-5", url: "/photos/construction-1.jpg", caption: "Electrical work in progress", date: "2024-10-05" },
            { id: "photo-6", url: "/photos/construction-2.jpg", caption: "Plumbing installation", date: "2024-10-12" }
          ]
        },
        {
          id: "phase-4",
          name: "Finishing",
          description: "Final touches including painting, flooring, and fixture installation",
          status: "pending",
          startDate: "2024-11-16",
          endDate: "2024-12-15",
          progress: 0,
          tasks: [
            { id: "task-10", name: "Painting", status: "pending", assignedTo: "David Rodriguez", dueDate: "2024-11-25" },
            { id: "task-11", name: "Flooring installation", status: "pending", assignedTo: "David Rodriguez", dueDate: "2024-12-05" },
            { id: "task-12", name: "Fixture installation", status: "pending", assignedTo: "Mike Chen", dueDate: "2024-12-10" }
          ]
        }
      ],
      team: [
        { name: "Sarah Johnson", role: "Project Manager", avatar: "/avatars/sarah.jpg" },
        { name: "Mike Chen", role: "Site Supervisor", avatar: "/avatars/mike.jpg" },
        { name: "David Rodriguez", role: "Construction Worker", avatar: "/avatars/david.jpg" },
        { name: "Emma Thompson", role: "Designer", avatar: "/avatars/emma.jpg" }
      ],
      budget: {
        total: 75000,
        spent: 45000,
        remaining: 30000
      },
      nextMilestone: {
        name: "Framing Complete",
        date: "2024-10-25",
        description: "All framing work will be completed, ready for drywall installation"
      },
      recentUpdates: [
        {
          id: "update-1",
          title: "Electrical work completed",
          description: "All electrical rough-in work has been completed and inspected. Ready to proceed with plumbing.",
          date: "2024-10-10T14:30:00Z",
          type: "milestone"
        },
        {
          id: "update-2",
          title: "New photos uploaded",
          description: "Updated photos showing current progress in the kitchen area.",
          date: "2024-10-08T10:15:00Z",
          type: "photo"
        },
        {
          id: "update-3",
          title: "Material delivery",
          description: "Drywall materials have been delivered and are ready for installation next week.",
          date: "2024-10-05T16:45:00Z",
          type: "update"
        }
      ]
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'update': return FileText;
      case 'milestone': return Target;
      case 'photo': return Camera;
      case 'issue': return AlertTriangle;
      default: return FileText;
    }
  };

  if (!projectProgress) {
    return (
      <SidebarProvider>
        <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
        <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading project progress...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Progress"
          description="Track your project's progress and milestones"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Overview", href: "#" },
            { label: "Progress", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Progress</h1>
              <p className="text-gray-600 mt-1">Track your project's progress and milestones</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Project Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{projectProgress.overallProgress}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <Progress value={projectProgress.overallProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Project Status</p>
                    <p className="text-2xl font-bold text-gray-900 capitalize">{projectProgress.status.replace('-', ' ')}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Badge className={getProjectStatusColor(projectProgress.status)}>
                    {projectProgress.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Budget Used</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${projectProgress.budget.spent.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      of ${projectProgress.budget.total.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Progress 
                    value={(projectProgress.budget.spent / projectProgress.budget.total) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expected Completion</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date(projectProgress.expectedEndDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    {Math.ceil((new Date(projectProgress.expectedEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Tracking */}
          <Tabs defaultValue="phases" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="phases">Phases</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="phases" className="space-y-4">
              <div className="space-y-4">
                {projectProgress.phases.map((phase, index) => (
                  <Card key={phase.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{phase.name}</CardTitle>
                          <CardDescription>{phase.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(phase.status)}>
                            {phase.status.replace('-', ' ')}
                          </Badge>
                          <span className="text-sm font-medium">{phase.progress}%</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Start Date:</span>
                          <span className="ml-2 font-medium">{new Date(phase.startDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">End Date:</span>
                          <span className="ml-2 font-medium">{new Date(phase.endDate).toLocaleDateString()}</span>
                        </div>
                        {phase.actualEndDate && (
                          <div>
                            <span className="text-gray-600">Actual End:</span>
                            <span className="ml-2 font-medium">{new Date(phase.actualEndDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Tasks</h4>
                        <div className="space-y-1">
                          {phase.tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between text-sm">
                              <span className="flex items-center space-x-2">
                                <CheckCircle className={`h-4 w-4 ${
                                  task.status === 'completed' ? 'text-green-600' : 
                                  task.status === 'in-progress' ? 'text-blue-600' : 'text-gray-400'
                                }`} />
                                <span>{task.name}</span>
                              </span>
                              <span className="text-gray-500">{task.assignedTo}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {phase.photos && phase.photos.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Photos</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {phase.photos.map((photo) => (
                              <div key={photo.id} className="relative group">
                                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Camera className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="secondary">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{photo.caption}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
                <div className="space-y-4">
                  {projectProgress.phases.map((phase, index) => (
                    <div key={phase.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          phase.status === 'completed' ? 'bg-green-100 text-green-600' :
                          phase.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {phase.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : phase.status === 'in-progress' ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-current" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{phase.name}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{phase.description}</p>
                        <div className="mt-2">
                          <Progress value={phase.progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projectProgress.phases
                  .filter(phase => phase.photos && phase.photos.length > 0)
                  .map(phase => 
                    phase.photos!.map(photo => (
                      <Card key={photo.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                        <CardContent className="p-0">
                          <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                            <Camera className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-sm">{photo.caption}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {phase.name} • {new Date(photo.date).toLocaleDateString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )
                  .flat()}
              </div>
            </TabsContent>

            <TabsContent value="updates" className="space-y-4">
              <div className="space-y-4">
                {projectProgress.recentUpdates.map((update) => {
                  const UpdateIcon = getUpdateIcon(update.type);
                  return (
                    <Card key={update.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <UpdateIcon className="h-4 w-4 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{update.title}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(update.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Next Milestone */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Next Milestone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-lg">{projectProgress.nextMilestone.name}</h4>
                <p className="text-gray-600">{projectProgress.nextMilestone.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(projectProgress.nextMilestone.date).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {Math.ceil((new Date(projectProgress.nextMilestone.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
