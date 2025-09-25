"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DecisionCard } from "@/components/dashboard/DecisionCard";
import { DiscussionBoard } from "@/components/dashboard/DiscussionBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Separator } from "@/components/ui/Separator";

import { User, MessageSquare, Upload, FileText, DollarSign, Calendar, CheckCircle, Clock, AlertTriangle, Send, Image, File, Download, Search, Filter, Camera, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface DecisionOption {
  id: string;
  name: string;
  price?: number;
  color?: string;
  description: string;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  status: "urgent" | "pending" | "completed";
  deadline: string;
  options: DecisionOption[];
  selectedOption?: string;
}

export default function ClientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [messageText, setMessageText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [clientProjects, setClientProjects] = useState<any[]>([]);
  const [permissions, setPermissions] = useState({
    canViewProjects: true,
    canViewTimeline: true,
    canViewBudget: false,
    canViewTeam: false,
    canDownloadFiles: true,
    canUploadFiles: true,
    canMakeDecisions: true,
    canViewDiscussion: true
  });
  const [decisions, setDecisions] = useState<Decision[]>([
    {
      id: "dec-1",
      title: "Kitchen Countertop Material Selection",
      description: "Please select your preferred countertop material for the kitchen renovation.",
      status: "urgent" as const,
      deadline: "2024-10-10",
      options: [
        {
          id: "granite",
          name: "Granite",
          price: 2500,
          description: "Durable, natural stone, requires sealing"
        },
        {
          id: "quartz",
          name: "Quartz",
          price: 3200,
          description: "Low maintenance, consistent color, non-porous"
        },
        {
          id: "marble",
          name: "Marble",
          price: 4000,
          description: "Elegant, unique veining, requires maintenance"
        }
      ],
      selectedOption: undefined
    },
    {
      id: "dec-2",
      title: "Exterior Paint Color",
      description: "Choose the exterior paint color for your home.",
      status: "pending" as const,
      deadline: "2024-10-15",
      options: [
        {
          id: "ocean-blue",
          name: "Ocean Blue",
          color: "#4A90E2",
          description: "Classic coastal look"
        },
        {
          id: "modern-gray",
          name: "Modern Gray",
          color: "#6B7280",
          description: "Contemporary and timeless"
        },
        {
          id: "forest-green",
          name: "Forest Green",
          color: "#059669",
          description: "Natural and earthy"
        }
      ],
      selectedOption: undefined
    }
  ]);

  const activities = [
    {
      id: "act-1",
      type: "milestone" as const,
      title: "Foundation poured successfully",
      description: "Concrete foundation has been poured and is curing properly",
      timestamp: "2024-09-15T10:00:00Z",
      status: "completed" as const
    },
    {
      id: "act-2",
      type: "system" as const,
      title: "Permits approved by city",
      description: "All required building permits have been approved",
      timestamp: "2024-09-10T14:30:00Z",
      status: "completed" as const
    },
    {
      id: "act-3",
      type: "system" as const,
      title: "Material delivery scheduled",
      description: "Construction materials scheduled for delivery next week",
      timestamp: "2024-09-08T09:15:00Z",
      status: "pending" as const
    }
  ];

  const quickActions = [
    {
      id: "upload-files",
      label: "Upload Files",
      icon: Upload,
      onClick: () => document.getElementById('file-upload')?.click(),
      variant: "default" as const
    },
    {
      id: "schedule-call",
      label: "Schedule Call",
      icon: Calendar,
      onClick: () => console.log("Schedule call"),
      variant: "outline" as const
    },
    {
      id: "view-gallery",
      label: "View Gallery",
      icon: Camera,
      onClick: () => console.log("View gallery"),
      variant: "outline" as const
    },
    {
      id: "download-docs",
      label: "Download Documents",
      icon: Download,
      onClick: () => console.log("Download docs"),
      variant: "outline" as const
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      
      // Load client-specific projects and permissions
      loadClientData(user);
    } else {
      // Redirect to sign in if no user
      window.location.href = '/auth/signin';
    }
  }, []);

  const loadClientData = (user: User) => {
    // Simulate loading client-specific data based on user
    const clientData = {
      projects: [
        {
          id: 'proj-1',
          name: 'Modern Home Renovation',
          description: 'Complete renovation of a 3-bedroom family home',
          status: 'active',
          progress: 65,
          startDate: '2024-01-15',
          endDate: '2024-12-31',
          clientCanView: true,
          clientCanEdit: false,
          clientCanViewBudget: false,
          clientCanViewTeam: false,
          manager: 'Sarah Johnson',
          lastUpdate: '2024-09-15T10:30:00Z'
        }
      ],
      permissions: {
        canViewProjects: true,
        canViewTimeline: true,
        canViewBudget: false, // Manager controls this
        canViewTeam: false,   // Manager controls this
        canDownloadFiles: true,
        canUploadFiles: true,
        canMakeDecisions: true,
        canViewDiscussion: true
      }
    };
    
    setClientProjects(clientData.projects);
    setPermissions(clientData.permissions);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        console.log('Files uploaded:', files);
      }, 2000);
    }
  };

  const handleDecisionSelect = (decisionId: string, optionId: string) => {
    setDecisions(prev => prev.map(decision => 
      decision.id === decisionId 
        ? { ...decision, selectedOption: optionId }
        : decision
    ));
  };

  const handleDecisionSubmit = (decisionId: string) => {
    console.log('Submitting decision:', decisionId);
    setDecisions(prev => prev.map(decision => 
      decision.id === decisionId 
        ? { ...decision, status: "completed" as const }
        : decision
    ));
  };

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Portal"
          description="Track your project progress and stay connected with the Trio team"
          breadcrumbs={[
            { label: "Client Portal", href: "#" },
            { label: "Project Dashboard", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
            {/* Welcome Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Project Portal
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                Welcome back, <span className="font-semibold text-blue-700 dark:text-blue-400">{user?.name}</span>! Track your project progress and stay connected.
              </p>
            </div>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Project Progress</h3>
                <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">65%</div>
              <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">On track for completion</p>
              <div className="mt-2">
                <Progress value={65} className="h-2" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-orange-800">Pending Decisions</h3>
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-900 mb-1">3</div>
              <p className="text-xs text-orange-600 font-medium">2 urgent, 1 normal</p>
              <div className="mt-2">
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">Action Required</Badge>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-purple-800">Team Messages</h3>
                <div className="p-2 bg-purple-500 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-900 mb-1">12</div>
              <p className="text-xs text-purple-600 font-medium">5 unread messages</p>
              <div className="mt-2">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">5 New</Badge>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-green-800">Next Payment</h3>
                <div className="p-2 bg-green-500 rounded-lg">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-900 mb-1">$10,000</div>
              <p className="text-xs text-green-600 font-medium">Due Oct 15, 2024</p>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">Upcoming</Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <Tabs defaultValue="decisions" className="space-y-6">
                  <TabsList className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm grid w-full grid-cols-6">
                    <TabsTrigger value="decisions" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">Decisions</TabsTrigger>
                    <TabsTrigger value="progress" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Progress</TabsTrigger>
                    <TabsTrigger value="discussion" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">Discussion</TabsTrigger>
                    <TabsTrigger value="messages" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">Messages</TabsTrigger>
                    <TabsTrigger value="uploads" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">Uploads</TabsTrigger>
                    <TabsTrigger value="invoices" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">Invoices</TabsTrigger>
                  </TabsList>

                  <TabsContent value="decisions" className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                          <h3 className="text-xl font-semibold text-orange-800">Key Decisions</h3>
                          <p className="text-sm text-orange-600 mt-1">Make important decisions to keep your project on track</p>
                        </div>
                        <div className="space-y-4">
                          {permissions.canMakeDecisions ? (
                            decisions.map((decision) => (
                              <DecisionCard
                                key={decision.id}
                                decision={{
                                  ...decision,
                                  onSelect: (optionId) => handleDecisionSelect(decision.id, optionId),
                                  onSubmit: () => handleDecisionSubmit(decision.id)
                                }}
                              />
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                              <p>Decision making is currently disabled by your project manager.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                          <h3 className="text-xl font-semibold text-blue-800">Project Progress</h3>
                          <p className="text-sm text-blue-600 mt-1">Track your project's completion status</p>
                        </div>
                        {permissions.canViewTimeline ? (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium text-gray-700">Planning Phase</span>
                                  <span className="font-semibold text-green-600">100%</span>
                                </div>
                                <Progress value={100} className="h-3" />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium text-gray-700">Foundation Work</span>
                                  <span className="font-semibold text-green-600">90%</span>
                                </div>
                                <Progress value={90} className="h-3" />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium text-gray-700">Framing</span>
                                  <span className="font-semibold text-blue-600">65%</span>
                                </div>
                                <Progress value={65} className="h-3" />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium text-gray-700">Interior Work</span>
                                  <span className="font-semibold text-orange-600">30%</span>
                                </div>
                                <Progress value={30} className="h-3" />
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium text-gray-700">Finishing</span>
                                  <span className="font-semibold text-gray-600">0%</span>
                                </div>
                                <Progress value={0} className="h-3" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p>Progress tracking is currently disabled by your project manager.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="discussion" className="space-y-6">
                    {permissions.canViewDiscussion ? (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 mb-6">
                          <h3 className="text-xl font-semibold text-purple-800">Project Discussion</h3>
                          <p className="text-sm text-purple-600 mt-1">Communicate with your project team</p>
                        </div>
                        <DiscussionBoard
                          projectId="proj-001"
                          projectName="Modern Home Renovation"
                          currentUser={{
                            name: user?.name || "Client User",
                            role: user?.role as 'client' | 'manager' | 'admin' || 'client'
                          }}
                        />
                      </div>
                    ) : (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                        <div className="text-center py-8 text-gray-500">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p>Discussion board is currently disabled by your project manager.</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="messages" className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                          <h3 className="text-xl font-semibold text-green-800">Team Communication</h3>
                          <p className="text-sm text-green-600 mt-1">Chat with your project team</p>
                        </div>
                        <div className="space-y-4">
                          {/* Message History */}
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            <div className="flex justify-end">
                              <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                                <p className="text-sm">Hi team, I have a question about the countertop options. Can we schedule a call?</p>
                                <p className="text-xs opacity-70 mt-1">2 hours ago</p>
                              </div>
                            </div>
                            <div className="flex justify-start">
                              <div className="bg-muted rounded-lg p-3 max-w-xs">
                                <p className="text-sm">Hi John! Absolutely, I can schedule a call for tomorrow at 2 PM. Does that work for you?</p>
                                <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                                <p className="text-sm">Perfect, that works great. Thanks!</p>
                                <p className="text-xs opacity-70 mt-1">30 minutes ago</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Message Input */}
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Type your message..."
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              className="min-h-[80px]"
                            />
                            <div className="flex justify-between">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Image className="h-4 w-4 mr-1" />
                                  Image
                                </Button>
                                <Button variant="outline" size="sm">
                                  <File className="h-4 w-4 mr-1" />
                                  File
                                </Button>
                              </div>
                              <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                                <Send className="h-4 w-4 mr-1" />
                                Send
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="uploads" className="space-y-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">File Uploads</h3>
                          <p className="text-sm text-muted-foreground">Upload documents, images, or feedback for your project</p>
                        </div>
                        <div className="space-y-4">
                          {/* Upload Area */}
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-sm font-medium mb-2">Upload files here</p>
                            <p className="text-xs text-muted-foreground mb-4">
                              Drag and drop files or click to browse
                            </p>
                            <input
                              type="file"
                              multiple
                              onChange={handleFileUpload}
                              className="hidden"
                              id="file-upload"
                              accept="image/*,.pdf,.doc,.docx"
                            />
                            <Button asChild>
                              <label htmlFor="file-upload" className="cursor-pointer">
                                Choose Files
                              </label>
                            </Button>
                          </div>

                          {/* Uploaded Files */}
                          <div className="space-y-2">
                            <h4 className="font-medium">Recent Uploads</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center gap-2">
                                  <File className="h-4 w-4" />
                                  <span className="text-sm">kitchen-inspiration.jpg</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">View</Button>
                                  <Button variant="outline" size="sm">Download</Button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center gap-2">
                                  <File className="h-4 w-4" />
                                  <span className="text-sm">color-samples.pdf</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">View</Button>
                                  <Button variant="outline" size="sm">Download</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="invoices" className="space-y-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Invoices & Payments</h3>
                          <p className="text-sm text-muted-foreground">View and manage your project invoices</p>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Invoice #</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">INV-001</TableCell>
                              <TableCell>Oct 1, 2024</TableCell>
                              <TableCell>$10,000</TableCell>
                              <TableCell>
                                <Badge variant="destructive">Pending</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">View</Button>
                                  <Button size="sm">Approve</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">INV-002</TableCell>
                              <TableCell>Sep 15, 2024</TableCell>
                              <TableCell>$5,000</TableCell>
                              <TableCell>
                                <Badge variant="secondary">Paid</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">View</Button>
                                  <Button variant="outline" size="sm">Download</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                {/* Project Visibility & Permissions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                      <h3 className="text-xl font-semibold text-indigo-800">Your Project Access</h3>
                      <p className="text-sm text-indigo-600 mt-1">What you can see and do in this project</p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Available Features</h4>
                        <div className="space-y-2">
                          {permissions.canViewProjects && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">View Project Details</span>
                            </div>
                          )}
                          {permissions.canViewTimeline && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Track Progress</span>
                            </div>
                          )}
                          {permissions.canMakeDecisions && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Make Decisions</span>
                            </div>
                          )}
                          {permissions.canViewDiscussion && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Team Discussion</span>
                            </div>
                          )}
                          {permissions.canDownloadFiles && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Download Files</span>
                            </div>
                          )}
                          {permissions.canUploadFiles && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Upload Files</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Restricted Features</h4>
                        <div className="space-y-2">
                          {!permissions.canViewBudget && (
                            <div className="flex items-center space-x-2 text-gray-400">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm">Budget Information</span>
                            </div>
                          )}
                          {!permissions.canViewTeam && (
                            <div className="flex items-center space-x-2 text-gray-400">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm">Team Details</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Your project manager controls what information you can access. 
                        Contact them if you need access to additional features.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <ActivityFeed activities={activities} />

                {/* Quick Actions */}
                <QuickActions actions={quickActions} />

                {/* Project Spec Sheet */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Project Specifications</h3>
                      <p className="text-sm text-muted-foreground">Your project details and selected options</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Project Type:</span>
                        <span className="text-sm">Home Renovation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Start Date:</span>
                        <span className="text-sm">August 1, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Expected Completion:</span>
                        <span className="text-sm">December 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Budget:</span>
                        <span className="text-sm font-bold">$150,000</span>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Selected Options:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Flooring: Hardwood (Oak)</li>
                          <li>• Windows: Double-pane energy efficient</li>
                          <li>• Appliances: Stainless steel package</li>
                          <li>• Lighting: LED recessed lighting</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Milestones */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Upcoming Milestones</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Foundation Complete</p>
                          <p className="text-xs text-muted-foreground">October 15, 2024</p>
                        </div>
                        <Badge variant="secondary">Upcoming</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Framing Complete</p>
                          <p className="text-xs text-muted-foreground">November 30, 2024</p>
                        </div>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Final Walkthrough</p>
                          <p className="text-xs text-muted-foreground">December 10, 2024</p>
                        </div>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Site Gallery */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Job Site Gallery</h3>
                      <p className="text-sm text-muted-foreground">Latest photos from your project</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View All Photos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
