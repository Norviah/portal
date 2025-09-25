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
  Share
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Message {
  id: string;
  type: 'email' | 'sms' | 'call' | 'meeting' | 'internal' | 'system' | 'announcement';
  subject: string;
  content: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  recipient: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  projectName?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'sent' | 'delivered' | 'read' | 'replied' | 'archived';
  sentAt: string;
  readAt?: string;
  repliedAt?: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  tags: string[];
  isSystemMessage: boolean;
  isAnnouncement: boolean;
  isUrgent: boolean;
  requiresResponse: boolean;
  threadId?: string;
  replies?: Message[];
}

export default function ClientMessagesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
    priority: 'medium' as const
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock messages data
    setMessages([
      {
        id: "1",
        type: "email",
        subject: "Weekly Progress Update - Modern Home Renovation",
        content: "Hi! I wanted to update you on the progress of your kitchen renovation. We've completed the demolition phase and are ready to begin the electrical work. The team has been working efficiently and we're on track to meet our timeline. Please find attached photos of the current progress.",
        sender: {
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com",
          role: "Project Manager"
        },
        recipient: {
          name: "Client User",
          email: "client@email.com",
          role: "Client"
        },
        projectName: "Modern Home Renovation",
        priority: "medium",
        status: "read",
        sentAt: "2024-10-15T10:30:00Z",
        readAt: "2024-10-15T11:15:00Z",
        tags: ["progress", "update", "weekly"],
        isSystemMessage: false,
        isAnnouncement: false,
        isUrgent: false,
        requiresResponse: false,
        attachments: [
          { name: "Progress Photos - Week 1.pdf", type: "document", size: "2.4 MB" },
          { name: "Weekly Report.docx", type: "document", size: "1.2 MB" }
        ]
      },
      {
        id: "2",
        type: "meeting",
        subject: "Design Review Meeting - Kitchen Layout",
        content: "We have scheduled a design review meeting for tomorrow at 2 PM to discuss the kitchen layout options. Please review the attached design concepts and come prepared with any questions or feedback.",
        sender: {
          name: "Emma Thompson",
          email: "emma.thompson@trio.com",
          role: "Designer"
        },
        recipient: {
          name: "Client User",
          email: "client@email.com",
          role: "Client"
        },
        projectName: "Modern Home Renovation",
        priority: "high",
        status: "read",
        sentAt: "2024-10-14T14:20:00Z",
        readAt: "2024-10-14T15:30:00Z",
        tags: ["meeting", "design", "review"],
        isSystemMessage: false,
        isAnnouncement: false,
        isUrgent: false,
        requiresResponse: true,
        attachments: [
          { name: "Kitchen Design Concepts.pdf", type: "document", size: "5.8 MB" },
          { name: "3D Renderings.zip", type: "archive", size: "12.3 MB" }
        ]
      },
      {
        id: "3",
        type: "system",
        subject: "Project Status Update",
        content: "Your project status has been updated to 'In Progress'. You can now track real-time progress through your client portal.",
        sender: {
          name: "System",
          email: "system@trio.com",
          role: "System"
        },
        recipient: {
          name: "Client User",
          email: "client@email.com",
          role: "Client"
        },
        projectName: "Modern Home Renovation",
        priority: "low",
        status: "read",
        sentAt: "2024-10-12T09:00:00Z",
        readAt: "2024-10-12T09:15:00Z",
        tags: ["system", "status", "update"],
        isSystemMessage: true,
        isAnnouncement: false,
        isUrgent: false,
        requiresResponse: false
      },
      {
        id: "4",
        type: "email",
        subject: "Material Selection Required",
        content: "We need your input on the countertop material selection. We have three options ready for your review. Please let us know your preference by Friday so we can place the order and maintain our timeline.",
        sender: {
          name: "Mike Chen",
          email: "mike.chen@trio.com",
          role: "Site Supervisor"
        },
        recipient: {
          name: "Client User",
          email: "client@email.com",
          role: "Client"
        },
        projectName: "Modern Home Renovation",
        priority: "high",
        status: "delivered",
        sentAt: "2024-10-16T08:00:00Z",
        tags: ["materials", "selection", "urgent"],
        isSystemMessage: false,
        isAnnouncement: false,
        isUrgent: true,
        requiresResponse: true,
        attachments: [
          { name: "Countertop Options.pdf", type: "document", size: "3.2 MB" },
          { name: "Material Samples.jpg", type: "image", size: "4.1 MB" }
        ]
      },
      {
        id: "5",
        type: "announcement",
        subject: "Holiday Schedule Notice",
        content: "Please note that our team will be taking a break from December 23rd to January 2nd for the holidays. We will resume work on January 3rd. This may affect our project timeline, and we will provide an updated schedule after the break.",
        sender: {
          name: "Sarah Johnson",
          email: "sarah.johnson@trio.com",
          role: "Project Manager"
        },
        recipient: {
          name: "All Clients",
          email: "all@trio.com",
          role: "All"
        },
        priority: "medium",
        status: "delivered",
        sentAt: "2024-10-10T16:00:00Z",
        tags: ["holiday", "schedule", "notice"],
        isSystemMessage: false,
        isAnnouncement: true,
        isUrgent: false,
        requiresResponse: false
      },
      {
        id: "6",
        type: "email",
        subject: "Invoice #INV-2024-001 - Payment Due",
        content: "Please find attached your invoice for the first phase of work. Payment is due within 30 days. You can pay online through your client portal or contact our accounting department for assistance.",
        sender: {
          name: "Lisa Wang",
          email: "lisa.wang@trio.com",
          role: "Accountant"
        },
        recipient: {
          name: "Client User",
          email: "client@email.com",
          role: "Client"
        },
        projectName: "Modern Home Renovation",
        priority: "medium",
        status: "read",
        sentAt: "2024-10-08T10:00:00Z",
        readAt: "2024-10-08T11:30:00Z",
        tags: ["invoice", "payment", "billing"],
        isSystemMessage: false,
        isAnnouncement: false,
        isUrgent: false,
        requiresResponse: false,
        attachments: [
          { name: "Invoice INV-2024-001.pdf", type: "document", size: "1.8 MB" }
        ]
      }
    ]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'call': return Phone;
      case 'meeting': return Video;
      case 'internal': return Users;
      case 'system': return Settings;
      case 'announcement': return Globe;
      default: return MessageSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sms': return 'bg-green-100 text-green-800 border-green-200';
      case 'call': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'internal': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'system': return 'bg-red-100 text-red-800 border-red-200';
      case 'announcement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-yellow-100 text-yellow-800';
      case 'read': return 'bg-green-100 text-green-800';
      case 'replied': return 'bg-purple-100 text-purple-800';
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

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || message.type === typeFilter;
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleReply = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            status: "replied" as const,
            repliedAt: new Date().toISOString()
          }
        : msg
    );
    setMessages(updatedMessages);
    setReplyText("");
    setSelectedMessage(null);
  };

  const handleSendMessage = () => {
    const newMsg: Message = {
      id: Date.now().toString(),
      type: 'email',
      subject: newMessage.subject,
      content: newMessage.content,
      sender: {
        name: user?.name || "Client",
        email: user?.email || "client@email.com",
        role: "Client"
      },
      recipient: {
        name: newMessage.recipient,
        email: newMessage.recipient + "@trio.com",
        role: "Team"
      },
      priority: newMessage.priority,
      status: "sent",
      sentAt: new Date().toISOString(),
      tags: [],
      isSystemMessage: false,
      isAnnouncement: false,
      isUrgent: false,
      requiresResponse: false
    };
    setMessages([newMsg, ...messages]);
    setNewMessage({ recipient: '', subject: '', content: '', priority: 'medium' });
  };

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'sent' || m.status === 'delivered').length,
    replied: messages.filter(m => m.status === 'replied').length,
    urgent: messages.filter(m => m.isUrgent).length,
    requiresResponse: messages.filter(m => m.requiresResponse).length,
    announcements: messages.filter(m => m.isAnnouncement).length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Messages"
          description="Communicate with your project team and stay updated"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Communication", href: "#" },
            { label: "Messages", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Messages</h1>
              <p className="text-gray-600 mt-1">Communicate with your project team and stay updated</p>
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
                    New Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Send New Message</DialogTitle>
                    <DialogDescription>
                      Send a message to your project team
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Recipient</label>
                        <Select value={newMessage.recipient} onValueChange={(value) => setNewMessage({...newMessage, recipient: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sarah.johnson">Sarah Johnson (Project Manager)</SelectItem>
                            <SelectItem value="mike.chen">Mike Chen (Site Supervisor)</SelectItem>
                            <SelectItem value="emma.thompson">Emma Thompson (Designer)</SelectItem>
                            <SelectItem value="lisa.wang">Lisa Wang (Accountant)</SelectItem>
                            <SelectItem value="team">Project Team (All)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Priority</label>
                        <Select value={newMessage.priority} onValueChange={(value: any) => setNewMessage({...newMessage, priority: value})}>
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
                    <div>
                      <label className="text-sm font-medium text-gray-600">Subject</label>
                      <Input
                        placeholder="Enter message subject"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Message</label>
                      <Textarea
                        placeholder="Enter your message"
                        value={newMessage.content}
                        onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.recipient || !newMessage.subject || !newMessage.content}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
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
                    <p className="text-sm font-medium text-gray-600">Total Messages</p>
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
                    <p className="text-sm font-medium text-gray-600">Replied</p>
                    <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
                  </div>
                  <Reply className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Urgent</p>
                    <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
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
                    <p className="text-sm font-medium text-gray-600">Announcements</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.announcements}</p>
                  </div>
                  <Globe className="h-8 w-8 text-yellow-600" />
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
                    placeholder="Search messages..."
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
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
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

          {/* Messages List */}
          <Tabs defaultValue="list" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
              <TabsTrigger value="threads">Threads</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">From/To</TableHead>
                      <TableHead className="font-semibold">Subject</TableHead>
                      <TableHead className="font-semibold">Project</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Priority</TableHead>
                      <TableHead className="font-semibold">Sent</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => {
                      const TypeIcon = getTypeIcon(message.type);
                      return (
                        <TableRow key={message.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <TypeIcon className="h-4 w-4 text-gray-400" />
                              <Badge className={getTypeColor(message.type)}>
                                {message.type}
                              </Badge>
                              {message.isAnnouncement && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  Announcement
                                </Badge>
                              )}
                              {message.isUrgent && (
                                <Badge className="bg-red-100 text-red-800">
                                  Urgent
                                </Badge>
                              )}
                              {message.requiresResponse && (
                                <Badge className="bg-orange-100 text-orange-800">
                                  Response Needed
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={message.sender.avatar} />
                                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{message.sender.name}</span>
                              </div>
                              <div className="text-xs text-gray-500">to {message.recipient.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-900">{message.subject}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{message.content}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{message.projectName || "N/A"}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(message.status)}>
                              {message.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(message.priority)}>
                              {message.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600">
                              {new Date(message.sentAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(message)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>{message.subject}</DialogTitle>
                                    <DialogDescription>
                                      {message.type.charAt(0).toUpperCase() + message.type.slice(1)} from {message.sender.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">From</label>
                                        <p className="text-sm">{message.sender.name} ({message.sender.email})</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">To</label>
                                        <p className="text-sm">{message.recipient.name} ({message.recipient.email})</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Type</label>
                                        <p className="text-sm capitalize">{message.type}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Priority</label>
                                        <p className="text-sm capitalize">{message.priority}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Message</label>
                                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{message.content}</p>
                                    </div>
                                    {message.attachments && message.attachments.length > 0 && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Attachments</label>
                                        <div className="space-y-2">
                                          {message.attachments.map((attachment, index) => (
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
                                    {message.requiresResponse && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Reply</label>
                                        <Textarea
                                          placeholder="Write your reply here..."
                                          value={replyText}
                                          onChange={(e) => setReplyText(e.target.value)}
                                          className="mt-1"
                                        />
                                        <div className="flex justify-end space-x-2 mt-2">
                                          <Button
                                            variant="outline"
                                            onClick={() => setSelectedMessage(null)}
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            onClick={() => handleReply(message.id)}
                                            disabled={!replyText.trim()}
                                          >
                                            <Send className="h-4 w-4 mr-2" />
                                            Send Reply
                                          </Button>
                                        </div>
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
                {filteredMessages.map((message) => {
                  const TypeIcon = getTypeIcon(message.type);
                  return (
                    <Card key={message.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <TypeIcon className="h-5 w-5 text-gray-400" />
                            <Badge className={getTypeColor(message.type)}>
                              {message.type}
                            </Badge>
                          </div>
                          <div className="flex space-x-1">
                            <Badge className={getStatusColor(message.status)}>
                              {message.status}
                            </Badge>
                            <Badge className={getPriorityColor(message.priority)}>
                              {message.priority}
                            </Badge>
                            {message.isUrgent && (
                              <Badge className="bg-red-100 text-red-800">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                        <CardDescription>
                          {message.sender.name} → {message.recipient.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-700 line-clamp-3">{message.content}</p>
                        
                        {message.projectName && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Project:</span> {message.projectName}
                          </div>
                        )}

                        {message.attachments && message.attachments.length > 0 && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Attachments:</span> {message.attachments.length} files
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(message.sentAt).toLocaleDateString()}</span>
                          {message.requiresResponse && (
                            <span className="text-orange-600 font-medium">Response Needed</span>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {message.requiresResponse && (
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Reply className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="threads" className="space-y-4">
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Message Threads</h3>
                <p className="text-gray-600">Threaded conversations coming soon!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
