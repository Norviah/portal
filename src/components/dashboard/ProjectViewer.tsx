"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
import { Separator } from "@/components/ui/Separator";

import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  BarChart3, 
  Table as TableIcon, 
  Eye, 
  Settings, 
  Download,
  RefreshCw,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import { AdvancedGanttChart } from "./AdvancedGanttChart";
import { GanttVisibilityControls } from "./GanttVisibilityControls";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  startDate: string;
  endDate: string;
  progress: number;
  template?: {
    id: string;
    name: string;
    type: 'table' | 'gantt' | 'mixed';
    tables: any[];
    ganttConfig?: any;
  };
  sampleData?: any;
  team: string[];
  budget: number;
  actualCost: number;
}

interface ProjectViewerProps {
  project: Project | null;
  onClose: () => void;
  className?: string;
}

export function ProjectViewer({ project, onClose, className }: ProjectViewerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [ganttVisibility, setGanttVisibility] = useState({
    forecasted: true,
    actual: true,
    current: true,
    variance: true,
    dependencies: true,
    progress: true,
    assignees: true,
    categories: true,
    criticalPath: true,
    milestones: true,
    labels: true,
    grid: true,
    weekends: true,
    holidays: false,
    priorities: true,
    phases: false
  });

  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Clock className="h-4 w-4" />;
      case 'active': return <RefreshCw className="h-4 w-4" />;
      case 'on-hold': return <AlertTriangle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const budgetVariance = project.actualCost - project.budget;
  const budgetVariancePercent = project.budget > 0 ? (budgetVariance / project.budget) * 100 : 0;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full overflow-hidden p-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-background to-muted/20">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                  </Button>
                  
                  <div className="h-6 w-px bg-border" />
                  
                  <div>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                      {project.name}
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                      </Badge>
                    </DialogTitle>
                    <p className="text-muted-foreground mt-1">{project.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="px-6 py-4 border-b">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="data">Data Tables</TabsTrigger>
                  <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="overview" className="space-y-6">
                  {/* Project Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Progress</p>
                            <p className="text-2xl font-bold">{project.progress}%</p>
                          </div>
                          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <BarChart3 className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <Progress value={project.progress} className="mt-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Budget</p>
                            <p className="text-2xl font-bold">{formatCurrency(project.budget)}</p>
                          </div>
                          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Actual: {formatCurrency(project.actualCost)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Team Size</p>
                            <p className="text-2xl font-bold">{project.team.length}</p>
                          </div>
                          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Active members
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Variance</p>
                            <p className={`text-2xl font-bold ${budgetVariance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {budgetVariance >= 0 ? '+' : ''}{formatCurrency(budgetVariance)}
                            </p>
                          </div>
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${budgetVariance >= 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                            <AlertTriangle className={`h-6 w-6 ${budgetVariance >= 0 ? 'text-red-600' : 'text-green-600'}`} />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {budgetVariancePercent >= 0 ? '+' : ''}{budgetVariancePercent.toFixed(1)}%
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Template Information */}
                  {project.template && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TableIcon className="h-5 w-5" />
                          Template Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Template Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Name:</span>
                                <span className="font-medium">{project.template.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <Badge variant="outline" className="capitalize">
                                  {project.template.type}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tables:</span>
                                <span className="font-medium">{project.template.tables.length}</span>
                              </div>
                              {project.template.ganttConfig && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Gantt Tasks:</span>
                                  <span className="font-medium">{project.template.ganttConfig.tasks?.length || 0}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Project Timeline</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Start Date:</span>
                                <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">End Date:</span>
                                <span className="font-medium">{new Date(project.endDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="font-medium">
                                  {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Team Members */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Team Members
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Project Phases</h4>
                            <p className="text-sm text-muted-foreground">Track progress through different phases</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            { name: 'Planning & Design', progress: 100, status: 'completed', color: 'bg-green-500' },
                            { name: 'Permits & Approvals', progress: 85, status: 'active', color: 'bg-blue-500' },
                            { name: 'Construction', progress: 45, status: 'active', color: 'bg-yellow-500' },
                            { name: 'Finishing & Inspection', progress: 0, status: 'pending', color: 'bg-gray-300' },
                            { name: 'Handover & Launch', progress: 0, status: 'pending', color: 'bg-gray-300' }
                          ].map((phase, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{phase.name}</span>
                                <span className="text-sm text-muted-foreground">{phase.progress}%</span>
                              </div>
                              <Progress value={phase.progress} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="data" className="space-y-6">
                  {project.template?.tables.map((table, tableIndex) => (
                    <Card key={tableIndex}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TableIcon className="h-5 w-5" />
                          {table.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{table.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                {table.columns.map((column: any, colIndex: number) => (
                                  <TableHead key={colIndex} className="font-medium">
                                    {column.name}
                                  </TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {table.sampleData?.slice(0, 5).map((row: any, rowIndex: number) => (
                                <TableRow key={rowIndex}>
                                  {table.columns.map((column: any, colIndex: number) => (
                                    <TableCell key={colIndex}>
                                      {row[column.name] || '-'}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        {table.sampleData && table.sampleData.length > 5 && (
                          <div className="mt-4 text-center">
                            <Button variant="outline" size="sm">
                              View All {table.sampleData.length} Rows
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="gantt" className="space-y-6">
                  {project.template?.ganttConfig ? (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Gantt Chart
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Interactive timeline with forecasted, actual, and current layouts
                          </p>
                        </CardHeader>
                        <CardContent>
                          <GanttVisibilityControls
                            visibility={ganttVisibility}
                            onVisibilityChange={setGanttVisibility}
                            className="mb-4"
                          />
                          <div className="border rounded-lg p-4">
                            <AdvancedGanttChart
                              tasks={project.template.ganttConfig.tasks || []}
                              onTaskUpdate={(taskId, updates) => {
                                console.log('Task updated:', taskId, updates);
                              }}
                              className="w-full"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Gantt Chart Available</h3>
                        <p className="text-muted-foreground mb-4">
                          This project doesn't have a Gantt chart configured in its template.
                        </p>
                        <Button variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure Gantt Chart
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Available Reports</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              Progress Report
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              Budget Analysis
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              Timeline Variance
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              Team Performance
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Quick Actions</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Refresh Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Settings className="h-4 w-4 mr-2" />
                              Report Settings
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
