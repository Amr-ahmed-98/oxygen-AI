# Validators & Auto-Fix System

نظام فحص الجودة والإصلاح التلقائي للـ Specs.

## Validators

### Layout & UX
- ✅ كل Screen لازم فيها title + breadcrumbs (إلا login)
- ✅ وجود empty/loading/error states لكل list/detail
- ✅ على mobile: ممنوع جداول عريضة → لازم cardList

### Security/RBAC
- ✅ كل action مربوط permission
- ✅ إذا permission missing: hide/disable + explain banner

### Forms
- ✅ required fields لها validation
- ✅ destructive actions لها confirm
- ✅ submit/loading/error states

### Performance
- ✅ virtualization في lists
- ✅ lazy media
- ✅ منع تحميل assets خارج policy (خصوصًا on-prem)

### RTL/i18n
- ✅ استخدام logical spacing
- ✅ اتجاه nav صحيح

## Auto-Fix Loop

```javascript
import SpecValidators from './validators/spec-validators.js';
import AutoFixSystem from './validators/auto-fix.js';

const validators = new SpecValidators();
const autoFix = new AutoFixSystem(llmClient);

// Validate
let errors = validators.validate(appSpec);

// Auto-fix loop (max 3 iterations)
if (errors.length > 0) {
  const result = await autoFix.fixSpec(appSpec, errors, context);
  appSpec = result.spec;
  errors = result.errors;
}
```

## Error Codes

- `MISSING_SCREEN_TITLE` - Screen بدون title
- `MISSING_BREADCRUMBS` - Screen بدون breadcrumbs
- `MISSING_STATES` - Screen بدون states (loading/empty/error)
- `MISSING_ROUTE_PERMISSION` - Route بدون permission
- `MISSING_ACTION_PERMISSION` - Action بدون permission
- `MISSING_REQUIRED_FIELD_VALIDATION` - Required field بدون validation
- `MISSING_DESTRUCTIVE_CONFIRM` - Destructive action بدون confirm
- `MISSING_VIRTUALIZATION` - List بدون virtualization
- `MOBILE_WIDE_TABLE` - جدول عريض في الموبايل
- `MOBILE_LONG_FORM_NO_STEPPER` - Form طويل بدون stepper في الموبايل

## Usage

```javascript
const validators = new SpecValidators();
const errors = validators.validate(appSpec);

errors.forEach(error => {
  console.log(`${error.severity}: ${error.code} - ${error.message}`);
  console.log(`Hint: ${error.hint}`);
});
```

