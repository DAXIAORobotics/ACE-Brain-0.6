# Project website

The static project homepage is served from this repository's root:

https://daxiaorobotics.github.io/ACE-Brain-0.6/

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, then **main / (root)**.
The root `index.html` is the entry point. `.nojekyll` keeps the supplied static
files intact. No dependency installation or build step is needed.

Subsequent commits to `main` trigger a Pages deployment.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/.

## Maintenance

- `index.html`, `styles.css`, and `app.js` contain the page and interactions.
- `site-config.js` sets the paper, repository, model, and dataset links.
  An empty URL displays a pending-release label.
- `assets/data/content.json` is the source for the benchmark table and examples.
- `assets/figures/` and `assets/examples/` contain the supplied paper figures and
  benchmark examples.

After changing `content.json`, regenerate and validate the browser data and CSV:

```bash
python3 tools/sync_data.py
```

This checks the seven-benchmark averages, example image paths, and normalized
reference boxes. The example annotations are benchmark references, not live
model predictions. RobotGrounding is excluded from Avg-7.

The GitHub repository's existing README and its assets remain the model overview.

## RobotGrounding layout checks

Keep the gallery compact without stretching the question to fill the image's
height. Example images use their original aspect ratio; normalized annotation
coordinates must scale independently along each image axis.

After layout changes, check all 14 examples at desktop, tablet, and phone widths.
Include the 1550px navigation breakpoint, the 4:3 small-object image, and both
cross-view images. At wide widths, the section navigation must stay outside the
content column. On phones, check the menu and the annotation toggle as well.

`tools/check-grounding-layout.js` provides a read-only browser geometry check.
Open RobotGrounding, select an example, and wait for its images to load. Paste
the function into browser DevTools, then run `checkGroundingLayout()`. It checks
navigation overlap, text-to-answer spacing, horizontal overflow, and annotation
alignment against actual image pixels.

When changing `app.js` or `styles.css`, update their version query in `index.html`
so cached scripts and styles are refreshed together.
