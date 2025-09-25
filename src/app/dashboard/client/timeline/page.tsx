"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Timeline, TimelineContent, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot } from "@/components/ui/Timeline";

import { 
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
  Share,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  type: 'milestone' | 'task' | 'photo' | 'update' | 'decision' | 'issue' | 'meeting';
  status: 'completed' | 'in-progress' | 'pending' | 'delayed' | 'cancelled';
  date: string;
  time?: string;
  duration?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  phase: string;
  attachments?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
  photos?: Array<{
    id: string;
    url: string;
    caption: string;
  }>;
  notes?: string;
  isClientAction?: boolean;
  requiresApproval?: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export default function ClientTimelinePage() {
  const [user, setUser] = useState<User | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [selectedPhase, setSelectedPhase] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar' | 'list'>('timeline');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock timeline events data
    setTimelineEvents([
      {
        id: "1",
        title: "Project Kickoff Meeting",
        description: "Initial project meeting to discuss requirements, timeline, and expectations",
        type: "meeting",
        status: "completed",
        date: "2024-09-01",
        time: "10:00 AM",
        duration: "2 hours",
        assignedTo: "Sarah Johnson",
        priority: "high",
        phase: "Planning",
        isClientAction: true,
        notes: "All stakeholders present. Project scope confirmed."
      },
      {
        id: "2",
        title: "Design Approval Required",
        description: "Kitchen design concepts ready for client review and approval",
        type: "decision",
        status: "completed",
        date: "2024-09-05",
        time: "2:00 PM",
        assignedTo: "Emma Thompson",
        priority: "high",
        phase: "Planning",
        isClientAction: true,
        requiresApproval: true,
        approvedBy: "Client",
        approvedAt: "2024-09-05T14:30:00Z",
        attachments: [
          { name: "Kitchen Design v2.pdf", type: "document", url: "/files/kitchen-design.pdf" }
        ]
      },
      {
        id: "3",
        title: "Permit Application Submitted",
        description: "Building permit application submitted to city planning department",
        type: "milestone",
        status: "completed",
        date: "2024-09-10",
        assignedTo: "Mike Chen",
        priority: "high",
        phase: "Planning",
        notes: "Expected approval within 5-7 business days"
      },
      {
        id: "4",
        title: "Demolition Phase Started",
        description: "Kitchen demolition work has begun. Old fixtures and cabinets removed.",
        type: "task",
        status: "completed",
        date: "2024-09-16",
        assignedTo: "David Rodriguez",
        priority: "medium",
        phase: "Construction",
        photos: [
          { id: "demo-1", url: "/photos/demo-1.jpg", caption: "Kitchen before demolition" },
          { id: "demo-2", url: "/photos/demo-2.jpg", caption: "Kitchen after demolition" }
        ]
      },
      {
        id: "5",
        title: "Electrical Rough-in Complete",
        description: "All electrical wiring and outlets installed according to plan",
        type: "milestone",
        status: "completed",
        date: "2024-10-10",
        assignedTo: "Mike Chen",
        priority: "high",
        phase: "Construction",
        photos: [
          { id: "electrical-1", url: "/photos/electrical-1.jpg", caption: "Electrical panel installation" }
        ]
      },
      {
        id: "6",
        title: "Material Delivery Issue",
        description: "Drywall delivery delayed due to supplier issue. Alternative supplier contacted.",
        type: "issue",
        status: "in-progress",
        date: "2024-10-15",
        assignedTo: "Mike Chen",
        priority: "high",
        phase: "Construction",
        notes: "Client notified of delay. New delivery scheduled for next week."
      },
      {
        id: "7",
        title: "Weekly Progress Update",
        description: "Weekly progress photos and status update sent to client",
        type: "update",
        status: "completed",
        date: "2024-10-18",
        assignedTo: "Sarah Johnson",
        priority: "low",
        phase: "Construction",
        photos: [
          { id: "progress-1", url: "/photos/progress-1.jpg", caption: "Current construction progress" }
        ]
      },
      {
        id: "8",
        title: "Framing Complete - Client Inspection",
        description: "Framing work completed. Client inspection scheduled for approval before drywall.",
        type: "milestone",
        status: "pending",
        date: "2024-10-25",
        time: "3:00 PM",
        assignedTo: "Client",
        priority: "high",
        phase: "Construction",
        isClientAction: true,
        requiresApproval: true
      },
      {
        id: "9",
        title: "Paint Color Selection",
        description: "Client needs to select paint colors for kitchen and living room areas",
        type: "decision",
        status: "pending",
        date: "2024-11-01",
        assignedTo: "Client",
        priority: "medium",
        phase: "Finishing",
        isClientAction: true,
        notes: "Color samples will be provided for selection"
      },
      {
        id: "10",
        title: "Final Walkthrough",
        description: "Final project walkthrough with client to ensure all requirements are met",
        type: "meeting",
        status: "pending",
        date: "2024-12-10",
        time: "10:00 AM",
        duration: "1 hour",
        assignedTo: "Sarah Johnson",
        priority: "high",
        phase: "Finishing",
        isClientAction: true
      }
    ]);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone': return Target;
      case 'task': return CheckCircle;
      case 'photo': return Camera;
      case 'update': return FileText;
      case 'decision': return Users;
      case 'issue': return AlertTriangle;
      case 'meeting': return Calendar;
      default: return Clock;
    }
  };

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

  const getEventDotColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'delayed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredEvents = timelineEvents.filter(event => {
    const matchesPhase = selectedPhase === "all" || event.phase === selectedPhase;
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus;
    return matchesPhase && matchesType && matchesStatus;
  });

  const phases = [...new Set(timelineEvents.map(event => event.phase))];
  const types = [...new Set(timelineEvents.map(event => event.type))];
  const statuses = [...new Set(timelineEvents.map(event => event.status))];

  const stats = {
    total: timelineEvents.length,
    completed: timelineEvents.filter(e => e.status === 'completed').length,
    inProgress: timelineEvents.filter(e => e.status === 'in-progress').length,
    pending: timelineEvents.filter(e => e.status === 'pending').length,
    clientActions: timelineEvents.filter(e => e.isClientAction).length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Timeline"
          description="Track your project's progress and upcoming milestones"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Overview", href: "#" },
            { label: "Timeline", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Timeline</h1>
              <p className="text-gray-600 mt-1">Track your project's progress and upcoming milestones</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Timeline
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
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
                <h3 className="text-lg font-semibold mb-4">Filter Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Phase</label>
                    <select
                      value={selectedPhase}
                      onChange={(e) => setSelectedPhase(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Phases</option>
                      {phases.map(phase => (
                        <option key={phase} value={phase}>{phase}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      {types.map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Statuses</option>
                      {statuses.map(status => (
                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline View */}
          <Tabs defaultValue="timeline" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm p-6">
                <Timeline>
                  {filteredEvents.map((event, index) => {
                    const EventIcon = getEventIcon(event.type);
                    const isLast = index === filteredEvents.length - 1;
                    
                    return (
                      <TimelineItem key={event.id}>
                        <TimelineSeparator>
                          <TimelineDot className={getEventDotColor(event.status)}>
                            <EventIcon className="h-4 w-4 text-white" />
                          </TimelineDot>
                          {!isLast && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                                    <p className="text-sm text-gray-600">{event.description}</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Badge className={getStatusColor(event.status)}>
                                      {event.status}
                                    </Badge>
                                    <Badge className={getPriorityColor(event.priority)}>
                                      {event.priority}
                                    </Badge>
                                    {event.isClientAction && (
                                      <Badge className="bg-purple-100 text-purple-800">
                                        Your Action
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                  <div>
                                    <span className="font-medium">Date:</span>
                                    <p>{new Date(event.date).toLocaleDateString()}</p>
                                  </div>
                                  {event.time && (
                                    <div>
                                      <span className="font-medium">Time:</span>
                                      <p>{event.time}</p>
                                    </div>
                                  )}
                                  {event.duration && (
                                    <div>
                                      <span className="font-medium">Duration:</span>
                                      <p>{event.duration}</p>
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-medium">Phase:</span>
                                    <p>{event.phase}</p>
                                  </div>
                                </div>

                                {event.assignedTo && (
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Assigned to:</span> {event.assignedTo}
                                  </div>
                                )}

                                {event.notes && (
                                  <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-700">{event.notes}</p>
                                  </div>
                                )}

                                {event.photos && event.photos.length > 0 && (
                                  <div className="space-y-2">
                                    <h5 className="font-medium text-sm">Photos</h5>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                      {event.photos.map((photo) => (
                                        <div key={photo.id} className="relative group">
                                          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                            <Camera className="h-6 w-6 text-gray-400" />
                                          </div>
                                          <p className="text-xs text-gray-600 mt-1">{photo.caption}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {event.attachments && event.attachments.length > 0 && (
                                  <div className="space-y-2">
                                    <h5 className="font-medium text-sm">Attachments</h5>
                                    <div className="space-y-1">
                                      {event.attachments.map((attachment, idx) => (
                                        <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                          <FileText className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm">{attachment.name}</span>
                                          <Button size="sm" variant="ghost">
                                            <Download className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {event.requiresApproval && (
                                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                      <span className="text-sm font-medium text-yellow-800">
                                        {event.status === 'pending' ? 'Awaiting your approval' : 'Approved'}
                                      </span>
                                    </div>
                                    {event.approvedBy && (
                                      <p className="text-xs text-yellow-700 mt-1">
                                        Approved by {event.approvedBy} on {new Date(event.approvedAt!).toLocaleString()}
                                      </p>
                                    )}
                                  </div>
                                )}

                                <div className="flex space-x-2">
                                  {event.status === 'pending' && event.isClientAction && (
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Take Action
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <p className="text-gray-600">Calendar view coming soon!</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">List View</h3>
                  <div className="space-y-4">
                    {filteredEvents.map((event) => {
                      const EventIcon = getEventIcon(event.type);
                      return (
                        <div key={event.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className={`p-2 rounded-full ${getEventDotColor(event.status)}`}>
                            <EventIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                              <div className="flex space-x-2">
                                <Badge className={getStatusColor(event.status)}>
                                  {event.status}
                                </Badge>
                                <Badge className={getPriorityColor(event.priority)}>
                                  {event.priority}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{event.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                              <span>{event.phase}</span>
                              {event.assignedTo && <span>Assigned to: {event.assignedTo}</span>}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
