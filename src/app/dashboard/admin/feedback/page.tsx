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
import { Textarea } from "@/components/ui/Textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";

import { 
  MessageSquare, 
  Star, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Reply, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  BarChart3,
  Send,
  Archive,
  Flag,
  Shield,
  Users,
  Settings,
  MoreHorizontal
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Feedback {
  id: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  projectId: string;
  managerName: string;
  managerEmail: string;
  rating: number;
  category: 'general' | 'quality' | 'communication' | 'timeline' | 'budget' | 'team' | 'process';
  status: 'new' | 'in-progress' | 'resolved' | 'archived' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  submittedAt: string;
  lastUpdated: string;
  response?: string;
  responseBy?: string;
  responseAt?: string;
  tags: string[];
  escalationReason?: string;
  escalationDate?: string;
}

export default function AdminFeedbackPage() {
  const [user, setUser] = useState<User | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock feedback data
    setFeedback([
      {
        id: "1",
        clientName: "Sarah Johnson",
        clientEmail: "sarah.johnson@email.com",
        projectName: "Modern Home Renovation",
        projectId: "proj-1",
        managerName: "Mike Chen",
        managerEmail: "mike.chen@trio.com",
        rating: 5,
        category: "quality",
        status: "resolved",
        priority: "high",
        title: "Excellent work on the kitchen renovation",
        description: "The team did an outstanding job on our kitchen renovation. The quality of work exceeded our expectations and the timeline was perfect. Highly recommend!",
        submittedAt: "2024-10-15T10:30:00Z",
        lastUpdated: "2024-10-15T14:30:00Z",
        response: "Thank you for your kind words! We're thrilled the project exceeded your expectations.",
        responseBy: "Mike Chen",
        responseAt: "2024-10-15T14:30:00Z",
        tags: ["kitchen", "renovation", "positive"]
      },
      {
        id: "2",
        clientName: "David Rodriguez",
        clientEmail: "david.rodriguez@company.com",
        projectName: "Office Space Fit-out",
        projectId: "proj-2",
        managerName: "Lisa Wang",
        managerEmail: "lisa.wang@trio.com",
        rating: 3,
        category: "communication",
        status: "escalated",
        priority: "urgent",
        title: "Communication issues with project team",
        description: "The project is going well overall, but I would appreciate more frequent updates on progress. Sometimes I don't hear from the team for days. This is affecting our planning.",
        submittedAt: "2024-10-14T14:20:00Z",
        lastUpdated: "2024-10-15T09:15:00Z",
        escalationReason: "Client expressed significant dissatisfaction with communication",
        escalationDate: "2024-10-15T09:15:00Z",
        tags: ["communication", "escalation", "urgent"]
      },
      {
        id: "3",
        clientName: "Emma Thompson",
        clientEmail: "emma.thompson@business.com",
        projectName: "Retail Store Construction",
        projectId: "proj-3",
        managerName: "Sarah Johnson",
        managerEmail: "sarah.johnson@trio.com",
        rating: 4,
        category: "timeline",
        status: "resolved",
        priority: "medium",
        title: "Project completed on time",
        description: "Great work on meeting the deadline. The store looks fantastic and we're ready to open on schedule.",
        submittedAt: "2024-10-12T16:45:00Z",
        lastUpdated: "2024-10-13T11:30:00Z",
        response: "Thank you for your feedback! We're proud to have delivered on time.",
        responseBy: "Sarah Johnson",
        responseAt: "2024-10-13T11:30:00Z",
        tags: ["timeline", "completion", "positive"]
      },
      {
        id: "4",
        clientName: "Michael Chen",
        clientEmail: "michael.chen@email.com",
        projectName: "Bathroom Renovation",
        projectId: "proj-4",
        managerName: "Mike Chen",
        managerEmail: "mike.chen@trio.com",
        rating: 2,
        category: "budget",
        status: "in-progress",
        priority: "high",
        title: "Budget concerns with additional costs",
        description: "We're concerned about the additional costs that weren't in the original estimate. Can we discuss this further? The project is getting expensive.",
        submittedAt: "2024-10-16T08:15:00Z",
        lastUpdated: "2024-10-16T10:30:00Z",
        tags: ["budget", "concern", "costs"]
      },
      {
        id: "5",
        clientName: "Lisa Wang",
        clientEmail: "lisa.wang@home.com",
        projectName: "Living Room Renovation",
        projectId: "proj-5",
        managerName: "David Rodriguez",
        managerEmail: "david.rodriguez@trio.com",
        rating: 5,
        category: "team",
        status: "resolved",
        priority: "low",
        title: "Amazing team work!",
        description: "The team was professional, clean, and delivered exactly what we envisioned. Special thanks to the project manager for excellent coordination.",
        submittedAt: "2024-10-10T13:20:00Z",
        lastUpdated: "2024-10-11T10:45:00Z",
        response: "We're so happy you love the result! Thank you for choosing us.",
        responseBy: "David Rodriguez",
        responseAt: "2024-10-11T10:45:00Z",
        tags: ["team", "positive", "coordination"]
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'escalated': return 'bg-red-100 text-red-800 border-red-200';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'quality': return Star;
      case 'communication': return MessageSquare;
      case 'timeline': return Clock;
      case 'budget': return TrendingUp;
      case 'team': return Users;
      case 'process': return Settings;
      default: return MessageSquare;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.managerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const handleRespond = (feedbackId: string) => {
    const updatedFeedback = feedback.map(item => 
      item.id === feedbackId 
        ? { 
            ...item, 
            response: responseText,
            responseBy: user?.name || "Admin",
            responseAt: new Date().toISOString(),
            status: "resolved" as const,
            lastUpdated: new Date().toISOString()
          }
        : item
    );
    setFeedback(updatedFeedback);
    setResponseText("");
    setSelectedFeedback(null);
  };

  const handleEscalate = (feedbackId: string) => {
    const updatedFeedback = feedback.map(item => 
      item.id === feedbackId 
        ? { 
            ...item, 
            status: "escalated" as any,
            escalationReason: "Escalated by admin for immediate attention",
            escalationDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          }
        : item
    );
    setFeedback(updatedFeedback);
  };

  const stats = {
    total: feedback.length,
    new: feedback.filter(f => f.status === 'new').length,
    inProgress: feedback.filter(f => f.status === 'in-progress').length,
    resolved: feedback.filter(f => f.status === 'resolved').length,
    escalated: feedback.filter(f => f.status === 'escalated').length,
    averageRating: feedback.length > 0 ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0
  };

  return (
    <SidebarProvider>
      <AppSidebar role="admin" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="System Feedback Management"
          description="Monitor and manage feedback across all projects and teams"
          breadcrumbs={[
            { label: "Admin Dashboard", href: "/dashboard/admin" },
            { label: "System Management", href: "#" },
            { label: "Feedback", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Feedback Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage feedback across all projects and teams</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                System Notice
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Escalated</p>
                    <p className="text-2xl font-bold text-red-600">{stats.escalated}</p>
                  </div>
                  <Flag className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.averageRating.toFixed(1)}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
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
                    placeholder="Search feedback..."
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
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="quality">Quality</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="timeline">Timeline</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="process">Process</SelectItem>
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
            </div>
          </div>

          {/* Feedback List */}
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
                      <TableHead className="font-semibold">Client & Project</TableHead>
                      <TableHead className="font-semibold">Manager</TableHead>
                      <TableHead className="font-semibold">Rating</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Priority</TableHead>
                      <TableHead className="font-semibold">Submitted</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback.map((item) => {
                      const CategoryIcon = getCategoryIcon(item.category);
                      return (
                        <TableRow key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-900">{item.clientName}</div>
                              <div className="text-sm text-gray-500">{item.projectName}</div>
                              <div className="text-xs text-gray-400">{item.title}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{item.managerName}</div>
                              <div className="text-xs text-gray-500">{item.managerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {getRatingStars(item.rating)}
                              <span className="text-sm ml-1">{item.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <CategoryIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-sm capitalize">{item.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600">
                              {new Date(item.submittedAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedFeedback(item)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Feedback Details</DialogTitle>
                                    <DialogDescription>
                                      Feedback from {item.clientName} regarding {item.projectName}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Client</label>
                                        <p className="text-sm">{item.clientName} ({item.clientEmail})</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Project</label>
                                        <p className="text-sm">{item.projectName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Manager</label>
                                        <p className="text-sm">{item.managerName} ({item.managerEmail})</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Rating</label>
                                        <div className="flex items-center space-x-1">
                                          {getRatingStars(item.rating)}
                                          <span className="text-sm ml-1">{item.rating}/5</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Title</label>
                                      <p className="text-sm font-medium">{item.title}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Description</label>
                                      <p className="text-sm text-gray-700">{item.description}</p>
                                    </div>
                                    {item.escalationReason && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Escalation Reason</label>
                                        <p className="text-sm text-red-700 bg-red-50 p-3 rounded">
                                          {item.escalationReason}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                          Escalated on {new Date(item.escalationDate!).toLocaleString()}
                                        </p>
                                      </div>
                                    )}
                                    {item.response && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Response</label>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                          {item.response}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                          By {item.responseBy} on {new Date(item.responseAt!).toLocaleString()}
                                        </p>
                                      </div>
                                    )}
                                    {!item.response && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Response</label>
                                        <Textarea
                                          placeholder="Write your response here..."
                                          value={responseText}
                                          onChange={(e) => setResponseText(e.target.value)}
                                          className="mt-1"
                                        />
                                        <div className="flex justify-end space-x-2 mt-2">
                                          <Button
                                            variant="outline"
                                            onClick={() => setSelectedFeedback(null)}
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            onClick={() => handleRespond(item.id)}
                                            disabled={!responseText.trim()}
                                          >
                                            <Send className="h-4 w-4 mr-2" />
                                            Send Response
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                    {item.status !== 'escalated' && (
                                      <div className="flex justify-end space-x-2">
                                        <Button
                                          variant="outline"
                                          onClick={() => handleEscalate(item.id)}
                                        >
                                          <Flag className="h-4 w-4 mr-2" />
                                          Escalate
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
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
                {filteredFeedback.map((item) => {
                  const CategoryIcon = getCategoryIcon(item.category);
                  return (
                    <Card key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription>
                              {item.clientName} • {item.projectName}
                            </CardDescription>
                            <div className="text-xs text-gray-500">
                              Manager: {item.managerName}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <CategoryIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 capitalize">{item.category}</span>
                          <div className="flex items-center space-x-1 ml-auto">
                            {getRatingStars(item.rating)}
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 line-clamp-3">{item.description}</p>
                        
                        {item.escalationReason && (
                          <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                            <strong>Escalated:</strong> {item.escalationReason}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                          <span>{item.clientEmail}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {!item.response && (
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Reply className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                          )}
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
                    <CardTitle>Rating Distribution</CardTitle>
                    <CardDescription>Distribution of client ratings across all projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = feedback.filter(f => f.rating === rating).length;
                        const percentage = feedback.length > 0 ? (count / feedback.length) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium w-8">{rating}</span>
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
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

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                    <CardDescription>Feedback by category across all projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['general', 'quality', 'communication', 'timeline', 'budget', 'team', 'process'].map((category) => {
                        const count = feedback.filter(f => f.category === category).length;
                        const percentage = feedback.length > 0 ? (count / feedback.length) * 100 : 0;
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{category}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
