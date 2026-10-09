// Lista de clips. Poné los archivos en public/clips/ y agregalos acá.
// Cada clip dura `seconds` segundos (se recorta desde el inicio del archivo).
// Con lista vacía, el video queda solo con intro y cierre.
export type ClipDef = {file: string; title: string; sub?: string; seconds: number};

export const clips: ClipDef[] = [
  // {file: 'mostrador.mp4', title: 'Atención cercana', sub: 'Te asesoramos', seconds: 5},
];

// Música de fondo opcional: archivo en public/, por ejemplo 'musica.mp3'
export const MUSIC: string | null = null;

export const INTRO_SECONDS = 5;
export const OUTRO_SECONDS = 5;
