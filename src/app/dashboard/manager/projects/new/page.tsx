"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Calendar } from "@/components/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";

import { 
  Plus, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign, 
  FileText, 
  Clock,
  Building,
  Home,
  Wrench,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Upload,
  Link
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

interface User {
  email: string;
  name: string;
  role: string;
}

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  client: z.string().min(1, "Client is required"),
  clientEmail: z.string().email("Valid email is required"),
  clientPhone: z.string().min(1, "Phone number is required"),
  projectType: z.string().min(1, "Project type is required"),
  priority: z.string().min(1, "Priority is required"),
  budget: z.number().min(1, "Budget must be greater than 0"),
  startDate: z.date(),
  endDate: z.date(),
  teamSize: z.number().min(1, "Team size must be at least 1"),
  location: z.string().min(1, "Location is required"),
  requirements: z.array(z.string()).optional(),
  milestones: z.array(z.object({
    name: z.string(),
    dueDate: z.date(),
    description: z.string()
  })).optional()
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ManagerNewProjectPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [milestones, setMilestones] = useState<Array<{name: string, dueDate: Date, description: string}>>([]);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      client: "",
      clientEmail: "",
      clientPhone: "",
      projectType: "",
      priority: "",
      budget: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      teamSize: 1,
      location: "",
      requirements: [],
      milestones: []
    }
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const projectTypes = [
    { value: "residential", label: "Residential", icon: Home },
    { value: "commercial", label: "Commercial", icon: Building },
    { value: "renovation", label: "Renovation", icon: Wrench },
    { value: "new-construction", label: "New Construction", icon: Building }
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" }
  ];

  const templates = [
    {
      id: "residential-renovation",
      name: "Residential Renovation",
      description: "Complete home renovation template with standard phases",
      type: "residential",
      estimatedDuration: 90,
      estimatedBudget: 75000,
      teamSize: 6,
      phases: ["Planning", "Demolition", "Construction", "Finishing", "Final Walkthrough"]
    },
    {
      id: "commercial-office",
      name: "Commercial Office",
      description: "Office space renovation and construction template",
      type: "commercial",
      estimatedDuration: 120,
      estimatedBudget: 150000,
      teamSize: 10,
      phases: ["Design", "Permits", "Construction", "Systems", "Furnishing"]
    },
    {
      id: "retail-space",
      name: "Retail Space",
      description: "Retail store construction and fit-out template",
      type: "commercial",
      estimatedDuration: 60,
      estimatedBudget: 50000,
      teamSize: 5,
      phases: ["Design", "Construction", "Fixtures", "Signage", "Opening"]
    }
  ];

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addMilestone = () => {
    setMilestones([...milestones, { name: "", dueDate: new Date(), description: "" }]);
  };

  const updateMilestone = (index: number, field: string, value: any) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const applyTemplate = (template: any) => {
    setSelectedTemplate(template.id);
    form.setValue("projectType", template.type);
    form.setValue("teamSize", template.teamSize);
    form.setValue("budget", template.estimatedBudget);
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + template.estimatedDuration);
    form.setValue("endDate", endDate);
    
    setMilestones(template.phases.map((phase: string, index: number) => ({
      name: phase,
      dueDate: new Date(Date.now() + (index + 1) * (template.estimatedDuration / template.phases.length) * 24 * 60 * 60 * 1000),
      description: `${phase} phase of the project`
    })));
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Project created:", { ...data, requirements, milestones });
      // Redirect to project details or projects list
      window.location.href = "/dashboard/manager/projects/active";
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar role="manager" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Create New Project"
          description="Set up a new project and assign team members"
          breadcrumbs={[
            { label: "Manager Dashboard", href: "/dashboard/manager" },
            { label: "My Projects", href: "#" },
            { label: "Create Project", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
              <p className="text-gray-600 mt-1">Set up a new project and assign team members</p>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="template">Templates</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>Basic project details and client information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter project name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description *</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe the project scope and objectives" 
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Type *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select project type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {projectTypes.map((type) => {
                                      const Icon = type.icon;
                                      return (
                                        <SelectItem key={type.value} value={type.value}>
                                          <div className="flex items-center space-x-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{type.label}</span>
                                          </div>
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Priority *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select priority level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {priorities.map((priority) => (
                                      <SelectItem key={priority.value} value={priority.value}>
                                        <div className="flex items-center space-x-2">
                                          <Badge className={priority.color}>
                                            {priority.label}
                                          </Badge>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter client name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="clientEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="client@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="clientPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client Phone *</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Location *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter project address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="template" className="space-y-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Project Templates</CardTitle>
                  <CardDescription>Choose from pre-configured project templates or start from scratch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template) => {
                      const Icon = projectTypes.find(t => t.value === template.type)?.icon || Building;
                      return (
                        <Card 
                          key={template.id} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => applyTemplate(template)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center space-x-2">
                              <Icon className="h-5 w-5 text-blue-600" />
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                            </div>
                            <CardDescription>{template.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Duration:</span>
                              <span className="font-medium">{template.estimatedDuration} days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Budget:</span>
                              <span className="font-medium">${template.estimatedBudget.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Team Size:</span>
                              <span className="font-medium">{template.teamSize} members</span>
                            </div>
                            <div className="pt-2">
                              <div className="text-xs text-gray-600 mb-1">Phases:</div>
                              <div className="flex flex-wrap gap-1">
                                {template.phases.map((phase, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {phase}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Budget & Timeline</CardTitle>
                    <CardDescription>Set project budget and timeline</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Budget *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                type="number" 
                                placeholder="0" 
                                className="pl-10"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                type="number" 
                                placeholder="1" 
                                className="pl-10"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <CardTitle>Project Requirements</CardTitle>
                    <CardDescription>Add specific requirements and milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Requirements</Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          placeholder="Add requirement"
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                        />
                        <Button type="button" onClick={addRequirement} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 space-y-1">
                        {requirements.map((req, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{req}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRequirement(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Milestones</Label>
                        <Button type="button" onClick={addMilestone} size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Milestone
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {milestones.map((milestone, index) => (
                          <div key={index} className="p-3 border rounded-lg space-y-2">
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Milestone name"
                                value={milestone.name}
                                onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMilestone(index)}
                              >
                                ×
                              </Button>
                            </div>
                            <Input
                              placeholder="Description"
                              value={milestone.description}
                              onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                            />
                            <div className="flex space-x-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(milestone.dueDate, "PPP")}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={milestone.dueDate}
                                    onSelect={(date) => updateMilestone(index, 'dueDate', date || new Date())}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Review & Create</CardTitle>
                  <CardDescription>Review all project details before creating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="font-medium">Project Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{form.watch("name") || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">{form.watch("projectType") || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority:</span>
                            <span className="font-medium">{form.watch("priority") || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Budget:</span>
                            <span className="font-medium">${form.watch("budget")?.toLocaleString() || "0"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Client Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Client:</span>
                            <span className="font-medium">{form.watch("client") || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{form.watch("clientEmail") || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{form.watch("clientPhone") || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{form.watch("location") || "Not specified"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Ready to create project with {milestones.length} milestones and {requirements.length} requirements
                        </div>
                        <Button 
                          onClick={form.handleSubmit(onSubmit)} 
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isSubmitting ? (
                            <>
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Create Project
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
