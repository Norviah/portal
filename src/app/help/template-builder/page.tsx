"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Alert, AlertDescription } from "@/components/ui/Alert";

import { 
  ArrowLeft, 
  BookOpen, 
  Lightbulb, 
  Settings, 
  BarChart3, 
  Table as TableIcon,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

export default function TemplateBuilderHelpPage() {
  const router = useRouter();

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
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div>
                <h1 className="text-2xl font-bold">Template Builder Help</h1>
                <p className="text-sm text-muted-foreground">
                  Learn how to create powerful project templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="gantt">Gantt Charts</TabsTrigger>
            <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The Template Builder allows you to create reusable project templates that can be applied to new projects. 
                  This saves time and ensures consistency across similar projects.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">What You Can Create</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Custom data tables with 50+ column types</li>
                      <li>• Gantt charts with task dependencies</li>
                      <li>• Real estate specific templates</li>
                      <li>• Mixed templates with both tables and Gantt</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Template Types</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Table Only:</strong> Data-focused templates</li>
                      <li>• <strong>Gantt Only:</strong> Timeline-focused templates</li>
                      <li>• <strong>Mixed:</strong> Both tables and Gantt charts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Template Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl mb-2">🏗️</div>
                    <div className="font-medium">Real Estate</div>
                    <div className="text-xs text-muted-foreground">Property development</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl mb-2">🔨</div>
                    <div className="font-medium">Construction</div>
                    <div className="text-xs text-muted-foreground">Building projects</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl mb-2">🏢</div>
                    <div className="font-medium">Property Management</div>
                    <div className="text-xs text-muted-foreground">Operations</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl mb-2">📋</div>
                    <div className="font-medium">Development</div>
                    <div className="text-xs text-muted-foreground">Planning & permits</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TableIcon className="h-5 w-5" />
                  Building Tables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Tables are the foundation of your template. You can create multiple tables with custom columns and data types.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Column Types Available</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="p-2 border rounded">
                        <strong>Basic:</strong> Text, Number, Date, Email, Phone
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Selection:</strong> Dropdown, Multi-select, Radio, Checkbox
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Progress:</strong> Progress bar, Status, Priority, Rating
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Financial:</strong> Currency, Percentage, Cost, Budget
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Real Estate:</strong> Area, Volume, Location, Property
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Project:</strong> Task, Phase, Duration, Dependencies
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Real Estate Specific Types</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="p-2 border rounded">
                        <strong>Property:</strong> Property address and details
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Area:</strong> Square footage with custom units
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Permit:</strong> Permit information and tracking
                      </div>
                      <div className="p-2 border rounded">
                        <strong>Contractor:</strong> Contractor and vendor details
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Table Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Column Settings</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• <strong>Required fields:</strong> Mark columns as mandatory</li>
                    <li>• <strong>Validation rules:</strong> Add custom validation logic</li>
                    <li>• <strong>Default values:</strong> Set default values for new rows</li>
                    <li>• <strong>Units & formatting:</strong> Add units and display formats</li>
                    <li>• <strong>Dependencies:</strong> Create conditional logic between columns</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Table Settings</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• <strong>Row management:</strong> Add, edit, delete rows</li>
                    <li>• <strong>Display options:</strong> Row numbers, headers, sorting</li>
                    <li>• <strong>Data management:</strong> Import, export, auto-save</li>
                    <li>• <strong>Gantt conversion:</strong> Convert tables to Gantt charts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gantt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Gantt Charts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Gantt charts help visualize project timelines and task dependencies. You can create complex project schedules with multiple views.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Timeline Views</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded">
                        <div className="font-medium text-sm mb-1">Forecasted Layout</div>
                        <div className="text-xs text-muted-foreground">Original planned timeline</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="font-medium text-sm mb-1">Actual Layout</div>
                        <div className="text-xs text-muted-foreground">Real progress and dates</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="font-medium text-sm mb-1">Current Layout</div>
                        <div className="text-xs text-muted-foreground">Auto-calculated adjusted forecast</div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="font-medium text-sm mb-1">Variance Analysis</div>
                        <div className="text-xs text-muted-foreground">Compare planned vs actual</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Task Properties</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• <strong>Dependencies:</strong> Link tasks to show sequence</li>
                      <li>• <strong>Progress tracking:</strong> Monitor completion percentage</li>
                      <li>• <strong>Assignees:</strong> Assign tasks to team members</li>
                      <li>• <strong>Priorities:</strong> Set task priority levels</li>
                      <li>• <strong>Categories & phases:</strong> Organize tasks by type</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Overlay Views</h4>
                  <p className="text-sm text-muted-foreground">
                    Compare different timelines by overlaying them. See forecasted, actual, and current layouts simultaneously.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Variance Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically calculate and visualize schedule variances. See which tasks are ahead or behind schedule.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Visibility Controls</h4>
                  <p className="text-sm text-muted-foreground">
                    Show or hide different timeline layers, task information, and display options for focused analysis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Template Design</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Start with prebuilt templates and customize them</li>
                      <li>• Use descriptive names for tables and columns</li>
                      <li>• Add helpful descriptions for complex fields</li>
                      <li>• Set appropriate validation rules for data quality</li>
                      <li>• Test your template with sample data</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Column Selection</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Use real estate specific types when applicable</li>
                      <li>• Choose appropriate data types for each field</li>
                      <li>• Set required fields for critical information</li>
                      <li>• Add units and formatting for clarity</li>
                      <li>• Create dependencies for conditional logic</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Gantt Planning</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Break down projects into manageable tasks</li>
                      <li>• Set realistic durations based on experience</li>
                      <li>• Create logical dependencies between tasks</li>
                      <li>• Use phases to group related tasks</li>
                      <li>• Plan for contingencies and buffer time</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Property Development</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Property acquisition tracking</li>
                      <li>• Permit and approval management</li>
                      <li>• Construction phase planning</li>
                      <li>• Financial tracking and ROI</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Construction Management</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Task breakdown and scheduling</li>
                      <li>• Contractor and vendor management</li>
                      <li>• Progress tracking and reporting</li>
                      <li>• Budget and cost control</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Pro Tip:</strong> Save your templates with descriptive names and categories. 
                This makes them easier to find and reuse for similar projects in the future.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
