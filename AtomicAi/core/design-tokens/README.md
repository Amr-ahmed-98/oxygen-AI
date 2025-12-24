# Design Tokens (Platform-Agnostic)

Design tokens that work across Web, Mobile, and Desktop platforms.

## Philosophy

Instead of platform-specific CSS/values, we use **intent-based tokens** that are mapped to platform-specific implementations by renderers.

## Token Categories

### Colors
Semantic color tokens (primary, success, warning, error, neutral) with scales.

### Spacing
Relative spacing scale (4px base) that maps to rem (web) or pixels (mobile/desktop).

### Typography
Font families, sizes, weights, and line heights that adapt per platform.

### Layout
Container widths and breakpoints for responsive design.

### Border Radius
Consistent border radius values.

### Elevation
Shadow/elevation system for depth (mapped differently per platform).

### Motion
Duration and easing curves for animations.

### Density
Compact, comfortable, and airy density modes.

## Platform Mapping

The `TokenMapper` class maps intent-based tokens to platform-specific values:

- **Web**: CSS values (rem, rgba, etc.)
- **Mobile**: React Native StyleSheet values or Flutter values
- **Desktop**: Similar to web with native menu support

## Usage

```javascript
import { platformTokens, TokenMapper } from './design-tokens/platform-tokens.js';

// Use tokens directly (intent-based)
const spacing = platformTokens.spacing.values.md; // 16

// Map for platform
const mapper = new TokenMapper('web');
const mapped = mapper.mapAll();

// Use mapped tokens
const webSpacing = mapped.spacing.md; // "1rem"
```

## Benefits

- **Consistency** - Same design language across platforms
- **Maintainability** - Single source of truth
- **Flexibility** - Platform-specific optimizations
- **RTL Support** - Tokens respect RTL/LTR

## Integration

Design tokens integrate with:
- **Themes** - Theme-specific token overrides
- **Renderers** - Platform-specific code generation
- **Components** - Consistent component styling

