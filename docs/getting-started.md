# Getting Started

## Requirements

- Hugo Extended **v0.112.0** or later

## Installation

### Option 1: Git Submodule (Recommended)

```bash
hugo new site mysite
cd mysite
git init
git submodule add https://github.com/konentung/hugo-theme-drift.git themes/hugo-theme-drift
```

### Option 2: Hugo Module

```bash
hugo mod init github.com/<username>/mysite
```

Add to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/konentung/hugo-theme-drift"
```

### Option 3: Manual Download

Download the latest release and extract into `themes/hugo-theme-drift/`.

## Quick Configuration

Copy `hugo.example.toml` from the theme root to your site root and rename it to `hugo.toml`:

```bash
cp themes/hugo-theme-drift/hugo.example.toml hugo.toml
```

Edit the values to match your site. See [Configuration](/configuration) for full details.

## Create Your First Post

```bash
hugo new posts/hello-world.md
```

## Run the Dev Server

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site.
