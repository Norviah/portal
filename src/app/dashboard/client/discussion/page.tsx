"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import { 
  MessageSquare, 
  Send, 
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
  Phone,
  Mail,
  Video,
  FileText,
  Paperclip,
  MoreHorizontal,
  Archive,
  Star,
  Users,
  Bell,
  Settings,
  Shield,
  Globe,
  Zap,
  Camera,
  Download,
  Share,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Pin,
  Edit,
  Trash2,
  Heart,
  Smile,
  Frown,
  Meh,
  DollarSign,
  HelpCircle
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  category: 'general' | 'design' | 'construction' | 'materials' | 'schedule' | 'budget' | 'issues' | 'questions';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'resolved' | 'closed' | 'archived';
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
  views: number;
  likes: number;
  replies: number;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
    url: string;
  }>;
  photos?: Array<{
    id: string;
    url: string;
    caption: string;
  }>;
  isClientPost: boolean;
  requiresResponse: boolean;
}

interface DiscussionReply {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  isClientReply: boolean;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
    url: string;
  }>;
  photos?: Array<{
    id: string;
    url: string;
    caption: string;
  }>;
}

export default function ClientDiscussionPage() {
  const [user, setUser] = useState<User | null>(null);
  const [discussions, setDiscussions] = useState<DiscussionPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedDiscussion, setSelectedDiscussion] = useState<DiscussionPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general' as const,
    priority: 'medium' as const
  });
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock discussions data
    setDiscussions([
      {
        id: "1",
        title: "Kitchen Layout - Need Your Input",
        content: "We've prepared three different kitchen layout options for your review. Each option has its own advantages in terms of workflow and storage. Please take a look at the attached designs and let us know which one you prefer, or if you'd like to see any modifications.",
        author: {
          name: "Emma Thompson",
          email: "emma.thompson@trio.com",
          role: "Designer"
        },
        category: "design",
        priority: "high",
        status: "open",
        createdAt: "2024-10-15T10:30:00Z",
        updatedAt: "2024-10-15T10:30:00Z",
        lastActivity: "2024-10-15T10:30:00Z",
        tags: ["kitchen", "layout", "design"],
        isPinned: true,
        isLocked: false,
        views: 12,
        likes: 3,
        replies: 2,
        attachments: [
          { name: "Kitchen Layout Options.pdf", type: "document", size: "5.2 MB", url: "/files/kitchen-layouts.pdf" }
        ],
        photos: [
          { id: "layout-1", url: "/photos/layout-1.jpg", caption: "Option 1: L-shaped layout" },
          { id: "layout-2", url: "/photos/layout-2.jpg", caption: "Option 2: U-shaped layout" },
          { id: "layout-3", url: "/photos/layout-3.jpg", caption: "Option 3: Galley layout" }
        ],
        isClientPost: false,
        requiresResponse: true
      },
      {
        id: "2",
        title: "Material Delivery Delay - Update",
        content: "Unfortunately, we're experiencing a delay with the drywall delivery due to supplier issues. The new delivery date is scheduled for next Tuesday. This will push our drywall installation by about 3 days, but we'll work to catch up and minimize the overall project delay.",
        author: {
          name: "Mike Chen",
          email: "mike.chen@trio.com",
          role: "Site Supervisor"
        },
        category: "construction",
        priority: "medium",
        status: "open",
        createdAt: "2024-10-14T14:20:00Z",
        updatedAt: "2024-10-14T14:20:00Z",
        lastActivity: "2024-10-14T14:20:00Z",
        tags: ["delay", "materials", "drywall"],
        isPinned: false,
        isLocked: false,
        views: 8,
        likes: 1,
        replies: 1,
        isClientPost: false,
        requiresResponse: false
      },
      {
        id: "3",
        title: "Paint Color Selection - Need Help",
        content: "I'm having trouble deciding between the three paint color options you provided. They all look great! Could you help me understand the differences in terms of how they'll look with the natural light in our kitchen? Also, would it be possible to see larger samples?",
        author: {
          name: "Client User",
          email: "client@email.com",
          role: "Client"
        },
        category: "materials",
        priority: "medium",
        status: "open",
        createdAt: "2024-10-13T16:45:00Z",
        updatedAt: "2024-10-13T16:45:00Z",
        lastActivity: "2024-10-13T16:45:00Z",
        tags: ["paint", "colors", "selection"],
        isPinned: false,
        isLocked: false,
        views: 15,
        likes: 2,
        replies: 3,
        isClientPost: true,
        requiresResponse: true
      },
      {
        id: "4",
        title: "Weekly Progress Photos - Week 2",
        content: "Here are the progress photos from this week's work. We've completed the electrical rough-in and started the framing. The team is making good progress and everything is on schedule.",
        author: {
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com",
          role: "Project Manager"
        },
        category: "construction",
        priority: "low",
        status: "open",
        createdAt: "2024-10-12T11:30:00Z",
        updatedAt: "2024-10-12T11:30:00Z",
        lastActivity: "2024-10-12T11:30:00Z",
        tags: ["progress", "photos", "weekly"],
        isPinned: false,
        isLocked: false,
        views: 20,
        likes: 5,
        replies: 1,
        photos: [
          { id: "progress-1", url: "/photos/progress-1.jpg", caption: "Electrical panel installation" },
          { id: "progress-2", url: "/photos/progress-2.jpg", caption: "Framing work in progress" }
        ],
        isClientPost: false,
        requiresResponse: false
      },
      {
        id: "5",
        title: "Budget Question - Additional Costs",
        content: "I noticed some additional costs in the latest invoice that weren't in the original estimate. Could you please explain what these are for? I want to make sure I understand all the charges before approving the payment.",
        author: {
          name: "Client User",
          email: "client@email.com",
          role: "Client"
        },
        category: "budget",
        priority: "high",
        status: "open",
        createdAt: "2024-10-11T09:15:00Z",
        updatedAt: "2024-10-11T09:15:00Z",
        lastActivity: "2024-10-11T09:15:00Z",
        tags: ["budget", "invoice", "costs"],
        isPinned: false,
        isLocked: false,
        views: 10,
        likes: 0,
        replies: 2,
        isClientPost: true,
        requiresResponse: true
      },
      {
        id: "6",
        title: "Schedule Change - Framing Inspection",
        content: "The framing inspection has been moved to Thursday at 2 PM instead of Wednesday. This is due to the inspector's availability. Please let me know if this new time works for you, or if you need to reschedule.",
        author: {
          name: "Mike Chen",
          email: "mike.chen@trio.com",
          role: "Site Supervisor"
        },
        category: "schedule",
        priority: "medium",
        status: "open",
        createdAt: "2024-10-10T15:00:00Z",
        updatedAt: "2024-10-10T15:00:00Z",
        lastActivity: "2024-10-10T15:00:00Z",
        tags: ["schedule", "inspection", "framing"],
        isPinned: false,
        isLocked: false,
        views: 6,
        likes: 1,
        replies: 1,
        isClientPost: false,
        requiresResponse: true
      }
    ]);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return MessageSquare;
      case 'design': return Eye;
      case 'construction': return Settings;
      case 'materials': return FileText;
      case 'schedule': return Calendar;
      case 'budget': return DollarSign;
      case 'issues': return AlertTriangle;
      case 'questions': return HelpCircle;
      default: return MessageSquare;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-gray-100 text-gray-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'construction': return 'bg-orange-100 text-orange-800';
      case 'materials': return 'bg-blue-100 text-blue-800';
      case 'schedule': return 'bg-green-100 text-green-800';
      case 'budget': return 'bg-yellow-100 text-yellow-800';
      case 'issues': return 'bg-red-100 text-red-800';
      case 'questions': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || discussion.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || discussion.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || discussion.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const handleCreatePost = () => {
    const newPostData: DiscussionPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: user?.name || "Client",
        email: user?.email || "client@email.com",
        role: "Client"
      },
      category: newPost.category,
      priority: newPost.priority,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      tags: [],
      isPinned: false,
      isLocked: false,
      views: 0,
      likes: 0,
      replies: 0,
      isClientPost: true,
      requiresResponse: false
    };
    setDiscussions([newPostData, ...discussions]);
    setNewPost({ title: '', content: '', category: 'general', priority: 'medium' });
  };

  const handleReply = (discussionId: string) => {
    // In a real app, this would add a reply to the discussion
    const updatedDiscussions = discussions.map(discussion => 
      discussion.id === discussionId 
        ? { 
            ...discussion, 
            replies: discussion.replies + 1,
            lastActivity: new Date().toISOString()
          }
        : discussion
    );
    setDiscussions(updatedDiscussions);
    setReplyText("");
    setSelectedDiscussion(null);
  };

  const categories = [...new Set(discussions.map(d => d.category))];
  const statuses = [...new Set(discussions.map(d => d.status))];
  const priorities = [...new Set(discussions.map(d => d.priority))];

  const stats = {
    total: discussions.length,
    open: discussions.filter(d => d.status === 'open').length,
    resolved: discussions.filter(d => d.status === 'resolved').length,
    clientPosts: discussions.filter(d => d.isClientPost).length,
    requiresResponse: discussions.filter(d => d.requiresResponse).length,
    pinned: discussions.filter(d => d.isPinned).length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Discussion"
          description="Participate in project discussions and get answers to your questions"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Communication", href: "#" },
            { label: "Discussion", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Discussion</h1>
              <p className="text-gray-600 mt-1">Participate in project discussions and get answers to your questions</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Discussion Post</DialogTitle>
                    <DialogDescription>
                      Start a new discussion about your project
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Title *</label>
                      <Input
                        placeholder="Enter discussion title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Category</label>
                        <select
                          value={newPost.category}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value as any})}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="general">General</option>
                          <option value="design">Design</option>
                          <option value="construction">Construction</option>
                          <option value="materials">Materials</option>
                          <option value="schedule">Schedule</option>
                          <option value="budget">Budget</option>
                          <option value="issues">Issues</option>
                          <option value="questions">Questions</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Priority</label>
                        <select
                          value={newPost.priority}
                          onChange={(e) => setNewPost({...newPost, priority: e.target.value as any})}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Content *</label>
                      <Textarea
                        placeholder="Describe your question or topic..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button
                        onClick={handleCreatePost}
                        disabled={!newPost.title || !newPost.content}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Create Post
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
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
                    <p className="text-sm font-medium text-gray-600">Open</p>
                    <p className="text-2xl font-bold text-green-600">{stats.open}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.resolved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Your Posts</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.clientPosts}</p>
                  </div>
                  <User className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Needed</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.requiresResponse}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pinned</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pinned}</p>
                  </div>
                  <Pin className="h-8 w-8 text-yellow-600" />
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
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Discussions List */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pinned">Pinned</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
              <TabsTrigger value="response-needed">Response Needed</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => {
                  const CategoryIcon = getCategoryIcon(discussion.category);
                  return (
                    <Card key={discussion.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                {discussion.isPinned && (
                                  <Pin className="h-4 w-4 text-yellow-600" />
                                )}
                                <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getCategoryColor(discussion.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {discussion.category}
                                </Badge>
                                <Badge className={getStatusColor(discussion.status)}>
                                  {discussion.status}
                                </Badge>
                                <Badge className={getPriorityColor(discussion.priority)}>
                                  {discussion.priority}
                                </Badge>
                                {discussion.requiresResponse && (
                                  <Badge className="bg-orange-100 text-orange-800">
                                    Response Needed
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="ml-1">{discussion.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Reply className="h-4 w-4" />
                                <span className="ml-1">{discussion.replies}</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                                <span className="ml-1">{discussion.views}</span>
                              </Button>
                            </div>
                          </div>

                          <p className="text-gray-700 line-clamp-2">{discussion.content}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={discussion.author.avatar} />
                                  <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{discussion.author.name}</span>
                                <span className="text-gray-400">•</span>
                                <span>{discussion.author.role}</span>
                              </div>
                              <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                              <span>Last activity: {new Date(discussion.lastActivity).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Reply className="h-4 w-4 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>

                          {discussion.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {discussion.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="pinned" className="space-y-4">
              <div className="space-y-4">
                {filteredDiscussions.filter(d => d.isPinned).map((discussion) => {
                  const CategoryIcon = getCategoryIcon(discussion.category);
                  return (
                    <Card key={discussion.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Pin className="h-4 w-4 text-yellow-600" />
                                <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getCategoryColor(discussion.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {discussion.category}
                                </Badge>
                                <Badge className={getStatusColor(discussion.status)}>
                                  {discussion.status}
                                </Badge>
                                <Badge className={getPriorityColor(discussion.priority)}>
                                  {discussion.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{discussion.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={discussion.author.avatar} />
                                  <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{discussion.author.name}</span>
                              </div>
                              <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Reply className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="my-posts" className="space-y-4">
              <div className="space-y-4">
                {filteredDiscussions.filter(d => d.isClientPost).map((discussion) => {
                  const CategoryIcon = getCategoryIcon(discussion.category);
                  return (
                    <Card key={discussion.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge className={getCategoryColor(discussion.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {discussion.category}
                                </Badge>
                                <Badge className={getStatusColor(discussion.status)}>
                                  {discussion.status}
                                </Badge>
                                <Badge className={getPriorityColor(discussion.priority)}>
                                  {discussion.priority}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{discussion.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Posted {new Date(discussion.createdAt).toLocaleDateString()}</span>
                              <span>{discussion.replies} replies</span>
                              <span>{discussion.views} views</span>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Reply className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="response-needed" className="space-y-4">
              <div className="space-y-4">
                {filteredDiscussions.filter(d => d.requiresResponse).map((discussion) => {
                  const CategoryIcon = getCategoryIcon(discussion.category);
                  return (
                    <Card key={discussion.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge className={getCategoryColor(discussion.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {discussion.category}
                                </Badge>
                                <Badge className={getStatusColor(discussion.status)}>
                                  {discussion.status}
                                </Badge>
                                <Badge className="bg-orange-100 text-orange-800">
                                  Response Needed
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{discussion.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={discussion.author.avatar} />
                                  <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{discussion.author.name}</span>
                              </div>
                              <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <Reply className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              <div className="space-y-4">
                {filteredDiscussions.filter(d => d.status === 'resolved').map((discussion) => {
                  const CategoryIcon = getCategoryIcon(discussion.category);
                  return (
                    <Card key={discussion.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge className={getCategoryColor(discussion.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {discussion.category}
                                </Badge>
                                <Badge className={getStatusColor(discussion.status)}>
                                  {discussion.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{discussion.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={discussion.author.avatar} />
                                  <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{discussion.author.name}</span>
                              </div>
                              <span>Resolved {new Date(discussion.updatedAt).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
