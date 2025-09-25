"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Separator } from "@/components/ui/Separator";

import { Plus, Trash2, Settings, Eye, Calculator, Calendar, MapPin, DollarSign, Users, FileText, BarChart3, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColumnConfig {
  id: string;
  name: string;
  type: ColumnType;
  required: boolean;
  description?: string;
  validation?: ValidationRule[];
  options?: string[];
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  format?: string;
  dependencies?: ColumnDependency[];
  calculations?: CalculationRule[];
  displayOptions?: DisplayOptions;
}

export interface ColumnDependency {
  columnId: string;
  condition: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains';
  value: any;
  action: 'show' | 'hide' | 'require' | 'optional' | 'set_value';
  targetValue?: any;
}

export interface CalculationRule {
  formula: string;
  targetColumn?: string;
  description: string;
}

export interface ValidationRule {
  type: 'required' | 'min_length' | 'max_length' | 'min_value' | 'max_value' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface DisplayOptions {
  width?: number;
  alignment?: 'left' | 'center' | 'right';
  color?: string;
  backgroundColor?: string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  icon?: string;
  prefix?: string;
  suffix?: string;
}

export type ColumnType = 
  | 'text' | 'number' | 'date' | 'datetime' | 'time' | 'email' | 'phone' | 'url'
  | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'toggle'
  | 'progress' | 'status' | 'priority' | 'rating' | 'slider'
  | 'currency' | 'percentage' | 'area' | 'volume' | 'weight' | 'length'
  | 'file' | 'image' | 'signature' | 'barcode' | 'qr_code'
  | 'location' | 'address' | 'coordinates' | 'map'
  | 'duration' | 'timeline' | 'milestone' | 'phase'
  | 'cost' | 'budget' | 'expense' | 'revenue' | 'profit'
  | 'contact' | 'company' | 'vendor' | 'contractor' | 'client'
  | 'permit' | 'license' | 'certificate' | 'inspection'
  | 'room' | 'floor' | 'building' | 'property' | 'unit'
  | 'material' | 'equipment' | 'resource' | 'supply'
  | 'task' | 'subtask' | 'deliverable' | 'milestone'
  | 'risk' | 'issue' | 'change' | 'approval'
  | 'gantt_start' | 'gantt_end' | 'gantt_duration' | 'gantt_dependencies'
  | 'formula' | 'calculated' | 'conditional' | 'dynamic';

interface ColumnTypeSelectorProps {
  column: ColumnConfig;
  onUpdate: (updates: Partial<ColumnConfig>) => void;
  onDelete: () => void;
  availableColumns: ColumnConfig[];
  className?: string;
}

const COLUMN_CATEGORIES = {
  'Basic': [
    { type: 'text', label: 'Text', icon: '📝', description: 'Single line text input' },
    { type: 'number', label: 'Number', icon: '🔢', description: 'Numeric input' },
    { type: 'date', label: 'Date', icon: '📅', description: 'Date picker' },
    { type: 'datetime', label: 'Date & Time', icon: '🕐', description: 'Date and time picker' },
    { type: 'time', label: 'Time', icon: '⏰', description: 'Time picker' },
    { type: 'email', label: 'Email', icon: '📧', description: 'Email address' },
    { type: 'phone', label: 'Phone', icon: '📞', description: 'Phone number' },
    { type: 'url', label: 'URL', icon: '🔗', description: 'Web address' }
  ],
  'Selection': [
    { type: 'select', label: 'Dropdown', icon: '📋', description: 'Single selection dropdown' },
    { type: 'multiselect', label: 'Multi-select', icon: '☑️', description: 'Multiple selection' },
    { type: 'radio', label: 'Radio Buttons', icon: '🔘', description: 'Single choice from options' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️', description: 'True/false checkbox' },
    { type: 'toggle', label: 'Toggle Switch', icon: '🔄', description: 'On/off switch' }
  ],
  'Progress & Status': [
    { type: 'progress', label: 'Progress Bar', icon: '📊', description: 'Progress percentage' },
    { type: 'status', label: 'Status', icon: '🏷️', description: 'Status indicator' },
    { type: 'priority', label: 'Priority', icon: '⚡', description: 'Priority level' },
    { type: 'rating', label: 'Rating', icon: '⭐', description: 'Star rating' },
    { type: 'slider', label: 'Slider', icon: '🎚️', description: 'Range slider' }
  ],
  'Financial': [
    { type: 'currency', label: 'Currency', icon: '💰', description: 'Money amount' },
    { type: 'percentage', label: 'Percentage', icon: '📈', description: 'Percentage value' },
    { type: 'cost', label: 'Cost', icon: '💸', description: 'Project cost' },
    { type: 'budget', label: 'Budget', icon: '💳', description: 'Budget allocation' },
    { type: 'expense', label: 'Expense', icon: '📉', description: 'Expense tracking' },
    { type: 'revenue', label: 'Revenue', icon: '📈', description: 'Revenue amount' },
    { type: 'profit', label: 'Profit', icon: '💎', description: 'Profit calculation' }
  ],
  'Real Estate': [
    { type: 'area', label: 'Area', icon: '📐', description: 'Square footage/area' },
    { type: 'volume', label: 'Volume', icon: '📦', description: 'Cubic measurements' },
    { type: 'weight', label: 'Weight', icon: '⚖️', description: 'Weight measurement' },
    { type: 'length', label: 'Length', icon: '📏', description: 'Linear measurement' },
    { type: 'location', label: 'Location', icon: '📍', description: 'Geographic location' },
    { type: 'address', label: 'Address', icon: '🏠', description: 'Street address' },
    { type: 'coordinates', label: 'Coordinates', icon: '🗺️', description: 'Lat/lng coordinates' },
    { type: 'map', label: 'Map', icon: '🗺️', description: 'Interactive map' },
    { type: 'room', label: 'Room', icon: '🚪', description: 'Room specification' },
    { type: 'floor', label: 'Floor', icon: '🏢', description: 'Floor level' },
    { type: 'building', label: 'Building', icon: '🏗️', description: 'Building details' },
    { type: 'property', label: 'Property', icon: '🏘️', description: 'Property information' },
    { type: 'unit', label: 'Unit', icon: '🏠', description: 'Unit/apartment details' }
  ],
  'Project Management': [
    { type: 'duration', label: 'Duration', icon: '⏱️', description: 'Time duration' },
    { type: 'timeline', label: 'Timeline', icon: '📅', description: 'Project timeline' },
    { type: 'milestone', label: 'Milestone', icon: '🎯', description: 'Project milestone' },
    { type: 'phase', label: 'Phase', icon: '🔄', description: 'Project phase' },
    { type: 'task', label: 'Task', icon: '✅', description: 'Project task' },
    { type: 'subtask', label: 'Subtask', icon: '📋', description: 'Sub-task' },
    { type: 'deliverable', label: 'Deliverable', icon: '📦', description: 'Project deliverable' },
    { type: 'gantt_start', label: 'Gantt Start', icon: '🚀', description: 'Gantt start date' },
    { type: 'gantt_end', label: 'Gantt End', icon: '🏁', description: 'Gantt end date' },
    { type: 'gantt_duration', label: 'Gantt Duration', icon: '⏳', description: 'Gantt duration' },
    { type: 'gantt_dependencies', label: 'Dependencies', icon: '🔗', description: 'Task dependencies' }
  ],
  'People & Contacts': [
    { type: 'contact', label: 'Contact', icon: '👤', description: 'Person contact' },
    { type: 'company', label: 'Company', icon: '🏢', description: 'Company information' },
    { type: 'vendor', label: 'Vendor', icon: '🏪', description: 'Vendor details' },
    { type: 'contractor', label: 'Contractor', icon: '👷', description: 'Contractor info' },
    { type: 'client', label: 'Client', icon: '🤝', description: 'Client information' }
  ],
  'Compliance & Legal': [
    { type: 'permit', label: 'Permit', icon: '📜', description: 'Permit information' },
    { type: 'license', label: 'License', icon: '📋', description: 'License details' },
    { type: 'certificate', label: 'Certificate', icon: '🏆', description: 'Certification' },
    { type: 'inspection', label: 'Inspection', icon: '🔍', description: 'Inspection details' }
  ],
  'Resources & Materials': [
    { type: 'material', label: 'Material', icon: '🧱', description: 'Construction material' },
    { type: 'equipment', label: 'Equipment', icon: '🔧', description: 'Equipment details' },
    { type: 'resource', label: 'Resource', icon: '📚', description: 'Project resource' },
    { type: 'supply', label: 'Supply', icon: '📦', description: 'Supply item' }
  ],
  'Risk & Issues': [
    { type: 'risk', label: 'Risk', icon: '⚠️', description: 'Project risk' },
    { type: 'issue', label: 'Issue', icon: '🚨', description: 'Project issue' },
    { type: 'change', label: 'Change', icon: '🔄', description: 'Change request' },
    { type: 'approval', label: 'Approval', icon: '✅', description: 'Approval status' }
  ],
  'Files & Media': [
    { type: 'file', label: 'File', icon: '📄', description: 'File upload' },
    { type: 'image', label: 'Image', icon: '🖼️', description: 'Image upload' },
    { type: 'signature', label: 'Signature', icon: '✍️', description: 'Digital signature' },
    { type: 'barcode', label: 'Barcode', icon: '📊', description: 'Barcode scanner' },
    { type: 'qr_code', label: 'QR Code', icon: '📱', description: 'QR code scanner' }
  ],
  'Advanced': [
    { type: 'formula', label: 'Formula', icon: '🧮', description: 'Calculated field' },
    { type: 'calculated', label: 'Calculated', icon: '🔢', description: 'Auto-calculated' },
    { type: 'conditional', label: 'Conditional', icon: '🔀', description: 'Conditional logic' },
    { type: 'dynamic', label: 'Dynamic', icon: '⚡', description: 'Dynamic content' }
  ]
} as const;

const REAL_ESTATE_PRESETS = {
  'Property Development': [
    { type: 'property', name: 'Property Address', required: true },
    { type: 'area', name: 'Lot Size (sq ft)', required: true, unit: 'sq ft' },
    { type: 'area', name: 'Building Area (sq ft)', required: true, unit: 'sq ft' },
    { type: 'select', name: 'Property Type', options: ['Residential', 'Commercial', 'Mixed-Use', 'Industrial'], required: true },
    { type: 'number', name: 'Units', required: true },
    { type: 'currency', name: 'Purchase Price', required: true },
    { type: 'currency', name: 'Development Cost', required: true },
    { type: 'currency', name: 'Expected Sale Price', required: true },
    { type: 'percentage', name: 'ROI', required: true },
    { type: 'date', name: 'Purchase Date', required: true },
    { type: 'date', name: 'Construction Start', required: true },
    { type: 'date', name: 'Construction End', required: true },
    { type: 'date', name: 'Sale Date', required: true },
    { type: 'status', name: 'Project Status', options: ['Planning', 'Permitting', 'Construction', 'Marketing', 'Sold'], required: true }
  ],
  'Construction Management': [
    { type: 'task', name: 'Task Name', required: true },
    { type: 'phase', name: 'Phase', options: ['Pre-Construction', 'Foundation', 'Framing', 'MEP', 'Finishing', 'Punch List'], required: true },
    { type: 'gantt_start', name: 'Start Date', required: true },
    { type: 'gantt_end', name: 'End Date', required: true },
    { type: 'gantt_duration', name: 'Duration (days)', required: true },
    { type: 'gantt_dependencies', name: 'Dependencies', required: false },
    { type: 'contractor', name: 'Contractor', required: true },
    { type: 'currency', name: 'Budget', required: true },
    { type: 'currency', name: 'Actual Cost', required: false },
    { type: 'progress', name: 'Progress %', required: true },
    { type: 'status', name: 'Status', options: ['Not Started', 'In Progress', 'Completed', 'Delayed'], required: true },
    { type: 'priority', name: 'Priority', options: ['Low', 'Medium', 'High', 'Critical'], required: true },
    { type: 'risk', name: 'Risks', required: false },
    { type: 'issue', name: 'Issues', required: false }
  ],
  'Permit Tracking': [
    { type: 'permit', name: 'Permit Type', required: true },
    { type: 'text', name: 'Permit Number', required: true },
    { type: 'date', name: 'Application Date', required: true },
    { type: 'date', name: 'Approval Date', required: false },
    { type: 'date', name: 'Expiration Date', required: false },
    { type: 'currency', name: 'Permit Fee', required: true },
    { type: 'status', name: 'Status', options: ['Applied', 'Under Review', 'Approved', 'Rejected', 'Expired'], required: true },
    { type: 'contact', name: 'Contact Person', required: true },
    { type: 'company', name: 'Issuing Agency', required: true },
    { type: 'file', name: 'Documents', required: false },
    { type: 'text', name: 'Notes', required: false }
  ]
};

export function ColumnTypeSelector({ column, onUpdate, onDelete, availableColumns, className }: ColumnTypeSelectorProps) {
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTypeChange = (newType: ColumnType) => {
    const typeInfo = Object.values(COLUMN_CATEGORIES).flat().find(cat => cat.type === newType);
    
    onUpdate({
      type: newType,
      name: typeInfo?.label || column.name,
      description: typeInfo?.description || column.description,
      // Reset type-specific properties
      options: newType.includes('select') || newType.includes('radio') || newType.includes('multiselect') ? [] : undefined,
      min: newType === 'number' || newType === 'slider' ? 0 : undefined,
      max: newType === 'number' || newType === 'slider' ? 100 : undefined,
      step: newType === 'number' || newType === 'slider' ? 1 : undefined,
      unit: newType === 'area' ? 'sq ft' : newType === 'currency' ? 'USD' : undefined,
      format: newType === 'currency' ? 'currency' : newType === 'percentage' ? 'percentage' : undefined
    });
  };

  const addOption = () => {
    const newOptions = [...(column.options || []), 'New Option'];
    onUpdate({ options: newOptions });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(column.options || [])];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = column.options?.filter((_, i) => i !== index) || [];
    onUpdate({ options: newOptions });
  };

  const addValidationRule = () => {
    const newRules = [...(column.validation || []), { type: 'required' as const, message: 'This field is required' }];
    onUpdate({ validation: newRules });
  };

  const updateValidationRule = (index: number, updates: Partial<ValidationRule>) => {
    const newRules = [...(column.validation || [])];
    newRules[index] = { ...newRules[index], ...updates };
    onUpdate({ validation: newRules });
  };

  const removeValidationRule = (index: number) => {
    const newRules = column.validation?.filter((_, i) => i !== index) || [];
    onUpdate({ validation: newRules });
  };

  const applyPreset = (presetName: string) => {
    const preset = REAL_ESTATE_PRESETS[presetName as keyof typeof REAL_ESTATE_PRESETS];
    if (preset) {
      // This would typically create multiple columns, but for now we'll just update the current one
      const firstPreset = preset[0];
      onUpdate({
        type: firstPreset.type as ColumnType,
        name: firstPreset.name,
        required: firstPreset.required,
        options: firstPreset.options,
        ...(('unit' in firstPreset && firstPreset.unit) && { unit: firstPreset.unit })
      });
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Column Configuration</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings className="h-4 w-4 mr-2" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </Button>
              <Button variant="outline" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="column-name">Column Name</Label>
              <Input
                id="column-name"
                value={column.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Enter column name"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={column.required}
                onCheckedChange={(checked) => onUpdate({ required: !!checked })}
              />
              <Label htmlFor="required">Required</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="column-description">Description</Label>
            <Textarea
              id="column-description"
              value={column.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Describe this column..."
              rows={2}
            />
          </div>

          {/* Column Type Selection */}
          <div>
            <Label>Column Type</Label>
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mt-2">
              <TabsList className="grid w-full grid-cols-6">
                {Object.keys(COLUMN_CATEGORIES).map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {Object.entries(COLUMN_CATEGORIES).map(([category, types]) => (
                <TabsContent key={category} value={category} className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {types.map((type) => (
                      <Button
                        key={type.type}
                        variant={column.type === type.type ? 'default' : 'outline'}
                        className="h-auto p-3 flex flex-col items-center gap-2"
                        onClick={() => handleTypeChange(type.type as ColumnType)}
                      >
                        <span className="text-lg">{type.icon}</span>
                        <span className="text-xs font-medium">{type.label}</span>
                        <span className="text-xs text-muted-foreground text-center">
                          {type.description}
                        </span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Real Estate Presets */}
          <div>
            <Label>Real Estate Presets</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              {Object.keys(REAL_ESTATE_PRESETS).map((presetName) => (
                <Button
                  key={presetName}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(presetName)}
                  className="justify-start"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {presetName}
                </Button>
              ))}
            </div>
          </div>

          {/* Type-specific Configuration */}
          {(column.type.includes('select') || column.type.includes('radio') || column.type.includes('multiselect')) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Options</Label>
                <Button size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {column.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder="Option value"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(column.type === 'number' || column.type === 'slider') && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="min-value">Min Value</Label>
                <Input
                  id="min-value"
                  type="number"
                  value={column.min || 0}
                  onChange={(e) => onUpdate({ min: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="max-value">Max Value</Label>
                <Input
                  id="max-value"
                  type="number"
                  value={column.max || 100}
                  onChange={(e) => onUpdate({ max: parseFloat(e.target.value) || 100 })}
                />
              </div>
              <div>
                <Label htmlFor="step-value">Step</Label>
                <Input
                  id="step-value"
                  type="number"
                  value={column.step || 1}
                  onChange={(e) => onUpdate({ step: parseFloat(e.target.value) || 1 })}
                />
              </div>
            </div>
          )}

          {(column.type === 'currency' || column.type === 'area' || column.type === 'volume' || column.type === 'weight' || column.type === 'length') && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={column.unit || ''}
                  onChange={(e) => onUpdate({ unit: e.target.value })}
                  placeholder="e.g., USD, sq ft, lbs"
                />
              </div>
              <div>
                <Label htmlFor="format">Format</Label>
                <Select value={column.format || ''} onValueChange={(value) => onUpdate({ format: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currency">Currency</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="decimal">Decimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Advanced Configuration */}
          {showAdvanced && (
            <>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Validation Rules</Label>
                  <Button size="sm" onClick={addValidationRule}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>
                <div className="space-y-2">
                  {column.validation?.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Select
                        value={rule.type}
                        onValueChange={(value: any) => updateValidationRule(index, { type: value })}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="required">Required</SelectItem>
                          <SelectItem value="min_length">Min Length</SelectItem>
                          <SelectItem value="max_length">Max Length</SelectItem>
                          <SelectItem value="min_value">Min Value</SelectItem>
                          <SelectItem value="max_value">Max Value</SelectItem>
                          <SelectItem value="pattern">Pattern</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={rule.value || ''}
                        onChange={(e) => updateValidationRule(index, { value: e.target.value })}
                        placeholder="Value"
                        className="flex-1"
                      />
                      <Input
                        value={rule.message}
                        onChange={(e) => updateValidationRule(index, { message: e.target.value })}
                        placeholder="Error message"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeValidationRule(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
