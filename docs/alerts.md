# GitHub-style Alerts

hugo-theme-drift supports GitHub-style alert blockquotes via a custom render hook.

## Usage

Use the standard GitHub Markdown alert syntax:

```markdown
> [!NOTE]
> This is a note with useful information.

> [!TIP]
> This is a helpful tip.

> [!IMPORTANT]
> Critical information users should know.

> [!WARNING]
> Something that requires caution.

> [!CAUTION]
> Potential risk or danger.
```

## Alert Types

| Type | Color | Use Case |
|------|-------|----------|
| `NOTE` | Steel blue | General information |
| `TIP` | Green | Helpful suggestions |
| `IMPORTANT` | Purple | Critical details |
| `WARNING` | Yellow | Proceed with caution |
| `CAUTION` | Red | Potential danger |

## Styling

Each alert type has a distinct left border color and subtle background tint. Alert titles include an SVG icon and are automatically translated via i18n.

## Other Render Hooks

The theme also includes render hooks for:

- **Links** — External links automatically open in a new tab (`target="_blank"`)
- **Images** — Block images render as `<figure>` with optional `<figcaption>` from the title attribute
