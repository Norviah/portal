"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

import { Plus, Calendar, BarChart3, Table as TableIcon, Settings, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: 'table' | 'gantt' | 'mixed';
  tables: any[];
  ganttTasks: any[];
  createdAt: string;
  updatedAt: string;
}

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: {
    name: string;
    description: string;
    template?: ProjectTemplate;
    startDate: string;
    endDate: string;
  }) => void;
}

export function NewProjectDialog({ open, onOpenChange, onCreateProject }: NewProjectDialogProps) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [creationMethod, setCreationMethod] = useState<'template' | 'blank'>('template');
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('project-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  // Set default dates
  useEffect(() => {
    if (open) {
      const today = new Date();
      const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      setStartDate(today.toISOString().split('T')[0]);
      setEndDate(nextMonth.toISOString().split('T')[0]);
    }
  }, [open]);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    const project = {
      name: projectName,
      description: projectDescription,
      template: creationMethod === 'template' ? selectedTemplate || undefined : undefined,
      startDate,
      endDate
    };

    onCreateProject(project);
    
    // Reset form
    setProjectName('');
    setProjectDescription('');
    setSelectedTemplate(null);
    setCreationMethod('template');
    setSearchQuery('');
    
    onOpenChange(false);
  };

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'table': return <TableIcon className="h-4 w-4" />;
      case 'gantt': return <BarChart3 className="h-4 w-4" />;
      case 'mixed': return <Settings className="h-4 w-4" />;
      default: return <TableIcon className="h-4 w-4" />;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start a new project using a template or create from scratch
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="template">Template Selection</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-name">Project Name *</Label>
                    <Input
                      id="project-name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="creation-method">Creation Method</Label>
                    <RadioGroup
                      value={creationMethod}
                      onValueChange={(value: any) => setCreationMethod(value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="template" id="template" />
                        <Label htmlFor="template">Use Template</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="blank" id="blank" />
                        <Label htmlFor="blank">Start Blank</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your project..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="template" className="space-y-4">
            {creationMethod === 'template' ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Badge variant="outline">
                    {filteredTemplates.length} templates
                  </Badge>
                </div>

                {filteredTemplates.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery 
                          ? 'Try adjusting your search criteria'
                          : 'No templates available. Create one in the Template Manager.'
                        }
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          selectedTemplate?.id === template.id && "ring-2 ring-blue-500"
                        )}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getTemplateIcon(template.type)}
                              <div>
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                <Badge className={cn("text-xs", getTemplateTypeColor(template.type))}>
                                  {template.type.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            {selectedTemplate?.id === template.id && (
                              <CheckCircle className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {template.description}
                          </p>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Tables:</span>
                              <span>{template.tables.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tasks:</span>
                              <span>{template.ganttTasks.length}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start from Scratch</h3>
                  <p className="text-muted-foreground text-center">
                    You'll create a blank project that you can customize as needed.
                    You can always add tables and Gantt charts later.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">{projectName || 'Untitled Project'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {projectDescription || 'No description provided'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Start Date:</span>
                    <p>{startDate ? new Date(startDate).toLocaleDateString() : 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">End Date:</span>
                    <p>{endDate ? new Date(endDate).toLocaleDateString() : 'Not set'}</p>
                  </div>
                </div>

                {selectedTemplate && (
                  <div className="space-y-2">
                    <h5 className="font-medium">Template Details</h5>
                    <div className="flex items-center gap-2">
                      {getTemplateIcon(selectedTemplate.type)}
                      <span className="text-sm">{selectedTemplate.name}</span>
                      <Badge className={cn("text-xs", getTemplateTypeColor(selectedTemplate.type))}>
                        {selectedTemplate.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedTemplate.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span>Tables: </span>
                        <span>{selectedTemplate.tables.length}</span>
                      </div>
                      <div>
                        <span>Tasks: </span>
                        <span>{selectedTemplate.ganttTasks.length}</span>
                      </div>
                    </div>
                  </div>
                )}

                {creationMethod === 'blank' && (
                  <div className="space-y-2">
                    <h5 className="font-medium">Blank Project</h5>
                    <p className="text-sm text-muted-foreground">
                      This project will start with no predefined structure.
                      You can add tables and Gantt charts as needed.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateProject}
            disabled={!projectName.trim() || (creationMethod === 'template' && !selectedTemplate)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
