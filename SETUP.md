# Yesha's site — setup

Nothing to fill in by hand. The site works out the GitHub repo by itself during
the Netlify build, so you can go straight to uploading.

About 15 minutes, once.

---

## 1. Put the files on GitHub

In her repo on GitHub:

1. **Add file → Upload files**
2. Drag in everything from this folder **except** `node_modules` and `_site`
3. Scroll down, **Commit changes**

If you'd rather use git:

```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/HER-USERNAME/HER-REPO.git
git push -u origin main
```

---

## 2. Connect it to Netlify

1. **Add new site → Import an existing project**
2. Choose **GitHub**, authorise, pick her repo
3. Netlify reads `netlify.toml` and fills in the build settings itself.
   Confirm it shows build command `npm run build`, publish directory `_site`
4. **Deploy site**

First build takes a minute or two. You'll get a URL like
`luminous-otter-4a2f.netlify.app`.

Rename it under **Site configuration → Change site name**.

At this point the public site is live. The admin login still needs step 3.

---

## 3. Switch on the login

Two halves. Both required, and the callback URL is the bit people get wrong.

### On GitHub

1. **Settings → Developer settings → OAuth Apps → New OAuth App**
   (Settings is under her avatar; Developer settings is at the very bottom of
   the left sidebar)
2. Fill in:

   | Field | Value |
   |---|---|
   | Application name | anything, e.g. Portfolio CMS |
   | Homepage URL | her Netlify URL |
   | Authorization callback URL | `https://api.netlify.com/auth/done` |

   That callback URL is Netlify's, not her site's. Copy it exactly.

3. **Register application**
4. Copy the **Client ID**
5. **Generate a new client secret**, copy that too — it's only shown once

### On Netlify

1. Her site → **Site configuration → Access & security → OAuth**
2. **Install provider** → **GitHub**
3. Paste the Client ID and Client Secret → **Save**

---

## 4. Test it

Go to `her-site.netlify.app/admin`

She clicks **Login with GitHub**, approves, and the editor opens.

| Symptom | Cause |
|---|---|
| "Repo not found" | The build didn't pick up `REPOSITORY_URL`. Check Netlify is building from the repo rather than a drag-and-drop upload. |
| Popup closes, nothing happens | The callback URL isn't `https://api.netlify.com/auth/done` |
| Login button missing | The OAuth provider isn't installed on the Netlify side |

---

## How the auto-detect works

Netlify sets an environment variable called `REPOSITORY_URL` on every build.
`src/_data/repo.js` reads it, pulls out the `owner/repo` part, and
`src/admin-config.njk` writes it into `admin/config.yml` as the site is built.

Two consequences worth knowing:

- Nobody types a username anywhere. Fork the repo, move it, rename it — the
  config follows.
- Building locally has no `REPOSITORY_URL`, so the generated config says
  `REPLACE-ME/REPLACE-ME`. That's expected. The admin login only works on the
  deployed site, not on `localhost`.

---

## The admin panel

Styled in her colours — wine background, pink buttons, Cormorant on the login
screen. Not default grey.

**Every collection has a live preview.** The right-hand pane shows the real
design as she types: correct fonts, colours and layout. A case study set to
Position 1 previews as the big featured treatment; anything else previews as a
compact row, with a note explaining how to promote it.

### What she can change

| Collection | Add | Edit | Delete | Reorder |
|---|---|---|---|---|
| Case studies | ✓ | ✓ | ✓ | position number |
| Method steps | ✓ | ✓ | ✓ | position number |
| Work history | ✓ | ✓ | ✓ | position number |
| Page content | — | ✓ | — | — |

**Page content** covers the headline, the numbers row, menu links, button
labels, the big statement line, about paragraphs, portrait, Google title and
description, section on/off switches, and the two colours.

**The colours are the powerful one.** The whole site is mixed from exactly two
values — a background and an accent. Change those two in the admin and every
other tone (borders, muted text, panels, hovers) recalculates from them. A full
retheme in ten seconds, no code.

She hits **Publish**, Netlify rebuilds, live in about a minute. Not instant —
tell her, so she doesn't press it repeatedly.

---

## Pages

The site is no longer one page.

| URL | What it is |
|---|---|
| `/` | Home — hero, work list, method, about, career, contact |
| `/work/<project>/` | One page per case study, generated automatically |

Add a case study in the admin and its page appears on the next build. Delete
one and the page goes. Nothing to wire up.

Each case study page has:

- the fact strip (client, year, scope)
- the bullet points from the home page
- a **Full write-up** field — a proper text editor with headings, bold, quotes
- a **More images** gallery, two per row
- previous / next links to the neighbouring projects

The home page shows the bullets and links through. The long version lives on
the project's own page, so the front page stays short.

---

## The two images

The portrait, and the wide screenshot on the featured case study. Both are
upload fields in the admin. Until they're filled the page shows an empty frame
with placeholder text.

These matter more than anything else left. A screenshot of a real HubSpot
workflow or a piece of collateral does more for her than any other change to
this page.

---

## A custom domain later

Buy it anywhere (~$12–15/year). In Netlify: **Domain management → Add a
domain**, follow the DNS steps. Hosting stays free.

---

## Working on it locally

Only needed for design changes, not content.

```bash
npm install
npm start
```

Runs at `localhost:8080`.

| What | Where |
|---|---|
| Layout and styles | `src/index.njk` |
| Case studies | `src/projects/` |
| Work history | `src/roles/` |
| Method steps | `src/method/` |
| Everything else | `src/_data/site.json` |
| Admin fields | `src/_collections.yml` |
| Admin panel + previews | `src/admin/index.html` |

The palette is two values at the top of the stylesheet — `--wine` and `--pink`.
Every other tone is a `color-mix` of those two.
