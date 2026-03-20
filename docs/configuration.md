# Configuration

## Full Example

```toml
baseURL = 'https://yourdomain.com/'
languageCode = 'zh-tw'
defaultContentLanguage = 'zh-tw'
title = 'My Site'
theme = 'hugo-theme-drift'

[pagination]
  pagerSize = 6

[outputs]
  home = ["HTML", "JSON", "RSS"]  # JSON for search, RSS for feed

[params]
  description = "Your site description"
  author = "Your Name"
  heroTitle = "Hello, World"
  heroSubtitle = "Text that types out on the homepage."
  footerText = "Built with hugo-theme-drift."
  # siteStartYear = 2024
  # avatar = "/img/avatar.jpg"  # Sidebar avatar (place in static/img/)
  # favicon = "/favicon.svg"

  # Features
  showTableOfContents = false
  showShareButtons = false

  # Comments (https://utteranc.es)
  # utterancesRepo = "username/repo"

  # Custom CSS/JS
  # customCSS = ["/css/custom.css"]
  # customJS = ["/js/custom.js"]

[params.social]
  github = "https://github.com/username"
  twitter = "https://twitter.com/username"
  linkedin = "https://linkedin.com/in/username"
  instagram = "https://instagram.com/username"
  email = "mailto:you@example.com"

[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "Posts"
    url = "/posts/"
    weight = 2
  [[menu.main]]
    name = "Projects"
    url = "/projects/"
    weight = 3
  [[menu.main]]
    name = "Notes"
    url = "/notes/"
    weight = 4
  [[menu.main]]
    name = "Tags"
    url = "/tags/"
    weight = 5
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 6

[markup]
  [markup.highlight]
    style = "dracula"
    lineNos = false
    noClasses = true
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `description` | Site meta description and hero fallback |
| `author` | Site-wide author name (used in meta tags) |
| `heroTitle` | Homepage hero heading |
| `heroSubtitle` | Typewriter effect text on homepage |
| `footerText` | Footer copyright text |
| `siteStartYear` | Copyright start year (e.g. `2024` renders as "2024–2026") |
| `avatar` | Path to sidebar avatar image (e.g. `/img/avatar.jpg`) |
| `favicon` | Custom favicon path (default: `/favicon.svg`) |
| `showTableOfContents` | Show TOC sidebar on posts (default: `false`) |
| `showShareButtons` | Show social share buttons on posts (default: `false`) |
| `utterancesRepo` | GitHub repo for Utterances comments (e.g. `user/repo`) |
| `customCSS` | Array of custom CSS file paths |
| `customJS` | Array of custom JS file paths |

## Social Links

Configure under `[params.social]`. All fields are optional. Supported platforms:

- `github` — GitHub profile URL
- `twitter` — Twitter / X profile URL
- `linkedin` — LinkedIn profile URL
- `instagram` — Instagram profile URL
- `email` — `mailto:` link

## Menu

The sidebar navigation is controlled by `[[menu.main]]` entries. Supported pages:

- Home (`/`)
- Posts (`/posts/`)
- Projects (`/projects/`)
- Notes (`/notes/`)
- Tags (`/tags/`)
- About (`/about/`)

Adjust `weight` to control the order.

## Avatar

Place your avatar image in `static/img/avatar.jpg` and set:

```toml
[params]
  avatar = "/img/avatar.jpg"
```

The sidebar will show a circular avatar instead of the default letter icon.
