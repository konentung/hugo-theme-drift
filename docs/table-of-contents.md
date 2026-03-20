# Table of Contents

hugo-theme-drift can display a floating Table of Contents sidebar on article pages.

## Enable

In `hugo.toml`:

```toml
[params]
  showTableOfContents = true

[markup.tableOfContents]
  startLevel = 2
  endLevel = 4
  ordered = false
```

## Behavior

- The TOC appears as a fixed sidebar on the right side of the screen
- Only visible on screens wider than **1400px**
- Automatically generated from headings (`h2`–`h4`) in your post content
- Uses glassmorphism styling consistent with the theme
- Scroll tracking highlights the current section

## Per-Post Override

You can disable TOC for individual posts by adding to the front matter:

```yaml
---
toc: false
---
```
