# Comments

hugo-theme-drift supports [Utterances](https://utteranc.es/) for GitHub-based comments on posts.

## Setup

1. Install the [Utterances GitHub App](https://github.com/apps/utterances) on your site's repository
2. Add the repo to your `hugo.toml`:

```toml
[params]
  utterancesRepo = "username/repo"
```

## How It Works

- Comments are stored as GitHub Issues
- Readers must sign in with their GitHub account to comment
- The theme automatically maps issues by `pathname`
- Dark/light theme is applied based on the current site theme

## Disable Comments Per Post

To disable comments on a specific post, you can use front matter:

```yaml
---
comments: false
---
```
