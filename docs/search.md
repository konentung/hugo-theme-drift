# Search

hugo-theme-drift includes built-in client-side full-text search with zero external dependencies.

## Enable Search

Search requires JSON output. Make sure your `hugo.toml` includes:

```toml
[outputs]
  home = ["HTML", "JSON"]
```

This generates a search index at `/index.json` that the theme uses for client-side search.

## Usage

| Action | Shortcut |
|--------|----------|
| Open search | `/` or `Cmd+K` / `Ctrl+K` |
| Navigate results | `↑` `↓` arrow keys |
| Open result | `Enter` |
| Close search | `Esc` |

You can also click the search icon in the sidebar to open.

## Search Scope

The search indexes and matches against:

- Title
- Tags
- Summary
- Full content
