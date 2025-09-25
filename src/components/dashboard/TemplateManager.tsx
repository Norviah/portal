"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";

import { Plus, Edit, Trash2, Copy, Eye, Calendar, BarChart3, Table as TableIcon, Settings, ExternalLink, Star, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getSampleTemplates, SampleTemplate } from "@/lib/sample-templates";

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: 'table' | 'gantt' | 'mixed';
  tables: {
    id: string;
    name: string;
    columns: any[];
    rows: any[];
  }[];
  ganttTasks: any[];
  createdAt: string;
  updatedAt: string;
}

interface TemplateManagerProps {
  onSelectTemplate?: (template: ProjectTemplate) => void;
  className?: string;
}

export function TemplateManager({ onSelectTemplate, className }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [sampleTemplates, setSampleTemplates] = useState<SampleTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'table' | 'gantt' | 'mixed'>('all');
  const [activeTab, setActiveTab] = useState<'my-templates' | 'sample-templates'>('my-templates');

  // Load templates from localStorage and sample templates
  useEffect(() => {
    const savedTemplates = localStorage.getItem('project-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
    
    // Load sample templates
    setSampleTemplates(getSampleTemplates());
  }, []);

  // Save templates to localStorage
  const saveTemplates = (newTemplates: ProjectTemplate[]) => {
    setTemplates(newTemplates);
    localStorage.setItem('project-templates', JSON.stringify(newTemplates));
  };


  const handleEditTemplate = (templateId: string, updates: Partial<ProjectTemplate>) => {
    const newTemplates = templates.map(template =>
      template.id === templateId ? { ...template, ...updates, updatedAt: new Date().toISOString() } : template
    );
    saveTemplates(newTemplates);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const newTemplates = templates.filter(template => template.id !== templateId);
    saveTemplates(newTemplates);
  };

  const handleUseSampleTemplate = (sampleTemplate: SampleTemplate) => {
    // Convert sample template to project template format
    const projectTemplate: ProjectTemplate = {
      id: `template-${Date.now()}`,
      name: `${sampleTemplate.name} (Copy)`,
      description: sampleTemplate.description,
      type: sampleTemplate.type,
      tables: sampleTemplate.tables.map(table => ({
        id: table.id,
        name: table.name,
        columns: table.columns,
        rows: table.sampleData
      })),
      ganttTasks: sampleTemplate.ganttTasks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to user's templates
    const newTemplates = [...templates, projectTemplate];
    saveTemplates(newTemplates);
    
    // Switch to my templates tab
    setActiveTab('my-templates');
    
    // Select the new template
    setSelectedTemplate(projectTemplate);
  };

  const handleDuplicateTemplate = (template: ProjectTemplate) => {
    const duplicatedTemplate: ProjectTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const newTemplates = [...templates, duplicatedTemplate];
    saveTemplates(newTemplates);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'table': return <TableIcon className="h-5 w-5" />;
      case 'gantt': return <BarChart3 className="h-5 w-5" />;
      case 'mixed': return <Settings className="h-5 w-5" />;
      default: return <TableIcon className="h-5 w-5" />;
    }
  };

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case 'table': return 'bg-blue-100 text-blue-800';
      case 'gantt': return 'bg-green-100 text-green-800';
      case 'mixed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Template Manager</h2>
          <p className="text-muted-foreground">Create and manage project templates</p>
        </div>
        <Link href="/template-builder">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-templates">My Templates</TabsTrigger>
          <TabsTrigger value="sample-templates">Sample Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="my-templates" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="table">Table Only</SelectItem>
                <SelectItem value="gantt">Gantt Only</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Settings className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first template to get started'
              }
            </p>
            {!searchQuery && filterType === 'all' && (
              <Button asChild>
                <Link href="/template-builder">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Template
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTemplateIcon(template.type)}
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge className={cn("text-xs", getTemplateTypeColor(template.type))}>
                        {template.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDuplicateTemplate(template)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.description}
                </p>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Tables:</span>
                    <span>{template.tables.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tasks:</span>
                    <span>{template.ganttTasks.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Created:</span>
                    <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => onSelectTemplate?.(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
        </TabsContent>

        <TabsContent value="sample-templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTemplateIcon(template.type)}
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {template.name}
                          <Star className="h-4 w-4 text-yellow-500" />
                        </CardTitle>
                        <Badge className={cn("text-xs", getTemplateTypeColor(template.type))}>
                          {template.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Tables:</span>
                      <span>{template.tables.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tasks:</span>
                      <span>{template.ganttTasks.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Category:</span>
                      <span className="capitalize">{template.category}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUseSampleTemplate(template)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTemplate(template as any)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Preview Dialog */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedTemplate.name}</DialogTitle>
              <DialogDescription>{selectedTemplate.description}</DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tables">Tables</TabsTrigger>
                <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Template Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <Badge className={getTemplateTypeColor(selectedTemplate.type)}>
                          {selectedTemplate.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Tables:</span>
                        <span>{selectedTemplate.tables.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tasks:</span>
                        <span>{selectedTemplate.ganttTasks.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{new Date(selectedTemplate.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Updated:</span>
                        <span>{new Date(selectedTemplate.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => {
                          onSelectTemplate?.(selectedTemplate);
                          setSelectedTemplate(null);
                        }}
                      >
                        Use This Template
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleDuplicateTemplate(selectedTemplate)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tables" className="space-y-4">
                {selectedTemplate.tables.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <TableIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No tables in this template</p>
                    </CardContent>
                  </Card>
                ) : (
                  selectedTemplate.tables.map((table) => (
                    <Card key={table.id}>
                      <CardHeader>
                        <CardTitle className="text-base">{table.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            {table.columns.length} columns, {table.rows.length} rows
                          </div>
                          <div className="space-y-1">
                            {table.columns.map((column, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <Badge variant="outline" className="text-xs">
                                  {column.type}
                                </Badge>
                                <span>{column.name}</span>
                                {column.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="gantt" className="space-y-4">
                {selectedTemplate.ganttTasks.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No Gantt tasks in this template</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedTemplate.ganttTasks.map((task) => (
                      <Card key={task.id}>
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">{task.name}</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Forecasted:</span>
                                <p>{task.forecastedStart} - {task.forecastedEnd}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Status:</span>
                                <Badge className={cn("ml-2", getTemplateTypeColor(task.status))}>
                                  {task.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
