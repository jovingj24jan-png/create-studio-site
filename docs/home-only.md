# Home-only edition

The public site at https://jovingj24jan-png.github.io/create-studio-site/ can
serve either the full site or a home-only edition of it.

| What | Where |
|---|---|
| Full site, exactly as deployed on 2026-10-23 | tag `original-homepage-2026-10-23` and branch `original-site` (both commit `b224106`, tree `c7459a2`) |
| Home-only edition | branch `home-only` (no shared history with `main`) |
| How the edition is made | `scripts/build-home-only.mjs` |

GitHub Pages serves one branch at a time (Settings → Pages → Source, "Deploy
from a branch", folder `/`). While Pages serves `home-only`, the site is
the homepage, the four pages its header opens (`work.html`, `studio.html`,
`whispers.html`, `contact.html`), the three case studies
(`work/aurelis-beach.html`, `work/blackwell-motors.html`, `work/aspen877.html`),
the seven Whisper articles (`whispers/*.html`) and the files they load; the
scratch pages, the source folders and anything else return GitHub's 404 page.

## What the edition contains

Built from a commit of `main`, never from the working tree. The builder
changes only links; the header bar, menus and every section stay as they are:

- every link between published pages is kept, so the header, the menus,
  the project panels and the article cards open their pages in the same
  tab, as on the reference site
- a link to a page outside the set would point at the matching homepage
  section instead (`work.html` → `#work` and so on); the build fails on any
  other unpublished link
- a comment after the doctype names the commit it was built from
- each page's inline CSS and JS is minified (postcss + cssnano-simple and
  terser, both already installed with the project; top-level names are kept
  because the inline scripts share globals)

Homepage changes made on `main` after the original:

- the hero shows a blurred, inlined copy of the poster from the first paint,
  and the header starts clear over the hero, so the page no longer opens on a
  black screen while the poster and motion library load
- the hero clip downloads only after the page has finished loading, plays
  once it can run through without stalling and the poster's entrance swell
  has settled, then fades in over the poster across 1.2s

## Check what is live

```sh
gh api repos/jovingj24jan-png/create-studio-site/pages --jq '.source'
gh api repos/jovingj24jan-png/create-studio-site/pages/builds/latest --jq '.status+" "+.commit'
```

## Restore the full site exactly

Point Pages back at the original commit and ask for a build (changing the
source alone did not start one on 2026-10-23):

```sh
gh api -X PUT repos/jovingj24jan-png/create-studio-site/pages \
  -f "source[branch]=original-site" -f "source[path]=/"
gh api -X POST repos/jovingj24jan-png/create-studio-site/pages/builds
```

Or Settings → Pages → Source: branch `original-site`, folder `/`, Save.
`original-site` is frozen at `b224106`; use `main` instead to serve whatever
is current there. Nothing is deleted either way; switching back to the
edition is the same calls with `home-only`.

## Rebuild the edition (after changing the homepage)

```sh
node scripts/build-home-only.mjs <ref> <outDir>   # e.g. main, a commit, a tag
```

Then commit `<outDir>` as the next commit on `home-only` and push that branch.
