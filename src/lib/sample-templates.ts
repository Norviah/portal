export interface SampleTemplate {
  id: string;
  name: string;
  description: string;
  type: 'table' | 'gantt' | 'mixed';
  category: 'construction' | 'renovation' | 'commercial' | 'residential' | 'general';
  tables: {
    id: string;
    name: string;
    description: string;
    columns: {
      name: string;
      type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'progress';
      options?: string[];
      required?: boolean;
    }[];
    sampleData: Record<string, any>[];
  }[];
  ganttTasks: {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies: string[];
    category: string;
    assignee: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }[];
  createdAt: string;
  updatedAt: string;
  isSample: boolean;
}

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: 'sample-1',
    name: 'Residential Home Construction',
    description: 'Complete template for residential home construction projects with phases, materials, and timeline tracking.',
    type: 'mixed',
    category: 'residential',
    tables: [
      {
        id: 'phases',
        name: 'Construction Phases',
        description: 'Main construction phases and milestones',
        columns: [
          { name: 'Phase', type: 'text', required: true },
          { name: 'Duration (Days)', type: 'number', required: true },
          { name: 'Status', type: 'dropdown', options: ['Not Started', 'In Progress', 'Completed', 'On Hold'], required: true },
          { name: 'Progress (%)', type: 'progress', required: true },
          { name: 'Lead Contractor', type: 'text', required: true },
          { name: 'Notes', type: 'text' }
        ],
        sampleData: [
          { 'Phase': 'Site Preparation', 'Duration (Days)': 5, 'Status': 'Completed', 'Progress (%)': 100, 'Lead Contractor': 'ABC Excavation', 'Notes': 'Site cleared and leveled' },
          { 'Phase': 'Foundation', 'Duration (Days)': 10, 'Status': 'In Progress', 'Progress (%)': 75, 'Lead Contractor': 'Foundation Co', 'Notes': 'Concrete poured, curing' },
          { 'Phase': 'Framing', 'Duration (Days)': 15, 'Status': 'Not Started', 'Progress (%)': 0, 'Lead Contractor': 'Framing Specialists', 'Notes': 'Waiting for foundation' },
          { 'Phase': 'Roofing', 'Duration (Days)': 8, 'Status': 'Not Started', 'Progress (%)': 0, 'Lead Contractor': 'Roof Masters', 'Notes': 'Scheduled after framing' },
          { 'Phase': 'Interior', 'Duration (Days)': 20, 'Status': 'Not Started', 'Progress (%)': 0, 'Lead Contractor': 'Interior Builders', 'Notes': 'Drywall, flooring, fixtures' }
        ]
      },
      {
        id: 'materials',
        name: 'Materials & Costs',
        description: 'Material requirements and cost tracking',
        columns: [
          { name: 'Material', type: 'text', required: true },
          { name: 'Quantity', type: 'number', required: true },
          { name: 'Unit', type: 'dropdown', options: ['sq ft', 'linear ft', 'cubic yards', 'pieces', 'tons'], required: true },
          { name: 'Unit Cost', type: 'number', required: true },
          { name: 'Total Cost', type: 'number', required: true },
          { name: 'Supplier', type: 'text' },
          { name: 'Ordered', type: 'checkbox' }
        ],
        sampleData: [
          { 'Material': 'Concrete', 'Quantity': 25, 'Unit': 'cubic yards', 'Unit Cost': 120, 'Total Cost': 3000, 'Supplier': 'Concrete Supply Co', 'Ordered': true },
          { 'Material': 'Lumber (2x4)', 'Quantity': 500, 'Unit': 'linear ft', 'Unit Cost': 3.50, 'Total Cost': 1750, 'Supplier': 'Lumber Yard', 'Ordered': false },
          { 'Material': 'Drywall', 'Quantity': 1200, 'Unit': 'sq ft', 'Unit Cost': 1.25, 'Total Cost': 1500, 'Supplier': 'Building Materials Inc', 'Ordered': false },
          { 'Material': 'Roofing Shingles', 'Quantity': 2000, 'Unit': 'sq ft', 'Unit Cost': 2.80, 'Total Cost': 5600, 'Supplier': 'Roofing Supply', 'Ordered': false }
        ]
      }
    ],
    ganttTasks: [
      {
        id: 'site-prep',
        name: 'Site Preparation',
        start: '2024-01-01',
        end: '2024-01-05',
        progress: 100,
        dependencies: [],
        category: 'Site Work',
        assignee: 'ABC Excavation',
        priority: 'high'
      },
      {
        id: 'foundation',
        name: 'Foundation Work',
        start: '2024-01-06',
        end: '2024-01-15',
        progress: 75,
        dependencies: ['site-prep'],
        category: 'Foundation',
        assignee: 'Foundation Co',
        priority: 'critical'
      },
      {
        id: 'framing',
        name: 'Framing',
        start: '2024-01-16',
        end: '2024-01-30',
        progress: 0,
        dependencies: ['foundation'],
        category: 'Structure',
        assignee: 'Framing Specialists',
        priority: 'high'
      },
      {
        id: 'roofing',
        name: 'Roofing',
        start: '2024-01-31',
        end: '2024-02-07',
        progress: 0,
        dependencies: ['framing'],
        category: 'Exterior',
        assignee: 'Roof Masters',
        priority: 'high'
      },
      {
        id: 'interior',
        name: 'Interior Work',
        start: '2024-02-08',
        end: '2024-02-27',
        progress: 0,
        dependencies: ['roofing'],
        category: 'Interior',
        assignee: 'Interior Builders',
        priority: 'medium'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSample: true
  },
  {
    id: 'sample-2',
    name: 'Kitchen Renovation',
    description: 'Comprehensive template for kitchen renovation projects including design phases, material selection, and installation tracking.',
    type: 'mixed',
    category: 'renovation',
    tables: [
      {
        id: 'design-phases',
        name: 'Design & Planning Phases',
        description: 'Design and planning milestones',
        columns: [
          { name: 'Phase', type: 'text', required: true },
          { name: 'Duration (Days)', type: 'number', required: true },
          { name: 'Status', type: 'dropdown', options: ['Not Started', 'In Progress', 'Completed', 'On Hold'], required: true },
          { name: 'Progress (%)', type: 'progress', required: true },
          { name: 'Designer', type: 'text', required: true },
          { name: 'Client Approval', type: 'checkbox' }
        ],
        sampleData: [
          { 'Phase': 'Initial Consultation', 'Duration (Days)': 1, 'Status': 'Completed', 'Progress (%)': 100, 'Designer': 'Sarah Johnson', 'Client Approval': true },
          { 'Phase': 'Space Planning', 'Duration (Days)': 3, 'Status': 'Completed', 'Progress (%)': 100, 'Designer': 'Sarah Johnson', 'Client Approval': true },
          { 'Phase': '3D Design', 'Duration (Days)': 5, 'Status': 'In Progress', 'Progress (%)': 60, 'Designer': 'Sarah Johnson', 'Client Approval': false },
          { 'Phase': 'Material Selection', 'Duration (Days)': 7, 'Status': 'Not Started', 'Progress (%)': 0, 'Designer': 'Sarah Johnson', 'Client Approval': false },
          { 'Phase': 'Final Approval', 'Duration (Days)': 2, 'Status': 'Not Started', 'Progress (%)': 0, 'Designer': 'Sarah Johnson', 'Client Approval': false }
        ]
      },
      {
        id: 'appliances',
        name: 'Appliance Selection',
        description: 'Kitchen appliances and specifications',
        columns: [
          { name: 'Appliance', type: 'text', required: true },
          { name: 'Brand', type: 'text', required: true },
          { name: 'Model', type: 'text', required: true },
          { name: 'Price', type: 'number', required: true },
          { name: 'Status', type: 'dropdown', options: ['Researching', 'Selected', 'Ordered', 'Delivered', 'Installed'], required: true },
          { name: 'Delivery Date', type: 'date' },
          { name: 'Installation Date', type: 'date' }
        ],
        sampleData: [
          { 'Appliance': 'Refrigerator', 'Brand': 'Samsung', 'Model': 'RF28K9070SG', 'Price': 1899, 'Status': 'Selected', 'Delivery Date': '2024-02-15', 'Installation Date': '2024-02-20' },
          { 'Appliance': 'Dishwasher', 'Brand': 'Bosch', 'Model': 'SHEM63W55N', 'Price': 899, 'Status': 'Ordered', 'Delivery Date': '2024-02-10', 'Installation Date': '2024-02-18' },
          { 'Appliance': 'Range', 'Brand': 'GE', 'Model': 'JGBS66REKSS', 'Price': 1299, 'Status': 'Researching', 'Delivery Date': '', 'Installation Date': '' },
          { 'Appliance': 'Microwave', 'Brand': 'Whirlpool', 'Model': 'WMC30516AS', 'Price': 399, 'Status': 'Selected', 'Delivery Date': '2024-02-12', 'Installation Date': '2024-02-19' }
        ]
      }
    ],
    ganttTasks: [
      {
        id: 'consultation',
        name: 'Initial Consultation',
        start: '2024-01-01',
        end: '2024-01-01',
        progress: 100,
        dependencies: [],
        category: 'Design',
        assignee: 'Sarah Johnson',
        priority: 'high'
      },
      {
        id: 'space-planning',
        name: 'Space Planning',
        start: '2024-01-02',
        end: '2024-01-04',
        progress: 100,
        dependencies: ['consultation'],
        category: 'Design',
        assignee: 'Sarah Johnson',
        priority: 'high'
      },
      {
        id: '3d-design',
        name: '3D Design',
        start: '2024-01-05',
        end: '2024-01-09',
        progress: 60,
        dependencies: ['space-planning'],
        category: 'Design',
        assignee: 'Sarah Johnson',
        priority: 'high'
      },
      {
        id: 'material-selection',
        name: 'Material Selection',
        start: '2024-01-10',
        end: '2024-01-16',
        progress: 0,
        dependencies: ['3d-design'],
        category: 'Planning',
        assignee: 'Sarah Johnson',
        priority: 'medium'
      },
      {
        id: 'demolition',
        name: 'Demolition',
        start: '2024-01-20',
        end: '2024-01-22',
        progress: 0,
        dependencies: ['material-selection'],
        category: 'Construction',
        assignee: 'Demo Crew',
        priority: 'high'
      },
      {
        id: 'electrical',
        name: 'Electrical Work',
        start: '2024-01-23',
        end: '2024-01-25',
        progress: 0,
        dependencies: ['demolition'],
        category: 'Construction',
        assignee: 'Electric Pro',
        priority: 'critical'
      },
      {
        id: 'plumbing',
        name: 'Plumbing Work',
        start: '2024-01-26',
        end: '2024-01-28',
        progress: 0,
        dependencies: ['demolition'],
        category: 'Construction',
        assignee: 'Plumb Right',
        priority: 'critical'
      },
      {
        id: 'installation',
        name: 'Appliance Installation',
        start: '2024-02-15',
        end: '2024-02-20',
        progress: 0,
        dependencies: ['electrical', 'plumbing'],
        category: 'Installation',
        assignee: 'Install Team',
        priority: 'high'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSample: true
  },
  {
    id: 'sample-3',
    name: 'Office Building Construction',
    description: 'Professional template for commercial office building construction with detailed project phases and compliance tracking.',
    type: 'mixed',
    category: 'commercial',
    tables: [
      {
        id: 'project-phases',
        name: 'Project Phases',
        description: 'Main construction phases for office building',
        columns: [
          { name: 'Phase', type: 'text', required: true },
          { name: 'Duration (Weeks)', type: 'number', required: true },
          { name: 'Status', type: 'dropdown', options: ['Not Started', 'In Progress', 'Completed', 'On Hold'], required: true },
          { name: 'Progress (%)', type: 'progress', required: true },
          { name: 'Project Manager', type: 'text', required: true },
          { name: 'Budget ($)', type: 'number', required: true },
          { name: 'Actual Cost ($)', type: 'number' }
        ],
        sampleData: [
          { 'Phase': 'Pre-Construction', 'Duration (Weeks)': 4, 'Status': 'Completed', 'Progress (%)': 100, 'Project Manager': 'John Smith', 'Budget ($)': 50000, 'Actual Cost ($)': 48000 },
          { 'Phase': 'Site Work', 'Duration (Weeks)': 6, 'Status': 'In Progress', 'Progress (%)': 80, 'Project Manager': 'John Smith', 'Budget ($)': 150000, 'Actual Cost ($)': 120000 },
          { 'Phase': 'Foundation', 'Duration (Weeks)': 8, 'Status': 'In Progress', 'Progress (%)': 60, 'Project Manager': 'John Smith', 'Budget ($)': 300000, 'Actual Cost ($)': 180000 },
          { 'Phase': 'Steel Frame', 'Duration (Weeks)': 12, 'Status': 'Not Started', 'Progress (%)': 0, 'Project Manager': 'John Smith', 'Budget ($)': 800000, 'Actual Cost ($)': 0 },
          { 'Phase': 'MEP Systems', 'Duration (Weeks)': 16, 'Status': 'Not Started', 'Progress (%)': 0, 'Project Manager': 'John Smith', 'Budget ($)': 1200000, 'Actual Cost ($)': 0 },
          { 'Phase': 'Interior Buildout', 'Duration (Weeks)': 20, 'Status': 'Not Started', 'Progress (%)': 0, 'Project Manager': 'John Smith', 'Budget ($)': 2000000, 'Actual Cost ($)': 0 }
        ]
      },
      {
        id: 'compliance',
        name: 'Compliance & Permits',
        description: 'Regulatory compliance and permit tracking',
        columns: [
          { name: 'Requirement', type: 'text', required: true },
          { name: 'Type', type: 'dropdown', options: ['Permit', 'Inspection', 'Certificate', 'License'], required: true },
          { name: 'Status', type: 'dropdown', options: ['Pending', 'Submitted', 'Approved', 'Rejected'], required: true },
          { name: 'Due Date', type: 'date', required: true },
          { name: 'Responsible Party', type: 'text', required: true },
          { name: 'Reference Number', type: 'text' }
        ],
        sampleData: [
          { 'Requirement': 'Building Permit', 'Type': 'Permit', 'Status': 'Approved', 'Due Date': '2024-01-15', 'Responsible Party': 'City Planning', 'Reference Number': 'BP-2024-001' },
          { 'Requirement': 'Electrical Permit', 'Type': 'Permit', 'Status': 'Approved', 'Due Date': '2024-01-20', 'Responsible Party': 'Electrical Inspector', 'Reference Number': 'EP-2024-045' },
          { 'Requirement': 'Foundation Inspection', 'Type': 'Inspection', 'Status': 'Pending', 'Due Date': '2024-02-15', 'Responsible Party': 'Building Inspector', 'Reference Number': 'FI-2024-012' },
          { 'Requirement': 'Fire Safety Certificate', 'Type': 'Certificate', 'Status': 'Pending', 'Due Date': '2024-06-30', 'Responsible Party': 'Fire Marshal', 'Reference Number': '' }
        ]
      }
    ],
    ganttTasks: [
      {
        id: 'pre-construction',
        name: 'Pre-Construction',
        start: '2024-01-01',
        end: '2024-01-28',
        progress: 100,
        dependencies: [],
        category: 'Planning',
        assignee: 'John Smith',
        priority: 'high'
      },
      {
        id: 'site-work',
        name: 'Site Work',
        start: '2024-01-29',
        end: '2024-03-11',
        progress: 80,
        dependencies: ['pre-construction'],
        category: 'Site',
        assignee: 'Site Crew',
        priority: 'high'
      },
      {
        id: 'foundation',
        name: 'Foundation',
        start: '2024-03-12',
        end: '2024-05-06',
        progress: 60,
        dependencies: ['site-work'],
        category: 'Structure',
        assignee: 'Foundation Team',
        priority: 'critical'
      },
      {
        id: 'steel-frame',
        name: 'Steel Frame',
        start: '2024-05-07',
        end: '2024-07-29',
        progress: 0,
        dependencies: ['foundation'],
        category: 'Structure',
        assignee: 'Steel Crew',
        priority: 'critical'
      },
      {
        id: 'mep-systems',
        name: 'MEP Systems',
        start: '2024-08-01',
        end: '2024-11-19',
        progress: 0,
        dependencies: ['steel-frame'],
        category: 'Systems',
        assignee: 'MEP Contractors',
        priority: 'high'
      },
      {
        id: 'interior-buildout',
        name: 'Interior Buildout',
        start: '2024-11-20',
        end: '2025-04-08',
        progress: 0,
        dependencies: ['mep-systems'],
        category: 'Interior',
        assignee: 'Interior Team',
        priority: 'medium'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSample: true
  },
  {
    id: 'sample-4',
    name: 'Bathroom Renovation',
    description: 'Complete bathroom renovation template with design, demolition, and installation phases.',
    type: 'gantt',
    category: 'renovation',
    tables: [],
    ganttTasks: [
      {
        id: 'design-phase',
        name: 'Design Phase',
        start: '2024-01-01',
        end: '2024-01-14',
        progress: 100,
        dependencies: [],
        category: 'Design',
        assignee: 'Designer',
        priority: 'high'
      },
      {
        id: 'permit-approval',
        name: 'Permit Approval',
        start: '2024-01-15',
        end: '2024-01-21',
        progress: 100,
        dependencies: ['design-phase'],
        category: 'Planning',
        assignee: 'Project Manager',
        priority: 'high'
      },
      {
        id: 'demolition',
        name: 'Demolition',
        start: '2024-01-22',
        end: '2024-01-24',
        progress: 100,
        dependencies: ['permit-approval'],
        category: 'Construction',
        assignee: 'Demo Crew',
        priority: 'high'
      },
      {
        id: 'plumbing-rough',
        name: 'Plumbing Rough-in',
        start: '2024-01-25',
        end: '2024-01-27',
        progress: 100,
        dependencies: ['demolition'],
        category: 'Construction',
        assignee: 'Plumber',
        priority: 'critical'
      },
      {
        id: 'electrical-rough',
        name: 'Electrical Rough-in',
        start: '2024-01-28',
        end: '2024-01-30',
        progress: 100,
        dependencies: ['demolition'],
        category: 'Construction',
        assignee: 'Electrician',
        priority: 'critical'
      },
      {
        id: 'drywall',
        name: 'Drywall & Taping',
        start: '2024-01-31',
        end: '2024-02-05',
        progress: 80,
        dependencies: ['plumbing-rough', 'electrical-rough'],
        category: 'Construction',
        assignee: 'Drywall Crew',
        priority: 'medium'
      },
      {
        id: 'tiling',
        name: 'Tiling',
        start: '2024-02-06',
        end: '2024-02-12',
        progress: 0,
        dependencies: ['drywall'],
        category: 'Finishing',
        assignee: 'Tile Installer',
        priority: 'high'
      },
      {
        id: 'fixtures',
        name: 'Fixture Installation',
        start: '2024-02-13',
        end: '2024-02-15',
        progress: 0,
        dependencies: ['tiling'],
        category: 'Installation',
        assignee: 'Installation Team',
        priority: 'high'
      },
      {
        id: 'final-inspection',
        name: 'Final Inspection',
        start: '2024-02-16',
        end: '2024-02-16',
        progress: 0,
        dependencies: ['fixtures'],
        category: 'Completion',
        assignee: 'Inspector',
        priority: 'critical'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSample: true
  },
  {
    id: 'sample-5',
    name: 'Project Timeline Tracker',
    description: 'Simple timeline tracking template for any type of project with basic task management.',
    type: 'table',
    category: 'general',
    tables: [
      {
        id: 'tasks',
        name: 'Project Tasks',
        description: 'Basic task tracking with status and assignments',
        columns: [
          { name: 'Task', type: 'text', required: true },
          { name: 'Assigned To', type: 'text', required: true },
          { name: 'Status', type: 'dropdown', options: ['Not Started', 'In Progress', 'Completed', 'On Hold'], required: true },
          { name: 'Priority', type: 'dropdown', options: ['Low', 'Medium', 'High', 'Critical'], required: true },
          { name: 'Due Date', type: 'date', required: true },
          { name: 'Progress (%)', type: 'progress', required: true },
          { name: 'Notes', type: 'text' }
        ],
        sampleData: [
          { 'Task': 'Project Kickoff Meeting', 'Assigned To': 'Project Manager', 'Status': 'Completed', 'Priority': 'High', 'Due Date': '2024-01-15', 'Progress (%)': 100, 'Notes': 'All stakeholders attended' },
          { 'Task': 'Requirements Gathering', 'Assigned To': 'Business Analyst', 'Status': 'In Progress', 'Priority': 'High', 'Due Date': '2024-01-25', 'Progress (%)': 75, 'Notes': '80% complete, waiting for client input' },
          { 'Task': 'Technical Design', 'Assigned To': 'Lead Developer', 'Status': 'Not Started', 'Priority': 'Medium', 'Due Date': '2024-02-01', 'Progress (%)': 0, 'Notes': 'Pending requirements approval' },
          { 'Task': 'User Testing', 'Assigned To': 'QA Team', 'Status': 'Not Started', 'Priority': 'Medium', 'Due Date': '2024-02-15', 'Progress (%)': 0, 'Notes': 'Scheduled after development' },
          { 'Task': 'Project Delivery', 'Assigned To': 'Project Manager', 'Status': 'Not Started', 'Priority': 'Critical', 'Due Date': '2024-02-28', 'Progress (%)': 0, 'Notes': 'Final milestone' }
        ]
      }
    ],
    ganttTasks: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isSample: true
  }
];

export const getSampleTemplates = (): SampleTemplate[] => {
  return SAMPLE_TEMPLATES;
};

export const getSampleTemplateById = (id: string): SampleTemplate | undefined => {
  return SAMPLE_TEMPLATES.find(template => template.id === id);
};

export const getSampleTemplatesByCategory = (category: string): SampleTemplate[] => {
  return SAMPLE_TEMPLATES.filter(template => template.category === category);
};
