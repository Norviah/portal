// Demo data for the client portal application

export const DEMO_PROJECTS = [
  {
    id: "proj-001",
    name: "Modern Home Renovation",
    client: "John Smith",
    status: "in_progress",
    progress: 65,
    startDate: "2024-08-01",
    expectedCompletion: "2024-12-15",
    budget: 150000,
    nextMilestone: {
      name: "Foundation Complete",
      dueDate: "2024-10-15",
      status: "upcoming"
    }
  },
  {
    id: "proj-002", 
    name: "Office Building",
    client: "ABC Corp",
    status: "planning",
    progress: 25,
    startDate: "2024-09-01",
    expectedCompletion: "2025-03-15",
    budget: 500000,
    nextMilestone: {
      name: "Permit Approval",
      dueDate: "2024-10-20",
      status: "upcoming"
    }
  }
];

export const DEMO_DECISIONS = [
  {
    id: "dec-001",
    title: "Kitchen Countertop Material Selection",
    description: "Please select your preferred countertop material for the kitchen renovation.",
    status: "urgent",
    deadline: "2024-10-10",
    options: [
      {
        id: "granite",
        name: "Granite",
        price: 2500,
        description: "Durable, natural stone, requires sealing"
      },
      {
        id: "quartz", 
        name: "Quartz",
        price: 3200,
        description: "Low maintenance, consistent color, non-porous"
      },
      {
        id: "marble",
        name: "Marble", 
        price: 4000,
        description: "Elegant, unique veining, requires maintenance"
      }
    ]
  },
  {
    id: "dec-002",
    title: "Exterior Paint Color",
    description: "Choose the exterior paint color for your home.",
    status: "pending",
    deadline: "2024-10-15",
    options: [
      {
        id: "ocean-blue",
        name: "Ocean Blue",
        color: "#4A90E2",
        description: "Classic coastal look"
      },
      {
        id: "modern-gray",
        name: "Modern Gray", 
        color: "#6B7280",
        description: "Contemporary and timeless"
      },
      {
        id: "forest-green",
        name: "Forest Green",
        color: "#059669", 
        description: "Natural and earthy"
      }
    ]
  }
];

export const DEMO_MESSAGES = [
  {
    id: "msg-001",
    sender: "John Smith",
    content: "Hi team, I have a question about the countertop options. Can we schedule a call?",
    timestamp: "2024-10-08T10:30:00Z",
    isFromClient: true,
    isRead: false
  },
  {
    id: "msg-002",
    sender: "Project Manager",
    content: "Hi John! Absolutely, I can schedule a call for tomorrow at 2 PM. Does that work for you?",
    timestamp: "2024-10-08T11:15:00Z", 
    isFromClient: false,
    isRead: true
  },
  {
    id: "msg-003",
    sender: "John Smith",
    content: "Perfect, that works great. Thanks!",
    timestamp: "2024-10-08T11:45:00Z",
    isFromClient: true,
    isRead: true
  }
];

export const DEMO_INVOICES = [
  {
    id: "INV-001",
    date: "2024-10-01",
    amount: 10000,
    status: "pending",
    description: "Foundation work - Phase 1",
    dueDate: "2024-10-15"
  },
  {
    id: "INV-002", 
    date: "2024-09-15",
    amount: 5000,
    status: "paid",
    description: "Planning and permits",
    dueDate: "2024-09-30"
  }
];

export const DEMO_ACTIVITIES = [
  {
    id: "act-001",
    type: "milestone",
    title: "Foundation poured successfully",
    description: "Concrete foundation has been poured and is curing properly",
    date: "2024-09-15",
    status: "completed"
  },
  {
    id: "act-002",
    type: "permit",
    title: "Permits approved by city",
    description: "All required building permits have been approved",
    date: "2024-09-10", 
    status: "completed"
  },
  {
    id: "act-003",
    type: "delivery",
    title: "Material delivery scheduled",
    description: "Construction materials scheduled for delivery next week",
    date: "2024-09-08",
    status: "scheduled"
  }
];

export const DEMO_TEAM_MEMBERS = [
  {
    id: "team-001",
    name: "Construction Team",
    role: "On Site",
    status: "active"
  },
  {
    id: "team-002", 
    name: "Design Team",
    role: "Available",
    status: "active"
  },
  {
    id: "team-003",
    name: "Project Coordinators", 
    role: "In Office",
    status: "active"
  }
];
