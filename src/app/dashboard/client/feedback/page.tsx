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
  FileText,
  Camera,
  Smile,
  Frown,
  Meh,
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
  title: string;
  description: string;
  category: 'general' | 'quality' | 'communication' | 'timeline' | 'budget' | 'team' | 'satisfaction';
  rating: number;
  status: 'draft' | 'submitted' | 'acknowledged' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectName: string;
  projectId: string;
  submittedAt?: string;
  lastUpdated: string;
  response?: string;
  responseBy?: string;
  responseAt?: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  tags: string[];
  isAnonymous: boolean;
}

export default function ClientFeedbackPage() {
  const [user, setUser] = useState<User | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    description: '',
    category: 'general' as const,
    rating: 5,
    priority: 'medium' as const,
    isAnonymous: false
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock feedback data
    setFeedback([
      {
        id: "1",
        title: "Kitchen renovation exceeded expectations",
        description: "The team did an outstanding job on our kitchen renovation. The quality of work exceeded our expectations and the timeline was perfect. The project manager was very responsive and kept us updated throughout the process.",
        category: "quality",
        rating: 5,
        status: "resolved",
        priority: "medium",
        projectName: "Modern Home Renovation",
        projectId: "proj-1",
        submittedAt: "2024-10-15T10:30:00Z",
        lastUpdated: "2024-10-15T14:30:00Z",
        response: "Thank you for your kind words! We're thrilled the project exceeded your expectations. We'll be sure to pass your feedback along to the team.",
        responseBy: "Mike Chen",
        responseAt: "2024-10-15T14:30:00Z",
        tags: ["kitchen", "renovation", "positive"],
        isAnonymous: false
      },
      {
        id: "2",
        title: "Communication could be improved",
        description: "The project is going well overall, but I would appreciate more frequent updates on progress. Sometimes I don't hear from the team for days, which makes it difficult to plan around the construction schedule.",
        category: "communication",
        rating: 3,
        status: "acknowledged",
        priority: "high",
        projectName: "Office Space Fit-out",
        projectId: "proj-2",
        submittedAt: "2024-10-14T14:20:00Z",
        lastUpdated: "2024-10-15T09:15:00Z",
        response: "Thank you for the feedback. We understand your concern and will implement daily progress updates going forward. We'll also ensure you receive photos of the work completed each day.",
        responseBy: "Lisa Wang",
        responseAt: "2024-10-15T09:15:00Z",
        tags: ["communication", "improvement"],
        isAnonymous: false
      },
      {
        id: "3",
        title: "Project completed on time",
        description: "Great work on meeting the deadline. The store looks fantastic and we're ready to open on schedule. The team was professional and cleaned up thoroughly after each work day.",
        category: "timeline",
        rating: 4,
        status: "resolved",
        priority: "low",
        projectName: "Retail Store Construction",
        projectId: "proj-3",
        submittedAt: "2024-10-12T16:45:00Z",
        lastUpdated: "2024-10-13T11:30:00Z",
        response: "Thank you for your feedback! We're proud to have delivered on time and are excited to see your store open for business.",
        responseBy: "Sarah Johnson",
        responseAt: "2024-10-13T11:30:00Z",
        tags: ["timeline", "completion", "positive"],
        isAnonymous: false
      },
      {
        id: "4",
        title: "Budget concerns with additional costs",
        description: "We're concerned about the additional costs that weren't in the original estimate. Can we discuss this further? The project is getting expensive and we want to make sure we understand all the charges.",
        category: "budget",
        rating: 2,
        status: "submitted",
        priority: "urgent",
        projectName: "Bathroom Renovation",
        projectId: "proj-4",
        submittedAt: "2024-10-16T08:15:00Z",
        lastUpdated: "2024-10-16T08:15:00Z",
        tags: ["budget", "concern", "costs"],
        isAnonymous: false
      },
      {
        id: "5",
        title: "Amazing team work!",
        description: "The team was professional, clean, and delivered exactly what we envisioned. Special thanks to the project manager for excellent coordination and the construction team for their attention to detail.",
        category: "team",
        rating: 5,
        status: "resolved",
        priority: "low",
        projectName: "Living Room Renovation",
        projectId: "proj-5",
        submittedAt: "2024-10-10T13:20:00Z",
        lastUpdated: "2024-10-11T10:45:00Z",
        response: "We're so happy you love the result! Thank you for choosing us and for recognizing the team's hard work.",
        responseBy: "David Rodriguez",
        responseAt: "2024-10-11T10:45:00Z",
        tags: ["team", "positive", "coordination"],
        isAnonymous: false
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
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
      case 'team': return User;
      case 'satisfaction': return Smile;
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

  const getRatingIcon = (rating: number) => {
    if (rating >= 4) return <Smile className="h-4 w-4 text-green-600" />;
    if (rating >= 3) return <Meh className="h-4 w-4 text-yellow-600" />;
    return <Frown className="h-4 w-4 text-red-600" />;
  };

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSubmitFeedback = () => {
    const newFeedbackData: Feedback = {
      id: Date.now().toString(),
      title: newFeedback.title,
      description: newFeedback.description,
      category: newFeedback.category,
      rating: newFeedback.rating,
      status: "submitted",
      priority: newFeedback.priority,
      projectName: "Current Project", // This would be the actual project name
      projectId: "proj-current",
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      tags: [],
      isAnonymous: newFeedback.isAnonymous
    };
    setFeedback([newFeedbackData, ...feedback]);
    setNewFeedback({
      title: '',
      description: '',
      category: 'general',
      rating: 5,
      priority: 'medium',
      isAnonymous: false
    });
  };

  const stats = {
    total: feedback.length,
    submitted: feedback.filter(f => f.status === 'submitted').length,
    acknowledged: feedback.filter(f => f.status === 'acknowledged').length,
    resolved: feedback.filter(f => f.status === 'resolved').length,
    averageRating: feedback.length > 0 ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Feedback"
          description="Share your feedback and communicate with the project team"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Communication", href: "#" },
            { label: "Feedback", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Feedback</h1>
              <p className="text-gray-600 mt-1">Share your feedback and communicate with the project team</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit New Feedback</DialogTitle>
                  <DialogDescription>
                    Share your thoughts about the project progress and team performance
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Title *</label>
                    <Input
                      placeholder="Brief description of your feedback"
                      value={newFeedback.title}
                      onChange={(e) => setNewFeedback({...newFeedback, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Category *</label>
                    <Select value={newFeedback.category} onValueChange={(value: any) => setNewFeedback({...newFeedback, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="timeline">Timeline</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="satisfaction">Satisfaction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Rating *</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {getRatingStars(newFeedback.rating)}
                      </div>
                      <span className="text-sm text-gray-600">{newFeedback.rating}/5</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setNewFeedback({...newFeedback, rating})}
                          className={`p-2 rounded ${
                            rating <= newFeedback.rating ? 'bg-yellow-100' : 'bg-gray-100'
                          }`}
                        >
                          <Star className={`h-4 w-4 ${
                            rating <= newFeedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Description *</label>
                    <Textarea
                      placeholder="Please provide detailed feedback about your experience..."
                      value={newFeedback.description}
                      onChange={(e) => setNewFeedback({...newFeedback, description: e.target.value})}
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={newFeedback.isAnonymous}
                      onChange={(e) => setNewFeedback({...newFeedback, isAnonymous: e.target.checked})}
                      className="rounded"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      Submit anonymously
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      onClick={handleSubmitFeedback}
                      disabled={!newFeedback.title || !newFeedback.description}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                    <p className="text-sm font-medium text-gray-600">Submitted</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Acknowledged</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.acknowledged}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-green-600">{stats.averageRating.toFixed(1)}</p>
                  </div>
                  <Star className="h-8 w-8 text-green-600" />
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
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
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
                  <SelectItem value="satisfaction">Satisfaction</SelectItem>
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
                      <TableHead className="font-semibold">Feedback</TableHead>
                      <TableHead className="font-semibold">Project</TableHead>
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
                              <div className="font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {item.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{item.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{item.projectName}</span>
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
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600">
                              {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'Draft'}
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
                                      Your feedback regarding {item.projectName}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Project</label>
                                        <p className="text-sm">{item.projectName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Category</label>
                                        <p className="text-sm capitalize">{item.category}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Rating</label>
                                        <div className="flex items-center space-x-1">
                                          {getRatingStars(item.rating)}
                                          <span className="text-sm ml-1">{item.rating}/5</span>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Status</label>
                                        <Badge className={getStatusColor(item.status)}>
                                          {item.status}
                                        </Badge>
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
                                    {item.response && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Team Response</label>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                          {item.response}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                          By {item.responseBy} on {new Date(item.responseAt!).toLocaleString()}
                                        </p>
                                      </div>
                                    )}
                                    {!item.response && item.status !== 'draft' && (
                                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                                        <p className="text-sm text-yellow-800">
                                          Your feedback has been received and is being reviewed by the project team.
                                        </p>
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
                            <CardDescription>{item.projectName}</CardDescription>
                          </div>
                          <div className="flex space-x-1">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
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
                        
                        {item.response && (
                          <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                            <strong>Team Response:</strong> {item.response.substring(0, 100)}...
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'Draft'}</span>
                          <span>{item.isAnonymous ? 'Anonymous' : 'From you'}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {item.status === 'draft' && (
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Send className="h-4 w-4 mr-1" />
                              Submit
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
                    <CardDescription>Your feedback ratings over time</CardDescription>
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
                    <CardDescription>Your feedback by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['general', 'quality', 'communication', 'timeline', 'budget', 'team', 'satisfaction'].map((category) => {
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
