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
import { Progress } from "@/components/ui/Progress";

import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  Star,
  Award,
  Activity,
  Target,
  BarChart3,
  PieChart,
  Users,
  Zap,
  Shield,
  Trophy
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  period: string;
}

interface TeamMemberPerformance {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department: string;
  overallRating: number;
  metrics: {
    productivity: number;
    quality: number;
    timeliness: number;
    collaboration: number;
    innovation: number;
  };
  goals: Array<{
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    unit: string;
    dueDate: string;
    status: 'on-track' | 'at-risk' | 'completed' | 'overdue';
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'award' | 'milestone' | 'recognition';
  }>;
  reviews: Array<{
    id: string;
    reviewer: string;
    rating: number;
    comments: string;
    date: string;
  }>;
  lastUpdated: string;
}

export default function ManagerPerformancePage() {
  const [user, setUser] = useState<User | null>(null);
  const [teamPerformance, setTeamPerformance] = useState<TeamMemberPerformance[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMemberPerformance | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock performance metrics
    setMetrics([
      {
        id: "1",
        name: "Project Completion Rate",
        value: 87,
        target: 90,
        unit: "%",
        trend: "up",
        change: 5,
        period: "This Month"
      },
      {
        id: "2",
        name: "Client Satisfaction",
        value: 4.6,
        target: 4.5,
        unit: "/5",
        trend: "up",
        change: 0.2,
        period: "This Month"
      },
      {
        id: "3",
        name: "Budget Adherence",
        value: 94,
        target: 95,
        unit: "%",
        trend: "down",
        change: -2,
        period: "This Month"
      },
      {
        id: "4",
        name: "Team Productivity",
        value: 92,
        target: 90,
        unit: "%",
        trend: "up",
        change: 3,
        period: "This Month"
      }
    ]);

    // Mock team performance data
    setTeamPerformance([
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@trio.com",
        role: "Project Manager",
        avatar: "/avatars/sarah.jpg",
        department: "Project Management",
        overallRating: 4.8,
        metrics: {
          productivity: 95,
          quality: 92,
          timeliness: 88,
          collaboration: 96,
          innovation: 89
        },
        goals: [
          {
            id: "1",
            title: "Complete PMP Certification",
            description: "Finish Project Management Professional certification",
            target: 100,
            current: 75,
            unit: "%",
            dueDate: "2024-12-31",
            status: "on-track"
          },
          {
            id: "2",
            title: "Improve Team Efficiency",
            description: "Reduce project delivery time by 15%",
            target: 15,
            current: 8,
            unit: "%",
            dueDate: "2024-11-30",
            status: "on-track"
          }
        ],
        achievements: [
          {
            id: "1",
            title: "Project Excellence Award",
            description: "Recognized for outstanding project delivery",
            date: "2024-09-15",
            type: "award"
          },
          {
            id: "2",
            title: "Client Satisfaction Leader",
            description: "Achieved highest client satisfaction rating",
            date: "2024-08-20",
            type: "recognition"
          }
        ],
        reviews: [
          {
            id: "1",
            reviewer: "John Smith",
            rating: 4.8,
            comments: "Excellent leadership and project management skills. Consistently delivers high-quality results.",
            date: "2024-09-01"
          }
        ],
        lastUpdated: "2024-10-15T10:30:00Z"
      },
      {
        id: "2",
        name: "Mike Chen",
        email: "mike.chen@trio.com",
        role: "Site Supervisor",
        avatar: "/avatars/mike.jpg",
        department: "Construction",
        overallRating: 4.6,
        metrics: {
          productivity: 88,
          quality: 94,
          timeliness: 85,
          collaboration: 90,
          innovation: 82
        },
        goals: [
          {
            id: "1",
            title: "Safety Record Improvement",
            description: "Maintain zero safety incidents for 6 months",
            target: 6,
            current: 4,
            unit: "months",
            dueDate: "2024-12-31",
            status: "on-track"
          }
        ],
        achievements: [
          {
            id: "1",
            title: "Safety Excellence",
            description: "Zero safety incidents for 4 consecutive months",
            date: "2024-10-01",
            type: "milestone"
          }
        ],
        reviews: [
          {
            id: "1",
            reviewer: "Sarah Johnson",
            rating: 4.6,
            comments: "Strong technical skills and excellent safety record. Great team player.",
            date: "2024-09-15"
          }
        ],
        lastUpdated: "2024-10-14T14:20:00Z"
      },
      {
        id: "3",
        name: "Lisa Wang",
        email: "lisa.wang@trio.com",
        role: "Accountant",
        avatar: "/avatars/lisa.jpg",
        department: "Finance",
        overallRating: 4.9,
        metrics: {
          productivity: 96,
          quality: 98,
          timeliness: 94,
          collaboration: 92,
          innovation: 85
        },
        goals: [
          {
            id: "1",
            title: "Process Automation",
            description: "Automate 80% of routine accounting tasks",
            target: 80,
            current: 60,
            unit: "%",
            dueDate: "2024-11-30",
            status: "on-track"
          }
        ],
        achievements: [
          {
            id: "1",
            title: "Process Innovation Award",
            description: "Developed new automated invoicing system",
            date: "2024-09-10",
            type: "award"
          }
        ],
        reviews: [
          {
            id: "1",
            reviewer: "Sarah Johnson",
            rating: 4.9,
            comments: "Exceptional attention to detail and process improvement. Highly reliable.",
            date: "2024-09-01"
          }
        ],
        lastUpdated: "2024-10-13T16:45:00Z"
      },
      {
        id: "4",
        name: "David Rodriguez",
        email: "david.rodriguez@trio.com",
        role: "Construction Worker",
        avatar: "/avatars/david.jpg",
        department: "Construction",
        overallRating: 4.4,
        metrics: {
          productivity: 85,
          quality: 88,
          timeliness: 82,
          collaboration: 90,
          innovation: 75
        },
        goals: [
          {
            id: "1",
            title: "Skill Development",
            description: "Complete electrical certification course",
            target: 100,
            current: 40,
            unit: "%",
            dueDate: "2024-12-15",
            status: "on-track"
          }
        ],
        achievements: [
          {
            id: "1",
            title: "Skill Advancement",
            description: "Completed advanced carpentry certification",
            date: "2024-08-15",
            type: "milestone"
          }
        ],
        reviews: [
          {
            id: "1",
            reviewer: "Mike Chen",
            rating: 4.4,
            comments: "Hardworking and reliable. Shows good potential for growth.",
            date: "2024-09-01"
          }
        ],
        lastUpdated: "2024-10-12T09:15:00Z"
      }
    ]);
  }, []);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'award': return Award;
      case 'milestone': return Target;
      case 'recognition': return Star;
      default: return Trophy;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  const filteredMembers = teamPerformance.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department.toLowerCase().includes(departmentFilter.toLowerCase());
    const matchesRating = ratingFilter === "all" || 
      (ratingFilter === "excellent" && member.overallRating >= 4.5) ||
      (ratingFilter === "good" && member.overallRating >= 4.0 && member.overallRating < 4.5) ||
      (ratingFilter === "needs-improvement" && member.overallRating < 4.0);
    return matchesSearch && matchesDepartment && matchesRating;
  });

  const stats = {
    totalMembers: teamPerformance.length,
    averageRating: teamPerformance.length > 0 ? teamPerformance.reduce((sum, m) => sum + m.overallRating, 0) / teamPerformance.length : 0,
    highPerformers: teamPerformance.filter(m => m.overallRating >= 4.5).length,
    goalsOnTrack: teamPerformance.reduce((sum, m) => sum + m.goals.filter(g => g.status === 'on-track').length, 0)
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Team Performance"
          description="Monitor and analyze team performance metrics"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "Team Management", href: "#" },
            { label: "Performance", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Performance</h1>
              <p className="text-gray-600 mt-1">Monitor and analyze team performance metrics</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => {
              const TrendIcon = getTrendIcon(metric.trend);
              return (
                <Card key={metric.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {metric.value}{metric.unit}
                        </p>
                        <p className="text-xs text-gray-500">Target: {metric.target}{metric.unit}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`} />
                        <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress 
                        value={(metric.value / metric.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Team Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
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

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Performers</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.highPerformers}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Goals On Track</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.goalsOnTrack}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
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
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="project">Project Management</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="excellent">Excellent (4.5+)</SelectItem>
                  <SelectItem value="good">Good (4.0-4.4)</SelectItem>
                  <SelectItem value="needs-improvement">Needs Improvement (&lt;4.0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Overview */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">Team Member</TableHead>
                      <TableHead className="font-semibold">Overall Rating</TableHead>
                      <TableHead className="font-semibold">Productivity</TableHead>
                      <TableHead className="font-semibold">Quality</TableHead>
                      <TableHead className="font-semibold">Timeliness</TableHead>
                      <TableHead className="font-semibold">Collaboration</TableHead>
                      <TableHead className="font-semibold">Goals</TableHead>
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
                              <div className="text-sm text-gray-500">{member.role}</div>
                              <div className="text-xs text-gray-400">{member.department}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className={`text-lg font-bold ${getRatingColor(member.overallRating)}`}>
                              {member.overallRating}
                            </span>
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(member.overallRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{member.metrics.productivity}%</span>
                            </div>
                            <Progress value={member.metrics.productivity} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{member.metrics.quality}%</span>
                            </div>
                            <Progress value={member.metrics.quality} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{member.metrics.timeliness}%</span>
                            </div>
                            <Progress value={member.metrics.timeliness} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{member.metrics.collaboration}%</span>
                            </div>
                            <Progress value={member.metrics.collaboration} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {member.goals.filter(g => g.status === 'on-track').length}/{member.goals.length} on track
                            </div>
                            <div className="text-xs text-gray-500">
                              {member.goals.filter(g => g.status === 'completed').length} completed
                            </div>
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
                                  <DialogTitle>{member.name} - Performance Details</DialogTitle>
                                  <DialogDescription>
                                    Complete performance overview for {member.role}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                                      <div className="space-y-3">
                                        {Object.entries(member.metrics).map(([key, value]) => (
                                          <div key={key} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                              <span className="capitalize">{key}</span>
                                              <span className="font-medium">{value}%</span>
                                            </div>
                                            <Progress value={value} className="h-2" />
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="space-y-4">
                                      <h4 className="font-medium text-gray-900">Goals</h4>
                                      <div className="space-y-3">
                                        {member.goals.map((goal) => (
                                          <div key={goal.id} className="p-3 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                              <h5 className="font-medium text-sm">{goal.title}</h5>
                                              <Badge className={getGoalStatusColor(goal.status)}>
                                                {goal.status.replace('-', ' ')}
                                              </Badge>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-2">{goal.description}</p>
                                            <div className="space-y-1">
                                              <div className="flex items-center justify-between text-xs">
                                                <span>Progress</span>
                                                <span>{goal.current}/{goal.target} {goal.unit}</span>
                                              </div>
                                              <Progress value={(goal.current / goal.target) * 100} className="h-1" />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Recent Achievements</h4>
                                    <div className="space-y-2">
                                      {member.achievements.map((achievement) => {
                                        const AchievementIcon = getAchievementIcon(achievement.type);
                                        return (
                                          <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                            <AchievementIcon className="h-4 w-4 text-yellow-600" />
                                            <div className="flex-1">
                                              <div className="text-sm font-medium">{achievement.title}</div>
                                              <div className="text-xs text-gray-600">{achievement.description}</div>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                              {new Date(achievement.date).toLocaleDateString()}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Recent Reviews</h4>
                                    <div className="space-y-3">
                                      {member.reviews.map((review) => (
                                        <div key={review.id} className="p-3 border rounded-lg">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">{review.reviewer}</span>
                                            <div className="flex items-center space-x-1">
                                              <span className="text-sm font-medium">{review.rating}</span>
                                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            </div>
                                          </div>
                                          <p className="text-sm text-gray-700">{review.comments}</p>
                                          <div className="text-xs text-gray-500 mt-1">
                                            {new Date(review.date).toLocaleDateString()}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="individual" className="space-y-4">
              <div className="text-center py-8">
                <User className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Individual Performance</h3>
                <p className="text-gray-600">Detailed individual performance analysis and development plans</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Performance Review
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Goal Management</h3>
                <p className="text-gray-600">Track and manage team goals and objectives</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Set New Goal
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Team performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                      <BarChart3 className="h-12 w-12 mr-2" />
                      <p className="text-lg">Performance charts coming soon!</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Department Comparison</CardTitle>
                    <CardDescription>Performance by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                      <PieChart className="h-12 w-12 mr-2" />
                      <p className="text-lg">Comparison charts coming soon!</p>
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
