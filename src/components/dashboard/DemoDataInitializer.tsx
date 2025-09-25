"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertDescription } from "@/components/ui/Alert";

import { Download, Upload, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { DEMO_TEMPLATES, DEMO_PROJECTS } from "@/lib/demo-templates";

interface DemoDataInitializerProps {
  onTemplatesLoaded?: (templates: any[]) => void;
  onProjectsLoaded?: (projects: any[]) => void;
  className?: string;
}

export function DemoDataInitializer({ onTemplatesLoaded, onProjectsLoaded, className }: DemoDataInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if demo data is already loaded
    const existingTemplates = localStorage.getItem('project-templates');
    const existingProjects = localStorage.getItem('demo-projects');
    
    if (existingTemplates && existingProjects) {
      setIsInitialized(true);
    }
  }, []);

  const loadDemoData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load demo templates
      localStorage.setItem('project-templates', JSON.stringify(DEMO_TEMPLATES));
      
      // Load demo projects
      localStorage.setItem('demo-projects', JSON.stringify(DEMO_PROJECTS));
      
      // Notify parent components
      onTemplatesLoaded?.(DEMO_TEMPLATES);
      onProjectsLoaded?.(DEMO_PROJECTS);
      
      setIsInitialized(true);
    } catch (err) {
      setError('Failed to load demo data. Please try again.');
      console.error('Error loading demo data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearDemoData = () => {
    localStorage.removeItem('project-templates');
    localStorage.removeItem('demo-projects');
    setIsInitialized(false);
    onTemplatesLoaded?.([]);
    onProjectsLoaded?.([]);
  };

  const exportDemoData = () => {
    const data = {
      templates: DEMO_TEMPLATES,
      projects: DEMO_PROJECTS,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demo-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isInitialized) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Demo Data Loaded
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Demo templates and projects have been loaded successfully. You can now explore the template system and see examples of projects with and without templates.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold text-blue-600">{DEMO_TEMPLATES.length}</div>
              <div className="text-sm text-muted-foreground">Templates</div>
            </div>
            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold text-green-600">{DEMO_PROJECTS.length}</div>
              <div className="text-sm text-muted-foreground">Sample Projects</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportDemoData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" onClick={clearDemoData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Load Demo Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Load sample templates and projects to explore the system features:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• <strong>Residential Development Pipeline</strong> - Complete property development workflow</li>
            <li>• <strong>Commercial Construction Management</strong> - Construction project tracking</li>
            <li>• <strong>Sample Projects</strong> - Projects with and without templates</li>
          </ul>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={loadDemoData} 
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Loading...' : 'Load Demo Data'}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          This will populate your template library and project examples for demonstration purposes.
        </div>
      </CardContent>
    </Card>
  );
}
