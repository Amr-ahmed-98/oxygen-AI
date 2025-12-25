# Enterprise Systems Support

This directory contains blocks organized by enterprise system type. Each system type has its own directory with specialized components.

## Supported Systems (20 Types)

### 1. CRM - Customer Relationship Management
**Location:** `crm/`  
**Examples:** Salesforce, HubSpot  
**Blocks:**
- `LeadCard` - Lead management card
- `DealPipeline` - Sales pipeline visualization
- `ContactCard` - Contact information card
- `ActivityTimeline` - Activity feed for interactions
- `SalesDashboard` - Sales metrics dashboard

### 2. HRM/HCM - Human Resource Management
**Location:** `hrm/`  
**Examples:** Workday, BambooHR  
**Blocks:**
- `EmployeeCard` - Employee profile card
- `AttendanceCalendar` - Attendance tracking calendar
- `PayrollSummary` - Payroll overview and management
- `PerformanceReview` - Performance evaluation interface
- `HiringPipeline` - Recruitment workflow

### 3. CMS/DXP - Content Management System
**Location:** `cms/`  
**Examples:** WordPress, Adobe Experience Manager  
**Blocks:** ContentEditor, MediaLibrary, PageBuilder

### 4. E-commerce/OMS - E-commerce & Order Management
**Location:** `ecommerce/`  
**Examples:** Shopify, Magento, Manhattan OMS  
**Blocks:** ProductCard, OrderCard, ShoppingCart, CheckoutFlow

### 5. POS - Point of Sale
**Location:** `pos/`  
**Examples:** Square, Lightspeed  
**Blocks:** POSInterface, PaymentProcessor, ReceiptPrinter

### 6. SCM/WMS/TMS - Supply Chain Management
**Location:** `scm/`  
**Examples:** SAP SCM, Oracle WMS  
**Blocks:** InventoryView, WarehouseMap, ShipmentTracker

### 7. BI/Analytics - Business Intelligence
**Location:** `bi/`  
**Examples:** Power BI, Tableau, Snowflake  
**Blocks:** DashboardBuilder, ReportViewer, DataExplorer

### 8. BPM/Workflow/RPA - Business Process Management
**Location:** `bpm/`  
**Examples:** Camunda, UiPath  
**Blocks:** WorkflowDesigner, ProcessViewer, ApprovalFlow

### 9. ITSM/Helpdesk - IT Service Management
**Location:** `itsm/`  
**Examples:** ServiceNow, Jira Service Management  
**Blocks:** TicketCard, AssetTracker, SLAViewer

### 10. EAM - Enterprise Asset Management
**Location:** `eam/`  
**Examples:** IBM Maximo  
**Blocks:** AssetCard, MaintenanceSchedule, InspectionForm

### 11. PM/PPM - Project Management
**Location:** `pm/`  
**Examples:** Jira, Asana, MS Project  
**Blocks:** ProjectCard, GanttChart, ResourceAllocation

### 12. MDM/PIM - Master Data Management
**Location:** `mdm/`  
**Examples:** Akeneo (PIM)  
**Blocks:** ProductMasterCard, DataQualityView, CatalogManager

### 13. LIMS/QMS - Laboratory/Quality Management
**Location:** `lims/`  
**Examples:** MasterControl (QMS)  
**Blocks:** TestResultCard, QualityChecklist, ComplianceReport

### 14. HIS/EMR/EHR - Healthcare Systems
**Location:** `health/`  
**Blocks:** PatientCard, AppointmentScheduler, MedicalRecordView

### 15. LMS - Learning Management System
**Location:** `lms/`  
**Examples:** Moodle, Canvas  
**Blocks:** CourseCard, StudentProgress, AssignmentView

### 16. FinTech - Financial Technology
**Location:** `fintech/`  
**Examples:** Stripe Billing, Core Banking  
**Blocks:** InvoiceCard, PaymentProcessor, SubscriptionManager

### 17. CPQ - Configure-Price-Quote
**Location:** `cpq/`  
**Examples:** Salesforce CPQ  
**Blocks:** ConfigurationBuilder, PricingCalculator, QuoteViewer

### 18. IAM/SSO - Identity & Access Management
**Location:** `iam/`  
**Examples:** Okta, Auth0  
**Blocks:** UserCard, RoleManager, PermissionMatrix, SSOConfig

### 19. GIS - Geographic Information Systems
**Location:** `gis/`  
**Examples:** ArcGIS  
**Blocks:** MapViewer, LocationPicker, GeospatialAnalyzer

### 20. Marketplace - Multi-sided Platforms
**Location:** `marketplace/`  
**Examples:** Uber-like, Upwork-like  
**Blocks:** ServiceCard, BookingFlow, RatingSystem

## Usage

```typescript
import { LeadCard, DealPipeline } from "@atomic-ai/blocks/systems/crm";
import { EmployeeCard, AttendanceCalendar } from "@atomic-ai/blocks/systems/hrm";

// Use in your application
<LeadCard lead={leadData} onEdit={handleEdit} />
<DealPipeline deals={dealsData} stages={pipelineStages} />
```

## Architecture

Each system directory follows this structure:
```
{system-name}/
├── index.ts          # Exports all blocks for this system
├── {BlockName}.tsx   # Individual block components
└── README.md         # System-specific documentation (optional)
```

All blocks are built using our atomic design system:
- **Atoms** - Basic UI components (Button, Input, etc.)
- **Molecules** - Composed components (FormField, CardHeader, etc.)
- **Organisms** - Complex components (Tables, Forms, etc.)
- **Blocks** - System-specific compositions (this directory)

## Integration

Blocks integrate with:
- **RBAC** - Role-based access control
- **Data UI Kit** - Tables, filters, data visualization
- **Services** - Backend integration hooks
- **Theming** - Design tokens and personas

