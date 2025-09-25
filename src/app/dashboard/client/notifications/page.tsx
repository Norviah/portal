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
import { Switch } from "@/components/ui/Switch";

import { 
  Bell, 
  Search, 
  Filter, 
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
  Settings,
  Shield,
  Globe,
  Zap,
  Camera,
  Download,
  Share,
  Eye,
  Trash2,
  CheckCircle as MarkAsRead,
  Circle as MarkAsUnread,
  Pin,
  Flag,
  DollarSign
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'update' | 'reminder' | 'alert' | 'announcement';
  category: 'project' | 'schedule' | 'payment' | 'document' | 'meeting' | 'system' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'unread' | 'read' | 'archived';
  isPinned: boolean;
  isImportant: boolean;
  createdAt: string;
  readAt?: string;
  archivedAt?: string;
  actionUrl?: string;
  actionText?: string;
  sender: {
    name: string;
    email: string;
    role: string;
  };
  projectName?: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  expiresAt?: string;
  isExpired: boolean;
}

export default function ClientNotificationsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock notifications data
    setNotifications([
      {
        id: "1",
        title: "Project Status Update",
        message: "Your project status has been updated to 'In Progress'. You can now track real-time progress through your client portal.",
        type: "info",
        category: "project",
        priority: "medium",
        status: "unread",
        isPinned: false,
        isImportant: false,
        createdAt: "2024-10-15T10:30:00Z",
        sender: {
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com",
          role: "Project Manager"
        },
        projectName: "Modern Home Renovation",
        actionUrl: "/dashboard/client/progress",
        actionText: "View Progress",
        isExpired: false
      },
      {
        id: "2",
        title: "Design Approval Required",
        message: "Kitchen design concepts are ready for your review. Please review the attached designs and provide your feedback by Friday.",
        type: "warning",
        category: "project",
        priority: "high",
        status: "unread",
        isPinned: true,
        isImportant: true,
        createdAt: "2024-10-14T14:20:00Z",
        sender: {
          name: "Emma Thompson",
          email: "emma.thompson@trio.com",
          role: "Designer"
        },
        projectName: "Modern Home Renovation",
        actionUrl: "/dashboard/client/decisions",
        actionText: "Review Design",
        attachments: [
          { name: "Kitchen Design Concepts.pdf", type: "document", size: "5.2 MB" }
        ],
        expiresAt: "2024-10-18T17:00:00Z",
        isExpired: false
      },
      {
        id: "3",
        title: "Meeting Reminder",
        message: "You have a design review meeting scheduled for tomorrow at 2 PM. Please review the attached materials beforehand.",
        type: "reminder",
        category: "meeting",
        priority: "medium",
        status: "read",
        isPinned: false,
        isImportant: false,
        createdAt: "2024-10-13T16:45:00Z",
        readAt: "2024-10-13T17:00:00Z",
        sender: {
          name: "Emma Thompson",
          email: "emma.thompson@trio.com",
          role: "Designer"
        },
        projectName: "Modern Home Renovation",
        actionUrl: "/dashboard/client/meetings",
        actionText: "Join Meeting",
        attachments: [
          { name: "Meeting Agenda.pdf", type: "document", size: "1.2 MB" }
        ],
        isExpired: false
      },
      {
        id: "4",
        title: "Payment Due",
        message: "Your invoice #INV-2024-001 is due for payment. Amount: $15,000. Please process payment within 30 days.",
        type: "alert",
        category: "payment",
        priority: "high",
        status: "unread",
        isPinned: false,
        isImportant: true,
        createdAt: "2024-10-12T09:00:00Z",
        sender: {
          name: "Lisa Wang",
          email: "lisa.wang@trio.com",
          role: "Accountant"
        },
        projectName: "Modern Home Renovation",
        actionUrl: "/dashboard/client/payments",
        actionText: "Pay Now",
        expiresAt: "2024-11-11T23:59:59Z",
        isExpired: false
      },
      {
        id: "5",
        title: "Document Uploaded",
        message: "New project documents have been uploaded to your portal. Please review the updated contract and building permits.",
        type: "info",
        category: "document",
        priority: "low",
        status: "read",
        isPinned: false,
        isImportant: false,
        createdAt: "2024-10-11T11:30:00Z",
        readAt: "2024-10-11T12:00:00Z",
        sender: {
          name: "Mike Chen",
          email: "mike.chen@trio.com",
          role: "Site Supervisor"
        },
        projectName: "Modern Home Renovation",
        actionUrl: "/dashboard/client/files",
        actionText: "View Documents",
        attachments: [
          { name: "Updated Contract.pdf", type: "document", size: "2.1 MB" },
          { name: "Building Permits.pdf", type: "document", size: "1.8 MB" }
        ],
        isExpired: false
      },
      {
        id: "6",
        title: "Schedule Change",
        message: "The framing inspection has been moved to Thursday at 2 PM instead of Wednesday. Please confirm if this new time works for you.",
        type: "warning",
        category: "schedule",
        priority: "medium",
        status: "unread",
        isPinned: false,
        isImportant: false,
        createdAt: "2024-10-10T15:00:00Z",
        sender: {
          name: "Mike Chen",
          email: "mike.chen@trio.com",
          role: "Site Supervisor"
        },
        projectName: "Modern Home Renovation",
        actionUrl: "/dashboard/client/schedule",
        actionText: "Confirm Time",
        isExpired: false
      },
      {
        id: "7",
        title: "System Maintenance",
        message: "Scheduled maintenance will be performed on our systems this weekend. Some features may be temporarily unavailable.",
        type: "announcement",
        category: "system",
        priority: "low",
        status: "read",
        isPinned: false,
        isImportant: false,
        createdAt: "2024-10-09T16:00:00Z",
        readAt: "2024-10-09T16:30:00Z",
        sender: {
          name: "System Administrator",
          email: "admin@trio.com",
          role: "System"
        },
        expiresAt: "2024-10-14T23:59:59Z",
        isExpired: true
      },
      {
        id: "8",
        title: "Progress Photos Available",
        message: "New progress photos from this week's work have been uploaded. Check out the latest construction progress.",
        type: "info",
        category: "project",
        priority: "low",
        status: "read",
        isPinned: false,
        isImportant: false,
        createdAt: "2024-10-08T14:00:00Z",
        readAt: "2024-10-08T15:00:00Z",
        sender: {
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com",
          role: "Project Manager"
        },
        projectName: "Modern Home Renovation",
        actionUrl: "/dashboard/client/gallery",
        actionText: "View Photos",
        isExpired: false
      }
    ]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return Bell;
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'update': return Zap;
      case 'reminder': return Clock;
      case 'alert': return AlertTriangle;
      case 'announcement': return Globe;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'update': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'reminder': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'announcement': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'project': return FileText;
      case 'schedule': return Calendar;
      case 'payment': return DollarSign;
      case 'document': return FileText;
      case 'meeting': return Video;
      case 'system': return Settings;
      case 'general': return Bell;
      default: return Bell;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project': return 'bg-blue-100 text-blue-800';
      case 'schedule': return 'bg-green-100 text-green-800';
      case 'payment': return 'bg-yellow-100 text-yellow-800';
      case 'document': return 'bg-purple-100 text-purple-800';
      case 'meeting': return 'bg-orange-100 text-orange-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      case 'general': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
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

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || notification.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || notification.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter;
    const matchesExpired = showExpired || !notification.isExpired;
    return matchesSearch && matchesType && matchesCategory && matchesStatus && matchesPriority && matchesExpired;
  });

  const handleMarkAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { 
            ...notification, 
            status: "read" as const,
            readAt: new Date().toISOString()
          }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleMarkAsUnread = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { 
            ...notification, 
            status: "unread" as const,
            readAt: undefined
          }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleArchive = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { 
            ...notification, 
            status: "archived" as const,
            archivedAt: new Date().toISOString()
          }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => 
      notification.status === 'unread'
        ? { 
            ...notification, 
            status: "read" as const,
            readAt: new Date().toISOString()
          }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => n.status === 'unread').length,
    read: notifications.filter(n => n.status === 'read').length,
    archived: notifications.filter(n => n.status === 'archived').length,
    important: notifications.filter(n => n.isImportant).length,
    pinned: notifications.filter(n => n.isPinned).length
  };

  const types = [...new Set(notifications.map(n => n.type))];
  const categories = [...new Set(notifications.map(n => n.category))];
  const statuses = [...new Set(notifications.map(n => n.status))];
  const priorities = [...new Set(notifications.map(n => n.priority))];

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Notifications"
          description="Stay updated with project notifications and alerts"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Communication", href: "#" },
            { label: "Notifications", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated with project notifications and alerts</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                <MarkAsRead className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Bell className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unread</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.unread}</p>
                  </div>
                  <Bell className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Read</p>
                    <p className="text-2xl font-bold text-green-600">{stats.read}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Important</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.important}</p>
                  </div>
                  <Star className="h-8 w-8 text-orange-600" />
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

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Archived</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.archived}</p>
                  </div>
                  <Archive className="h-8 w-8 text-gray-600" />
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
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
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
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-expired"
                  checked={showExpired}
                  onCheckedChange={setShowExpired}
                />
                <label htmlFor="show-expired" className="text-sm text-gray-600">
                  Show expired notifications
                </label>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
              <TabsTrigger value="pinned">Pinned</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type);
                  const CategoryIcon = getCategoryIcon(notification.category);
                  return (
                    <Card key={notification.id} className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow ${
                      notification.status === 'unread' ? 'ring-2 ring-blue-200' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                {notification.isPinned && (
                                  <Pin className="h-4 w-4 text-yellow-600" />
                                )}
                                {notification.isImportant && (
                                  <Star className="h-4 w-4 text-orange-600" />
                                )}
                                <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(notification.type)}>
                                  <TypeIcon className="h-3 w-3 mr-1" />
                                  {notification.type}
                                </Badge>
                                <Badge className={getCategoryColor(notification.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {notification.category}
                                </Badge>
                                <Badge className={getStatusColor(notification.status)}>
                                  {notification.status}
                                </Badge>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                                {notification.isExpired && (
                                  <Badge className="bg-red-100 text-red-800">
                                    Expired
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {notification.status === 'unread' ? (
                                <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                                  <MarkAsRead className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" onClick={() => handleMarkAsUnread(notification.id)}>
                                  <MarkAsUnread className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => handleArchive(notification.id)}>
                                <Archive className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-gray-700">{notification.message}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>{notification.sender.name}</span>
                                <span className="text-gray-400">•</span>
                                <span>{notification.sender.role}</span>
                              </div>
                              <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                              {notification.expiresAt && (
                                <span className="text-orange-600">
                                  Expires: {new Date(notification.expiresAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {notification.actionUrl && (
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  {notification.actionText || "View"}
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {notification.attachments && notification.attachments.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">Attachments</h5>
                              <div className="space-y-1">
                                {notification.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                    <Paperclip className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{attachment.name}</span>
                                    <span className="text-xs text-gray-500">({attachment.size})</span>
                                    <Button size="sm" variant="ghost">
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="space-y-4">
              <div className="space-y-4">
                {filteredNotifications.filter(n => n.status === 'unread').map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type);
                  const CategoryIcon = getCategoryIcon(notification.category);
                  return (
                    <Card key={notification.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow ring-2 ring-blue-200">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(notification.type)}>
                                  <TypeIcon className="h-3 w-3 mr-1" />
                                  {notification.type}
                                </Badge>
                                <Badge className={getCategoryColor(notification.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {notification.category}
                                </Badge>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                              <MarkAsRead className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-gray-700">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{notification.sender.name}</span>
                              <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              {notification.actionText || "View"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="important" className="space-y-4">
              <div className="space-y-4">
                {filteredNotifications.filter(n => n.isImportant).map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type);
                  const CategoryIcon = getCategoryIcon(notification.category);
                  return (
                    <Card key={notification.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-orange-600" />
                                <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(notification.type)}>
                                  <TypeIcon className="h-3 w-3 mr-1" />
                                  {notification.type}
                                </Badge>
                                <Badge className={getCategoryColor(notification.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {notification.category}
                                </Badge>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{notification.sender.name}</span>
                              <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              {notification.actionText || "View"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="pinned" className="space-y-4">
              <div className="space-y-4">
                {filteredNotifications.filter(n => n.isPinned).map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type);
                  const CategoryIcon = getCategoryIcon(notification.category);
                  return (
                    <Card key={notification.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Pin className="h-4 w-4 text-yellow-600" />
                                <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(notification.type)}>
                                  <TypeIcon className="h-3 w-3 mr-1" />
                                  {notification.type}
                                </Badge>
                                <Badge className={getCategoryColor(notification.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {notification.category}
                                </Badge>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{notification.sender.name}</span>
                              <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                              {notification.actionText || "View"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              <div className="space-y-4">
                {filteredNotifications.filter(n => n.status === 'archived').map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type);
                  const CategoryIcon = getCategoryIcon(notification.category);
                  return (
                    <Card key={notification.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(notification.type)}>
                                  <TypeIcon className="h-3 w-3 mr-1" />
                                  {notification.type}
                                </Badge>
                                <Badge className={getCategoryColor(notification.category)}>
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {notification.category}
                                </Badge>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{notification.sender.name}</span>
                              <span>Archived: {new Date(notification.archivedAt!).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
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
