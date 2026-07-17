# Happy Birthday Anne!

A one-page birthday site: a headline and a draggable 3D dome gallery of photos.
Live at https://shuggan.github.io/anne-birthday/

## Adding more photos

Drop image files into `public/photos/` and push:

```sh
git add public/photos && git commit -m "Add photos" && git push
```

GitHub Actions rebuilds and redeploys automatically. The gallery reads whatever
is in that folder at build time — no code changes needed. Files are shown in
alphabetical order, and are repeated around the dome if there are fewer photos
than tiles.

Supported: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`.

**HEIC photos from an iPhone will not display in most browsers.** Convert first:

```sh
sips -s format jpeg -s formatOptions 80 -Z 1600 IMG_1234.HEIC --out public/photos/img_1234.jpg
```

## Local development

```sh
npm install
npm run dev
```

Adding or removing a file in `public/photos` reloads the page automatically.

## Layout

- `src/App.jsx` — headline and gallery configuration
- `src/DomeGallery.jsx` — the dome component, from [React Bits](https://reactbits.dev/components/dome-gallery)
- `vite.config.js` — the `virtual:photos` plugin that scans `public/photos`
- `.github/workflows/deploy.yml` — build and deploy to GitHub Pages
