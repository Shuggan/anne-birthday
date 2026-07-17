import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const PHOTOS_DIR = path.resolve(import.meta.dirname, 'public/photos');
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

function listPhotos() {
  if (!fs.existsSync(PHOTOS_DIR)) return [];
  return fs
    .readdirSync(PHOTOS_DIR)
    .filter(f => EXTS.has(path.extname(f).toLowerCase()))
    .sort();
}

// Exposes the contents of public/photos as `virtual:photos` so that dropping a
// new image into that folder is the only step needed to add it to the gallery.
function photosPlugin() {
  const virtualId = 'virtual:photos';
  const resolvedId = '\0' + virtualId;
  return {
    name: 'anne-photos',
    resolveId: id => (id === virtualId ? resolvedId : null),
    load(id) {
      if (id !== resolvedId) return null;
      return `export default ${JSON.stringify(listPhotos())};`;
    },
    configureServer(server) {
      server.watcher.add(PHOTOS_DIR);
      const invalidate = file => {
        if (!file.startsWith(PHOTOS_DIR)) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', invalidate);
      server.watcher.on('unlink', invalidate);
    }
  };
}

export default defineConfig({
  base: '/anne-birthday/',
  plugins: [react(), photosPlugin()]
});
