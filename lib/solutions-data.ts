export const solutionsData = {
  solutions: [
    {
      id: "crm",
      name: "CRM",
      title: "Customer Relationship Management",
      description: "Manage leads, contacts, deals, and customer interactions with powerful automation and analytics.",
      icon: "👥",
      category: "Business",
      audience: "B2B",
      modules: [
        "Leads Management",
        "Contacts & Accounts",
        "Deal Pipeline",
        "Activity Tracking",
        "Reports & Analytics"
      ],
      features: [
        "Kanban pipeline views",
        "Timeline activity tracking",
        "Email & calendar integration",
        "Advanced reporting dashboards",
        "Workflow automation"
      ],
      integrations: ["Email", "Calendar", "Phone"]
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      title: "E-commerce Platform",
      description: "Build complete online stores with product catalogs, shopping cart, checkout, and order management.",
      icon: "🛒",
      category: "Retail",
      audience: "B2C",
      modules: [
        "Product Catalog",
        "Shopping Cart",
        "Checkout System",
        "Order Management",
        "Payment Processing",
        "Shipping & Tracking"
      ],
      features: [
        "Product variants & inventory",
        "Multi-payment gateways",
        "Shipping integrations",
        "Customer reviews & ratings",
        "Loyalty programs"
      ],
      integrations: ["Payment Gateway", "Shipping", "Inventory"]
    },
    {
      id: "helpdesk",
      name: "Helpdesk",
      title: "Helpdesk / ITSM",
      description: "Streamline customer support with ticketing, knowledge base, and SLA management.",
      icon: "🎫",
      category: "Support",
      audience: "B2B",
      modules: [
        "Ticket Management",
        "Agent Queue",
        "Knowledge Base",
        "Automation Rules",
        "IT Asset Management"
      ],
      features: [
        "Multi-channel ticketing",
        "SLA tracking & escalation",
        "Knowledge base articles",
        "Automation workflows",
        "Asset tracking"
      ],
      integrations: ["Email", "Slack", "Webhook"]
    },
    {
      id: "lms",
      name: "LMS",
      title: "Learning Management System",
      description: "Create and deliver online courses with progress tracking, assessments, and certifications.",
      icon: "📚",
      category: "Education",
      audience: "B2B",
      modules: [
        "Course Management",
        "Student Enrollments",
        "Assessments & Quizzes",
        "Certificates & Badges",
        "Content Authoring"
      ],
      features: [
        "Video course player",
        "Progress tracking",
        "Quiz & assessment tools",
        "Certificate generation",
        "SCORM compliance"
      ],
      integrations: ["Video", "SCORM", "Payment"]
    },
    {
      id: "hrms",
      name: "HRMS",
      title: "Human Resource Management",
      description: "Complete HR solution for employee management, attendance, payroll, and recruitment.",
      icon: "👔",
      category: "HR",
      audience: "B2B",
      modules: [
        "Employee Management",
        "Attendance & Time Tracking",
        "Leave Management",
        "Payroll Processing",
        "Recruitment",
        "Performance Appraisals"
      ],
      features: [
        "Org chart visualization",
        "Approval workflows",
        "Biometric integration",
        "Payroll automation",
        "Recruitment pipeline"
      ],
      integrations: ["Payroll", "Biometric", "Email"]
    },
    {
      id: "project",
      name: "Project Management",
      title: "Project & Work Management",
      description: "Plan, track, and deliver projects with kanban boards, Gantt charts, and team collaboration.",
      icon: "📊",
      category: "Productivity",
      audience: "B2B",
      modules: [
        "Project Planning",
        "Task Management",
        "Team Collaboration",
        "Sprint Planning",
        "Reports & Analytics"
      ],
      features: [
        "Kanban boards",
        "Gantt charts",
        "Sprint planning",
        "Task dependencies",
        "Workload analytics"
      ],
      integrations: ["Git", "Slack", "Calendar"]
    },
    {
      id: "billing",
      name: "Billing",
      title: "Billing & Invoicing",
      description: "Automate invoicing, payments, and subscription management for your business.",
      icon: "💳",
      category: "Finance",
      audience: "B2B",
      modules: [
        "Invoice Management",
        "Payment Processing",
        "Subscription Billing",
        "Recurring Payments",
        "Financial Reports"
      ],
      features: [
        "Automated invoicing",
        "Multi-currency support",
        "Payment gateway integration",
        "Subscription management",
        "Financial analytics"
      ],
      integrations: ["Payment Gateway", "Accounting", "Banking"]
    },
    {
      id: "booking",
      name: "Booking",
      title: "Booking & Reservation",
      description: "Manage appointments, reservations, and scheduling with calendar integration.",
      icon: "📅",
      category: "Service",
      audience: "B2C",
      modules: [
        "Appointment Scheduling",
        "Resource Booking",
        "Calendar Management",
        "Customer Management",
        "Payment Processing"
      ],
      features: [
        "Real-time availability",
        "Multi-resource booking",
        "Calendar sync",
        "Automated reminders",
        "Online payments"
      ],
      integrations: ["Calendar", "Payment", "SMS"]
    },
    {
      id: "marketplace",
      name: "Marketplace",
      title: "Multi-vendor Marketplace",
      description: "Build a platform connecting buyers and sellers with vendor management and commission tracking.",
      icon: "🏪",
      category: "Platform",
      audience: "B2B",
      modules: [
        "Vendor Management",
        "Product Listings",
        "Order Processing",
        "Commission Tracking",
        "Reviews & Ratings"
      ],
      features: [
        "Multi-vendor support",
        "Commission management",
        "Vendor dashboards",
        "Escrow payments",
        "Dispute resolution"
      ],
      integrations: ["Payment", "Shipping", "Analytics"]
    },
    {
      id: "pos",
      name: "POS",
      title: "Point of Sale",
      description: "Complete POS solution for retail stores with inventory, payments, and reporting.",
      icon: "🖥️",
      category: "Retail",
      audience: "B2B",
      modules: [
        "Sales Terminal",
        "Inventory Management",
        "Payment Processing",
        "Receipt Printing",
        "Sales Reports"
      ],
      features: [
        "Offline mode support",
        "Barcode scanning",
        "Multiple payment methods",
        "Receipt printing",
        "Inventory sync"
      ],
      integrations: ["Payment Terminal", "Printer", "Inventory"]
    }
  ]
} as const

