# Product Packs

Product type packs define the structure and modules for different SaaS/ERP product types.

## Available Packs

### CRM
- Leads, Contacts, Accounts, Deals, Activities, Reports
- Patterns: Kanban pipeline, Activity timeline
- Default: B2B, Multi-tenant SaaS

### HRMS / HCM
- Employees, Attendance, Leave, Payroll, Recruiting
- Patterns: Approval workflows, Calendar scheduler, Org chart
- Sensitive data: Field masking, Audit required
- Default: B2B, On-premise or SaaS

### POS
- Products, Orders, Shifts, Customers
- Patterns: POS checkout, Catalog grid
- Offline-first, Sync required
- Default: B2C

### Helpdesk / ITSM
- Tickets, Agents, Knowledge Base, Automation
- Patterns: Ticketing queue, SLA timers
- Default: B2B

### Billing & Subscription
- Plans, Subscriptions, Invoices, Usage Metering
- Patterns: Subscription management, Usage metering
- Business models: Subscription, Usage-based, Freemium
- Default: B2B

## Pack Structure

Each pack contains:
- `pack.manifest.json` - Pack definition
- `modules/` - Module definitions (optional)
- `entities/` - Entity definitions (optional)
- `workflows/` - Workflow definitions (optional)

## Usage

```javascript
import pack from './catalog/product-packs/crm/pack.manifest.json';

// Use pack modules
const modules = pack.modules;

// Apply pack to product spec
const composer = new ProductComposer();
const app = await composer.compose(productSpec);
```

## Extending

To add a new product pack:

1. Create directory: `catalog/product-packs/<pack-id>/`
2. Create `pack.manifest.json`
3. Define modules and entities
4. Add to product type mapping

