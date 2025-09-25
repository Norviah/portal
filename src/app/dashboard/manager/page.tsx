"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/Breadcrumb";
import { Separator } from "@/components/ui/Separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";

import { Users, DollarSign, FileText, MessageSquare, Upload, Calendar, CheckCircle, Clock, AlertTriangle, Eye, EyeOff, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DiscussionBoard } from "@/components/dashboard/DiscussionBoard";
import { TemplateManager } from "@/components/dashboard/TemplateManager";
import { NewProjectDialog } from "@/components/dashboard/NewProjectDialog";
import { DemoDataInitializer } from "@/components/dashboard/DemoDataInitializer";
import { ProjectShowcase } from "@/components/dashboard/ProjectShowcase";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name: string;
  role: string;
}

export default function ManagerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth/signin';
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/20">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-blue-600 hover:text-blue-800">Manager Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-700">Project Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 px-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-100">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">MANAGER</Badge>
            </div>
            <ThemeSelector />
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-red-200 text-red-700 hover:bg-red-50">
              Logout
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Welcome Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-sm">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Manager Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">Project oversight and client management</p>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Active Projects</CardTitle>
                <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg">
                  <FileText className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">8</div>
                <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">+1 from last week</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Client Messages</CardTitle>
                <div className="p-2 bg-green-500 dark:bg-green-600 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900 dark:text-green-100">23</div>
                <p className="text-xs text-green-600 dark:text-green-300 font-medium">5 unread</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800">Pending Decisions</CardTitle>
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-900">12</div>
                <p className="text-xs text-orange-600 font-medium">3 urgent</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-800">Team Members</CardTitle>
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-900">15</div>
                <p className="text-xs text-purple-600 font-medium">All active</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <Tabs defaultValue="projects" className="space-y-6">
                <TabsList className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm">
                  <TabsTrigger value="projects" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Projects</TabsTrigger>
                  <TabsTrigger value="templates" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">Templates</TabsTrigger>
                  <TabsTrigger value="demo" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">Demo</TabsTrigger>
                  <TabsTrigger value="decisions" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">Decisions</TabsTrigger>
                  <TabsTrigger value="discussion" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">Discussion</TabsTrigger>
                  <TabsTrigger value="messages" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">Messages</TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-semibold text-gray-800">Project Management</CardTitle>
                          <CardDescription className="text-gray-600">Manage your assigned projects and track progress</CardDescription>
                        </div>
                        <Button 
                          onClick={() => setIsNewProjectOpen(true)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          New Project
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50/50">
                            <TableHead className="font-semibold text-gray-700">Project</TableHead>
                            <TableHead className="font-semibold text-gray-700">Client</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                            <TableHead className="font-semibold text-gray-700">Progress</TableHead>
                            <TableHead className="font-semibold text-gray-700">Next Milestone</TableHead>
                            <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-blue-50/50 transition-colors">
                            <TableCell className="font-medium text-gray-800">Modern Home Renovation</TableCell>
                            <TableCell className="text-gray-600">John Smith</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={65} className="w-20 h-2" />
                                <span className="text-sm font-medium text-gray-700">65%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm font-medium text-gray-800">Foundation Complete</div>
                              <div className="text-xs text-gray-500">Due: Oct 15</div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push('/project/proj-1')}
                                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                              >
                                Manage
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-green-50/50 transition-colors">
                            <TableCell className="font-medium text-gray-800">Office Building</TableCell>
                            <TableCell className="text-gray-600">ABC Corp</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800 border-green-200">Planning</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={25} className="w-20 h-2" />
                                <span className="text-sm font-medium text-gray-700">25%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm font-medium text-gray-800">Permit Approval</div>
                              <div className="text-xs text-gray-500">Due: Oct 20</div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push('/project/proj-2')}
                                className="border-green-200 text-green-700 hover:bg-green-50"
                              >
                                Manage
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="templates" className="space-y-4">
                  <TemplateManager
                    onSelectTemplate={(template) => {
                      // Handle template selection for new project
                      setIsNewProjectOpen(true);
                    }}
                  />
                </TabsContent>

                <TabsContent value="demo" className="space-y-4">
                  <div className="space-y-6">
                    <DemoDataInitializer />
                    <ProjectShowcase onProjectClick={(project) => router.push(`/project/${project.id}`)} />
                  </div>
                </TabsContent>

                <TabsContent value="decisions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Decision Management</CardTitle>
                      <CardDescription>Track and manage client decisions and approvals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <span>Material Selection - Kitchen Countertops</span>
                              <Badge variant="destructive">Urgent</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p className="text-sm text-muted-foreground">
                                Client needs to select countertop material for kitchen renovation. 
                                Options: Granite ($2,500), Quartz ($3,200), Marble ($4,000)
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Deadline:</span>
                                <span className="text-sm">October 10, 2024</span>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm">Add Decision</Button>
                                <Button variant="outline" size="sm">Override</Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <span>Color Selection - Exterior Paint</span>
                              <Badge variant="secondary">Pending</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p className="text-sm text-muted-foreground">
                                Exterior paint color selection for the main building. 
                                Client has narrowed down to 3 options.
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Deadline:</span>
                                <span className="text-sm">October 15, 2024</span>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm">Add Decision</Button>
                                <Button variant="outline" size="sm">Override</Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="discussion" className="space-y-4">
                  <DiscussionBoard
                    projectId="proj-001"
                    projectName="Modern Home Renovation"
                    currentUser={{
                      name: user?.name || "Manager User",
                      role: user?.role as 'client' | 'manager' | 'admin' || 'manager'
                    }}
                  />
                </TabsContent>

                <TabsContent value="messages" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Communications</CardTitle>
                      <CardDescription>Manage client messages and communications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">John Smith</span>
                              <Badge variant="destructive">Unread</Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">2 hours ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Hi, I have a question about the kitchen countertop options. 
                            Can we schedule a call to discuss the pros and cons of each material?
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm">Reply</Button>
                            <Button variant="outline" size="sm">Mark as Read</Button>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">ABC Corp</span>
                              <Badge variant="secondary">Read</Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">1 day ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Thanks for the update on the permit status. Looking forward to the next phase.
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm">Reply</Button>
                            <Button variant="outline" size="sm">Archive</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Visibility Settings</CardTitle>
                      <CardDescription>Control what clients can see in their dashboard</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Payment Forecast</h4>
                            <p className="text-sm text-muted-foreground">Show upcoming payment schedule to clients</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Invoice Management</h4>
                            <p className="text-sm text-muted-foreground">Allow clients to view and approve invoices</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Decision Tracking</h4>
                            <p className="text-sm text-muted-foreground">Show decision history and pending decisions</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Job Site Images</h4>
                            <p className="text-sm text-muted-foreground">Allow clients to view uploaded job site photos</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <EyeOff className="h-4 w-4" />
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="col-span-3 space-y-4">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">Client uploaded decision document</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">Project milestone completed</p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">New client message received</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Construction Team</span>
                      <Badge variant="secondary">On Site</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Design Team</span>
                      <Badge variant="secondary">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Project Coordinators</span>
                      <Badge variant="secondary">In Office</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Job Site Photos
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Client Update
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* New Project Dialog */}
      <NewProjectDialog
        open={isNewProjectOpen}
        onOpenChange={setIsNewProjectOpen}
        onCreateProject={(project) => {
          // Handle project creation
          console.log('Creating project:', project);
          // Here you would typically save the project to your backend
          // For now, we'll just show a success message
          alert(`Project "${project.name}" created successfully!`);
        }}
      />

    </SidebarProvider>
  );
}
