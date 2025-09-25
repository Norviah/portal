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

import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar, 
  User,
  Folder,
  Image,
  File,
  Video,
  Archive,
  Star,
  Share,
  MoreHorizontal,
  Upload,
  Grid,
  List,
  Clock,
  CheckCircle,
  AlertTriangle,
  Camera
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface ProjectFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'archive' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  version: string;
  status: 'current' | 'outdated' | 'draft' | 'approved';
  category: 'contracts' | 'designs' | 'photos' | 'reports' | 'permits' | 'invoices' | 'other';
  description?: string;
  tags: string[];
  isShared: boolean;
  downloadCount: number;
  fileUrl: string;
  thumbnailUrl?: string;
}

export default function ClientFilesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock files data
    setFiles([
      {
        id: "1",
        name: "Project Contract - Modern Home Renovation.pdf",
        type: "document",
        size: "2.4 MB",
        uploadedBy: "Sarah Johnson",
        uploadedAt: "2024-09-01T10:30:00Z",
        lastModified: "2024-09-01T10:30:00Z",
        version: "1.0",
        status: "approved",
        category: "contracts",
        description: "Signed contract for the Modern Home Renovation project",
        tags: ["contract", "legal", "signed"],
        isShared: true,
        downloadCount: 3,
        fileUrl: "/files/contract.pdf"
      },
      {
        id: "2",
        name: "Kitchen Design - Final Approved.jpg",
        type: "image",
        size: "5.2 MB",
        uploadedBy: "Emma Thompson",
        uploadedAt: "2024-09-05T14:20:00Z",
        lastModified: "2024-09-05T14:20:00Z",
        version: "2.0",
        status: "approved",
        category: "designs",
        description: "Final approved kitchen design with all requested modifications",
        tags: ["design", "kitchen", "approved"],
        isShared: true,
        downloadCount: 8,
        fileUrl: "/files/kitchen-design.jpg",
        thumbnailUrl: "/thumbnails/kitchen-design.jpg"
      },
      {
        id: "3",
        name: "Progress Photos - Week 1.zip",
        type: "archive",
        size: "15.8 MB",
        uploadedBy: "Mike Chen",
        uploadedAt: "2024-09-08T16:45:00Z",
        lastModified: "2024-09-08T16:45:00Z",
        version: "1.0",
        status: "current",
        category: "photos",
        description: "Weekly progress photos from the first week of construction",
        tags: ["photos", "progress", "week1"],
        isShared: true,
        downloadCount: 2,
        fileUrl: "/files/progress-week1.zip"
      },
      {
        id: "4",
        name: "Building Permit - Approved.pdf",
        type: "document",
        size: "1.8 MB",
        uploadedBy: "Mike Chen",
        uploadedAt: "2024-09-10T09:15:00Z",
        lastModified: "2024-09-10T09:15:00Z",
        version: "1.0",
        status: "approved",
        category: "permits",
        description: "Approved building permit for the renovation project",
        tags: ["permit", "approved", "legal"],
        isShared: true,
        downloadCount: 1,
        fileUrl: "/files/building-permit.pdf"
      },
      {
        id: "5",
        name: "Material Invoice - September.pdf",
        type: "document",
        size: "892 KB",
        uploadedBy: "Lisa Wang",
        uploadedAt: "2024-09-15T11:30:00Z",
        lastModified: "2024-09-15T11:30:00Z",
        version: "1.0",
        status: "current",
        category: "invoices",
        description: "Invoice for materials purchased in September",
        tags: ["invoice", "materials", "september"],
        isShared: true,
        downloadCount: 0,
        fileUrl: "/files/material-invoice-sept.pdf"
      },
      {
        id: "6",
        name: "Progress Video - Demolition.mp4",
        type: "video",
        size: "45.2 MB",
        uploadedBy: "Mike Chen",
        uploadedAt: "2024-09-20T14:00:00Z",
        lastModified: "2024-09-20T14:00:00Z",
        version: "1.0",
        status: "current",
        category: "photos",
        description: "Time-lapse video of the demolition process",
        tags: ["video", "demolition", "timelapse"],
        isShared: true,
        downloadCount: 5,
        fileUrl: "/files/demolition-video.mp4",
        thumbnailUrl: "/thumbnails/demolition-video.jpg"
      },
      {
        id: "7",
        name: "Weekly Report - Week 3.docx",
        type: "document",
        size: "1.2 MB",
        uploadedBy: "Sarah Johnson",
        uploadedAt: "2024-09-22T10:00:00Z",
        lastModified: "2024-09-22T10:00:00Z",
        version: "1.0",
        status: "current",
        category: "reports",
        description: "Weekly progress report covering week 3 of construction",
        tags: ["report", "weekly", "progress"],
        isShared: true,
        downloadCount: 1,
        fileUrl: "/files/weekly-report-3.docx"
      },
      {
        id: "8",
        name: "Electrical Plan - Draft.pdf",
        type: "document",
        size: "3.1 MB",
        uploadedBy: "Mike Chen",
        uploadedAt: "2024-09-25T13:45:00Z",
        lastModified: "2024-09-25T13:45:00Z",
        version: "0.9",
        status: "draft",
        category: "designs",
        description: "Draft electrical plan - pending client review",
        tags: ["electrical", "plan", "draft"],
        isShared: true,
        downloadCount: 0,
        fileUrl: "/files/electrical-plan-draft.pdf"
      }
    ]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'archive': return Archive;
      default: return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'archive': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'outdated': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'contracts': return FileText;
      case 'designs': return Image;
      case 'photos': return Camera;
      case 'reports': return FileText;
      case 'permits': return FileText;
      case 'invoices': return FileText;
      default: return Folder;
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || file.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || file.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || file.status === statusFilter;
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const stats = {
    total: files.length,
    documents: files.filter(f => f.type === 'document').length,
    images: files.filter(f => f.type === 'image').length,
    videos: files.filter(f => f.type === 'video').length,
    totalSize: files.reduce((sum, f) => {
      const size = parseFloat(f.size.replace(/[^\d.]/g, ''));
      const unit = f.size.replace(/[\d.]/g, '');
      const multiplier = unit === 'KB' ? 1 : unit === 'MB' ? 1024 : unit === 'GB' ? 1024 * 1024 : 1;
      return sum + (size * multiplier);
    }, 0)
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' KB';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' GB';
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Files"
          description="Access and manage your project documents and media"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Overview", href: "#" },
            { label: "Files", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Files</h1>
              <p className="text-gray-600 mt-1">Access and manage your project documents and media</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
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
                    <p className="text-sm font-medium text-gray-600">Total Files</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.documents}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Images</p>
                    <p className="text-2xl font-bold text-green-600">{stats.images}</p>
                  </div>
                  <Image className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Videos</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.videos}</p>
                  </div>
                  <Video className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Size</p>
                    <p className="text-2xl font-bold text-orange-600">{formatFileSize(stats.totalSize)}</p>
                  </div>
                  <Archive className="h-8 w-8 text-orange-600" />
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
                    placeholder="Search files..."
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
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="archive">Archives</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="designs">Designs</SelectItem>
                  <SelectItem value="photos">Photos</SelectItem>
                  <SelectItem value="reports">Reports</SelectItem>
                  <SelectItem value="permits">Permits</SelectItem>
                  <SelectItem value="invoices">Invoices</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="outdated">Outdated</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Files Display */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="designs">Designs</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {viewMode === 'grid' ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredFiles.map((file) => {
                    const TypeIcon = getTypeIcon(file.type);
                    return (
                      <Card key={file.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <TypeIcon className="h-5 w-5 text-gray-400" />
                                <Badge className={getTypeColor(file.type)}>
                                  {file.type}
                                </Badge>
                              </div>
                              <Badge className={getStatusColor(file.status)}>
                                {file.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1">
                              <h4 className="font-medium text-sm line-clamp-2">{file.name}</h4>
                              {file.description && (
                                <p className="text-xs text-gray-500 line-clamp-2">{file.description}</p>
                              )}
                            </div>

                            <div className="space-y-1 text-xs text-gray-500">
                              <div className="flex items-center justify-between">
                                <span>Size: {file.size}</span>
                                <span>v{file.version}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>By: {file.uploadedBy}</span>
                                <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Size</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Uploaded By</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.map((file) => {
                        const TypeIcon = getTypeIcon(file.type);
                        const CategoryIcon = getCategoryIcon(file.category);
                        return (
                          <TableRow key={file.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <TypeIcon className="h-4 w-4 text-gray-400" />
                                  <span className="font-medium text-gray-900">{file.name}</span>
                                </div>
                                {file.description && (
                                  <div className="text-sm text-gray-500 line-clamp-1">{file.description}</div>
                                )}
                                <div className="flex flex-wrap gap-1">
                                  {file.tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {file.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{file.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getTypeColor(file.type)}>
                                {file.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <CategoryIcon className="h-4 w-4 text-gray-400" />
                                <span className="text-sm capitalize">{file.category}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">{file.size}</span>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(file.status)}>
                                {file.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">{file.uploadedBy}</span>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600">
                                {new Date(file.uploadedAt).toLocaleDateString()}
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
              )}
            </TabsContent>

            <TabsContent value="contracts" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Contract Files</h3>
                <p className="text-gray-600">View and download project contracts and legal documents</p>
              </div>
            </TabsContent>

            <TabsContent value="designs" className="space-y-4">
              <div className="text-center py-8">
                <Image className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Design Files</h3>
                <p className="text-gray-600">Access project designs, blueprints, and visual materials</p>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <div className="text-center py-8">
                <Camera className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">Photo Gallery</h3>
                <p className="text-gray-600">Browse project photos and progress images</p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-lg font-semibold mb-2">Project Reports</h3>
                <p className="text-gray-600">Download weekly reports and project updates</p>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-semibold mb-2">Recent Files</h3>
                <p className="text-gray-600">Recently uploaded and modified files</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
