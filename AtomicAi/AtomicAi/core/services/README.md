# Core Services

Core services for SaaS/ERP applications.

## Services

### 1. Auth Service (`auth.service.js`)
Authentication service interface.

**Methods:**
- `login(credentials)` - Authenticate user
- `register(data)` - Register new user
- `logout()` - Sign out
- `getCurrentUser()` - Get current user
- `isAuthenticated()` - Check auth status
- `refreshToken()` - Refresh access token
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, newPassword)` - Reset password

**Implementation:**
Platform-specific renderers implement these methods based on backend API.

### 2. Sync Service (`sync.service.js`)
Offline-first sync service for mobile/desktop.

**Features:**
- Operation queue
- Optimistic updates
- Conflict resolution
- Retry logic
- Background sync

**Strategies:**
- `optimistic` - Apply immediately, sync later
- `pessimistic` - Wait for server confirmation

**Conflict Resolution:**
- `server-wins` - Server data takes precedence
- `client-wins` - Client data takes precedence
- `merge` - Merge both (requires custom logic)

### 3. i18n Service (`i18n.service.js`)
Internationalization with RTL support.

**Features:**
- Locale management
- Translation loading
- RTL/LTR detection
- Number/date/currency formatting
- Logical properties for RTL

**Usage:**

```javascript
import { I18nService } from './core/services/i18n.service.js';

const i18n = new I18nService({
  defaultLocale: 'en',
  supportedLocales: ['en', 'ar'],
  rtl: {
    enabled: true,
    locales: ['ar']
  }
});

i18n.loadTranslations('en', {
  'welcome': 'Welcome',
  'hello': 'Hello {{name}}'
});

i18n.setLocale('ar');
i18n.t('welcome'); // Returns Arabic translation
i18n.isRTL(); // true
```

## Integration

Services integrate with:
- **Renderers** - Platform-specific implementations
- **State Management** - Service state
- **Components** - Service hooks/contexts
- **API Client** - Backend communication

## Benefits

- **Consistent API** - Same interface across platforms
- **Platform-specific** - Implementations adapt per platform
- **Testable** - Easy to mock for testing
- **Flexible** - Configurable per application

