"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  Eye, 
  Download,
  Upload,
  Star,
  Clock,
  Users,
  DollarSign,
  FileText,
  Building,
  Home,
  Wrench,
  Settings,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'residential' | 'commercial' | 'renovation' | 'maintenance';
  type: 'standard' | 'custom' | 'premium';
  estimatedDuration: number;
  estimatedBudget: number;
  teamSize: number;
  phases: string[];
  requirements: string[];
  milestones: Array<{
    name: string;
    duration: number;
    description: string;
    dependencies: string[];
  }>;
  isDefault: boolean;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  lastUsed: string;
  usageCount: number;
  rating: number;
  tags: string[];
}

export default function ManagerTemplatesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock templates data
    setTemplates([
      {
        id: "1",
        name: "Residential Renovation",
        description: "Complete home renovation template with standard phases for residential projects",
        category: "residential",
        type: "standard",
        estimatedDuration: 90,
        estimatedBudget: 75000,
        teamSize: 6,
        phases: ["Planning & Design", "Permits & Approvals", "Demolition", "Construction", "Finishing", "Final Walkthrough"],
        requirements: [
          "Client approval on all design decisions",
          "Regular progress photos",
          "Weekly status meetings",
          "Quality inspections at each phase"
        ],
        milestones: [
          { name: "Design Approval", duration: 14, description: "Client approves final design", dependencies: [] },
          { name: "Permits Obtained", duration: 21, description: "All necessary permits secured", dependencies: ["Design Approval"] },
          { name: "Demolition Complete", duration: 7, description: "Old structures removed", dependencies: ["Permits Obtained"] },
          { name: "Construction Complete", duration: 35, description: "Main construction work finished", dependencies: ["Demolition Complete"] },
          { name: "Finishing Complete", duration: 10, description: "Final touches and cleanup", dependencies: ["Construction Complete"] }
        ],
        isDefault: true,
        isPublic: true,
        createdBy: "System",
        createdAt: "2024-01-01T00:00:00Z",
        lastUsed: "2024-10-05T14:30:00Z",
        usageCount: 24,
        rating: 4.8,
        tags: ["residential", "renovation", "standard"]
      },
      {
        id: "2",
        name: "Commercial Office Fit-out",
        description: "Modern office space construction and fit-out template for commercial projects",
        category: "commercial",
        type: "premium",
        estimatedDuration: 120,
        estimatedBudget: 150000,
        teamSize: 10,
        phases: ["Design & Planning", "Permits", "Construction", "Systems Installation", "Furnishing", "Handover"],
        requirements: [
          "ADA compliance verification",
          "Fire safety inspections",
          "IT infrastructure planning",
          "Client walkthroughs at each phase"
        ],
        milestones: [
          { name: "Design Complete", duration: 21, description: "Architectural and MEP designs finalized", dependencies: [] },
          { name: "Permits Approved", duration: 30, description: "Building permits and approvals obtained", dependencies: ["Design Complete"] },
          { name: "Construction Complete", duration: 45, description: "Core construction work finished", dependencies: ["Permits Approved"] },
          { name: "Systems Installed", duration: 15, description: "HVAC, electrical, and plumbing systems", dependencies: ["Construction Complete"] },
          { name: "Furnishing Complete", duration: 7, description: "Furniture and fixtures installed", dependencies: ["Systems Installed"] }
        ],
        isDefault: true,
        isPublic: true,
        createdBy: "System",
        createdAt: "2024-01-01T00:00:00Z",
        lastUsed: "2024-09-28T10:15:00Z",
        usageCount: 18,
        rating: 4.6,
        tags: ["commercial", "office", "premium"]
      },
      {
        id: "3",
        name: "Kitchen Renovation",
        description: "Focused kitchen renovation template for residential projects",
        category: "renovation",
        type: "standard",
        estimatedDuration: 45,
        estimatedBudget: 35000,
        teamSize: 4,
        phases: ["Design", "Demolition", "Plumbing & Electrical", "Installation", "Finishing"],
        requirements: [
          "Appliance specifications confirmed",
          "Cabinet measurements verified",
          "Countertop material selection",
          "Client approval on all finishes"
        ],
        milestones: [
          { name: "Design Approved", duration: 7, description: "Kitchen layout and finishes approved", dependencies: [] },
          { name: "Demolition Complete", duration: 3, description: "Old kitchen removed", dependencies: ["Design Approved"] },
          { name: "Rough-in Complete", duration: 5, description: "Plumbing and electrical rough-in", dependencies: ["Demolition Complete"] },
          { name: "Installation Complete", duration: 20, description: "Cabinets, appliances, and fixtures installed", dependencies: ["Rough-in Complete"] },
          { name: "Finishing Complete", duration: 10, description: "Final touches and cleanup", dependencies: ["Installation Complete"] }
        ],
        isDefault: false,
        isPublic: true,
        createdBy: "Sarah Johnson",
        createdAt: "2024-03-15T00:00:00Z",
        lastUsed: "2024-10-01T16:45:00Z",
        usageCount: 12,
        rating: 4.9,
        tags: ["kitchen", "renovation", "residential"]
      },
      {
        id: "4",
        name: "Retail Store Construction",
        description: "Complete retail store construction and fit-out template",
        category: "commercial",
        type: "standard",
        estimatedDuration: 60,
        estimatedBudget: 80000,
        teamSize: 6,
        phases: ["Design", "Permits", "Construction", "Fixtures", "Signage", "Opening"],
        requirements: [
          "Brand compliance verification",
          "Accessibility requirements met",
          "Security system installation",
          "Grand opening coordination"
        ],
        milestones: [
          { name: "Design Complete", duration: 14, description: "Store layout and design approved", dependencies: [] },
          { name: "Permits Obtained", duration: 21, description: "Building and business permits", dependencies: ["Design Complete"] },
          { name: "Construction Complete", duration: 20, description: "Core construction finished", dependencies: ["Permits Obtained"] },
          { name: "Fixtures Installed", duration: 3, description: "Retail fixtures and displays", dependencies: ["Construction Complete"] },
          { name: "Ready for Opening", duration: 2, description: "Final preparations and inspections", dependencies: ["Fixtures Installed"] }
        ],
        isDefault: false,
        isPublic: false,
        createdBy: "Mike Chen",
        createdAt: "2024-05-20T00:00:00Z",
        lastUsed: "2024-08-15T09:30:00Z",
        usageCount: 3,
        rating: 4.7,
        tags: ["retail", "commercial", "construction"]
      },
      {
        id: "5",
        name: "Bathroom Renovation",
        description: "Complete bathroom renovation template for residential projects",
        category: "renovation",
        type: "standard",
        estimatedDuration: 21,
        estimatedBudget: 25000,
        teamSize: 3,
        phases: ["Design", "Demolition", "Plumbing", "Installation", "Finishing"],
        requirements: [
          "Fixture specifications confirmed",
          "Tile and finish selections",
          "Waterproofing verification",
          "Client approval on all materials"
        ],
        milestones: [
          { name: "Design Approved", duration: 5, description: "Bathroom design and materials approved", dependencies: [] },
          { name: "Demolition Complete", duration: 2, description: "Old bathroom removed", dependencies: ["Design Approved"] },
          { name: "Plumbing Complete", duration: 3, description: "New plumbing installed", dependencies: ["Demolition Complete"] },
          { name: "Installation Complete", duration: 8, description: "Fixtures and finishes installed", dependencies: ["Plumbing Complete"] },
          { name: "Finishing Complete", duration: 3, description: "Final touches and cleanup", dependencies: ["Installation Complete"] }
        ],
        isDefault: false,
        isPublic: true,
        createdBy: "Lisa Wang",
        createdAt: "2024-06-10T00:00:00Z",
        lastUsed: "2024-09-20T14:20:00Z",
        usageCount: 8,
        rating: 4.8,
        tags: ["bathroom", "renovation", "residential"]
      }
    ]);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'residential': return Home;
      case 'commercial': return Building;
      case 'renovation': return Wrench;
      case 'maintenance': return Settings;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'standard': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'custom': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesType = typeFilter === "all" || template.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleUseTemplate = (templateId: string) => {
    // Navigate to new project page with template pre-filled
    window.location.href = `/dashboard/manager/projects/new?template=${templateId}`;
  };

  const handleDuplicateTemplate = (templateId: string) => {
    console.log("Duplicating template:", templateId);
    // Implement duplication logic
  };

  const handleEditTemplate = (templateId: string) => {
    console.log("Editing template:", templateId);
    // Navigate to template editor
  };

  const handleDeleteTemplate = (templateId: string) => {
    console.log("Deleting template:", templateId);
    // Implement deletion logic
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Templates"
          description="Manage and use project templates to streamline project creation"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "My Projects", href: "#" },
            { label: "Project Templates", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Templates</h1>
              <p className="text-gray-600 mt-1">Use and manage project templates to streamline your workflow</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <Settings className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Templates Grid */}
          <Tabs defaultValue="grid" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="my-templates">My Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => {
                  const Icon = getCategoryIcon(template.category);
                  return (
                    <Card key={template.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                          </div>
                          <div className="flex items-center space-x-1">
                            {template.isDefault && (
                              <Badge variant="outline" className="text-xs">
                                Default
                              </Badge>
                            )}
                            <Badge className={getTypeColor(template.type)}>
                              {template.type}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{template.estimatedDuration} days</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span>${template.estimatedBudget.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{template.teamSize} members</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-gray-400" />
                            <span>{template.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs text-gray-600">Phases:</div>
                          <div className="flex flex-wrap gap-1">
                            {template.phases.slice(0, 3).map((phase, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {phase}
                              </Badge>
                            ))}
                            {template.phases.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.phases.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Used {template.usageCount} times</span>
                          <span>Last used {new Date(template.lastUsed).toLocaleDateString()}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleUseTemplate(template.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Use Template
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">Template</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Duration</TableHead>
                      <TableHead className="font-semibold">Budget</TableHead>
                      <TableHead className="font-semibold">Rating</TableHead>
                      <TableHead className="font-semibold">Usage</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTemplates.map((template) => {
                      const Icon = getCategoryIcon(template.category);
                      return (
                        <TableRow key={template.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Icon className="h-5 w-5 text-blue-600" />
                              <div>
                                <div className="font-medium text-gray-900">{template.name}</div>
                                <div className="text-sm text-gray-500">{template.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(template.type)}>
                              {template.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">{template.estimatedDuration} days</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">${template.estimatedBudget.toLocaleString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <div className="flex">{getRatingStars(template.rating)}</div>
                              <span className="text-sm ml-1">{template.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{template.usageCount} times</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleUseTemplate(template.id)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDuplicateTemplate(template.id)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                                <Trash2 className="h-4 w-4" />
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

            <TabsContent value="my-templates" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">My Custom Templates</h3>
                <p className="text-gray-600">Create and manage your own project templates</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Template
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
