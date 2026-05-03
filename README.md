# David Girnstein — UGC Studio

Website für `ugc.girnstein.studio`. Reines HTML/CSS/JS — kein Build, keine Frameworks, kein npm. Direkt deploybar via GitHub Pages.

---

## Struktur

```
.
├── index.html              # Hauptseite (Hero, Services, Portfolio, Contact)
├── about.html              # Subpage: Über mich
├── process.html            # Subpage: Prozess + FAQ
├── css/
│   └── style.css           # Komplettes Styling
├── js/
│   └── main.js             # Animations, Lazy-Load, Mobile Nav
├── assets/
│   ├── images/             # Hier kommen DEINE Bilder rein
│   └── videos/             # (Optional, falls du mal MP4s lokal nutzt)
├── Beispielbilder/         # Aktuell als Hero/About-Platzhalter verlinkt
├── CNAME                   # → ugc.girnstein.studio (für GitHub Pages Custom Domain)
├── .nojekyll               # Verhindert Jekyll-Build auf GitHub Pages
├── robots.txt
└── sitemap.xml
```

---

## Deployment auf GitHub Pages — in 5 Minuten

### 1. Repo anlegen & pushen
```bash
cd "My UGC Website"
git init
git add .
git commit -m "init: ugc studio site"
git branch -M main
git remote add origin https://github.com/<DEIN-USERNAME>/ugc-girnstein-studio.git
git push -u origin main
```

### 2. GitHub Pages aktivieren
1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)** → Save
4. Nach ~30 Sekunden ist deine Seite unter `https://<USERNAME>.github.io/ugc-girnstein-studio/` live.

### 3. Custom Domain `ugc.girnstein.studio` verbinden
Bei deinem DNS-Provider (wo `girnstein.studio` liegt):

| Type  | Name | Value                       |
|-------|------|-----------------------------|
| CNAME | ugc  | `<DEIN-USERNAME>.github.io` |

Dann in GitHub Pages Settings unter **Custom domain** `ugc.girnstein.studio` eintragen → Save.
Die Datei `CNAME` in diesem Repo enthält die Domain bereits — GitHub erkennt sie automatisch.

GitHub stellt nach DNS-Propagation (5–30 Min) automatisch ein **Let's Encrypt SSL-Zertifikat** aus. Aktiviere danach **"Enforce HTTPS"** in Pages-Settings.

---

## Was du noch tun musst

### A. Hero-Bild austauschen
Das aktuelle Hero-Bild ist ein Platzhalter aus `Beispielbilder/IMG_8526.jpeg`.
Lege dein finales Hero-Foto unter `assets/images/hero.jpg` ab und ändere in `index.html` die Zeile:
```html
<img src="Beispielbilder/IMG_8526.jpeg" ...
```
zu:
```html
<img src="assets/images/hero.jpg" ...
```

### B. Portfolio-Videos einpflegen
In `index.html` findest du im Portfolio-Grid 6 `.work-card` Elemente. Jede hat ein `data-yt="..."` Attribut. Trage dort die **YouTube-Video-IDs** deiner Spots ein (die ID ist der String nach `?v=` in der YouTube-URL).

Beispiel: `https://youtu.be/AbC123xyz` → `data-yt="AbC123xyz"`

**Empfehlung:** Lade Videos auf YouTube als **"Nicht gelistet" (unlisted)** hoch. Sie sind dann nur über Direktlink (oder dein Portfolio) erreichbar, nicht über YouTube-Suche.

Optional: Lade Vorschaubilder (Thumbnails) nach `assets/images/work-01.jpg` … `work-06.jpg` und ersetze die `<div class="placeholder">` durch:
```html
<img class="thumb" src="assets/images/work-01.jpg" alt="..." loading="lazy" />
```

### C. Kontakt-Links anpassen
In `index.html`, `about.html`, `process.html` an den entsprechenden Stellen anpassen:
- E-Mail: `hello@girnstein.studio`
- Cal-Link: `https://cal.com/davidgirnstein`
- Instagram: `@davidgirnstein`
- LinkedIn: `in/davidgirnstein`

### D. (Später) Open-Graph-Bild
Lege ein 1200x630px-Bild als `assets/images/og.jpg` ab — wird automatisch von der Meta-Tag-Vorlage geladen.

---

## Warum diese Architektur?

- **Kein Build-Step:** GitHub Pages serviert die Files 1:1. Du pushst → es ist live. Keine Actions, kein Webpack, keine Surprise-Bugs.
- **Keine npm-Abhängigkeiten:** Du musst nichts installieren, ich auch nicht. Die Seite funktioniert in 10 Jahren noch genauso.
- **YouTube-Lazy-Load:** Die Portfolio-Karten zeigen nur Thumbnails. Erst beim Klick wird das YouTube-iFrame nachgeladen → schnelle Initialladezeit + GitHub-Repo bleibt klein (kein Video-Storage).
- **Custom Domain:** Du behältst dauerhaft `ugc.girnstein.studio`, unabhängig von GitHub-Username/Repo-Name.

---

## Lokal testen

Einfach `index.html` im Browser öffnen — funktioniert. Für ein realistischeres Setup (Pfade etc.):
```bash
cd "My UGC Website"
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Design Tokens

| Token            | Wert       | Verwendung               |
|------------------|------------|--------------------------|
| `--lime`         | `#CDFF00`  | Akzentfarbe              |
| `--bg`           | `#F4F0E6`  | Eierschale (Hintergrund) |
| `--ink`          | `#0B0B0B`  | Text & dunkle Sektionen  |
| Headline-Font    | Inter Tight Black 900 | alle H1/H2/H3 |
| Body-Font        | Inter 400/500 | Fließtext             |
| Mono-Akzente     | JetBrains Mono | Eyebrows, Tags       |

Alle Tokens sind in `css/style.css` ganz oben unter `:root` definiert — dort kannst du sie zentral ändern.
