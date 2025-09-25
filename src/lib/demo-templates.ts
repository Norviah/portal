export const DEMO_TEMPLATES = [
  {
    id: 'template-residential-development',
    name: 'Residential Development Pipeline',
    description: 'Complete residential property development workflow from acquisition to sale',
    category: 'real-estate',
    type: 'mixed',
    tables: [
      {
        id: 'table-properties',
        name: 'Properties',
        description: 'Property portfolio and development pipeline',
        columns: [
          { id: 'col-1', name: 'Property Address', type: 'property', required: true, description: 'Full property address' },
          { id: 'col-2', name: 'Lot Size (sq ft)', type: 'area', required: true, unit: 'sq ft', description: 'Total lot size' },
          { id: 'col-3', name: 'Building Area (sq ft)', type: 'area', required: true, unit: 'sq ft', description: 'Total building area' },
          { id: 'col-4', name: 'Property Type', type: 'select', options: ['Single Family', 'Townhouse', 'Condo', 'Duplex'], required: true },
          { id: 'col-5', name: 'Units', type: 'number', required: true, description: 'Number of units' },
          { id: 'col-6', name: 'Purchase Price', type: 'currency', required: true, unit: 'USD', description: 'Property purchase price' },
          { id: 'col-7', name: 'Development Cost', type: 'currency', required: true, unit: 'USD', description: 'Total development cost' },
          { id: 'col-8', name: 'Expected Sale Price', type: 'currency', required: true, unit: 'USD', description: 'Expected sale price' },
          { id: 'col-9', name: 'ROI', type: 'percentage', required: true, description: 'Expected return on investment' },
          { id: 'col-10', name: 'Project Status', type: 'status', options: ['Planning', 'Permitting', 'Construction', 'Marketing', 'Sold'], required: true },
          { id: 'col-11', name: 'Progress %', type: 'progress', required: true, description: 'Overall project progress' },
          { id: 'col-12', name: 'Project Manager', type: 'contact', required: true, description: 'Assigned project manager' },
          { id: 'col-13', name: 'General Contractor', type: 'company', required: false, description: 'Primary contractor' },
          { id: 'col-14', name: 'Purchase Date', type: 'date', required: true, description: 'Date of property purchase' },
          { id: 'col-15', name: 'Construction Start', type: 'date', required: true, description: 'Construction start date' },
          { id: 'col-16', name: 'Construction End', type: 'date', required: true, description: 'Construction end date' },
          { id: 'col-17', name: 'Sale Date', type: 'date', required: true, description: 'Expected sale date' }
        ],
        rows: [
          {
            id: 'row-1',
            data: {
              'col-1': '123 Oak Street, Downtown',
              'col-2': 5000,
              'col-3': 3500,
              'col-4': 'Single Family',
              'col-5': 1,
              'col-6': 450000,
              'col-7': 200000,
              'col-8': 750000,
              'col-9': 22.2,
              'col-10': 'Construction',
              'col-11': 65,
              'col-12': 'John Smith',
              'col-13': 'ABC Construction',
              'col-14': '2024-01-15',
              'col-15': '2024-03-01',
              'col-16': '2024-12-31',
              'col-17': '2025-02-28'
            }
          },
          {
            id: 'row-2',
            data: {
              'col-1': '456 Pine Avenue, Suburbs',
              'col-2': 7500,
              'col-3': 4800,
              'col-4': 'Townhouse',
              'col-5': 3,
              'col-6': 650000,
              'col-7': 350000,
              'col-8': 1200000,
              'col-9': 20.0,
              'col-10': 'Marketing',
              'col-11': 90,
              'col-12': 'Sarah Johnson',
              'col-13': 'XYZ Builders',
              'col-14': '2023-08-20',
              'col-15': '2023-10-15',
              'col-16': '2024-08-15',
              'col-17': '2024-10-31'
            }
          }
        ],
        settings: {
          allowAddRows: true,
          allowEditRows: true,
          allowDeleteRows: true,
          showRowNumbers: true,
          showColumnHeaders: true,
          enableSorting: true,
          enableFiltering: true,
          enableSearch: true,
          enablePagination: true,
          pageSize: 25,
          autoSave: true,
          enableExport: true,
          enableImport: true,
          enableGanttConversion: true
        }
      },
      {
        id: 'table-permits',
        name: 'Permits & Approvals',
        description: 'Track all permits and regulatory approvals',
        columns: [
          { id: 'col-1', name: 'Permit Type', type: 'permit', required: true, description: 'Type of permit' },
          { id: 'col-2', name: 'Permit Number', type: 'text', required: true, description: 'Permit reference number' },
          { id: 'col-3', name: 'Application Date', type: 'date', required: true, description: 'Date permit was applied for' },
          { id: 'col-4', name: 'Approval Date', type: 'date', required: false, description: 'Date permit was approved' },
          { id: 'col-5', name: 'Expiration Date', type: 'date', required: false, description: 'Permit expiration date' },
          { id: 'col-6', name: 'Permit Fee', type: 'currency', required: true, unit: 'USD', description: 'Permit application fee' },
          { id: 'col-7', name: 'Status', type: 'status', options: ['Applied', 'Under Review', 'Approved', 'Rejected', 'Expired'], required: true },
          { id: 'col-8', name: 'Contact Person', type: 'contact', required: true, description: 'Permit contact person' },
          { id: 'col-9', name: 'Issuing Agency', type: 'company', required: true, description: 'Government agency' },
          { id: 'col-10', name: 'Documents', type: 'file', required: false, description: 'Permit documents' }
        ],
        rows: [
          {
            id: 'row-1',
            data: {
              'col-1': 'Building Permit',
              'col-2': 'BP-2024-001',
              'col-3': '2024-02-01',
              'col-4': '2024-03-15',
              'col-5': '2025-03-15',
              'col-6': 2500,
              'col-7': 'Approved',
              'col-8': 'Mike Wilson',
              'col-9': 'City Building Department',
              'col-10': 'building-permit.pdf'
            }
          },
          {
            id: 'row-2',
            data: {
              'col-1': 'Electrical Permit',
              'col-2': 'EP-2024-002',
              'col-3': '2024-03-01',
              'col-4': '2024-03-20',
              'col-5': '2025-03-20',
              'col-6': 800,
              'col-7': 'Approved',
              'col-8': 'Lisa Chen',
              'col-9': 'City Electrical Department',
              'col-10': 'electrical-permit.pdf'
            }
          }
        ],
        settings: {
          allowAddRows: true,
          allowEditRows: true,
          allowDeleteRows: true,
          showRowNumbers: true,
          showColumnHeaders: true,
          enableSorting: true,
          enableFiltering: true,
          enableSearch: true,
          enablePagination: true,
          pageSize: 25,
          autoSave: true,
          enableExport: true,
          enableImport: true,
          enableGanttConversion: true
        }
      }
    ],
    ganttTasks: [
      {
        id: 'task-1',
        name: 'Property Acquisition',
        startDate: '2024-01-01',
        endDate: '2024-02-15',
        duration: 45,
        dependencies: [],
        status: 'completed',
        progress: 100,
        forecastedStart: '2024-01-01',
        forecastedEnd: '2024-02-15',
        actualStart: '2024-01-01',
        actualEnd: '2024-02-10',
        assignee: 'John Smith',
        priority: 'high',
        category: 'Acquisition',
        phase: 'Pre-Construction'
      },
      {
        id: 'task-2',
        name: 'Due Diligence',
        startDate: '2024-01-15',
        endDate: '2024-03-01',
        duration: 45,
        dependencies: ['task-1'],
        status: 'completed',
        progress: 100,
        forecastedStart: '2024-01-15',
        forecastedEnd: '2024-03-01',
        actualStart: '2024-01-15',
        actualEnd: '2024-02-28',
        assignee: 'Sarah Johnson',
        priority: 'high',
        category: 'Planning',
        phase: 'Pre-Construction'
      },
      {
        id: 'task-3',
        name: 'Permit Applications',
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        duration: 90,
        dependencies: ['task-2'],
        status: 'in-progress',
        progress: 75,
        forecastedStart: '2024-02-01',
        forecastedEnd: '2024-04-30',
        actualStart: '2024-02-01',
        actualEnd: null,
        assignee: 'Mike Wilson',
        priority: 'critical',
        category: 'Permits',
        phase: 'Pre-Construction'
      },
      {
        id: 'task-4',
        name: 'Construction Planning',
        startDate: '2024-03-01',
        endDate: '2024-05-15',
        duration: 75,
        dependencies: ['task-3'],
        status: 'not-started',
        progress: 0,
        forecastedStart: '2024-03-01',
        forecastedEnd: '2024-05-15',
        actualStart: null,
        actualEnd: null,
        assignee: 'ABC Construction',
        priority: 'medium',
        category: 'Planning',
        phase: 'Pre-Construction'
      },
      {
        id: 'task-5',
        name: 'Foundation Work',
        startDate: '2024-05-15',
        endDate: '2024-07-15',
        duration: 60,
        dependencies: ['task-4'],
        status: 'not-started',
        progress: 0,
        forecastedStart: '2024-05-15',
        forecastedEnd: '2024-07-15',
        actualStart: null,
        actualEnd: null,
        assignee: 'ABC Construction',
        priority: 'high',
        category: 'Construction',
        phase: 'Foundation'
      },
      {
        id: 'task-6',
        name: 'Framing',
        startDate: '2024-07-15',
        endDate: '2024-09-30',
        duration: 75,
        dependencies: ['task-5'],
        status: 'not-started',
        progress: 0,
        forecastedStart: '2024-07-15',
        forecastedEnd: '2024-09-30',
        actualStart: null,
        actualEnd: null,
        assignee: 'ABC Construction',
        priority: 'high',
        category: 'Construction',
        phase: 'Framing'
      },
      {
        id: 'task-7',
        name: 'MEP Installation',
        startDate: '2024-08-01',
        endDate: '2024-10-31',
        duration: 90,
        dependencies: ['task-6'],
        status: 'not-started',
        progress: 0,
        forecastedStart: '2024-08-01',
        forecastedEnd: '2024-10-31',
        actualStart: null,
        actualEnd: null,
        assignee: 'XYZ MEP',
        priority: 'medium',
        category: 'Construction',
        phase: 'MEP'
      },
      {
        id: 'task-8',
        name: 'Interior Finishing',
        startDate: '2024-10-01',
        endDate: '2024-12-31',
        duration: 90,
        dependencies: ['task-7'],
        status: 'not-started',
        progress: 0,
        forecastedStart: '2024-10-01',
        forecastedEnd: '2024-12-31',
        actualStart: null,
        actualEnd: null,
        assignee: 'ABC Construction',
        priority: 'medium',
        category: 'Construction',
        phase: 'Finishing'
      },
      {
        id: 'task-9',
        name: 'Marketing & Sales',
        startDate: '2024-11-01',
        endDate: '2025-03-31',
        duration: 150,
        dependencies: ['task-8'],
        status: 'not-started',
        progress: 0,
        forecastedStart: '2024-11-01',
        forecastedEnd: '2025-03-31',
        actualStart: null,
        actualEnd: null,
        assignee: 'Marketing Team',
        priority: 'low',
        category: 'Sales',
        phase: 'Marketing'
      }
    ],
    settings: {
      allowCustomization: true,
      enableGanttConversion: true,
      enableDataImport: true,
      enableDataExport: true,
      enableCollaboration: true,
      enableVersioning: true,
      enableTemplates: true,
      defaultView: 'mixed',
      autoSave: true,
      enableNotifications: true
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'template-commercial-construction',
    name: 'Commercial Construction Management',
    description: 'Comprehensive commercial construction project tracking and management',
    category: 'construction',
    type: 'mixed',
    tables: [
      {
        id: 'table-tasks',
        name: 'Construction Tasks',
        description: 'Detailed construction task breakdown',
        columns: [
          { id: 'col-1', name: 'Task Name', type: 'task', required: true, description: 'Task description' },
          { id: 'col-2', name: 'Phase', type: 'phase', options: ['Pre-Construction', 'Foundation', 'Framing', 'MEP', 'Finishing', 'Punch List'], required: true },
          { id: 'col-3', name: 'Start Date', type: 'gantt_start', required: true, description: 'Task start date' },
          { id: 'col-4', name: 'End Date', type: 'gantt_end', required: true, description: 'Task end date' },
          { id: 'col-5', name: 'Duration (days)', type: 'gantt_duration', required: true, description: 'Task duration in days' },
          { id: 'col-6', name: 'Dependencies', type: 'gantt_dependencies', required: false, description: 'Task dependencies' },
          { id: 'col-7', name: 'Contractor', type: 'contractor', required: true, description: 'Assigned contractor' },
          { id: 'col-8', name: 'Budget', type: 'currency', required: true, unit: 'USD', description: 'Task budget' },
          { id: 'col-9', name: 'Actual Cost', type: 'currency', required: false, unit: 'USD', description: 'Actual cost incurred' },
          { id: 'col-10', name: 'Progress %', type: 'progress', required: true, description: 'Task completion percentage' },
          { id: 'col-11', name: 'Status', type: 'status', options: ['Not Started', 'In Progress', 'Completed', 'Delayed'], required: true },
          { id: 'col-12', name: 'Priority', type: 'priority', options: ['Low', 'Medium', 'High', 'Critical'], required: true },
          { id: 'col-13', name: 'Supervisor', type: 'contact', required: true, description: 'Task supervisor' },
          { id: 'col-14', name: 'Documents', type: 'file', required: false, description: 'Related documents' }
        ],
        rows: [
          {
            id: 'row-1',
            data: {
              'col-1': 'Site Preparation',
              'col-2': 'Pre-Construction',
              'col-3': '2024-01-15',
              'col-4': '2024-02-15',
              'col-5': 30,
              'col-6': '',
              'col-7': 'ABC Construction',
              'col-8': 50000,
              'col-9': 48000,
              'col-10': 100,
              'col-11': 'Completed',
              'col-12': 'High',
              'col-13': 'John Smith',
              'col-14': 'site-prep.pdf'
            }
          },
          {
            id: 'row-2',
            data: {
              'col-1': 'Foundation Pour',
              'col-2': 'Foundation',
              'col-3': '2024-02-15',
              'col-4': '2024-03-15',
              'col-5': 30,
              'col-6': 'Site Preparation',
              'col-7': 'ABC Construction',
              'col-8': 120000,
              'col-9': 115000,
              'col-10': 100,
              'col-11': 'Completed',
              'col-12': 'Critical',
              'col-13': 'John Smith',
              'col-14': 'foundation.pdf'
            }
          }
        ],
        settings: {
          allowAddRows: true,
          allowEditRows: true,
          allowDeleteRows: true,
          showRowNumbers: true,
          showColumnHeaders: true,
          enableSorting: true,
          enableFiltering: true,
          enableSearch: true,
          enablePagination: true,
          pageSize: 25,
          autoSave: true,
          enableExport: true,
          enableImport: true,
          enableGanttConversion: true
        }
      }
    ],
    ganttTasks: [
      {
        id: 'task-1',
        name: 'Site Preparation',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        duration: 30,
        dependencies: [],
        status: 'completed',
        progress: 100,
        forecastedStart: '2024-01-15',
        forecastedEnd: '2024-02-15',
        actualStart: '2024-01-15',
        actualEnd: '2024-02-10',
        assignee: 'ABC Construction',
        priority: 'high',
        category: 'Site Work',
        phase: 'Pre-Construction'
      },
      {
        id: 'task-2',
        name: 'Foundation Work',
        startDate: '2024-02-15',
        endDate: '2024-03-15',
        duration: 30,
        dependencies: ['task-1'],
        status: 'completed',
        progress: 100,
        forecastedStart: '2024-02-15',
        forecastedEnd: '2024-03-15',
        actualStart: '2024-02-10',
        actualEnd: '2024-03-12',
        assignee: 'ABC Construction',
        priority: 'critical',
        category: 'Foundation',
        phase: 'Foundation'
      }
    ],
    settings: {
      allowCustomization: true,
      enableGanttConversion: true,
      enableDataImport: true,
      enableDataExport: true,
      enableCollaboration: true,
      enableVersioning: true,
      enableTemplates: true,
      defaultView: 'mixed',
      autoSave: true,
      enableNotifications: true
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

export const DEMO_PROJECTS = [
  {
    id: 'project-with-template',
    name: 'Downtown Office Complex',
    description: 'Modern 20-story office building in downtown business district',
    templateId: 'template-commercial-construction',
    templateName: 'Commercial Construction Management',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    status: 'in-progress',
    progress: 35,
    budget: 50000000,
    actualCost: 17500000,
    manager: 'Sarah Johnson',
    client: 'Metro Development Corp',
    location: '123 Business Ave, Downtown',
    type: 'Commercial',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    tables: [
      {
        id: 'table-1',
        name: 'Construction Tasks',
        description: 'Detailed construction task breakdown',
        columns: [
          { id: 'col-1', name: 'Task Name', type: 'task', required: true },
          { id: 'col-2', name: 'Phase', type: 'phase', options: ['Pre-Construction', 'Foundation', 'Framing', 'MEP', 'Finishing', 'Punch List'], required: true },
          { id: 'col-3', name: 'Start Date', type: 'gantt_start', required: true },
          { id: 'col-4', name: 'End Date', type: 'gantt_end', required: true },
          { id: 'col-5', name: 'Duration (days)', type: 'gantt_duration', required: true },
          { id: 'col-6', name: 'Contractor', type: 'contractor', required: true },
          { id: 'col-7', name: 'Budget', type: 'currency', required: true, unit: 'USD' },
          { id: 'col-8', name: 'Actual Cost', type: 'currency', required: false, unit: 'USD' },
          { id: 'col-9', name: 'Progress %', type: 'progress', required: true },
          { id: 'col-10', name: 'Status', type: 'status', options: ['Not Started', 'In Progress', 'Completed', 'Delayed'], required: true }
        ],
        rows: [
          {
            id: 'row-1',
            data: {
              'col-1': 'Site Preparation',
              'col-2': 'Pre-Construction',
              'col-3': '2024-01-15',
              'col-4': '2024-02-15',
              'col-5': 30,
              'col-6': 'ABC Construction',
              'col-7': 500000,
              'col-8': 480000,
              'col-9': 100,
              'col-10': 'Completed'
            }
          },
          {
            id: 'row-2',
            data: {
              'col-1': 'Foundation Work',
              'col-2': 'Foundation',
              'col-3': '2024-02-15',
              'col-4': '2024-04-15',
              'col-5': 60,
              'col-6': 'ABC Construction',
              'col-7': 2000000,
              'col-8': 1950000,
              'col-9': 100,
              'col-10': 'Completed'
            }
          },
          {
            id: 'row-3',
            data: {
              'col-1': 'Steel Framing',
              'col-2': 'Framing',
              'col-3': '2024-04-15',
              'col-4': '2024-08-15',
              'col-5': 120,
              'col-6': 'Steel Works Inc',
              'col-7': 8000000,
              'col-8': 0,
              'col-9': 45,
              'col-10': 'In Progress'
            }
          }
        ]
      }
    ],
    ganttTasks: [
      {
        id: 'task-1',
        name: 'Site Preparation',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        duration: 30,
        dependencies: [],
        status: 'completed',
        progress: 100,
        forecastedStart: '2024-01-15',
        forecastedEnd: '2024-02-15',
        actualStart: '2024-01-15',
        actualEnd: '2024-02-10',
        assignee: 'ABC Construction',
        priority: 'high',
        category: 'Site Work',
        phase: 'Pre-Construction'
      },
      {
        id: 'task-2',
        name: 'Foundation Work',
        startDate: '2024-02-15',
        endDate: '2024-04-15',
        duration: 60,
        dependencies: ['task-1'],
        status: 'completed',
        progress: 100,
        forecastedStart: '2024-02-15',
        forecastedEnd: '2024-04-15',
        actualStart: '2024-02-10',
        actualEnd: '2024-04-10',
        assignee: 'ABC Construction',
        priority: 'critical',
        category: 'Foundation',
        phase: 'Foundation'
      },
      {
        id: 'task-3',
        name: 'Steel Framing',
        startDate: '2024-04-15',
        endDate: '2024-08-15',
        duration: 120,
        dependencies: ['task-2'],
        status: 'in-progress',
        progress: 45,
        forecastedStart: '2024-04-15',
        forecastedEnd: '2024-08-15',
        actualStart: '2024-04-10',
        actualEnd: null,
        assignee: 'Steel Works Inc',
        priority: 'critical',
        category: 'Framing',
        phase: 'Framing'
      }
    ]
  },
  {
    id: 'project-without-template',
    name: 'Custom Renovation Project',
    description: 'Unique renovation project without predefined template',
    templateId: null,
    templateName: null,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    status: 'planning',
    progress: 15,
    budget: 2500000,
    actualCost: 150000,
    manager: 'Mike Wilson',
    client: 'Private Client',
    location: '456 Residential St, Suburbs',
    type: 'Residential',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
    tables: [
      {
        id: 'table-1',
        name: 'Custom Tasks',
        description: 'Custom task list created without template',
        columns: [
          { id: 'col-1', name: 'Task', type: 'text', required: true },
          { id: 'col-2', name: 'Status', type: 'status', options: ['Not Started', 'In Progress', 'Completed'], required: true },
          { id: 'col-3', name: 'Priority', type: 'priority', options: ['Low', 'Medium', 'High'], required: true },
          { id: 'col-4', name: 'Assigned To', type: 'contact', required: false },
          { id: 'col-5', name: 'Due Date', type: 'date', required: false }
        ],
        rows: [
          {
            id: 'row-1',
            data: {
              'col-1': 'Design Planning',
              'col-2': 'In Progress',
              'col-3': 'High',
              'col-4': 'Design Team',
              'col-5': '2024-03-15'
            }
          },
          {
            id: 'row-2',
            data: {
              'col-1': 'Permit Applications',
              'col-2': 'Not Started',
              'col-3': 'High',
              'col-4': 'Mike Wilson',
              'col-5': '2024-04-01'
            }
          }
        ]
      }
    ],
    ganttTasks: [
      {
        id: 'task-1',
        name: 'Design Planning',
        startDate: '2024-02-01',
        endDate: '2024-03-15',
        duration: 43,
        dependencies: [],
        status: 'in-progress',
        progress: 30,
        forecastedStart: '2024-02-01',
        forecastedEnd: '2024-03-15',
        actualStart: '2024-02-01',
        actualEnd: null,
        assignee: 'Design Team',
        priority: 'high',
        category: 'Planning',
        phase: 'Design'
      },
      {
        id: 'task-2',
        name: 'Permit Applications',
        startDate: '2024-03-01',
        endDate: '2024-04-30',
        duration: 60,
        dependencies: ['task-1'],
        status: 'not-started',
        progress: 0,
        forecastedStart: '2024-03-01',
        forecastedEnd: '2024-04-30',
        actualStart: null,
        actualEnd: null,
        assignee: 'Mike Wilson',
        priority: 'high',
        category: 'Permits',
        phase: 'Pre-Construction'
      }
    ]
  }
];

export const DEMO_TEMPLATE_PRESETS = [
  {
    name: 'Residential Development Pipeline',
    description: 'Complete residential property development workflow',
    category: 'real-estate',
    icon: '🏠',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Commercial Construction Management',
    description: 'Comprehensive commercial construction project tracking',
    category: 'construction',
    icon: '🏢',
    color: 'bg-green-100 text-green-800'
  },
  {
    name: 'Property Management Operations',
    description: 'Property operations and tenant management',
    category: 'property-management',
    icon: '🏘️',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    name: 'Development Planning & Permits',
    description: 'Project planning and regulatory compliance',
    category: 'development',
    icon: '📋',
    color: 'bg-orange-100 text-orange-800'
  }
];
