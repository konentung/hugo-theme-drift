# Custom CSS / JS

You can inject custom stylesheets and scripts without modifying the theme files.

## Configuration

In `hugo.toml`:

```toml
[params]
  customCSS = ["/css/custom.css"]
  customJS = ["/js/custom.js"]
```

## Usage

1. Create your custom files in your site's `static/` directory:
   - `static/css/custom.css`
   - `static/js/custom.js`

2. Add the paths to your `hugo.toml` as shown above

3. Custom CSS is loaded after the theme CSS, so your styles will override theme defaults

4. Custom JS is loaded after the theme's `main.js`

## Examples

### Override accent color

```css
/* static/css/custom.css */
:root {
  --steel: #6c9cff;
}
```

### Add analytics

```javascript
// static/js/custom.js
// Your analytics or tracking code here
```
