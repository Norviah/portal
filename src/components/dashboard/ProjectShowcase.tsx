"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
import { Separator } from "@/components/ui/Separator";

import { 
  Building, 
  Home, 
  Calendar, 
  DollarSign, 
  User, 
  MapPin, 
  FileText, 
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_PROJECTS } from "@/lib/demo-templates";

interface ProjectShowcaseProps {
  onProjectClick?: (project: any) => void;
  className?: string;
}

export function ProjectShowcase({ onProjectClick, className }: ProjectShowcaseProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    // Load projects from localStorage or use demo data
    const savedProjects = localStorage.getItem('demo-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(DEMO_PROJECTS);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'planning': return <FileText className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'commercial': return <Building className="h-5 w-5" />;
      case 'residential': return <Home className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Showcase</h2>
          <p className="text-muted-foreground">Sample projects demonstrating template usage</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {projects.length} projects
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="with-template">With Template</TabsTrigger>
          <TabsTrigger value="without-template">Without Template</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getProjectTypeIcon(project.type)}
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(project.status)}
                        {project.status}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Manager:</span>
                      <p className="font-medium">{project.manager}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Client:</span>
                      <p className="font-medium">{project.client}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p className="font-medium">{formatCurrency(project.budget)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Progress:</span>
                      <p className="font-medium">{project.progress}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>

                  {project.templateName && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Template: {project.templateName}
                      </Badge>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Start: {formatDate(project.startDate)}</span>
                    <span>End: {formatDate(project.endDate)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="with-template" className="space-y-4">
          {projects.filter(p => p.templateId).map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => onProjectClick?.(project)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getProjectTypeIcon(project.type)}
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.name}
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    {project.templateName}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Template Used:</span>
                    <p className="font-medium">{project.templateName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tables:</span>
                    <p className="font-medium">{project.tables?.length || 0} tables</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gantt Tasks:</span>
                    <p className="font-medium">{project.ganttTasks?.length || 0} tasks</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Progress:</span>
                    <p className="font-medium">{project.progress}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Template Benefits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pre-configured tables with relevant columns</li>
                    <li>• Gantt chart with realistic task dependencies</li>
                    <li>• Standardized workflow and processes</li>
                    <li>• Built-in validation and data types</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="without-template" className="space-y-4">
          {projects.filter(p => !p.templateId).map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => onProjectClick?.(project)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getProjectTypeIcon(project.type)}
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.name}
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    Custom Setup
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Setup Type:</span>
                    <p className="font-medium">Custom (No Template)</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tables:</span>
                    <p className="font-medium">{project.tables?.length || 0} tables</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gantt Tasks:</span>
                    <p className="font-medium">{project.ganttTasks?.length || 0} tasks</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Progress:</span>
                    <p className="font-medium">{project.progress}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Custom Setup</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Manually created tables and columns</li>
                    <li>• Custom Gantt chart configuration</li>
                    <li>• Flexible but requires more setup time</li>
                    <li>• Tailored to specific project needs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getProjectTypeIcon(selectedProject.type)}
                {selectedProject.name}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                <Eye className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Project Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Description:</span> {selectedProject.description}</p>
                  <p><span className="text-muted-foreground">Manager:</span> {selectedProject.manager}</p>
                  <p><span className="text-muted-foreground">Client:</span> {selectedProject.client}</p>
                  <p><span className="text-muted-foreground">Location:</span> {selectedProject.location}</p>
                  <p><span className="text-muted-foreground">Type:</span> {selectedProject.type}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Financials</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Budget:</span> {formatCurrency(selectedProject.budget)}</p>
                  <p><span className="text-muted-foreground">Actual Cost:</span> {formatCurrency(selectedProject.actualCost)}</p>
                  <p><span className="text-muted-foreground">Remaining:</span> {formatCurrency(selectedProject.budget - selectedProject.actualCost)}</p>
                </div>
              </div>
            </div>

            {selectedProject.tables && selectedProject.tables.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tables ({selectedProject.tables.length})</h4>
                <div className="space-y-2">
                  {selectedProject.tables.map((table: any) => (
                    <div key={table.id} className="p-2 border rounded text-sm">
                      <div className="font-medium">{table.name}</div>
                      <div className="text-muted-foreground">{table.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {table.columns?.length || 0} columns, {table.rows?.length || 0} rows
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.ganttTasks && selectedProject.ganttTasks.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Gantt Tasks ({selectedProject.ganttTasks.length})</h4>
                <div className="space-y-1">
                  {selectedProject.ganttTasks.slice(0, 5).map((task: any) => (
                    <div key={task.id} className="flex items-center justify-between p-2 border rounded text-sm">
                      <span>{task.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {task.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                  {selectedProject.ganttTasks.length > 5 && (
                    <div className="text-xs text-muted-foreground text-center">
                      ... and {selectedProject.ganttTasks.length - 5} more tasks
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
