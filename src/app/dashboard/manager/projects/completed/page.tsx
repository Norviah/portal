"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Star, 
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  MessageSquare,
  Award,
  TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface CompletedProject {
  id: string;
  name: string;
  client: string;
  status: 'completed' | 'delivered' | 'archived';
  completionDate: string;
  startDate: string;
  duration: number; // in days
  budget: number;
  finalCost: number;
  profit: number;
  profitMargin: number;
  teamSize: number;
  clientRating: number;
  managerRating: number;
  description: string;
  achievements: string[];
  lessonsLearned: string[];
  nextSteps?: string;
}

export default function ManagerCompletedProjectsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<CompletedProject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("completionDate");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock completed projects data
    setProjects([
      {
        id: "1",
        name: "Retail Space Renovation",
        client: "XYZ Retail",
        status: "completed",
        completionDate: "2024-02-28",
        startDate: "2023-09-01",
        duration: 180,
        budget: 75000,
        finalCost: 72000,
        profit: 3000,
        profitMargin: 4.2,
        teamSize: 5,
        clientRating: 4.8,
        managerRating: 4.5,
        description: "Complete renovation of a 2,000 sq ft retail space including flooring, lighting, and fixtures",
        achievements: [
          "Completed 2 weeks ahead of schedule",
          "Under budget by $3,000",
          "Zero safety incidents",
          "Client satisfaction score: 4.8/5"
        ],
        lessonsLearned: [
          "Early client communication prevents delays",
          "Prefabricated components saved time",
          "Regular progress photos improved client confidence"
        ],
        nextSteps: "Follow up on maintenance contract"
      },
      {
        id: "2",
        name: "Office Building Lobby",
        client: "ABC Corp",
        status: "delivered",
        completionDate: "2024-01-15",
        startDate: "2023-10-01",
        duration: 107,
        budget: 120000,
        finalCost: 118500,
        profit: 1500,
        profitMargin: 1.3,
        teamSize: 8,
        clientRating: 4.6,
        managerRating: 4.2,
        description: "Modern lobby renovation with reception area, waiting room, and conference facilities",
        achievements: [
          "High-end finishes within budget",
          "Minimal disruption to business operations",
          "Excellent team coordination"
        ],
        lessonsLearned: [
          "Staging work in phases reduces business impact",
          "Premium materials justified the cost",
          "Client involvement in design decisions was crucial"
        ]
      },
      {
        id: "3",
        name: "Residential Kitchen Remodel",
        client: "Smith Family",
        status: "archived",
        completionDate: "2023-12-20",
        startDate: "2023-08-15",
        duration: 127,
        budget: 45000,
        finalCost: 46500,
        profit: -1500,
        profitMargin: -3.2,
        teamSize: 4,
        clientRating: 4.9,
        managerRating: 4.7,
        description: "Complete kitchen renovation with custom cabinets, granite countertops, and new appliances",
        achievements: [
          "Exceptional client satisfaction (4.9/5)",
          "High-quality craftsmanship",
          "Strong client relationship maintained"
        ],
        lessonsLearned: [
          "Custom work requires more accurate time estimates",
          "Client change orders significantly impact budget",
          "Quality work leads to referrals despite cost overrun"
        ],
        nextSteps: "Client referred 2 new projects"
      },
      {
        id: "4",
        name: "Warehouse Expansion",
        client: "Logistics Inc",
        status: "completed",
        completionDate: "2023-11-30",
        startDate: "2023-06-01",
        duration: 182,
        budget: 200000,
        finalCost: 195000,
        profit: 5000,
        profitMargin: 2.6,
        teamSize: 12,
        clientRating: 4.7,
        managerRating: 4.4,
        description: "20,000 sq ft warehouse expansion with loading docks and office space",
        achievements: [
          "Large-scale project completed on time",
          "Excellent safety record",
          "Strong team performance"
        ],
        lessonsLearned: [
          "Large teams require more coordination",
          "Weather delays can impact outdoor work",
          "Client communication is critical for large projects"
        ]
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProfitColor = (profit: number) => {
    if (profit > 0) return 'text-green-600';
    if (profit < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'completionDate':
        return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
      case 'profit':
        return b.profit - a.profit;
      case 'clientRating':
        return b.clientRating - a.clientRating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const totalRevenue = projects.reduce((sum, p) => sum + p.finalCost, 0);
  const totalProfit = projects.reduce((sum, p) => sum + p.profit, 0);
  const averageRating = projects.reduce((sum, p) => sum + p.clientRating, 0) / projects.length;
  const onTimeProjects = projects.filter(p => p.status === 'completed' || p.status === 'delivered').length;

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Completed Projects"
          description="Review and analyze your completed projects"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "My Projects", href: "#" },
            { label: "Completed Projects", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
                <p className="text-xs text-gray-600">Projects finished</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-gray-600">From completed projects</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getProfitColor(totalProfit)}`}>
                  ${totalProfit.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">Net profit margin</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1">
                  <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                  <div className="flex">{getRatingStars(averageRating)}</div>
                </div>
                <p className="text-xs text-gray-600">Client satisfaction</p>
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
                    placeholder="Search completed projects..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completionDate">Completion Date</SelectItem>
                  <SelectItem value="profit">Profit</SelectItem>
                  <SelectItem value="clientRating">Client Rating</SelectItem>
                  <SelectItem value="name">Project Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="lessons">Lessons Learned</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                        <TableHead className="font-semibold">Project</TableHead>
                        <TableHead className="font-semibold">Client</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Duration</TableHead>
                        <TableHead className="font-semibold">Final Cost</TableHead>
                        <TableHead className="font-semibold">Profit</TableHead>
                        <TableHead className="font-semibold">Rating</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedProjects.map((project) => (
                        <TableRow key={project.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500">
                                Completed {new Date(project.completionDate).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{project.client}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">{project.duration} days</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">
                              ${project.finalCost.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              Budget: ${project.budget.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`text-sm font-medium ${getProfitColor(project.profit)}`}>
                              ${project.profit.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {project.profitMargin > 0 ? '+' : ''}{project.profitMargin.toFixed(1)}%
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <div className="flex">{getRatingStars(project.clientRating)}</div>
                              <span className="text-sm ml-1">{project.clientRating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span>Performance Metrics</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">On-Time Delivery</span>
                            <span className="font-medium">{onTimeProjects}/{projects.length} projects</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Average Duration</span>
                            <span className="font-medium">
                              {Math.round(projects.reduce((sum, p) => sum + p.duration, 0) / projects.length)} days
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Average Team Size</span>
                            <span className="font-medium">
                              {Math.round(projects.reduce((sum, p) => sum + p.teamSize, 0) / projects.length)} members
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                          <span>Financial Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total Budget</span>
                            <span className="font-medium">${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total Spent</span>
                            <span className="font-medium">${totalRevenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Net Profit</span>
                            <span className={`font-medium ${getProfitColor(totalProfit)}`}>
                              ${totalProfit.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Avg Profit Margin</span>
                            <span className={`font-medium ${getProfitColor(totalProfit)}`}>
                              {((totalProfit / totalRevenue) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="lessons" className="space-y-4">
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.client} • Completed {new Date(project.completionDate).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium text-green-600 mb-2">Key Achievements</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {project.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start">
                                  <Award className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-600 mb-2">Lessons Learned</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {project.lessonsLearned.map((lesson, index) => (
                                <li key={index} className="flex items-start">
                                  <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {project.nextSteps && (
                            <div>
                              <h4 className="font-medium text-purple-600 mb-2">Next Steps</h4>
                              <p className="text-sm text-gray-600">{project.nextSteps}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-semibold mb-2">Project Reports</h3>
                    <p className="text-gray-600">Generate detailed reports and analytics</p>
                    <div className="mt-4 space-x-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                      <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
