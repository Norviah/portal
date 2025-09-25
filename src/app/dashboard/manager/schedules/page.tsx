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
  Calendar as CalendarIcon, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  User,
  MapPin,
  Users,
  Video,
  Phone,
  FileText,
  MoreHorizontal,
  Save,
  ChevronLeft,
  ChevronRight,
  Calendar as Today,
  Settings
} from "lucide-react";
import { useEffect, useState } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek, isSameDay, isToday } from "date-fns";

interface User {
  email: string;
  name: string;
  role: string;
}

interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  type: 'meeting' | 'task' | 'deadline' | 'site-visit' | 'review' | 'training';
  startTime: string;
  endTime: string;
  date: string;
  location?: string;
  attendees: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  }>;
  projectName?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate: string;
  };
  reminders: Array<{
    id: string;
    time: string;
    type: 'email' | 'sms' | 'notification';
  }>;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function ManagerSchedulesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'meeting' as const,
    startTime: '',
    endTime: '',
    date: new Date(),
    location: '',
    priority: 'medium' as const,
    projectName: '',
    notes: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock schedule events data
    setEvents([
      {
        id: "1",
        title: "Project Kickoff Meeting",
        description: "Initial meeting to discuss project scope, timeline, and deliverables",
        type: "meeting",
        startTime: "09:00",
        endTime: "10:30",
        date: "2024-10-21",
        location: "Conference Room A",
        attendees: [
          {
            id: "user-1",
            name: "Sarah Johnson",
            email: "sarah.johnson@trio.com",
            avatar: "/avatars/sarah.jpg",
            role: "Project Manager"
          },
          {
            id: "user-2",
            name: "Mike Chen",
            email: "mike.chen@trio.com",
            avatar: "/avatars/mike.jpg",
            role: "Site Supervisor"
          }
        ],
        projectName: "Modern Home Renovation",
        priority: "high",
        status: "scheduled",
        reminders: [
          { id: "1", time: "15", type: "email" },
          { id: "2", time: "5", type: "notification" }
        ],
        createdBy: "Sarah Johnson",
        createdAt: "2024-10-15T10:30:00Z",
        updatedAt: "2024-10-15T10:30:00Z"
      },
      {
        id: "2",
        title: "Site Safety Inspection",
        description: "Weekly safety inspection of construction site",
        type: "site-visit",
        startTime: "14:00",
        endTime: "16:00",
        date: "2024-10-21",
        location: "123 Main St, Construction Site",
        attendees: [
          {
            id: "user-2",
            name: "Mike Chen",
            email: "mike.chen@trio.com",
            avatar: "/avatars/mike.jpg",
            role: "Site Supervisor"
          }
        ],
        projectName: "Office Space Fit-out",
        priority: "urgent",
        status: "scheduled",
        reminders: [
          { id: "1", time: "30", type: "email" }
        ],
        createdBy: "Mike Chen",
        createdAt: "2024-10-16T08:00:00Z",
        updatedAt: "2024-10-16T08:00:00Z"
      },
      {
        id: "3",
        title: "Client Design Review",
        description: "Review design mockups with client for approval",
        type: "review",
        startTime: "11:00",
        endTime: "12:00",
        date: "2024-10-22",
        location: "Client Office",
        attendees: [
          {
            id: "user-3",
            name: "Emma Thompson",
            email: "emma.thompson@trio.com",
            avatar: "/avatars/emma.jpg",
            role: "Designer"
          }
        ],
        projectName: "Retail Store Construction",
        priority: "medium",
        status: "scheduled",
        reminders: [
          { id: "1", time: "60", type: "email" },
          { id: "2", time: "15", type: "sms" }
        ],
        createdBy: "Emma Thompson",
        createdAt: "2024-10-17T14:00:00Z",
        updatedAt: "2024-10-17T14:00:00Z"
      },
      {
        id: "4",
        title: "Budget Review Meeting",
        description: "Monthly budget review and financial planning",
        type: "meeting",
        startTime: "15:00",
        endTime: "16:30",
        date: "2024-10-22",
        location: "Conference Room B",
        attendees: [
          {
            id: "user-4",
            name: "Lisa Wang",
            email: "lisa.wang@trio.com",
            avatar: "/avatars/lisa.jpg",
            role: "Accountant"
          },
          {
            id: "user-1",
            name: "Sarah Johnson",
            email: "sarah.johnson@trio.com",
            avatar: "/avatars/sarah.jpg",
            role: "Project Manager"
          }
        ],
        priority: "high",
        status: "scheduled",
        reminders: [
          { id: "1", time: "30", type: "email" }
        ],
        createdBy: "Lisa Wang",
        createdAt: "2024-10-18T09:00:00Z",
        updatedAt: "2024-10-18T09:00:00Z"
      },
      {
        id: "5",
        title: "Team Training Session",
        description: "Safety training and equipment operation workshop",
        type: "training",
        startTime: "10:00",
        endTime: "12:00",
        date: "2024-10-23",
        location: "Training Center",
        attendees: [
          {
            id: "user-5",
            name: "David Rodriguez",
            email: "david.rodriguez@trio.com",
            avatar: "/avatars/david.jpg",
            role: "Construction Worker"
          },
          {
            id: "user-2",
            name: "Mike Chen",
            email: "mike.chen@trio.com",
            avatar: "/avatars/mike.jpg",
            role: "Site Supervisor"
          }
        ],
        priority: "medium",
        status: "scheduled",
        recurring: {
          frequency: "weekly",
          endDate: "2024-12-31"
        },
        reminders: [
          { id: "1", time: "24", type: "email" },
          { id: "2", time: "2", type: "notification" }
        ],
        createdBy: "Mike Chen",
        createdAt: "2024-10-19T11:00:00Z",
        updatedAt: "2024-10-19T11:00:00Z"
      }
    ]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Users;
      case 'task': return FileText;
      case 'deadline': return Clock;
      case 'site-visit': return MapPin;
      case 'review': return CheckCircle;
      case 'training': return Settings;
      default: return CalendarIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'task': return 'bg-green-100 text-green-800 border-green-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      case 'site-visit': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'training': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.projectName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || event.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => isSameDay(new Date(event.date), date));
  };

  const getWeekDates = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const handleCreateEvent = () => {
    const newEventData: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      type: newEvent.type,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      date: newEvent.date.toISOString().split('T')[0],
      location: newEvent.location,
      attendees: [],
      projectName: newEvent.projectName,
      priority: newEvent.priority,
      status: "scheduled",
      reminders: [],
      notes: newEvent.notes,
      createdBy: user?.name || "Manager",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEvents([newEventData, ...events]);
    setNewEvent({
      title: '',
      description: '',
      type: 'meeting',
      startTime: '',
      endTime: '',
      date: new Date(),
      location: '',
      priority: 'medium',
      projectName: '',
      notes: ''
    });
  };

  const stats = {
    total: events.length,
    today: events.filter(e => isSameDay(new Date(e.date), new Date())).length,
    thisWeek: events.filter(e => {
      const eventDate = new Date(e.date);
      const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
      return eventDate >= weekStart && eventDate <= weekEnd;
    }).length,
    overdue: events.filter(e => new Date(e.date) < new Date() && e.status !== 'completed').length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Schedule Management"
          description="Manage team schedules and appointments"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "Team Management", href: "#" },
            { label: "Schedules", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schedule Management</h1>
              <p className="text-gray-600 mt-1">Manage team schedules and appointments</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
                <Today className="h-4 w-4 mr-2" />
                Today
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                      Schedule a new meeting, task, or appointment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Title *</label>
                        <Input
                          placeholder="Enter event title"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Type *</label>
                        <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({...newEvent, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="task">Task</SelectItem>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="site-visit">Site Visit</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <Textarea
                        placeholder="Enter event description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date *</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(newEvent.date, "PPP")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newEvent.date}
                              onSelect={(date) => setNewEvent({...newEvent, date: date || new Date()})}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Start Time *</label>
                        <Input
                          type="time"
                          value={newEvent.startTime}
                          onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">End Time *</label>
                        <Input
                          type="time"
                          value={newEvent.endTime}
                          onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <Input
                          placeholder="Enter location"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Priority</label>
                        <Select value={newEvent.priority} onValueChange={(value: any) => setNewEvent({...newEvent, priority: value})}>
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
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button 
                        onClick={handleCreateEvent} 
                        disabled={!newEvent.title || !newEvent.startTime || !newEvent.endTime}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Create Event
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today</p>
                    <p className="text-2xl font-bold text-green-600">{stats.today}</p>
                  </div>
                  <Today className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.thisWeek}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
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
                    placeholder="Search events..."
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
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="site-visit">Site Visit</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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

          {/* Calendar View */}
          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="week">Week View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">
                      {format(selectedDate, "MMMM yyyy")}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(subDays(selectedDate, 1))}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                        <Today className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    className="rounded-md border"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">Event</TableHead>
                      <TableHead className="font-semibold">Date & Time</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Priority</TableHead>
                      <TableHead className="font-semibold">Attendees</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => {
                      const TypeIcon = getTypeIcon(event.type);
                      return (
                        <TableRow key={event.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <TypeIcon className="h-4 w-4 text-gray-400" />
                                <span className="font-medium text-gray-900">{event.title}</span>
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">{event.description}</div>
                              {event.location && (
                                <div className="flex items-center space-x-1 text-xs text-gray-400">
                                  <MapPin className="h-3 w-3" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</div>
                              <div className="text-sm text-gray-500">{event.startTime} - {event.endTime}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(event.type)}>
                              {event.type.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(event.priority)}>
                              {event.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {event.attendees.slice(0, 3).map((attendee, index) => (
                                <Avatar key={index} className="h-6 w-6">
                                  <AvatarImage src={attendee.avatar} />
                                  <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                              {event.attendees.length > 3 && (
                                <span className="text-xs text-gray-500">+{event.attendees.length - 3}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
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

            <TabsContent value="week" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">
                      Week of {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), "MMM d")} - {format(endOfWeek(selectedDate, { weekStartsOn: 1 }), "MMM d, yyyy")}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(subDays(selectedDate, 7))}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                        <Today className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-4">
                    {getWeekDates(selectedDate).map((date, index) => {
                      const dayEvents = getEventsForDate(date);
                      return (
                        <div key={index} className="space-y-2">
                          <div className={`text-center p-2 rounded ${isToday(date) ? 'bg-blue-100 text-blue-800' : 'bg-gray-50'}`}>
                            <div className="text-sm font-medium">{format(date, 'EEE')}</div>
                            <div className="text-lg font-bold">{format(date, 'd')}</div>
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 3).map((event) => {
                              const TypeIcon = getTypeIcon(event.type);
                              return (
                                <div key={event.id} className="p-2 bg-blue-50 rounded text-xs">
                                  <div className="flex items-center space-x-1">
                                    <TypeIcon className="h-3 w-3" />
                                    <span className="font-medium truncate">{event.title}</span>
                                  </div>
                                  <div className="text-gray-500">{event.startTime}</div>
                                </div>
                              );
                            })}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Event Types</CardTitle>
                    <CardDescription>Distribution of event types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['meeting', 'task', 'deadline', 'site-visit', 'review', 'training'].map((type) => {
                        const count = events.filter(e => e.type === type).length;
                        const percentage = events.length > 0 ? (count / events.length) * 100 : 0;
                        const TypeIcon = getTypeIcon(type);
                        return (
                          <div key={type} className="flex items-center space-x-3">
                            <TypeIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium capitalize w-20">{type.replace('-', ' ')}</span>
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
                    <CardTitle>Priority Distribution</CardTitle>
                    <CardDescription>Events by priority level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['low', 'medium', 'high', 'urgent'].map((priority) => {
                        const count = events.filter(e => e.priority === priority).length;
                        const percentage = events.length > 0 ? (count / events.length) * 100 : 0;
                        return (
                          <div key={priority} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{priority}</span>
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
