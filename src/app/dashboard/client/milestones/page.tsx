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
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

import { 
  Target, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  Star,
  Eye,
  Download,
  Share,
  Users,
  FileText,
  Camera,
  Settings,
  Zap,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Filter,
  Search
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  phase: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  dueDate: string;
  completedDate?: string;
  progress: number;
  assignedTo: string;
  dependencies: string[];
  deliverables: Array<{
    name: string;
    type: 'document' | 'photo' | 'approval' | 'meeting';
    status: 'completed' | 'pending';
    dueDate: string;
  }>;
  clientActions: Array<{
    action: string;
    status: 'pending' | 'completed';
    dueDate: string;
    description: string;
  }>;
  photos?: Array<{
    id: string;
    url: string;
    caption: string;
    date: string;
  }>;
  notes?: string;
  isCritical: boolean;
  estimatedHours: number;
  actualHours?: number;
}

export default function ClientMilestonesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock milestones data
    setMilestones([
      {
        id: "1",
        name: "Project Kickoff",
        description: "Initial project meeting and requirements confirmation",
        phase: "Planning",
        status: "completed",
        priority: "high",
        startDate: "2024-09-01",
        dueDate: "2024-09-01",
        completedDate: "2024-09-01",
        progress: 100,
        assignedTo: "Sarah Johnson",
        dependencies: [],
        deliverables: [
          { name: "Project Charter", type: "document", status: "completed", dueDate: "2024-09-01" },
          { name: "Requirements Document", type: "document", status: "completed", dueDate: "2024-09-01" }
        ],
        clientActions: [
          { action: "Attend kickoff meeting", status: "completed", dueDate: "2024-09-01", description: "Participate in initial project discussion" },
          { action: "Sign project charter", status: "completed", dueDate: "2024-09-01", description: "Review and approve project scope" }
        ],
        isCritical: true,
        estimatedHours: 4,
        actualHours: 4
      },
      {
        id: "2",
        name: "Design Approval",
        description: "Client approval of kitchen and living room design concepts",
        phase: "Planning",
        status: "completed",
        priority: "high",
        startDate: "2024-09-03",
        dueDate: "2024-09-05",
        completedDate: "2024-09-05",
        progress: 100,
        assignedTo: "Emma Thompson",
        dependencies: ["1"],
        deliverables: [
          { name: "Design Concepts", type: "document", status: "completed", dueDate: "2024-09-03" },
          { name: "3D Renderings", type: "photo", status: "completed", dueDate: "2024-09-04" },
          { name: "Client Approval", type: "approval", status: "completed", dueDate: "2024-09-05" }
        ],
        clientActions: [
          { action: "Review design concepts", status: "completed", dueDate: "2024-09-04", description: "Review initial design proposals" },
          { action: "Provide feedback", status: "completed", dueDate: "2024-09-04", description: "Submit design feedback and changes" },
          { action: "Approve final design", status: "completed", dueDate: "2024-09-05", description: "Approve final design for construction" }
        ],
        photos: [
          { id: "design-1", url: "/photos/design-1.jpg", caption: "Initial kitchen design", date: "2024-09-03" },
          { id: "design-2", url: "/photos/design-2.jpg", caption: "Final approved design", date: "2024-09-05" }
        ],
        isCritical: true,
        estimatedHours: 16,
        actualHours: 18
      },
      {
        id: "3",
        name: "Permit Approval",
        description: "Obtain all necessary building permits from city planning department",
        phase: "Planning",
        status: "completed",
        priority: "high",
        startDate: "2024-09-10",
        dueDate: "2024-09-15",
        completedDate: "2024-09-14",
        progress: 100,
        assignedTo: "Mike Chen",
        dependencies: ["2"],
        deliverables: [
          { name: "Permit Application", type: "document", status: "completed", dueDate: "2024-09-10" },
          { name: "Approved Permits", type: "document", status: "completed", dueDate: "2024-09-14" }
        ],
        clientActions: [
          { action: "Provide property documents", status: "completed", dueDate: "2024-09-08", description: "Submit property ownership documents" }
        ],
        isCritical: true,
        estimatedHours: 8,
        actualHours: 6
      },
      {
        id: "4",
        name: "Demolition Complete",
        description: "Complete demolition of existing kitchen and living room fixtures",
        phase: "Construction",
        status: "completed",
        priority: "medium",
        startDate: "2024-09-16",
        dueDate: "2024-09-25",
        completedDate: "2024-09-24",
        progress: 100,
        assignedTo: "David Rodriguez",
        dependencies: ["3"],
        deliverables: [
          { name: "Demolition Photos", type: "photo", status: "completed", dueDate: "2024-09-24" },
          { name: "Waste Disposal Receipt", type: "document", status: "completed", dueDate: "2024-09-24" }
        ],
        clientActions: [
          { action: "Remove personal items", status: "completed", dueDate: "2024-09-15", description: "Clear area of personal belongings" }
        ],
        photos: [
          { id: "demo-1", url: "/photos/demo-1.jpg", caption: "Before demolition", date: "2024-09-16" },
          { id: "demo-2", url: "/photos/demo-2.jpg", caption: "After demolition", date: "2024-09-24" }
        ],
        isCritical: false,
        estimatedHours: 24,
        actualHours: 22
      },
      {
        id: "5",
        name: "Electrical Rough-in",
        description: "Install all electrical wiring, outlets, and fixtures",
        phase: "Construction",
        status: "completed",
        priority: "high",
        startDate: "2024-09-26",
        dueDate: "2024-10-10",
        completedDate: "2024-10-10",
        progress: 100,
        assignedTo: "Mike Chen",
        dependencies: ["4"],
        deliverables: [
          { name: "Electrical Plan", type: "document", status: "completed", dueDate: "2024-09-26" },
          { name: "Inspection Certificate", type: "document", status: "completed", dueDate: "2024-10-10" },
          { name: "Progress Photos", type: "photo", status: "completed", dueDate: "2024-10-10" }
        ],
        clientActions: [
          { action: "Approve electrical plan", status: "completed", dueDate: "2024-09-25", description: "Review and approve electrical layout" }
        ],
        photos: [
          { id: "electrical-1", url: "/photos/electrical-1.jpg", caption: "Electrical panel installation", date: "2024-10-05" }
        ],
        isCritical: true,
        estimatedHours: 32,
        actualHours: 30
      },
      {
        id: "6",
        name: "Framing Complete",
        description: "Complete all framing work for new walls and structures",
        phase: "Construction",
        status: "in-progress",
        priority: "high",
        startDate: "2024-10-11",
        dueDate: "2024-10-25",
        progress: 75,
        assignedTo: "David Rodriguez",
        dependencies: ["5"],
        deliverables: [
          { name: "Framing Plan", type: "document", status: "completed", dueDate: "2024-10-11" },
          { name: "Progress Photos", type: "photo", status: "pending", dueDate: "2024-10-25" },
          { name: "Client Inspection", type: "meeting", status: "pending", dueDate: "2024-10-25" }
        ],
        clientActions: [
          { action: "Inspect framing work", status: "pending", dueDate: "2024-10-25", description: "Review framing before drywall installation" }
        ],
        isCritical: true,
        estimatedHours: 40,
        actualHours: 30
      },
      {
        id: "7",
        name: "Drywall Installation",
        description: "Install and finish drywall throughout the renovated areas",
        phase: "Construction",
        status: "pending",
        priority: "medium",
        startDate: "2024-10-26",
        dueDate: "2024-11-10",
        progress: 0,
        assignedTo: "David Rodriguez",
        dependencies: ["6"],
        deliverables: [
          { name: "Drywall Installation", type: "document", status: "pending", dueDate: "2024-11-10" },
          { name: "Progress Photos", type: "photo", status: "pending", dueDate: "2024-11-10" }
        ],
        clientActions: [
          { action: "Approve drywall finish", status: "pending", dueDate: "2024-11-10", description: "Review drywall finish quality" }
        ],
        isCritical: false,
        estimatedHours: 48
      },
      {
        id: "8",
        name: "Paint Selection",
        description: "Client selection of paint colors for all renovated areas",
        phase: "Finishing",
        status: "pending",
        priority: "medium",
        startDate: "2024-11-01",
        dueDate: "2024-11-05",
        progress: 0,
        assignedTo: "Emma Thompson",
        dependencies: ["7"],
        deliverables: [
          { name: "Color Samples", type: "document", status: "pending", dueDate: "2024-11-01" },
          { name: "Color Selection", type: "approval", status: "pending", dueDate: "2024-11-05" }
        ],
        clientActions: [
          { action: "Select paint colors", status: "pending", dueDate: "2024-11-05", description: "Choose colors for kitchen and living room" }
        ],
        isCritical: false,
        estimatedHours: 4
      },
      {
        id: "9",
        name: "Final Walkthrough",
        description: "Final project walkthrough and client acceptance",
        phase: "Finishing",
        status: "pending",
        priority: "high",
        startDate: "2024-12-10",
        dueDate: "2024-12-15",
        progress: 0,
        assignedTo: "Sarah Johnson",
        dependencies: ["8"],
        deliverables: [
          { name: "Final Inspection", type: "meeting", status: "pending", dueDate: "2024-12-15" },
          { name: "Project Completion Certificate", type: "document", status: "pending", dueDate: "2024-12-15" }
        ],
        clientActions: [
          { action: "Attend final walkthrough", status: "pending", dueDate: "2024-12-15", description: "Review completed work and provide final approval" }
        ],
        isCritical: true,
        estimatedHours: 2
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'Construction': return 'bg-orange-100 text-orange-800';
      case 'Finishing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMilestones = milestones.filter(milestone => {
    const matchesSearch = milestone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         milestone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         milestone.phase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || milestone.status === statusFilter;
    const matchesPhase = phaseFilter === "all" || milestone.phase === phaseFilter;
    const matchesPriority = priorityFilter === "all" || milestone.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPhase && matchesPriority;
  });

  const phases = [...new Set(milestones.map(m => m.phase))];
  const statuses = [...new Set(milestones.map(m => m.status))];
  const priorities = [...new Set(milestones.map(m => m.priority))];

  const stats = {
    total: milestones.length,
    completed: milestones.filter(m => m.status === 'completed').length,
    inProgress: milestones.filter(m => m.status === 'in-progress').length,
    pending: milestones.filter(m => m.status === 'pending').length,
    critical: milestones.filter(m => m.isCritical).length,
    clientActions: milestones.reduce((sum, m) => sum + m.clientActions.filter(a => a.status === 'pending').length, 0)
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Milestones"
          description="Track your project's key milestones and deliverables"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Overview", href: "#" },
            { label: "Milestones", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Milestones</h1>
              <p className="text-gray-600 mt-1">Track your project's key milestones and deliverables</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Milestones</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical</p>
                    <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
                  </div>
                  <Star className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Your Actions</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.clientActions}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search milestones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Phases</SelectItem>
                  {phases.map(phase => (
                    <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Milestones Display */}
          <Tabs defaultValue="grid" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMilestones.map((milestone) => (
                  <Card key={milestone.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{milestone.name}</CardTitle>
                          <CardDescription>{milestone.description}</CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                          {milestone.isCritical && (
                            <Badge className="bg-red-100 text-red-800">
                              Critical
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Phase:</span>
                          <Badge className={getPhaseColor(milestone.phase)}>
                            {milestone.phase}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-gray-600">Priority:</span>
                          <Badge className={getPriorityColor(milestone.priority)}>
                            {milestone.priority}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-gray-600">Due:</span>
                          <p>{new Date(milestone.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Assigned:</span>
                          <p>{milestone.assignedTo}</p>
                        </div>
                      </div>

                      {milestone.clientActions.filter(a => a.status === 'pending').length > 0 && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">
                              {milestone.clientActions.filter(a => a.status === 'pending').length} action(s) required
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {milestone.clientActions.filter(a => a.status === 'pending').length > 0 && (
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Take Action
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">Milestone</TableHead>
                      <TableHead className="font-semibold">Phase</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Progress</TableHead>
                      <TableHead className="font-semibold">Due Date</TableHead>
                      <TableHead className="font-semibold">Assigned To</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMilestones.map((milestone) => (
                      <TableRow key={milestone.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{milestone.name}</div>
                            <div className="text-sm text-gray-500">{milestone.description}</div>
                            <div className="flex space-x-1">
                              {milestone.isCritical && (
                                <Badge className="bg-red-100 text-red-800 text-xs">
                                  Critical
                                </Badge>
                              )}
                              <Badge className={getPriorityColor(milestone.priority)}>
                                {milestone.priority}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPhaseColor(milestone.phase)}>
                            {milestone.phase}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            {new Date(milestone.dueDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{milestone.assignedTo}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {milestone.clientActions.filter(a => a.status === 'pending').length > 0 && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Milestone Timeline</h3>
                <div className="space-y-4">
                  {filteredMilestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
                          milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : milestone.status === 'in-progress' ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <Target className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{milestone.name}</h4>
                          <div className="flex space-x-2">
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status}
                            </Badge>
                            <Badge className={getPhaseColor(milestone.phase)}>
                              {milestone.phase}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                          <span>Assigned to: {milestone.assignedTo}</span>
                          <span>Progress: {milestone.progress}%</span>
                        </div>
                        <div className="mt-2">
                          <Progress value={milestone.progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
