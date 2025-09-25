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
  Phone, 
  Mail, 
  MessageSquare, 
  Video, 
  Calendar,
  Clock,
  User,
  Users,
  Settings,
  Shield,
  Globe,
  Zap,
  Camera,
  Download,
  Share,
  Eye,
  MoreHorizontal,
  Star,
  MapPin,
  Building,
  Briefcase,
  Award,
  CheckCircle,
  AlertTriangle,
  Info,
  Send,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  specialization: string[];
  availability: 'available' | 'busy' | 'away' | 'offline';
  lastActive: string;
  timezone: string;
  languages: string[];
  experience: string;
  bio: string;
  isPrimary: boolean;
  isEmergency: boolean;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  contactMethods: {
    email: boolean;
    phone: boolean;
    sms: boolean;
    video: boolean;
    inPerson: boolean;
  };
  responseTime: string;
  notes?: string;
}

interface ContactRequest {
  id: string;
  type: 'meeting' | 'call' | 'email' | 'message' | 'emergency';
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  requestedAt: string;
  scheduledFor?: string;
  assignedTo: string;
  responseTime?: string;
  notes?: string;
}

export default function ClientContactPage() {
  const [user, setUser] = useState<User | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newRequest, setNewRequest] = useState({
    type: 'meeting' as const,
    subject: '',
    message: '',
    priority: 'medium' as const,
    assignedTo: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock team members data
    setTeamMembers([
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Project Manager",
        title: "Senior Project Manager",
        email: "sarah.johnson@trio.com",
        phone: "+1 (555) 123-4567",
        avatar: "/avatars/sarah.jpg",
        department: "Project Management",
        specialization: ["Project Planning", "Timeline Management", "Client Relations"],
        availability: "available",
        lastActive: "2024-10-15T10:30:00Z",
        timezone: "EST",
        languages: ["English", "Spanish"],
        experience: "8 years",
        bio: "Experienced project manager with a track record of delivering successful construction projects on time and within budget.",
        isPrimary: true,
        isEmergency: true,
        workingHours: {
          start: "08:00",
          end: "17:00",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        },
        contactMethods: {
          email: true,
          phone: true,
          sms: true,
          video: true,
          inPerson: true
        },
        responseTime: "Within 2 hours",
        notes: "Primary point of contact for all project-related matters"
      },
      {
        id: "2",
        name: "Mike Chen",
        role: "Site Supervisor",
        title: "Lead Site Supervisor",
        email: "mike.chen@trio.com",
        phone: "+1 (555) 234-5678",
        avatar: "/avatars/mike.jpg",
        department: "Construction",
        specialization: ["Construction Management", "Quality Control", "Safety"],
        availability: "busy",
        lastActive: "2024-10-15T09:15:00Z",
        timezone: "EST",
        languages: ["English", "Mandarin"],
        experience: "12 years",
        bio: "Dedicated site supervisor with extensive experience in residential and commercial construction projects.",
        isPrimary: false,
        isEmergency: true,
        workingHours: {
          start: "07:00",
          end: "16:00",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        contactMethods: {
          email: true,
          phone: true,
          sms: true,
          video: false,
          inPerson: true
        },
        responseTime: "Within 4 hours",
        notes: "Available on-site during construction hours"
      },
      {
        id: "3",
        name: "Emma Thompson",
        role: "Designer",
        title: "Interior Designer",
        email: "emma.thompson@trio.com",
        phone: "+1 (555) 345-6789",
        avatar: "/avatars/emma.jpg",
        department: "Design",
        specialization: ["Interior Design", "Space Planning", "Material Selection"],
        availability: "available",
        lastActive: "2024-10-15T11:00:00Z",
        timezone: "EST",
        languages: ["English", "French"],
        experience: "6 years",
        bio: "Creative interior designer passionate about creating beautiful and functional spaces that reflect clients' vision.",
        isPrimary: false,
        isEmergency: false,
        workingHours: {
          start: "09:00",
          end: "18:00",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        },
        contactMethods: {
          email: true,
          phone: true,
          sms: false,
          video: true,
          inPerson: true
        },
        responseTime: "Within 6 hours",
        notes: "Best contacted via email for design-related questions"
      },
      {
        id: "4",
        name: "David Rodriguez",
        role: "Construction Worker",
        title: "Senior Construction Worker",
        email: "david.rodriguez@trio.com",
        phone: "+1 (555) 456-7890",
        avatar: "/avatars/david.jpg",
        department: "Construction",
        specialization: ["Carpentry", "Framing", "Finishing"],
        availability: "away",
        lastActive: "2024-10-14T16:30:00Z",
        timezone: "EST",
        languages: ["English", "Spanish"],
        experience: "10 years",
        bio: "Skilled construction worker with expertise in various construction trades and techniques.",
        isPrimary: false,
        isEmergency: false,
        workingHours: {
          start: "07:00",
          end: "15:30",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        },
        contactMethods: {
          email: false,
          phone: true,
          sms: true,
          video: false,
          inPerson: true
        },
        responseTime: "Within 8 hours",
        notes: "On-site worker, best contacted during work hours"
      },
      {
        id: "5",
        name: "Lisa Wang",
        role: "Accountant",
        title: "Project Accountant",
        email: "lisa.wang@trio.com",
        phone: "+1 (555) 567-8901",
        avatar: "/avatars/lisa.jpg",
        department: "Finance",
        specialization: ["Project Accounting", "Budget Management", "Invoicing"],
        availability: "available",
        lastActive: "2024-10-15T08:45:00Z",
        timezone: "EST",
        languages: ["English", "Mandarin"],
        experience: "5 years",
        bio: "Detail-oriented accountant specializing in construction project financial management and cost control.",
        isPrimary: false,
        isEmergency: false,
        workingHours: {
          start: "08:30",
          end: "17:30",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        },
        contactMethods: {
          email: true,
          phone: true,
          sms: false,
          video: true,
          inPerson: false
        },
        responseTime: "Within 4 hours",
        notes: "Handles all financial matters and billing questions"
      },
      {
        id: "6",
        name: "Emergency Contact",
        role: "Emergency",
        title: "24/7 Emergency Line",
        email: "emergency@trio.com",
        phone: "+1 (555) 911-0000",
        department: "Emergency",
        specialization: ["Emergency Response", "Crisis Management"],
        availability: "available",
        lastActive: "2024-10-15T12:00:00Z",
        timezone: "EST",
        languages: ["English"],
        experience: "15 years",
        bio: "24/7 emergency contact for urgent construction issues and safety concerns.",
        isPrimary: false,
        isEmergency: true,
        workingHours: {
          start: "00:00",
          end: "23:59",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        },
        contactMethods: {
          email: true,
          phone: true,
          sms: true,
          video: false,
          inPerson: false
        },
        responseTime: "Immediate",
        notes: "For urgent safety issues or construction emergencies only"
      }
    ]);

    // Mock contact requests data
    setContactRequests([
      {
        id: "1",
        type: "meeting",
        subject: "Design Review Meeting",
        message: "I'd like to schedule a meeting to review the kitchen design options.",
        priority: "medium",
        status: "scheduled",
        requestedAt: "2024-10-15T10:30:00Z",
        scheduledFor: "2024-10-16T14:00:00Z",
        assignedTo: "Emma Thompson",
        responseTime: "2024-10-15T11:00:00Z"
      },
      {
        id: "2",
        type: "call",
        subject: "Budget Question",
        message: "I have questions about the additional costs in the latest invoice.",
        priority: "high",
        status: "pending",
        requestedAt: "2024-10-15T09:15:00Z",
        assignedTo: "Lisa Wang"
      },
      {
        id: "3",
        type: "email",
        subject: "Progress Update Request",
        message: "Could you please send me a weekly progress update?",
        priority: "low",
        status: "completed",
        requestedAt: "2024-10-14T16:45:00Z",
        assignedTo: "Sarah Johnson",
        responseTime: "2024-10-14T17:30:00Z"
      }
    ]);
  }, []);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'away': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available': return CheckCircle;
      case 'busy': return Clock;
      case 'away': return AlertTriangle;
      case 'offline': return User;
      default: return User;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesAvailability = availabilityFilter === "all" || member.availability === availabilityFilter;
    return matchesSearch && matchesRole && matchesAvailability;
  });

  const handleCreateRequest = () => {
    const newRequestData: ContactRequest = {
      id: Date.now().toString(),
      type: newRequest.type,
      subject: newRequest.subject,
      message: newRequest.message,
      priority: newRequest.priority,
      status: "pending",
      requestedAt: new Date().toISOString(),
      assignedTo: newRequest.assignedTo
    };
    setContactRequests([newRequestData, ...contactRequests]);
    setNewRequest({ type: 'meeting', subject: '', message: '', priority: 'medium', assignedTo: '' });
  };

  const roles = [...new Set(teamMembers.map(m => m.role))];
  const availabilities = [...new Set(teamMembers.map(m => m.availability))];

  const stats = {
    total: teamMembers.length,
    available: teamMembers.filter(m => m.availability === 'available').length,
    primary: teamMembers.filter(m => m.isPrimary).length,
    emergency: teamMembers.filter(m => m.isEmergency).length,
    pendingRequests: contactRequests.filter(r => r.status === 'pending').length,
    completedRequests: contactRequests.filter(r => r.status === 'completed').length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Team Contact"
          description="Get in touch with your project team members"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Communication", href: "#" },
            { label: "Contact", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Contact</h1>
              <p className="text-gray-600 mt-1">Get in touch with your project team members</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Contacts
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Contact Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Contact Request</DialogTitle>
                    <DialogDescription>
                      Send a message or request to a team member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Type</label>
                        <select
                          value={newRequest.type}
                          onChange={(e) => setNewRequest({...newRequest, type: e.target.value as any})}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="meeting">Meeting</option>
                          <option value="call">Phone Call</option>
                          <option value="email">Email</option>
                          <option value="message">Message</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Priority</label>
                        <select
                          value={newRequest.priority}
                          onChange={(e) => setNewRequest({...newRequest, priority: e.target.value as any})}
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
                      <label className="text-sm font-medium text-gray-600">Assigned To</label>
                      <select
                        value={newRequest.assignedTo}
                        onChange={(e) => setNewRequest({...newRequest, assignedTo: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select team member</option>
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.name}>
                            {member.name} - {member.role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Subject</label>
                      <Input
                        placeholder="Enter request subject"
                        value={newRequest.subject}
                        onChange={(e) => setNewRequest({...newRequest, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Message</label>
                      <Textarea
                        placeholder="Describe your request or question..."
                        value={newRequest.message}
                        onChange={(e) => setNewRequest({...newRequest, message: e.target.value})}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button
                        onClick={handleCreateRequest}
                        disabled={!newRequest.subject || !newRequest.message || !newRequest.assignedTo}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Request
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
                    <p className="text-sm font-medium text-gray-600">Total Team</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Primary Contact</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.primary}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Emergency</p>
                    <p className="text-2xl font-bold text-red-600">{stats.emergency}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completedRequests}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
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
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  {availabilities.map(availability => (
                    <SelectItem key={availability} value={availability}>
                      {availability.charAt(0).toUpperCase() + availability.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Team Members and Contact Requests */}
          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="team">Team Members</TabsTrigger>
              <TabsTrigger value="requests">Contact Requests</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMembers.map((member) => {
                  const AvailabilityIcon = getAvailabilityIcon(member.availability);
                  return (
                    <Card key={member.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{member.name}</CardTitle>
                              <CardDescription>{member.title}</CardDescription>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Badge className={getAvailabilityColor(member.availability)}>
                              <AvailabilityIcon className="h-3 w-3 mr-1" />
                              {member.availability}
                            </Badge>
                            {member.isPrimary && (
                              <Badge className="bg-purple-100 text-purple-800">
                                Primary
                              </Badge>
                            )}
                            {member.isEmergency && (
                              <Badge className="bg-red-100 text-red-800">
                                Emergency
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>Response: {member.responseTime}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Specialization</h5>
                          <div className="flex flex-wrap gap-1">
                            {member.specialization.map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Contact Methods</h5>
                          <div className="flex space-x-2">
                            {member.contactMethods.email && (
                              <Button size="sm" variant="outline">
                                <Mail className="h-3 w-3" />
                              </Button>
                            )}
                            {member.contactMethods.phone && (
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3" />
                              </Button>
                            )}
                            {member.contactMethods.sms && (
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-3 w-3" />
                              </Button>
                            )}
                            {member.contactMethods.video && (
                              <Button size="sm" variant="outline">
                                <Video className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Working Hours</h5>
                          <p className="text-sm text-gray-600">
                            {member.workingHours.start} - {member.workingHours.end} EST
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.workingHours.days.join(", ")}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              <div className="space-y-4">
                {contactRequests.map((request) => (
                  <Card key={request.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.subject}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(request.priority)}>
                                {request.priority}
                              </Badge>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                              <Badge variant="outline">
                                {request.type}
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

                        <p className="text-gray-700">{request.message}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Assigned to: {request.assignedTo}</span>
                            <span>Requested: {new Date(request.requestedAt).toLocaleDateString()}</span>
                            {request.scheduledFor && (
                              <span>Scheduled: {new Date(request.scheduledFor).toLocaleDateString()}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <div className="space-y-4">
                {teamMembers.filter(m => m.isEmergency).map((member) => {
                  const AvailabilityIcon = getAvailabilityIcon(member.availability);
                  return (
                    <Card key={member.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow ring-2 ring-red-200">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-600">{member.title}</p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Badge className="bg-red-100 text-red-800">
                                Emergency
                              </Badge>
                              <Badge className={getAvailabilityColor(member.availability)}>
                                <AvailabilityIcon className="h-3 w-3 mr-1" />
                                {member.availability}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span className="font-medium">{member.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>Response: {member.responseTime}</span>
                            </div>
                          </div>

                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">
                              <strong>Emergency Contact:</strong> {member.bio}
                            </p>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                              <Phone className="h-4 w-4 mr-1" />
                              Call Now
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
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
