"use client";

import React from "react";
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
import { Checkbox } from "@/components/ui/Checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import { 
  Shield, 
  Users, 
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
  EyeOff,
  Lock,
  Unlock,
  MoreHorizontal,
  Save
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'project' | 'financial' | 'team' | 'system' | 'client';
  level: 'read' | 'write' | 'admin';
}

interface UserPermission {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  userAvatar?: string;
  permissions: {
    [key: string]: boolean;
  };
  lastUpdated: string;
  updatedBy: string;
}

export default function ManagerPermissionsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserPermission | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock permissions data
    setPermissions([
      { id: "1", name: "View Projects", description: "View all project information", category: "project", level: "read" },
      { id: "2", name: "Edit Projects", description: "Modify project details and settings", category: "project", level: "write" },
      { id: "3", name: "Delete Projects", description: "Remove projects from the system", category: "project", level: "admin" },
      { id: "4", name: "View Budgets", description: "Access financial information", category: "financial", level: "read" },
      { id: "5", name: "Edit Budgets", description: "Modify budget allocations", category: "financial", level: "write" },
      { id: "6", name: "Approve Invoices", description: "Approve client invoices", category: "financial", level: "admin" },
      { id: "7", name: "View Team Members", description: "See team member information", category: "team", level: "read" },
      { id: "8", name: "Manage Team", description: "Add/remove team members", category: "team", level: "write" },
      { id: "9", name: "Assign Roles", description: "Change user roles and permissions", category: "team", level: "admin" },
      { id: "10", name: "View Clients", description: "Access client information", category: "client", level: "read" },
      { id: "11", name: "Edit Clients", description: "Modify client details", category: "client", level: "write" },
      { id: "12", name: "System Settings", description: "Configure system preferences", category: "system", level: "admin" }
    ]);

    // Mock user permissions data
    setUserPermissions([
      {
        userId: "1",
        userName: "Sarah Johnson",
        userEmail: "sarah.johnson@trio.com",
        userRole: "Project Manager",
        userAvatar: "/avatars/sarah.jpg",
        permissions: {
          "1": true, "2": true, "4": true, "5": true, "7": true, "8": true, "10": true, "11": true
        },
        lastUpdated: "2024-10-15T10:30:00Z",
        updatedBy: "Admin"
      },
      {
        userId: "2",
        userName: "Mike Chen",
        userEmail: "mike.chen@trio.com",
        userRole: "Site Supervisor",
        userAvatar: "/avatars/mike.jpg",
        permissions: {
          "1": true, "4": true, "7": true, "10": true
        },
        lastUpdated: "2024-10-14T14:20:00Z",
        updatedBy: "Project Manager"
      },
      {
        userId: "3",
        userName: "Lisa Wang",
        userEmail: "lisa.wang@trio.com",
        userRole: "Accountant",
        userAvatar: "/avatars/lisa.jpg",
        permissions: {
          "1": true, "4": true, "5": true, "6": true, "10": true
        },
        lastUpdated: "2024-10-13T16:45:00Z",
        updatedBy: "Admin"
      },
      {
        userId: "4",
        userName: "David Rodriguez",
        userEmail: "david.rodriguez@trio.com",
        userRole: "Construction Worker",
        userAvatar: "/avatars/david.jpg",
        permissions: {
          "1": true, "7": true
        },
        lastUpdated: "2024-10-12T09:15:00Z",
        updatedBy: "Site Supervisor"
      }
    ]);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'project': return Settings;
      case 'financial': return Shield;
      case 'team': return Users;
      case 'system': return Settings;
      case 'client': return User;
      default: return Shield;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'financial': return 'bg-green-100 text-green-800 border-green-200';
      case 'team': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'system': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'client': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'read': return 'bg-green-100 text-green-800';
      case 'write': return 'bg-yellow-100 text-yellow-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = userPermissions.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.userRole.toLowerCase().includes(roleFilter.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const handlePermissionChange = (userId: string, permissionId: string, checked: boolean) => {
    setUserPermissions(prev => prev.map(user => 
      user.userId === userId 
        ? { 
            ...user, 
            permissions: { ...user.permissions, [permissionId]: checked },
            lastUpdated: new Date().toISOString(),
            updatedBy: user.userName || "Manager"
          }
        : user
    ));
  };

  const handleSavePermissions = () => {
    // Save permissions logic here
    setIsEditing(false);
    setSelectedUser(null);
  };

  const stats = {
    totalUsers: userPermissions.length,
    activeUsers: userPermissions.length,
    adminUsers: userPermissions.filter(u => u.permissions["9"]).length,
    totalPermissions: permissions.length
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Permissions Management"
          description="Manage user roles and permissions"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "Team Management", href: "#" },
            { label: "Permissions", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Permissions Management</h1>
              <p className="text-gray-600 mt-1">Manage user roles and permissions across the platform</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Admin Users</p>
                    <p className="text-2xl font-bold text-red-600">{stats.adminUsers}</p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Permissions</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalPermissions}</p>
                  </div>
                  <Settings className="h-8 w-8 text-purple-600" />
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
                    placeholder="Search users..."
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
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Permissions Management */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                      <TableHead className="font-semibold">User</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Permissions</TableHead>
                      <TableHead className="font-semibold">Last Updated</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const permissionCount = Object.values(user.permissions).filter(Boolean).length;
                      return (
                        <TableRow key={user.userId} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.userAvatar} />
                                <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900">{user.userName}</div>
                                <div className="text-sm text-gray-500">{user.userEmail}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.userRole}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{permissionCount} permissions</span>
                              <Badge variant="outline" className="text-xs">
                                {Math.round((permissionCount / permissions.length) * 100)}%
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600">
                              {new Date(user.lastUpdated).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              by {user.updatedBy}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Edit Permissions - {user.userName}</DialogTitle>
                                    <DialogDescription>
                                      Manage permissions for {user.userRole}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">User</label>
                                        <p className="text-sm">{user.userName} ({user.userEmail})</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-600">Role</label>
                                        <p className="text-sm">{user.userRole}</p>
                                      </div>
                                    </div>

                                    <div className="space-y-4">
                                      <h4 className="font-medium text-gray-900">Permissions</h4>
                                      {Object.entries(permissions.reduce((acc, perm) => {
                                        if (!acc[perm.category]) acc[perm.category] = [];
                                        acc[perm.category].push(perm);
                                        return acc;
                                      }, {} as Record<string, Permission[]>)).map(([category, categoryPermissions]) => (
                                        <div key={category} className="space-y-3">
                                          <div className="flex items-center space-x-2">
                                            {React.createElement(getCategoryIcon(category), { className: "h-4 w-4 text-gray-400" })}
                                            <h5 className="font-medium text-gray-800 capitalize">{category} Permissions</h5>
                                          </div>
                                          <div className="grid gap-2 ml-6">
                                            {categoryPermissions.map((permission) => (
                                              <div key={permission.id} className="flex items-center space-x-3">
                                                <Checkbox
                                                  id={`${user.userId}-${permission.id}`}
                                                  checked={user.permissions[permission.id] || false}
                                                  onCheckedChange={(checked) => 
                                                    handlePermissionChange(user.userId, permission.id, checked as boolean)
                                                  }
                                                />
                                                <div className="flex-1">
                                                  <label 
                                                    htmlFor={`${user.userId}-${permission.id}`}
                                                    className="text-sm font-medium text-gray-700 cursor-pointer"
                                                  >
                                                    {permission.name}
                                                  </label>
                                                  <p className="text-xs text-gray-500">{permission.description}</p>
                                                </div>
                                                <Badge className={getLevelColor(permission.level)}>
                                                  {permission.level}
                                                </Badge>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="flex justify-end space-x-2 pt-4 border-t">
                                      <Button variant="outline" onClick={() => setSelectedUser(null)}>
                                        Cancel
                                      </Button>
                                      <Button onClick={handleSavePermissions} className="bg-blue-600 hover:bg-blue-700">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
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

            <TabsContent value="permissions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {permissions.map((permission) => {
                  const CategoryIcon = getCategoryIcon(permission.category);
                  return (
                    <Card key={permission.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="h-5 w-5 text-gray-400" />
                            <Badge className={getCategoryColor(permission.category)}>
                              {permission.category}
                            </Badge>
                          </div>
                          <Badge className={getLevelColor(permission.level)}>
                            {permission.level}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{permission.name}</CardTitle>
                        <CardDescription>{permission.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>ID: {permission.id}</span>
                          <span className="capitalize">{permission.level} access</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Role Management</h3>
                <p className="text-gray-600">Create and manage custom roles with specific permission sets</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Role
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
