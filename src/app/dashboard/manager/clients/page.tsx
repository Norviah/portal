"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { 
  Plus, 
  Search, 
  Users, 
  Mail, 
  Phone, 
  MessageSquare,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'pending';
  projects: number;
  totalSpent: number;
  lastContact: string;
  joinDate: string;
  avatar?: string;
  priority: 'low' | 'medium' | 'high' | 'vip';
}

export default function ManagerClientsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock client data
    setClients([
      {
        id: "1",
        name: "John Smith",
        email: "john@client.com",
        phone: "(555) 123-4567",
        company: "Smith Enterprises",
        status: "active",
        projects: 1,
        totalSpent: 97500,
        lastContact: "2024-10-08T10:30:00Z",
        joinDate: "2024-01-15T00:00:00Z",
        avatar: "/avatars/client.jpg",
        priority: "high"
      },
      {
        id: "2",
        name: "Jane Doe",
        email: "jane@client.com",
        phone: "(555) 234-5678",
        company: "Doe Construction",
        status: "active",
        projects: 2,
        totalSpent: 150000,
        lastContact: "2024-10-07T14:20:00Z",
        joinDate: "2024-02-01T00:00:00Z",
        avatar: "/avatars/client2.jpg",
        priority: "vip"
      },
      {
        id: "3",
        name: "Bob Wilson",
        email: "bob@client.com",
        phone: "(555) 345-6789",
        company: "Wilson Properties",
        status: "inactive",
        projects: 0,
        totalSpent: 250000,
        lastContact: "2024-09-15T11:00:00Z",
        joinDate: "2023-06-01T00:00:00Z",
        avatar: "/avatars/client3.jpg",
        priority: "medium"
      },
      {
        id: "4",
        name: "Alice Johnson",
        email: "alice@client.com",
        phone: "(555) 456-7890",
        status: "pending",
        projects: 0,
        totalSpent: 0,
        lastContact: "2024-10-05T09:30:00Z",
        joinDate: "2024-10-05T00:00:00Z",
        avatar: "/avatars/client4.jpg",
        priority: "low"
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inactive': return <Clock className="h-4 w-4 text-gray-400" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Client Management"
          description="Manage your clients and their projects"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "Client Management", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Clients</h1>
              <p className="text-gray-600 mt-1">Manage your client relationships and projects</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>

          {/* Client Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
                <p className="text-xs text-gray-600">All clients</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {clients.filter(c => c.status === 'active').length}
                </div>
                <p className="text-xs text-gray-600">Currently active</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">From all clients</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">VIP Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {clients.filter(c => c.priority === 'vip').length}
                </div>
                <p className="text-xs text-gray-600">High priority</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-sm">
            <div className="p-6">
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Clients</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="vip">VIP</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 dark:bg-gray-700/50">
                        <TableHead className="font-semibold">Client</TableHead>
                        <TableHead className="font-semibold">Contact</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                        <TableHead className="font-semibold">Projects</TableHead>
                        <TableHead className="font-semibold">Total Spent</TableHead>
                        <TableHead className="font-semibold">Last Contact</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={client.avatar} />
                                <AvatarFallback>
                                  {client.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900">{client.name}</div>
                                {client.company && (
                                  <div className="text-sm text-gray-500">{client.company}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-gray-600">
                                <Mail className="h-3 w-3 mr-1" />
                                {client.email}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone className="h-3 w-3 mr-1" />
                                {client.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(client.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(client.status)}
                                <span>{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(client.priority)}>
                              {client.priority.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">{client.projects}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">
                              ${client.totalSpent.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(client.lastContact).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
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
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold mb-2">Active Clients</h3>
                    <p className="text-gray-600">Clients with ongoing projects</p>
                  </div>
                </TabsContent>

                <TabsContent value="vip" className="space-y-4">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-semibold mb-2">VIP Clients</h3>
                    <p className="text-gray-600">High-priority clients requiring special attention</p>
                  </div>
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                    <h3 className="text-lg font-semibold mb-2">Pending Clients</h3>
                    <p className="text-gray-600">New clients awaiting project assignment</p>
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
