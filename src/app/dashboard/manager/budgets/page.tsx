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
import { Progress } from "@/components/ui/Progress";
import { Textarea } from "@/components/ui/Textarea";

import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Shield,
  FileText,
  MoreHorizontal,
  Save,
  Download,
  Upload,
  Eye
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Budget {
  id: string;
  name: string;
  description: string;
  projectName: string;
  projectId: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  status: 'on-track' | 'at-risk' | 'over-budget' | 'completed';
  category: 'project' | 'operational' | 'equipment' | 'materials' | 'labor';
  startDate: string;
  endDate: string;
  lastUpdated: string;
  createdBy: string;
  lineItems: Array<{
    id: string;
    name: string;
    description: string;
    budgeted: number;
    actual: number;
    variance: number;
    status: 'on-track' | 'over-budget' | 'under-budget';
    category: string;
  }>;
  alerts: Array<{
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    date: string;
  }>;
}

export default function ManagerBudgetsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [newBudget, setNewBudget] = useState({
    name: '',
    description: '',
    projectName: '',
    totalBudget: 0,
    category: 'project' as const,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock budgets data
    setBudgets([
      {
        id: "1",
        name: "Modern Home Renovation Budget",
        description: "Complete budget for kitchen and living room renovation",
        projectName: "Modern Home Renovation",
        projectId: "proj-1",
        totalBudget: 75000,
        spent: 45000,
        remaining: 30000,
        status: "on-track",
        category: "project",
        startDate: "2024-09-01",
        endDate: "2024-12-31",
        lastUpdated: "2024-10-15T10:30:00Z",
        createdBy: "Sarah Johnson",
        lineItems: [
          {
            id: "1",
            name: "Materials",
            description: "Construction materials and supplies",
            budgeted: 30000,
            actual: 28000,
            variance: -2000,
            status: "under-budget",
            category: "Materials"
          },
          {
            id: "2",
            name: "Labor",
            description: "Construction team wages",
            budgeted: 25000,
            actual: 12000,
            variance: -13000,
            status: "under-budget",
            category: "Labor"
          },
          {
            id: "3",
            name: "Equipment",
            description: "Tool rental and equipment costs",
            budgeted: 5000,
            actual: 5000,
            variance: 0,
            status: "on-track",
            category: "Equipment"
          },
          {
            id: "4",
            name: "Permits",
            description: "Building permits and inspections",
            budgeted: 2000,
            actual: 2000,
            variance: 0,
            status: "on-track",
            category: "Permits"
          },
          {
            id: "5",
            name: "Contingency",
            description: "Emergency fund for unexpected costs",
            budgeted: 13000,
            actual: 8000,
            variance: -5000,
            status: "under-budget",
            category: "Contingency"
          }
        ],
        alerts: [
          {
            id: "1",
            type: "info",
            message: "Budget is on track with 60% completion",
            date: "2024-10-15T10:30:00Z"
          }
        ]
      },
      {
        id: "2",
        name: "Office Space Fit-out Budget",
        description: "Complete budget for office renovation and fit-out",
        projectName: "Office Space Fit-out",
        projectId: "proj-2",
        totalBudget: 150000,
        spent: 120000,
        remaining: 30000,
        status: "at-risk",
        category: "project",
        startDate: "2024-08-01",
        endDate: "2024-11-30",
        lastUpdated: "2024-10-14T14:20:00Z",
        createdBy: "Mike Chen",
        lineItems: [
          {
            id: "1",
            name: "Materials",
            description: "Construction materials and supplies",
            budgeted: 60000,
            actual: 65000,
            variance: 5000,
            status: "over-budget",
            category: "Materials"
          },
          {
            id: "2",
            name: "Labor",
            description: "Construction team wages",
            budgeted: 50000,
            actual: 35000,
            variance: -15000,
            status: "under-budget",
            category: "Labor"
          },
          {
            id: "3",
            name: "Equipment",
            description: "Tool rental and equipment costs",
            budgeted: 10000,
            actual: 8000,
            variance: -2000,
            status: "under-budget",
            category: "Equipment"
          },
          {
            id: "4",
            name: "Furniture",
            description: "Office furniture and fixtures",
            budgeted: 20000,
            actual: 12000,
            variance: -8000,
            status: "under-budget",
            category: "Furniture"
          },
          {
            id: "5",
            name: "Contingency",
            description: "Emergency fund for unexpected costs",
            budgeted: 10000,
            actual: 10000,
            variance: 0,
            status: "on-track",
            category: "Contingency"
          }
        ],
        alerts: [
          {
            id: "1",
            type: "warning",
            message: "Materials budget exceeded by $5,000",
            date: "2024-10-14T14:20:00Z"
          },
          {
            id: "2",
            type: "info",
            message: "Budget utilization at 80% with 2 months remaining",
            date: "2024-10-14T14:20:00Z"
          }
        ]
      },
      {
        id: "3",
        name: "Q4 Operational Budget",
        description: "Quarterly operational expenses and overhead",
        projectName: "General Operations",
        projectId: "proj-ops",
        totalBudget: 50000,
        spent: 35000,
        remaining: 15000,
        status: "on-track",
        category: "operational",
        startDate: "2024-10-01",
        endDate: "2024-12-31",
        lastUpdated: "2024-10-13T16:45:00Z",
        createdBy: "Lisa Wang",
        lineItems: [
          {
            id: "1",
            name: "Office Rent",
            description: "Monthly office rent and utilities",
            budgeted: 15000,
            actual: 15000,
            variance: 0,
            status: "on-track",
            category: "Rent"
          },
          {
            id: "2",
            name: "Insurance",
            description: "Business insurance premiums",
            budgeted: 5000,
            actual: 5000,
            variance: 0,
            status: "on-track",
            category: "Insurance"
          },
          {
            id: "3",
            name: "Marketing",
            description: "Marketing and advertising expenses",
            budgeted: 10000,
            actual: 8000,
            variance: -2000,
            status: "under-budget",
            category: "Marketing"
          },
          {
            id: "4",
            name: "Equipment Maintenance",
            description: "Equipment maintenance and repairs",
            budgeted: 5000,
            actual: 2000,
            variance: -3000,
            status: "under-budget",
            category: "Maintenance"
          },
          {
            id: "5",
            name: "Contingency",
            description: "Emergency fund for unexpected costs",
            budgeted: 15000,
            actual: 5000,
            variance: -10000,
            status: "under-budget",
            category: "Contingency"
          }
        ],
        alerts: [
          {
            id: "1",
            type: "info",
            message: "Operational budget is on track with 70% utilization",
            date: "2024-10-13T16:45:00Z"
          }
        ]
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800 border-green-200';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'over-budget': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project': return 'bg-blue-100 text-blue-800';
      case 'operational': return 'bg-green-100 text-green-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      case 'materials': return 'bg-orange-100 text-orange-800';
      case 'labor': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      case 'info': return CheckCircle;
      default: return CheckCircle;
    }
  };

  const filteredBudgets = budgets.filter(budget => {
    const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || budget.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || budget.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateBudget = () => {
    const newBudgetData: Budget = {
      id: Date.now().toString(),
      name: newBudget.name,
      description: newBudget.description,
      projectName: newBudget.projectName,
      projectId: "proj-" + Date.now(),
      totalBudget: newBudget.totalBudget,
      spent: 0,
      remaining: newBudget.totalBudget,
      status: "on-track",
      category: newBudget.category,
      startDate: newBudget.startDate,
      endDate: newBudget.endDate,
      lastUpdated: new Date().toISOString(),
      createdBy: user?.name || "Manager",
      lineItems: [],
      alerts: []
    };
    setBudgets([newBudgetData, ...budgets]);
    setNewBudget({
      name: '',
      description: '',
      projectName: '',
      totalBudget: 0,
      category: 'project',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  const stats = {
    totalBudgets: budgets.length,
    totalBudget: budgets.reduce((sum, b) => sum + b.totalBudget, 0),
    totalSpent: budgets.reduce((sum, b) => sum + b.spent, 0),
    totalRemaining: budgets.reduce((sum, b) => sum + b.remaining, 0),
    onTrack: budgets.filter(b => b.status === 'on-track').length,
    atRisk: budgets.filter(b => b.status === 'at-risk').length,
    overBudget: budgets.filter(b => b.status === 'over-budget').length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Budget Management"
          description="Monitor and manage project budgets and expenses"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "Financial Management", href: "#" },
            { label: "Budgets", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage project budgets and expenses</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    New Budget
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                      Set up a new budget for a project or operational expense
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Budget Name *</label>
                        <Input
                          placeholder="Enter budget name"
                          value={newBudget.name}
                          onChange={(e) => setNewBudget({...newBudget, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Category *</label>
                        <Select value={newBudget.category} onValueChange={(value: any) => setNewBudget({...newBudget, category: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="operational">Operational</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="materials">Materials</SelectItem>
                            <SelectItem value="labor">Labor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <Textarea
                        placeholder="Enter budget description"
                        value={newBudget.description}
                        onChange={(e) => setNewBudget({...newBudget, description: e.target.value})}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Project Name *</label>
                        <Input
                          placeholder="Enter project name"
                          value={newBudget.projectName}
                          onChange={(e) => setNewBudget({...newBudget, projectName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Total Budget *</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={newBudget.totalBudget}
                          onChange={(e) => setNewBudget({...newBudget, totalBudget: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Start Date *</label>
                        <Input
                          type="date"
                          value={newBudget.startDate}
                          onChange={(e) => setNewBudget({...newBudget, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">End Date *</label>
                        <Input
                          type="date"
                          value={newBudget.endDate}
                          onChange={(e) => setNewBudget({...newBudget, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button 
                        onClick={handleCreateBudget} 
                        disabled={!newBudget.name || !newBudget.projectName || !newBudget.totalBudget}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Create Budget
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalBudget.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-orange-600">${stats.totalSpent.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-green-600">${stats.totalRemaining.toLocaleString()}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Utilization</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {stats.totalBudget > 0 ? Math.round((stats.totalSpent / stats.totalBudget) * 100) : 0}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Overview */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">On Track</p>
                    <p className="text-2xl font-bold text-green-600">{stats.onTrack}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">At Risk</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.atRisk}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Over Budget</p>
                    <p className="text-2xl font-bold text-red-600">{stats.overBudget}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
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
                    placeholder="Search budgets..."
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
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="on-track">On Track</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="over-budget">Over Budget</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="labor">Labor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budgets List */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="line-items">Line Items</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredBudgets.map((budget) => {
                  const utilization = (budget.spent / budget.totalBudget) * 100;
                  return (
                    <Card key={budget.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{budget.name}</CardTitle>
                            <CardDescription>{budget.projectName}</CardDescription>
                          </div>
                          <div className="flex space-x-1">
                            <Badge className={getStatusColor(budget.status)}>
                              {budget.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={getCategoryColor(budget.category)}>
                              {budget.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Total Budget</span>
                            <span className="font-medium">${budget.totalBudget.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Spent</span>
                            <span className="font-medium">${budget.spent.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Remaining</span>
                            <span className="font-medium">${budget.remaining.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Utilization</span>
                            <span className="font-medium">{utilization.toFixed(1)}%</span>
                          </div>
                          <Progress value={utilization} className="h-2" />
                        </div>

                        {budget.alerts.length > 0 && (
                          <div className="space-y-1">
                            {budget.alerts.slice(0, 2).map((alert) => {
                              const AlertIcon = getAlertIcon(alert.type);
                              return (
                                <div key={alert.id} className="flex items-center space-x-2 text-xs">
                                  <AlertIcon className="h-3 w-3 text-yellow-600" />
                                  <span className="text-gray-600 line-clamp-1">{alert.message}</span>
                                </div>
                              );
                            })}
                            {budget.alerts.length > 2 && (
                              <div className="text-xs text-gray-500">+{budget.alerts.length - 2} more alerts</div>
                            )}
                          </div>
                        )}

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
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">Budget</TableHead>
                      <TableHead className="font-semibold">Project</TableHead>
                      <TableHead className="font-semibold">Total Budget</TableHead>
                      <TableHead className="font-semibold">Spent</TableHead>
                      <TableHead className="font-semibold">Remaining</TableHead>
                      <TableHead className="font-semibold">Utilization</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBudgets.map((budget) => {
                      const utilization = (budget.spent / budget.totalBudget) * 100;
                      return (
                        <TableRow key={budget.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-900">{budget.name}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{budget.description}</div>
                              <div className="flex items-center space-x-1">
                                <Badge className={getCategoryColor(budget.category)}>
                                  {budget.category}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{budget.projectName}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">${budget.totalBudget.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">${budget.spent.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">${budget.remaining.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{utilization.toFixed(1)}%</div>
                              <Progress value={utilization} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(budget.status)}>
                              {budget.status.replace('-', ' ')}
                            </Badge>
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
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="line-items" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Line Items</h3>
                <p className="text-gray-600">Detailed breakdown of budget line items and expenses</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Line Item
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Budget Status Distribution</CardTitle>
                    <CardDescription>Distribution of budgets by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['on-track', 'at-risk', 'over-budget', 'completed'].map((status) => {
                        const count = budgets.filter(b => b.status === status).length;
                        const percentage = budgets.length > 0 ? (count / budgets.length) * 100 : 0;
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
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
                    <CardTitle>Category Distribution</CardTitle>
                    <CardDescription>Budgets by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['project', 'operational', 'equipment', 'materials', 'labor'].map((category) => {
                        const count = budgets.filter(b => b.category === category).length;
                        const percentage = budgets.length > 0 ? (count / budgets.length) * 100 : 0;
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{category}</span>
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
