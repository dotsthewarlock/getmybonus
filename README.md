# Get My Bonus

A mobile-friendly static MVP workflow built with plain HTML, CSS, and JavaScript.

This project is intentionally simple so it can be deployed directly with GitHub Pages. There are no frameworks, no package managers, and no build tools.

## Current architecture

```text
.
├── README.md    # Project overview and deployment notes
├── index.html   # Main Get My Bonus workflow markup
├── styles.css   # Mobile-first dark theme and two-panel responsive layout
└── script.js    # Code generation, clipboard, iframe, and localStorage behavior
```

The site uses a two-panel application layout:

- The left workspace panel accepts pasted codes or barcodes, one per line.
- The Generate Links button creates clickable code buttons below the textarea.
- Clicking a generated code copies that code to the clipboard and marks it as processed.
- The right panel includes a website URL field, Load and Reset buttons, and an iframe preview.
- The website URL uses the `getmybonus.websiteUrl` localStorage key and defaults to `https://getmybonus.ca`.
- On mobile, the panels stack vertically for easier reading.
- On desktop, the workspace stays in a fixed-width left column while the website panel uses the remaining space.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static file server.

For example, if Python is installed:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Choose the branch that contains these files.
5. Select the repository root as the publishing source.
6. Save the settings and wait for GitHub Pages to publish the site.

## Notes

- The site uses only static files.
- All paths are relative, so the project works from a GitHub Pages subpath.
- The iframe loads the saved website URL on page load.
- Some websites may block iframe embedding with their own security headers; the URL is still saved and applied by the app.
