"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
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
  Info,
  Edit,
  Save,
  X,
  Plus,
  ExternalLink
} from "lucide-react";
import { AdvancedGanttChart } from "@/components/dashboard/AdvancedGanttChart";
import { GanttVisibilityControls } from "@/components/dashboard/GanttVisibilityControls";

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

// Sample project data - in a real app, this would come from an API
const SAMPLE_PROJECTS: Record<string, Project> = {
  'proj-1': {
    id: 'proj-1',
    name: 'Modern Home Renovation',
    description: 'Complete renovation of a 3-bedroom family home with modern amenities',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    progress: 65,
    budget: 250000,
    actualCost: 162500,
    template: {
      id: 'template-renovation',
      name: 'Home Renovation Template',
      type: 'mixed',
      tables: [
        {
          name: 'Renovation Tasks',
          description: 'Detailed task breakdown for home renovation',
          columns: [
            { name: 'Task', type: 'text' },
            { name: 'Phase', type: 'dropdown', options: ['Planning', 'Demolition', 'Construction', 'Finishing'] },
            { name: 'Start Date', type: 'date' },
            { name: 'End Date', type: 'date' },
            { name: 'Contractor', type: 'text' },
            { name: 'Budget', type: 'currency' },
            { name: 'Actual Cost', type: 'currency' },
            { name: 'Status', type: 'status', options: ['Not Started', 'In Progress', 'Completed'] }
          ],
          sampleData: [
            { 'Task': 'Site Survey & Planning', 'Phase': 'Planning', 'Start Date': '2024-01-15', 'End Date': '2024-02-15', 'Contractor': 'ABC Architects', 'Budget': 15000, 'Actual Cost': 15000, 'Status': 'Completed' },
            { 'Task': 'Permit Applications', 'Phase': 'Planning', 'Start Date': '2024-01-20', 'End Date': '2024-03-01', 'Contractor': 'City Permits', 'Budget': 5000, 'Actual Cost': 5200, 'Status': 'Completed' },
            { 'Task': 'Demolition Work', 'Phase': 'Demolition', 'Start Date': '2024-03-01', 'End Date': '2024-04-15', 'Contractor': 'Demo Pro LLC', 'Budget': 25000, 'Actual Cost': 23000, 'Status': 'Completed' },
            { 'Task': 'Foundation Work', 'Phase': 'Construction', 'Start Date': '2024-04-15', 'End Date': '2024-06-15', 'Contractor': 'Foundation Masters', 'Budget': 45000, 'Actual Cost': 42000, 'Status': 'Completed' },
            { 'Task': 'Framing & Structure', 'Phase': 'Construction', 'Start Date': '2024-06-15', 'End Date': '2024-08-15', 'Contractor': 'Frame Builders', 'Budget': 60000, 'Actual Cost': 58000, 'Status': 'In Progress' },
            { 'Task': 'Electrical & Plumbing', 'Phase': 'Construction', 'Start Date': '2024-08-01', 'End Date': '2024-09-30', 'Contractor': 'MEP Solutions', 'Budget': 35000, 'Actual Cost': 0, 'Status': 'Not Started' },
            { 'Task': 'Interior Finishing', 'Phase': 'Finishing', 'Start Date': '2024-10-01', 'End Date': '2024-12-15', 'Contractor': 'Finish Perfect', 'Budget': 40000, 'Actual Cost': 0, 'Status': 'Not Started' }
          ]
        },
        {
          name: 'Budget Tracking',
          description: 'Financial tracking and cost management',
          columns: [
            { name: 'Category', type: 'text' },
            { name: 'Budgeted', type: 'currency' },
            { name: 'Spent', type: 'currency' },
            { name: 'Remaining', type: 'currency' },
            { name: 'Variance %', type: 'percentage' }
          ],
          sampleData: [
            { 'Category': 'Planning & Design', 'Budgeted': 20000, 'Spent': 20200, 'Remaining': -200, 'Variance %': 1.0 },
            { 'Category': 'Demolition', 'Budgeted': 25000, 'Spent': 23000, 'Remaining': 2000, 'Variance %': -8.0 },
            { 'Category': 'Construction', 'Budgeted': 140000, 'Spent': 100000, 'Remaining': 40000, 'Variance %': -28.6 },
            { 'Category': 'Finishing', 'Budgeted': 40000, 'Spent': 0, 'Remaining': 40000, 'Variance %': 0 },
            { 'Category': 'Contingency', 'Budgeted': 25000, 'Spent': 9200, 'Remaining': 15800, 'Variance %': -63.2 }
          ]
        }
      ],
      ganttConfig: {
        tasks: [
          {
            id: 'task-1',
            name: 'Site Survey & Planning',
            start: '2024-01-15',
            end: '2024-02-15',
            progress: 100,
            dependencies: [],
            category: 'Planning',
            assignee: 'ABC Architects',
            priority: 'high'
          },
          {
            id: 'task-2',
            name: 'Permit Applications',
            start: '2024-01-20',
            end: '2024-03-01',
            progress: 100,
            dependencies: ['task-1'],
            category: 'Planning',
            assignee: 'City Permits',
            priority: 'high'
          },
          {
            id: 'task-3',
            name: 'Demolition Work',
            start: '2024-03-01',
            end: '2024-04-15',
            progress: 100,
            dependencies: ['task-2'],
            category: 'Demolition',
            assignee: 'Demo Pro LLC',
            priority: 'medium'
          },
          {
            id: 'task-4',
            name: 'Foundation Work',
            start: '2024-04-15',
            end: '2024-06-15',
            progress: 100,
            dependencies: ['task-3'],
            category: 'Construction',
            assignee: 'Foundation Masters',
            priority: 'high'
          },
          {
            id: 'task-5',
            name: 'Framing & Structure',
            start: '2024-06-15',
            end: '2024-08-15',
            progress: 75,
            dependencies: ['task-4'],
            category: 'Construction',
            assignee: 'Frame Builders',
            priority: 'high'
          },
          {
            id: 'task-6',
            name: 'Electrical & Plumbing',
            start: '2024-08-01',
            end: '2024-09-30',
            progress: 0,
            dependencies: ['task-5'],
            category: 'Construction',
            assignee: 'MEP Solutions',
            priority: 'medium'
          },
          {
            id: 'task-7',
            name: 'Interior Finishing',
            start: '2024-10-01',
            end: '2024-12-15',
            progress: 0,
            dependencies: ['task-6'],
            category: 'Finishing',
            assignee: 'Finish Perfect',
            priority: 'low'
          }
        ]
      }
    },
    team: ['John Smith', 'Sarah Johnson', 'Mike Chen']
  },
  'proj-2': {
    id: 'proj-2',
    name: 'Office Building',
    description: 'Modern 15-story office building with retail space and parking garage',
    status: 'planning',
    startDate: '2024-06-01',
    endDate: '2026-03-31',
    progress: 25,
    budget: 45000000,
    actualCost: 11250000,
    template: {
      id: 'template-commercial',
      name: 'Commercial Development Template',
      type: 'mixed',
      tables: [
        {
          name: 'Construction Phases',
          description: 'Major construction phases and milestones',
          columns: [
            { name: 'Phase', type: 'text' },
            { name: 'Start Date', type: 'date' },
            { name: 'End Date', type: 'date' },
            { name: 'Duration (weeks)', type: 'number' },
            { name: 'Contractor', type: 'text' },
            { name: 'Budget', type: 'currency' },
            { name: 'Status', type: 'status', options: ['Not Started', 'In Progress', 'Completed', 'Delayed'] }
          ],
          sampleData: [
            { 'Phase': 'Site Preparation', 'Start Date': '2024-06-01', 'End Date': '2024-08-31', 'Duration (weeks)': 12, 'Contractor': 'Site Prep Co', 'Budget': 2000000, 'Status': 'Completed' },
            { 'Phase': 'Foundation & Basement', 'Start Date': '2024-09-01', 'End Date': '2024-12-31', 'Duration (weeks)': 17, 'Contractor': 'Foundation Masters', 'Budget': 8000000, 'Status': 'In Progress' },
            { 'Phase': 'Steel Structure', 'Start Date': '2025-01-01', 'End Date': '2025-06-30', 'Duration (weeks)': 26, 'Contractor': 'Steel Builders', 'Budget': 12000000, 'Status': 'Not Started' },
            { 'Phase': 'MEP Installation', 'Start Date': '2025-04-01', 'End Date': '2025-10-31', 'Duration (weeks)': 30, 'Contractor': 'MEP Solutions', 'Budget': 6000000, 'Status': 'Not Started' },
            { 'Phase': 'Interior Finishing', 'Start Date': '2025-08-01', 'End Date': '2026-01-31', 'Duration (weeks)': 26, 'Contractor': 'Finish Perfect', 'Budget': 8000000, 'Status': 'Not Started' },
            { 'Phase': 'Final Inspection', 'Start Date': '2026-02-01', 'End Date': '2026-03-31', 'Duration (weeks)': 8, 'Contractor': 'City Inspectors', 'Budget': 500000, 'Status': 'Not Started' }
          ]
        },
        {
          name: 'Budget Breakdown',
          description: 'Detailed financial tracking by category',
          columns: [
            { name: 'Category', type: 'text' },
            { name: 'Original Budget', type: 'currency' },
            { name: 'Revised Budget', type: 'currency' },
            { name: 'Committed', type: 'currency' },
            { name: 'Spent', type: 'currency' },
            { name: 'Remaining', type: 'currency' },
            { name: 'Variance', type: 'currency' }
          ],
          sampleData: [
            { 'Category': 'Land Acquisition', 'Original Budget': 8000000, 'Revised Budget': 8000000, 'Committed': 8000000, 'Spent': 8000000, 'Remaining': 0, 'Variance': 0 },
            { 'Category': 'Design & Engineering', 'Original Budget': 3000000, 'Revised Budget': 3200000, 'Committed': 3200000, 'Spent': 2500000, 'Remaining': 700000, 'Variance': 200000 },
            { 'Category': 'Permits & Fees', 'Original Budget': 2000000, 'Revised Budget': 2000000, 'Committed': 2000000, 'Spent': 750000, 'Remaining': 1250000, 'Variance': 0 },
            { 'Category': 'Construction', 'Original Budget': 30000000, 'Revised Budget': 30000000, 'Committed': 20000000, 'Spent': 0, 'Remaining': 30000000, 'Variance': 0 },
            { 'Category': 'Contingency', 'Original Budget': 2000000, 'Revised Budget': 2000000, 'Committed': 0, 'Spent': 0, 'Remaining': 2000000, 'Variance': 0 }
          ]
        }
      ],
      ganttConfig: {
        tasks: [
          {
            id: 'com-1',
            name: 'Site Preparation',
            start: '2024-06-01',
            end: '2024-08-31',
            progress: 100,
            dependencies: [],
            category: 'Site Work',
            assignee: 'Site Prep Co',
            priority: 'high'
          },
          {
            id: 'com-2',
            name: 'Foundation & Basement',
            start: '2024-09-01',
            end: '2024-12-31',
            progress: 60,
            dependencies: ['com-1'],
            category: 'Foundation',
            assignee: 'Foundation Masters',
            priority: 'high'
          },
          {
            id: 'com-3',
            name: 'Steel Structure',
            start: '2025-01-01',
            end: '2025-06-30',
            progress: 0,
            dependencies: ['com-2'],
            category: 'Structure',
            assignee: 'Steel Builders',
            priority: 'high'
          },
          {
            id: 'com-4',
            name: 'MEP Installation',
            start: '2025-04-01',
            end: '2025-10-31',
            progress: 0,
            dependencies: ['com-3'],
            category: 'MEP',
            assignee: 'MEP Solutions',
            priority: 'medium'
          },
          {
            id: 'com-5',
            name: 'Interior Finishing',
            start: '2025-08-01',
            end: '2026-01-31',
            progress: 0,
            dependencies: ['com-4'],
            category: 'Finishing',
            assignee: 'Finish Perfect',
            priority: 'medium'
          },
          {
            id: 'com-6',
            name: 'Final Inspection',
            start: '2026-02-01',
            end: '2026-03-31',
            progress: 0,
            dependencies: ['com-5'],
            category: 'Completion',
            assignee: 'City Inspectors',
            priority: 'high'
          }
        ]
      }
    },
    team: ['Emily Davis', 'Robert Wilson', 'Lisa Chen']
  }
};

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
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
    criticalPath: false,
    milestones: true,
    labels: true,
    grid: true,
    weekends: true,
    holidays: false,
    priorities: false,
    phases: false
  });

  const [ganttViewSettings, setGanttViewSettings] = useState({
    mode: 'overlay' as 'separate' | 'overlay' | 'comparison' | 'variance',
    displayMode: 'timeline' as 'timeline' | 'table' | 'kanban' | 'calendar',
    timelineScale: 'week' as 'day' | 'week' | 'month' | 'quarter',
    showWeekends: true,
    showHolidays: false,
    showGrid: true,
    showLabels: true,
    opacity: 0.8,
    height: 400,
    compactMode: false,
    autoFit: true
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading project data
    const loadProject = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const projectData = SAMPLE_PROJECTS[projectId];
      if (projectData) {
        setProject(projectData);
      } else {
        // Project not found, redirect to dashboard
        router.push('/dashboard/manager');
      }
      
      setIsLoading(false);
    };

    loadProject();
  }, [projectId, router]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/dashboard/manager')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const budgetVariance = project.actualCost - project.budget;
  const budgetVariancePercent = project.budget > 0 ? (budgetVariance / project.budget) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/manager')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  {project.name}
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                  </Badge>
                </h1>
                <p className="text-muted-foreground mt-1">{project.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
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
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="data">Data Tables</TabsTrigger>
            <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

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
            {project.template ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TableIcon className="h-5 w-5" />
                      Template Information
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => project.template && router.push(`/template-builder?edit=${project.template.id}`)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab('template')}
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Modify for Project
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Template Details</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Template Name:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{project.template.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => project.template && router.push(`/template-builder?edit=${project.template.id}`)}
                              className="h-6 w-6 p-0"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
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
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Template ID:</span>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{project.template.id}</code>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Project Timeline</h4>
                      <div className="space-y-3 text-sm">
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
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Template Status:</span>
                          <Badge variant="secondary" className="text-xs">
                            Original
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {false && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Project-Specific Modifications</span>
                      </div>
                      <p className="text-xs text-blue-700">
                        This project has custom modifications to the template. Changes only affect this project.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <TableIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Template Used</h3>
                  <p className="text-muted-foreground mb-4">
                    This project doesn't use a template. You can create a custom setup or apply a template.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" onClick={() => router.push('/template-builder')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/dashboard/manager')}>
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Templates
                    </Button>
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
                        {table.sampleData?.slice(0, 10).map((row: any, rowIndex: number) => (
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
                  {table.sampleData && table.sampleData.length > 10 && (
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
                      viewSettings={ganttViewSettings}
                      onVisibilityChange={setGanttVisibility}
                      onViewSettingsChange={setGanttViewSettings}
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

          <TabsContent value="template" className="space-y-6">
            {project.template ? (
              <div className="space-y-6">
                {/* Template Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TableIcon className="h-5 w-5" />
                      Template Overview
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage template settings and modifications for this project
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Template Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-medium">{project.template.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <Badge variant="outline" className="capitalize text-xs">
                              {project.template.type}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tables:</span>
                            <span className="font-medium">{project.template.tables.length}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Project Modifications</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant="secondary" className="text-xs">
                              Original
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Custom Tables:</span>
                            <span className="font-medium">0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Custom Tasks:</span>
                            <span className="font-medium">0</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Actions</h4>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => project.template && router.push(`/template-builder?edit=${project.template.id}`)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Global Template
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => {
                              // Add logic to modify template for this project
                              console.log('Modify template for project');
                            }}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Modify for Project
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => {
                              // Add logic to reset to original template
                              console.log('Reset to original template');
                            }}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset to Original
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Template Tables */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TableIcon className="h-5 w-5" />
                      Template Tables
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tables defined in the template and their project-specific modifications
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.template.tables.map((table, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{table.name}</h4>
                              <p className="text-sm text-muted-foreground">{table.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {table.columns.length} columns
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            {table.columns.slice(0, 4).map((column: any, colIndex: number) => (
                              <div key={colIndex} className="p-2 bg-muted rounded text-center">
                                <div className="font-medium">{column.name}</div>
                                <div className="text-muted-foreground capitalize">{column.type}</div>
                              </div>
                            ))}
                            {table.columns.length > 4 && (
                              <div className="p-2 bg-muted rounded text-center flex items-center justify-center">
                                <span className="text-muted-foreground">+{table.columns.length - 4} more</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Gantt Configuration */}
                {project.template.ganttConfig && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Gantt Chart Configuration
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Timeline configuration and task dependencies
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Task Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Tasks:</span>
                              <span className="font-medium">{project.template.ganttConfig.tasks?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Categories:</span>
                              <span className="font-medium">
                                {new Set(project.template.ganttConfig.tasks?.map((t: any) => t.category)).size}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Dependencies:</span>
                              <span className="font-medium">
                                {project.template.ganttConfig.tasks?.filter((t: any) => t.dependencies?.length > 0).length || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Quick Actions</h4>
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Timeline
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Gantt Chart
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              Export Timeline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <TableIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Template Applied</h3>
                  <p className="text-muted-foreground mb-4">
                    This project doesn't use a template. Apply a template to get started with structured data and timelines.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Button onClick={() => router.push('/dashboard/manager')}>
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Templates
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/template-builder')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Template
                    </Button>
                  </div>
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
        </Tabs>
      </div>
    </div>
  );
}
