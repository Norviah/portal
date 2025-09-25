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

import { 
  Users, 
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
  Settings,
  Eye,
  MoreHorizontal,
  Save,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Award,
  Activity
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
  email: string;
  role: string;
  department: string;
  avatar?: string;
  phone: string;
  location: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'on-leave' | 'terminated';
  skills: string[];
  certifications: string[];
  currentProjects: string[];
  performance: {
    rating: number;
    lastReview: string;
    goals: string[];
  };
  availability: {
    hoursPerWeek: number;
    currentLoad: number;
    nextAvailable: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export default function ManagerTeamPage() {
  const [user, setUser] = useState<User | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
        email: "sarah.johnson@trio.com",
        role: "Project Manager",
        department: "Project Management",
        avatar: "/avatars/sarah.jpg",
        phone: "(555) 123-4567",
        location: "New York, NY",
        hireDate: "2022-03-15",
        status: "active",
        skills: ["Project Management", "Client Relations", "Budget Planning", "Team Leadership"],
        certifications: ["PMP", "Agile Certified"],
        currentProjects: ["Modern Home Renovation", "Office Space Fit-out"],
        performance: {
          rating: 4.8,
          lastReview: "2024-09-15",
          goals: ["Improve team efficiency", "Complete PMP certification"]
        },
        availability: {
          hoursPerWeek: 40,
          currentLoad: 35,
          nextAvailable: "2024-11-01"
        },
        emergencyContact: {
          name: "John Johnson",
          phone: "(555) 987-6543",
          relationship: "Spouse"
        }
      },
      {
        id: "2",
        name: "Mike Chen",
        email: "mike.chen@trio.com",
        role: "Site Supervisor",
        department: "Construction",
        avatar: "/avatars/mike.jpg",
        phone: "(555) 234-5678",
        location: "Los Angeles, CA",
        hireDate: "2021-08-20",
        status: "active",
        skills: ["Construction Management", "Safety Protocols", "Quality Control", "Equipment Operation"],
        certifications: ["OSHA 30", "First Aid", "Crane Operator"],
        currentProjects: ["Retail Store Construction", "Bathroom Renovation"],
        performance: {
          rating: 4.6,
          lastReview: "2024-08-20",
          goals: ["Improve safety record", "Lead more complex projects"]
        },
        availability: {
          hoursPerWeek: 45,
          currentLoad: 42,
          nextAvailable: "2024-10-25"
        },
        emergencyContact: {
          name: "Lisa Chen",
          phone: "(555) 876-5432",
          relationship: "Sister"
        }
      },
      {
        id: "3",
        name: "Lisa Wang",
        email: "lisa.wang@trio.com",
        role: "Accountant",
        department: "Finance",
        avatar: "/avatars/lisa.jpg",
        phone: "(555) 345-6789",
        location: "Chicago, IL",
        hireDate: "2023-01-10",
        status: "active",
        skills: ["Financial Analysis", "Budget Management", "Invoice Processing", "Tax Preparation"],
        certifications: ["CPA", "QuickBooks Certified"],
        currentProjects: ["All Projects"],
        performance: {
          rating: 4.9,
          lastReview: "2024-09-01",
          goals: ["Streamline invoicing process", "Implement new accounting software"]
        },
        availability: {
          hoursPerWeek: 40,
          currentLoad: 38,
          nextAvailable: "2024-10-20"
        },
        emergencyContact: {
          name: "David Wang",
          phone: "(555) 765-4321",
          relationship: "Brother"
        }
      },
      {
        id: "4",
        name: "David Rodriguez",
        email: "david.rodriguez@trio.com",
        role: "Construction Worker",
        department: "Construction",
        avatar: "/avatars/david.jpg",
        phone: "(555) 456-7890",
        location: "Miami, FL",
        hireDate: "2023-06-01",
        status: "active",
        skills: ["Carpentry", "Electrical Work", "Plumbing", "Painting"],
        certifications: ["Electrical License", "Plumbing License"],
        currentProjects: ["Modern Home Renovation"],
        performance: {
          rating: 4.4,
          lastReview: "2024-07-15",
          goals: ["Complete electrical certification", "Improve efficiency"]
        },
        availability: {
          hoursPerWeek: 40,
          currentLoad: 40,
          nextAvailable: "2024-10-18"
        },
        emergencyContact: {
          name: "Maria Rodriguez",
          phone: "(555) 654-3210",
          relationship: "Mother"
        }
      },
      {
        id: "5",
        name: "Emma Thompson",
        email: "emma.thompson@trio.com",
        role: "Designer",
        department: "Design",
        avatar: "/avatars/emma.jpg",
        phone: "(555) 567-8901",
        location: "Seattle, WA",
        hireDate: "2022-11-05",
        status: "on-leave",
        skills: ["Interior Design", "3D Modeling", "Space Planning", "Material Selection"],
        certifications: ["NCIDQ", "AutoCAD Certified"],
        currentProjects: [],
        performance: {
          rating: 4.7,
          lastReview: "2024-08-01",
          goals: ["Return from leave", "Complete design portfolio"]
        },
        availability: {
          hoursPerWeek: 0,
          currentLoad: 0,
          nextAvailable: "2024-12-01"
        },
        emergencyContact: {
          name: "James Thompson",
          phone: "(555) 543-2109",
          relationship: "Husband"
        }
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityColor = (currentLoad: number, hoursPerWeek: number) => {
    const percentage = (currentLoad / hoursPerWeek) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    onLeave: teamMembers.filter(m => m.status === 'on-leave').length,
    averageRating: teamMembers.length > 0 ? teamMembers.reduce((sum, m) => sum + m.performance.rating, 0) / teamMembers.length : 0
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Team Management"
          description="Manage team members and their information"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "Team Management", href: "#" },
            { label: "Team", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-1">Manage team members and their information</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Team Members</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">On Leave</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
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
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Team Members List */}
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
                      <TableHead className="font-semibold">Member</TableHead>
                      <TableHead className="font-semibold">Role & Department</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Performance</TableHead>
                      <TableHead className="font-semibold">Availability</TableHead>
                      <TableHead className="font-semibold">Current Projects</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                              <div className="text-xs text-gray-400">{member.location}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{member.role}</div>
                            <div className="text-sm text-gray-500">{member.department}</div>
                            <div className="text-xs text-gray-400">Hired: {new Date(member.hireDate).toLocaleDateString()}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className={`font-medium ${getPerformanceColor(member.performance.rating)}`}>
                              {member.performance.rating}/5.0
                            </div>
                            <div className="text-xs text-gray-500">
                              Last review: {new Date(member.performance.lastReview).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className={`text-sm font-medium ${getAvailabilityColor(member.availability.currentLoad, member.availability.hoursPerWeek)}`}>
                              {member.availability.currentLoad}/{member.availability.hoursPerWeek}h
                            </div>
                            <div className="text-xs text-gray-500">
                              Next available: {new Date(member.availability.nextAvailable).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {member.currentProjects.length > 0 ? (
                              member.currentProjects.slice(0, 2).map((project, index) => (
                                <div key={index} className="text-sm text-gray-600">{project}</div>
                              ))
                            ) : (
                              <div className="text-sm text-gray-400">No active projects</div>
                            )}
                            {member.currentProjects.length > 2 && (
                              <div className="text-xs text-gray-500">+{member.currentProjects.length - 2} more</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedMember(member)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{member.name} - Team Member Details</DialogTitle>
                                  <DialogDescription>
                                    Complete information for {member.role}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h4 className="font-medium text-gray-900">Personal Information</h4>
                                      <div className="space-y-2">
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Name</label>
                                          <p className="text-sm">{member.name}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Email</label>
                                          <p className="text-sm">{member.email}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Phone</label>
                                          <p className="text-sm">{member.phone}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Location</label>
                                          <p className="text-sm">{member.location}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Hire Date</label>
                                          <p className="text-sm">{new Date(member.hireDate).toLocaleDateString()}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-4">
                                      <h4 className="font-medium text-gray-900">Professional Information</h4>
                                      <div className="space-y-2">
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Role</label>
                                          <p className="text-sm">{member.role}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Department</label>
                                          <p className="text-sm">{member.department}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Status</label>
                                          <Badge className={getStatusColor(member.status)}>
                                            {member.status.replace('-', ' ')}
                                          </Badge>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-600">Performance Rating</label>
                                          <p className={`text-sm font-medium ${getPerformanceColor(member.performance.rating)}`}>
                                            {member.performance.rating}/5.0
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Skills & Certifications</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Skills</label>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {member.skills.map((skill, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Certifications</label>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {member.certifications.map((cert, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                              {cert}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Current Projects</h4>
                                    <div className="space-y-1">
                                      {member.currentProjects.length > 0 ? (
                                        member.currentProjects.map((project, index) => (
                                          <div key={index} className="text-sm text-gray-600">• {project}</div>
                                        ))
                                      ) : (
                                        <div className="text-sm text-gray-400">No active projects</div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Emergency Contact</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Name</label>
                                        <p className="text-sm">{member.emergencyContact.name}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="text-sm">{member.emergencyContact.phone}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Relationship</label>
                                        <p className="text-sm">{member.emergencyContact.relationship}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status.replace('-', ' ')}
                        </Badge>
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
                          <MapPin className="h-4 w-4" />
                          <span>{member.location}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Performance</span>
                          <span className={`text-sm font-medium ${getPerformanceColor(member.performance.rating)}`}>
                            {member.performance.rating}/5.0
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Availability</span>
                          <span className={`text-sm font-medium ${getAvailabilityColor(member.availability.currentLoad, member.availability.hoursPerWeek)}`}>
                            {member.availability.currentLoad}/{member.availability.hoursPerWeek}h
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">Skills</div>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Department Distribution</CardTitle>
                    <CardDescription>Team members by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(teamMembers.reduce((acc, member) => {
                        acc[member.department] = (acc[member.department] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)).map(([department, count]) => {
                        const percentage = (count / teamMembers.length) * 100;
                        return (
                          <div key={department} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{department}</span>
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
                    <CardTitle>Performance Distribution</CardTitle>
                    <CardDescription>Team performance ratings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = teamMembers.filter(m => Math.floor(m.performance.rating) === rating).length;
                        const percentage = teamMembers.length > 0 ? (count / teamMembers.length) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium w-8">{rating}</span>
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            </div>
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
