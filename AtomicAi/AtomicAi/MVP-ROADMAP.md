# MVP Roadmap - خطة MVP للتشغيل

## 🎯 الهدف

**Prompt → Helpdesk Next.js Project شغال (Web + DB + Auth) في 2-3 أسابيع**

---

## 📋 المهام المطلوبة (15 مهمة)

### الأسبوع 1: Composer + Entity Loading

#### اليوم 1-2: Entity Loading System

**المهمة 1.1:** تحميل Entities من Product Packs
```javascript
// composer/product-composer.js
async loadEntity(entityName, productType) {
  // تحميل من specs/entities/${entityName}.entity.json
  try {
    const entity = await import(`../specs/entities/${entityName}.entity.json`);
    return entity.default || entity;
  } catch {
    // Fallback: generate from product pack
    return this.generateEntityFromPack(entityName, productType);
  }
}
```

**المهمة 1.2:** إكمال getModuleInfo
```javascript
async getModuleInfo(moduleId, spec) {
  const pack = await this.loadProductPack(spec.productType);
  const module = pack.modules.find(m => m.moduleId === moduleId);
  if (!module) return null;
  
  const entities = [];
  for (const entityName of module.entities) {
    const entity = await this.loadEntity(entityName, spec.productType);
    entities.push(entity);
  }
  
  return { ...module, entities };
}
```

**المهمة 1.3:** توليد Relations
```javascript
generateRelations(entities) {
  // Extract relations from entity fields
  // Generate relation mappings
}
```

---

#### اليوم 3-4: Views Generation

**المهمة 2.1:** توليد List View
```javascript
generateListView(entity, platform) {
  const view = {
    layout: platform === 'mobile' ? 'cardList' : 'dataTablePro',
    columns: entity.fields.filter(f => f.ui?.list),
    filters: entity.views?.list?.filters || [],
    toolbar: ['search', 'filters', 'create']
  };
  return view;
}
```

**المهمة 2.2:** توليد Form View
```javascript
generateFormView(entity, mode, platform) {
  const fields = entity.fields.filter(f => f.ui?.form);
  return {
    layout: platform === 'mobile' && fields.length > 10 ? 'stepper' : 'single',
    fields: fields.map(f => ({
      name: f.name,
      type: f.type,
      required: f.required,
      validation: f.validation
    }))
  };
}
```

**المهمة 2.3:** توليد Detail View
```javascript
generateDetailView(entity, platform) {
  return {
    layout: platform === 'mobile' ? 'tabsTop' : 'detailWithRightPanel',
    tabs: entity.views?.detail?.tabs || ['overview'],
    rightPanel: platform !== 'mobile' ? ['actions', 'metadata'] : null
  };
}
```

---

#### اليوم 5: إكمال generateScreens

**المهمة 3.1:** تحديث generateScreens
```javascript
async generateScreens(modules, spec, catalogLoader) {
  const screens = {};
  
  for (const moduleId of modules) {
    const module = await this.getModuleInfo(moduleId, spec);
    if (!module || !module.entities) continue;
    
    module.entities.forEach(entity => {
      // List screen
      screens[`screen.${moduleId}.list`] = {
        type: 'list',
        entity: entity.entity,
        view: {
          web: this.generateListView(entity, 'web'),
          mobile: this.generateListView(entity, 'mobile')
        }
      };
      
      // Create/Edit/Detail screens...
    });
  }
  
  return screens;
}
```

---

### الأسبوع 2: Renderer + Backend

#### اليوم 6-7: Web Renderer (Next.js)

**المهمة 4.1:** Component Rendering
```javascript
// core/renderers/renderer-web.js
async renderComponent(componentId, props, theme) {
  // 1. Load manifest
  const manifest = await this.loadManifest(componentId);
  
  // 2. Load template (if exists)
  const template = await this.loadTemplate(componentId);
  
  // 3. Generate code
  if (template) {
    return this.applyTemplate(template, props, manifest, theme);
  } else {
    return this.generateFromManifest(manifest, props, theme);
  }
}
```

**المهمة 4.2:** Page Rendering
```javascript
async renderPage(screen, appSpec) {
  const components = [];
  
  // Render layout wrapper
  components.push(await this.renderComponent('shell.app', {}, appSpec.theme));
  
  // Render screen components
  if (screen.view.web.layout) {
    const layout = await this.renderComponent(
      screen.view.web.layout,
      { entity: screen.entity, ...screen.view.web },
      appSpec.theme
    );
    components.push(layout);
  }
  
  return this.generateNextJSPage(screen.id, components);
}
```

**المهمة 4.3:** Routing Generation
```javascript
generateRouting(routes, appSpec) {
  const routing = routes.map(route => ({
    path: route.path,
    page: `pages/${route.screen}.tsx`,
    permission: route.permission
  }));
  
  return this.generateNextJSRouting(routing, appSpec);
}
```

---

#### اليوم 8-9: Backend Scaffolding (Supabase)

**المهمة 5.1:** DB Schema Generator
```javascript
async generateDBSchema(entities, appSpec) {
  const schema = {
    version: '1.0.0',
    tables: entities.map(entity => ({
      name: entity.entity.toLowerCase(),
      columns: entity.fields.map(field => ({
        name: field.name,
        type: this.mapFieldType(field.type),
        nullable: !field.required,
        default: field.default
      })),
      indexes: entity.fields.filter(f => f.unique).map(f => ({
        columns: [f.name],
        unique: true
      }))
    }))
  };
  
  return this.generateSupabaseSQL(schema);
}
```

**المهمة 5.2:** API Routes Generator
```javascript
generateAPIRoutes(entities, appSpec) {
  const routes = [];
  
  entities.forEach(entity => {
    routes.push({
      path: `/api/${entity.entity.toLowerCase()}`,
      handlers: {
        list: this.generateListHandler(entity),
        create: this.generateCreateHandler(entity),
        update: this.generateUpdateHandler(entity),
        delete: this.generateDeleteHandler(entity)
      }
    });
  });
  
  return this.generateNextAPIRoutes(routes);
}
```

**المهمة 5.3:** Auth Setup
```javascript
generateAuthSetup(appSpec) {
  if (appSpec.security.auth.method === 'email_password') {
    return {
      provider: 'supabase',
      methods: ['email'],
      twoFactor: appSpec.security.auth.twoFactor || false
    };
  }
  
  return this.generateSupabaseAuthConfig(appSpec);
}
```

---

#### اليوم 10: Integration + Testing

**المهمة 6.1:** Integration Test
- Generate Helpdesk project
- Test: npm install && npm run dev
- Verify: DB schema, API routes, Auth, Pages

**المهمة 6.2:** Fix Issues
- Fix any rendering issues
- Fix any backend issues
- Fix any integration issues

---

### الأسبوع 3: Catalog + Polish

#### اليوم 11-12: Catalog الأساسي

**المهمة 7.1:** 30 Component Manifests
- Atoms: 10 manifests
- Molecules: 10 manifests
- Organisms: 10 manifests

**المهمة 7.2:** 10 Section Manifests
- Hero variations (3)
- Features (2)
- Pricing (1)
- Testimonials (1)
- FAQ (1)
- CTA (1)
- Footer (1)

**المهمة 7.3:** 5 Pattern Manifests
- data-table.pro ✅ (موجود)
- kanban-pipeline
- approval-workflow
- calendar-scheduler
- filter-builder ✅ (موجود)

---

#### اليوم 13-14: Helpdesk Entities كاملة

**المهمة 8.1:** Ticket Entity (موجود جزئيًا)
- ✅ Complete fields
- ✅ Complete views
- ✅ Complete permissions

**المهمة 8.2:** SlaPolicy Entity (موجود)
- ✅ Complete

**المهمة 8.3:** Article Entity
```json
{
  "entity": "Article",
  "fields": [...],
  "views": {...},
  "permissions": {...}
}
```

**المهمة 8.4:** AutomationRule Entity
```json
{
  "entity": "AutomationRule",
  "fields": [...],
  "views": {...},
  "permissions": {...}
}
```

---

#### اليوم 15: Final Testing + Documentation

**المهمة 9.1:** End-to-End Test
```
Prompt: "عايز helpdesk system"
→ Generate project
→ Test all features
→ Fix any issues
```

**المهمة 9.2:** Documentation
- Update README
- Create usage guide
- Create examples

---

## ✅ معايير النجاح (Definition of Done)

### Functional
- ✅ Prompt → Helpdesk project generated
- ✅ Project runs (npm install && npm run dev)
- ✅ DB schema created
- ✅ Auth works
- ✅ CRUD operations work
- ✅ Pages render correctly

### Quality
- ✅ No critical validator errors
- ✅ Code is clean and organized
- ✅ Follows Next.js best practices
- ✅ Responsive (web + mobile)

### Documentation
- ✅ README updated
- ✅ Usage guide created
- ✅ Examples provided

---

## 🚀 النتيجة المتوقعة

بعد 3 أسابيع:

**Input:**
```
"عايز helpdesk system مع tickets و SLA و knowledge base"
```

**Output:**
```
generated-projects/
└── helpdesk-2024-01-01/
    ├── apps/web/ (Next.js)
    ├── supabase/ (DB schema + migrations)
    ├── package.json
    ├── README.md
    └── spec.json
```

**Run:**
```bash
cd helpdesk-2024-01-01
npm install
npm run dev
# ✅ Working Helpdesk app!
```

---

**Status:** Ready to Start ✅

