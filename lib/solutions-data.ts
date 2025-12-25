export const solutionsData = {
  solutions: [
    {
      id: "crm",
      name: "CRM",
      title: "Customer Relationship Management",
      description: "Manage leads, contacts, deals, and customer interactions with powerful automation and analytics. Track sales pipelines, activities, and customer communications.",
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
      id: "hrms",
      name: "HRMS",
      title: "Human Resource Management System",
      description: "Complete HR solution for employee management, attendance, payroll, recruitment, and performance appraisals. Manage your workforce efficiently.",
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
      id: "cms",
      name: "CMS/DXP",
      title: "Content Management & Digital Experience Platform",
      description: "Manage content and websites with multi-channel digital experiences. Build large-scale websites with advanced content management capabilities.",
      icon: "📝",
      category: "Content",
      audience: "B2B",
      modules: [
        "Content Management",
        "Page Builder",
        "Media Library",
        "Multi-channel Publishing",
        "SEO Management",
        "Analytics & Insights"
      ],
      features: [
        "Visual page builder",
        "Multi-site management",
        "Content versioning",
        "Workflow approvals",
        "Personalization engine"
      ],
      integrations: ["CDN", "Analytics", "Marketing Automation"]
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      title: "E-commerce & Order Management System",
      description: "Build complete online stores with product catalogs, shopping cart, checkout, order management, shipping, and inventory control.",
      icon: "🛒",
      category: "Retail",
      audience: "B2C",
      modules: [
        "Product Catalog",
        "Shopping Cart",
        "Checkout System",
        "Order Management (OMS)",
        "Payment Processing",
        "Shipping & Tracking",
        "Inventory Management"
      ],
      features: [
        "Product variants & inventory",
        "Multi-payment gateways",
        "Shipping integrations",
        "Order fulfillment automation",
        "Customer reviews & ratings"
      ],
      integrations: ["Payment Gateway", "Shipping", "Inventory", "ERP"]
    },
    {
      id: "pos",
      name: "POS",
      title: "Point of Sale System",
      description: "Complete POS solution for retail stores and restaurants with multi-location support, inventory sync, and comprehensive reporting.",
      icon: "🖥️",
      category: "Retail",
      audience: "B2B",
      modules: [
        "Sales Terminal",
        "Inventory Management",
        "Payment Processing",
        "Receipt Printing",
        "Multi-location Sync",
        "Sales Reports"
      ],
      features: [
        "Offline mode support",
        "Barcode scanning",
        "Multiple payment methods",
        "Receipt printing",
        "Inventory sync across branches"
      ],
      integrations: ["Payment Terminal", "Printer", "Inventory", "Accounting"]
    },
    {
      id: "scm",
      name: "SCM/WMS/TMS",
      title: "Supply Chain Management",
      description: "Complete supply chain solution including SCM planning, warehouse management (WMS), and transportation management (TMS) for end-to-end logistics.",
      icon: "📦",
      category: "Logistics",
      audience: "B2B",
      modules: [
        "Supply Chain Planning",
        "Warehouse Management (WMS)",
        "Transportation Management (TMS)",
        "Inventory Optimization",
        "Route Planning",
        "Fleet Management"
      ],
      features: [
        "Demand forecasting",
        "Warehouse automation",
        "Route optimization",
        "Real-time tracking",
        "Multi-warehouse support"
      ],
      integrations: ["ERP", "Shipping", "GPS", "IoT Sensors"]
    },
    {
      id: "bi",
      name: "BI/Analytics",
      title: "Business Intelligence & Analytics",
      description: "Powerful BI platform with data warehouses, interactive dashboards, advanced analytics, and reporting for data-driven decision making.",
      icon: "📊",
      category: "Analytics",
      audience: "B2B",
      modules: [
        "Data Warehouse",
        "Interactive Dashboards",
        "Advanced Analytics",
        "Report Builder",
        "Data Visualization",
        "ETL Pipelines"
      ],
      features: [
        "Real-time data processing",
        "Custom dashboards",
        "Predictive analytics",
        "Data modeling",
        "Self-service BI"
      ],
      integrations: ["Databases", "Cloud Storage", "APIs", "Data Sources"]
    },
    {
      id: "bpm",
      name: "BPM/Workflow",
      title: "Business Process Management & Automation",
      description: "Automate business processes, approvals, workflows, and robotic process automation (RPA) to streamline operations and reduce manual work.",
      icon: "⚙️",
      category: "Automation",
      audience: "B2B",
      modules: [
        "Process Designer",
        "Workflow Engine",
        "Approval Chains",
        "RPA Bots",
        "Task Automation",
        "Process Analytics"
      ],
      features: [
        "Visual process builder",
        "Rule-based automation",
        "RPA bot creation",
        "Approval workflows",
        "Process monitoring"
      ],
      integrations: ["ERP", "CRM", "Email", "APIs", "Legacy Systems"]
    },
    {
      id: "itsm",
      name: "ITSM",
      title: "IT Service Management & Helpdesk",
      description: "Streamline IT support with ticketing, knowledge base, asset management, change management, and SLA tracking for enterprise IT operations.",
      icon: "🎫",
      category: "Support",
      audience: "B2B",
      modules: [
        "Ticket Management",
        "Agent Queue",
        "Knowledge Base",
        "IT Asset Management",
        "Change Management",
        "SLA Tracking"
      ],
      features: [
        "Multi-channel ticketing",
        "SLA tracking & escalation",
        "Knowledge base articles",
        "Automation workflows",
        "Asset tracking & CMDB"
      ],
      integrations: ["Email", "Slack", "Monitoring Tools", "Active Directory"]
    },
    {
      id: "eam",
      name: "EAM",
      title: "Enterprise Asset Management",
      description: "Manage physical assets, equipment, facilities, and maintenance schedules for manufacturing plants, facilities, and infrastructure.",
      icon: "🏭",
      category: "Asset Management",
      audience: "B2B",
      modules: [
        "Asset Registry",
        "Maintenance Scheduling",
        "Work Orders",
        "Asset Lifecycle",
        "Preventive Maintenance",
        "Spare Parts Management"
      ],
      features: [
        "Asset tracking & history",
        "Maintenance scheduling",
        "Work order management",
        "Predictive maintenance",
        "Compliance tracking"
      ],
      integrations: ["IoT Sensors", "CMMS", "ERP", "SCADA"]
    },
    {
      id: "pm",
      name: "PM/PPM",
      title: "Project & Portfolio Management",
      description: "Plan, track, and deliver projects with kanban boards, Gantt charts, resource management, and portfolio optimization for project success.",
      icon: "📋",
      category: "Productivity",
      audience: "B2B",
      modules: [
        "Project Planning",
        "Task Management",
        "Resource Management",
        "Portfolio Management",
        "Sprint Planning",
        "Reports & Analytics"
      ],
      features: [
        "Kanban boards",
        "Gantt charts",
        "Resource allocation",
        "Portfolio optimization",
        "Workload analytics"
      ],
      integrations: ["Git", "Slack", "Calendar", "Time Tracking"]
    },
    {
      id: "mdm",
      name: "MDM/PIM",
      title: "Master Data & Product Information Management",
      description: "Centralize and manage master data for products, customers, and suppliers. Ensure data consistency across all systems and channels.",
      icon: "🗄️",
      category: "Data Management",
      audience: "B2B",
      modules: [
        "Product Data Management",
        "Customer Master Data",
        "Supplier Data",
        "Data Quality Management",
        "Data Governance",
        "Multi-channel Publishing"
      ],
      features: [
        "Data harmonization",
        "Data quality rules",
        "Workflow approvals",
        "Multi-channel syndication",
        "Data lineage tracking"
      ],
      integrations: ["ERP", "E-commerce", "CRM", "PIM Systems"]
    },
    {
      id: "lims",
      name: "LIMS/QMS",
      title: "Laboratory & Quality Management",
      description: "Manage laboratories, test results, quality control, compliance, and quality management systems for regulated industries.",
      icon: "🔬",
      category: "Quality",
      audience: "B2B",
      modules: [
        "Laboratory Management (LIMS)",
        "Test Management",
        "Quality Control",
        "Compliance Tracking",
        "Document Management",
        "Audit Management"
      ],
      features: [
        "Sample tracking",
        "Test result management",
        "Quality workflows",
        "Regulatory compliance",
        "Document control"
      ],
      integrations: ["Lab Equipment", "ERP", "Regulatory Systems", "Document Management"]
    },
    {
      id: "his",
      name: "HIS/EMR/EHR",
      title: "Healthcare Information Systems",
      description: "Complete healthcare management system for hospitals with electronic medical records (EMR), electronic health records (EHR), and appointment scheduling.",
      icon: "🏥",
      category: "Healthcare",
      audience: "B2B",
      modules: [
        "Patient Management",
        "Electronic Medical Records (EMR)",
        "Electronic Health Records (EHR)",
        "Appointment Scheduling",
        "Billing & Insurance",
        "Clinical Documentation"
      ],
      features: [
        "Patient records management",
        "Clinical documentation",
        "Appointment scheduling",
        "Billing & claims",
        "HIPAA compliance"
      ],
      integrations: ["HL7", "Medical Devices", "Insurance", "Pharmacy Systems"]
    },
    {
      id: "lms",
      name: "LMS",
      title: "Learning Management System",
      description: "Create and deliver online courses with progress tracking, assessments, certifications, and content authoring for educational institutions and corporate training.",
      icon: "📚",
      category: "Education",
      audience: "B2B",
      modules: [
        "Course Management",
        "Student Enrollments",
        "Assessments & Quizzes",
        "Certificates & Badges",
        "Content Authoring",
        "Progress Tracking"
      ],
      features: [
        "Video course player",
        "Progress tracking",
        "Quiz & assessment tools",
        "Certificate generation",
        "SCORM compliance"
      ],
      integrations: ["Video", "SCORM", "Payment", "LTI"]
    },
    {
      id: "fintech",
      name: "FinTech",
      title: "Financial Technology Core Systems",
      description: "Complete financial system for accounting, treasury, invoicing, subscriptions, payments, and digital banking operations.",
      icon: "💰",
      category: "Finance",
      audience: "B2B",
      modules: [
        "Accounting & Ledger",
        "Treasury Management",
        "Invoicing & Billing",
        "Subscription Management",
        "Payment Processing",
        "Digital Banking"
      ],
      features: [
        "Double-entry accounting",
        "Multi-currency support",
        "Recurring billing",
        "Payment gateway integration",
        "Financial reporting"
      ],
      integrations: ["Banks", "Payment Gateways", "Tax Systems", "Regulatory"]
    },
    {
      id: "cpq",
      name: "CPQ",
      title: "Configure-Price-Quote",
      description: "Generate complex quotes and proposals with product configuration, pricing rules, and approval workflows for B2B sales teams.",
      icon: "📋",
      category: "Sales",
      audience: "B2B",
      modules: [
        "Product Configuration",
        "Pricing Engine",
        "Quote Generation",
        "Approval Workflows",
        "Contract Management",
        "Sales Analytics"
      ],
      features: [
        "Visual configurator",
        "Dynamic pricing rules",
        "Quote templates",
        "Approval chains",
        "Integration with CRM"
      ],
      integrations: ["CRM", "ERP", "Pricing Systems", "Document Management"]
    },
    {
      id: "iam",
      name: "IAM/SSO",
      title: "Identity & Access Management",
      description: "Manage user identities, access control, single sign-on (SSO), multi-factor authentication, and security policies for enterprise security.",
      icon: "🔐",
      category: "Security",
      audience: "B2B",
      modules: [
        "User Management",
        "Single Sign-On (SSO)",
        "Multi-Factor Authentication",
        "Role-Based Access Control",
        "Security Policies",
        "Audit Logging"
      ],
      features: [
        "SSO integration",
        "MFA support",
        "RBAC & ABAC",
        "Password policies",
        "Security compliance"
      ],
      integrations: ["Active Directory", "LDAP", "OAuth", "SAML", "Applications"]
    },
    {
      id: "gis",
      name: "GIS/Mapping",
      title: "Geographic Information & Mapping Platforms",
      description: "Build mapping applications, manage geospatial data, infrastructure management, and risk assessment with advanced GIS capabilities.",
      icon: "🗺️",
      category: "Geospatial",
      audience: "B2B",
      modules: [
        "Map Visualization",
        "Geospatial Data Management",
        "Infrastructure Management",
        "Risk Assessment",
        "Route Planning",
        "Location Analytics"
      ],
      features: [
        "Interactive maps",
        "Geospatial analysis",
        "Layer management",
        "GPS integration",
        "3D visualization"
      ],
      integrations: ["GPS", "Satellite Imagery", "IoT Sensors", "Weather APIs"]
    },
    {
      id: "marketplace",
      name: "Marketplace",
      title: "Multi-vendor Marketplace Platform",
      description: "Build platforms connecting buyers and sellers with vendor management, commission tracking, escrow payments, and dispute resolution.",
      icon: "🏪",
      category: "Platform",
      audience: "B2B",
      modules: [
        "Vendor Management",
        "Product Listings",
        "Order Processing",
        "Commission Tracking",
        "Reviews & Ratings",
        "Dispute Resolution"
      ],
      features: [
        "Multi-vendor support",
        "Commission management",
        "Vendor dashboards",
        "Escrow payments",
        "Dispute resolution"
      ],
      integrations: ["Payment", "Shipping", "Analytics", "Communication"]
    }
  ]
} as const
