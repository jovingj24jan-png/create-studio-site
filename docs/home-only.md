# Home-only edition

The public site at https://jovingj24jan-png.github.io/create-studio-site/ can
serve either the full site or a home-only edition of it.

| What | Where |
|---|---|
| Full site, exactly as deployed on 2026-10-23 | tag `original-homepage-2026-10-23` and branch `original-site` (both commit `b224106`) |
| Home-only edition | branch `home-only` (no shared history with `main`) |
| How the edition is made | `scripts/build-home-only.mjs` |

GitHub Pages serves one branch at a time (Settings → Pages → Source, "Deploy
from a branch", folder `/`). The other pages only stop being reachable while
Pages serves `home-only`: that branch contains `index.html` and the 75 files
it loads, nothing else, so `work.html`, `studio.html`, `whispers.html`,
`contact.html`, `work/*`, `whispers/*` and the source folders return 404.

## What the edition changes

Built from the tagged commit, never from the working tree. Only `index.html`
differs from the original, and only in its links:

- `work.html` → `#work`, `studio.html` → `#studio`,
  `whispers.html` → `#whispers`, `contact.html` → `#site-foot`
  (header, mobile menu, "See work", footer)
- the three project panels lose their case-study links (they point at `#work`
  and no longer show "View case study")
- a comment after the doctype names the commit it was built from

## Restore the full site exactly

Point Pages back at the original commit, either from Settings → Pages, or:

```sh
gh api -X PUT repos/jovingj24jan-png/create-studio-site/pages \
  -f "source[branch]=original-site" -f "source[path]=/"
```

`original-site` is frozen at `b224106`. Use `main` instead to serve whatever
is current there. Nothing is deleted either way; switching back to the
edition is the same call with `home-only`.

## Rebuild the edition (after changing the homepage)

```sh
node scripts/build-home-only.mjs <ref> <outDir>   # e.g. main, a commit, a tag
```

Then commit `<outDir>` as the new tip of `home-only` and push that branch.
