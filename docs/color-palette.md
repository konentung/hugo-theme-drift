# Color Palette

hugo-theme-drift uses a 5-color palette with full dark/light mode support.

## Base Colors

| Color | HEX | Name | Role |
|-------|---------|--------------|------|
| ██ | `#1C2321` | Carbon Black | Dark background / primary text (light mode) |
| ██ | `#7D98A1` | Cool Steel | Primary accent / glow / buttons |
| ██ | `#5E6572` | Blue Slate | Secondary accent / borders / projects |
| ██ | `#A9B4C2` | Powder Blue | Muted text / tags |
| ██ | `#EEF1EF` | Platinum | Light background / primary text (dark mode) |

## Theme Variables

All colors are applied through CSS custom properties that switch automatically between dark and light mode.

| Variable | Dark Mode | Light Mode |
|----------|-----------|------------|
| `--bg` | `#0f1514` | `#f4f6f5` |
| `--bg-raised` | `#182220` | `#ffffff` |
| `--bg-card` | `rgba(28,35,33,0.6)` | `rgba(255,255,255,0.75)` |
| `--text` | Platinum `#EEF1EF` | Carbon `#1C2321` |
| `--text-secondary` | Powder `#A9B4C2` | Slate `#5E6572` |
| `--border` | `rgba(125,152,161,0.12)` | `rgba(94,101,114,0.12)` |

## Dark / Light Toggle

- Theme preference is stored in `localStorage("theme")`
- Default: **dark**
- All colors transition smoothly with `transition: 0.4s`
- Toggle button is fixed at top-right corner
