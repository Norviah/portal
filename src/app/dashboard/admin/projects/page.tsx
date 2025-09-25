"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Calendar, 
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: string;
  teamSize: number;
}

export default function AdminProjectsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data
    setProjects([
      {
        id: "1",
        name: "Modern Home Renovation",
        client: "John Smith",
        status: "active",
        progress: 65,
        startDate: "2024-01-15",
        endDate: "2024-12-31",
        budget: 150000,
        spent: 97500,
        manager: "Sarah Johnson",
        teamSize: 8
      },
      {
        id: "2",
        name: "Office Building Construction",
        client: "ABC Corp",
        status: "planning",
        progress: 25,
        startDate: "2024-03-01",
        endDate: "2025-06-30",
        budget: 500000,
        spent: 125000,
        manager: "Mike Chen",
        teamSize: 15
      },
      {
        id: "3",
        name: "Retail Space Renovation",
        client: "XYZ Retail",
        status: "completed",
        progress: 100,
        startDate: "2023-09-01",
        endDate: "2024-02-28",
        budget: 75000,
        spent: 72000,
        manager: "Lisa Wang",
        teamSize: 5
      },
      {
        id: "4",
        name: "Warehouse Expansion",
        client: "Logistics Inc",
        status: "on-hold",
        progress: 40,
        startDate: "2024-02-01",
        endDate: "2024-08-31",
        budget: 200000,
        spent: 80000,
        manager: "David Brown",
        teamSize: 12
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'on-hold': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <SidebarProvider>
      <AppSidebar role="admin" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 min-h-screen">
        <DashboardHeader
          title="Project Management"
          description="Manage all projects across the organization"
          breadcrumbs={[
            { label: "Admin Dashboard", href: "/dashboard/admin" },
            { label: "Project Management", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Projects</h1>
              <p className="text-gray-600 mt-1">Manage and monitor all projects in the system</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
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
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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
                  <TabsTrigger value="active">Active Projects</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                        <TableHead className="font-semibold">Project</TableHead>
                        <TableHead className="font-semibold">Client</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Progress</TableHead>
                        <TableHead className="font-semibold">Budget</TableHead>
                        <TableHead className="font-semibold">Manager</TableHead>
                        <TableHead className="font-semibold">Team</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow key={project.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500">
                                {project.startDate} - {project.endDate}
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
                            <div className="flex items-center space-x-2">
                              <Progress value={project.progress} className="w-20 h-2" />
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">${project.spent.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">of ${project.budget.toLocaleString()}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{project.manager}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">{project.teamSize}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
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
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
                    <p className="text-gray-600">View and manage currently active projects</p>
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold mb-2">Completed Projects</h3>
                    <p className="text-gray-600">Review finished projects and their outcomes</p>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-semibold mb-2">Project Analytics</h3>
                    <p className="text-gray-600">Detailed analytics and reporting for all projects</p>
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
