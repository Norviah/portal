"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Shield,
  Users,
  User,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'client';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  projects: number;
  avatar?: string;
}

export default function AdminUsersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data
    setUsers([
      {
        id: "1",
        name: "Admin User",
        email: "admin@trio.com",
        role: "admin",
        status: "active",
        lastLogin: "2024-10-08T10:30:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        projects: 12,
        avatar: "/avatars/admin.jpg"
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@trio.com",
        role: "manager",
        status: "active",
        lastLogin: "2024-10-08T09:15:00Z",
        createdAt: "2024-01-15T00:00:00Z",
        projects: 5,
        avatar: "/avatars/manager.jpg"
      },
      {
        id: "3",
        name: "Mike Chen",
        email: "mike@trio.com",
        role: "manager",
        status: "active",
        lastLogin: "2024-10-07T16:45:00Z",
        createdAt: "2024-02-01T00:00:00Z",
        projects: 3,
        avatar: "/avatars/manager2.jpg"
      },
      {
        id: "4",
        name: "John Smith",
        email: "john@client.com",
        role: "client",
        status: "active",
        lastLogin: "2024-10-08T08:30:00Z",
        createdAt: "2024-03-01T00:00:00Z",
        projects: 1,
        avatar: "/avatars/client.jpg"
      },
      {
        id: "5",
        name: "Jane Doe",
        email: "jane@client.com",
        role: "client",
        status: "pending",
        lastLogin: "2024-10-05T14:20:00Z",
        createdAt: "2024-10-05T00:00:00Z",
        projects: 0,
        avatar: "/avatars/client2.jpg"
      },
      {
        id: "6",
        name: "Bob Wilson",
        email: "bob@client.com",
        role: "client",
        status: "inactive",
        lastLogin: "2024-09-15T11:00:00Z",
        createdAt: "2024-04-01T00:00:00Z",
        projects: 1,
        avatar: "/avatars/client3.jpg"
      }
    ]);
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'client': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'inactive': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <SidebarProvider>
      <AppSidebar role="admin" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20 min-h-screen">
        <DashboardHeader
          title="User Management"
          description="Manage user accounts and permissions across the system"
          breadcrumbs={[
            { label: "Admin Dashboard", href: "/dashboard/admin" },
            { label: "User Management", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
              <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <Shield className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="p-6">
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                  <TabsTrigger value="managers">Managers</TabsTrigger>
                  <TabsTrigger value="clients">Clients</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                        <TableHead className="font-semibold">User</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Role</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Projects</TableHead>
                        <TableHead className="font-semibold">Last Login</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((systemUser) => (
                        <TableRow key={systemUser.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={systemUser.avatar} />
                                <AvatarFallback>
                                  {systemUser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900">{systemUser.name}</div>
                                <div className="text-sm text-gray-500">
                                  Joined {new Date(systemUser.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{systemUser.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(systemUser.role)}>
                              {systemUser.role.charAt(0).toUpperCase() + systemUser.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(systemUser.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(systemUser.status)}
                                <span>{systemUser.status.charAt(0).toUpperCase() + systemUser.status.slice(1)}</span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">{systemUser.projects}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(systemUser.lastLogin).toLocaleDateString()}
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

                <TabsContent value="admins" className="space-y-4">
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-red-500" />
                    <h3 className="text-lg font-semibold mb-2">Administrators</h3>
                    <p className="text-gray-600">Manage admin users and their permissions</p>
                  </div>
                </TabsContent>

                <TabsContent value="managers" className="space-y-4">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-2">Project Managers</h3>
                    <p className="text-gray-600">Manage project managers and their assignments</p>
                  </div>
                </TabsContent>

                <TabsContent value="clients" className="space-y-4">
                  <div className="text-center py-8">
                    <User className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold mb-2">Client Users</h3>
                    <p className="text-gray-600">Manage client accounts and project access</p>
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
