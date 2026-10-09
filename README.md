# GenerarVideos

Video promocional de 30 s hecho con [Remotion](https://www.remotion.dev).

- `npm install`
- `npm run studio` — vista previa
- `npm run render` — genera `out/promo.mp4`

Contenido en `src/Promo.tsx`. En `remotion.config.ts` hay una ruta a Chromium propia de un entorno de nube; borrala en una computadora normal.

## Video de Selvir con clips

1. Copiá tus clips (mp4) a `public/clips/`.
2. Agregalos en `src/clips.ts` (archivo, título, subtítulo, segundos). Intro y cierre son de 5 s; con 4 clips de 5 s el video dura 30 s.
3. Música opcional: archivo en `public/` y `MUSIC` en `src/clips.ts`.
4. `npm run render:clips` genera `out/selvir-clips.mp4` (o `npm run studio` para previsualizar).
