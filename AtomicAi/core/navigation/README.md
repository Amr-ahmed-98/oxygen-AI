# Navigation Models

Platform-specific navigation models for Web, Mobile, and Desktop.

## Models

### 1. Web Navigation (`web-navigation.js`)
Navigation for web applications (Next.js, React Router).

**Features:**
- Route-based navigation
- Breadcrumbs generation
- Module routes
- Nested routes
- Permission-based routes

**Patterns:**
- Sidebar navigation
- Top bar navigation
- Both (sidebar + topbar)

### 2. Mobile Navigation (`mobile-navigation.js`)
Navigation for mobile applications (React Native, Flutter).

**Features:**
- Tab navigation (bottom tabs)
- Drawer navigation (side drawer)
- Stack navigation
- Deep links
- Modal presentations

**Patterns:**
- Tabs (max 5 tabs)
- Drawer (hamburger menu)
- Stack (push/pop navigation)

### 3. Desktop Navigation (`desktop-navigation.js`)
Navigation for desktop applications (Tauri, Electron).

**Features:**
- Sidebar navigation
- Menu bar (native menus)
- Keyboard shortcuts
- Window management
- Multi-window support

**Patterns:**
- Sidebar (resizable)
- Menu bar (File, Edit, View, etc.)
- Keyboard shortcuts (Cmd+K, Cmd+1-9)

## Usage

### Web

```javascript
import { WebNavigation } from './navigation/web-navigation.js';

const nav = new WebNavigation({
  type: 'sidebar',
  auth: true
});

const routes = nav.generateRoutes(modules, entities);
const breadcrumbs = nav.generateBreadcrumbs('/invoices/123', route, modules);
```

### Mobile

```javascript
import { MobileNavigation } from './navigation/mobile-navigation.js';

const nav = new MobileNavigation({
  type: 'tabs'
});

const structure = nav.generateNavigation(modules, entities);
```

### Desktop

```javascript
import { DesktopNavigation } from './navigation/desktop-navigation.js';

const nav = new DesktopNavigation({
  sidebar: true,
  menuBar: true,
  shortcuts: true
});

const structure = nav.generateNavigation(modules, entities);
```

## Platform Adaptations

The same app spec generates different navigation structures:

### Web
- URL-based routing
- Browser history
- Breadcrumbs
- Link previews

### Mobile
- Native navigation stacks
- Gesture-based navigation
- Deep linking
- App state preservation

### Desktop
- Window-based routing
- Native menus
- Keyboard shortcuts
- Multi-window support

## Benefits

- **Platform-optimized** - Each platform gets optimal navigation
- **Consistent Logic** - Same source data
- **Flexible** - Configurable per platform
- **Accessible** - Full keyboard/gesture support

