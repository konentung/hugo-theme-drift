# Content Types

hugo-theme-drift supports 4 content types, each with its own layout.

## Posts

Full-length articles. Place in `content/posts/`.

```yaml
---
title: "My Post"
date: 2026-01-01T10:00:00+08:00
lastmod: 2026-01-01T10:00:00+08:00
author: Your Name
cover: ""
categories:
  - Tech
tags:
  - hugo
  - tutorial
draft: false
---

Your content here.

<!--more-->

Content after the fold.
```

| Field | Description |
|-------|-------------|
| `title` | Post title |
| `date` | Publish date |
| `lastmod` | Last modified date |
| `author` | Author name |
| `cover` | Cover image path (optional) |
| `categories` | Category list |
| `tags` | Tag list |
| `draft` | Set `true` to hide from production |

The `<!--more-->` separator controls where the summary ends on list pages.

## Projects

Portfolio / project pages with optional GitHub integration. Place in `content/projects/`.

```yaml
---
title: "My Project"
date: 2026-01-01T10:00:00+08:00
author: Your Name
github: "owner/repo"
categories:
  - Frontend
tags:
  - vue
  - typescript
draft: false
---
```

### GitHub Integration

When `github` is set to a valid `owner/repo`, the project page automatically shows:

- **Stats grid** — Stars, Forks, Issues, Watchers
- **Language bar** — Distribution chart of repo languages
- **Meta** — License, last updated, repo size

Leave `github` empty to display a standard project page without GitHub stats.

## Notes

Short-form content with a compact layout. Place in `content/notes/`.

```yaml
---
title: "Quick Note"
date: 2026-01-01T10:00:00+08:00
author: Your Name
categories:
  - DevOps
tags:
  - docker
draft: false
---
```

Notes have a different layout compared to Posts:

- **List page** groups notes by month in a timeline view
- **Single page** uses a narrower width (680px vs 860px)
- No cover image, no reading time

## About

A single page at `content/about/_index.md`.

```yaml
---
title: "About"
description: "About me and this blog."
---

Your introduction here.
```

The About page displays your avatar and social links from `[params.social]`.
