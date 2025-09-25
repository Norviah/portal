"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertDescription } from "@/components/ui/Alert";

import { ArrowLeft, Save, Eye, Download, Upload, RefreshCw, Settings, HelpCircle } from "lucide-react";
import { EnhancedTemplateBuilder } from "@/components/dashboard/EnhancedTemplateBuilder";

interface User {
  email: string;
  name: string;
  role: string;
}

export default function TemplateBuilderPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to sign in if no user
      router.push('/auth/signin');
    }
  }, [router]);

  const handleSaveTemplate = async (template: any) => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Get existing templates
      const existingTemplates = JSON.parse(localStorage.getItem('project-templates') || '[]');
      
      // Add new template
      const updatedTemplates = [...existingTemplates, template];
      
      // Save to localStorage
      localStorage.setItem('project-templates', JSON.stringify(updatedTemplates));
      
      setSaveStatus('success');
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error saving template:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    router.push('/dashboard/manager');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div>
                <h1 className="text-2xl font-bold">Template Builder</h1>
                <p className="text-sm text-muted-foreground">
                  Create comprehensive project templates with tables and Gantt charts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {user.role.toUpperCase()}
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/help/template-builder', '_blank')}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Status Messages */}
        {saveStatus === 'success' && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <AlertDescription className="text-green-800">
                Template saved successfully! You can now use it when creating new projects.
              </AlertDescription>
            </div>
          </Alert>
        )}

        {saveStatus === 'error' && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              Failed to save template. Please try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Template Builder */}
        <div className="space-y-6">
          <EnhancedTemplateBuilder
            onSaveTemplate={handleSaveTemplate}
            onClose={handleClose}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Template Builder v1.0</span>
              <span>•</span>
              <span>Real Estate Development Platform</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Upload className="h-3 w-3 mr-1" />
                Import
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
