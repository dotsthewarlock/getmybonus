# Get My Bonus

A mobile-friendly static application layout built with plain HTML, CSS, and JavaScript.

This project is intentionally simple so it can be deployed directly with GitHub Pages. There are no frameworks, no package managers, and no build tools.

## Current architecture

```text
.
├── README.md    # Project overview and deployment notes
├── index.html   # Main application-style page markup
├── styles.css   # Mobile-first dark theme and two-panel responsive layout
└── script.js    # Minimal progressive enhancement JavaScript
```

The site uses a two-panel application layout:

- A workspace panel for navigation, placeholder input space, and summary blocks.
- A content panel for overview, details, and status placeholders.
- On mobile, the panels stack vertically for easier reading.
- On desktop, the workspace stays in a fixed-width left column while the content uses the remaining space.

No bonus business logic has been added yet.

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
- JavaScript is optional; the page content remains usable if scripts are disabled.
