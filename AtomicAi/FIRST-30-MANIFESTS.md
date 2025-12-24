# أول 30 Manifest IDs - Minimum Viable Library

## 🎯 الهدف

هذه القائمة هي **"الحد الأدنى"** الذي يغطي SaaS/ERP/Helpdesk.

---

## 📋 القائمة الكاملة (30 IDs)

### App Shell (7) ✅

1. ✅ `shell.app` - Application Shell Layout
2. ✅ `shell.sidebar.grouped` - Grouped Sidebar
3. ✅ `shell.header.breadcrumbs` - Header with Breadcrumbs
4. ✅ `shell.userMenu` - User Menu
5. ✅ `shell.tenantSwitcher` - Tenant/Workspace Switcher
6. ✅ `shell.commandPalette` - Command Palette (Ctrl+K)
7. ✅ `shell.notificationCenter` - Notification Center

**الحالة:** ✅ موجود في `core/app-shell/`

---

### Data UI (10) ⚠️

8. ✅ `data.table.pro` - Data Table Pro (web/desktop)
9. ⚠️ `data.list.cards` - Card List (mobile)
10. ⚠️ `data.filters.builder` - Filter Builder
11. ⚠️ `data.filters.sheet` - Filter Bottom Sheet (mobile)
12. ⚠️ `data.toolbar.searchSortColumns` - Data Toolbar
13. ⚠️ `data.pagination.server` - Server-side Pagination
14. ⚠️ `data.bulkActions` - Bulk Actions
15. ⚠️ `data.detail.tabs` - Detail View with Tabs
16. ⚠️ `data.timeline.activity` - Activity Timeline
17. ⚠️ `data.importExport` - Import/Export

**الحالة:** ✅ 1 موجود (`data.table.pro`)، ⚠️ 9 يحتاجون إضافة

---

### Forms (7) ⚠️

18. ✅ `form.builder.schemaDriven` - Schema-driven Form Builder
19. ⚠️ `form.stepper` - Stepper Form
20. ⚠️ `form.validation.summary` - Validation Summary
21. ⚠️ `form.masking` - Input Masking
22. ⚠️ `form.attachments` - File Attachments
23. ⚠️ `form.confirmDestructive` - Destructive Action Confirmation
24. ⚠️ `form.drawerEdit` - Edit in Drawer

**الحالة:** ✅ 1 موجود (`form.builder.schemaDriven`)، ⚠️ 6 يحتاجون إضافة

---

### States & Security (6) ⚠️

25. ⚠️ `state.loading.skeleton` - Loading Skeleton
26. ⚠️ `state.empty` - Empty State
27. ⚠️ `state.error` - Error State
28. ⚠️ `state.noPermission` - No Permission State
29. ⚠️ `security.rbac.guard` - RBAC Guard
30. ⚠️ `audit.log.viewer` - Audit Log Viewer

**الحالة:** ⚠️ كلهم يحتاجون إضافة

---

## 📊 Summary

| Category | موجود | يحتاج إضافة | المجموع |
|----------|--------|-------------|---------|
| App Shell | 7 | 0 | 7 ✅ |
| Data UI | 1 | 9 | 10 ⚠️ |
| Forms | 1 | 6 | 7 ⚠️ |
| States & Security | 0 | 6 | 6 ⚠️ |
| **المجموع** | **9** | **21** | **6** | **30** |

**الجاهزية:** 30% (9/30)

---

## 🎯 10 Manifests إضافية "ترفع الجودة" (اختياري بعد MVP)

31. `pattern.ticketingQueue` - Ticket Queue Pattern
32. `pattern.approvalWorkflow` - Approval Workflow Pattern
33. `pattern.kanbanPipeline` - Kanban Pipeline Pattern
34. `pattern.calendarScheduler` - Calendar Scheduler Pattern
35. `pattern.posCheckout` - POS Checkout Pattern
36. `pattern.subscriptionBilling` - Subscription Billing Pattern
37. `pattern.integrationCenter` - Integration Center Pattern
38. `pattern.dashboardReports` - Dashboard Reports Pattern
39. `state.toastNotifications` - Toast Notifications
40. `ui.themeSwitcher` - Theme Switcher

---

## 📁 Structure المقترح

```
catalog/
├── components/
│   ├── shell/
│   │   ├── shell.app.manifest.json ✅
│   │   ├── shell.sidebar.grouped.manifest.json ✅
│   │   └── ...
│   ├── data/
│   │   ├── data.table.pro.manifest.json ✅
│   │   ├── data.list.cards.manifest.json ⚠️
│   │   └── ...
│   ├── forms/
│   │   ├── form.builder.schemaDriven.manifest.json ✅
│   │   └── ...
│   └── states/
│       └── ...
├── patterns/
│   ├── pattern.ticketingQueue.manifest.json ⚠️
│   └── ...
└── _templates/
    └── manifest.template.json ✅
```

---

## ✅ Next Steps

1. ✅ استخدم `catalog/_templates/manifest.template.json` كقالب
2. ✅ انسخ 3 Manifests المكتملة كنماذج
3. ⚠️ أنشئ 21 Manifest المتبقية بنفس الطريقة
4. ✅ تأكد من tags + platformSupport + props/slots

---

**Status:** Ready for Implementation ✅
