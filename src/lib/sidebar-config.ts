import { 
  Shield, 
  Users, 
  User, 
  Home, 
  FileText, 
  BarChart3, 
  Settings, 
  Calendar, 
  MessageSquare, 
  Upload, 
  Download, 
  DollarSign, 
  PieChart, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Building,
  Wrench,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Bell,
  HelpCircle,
  LogOut
} from "lucide-react";

export interface NavigationItem {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: any;
  }[];
}

export interface SidebarConfig {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  teams: {
    name: string;
    logo: any;
    plan: string;
  }[];
  navMain: NavigationItem[];
  projects: {
    name: string;
    url: string;
    icon: any;
  }[];
}

// Admin Sidebar Configuration
export const adminSidebarConfig: SidebarConfig = {
  user: {
    name: "Admin User",
    email: "admin@trio.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Trio Construction",
      logo: Building,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: Home,
      isActive: true,
    },
    {
      title: "Project Management",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/admin/projects",
          icon: FileText,
        },
        {
          title: "Create Project",
          url: "/dashboard/admin/projects/new",
          icon: Plus,
        },
        {
          title: "Project Templates",
          url: "/dashboard/admin/templates",
          icon: Wrench,
        },
        {
          title: "Project Analytics",
          url: "/dashboard/admin/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/dashboard/admin/users",
          icon: Users,
        },
        {
          title: "Add User",
          url: "/dashboard/admin/users/new",
          icon: Plus,
        },
        {
          title: "User Roles",
          url: "/dashboard/admin/roles",
          icon: Shield,
        },
        {
          title: "Permissions",
          url: "/dashboard/admin/permissions",
          icon: Settings,
        },
      ],
    },
    {
      title: "System Overview",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "System Health",
          url: "/dashboard/admin/system",
          icon: CheckCircle,
        },
        {
          title: "Performance",
          url: "/dashboard/admin/performance",
          icon: PieChart,
        },
        {
          title: "Reports",
          url: "/dashboard/admin/reports",
          icon: FileText,
        },
        {
          title: "Audit Logs",
          url: "/dashboard/admin/audit",
          icon: Eye,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "/dashboard/admin/settings/general",
          icon: Settings,
        },
        {
          title: "Feature Controls",
          url: "/dashboard/admin/settings/features",
          icon: Wrench,
        },
        {
          title: "Integrations",
          url: "/dashboard/admin/settings/integrations",
          icon: Building,
        },
        {
          title: "Backup & Security",
          url: "/dashboard/admin/settings/security",
          icon: Shield,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Modern Home Renovation",
      url: "/dashboard/admin/projects/1",
      icon: FileText,
    },
    {
      name: "Office Building",
      url: "/dashboard/admin/projects/2",
      icon: Building,
    },
    {
      name: "Retail Space",
      url: "/dashboard/admin/projects/3",
      icon: Building,
    },
  ],
};

// Manager Sidebar Configuration
export const managerSidebarConfig: SidebarConfig = {
  user: {
    name: "Project Manager",
    email: "manager@trio.com",
    avatar: "/avatars/manager.jpg",
  },
  teams: [
    {
      name: "Trio Construction",
      logo: Building,
      plan: "Professional",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/manager",
      icon: Home,
      isActive: true,
    },
    {
      title: "My Projects",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Active Projects",
          url: "/dashboard/manager/projects/active",
          icon: Clock,
        },
        {
          title: "Completed Projects",
          url: "/dashboard/manager/projects/completed",
          icon: CheckCircle,
        },
        {
          title: "Create Project",
          url: "/dashboard/manager/projects/new",
          icon: Plus,
        },
        {
          title: "Project Templates",
          url: "/dashboard/manager/templates",
          icon: Wrench,
        },
      ],
    },
    {
      title: "Client Management",
      url: "#",
      icon: User,
      items: [
        {
          title: "All Clients",
          url: "/dashboard/manager/clients",
          icon: Users,
        },
        {
          title: "Client Communications",
          url: "/dashboard/manager/communications",
          icon: MessageSquare,
        },
        {
          title: "Client Permissions",
          url: "/dashboard/manager/permissions",
          icon: Settings,
        },
        {
          title: "Client Feedback",
          url: "/dashboard/manager/feedback",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Team Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Team Members",
          url: "/dashboard/manager/team",
          icon: Users,
        },
        {
          title: "Assignments",
          url: "/dashboard/manager/assignments",
          icon: Calendar,
        },
        {
          title: "Performance",
          url: "/dashboard/manager/performance",
          icon: BarChart3,
        },
        {
          title: "Schedules",
          url: "/dashboard/manager/schedules",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Financials",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Project Budgets",
          url: "/dashboard/manager/budgets",
          icon: DollarSign,
        },
        {
          title: "Invoices",
          url: "/dashboard/manager/invoices",
          icon: FileText,
        },
        {
          title: "Payments",
          url: "/dashboard/manager/payments",
          icon: CheckCircle,
        },
        {
          title: "Reports",
          url: "/dashboard/manager/reports",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Tools",
      url: "#",
      icon: Wrench,
      items: [
        {
          title: "Gantt Charts",
          url: "/dashboard/manager/gantt",
          icon: BarChart3,
        },
        {
          title: "File Management",
          url: "/dashboard/manager/files",
          icon: Upload,
        },
        {
          title: "Decision Tracking",
          url: "/dashboard/manager/decisions",
          icon: CheckCircle,
        },
        {
          title: "Notifications",
          url: "/dashboard/manager/notifications",
          icon: Bell,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Modern Home Renovation",
      url: "/dashboard/manager/projects/1",
      icon: FileText,
    },
    {
      name: "Office Building",
      url: "/dashboard/manager/projects/2",
      icon: Building,
    },
  ],
};

// Client Sidebar Configuration
export const clientSidebarConfig: SidebarConfig = {
  user: {
    name: "Client User",
    email: "client@trio.com",
    avatar: "/avatars/client.jpg",
  },
  teams: [
    {
      name: "My Project",
      logo: Building,
      plan: "Client",
    },
  ],
  navMain: [
    {
      title: "Project Portal",
      url: "/dashboard/client",
      icon: Home,
      isActive: true,
    },
    {
      title: "Project Overview",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Project Details",
          url: "/dashboard/client/project",
          icon: FileText,
        },
        {
          title: "Progress Tracking",
          url: "/dashboard/client/progress",
          icon: BarChart3,
        },
        {
          title: "Timeline",
          url: "/dashboard/client/timeline",
          icon: Calendar,
        },
        {
          title: "Milestones",
          url: "/dashboard/client/milestones",
          icon: CheckCircle,
        },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "Team Messages",
          url: "/dashboard/client/messages",
          icon: MessageSquare,
        },
        {
          title: "Discussion Board",
          url: "/dashboard/client/discussion",
          icon: MessageSquare,
        },
        {
          title: "Notifications",
          url: "/dashboard/client/notifications",
          icon: Bell,
        },
        {
          title: "Contact Team",
          url: "/dashboard/client/contact",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Decisions & Feedback",
      url: "#",
      icon: CheckCircle,
      items: [
        {
          title: "Pending Decisions",
          url: "/dashboard/client/decisions",
          icon: Clock,
        },
        {
          title: "Decision History",
          url: "/dashboard/client/decisions/history",
          icon: CheckCircle,
        },
        {
          title: "Feedback Forms",
          url: "/dashboard/client/feedback",
          icon: MessageSquare,
        },
        {
          title: "Change Requests",
          url: "/dashboard/client/changes",
          icon: Edit,
        },
      ],
    },
    {
      title: "Files & Documents",
      url: "#",
      icon: Upload,
      items: [
        {
          title: "Project Files",
          url: "/dashboard/client/files",
          icon: Upload,
        },
        {
          title: "Downloads",
          url: "/dashboard/client/downloads",
          icon: Download,
        },
        {
          title: "Photo Gallery",
          url: "/dashboard/client/gallery",
          icon: Eye,
        },
        {
          title: "Documents",
          url: "/dashboard/client/documents",
          icon: FileText,
        },
      ],
    },
    {
      title: "Financials",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Invoices",
          url: "/dashboard/client/invoices",
          icon: FileText,
        },
        {
          title: "Payments",
          url: "/dashboard/client/payments",
          icon: DollarSign,
        },
        {
          title: "Budget Overview",
          url: "/dashboard/client/budget",
          icon: PieChart,
        },
        {
          title: "Payment History",
          url: "/dashboard/client/payments/history",
          icon: Clock,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Modern Home Renovation",
      url: "/dashboard/client/project",
      icon: FileText,
    },
  ],
};

// Helper function to get sidebar config based on user role
export function getSidebarConfig(role: string, user?: { name: string; email: string }): SidebarConfig {
  const baseConfigs = {
    admin: adminSidebarConfig,
    manager: managerSidebarConfig,
    client: clientSidebarConfig,
  };

  const config = baseConfigs[role as keyof typeof baseConfigs] || clientSidebarConfig;
  
  // Update user info if provided
  if (user) {
    config.user = {
      ...config.user,
      name: user.name,
      email: user.email,
    };
  }

  return config;
}
