# Platform Renderers

Platform-specific renderers for Web, Mobile, and Desktop.

## Base Renderer

`platform-renderer.base.js` - Base class for all platform renderers.

**Common interface:**
- `renderApp(appSpec)` - Render complete app
- `renderModule(moduleSpec, entitySpecs)` - Render module
- `renderEntityViews(entitySpec)` - Render entity views
- `renderComponent(componentSpec, props, theme)` - Render component
- `generateFileStructure(appSpec)` - Generate file structure

## Web Renderer

`renderer-web.js` - Renders to Next.js/React web applications.

**Features:**
- Next.js App Router support
- React components
- TypeScript support
- Tailwind CSS (optional)
- Server-side rendering
- Route generation

**Output:**
- Next.js project structure
- React components
- Route files
- Configuration files

## Mobile Renderer (TODO)

`renderer-mobile.js` - Renders to React Native/Flutter mobile apps.

**Planned Features:**
- React Native components
- Flutter widgets (alternative)
- Navigation stacks
- Native integrations
- Offline support

## Desktop Renderer (TODO)

`renderer-desktop.js` - Renders to Tauri/Electron desktop apps.

**Planned Features:**
- Tauri + React
- Electron + React (alternative)
- Native menus
- Window management
- System integrations

## Usage

```javascript
import { WebRenderer } from './renderers/renderer-web.js';

const renderer = new WebRenderer({
  framework: 'nextjs',
  useTypeScript: true,
  useAppRouter: true
});

const output = await renderer.renderApp(appSpec);

console.log(output.structure);
console.log(output.routes);
console.log(output.components);
```

## Benefits

- **Platform-optimized** - Each renderer optimizes for its platform
- **Consistent Spec** - Same app spec works for all platforms
- **Flexible** - Configurable per platform
- **Maintainable** - Shared base class

