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
