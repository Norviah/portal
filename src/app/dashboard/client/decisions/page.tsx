"use client";

import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  DollarSign,
  Palette,
  Wrench,
  Home,
  MessageSquare,
  FileText,
  Eye,
  Send
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  status: 'urgent' | 'pending' | 'completed' | 'overdue';
  deadline: string;
  category: 'material' | 'design' | 'timeline' | 'budget';
  options: {
    id: string;
    name: string;
    description: string;
    price?: number;
    color?: string;
    pros: string[];
    cons: string[];
  }[];
  selectedOption?: string;
  submittedAt?: string;
  impact: 'low' | 'medium' | 'high';
}

export default function ClientDecisionsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock decisions data
    setDecisions([
      {
        id: "1",
        title: "Kitchen Countertop Material Selection",
        description: "Please select your preferred countertop material for the kitchen renovation. This decision will affect both aesthetics and maintenance requirements.",
        status: "urgent",
        deadline: "2024-10-10",
        category: "material",
        impact: "high",
        options: [
          {
            id: "granite",
            name: "Granite",
            description: "Natural stone with unique patterns",
            price: 2500,
            pros: ["Durable", "Natural beauty", "Heat resistant"],
            cons: ["Requires sealing", "Can stain", "Heavy"]
          },
          {
            id: "quartz",
            name: "Quartz",
            description: "Engineered stone with consistent appearance",
            price: 3200,
            pros: ["Low maintenance", "Consistent color", "Non-porous"],
            cons: ["More expensive", "Can be damaged by heat", "Less natural"]
          },
          {
            id: "marble",
            name: "Marble",
            description: "Elegant natural stone with distinctive veining",
            price: 4000,
            pros: ["Elegant appearance", "Unique patterns", "Classic look"],
            cons: ["Requires maintenance", "Can stain easily", "Most expensive"]
          }
        ]
      },
      {
        id: "2",
        title: "Exterior Paint Color Selection",
        description: "Choose the exterior paint color for your home. Consider the neighborhood aesthetic and your personal preferences.",
        status: "pending",
        deadline: "2024-10-15",
        category: "design",
        impact: "medium",
        options: [
          {
            id: "ocean-blue",
            name: "Ocean Blue",
            description: "Classic coastal look",
            color: "#4A90E2",
            pros: ["Timeless", "Matches coastal theme", "Easy to maintain"],
            cons: ["Common choice", "May fade over time"]
          },
          {
            id: "modern-gray",
            name: "Modern Gray",
            description: "Contemporary and sophisticated",
            color: "#6B7280",
            pros: ["Modern look", "Neutral", "Goes with any trim"],
            cons: ["May look cold", "Common in neighborhood"]
          },
          {
            id: "forest-green",
            name: "Forest Green",
            description: "Natural and earthy tone",
            color: "#059669",
            pros: ["Unique", "Natural look", "Blends with landscape"],
            cons: ["May be too bold", "Harder to resell"]
          }
        ]
      },
      {
        id: "3",
        title: "Bathroom Fixture Selection",
        description: "Select the bathroom fixtures for the master bathroom renovation.",
        status: "completed",
        deadline: "2024-09-30",
        category: "material",
        impact: "medium",
        selectedOption: "modern-chrome",
        submittedAt: "2024-09-25T14:30:00Z",
        options: [
          {
            id: "modern-chrome",
            name: "Modern Chrome",
            description: "Sleek chrome fixtures with modern design",
            price: 1200,
            pros: ["Easy to clean", "Timeless", "Matches any style"],
            cons: ["Shows water spots", "Common choice"]
          },
          {
            id: "brushed-nickel",
            name: "Brushed Nickel",
            description: "Warm metallic finish with subtle texture",
            price: 1400,
            pros: ["Hides water spots", "Warm tone", "Durable"],
            cons: ["More expensive", "May tarnish over time"]
          }
        ]
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'material': return <Wrench className="h-4 w-4" />;
      case 'design': return <Palette className="h-4 w-4" />;
      case 'timeline': return <Calendar className="h-4 w-4" />;
      case 'budget': return <DollarSign className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
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
    setDecisions(prev => prev.map(decision => 
      decision.id === decisionId 
        ? { 
            ...decision, 
            status: "completed" as const,
            submittedAt: new Date().toISOString()
          }
        : decision
    ));
  };

  const pendingDecisions = decisions.filter(d => d.status === 'urgent' || d.status === 'pending');
  const completedDecisions = decisions.filter(d => d.status === 'completed');

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || '', email: user.email || '' } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Decisions"
          description="Make important decisions to keep your project on track"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Decisions & Feedback", href: "#" },
            { label: "Pending Decisions", isCurrentPage: true }
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="flex-1 p-6 pt-0 space-y-6">
          {/* Header Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{pendingDecisions.length}</div>
                <p className="text-xs text-gray-600">Awaiting your input</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Urgent Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {decisions.filter(d => d.status === 'urgent').length}
                </div>
                <p className="text-xs text-gray-600">Need immediate attention</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{completedDecisions.length}</div>
                <p className="text-xs text-gray-600">Decisions made</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {decisions.filter(d => d.status === 'overdue').length}
                </div>
                <p className="text-xs text-gray-600">Past deadline</p>
              </CardContent>
            </Card>
          </div>

          {/* Decisions List */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending ({pendingDecisions.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedDecisions.length})</TabsTrigger>
              <TabsTrigger value="all">All Decisions</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {pendingDecisions.map((decision) => (
                <Card key={decision.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(decision.category)}
                        <CardTitle className="text-lg">{decision.title}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(decision.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(decision.status)}
                          <span>{decision.status.charAt(0).toUpperCase() + decision.status.slice(1)}</span>
                        </div>
                      </Badge>
                    </div>
                    <CardDescription>{decision.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {new Date(decision.deadline).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        {decision.impact.charAt(0).toUpperCase() + decision.impact.slice(1)} Impact
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Select your preferred option:</Label>
                        <RadioGroup
                          value={decision.selectedOption}
                          onValueChange={(value) => handleDecisionSelect(decision.id, value)}
                          className="mt-3 space-y-3"
                        >
                          {decision.options.map((option) => (
                            <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor={option.id} className="font-medium cursor-pointer">
                                  {option.name}
                                </Label>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                {option.price && (
                                  <p className="text-sm font-medium text-green-600 mt-1">
                                    ${option.price.toLocaleString()}
                                  </p>
                                )}
                                {option.color && (
                                  <div className="flex items-center mt-2">
                                    <div 
                                      className="w-6 h-6 rounded border mr-2"
                                      style={{ backgroundColor: option.color }}
                                    />
                                    <span className="text-sm text-gray-600">Color preview</span>
                                  </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                  <div>
                                    <h4 className="text-sm font-medium text-green-600 mb-1">Pros:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      {option.pros.map((pro, index) => (
                                        <li key={index}>• {pro}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-red-600 mb-1">Cons:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      {option.cons.map((con, index) => (
                                        <li key={index}>• {con}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          {decision.selectedOption ? "Option selected" : "Please select an option"}
                        </div>
                        <Button 
                          onClick={() => handleDecisionSubmit(decision.id)}
                          disabled={!decision.selectedOption}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Decision
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {completedDecisions.map((decision) => (
                <Card key={decision.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(decision.category)}
                        <CardTitle className="text-lg">{decision.title}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(decision.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(decision.status)}
                          <span>Completed</span>
                        </div>
                      </Badge>
                    </div>
                    <CardDescription>{decision.description}</CardDescription>
                    <div className="text-sm text-gray-600">
                      Submitted on {decision.submittedAt ? new Date(decision.submittedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Decision Made</span>
                      </div>
                      <p className="text-sm text-green-700">
                        You selected: <strong>{decision.options.find(opt => opt.id === decision.selectedOption)?.name}</strong>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-semibold mb-2">All Decisions</h3>
                <p className="text-gray-600">Complete view of all project decisions</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
