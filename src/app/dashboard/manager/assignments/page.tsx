"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Textarea } from "@/components/ui/Textarea";
import { Calendar } from "@/components/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

import { 
  UserPlus, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Calendar as CalendarIcon,
  MapPin,
  FileText,
  MoreHorizontal,
  Save,
  Users,
  Target,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  projectName: string;
  projectId: string;
  assignee: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  assigner: {
    id: string;
    name: string;
    email: string;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'overdue';
  type: 'task' | 'milestone' | 'review' | 'meeting' | 'delivery';
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  progress: number;
  tags: string[];
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ManagerAssignmentsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    projectId: '',
    assigneeId: '',
    priority: 'medium' as const,
    type: 'task' as const,
    dueDate: new Date(),
    estimatedHours: 0,
    tags: [] as string[]
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock assignments data
    setAssignments([
      {
        id: "1",
        title: "Complete Kitchen Demolition",
        description: "Remove all existing kitchen fixtures, cabinets, and appliances. Ensure proper disposal of materials.",
        projectName: "Modern Home Renovation",
        projectId: "proj-1",
        assignee: {
          id: "user-1",
          name: "David Rodriguez",
          email: "david.rodriguez@trio.com",
          avatar: "/avatars/david.jpg",
          role: "Construction Worker"
        },
        assigner: {
          id: "user-manager",
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com"
        },
        priority: "high",
        status: "in-progress",
        type: "task",
        dueDate: "2024-10-20",
        estimatedHours: 16,
        actualHours: 8,
        progress: 50,
        tags: ["demolition", "kitchen", "safety"],
        createdAt: "2024-10-15T09:00:00Z",
        updatedAt: "2024-10-16T14:30:00Z"
      },
      {
        id: "2",
        title: "Electrical Rough-in Review",
        description: "Review electrical rough-in work and ensure compliance with local codes and safety standards.",
        projectName: "Office Space Fit-out",
        projectId: "proj-2",
        assignee: {
          id: "user-2",
          name: "Mike Chen",
          email: "mike.chen@trio.com",
          avatar: "/avatars/mike.jpg",
          role: "Site Supervisor"
        },
        assigner: {
          id: "user-manager",
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com"
        },
        priority: "urgent",
        status: "overdue",
        type: "review",
        dueDate: "2024-10-18",
        estimatedHours: 4,
        progress: 0,
        tags: ["electrical", "review", "safety"],
        createdAt: "2024-10-10T10:00:00Z",
        updatedAt: "2024-10-15T16:45:00Z"
      },
      {
        id: "3",
        title: "Client Meeting - Design Approval",
        description: "Meet with client to review and approve final design plans for the retail store project.",
        projectName: "Retail Store Construction",
        projectId: "proj-3",
        assignee: {
          id: "user-3",
          name: "Emma Thompson",
          email: "emma.thompson@trio.com",
          avatar: "/avatars/emma.jpg",
          role: "Designer"
        },
        assigner: {
          id: "user-manager",
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com"
        },
        priority: "medium",
        status: "completed",
        type: "meeting",
        dueDate: "2024-10-14",
        estimatedHours: 2,
        actualHours: 2,
        progress: 100,
        tags: ["client", "design", "approval"],
        notes: "Client approved all design elements. Ready to proceed with construction.",
        createdAt: "2024-10-12T14:00:00Z",
        updatedAt: "2024-10-14T17:00:00Z"
      },
      {
        id: "4",
        title: "Material Delivery Coordination",
        description: "Coordinate delivery of construction materials and ensure proper storage on site.",
        projectName: "Bathroom Renovation",
        projectId: "proj-4",
        assignee: {
          id: "user-4",
          name: "Lisa Wang",
          email: "lisa.wang@trio.com",
          avatar: "/avatars/lisa.jpg",
          role: "Project Coordinator"
        },
        assigner: {
          id: "user-manager",
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com"
        },
        priority: "medium",
        status: "pending",
        type: "task",
        dueDate: "2024-10-22",
        estimatedHours: 6,
        progress: 0,
        tags: ["materials", "coordination", "logistics"],
        createdAt: "2024-10-16T11:00:00Z",
        updatedAt: "2024-10-16T11:00:00Z"
      },
      {
        id: "5",
        title: "Safety Inspection",
        description: "Conduct weekly safety inspection of all active construction sites.",
        projectName: "All Projects",
        projectId: "proj-all",
        assignee: {
          id: "user-2",
          name: "Mike Chen",
          email: "mike.chen@trio.com",
          avatar: "/avatars/mike.jpg",
          role: "Site Supervisor"
        },
        assigner: {
          id: "user-manager",
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com"
        },
        priority: "high",
        status: "in-progress",
        type: "task",
        dueDate: "2024-10-19",
        estimatedHours: 8,
        actualHours: 4,
        progress: 50,
        tags: ["safety", "inspection", "compliance"],
        createdAt: "2024-10-15T08:00:00Z",
        updatedAt: "2024-10-16T12:00:00Z"
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'overdue': return 'bg-orange-100 text-orange-800 border-orange-200';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return FileText;
      case 'milestone': return Target;
      case 'review': return CheckCircle;
      case 'meeting': return Users;
      case 'delivery': return TrendingUp;
      default: return FileText;
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.assignee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || assignment.priority === priorityFilter;
    const matchesType = typeFilter === "all" || assignment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });

  const handleStatusChange = (assignmentId: string, newStatus: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { 
            ...assignment, 
            status: newStatus as any,
            updatedAt: new Date().toISOString()
          }
        : assignment
    ));
  };

  const handleCreateAssignment = () => {
    const newAssignmentData: Assignment = {
      id: Date.now().toString(),
      title: newAssignment.title,
      description: newAssignment.description,
      projectName: "New Project", // This would be resolved from projectId
      projectId: newAssignment.projectId,
      assignee: {
        id: newAssignment.assigneeId,
        name: "New Assignee", // This would be resolved from assigneeId
        email: "assignee@trio.com",
        role: "Team Member"
      },
      assigner: {
        id: user?.email || "manager@trio.com",
        name: user?.name || "Manager",
        email: user?.email || "manager@trio.com"
      },
      priority: newAssignment.priority,
      status: "pending",
      type: newAssignment.type,
      dueDate: newAssignment.dueDate.toISOString().split('T')[0],
      estimatedHours: newAssignment.estimatedHours,
      progress: 0,
      tags: newAssignment.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setAssignments([newAssignmentData, ...assignments]);
    setNewAssignment({
      title: '',
      description: '',
      projectId: '',
      assigneeId: '',
      priority: 'medium',
      type: 'task',
      dueDate: new Date(),
      estimatedHours: 0,
      tags: []
    });
  };

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    inProgress: assignments.filter(a => a.status === 'in-progress').length,
    completed: assignments.filter(a => a.status === 'completed').length,
    overdue: assignments.filter(a => a.status === 'overdue').length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Task Assignments"
          description="Manage and track task assignments across projects"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "Project Management", href: "#" },
            { label: "Assignments", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Assignments</h1>
              <p className="text-gray-600 mt-1">Manage and track task assignments across projects</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Assign a new task to a team member
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Title *</label>
                      <Input
                        placeholder="Enter assignment title"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type *</label>
                      <Select value={newAssignment.type} onValueChange={(value: any) => setNewAssignment({...newAssignment, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="task">Task</SelectItem>
                          <SelectItem value="milestone">Milestone</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="delivery">Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Description *</label>
                    <Textarea
                      placeholder="Enter assignment description"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assignee *</label>
                      <Select value={newAssignment.assigneeId} onValueChange={(value) => setNewAssignment({...newAssignment, assigneeId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user-1">David Rodriguez</SelectItem>
                          <SelectItem value="user-2">Mike Chen</SelectItem>
                          <SelectItem value="user-3">Emma Thompson</SelectItem>
                          <SelectItem value="user-4">Lisa Wang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Priority *</label>
                      <Select value={newAssignment.priority} onValueChange={(value: any) => setNewAssignment({...newAssignment, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Due Date *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(newAssignment.dueDate, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newAssignment.dueDate}
                            onSelect={(date) => setNewAssignment({...newAssignment, dueDate: date || new Date()})}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Estimated Hours *</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={newAssignment.estimatedHours}
                        onChange={(e) => setNewAssignment({...newAssignment, estimatedHours: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      onClick={handleCreateAssignment} 
                      disabled={!newAssignment.title || !newAssignment.description || !newAssignment.assigneeId}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-600" />
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
                  <BarChart3 className="h-8 w-8 text-blue-600" />
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
                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
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
                    placeholder="Search assignments..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="milestone">Milestone</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assignments List */}
          <Tabs defaultValue="list" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">Assignment</TableHead>
                      <TableHead className="font-semibold">Assignee</TableHead>
                      <TableHead className="font-semibold">Project</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Priority</TableHead>
                      <TableHead className="font-semibold">Progress</TableHead>
                      <TableHead className="font-semibold">Due Date</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.map((assignment) => {
                      const TypeIcon = getTypeIcon(assignment.type);
                      return (
                        <TableRow key={assignment.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <TypeIcon className="h-4 w-4 text-gray-400" />
                                <span className="font-medium text-gray-900">{assignment.title}</span>
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">{assignment.description}</div>
                              <div className="flex flex-wrap gap-1">
                                {assignment.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {assignment.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{assignment.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={assignment.assignee.avatar} />
                                <AvatarFallback>{assignment.assignee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium">{assignment.assignee.name}</div>
                                <div className="text-xs text-gray-500">{assignment.assignee.role}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{assignment.projectName}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(assignment.priority)}>
                              {assignment.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{assignment.progress}%</span>
                                <span>{assignment.actualHours || 0}/{assignment.estimatedHours}h</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${assignment.progress}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600">
                              {new Date(assignment.dueDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Select
                                value={assignment.status}
                                onValueChange={(value) => handleStatusChange(assignment.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                  <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAssignments.map((assignment) => {
                  const TypeIcon = getTypeIcon(assignment.type);
                  return (
                    <Card key={assignment.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <TypeIcon className="h-5 w-5 text-gray-400" />
                            <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          </div>
                          <div className="flex space-x-1">
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(assignment.priority)}>
                              {assignment.priority}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">{assignment.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={assignment.assignee.avatar} />
                            <AvatarFallback>{assignment.assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{assignment.assignee.name}</div>
                            <div className="text-xs text-gray-500">{assignment.assignee.role}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{assignment.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${assignment.progress}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{assignment.actualHours || 0}/{assignment.estimatedHours}h</span>
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {assignment.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {assignment.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{assignment.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Status Distribution</CardTitle>
                    <CardDescription>Assignment status breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['pending', 'in-progress', 'completed', 'cancelled', 'overdue'].map((status) => {
                        const count = assignments.filter(a => a.status === status).length;
                        const percentage = assignments.length > 0 ? (count / assignments.length) * 100 : 0;
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-8">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Type Distribution</CardTitle>
                    <CardDescription>Assignment types breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['task', 'milestone', 'review', 'meeting', 'delivery'].map((type) => {
                        const count = assignments.filter(a => a.type === type).length;
                        const percentage = assignments.length > 0 ? (count / assignments.length) * 100 : 0;
                        const TypeIcon = getTypeIcon(type);
                        return (
                          <div key={type} className="flex items-center space-x-3">
                            <TypeIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium capitalize w-20">{type}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-12">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
