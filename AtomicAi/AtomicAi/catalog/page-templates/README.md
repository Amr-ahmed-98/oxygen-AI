# Page Templates - README

## 🎯 الهدف

**10 Page Templates جاهزة** تربط الـ60 Sections + App Patterns لتكوين مشاريع كاملة.

---

## 📋 القائمة الكاملة

### Marketing Pages (6)

1. **page.landing.saas** - SaaS عام (CRM/Helpdesk/ERP-lite)
2. **page.landing.enterprise** - ERP/CRM Enterprise
3. **page.landing.govOnprem** - Government / On-prem
4. **page.pricing.full** - صفحة تسعير كاملة
5. **page.docs.product** - Docs / DXP / API-first
6. **page.marketplace.landing** - Marketplace/Ecommerce/Booking

---

### App Pages (4)

7. **page.app.auth** - Login/Register/Forgot
8. **page.app.dashboard** - Dashboard داخل التطبيق
9. **page.app.entityCrud** - أي شاشة CRUD
10. **page.app.workflow** - Approvals/SLA/Automation

---

## 🎨 Structure

كل Page Template يحتوي على:

- **pageId** - المعرف الفريد
- **label** - الاسم الواضح
- **description** - الوصف
- **type** - marketing أو app
- **sections** - قائمة Sections مع order وprops
- **pattern** - App pattern (لصفحات App)
- **bestThemes** - أفضل Theme Packs

---

## ✅ كيف يستخدم المولد هذه Templates؟

### Step 1: Classify

من prompt يستخرج:
- productType (Helpdesk/CRM…)
- delivery (SaaS/onPrem…)
- business model (subscription/usage/license…)
- persona/theme (minimal/glass/enterprise…)

### Step 2: Select Templates

إذا productType = ERP/Helpdesk/CRM → يختار:
- `page.landing.enterprise` أو `page.landing.saas`
- `page.pricing.full`
- `page.docs.product` (لو API-first)

ثم يضيف app pages:
- `page.app.auth`
- `page.app.dashboard`
- `page.app.entityCrud`
- `page.app.workflow`

### Step 3: Compose

يملأ slots بالنصوص + يختار layouts/decorators + يربط themePack

---

## 🎯 ما الذي يجعل الناتج "ThemeForest قوي"؟

نفس templates لكن:
- themePack مختلف
- layouts L1/L2/L3
- decorators مختلفة (mediaFrame/divider/background)
- صور/illustrations/موكابات مختلفة

فالناتج لا يكون "نفس الموقع بألوان مختلفة"، بل تكوين مختلف.

---

## 📊 Files

```
catalog/page-templates/
├── landing-saas.json ✅
├── landing-enterprise.json ✅
├── landing-gov-onprem.json ✅
├── pricing-full.json ✅
├── docs-product.json ✅
├── marketplace-landing.json ✅
├── app-auth.json ✅
├── app-dashboard.json ✅
├── app-entity-crud.json ✅
├── app-workflow.json ✅
└── README.md ✅
```

---

**Status:** ✅ All Templates Ready

