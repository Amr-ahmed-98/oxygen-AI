# UI Kit - 30 Components (Minimum Viable)

## 🎯 الهدف

**مكتبة UI فعلية بأكواد Components** تغطي 80% من ERP/SaaS UI.

---

## ✅ الإجابة على السؤال: هل هذه الطريقة ستكون النظام غني وتصاميمه كثيرة؟

### ✅ نعم—بشرطين:

1. **Tokens-Driven Variants** (بدون تكرار ملفات)
2. **Sections/Patterns/Presets** (عدد كافي)

**النتيجة:**
- 30 Components + 8 Themes × 60 Sections × 3 Densities = **14,400 شكل**
- 30 Components + 12 Patterns × 20 Presets = **مئات المشاريع**

---

## 📋 القائمة الكاملة (30 Components)

### A) Foundations (6)

#### 1. AppShell.tsx
**المنصات:** Web, Desktop  
**الوظيفة:** Application layout wrapper (sidebar/header/content)  
**Props:** navigation, density, rtl, multiTenant  
**Notes:** Mobile يستخدم AppShellMobile

#### 2. AppShellMobile.tsx
**المنصات:** Mobile  
**الوظيفة:** Mobile app shell (tabs+stack navigation)  
**Props:** tabs, drawer  
**Notes:** Web-only alternative لـ AppShell

#### 3. Container.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Container wrapper (max-width, padding)  
**Props:** maxWidth, padding, rtl  
**Notes:** Universal

#### 4. Grid.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** CSS Grid wrapper  
**Props:** columns, gap, responsive  
**Notes:** Universal

#### 5. Stack.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Flexbox stack (vertical/horizontal)  
**Props:** direction, gap, align  
**Notes:** Universal

#### 6. Typography.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Typography system (h1-h6, p, span)  
**Props:** variant, size, weight, rtl  
**Notes:** Universal + RTL support

---

### B) Inputs & Forms (9)

#### 7. Button.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Button component  
**Props:** variant, size, icon, loading, disabled  
**Notes:** Universal

#### 8. TextField.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Text input field  
**Props:** label, placeholder, error, required, mask  
**Notes:** Universal + masking support

#### 9. TextArea.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Multi-line text input  
**Props:** label, rows, error, required  
**Notes:** Universal

#### 10. Select.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Dropdown select  
**Props:** options, multiple, searchable  
**Notes:** Mobile uses native picker

#### 11. DatePicker.tsx
**المنصات:** Web, Desktop  
**الوظيفة:** Date picker  
**Props:** mode, min, max, format  
**Notes:** Web/Desktop only

#### 12. DatePickerMobile.tsx
**المنصات:** Mobile  
**الوظيفة:** Native date picker  
**Props:** mode, min, max  
**Notes:** Mobile uses native picker

#### 13. Checkbox.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Checkbox input  
**Props:** label, checked, disabled  
**Notes:** Universal

#### 14. Switch.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Toggle switch  
**Props:** label, checked, disabled  
**Notes:** Universal

#### 15. Uploader.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** File upload component  
**Props:** accept, multiple, maxSize  
**Notes:** Universal

---

### C) Data & Navigation (9)

#### 16. DataTablePro.tsx
**المنصات:** Web, Desktop  
**الوظيفة:** Advanced data table  
**Props:** columns, data, pagination, sortable, filterable, selectable  
**Notes:** **Web/Desktop only** - Mobile fallback to CardList

#### 17. CardList.tsx
**المنصات:** Mobile  
**الوظيفة:** Card list for mobile  
**Props:** items, renderCard, onRefresh  
**Notes:** **Mobile only** - Web/Desktop fallback to DataTablePro

#### 18. FiltersBar.tsx
**المنصات:** Web, Desktop  
**الوظيفة:** Filter bar (inline filters)  
**Props:** filters, onChange  
**Notes:** Web/Desktop only

#### 19. FilterSheet.tsx
**المنصات:** Mobile  
**الوظيفة:** Bottom sheet filters  
**Props:** filters, onChange, onApply  
**Notes:** **Mobile only**

#### 20. Pagination.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Pagination controls  
**Props:** current, total, pageSize, onPageChange  
**Notes:** Universal

#### 21. Tabs.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Tab navigation  
**Props:** tabs, active, onChange  
**Notes:** Universal

#### 22. Breadcrumbs.tsx
**المنصات:** Web, Desktop  
**الوظيفة:** Breadcrumb navigation  
**Props:** items, separator  
**Notes:** Web/Desktop only (Mobile hidden)

#### 23. Sidebar.tsx
**المنصات:** Web, Desktop  
**الوظيفة:** Sidebar navigation  
**Props:** items, collapsed, rtl  
**Notes:** Web/Desktop only

#### 24. Topbar.tsx
**المنصات:** Web, Desktop  
**الوظيفة:** Top navigation bar  
**Props:** items, logo, userMenu  
**Notes:** Web/Desktop only

---

### D) Overlays & Feedback (6)

#### 25. Modal.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Modal dialog  
**Props:** open, onClose, title, children  
**Notes:** Universal

#### 26. Drawer.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Side drawer  
**Props:** open, onClose, side, children  
**Notes:** Universal + RTL support

#### 27. Toast.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Toast notifications  
**Props:** message, type, duration  
**Notes:** Universal

#### 28. LoadingSkeleton.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Loading skeleton  
**Props:** variant, count  
**Notes:** Universal

#### 29. EmptyState.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Empty state component  
**Props:** title, description, action  
**Notes:** Universal

#### 30. ErrorState.tsx
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Error state component  
**Props:** title, message, retry  
**Notes:** Universal

---

## 📊 Platform Distribution

| Platform | Components | Notes |
|----------|------------|-------|
| **Universal** | 22 | تعمل على جميع المنصات |
| **Web/Desktop** | 6 | DataTablePro, FiltersBar, Breadcrumbs, Sidebar, Topbar, AppShell |
| **Mobile** | 3 | CardList, FilterSheet, DatePickerMobile, AppShellMobile |
| **Web Only** | 0 | - |
| **Desktop Only** | 0 | - |

---

## 🎯 FormBuilder.tsx (Special)

**الملف:** `FormBuilder.tsx` (يستخدم Components 7-14)  
**المنصات:** Web, Mobile, Desktop  
**الوظيفة:** Schema-driven form builder  
**Props:** schema, initialValues, onSubmit, validation  
**Notes:** يستخدم TextField, TextArea, Select, etc. بناءً على Schema

---

## ✅ هل نحتاج مكتبة فعلية؟

### ✅ نعم—ضروري

**الأسباب:**
1. Renderer يحتاج كود حقيقي ليدمج
2. لا يمكن توليد UI من الصفر كل مرة (جودة + ثبات)
3. ThemeForest يحتاج Components فعلية

### ❌ لا نحتاج Dataset ضخم

**الأسباب:**
1. Component واحد + Tokens = آلاف الأشكال
2. Variants تطلع من النظام (Tokens/Props) مش من Dataset

---

## 🎯 كيف تصنع تنوع ThemeForest؟

### المستويات الـ5:

1. **Typography System** - خطوط/أحجام/إيقاع مختلف
2. **Spacing + Grid** - compact vs airy + 12-col vs bento
3. **Shape Language** - sharp vs rounded vs glass
4. **Composition** - layouts مختلفة للأقسام
5. **Motion** - micro-interactions (اختياري)

**النتيجة:** كل Theme Pack يغير هذه المستويات = ثيمات مختلفة بوضوح

---

## ✅ الخلاصة

### هل نحتاج مكتبة Components فعلية؟

**✅ نعم—ضروري**

### هل ستكون التصاميم كثيرة ومختلفة؟

**✅ نعم—إذا:**
- 30 Components ✅
- 8 Theme Packs ✅
- 60 Sections ✅
- 12 Patterns ✅
- 20 Presets ✅

**النتيجة:** 14,400+ شكل من 30 Component! 🚀

---

**Status:** Ready for Implementation ✅

