/**
 * Which library this page belongs to.
 *
 * Each kiosk (and each library's upload QR code) opens the site with ?library=<id>,
 * e.g. https://…/Epson-Image-Printer/?library=otaki  or  …/?library=otaki#/upload
 * No parameter means Paraparaumu, so the original kiosk and links keep working unchanged.
 */
export interface LibraryInfo {
  id: string;
  name: string;
  /** Weather forecast location. */
  lat: number;
  lon: number;
  /** The kiosk's printer has only a network port: print through the Pi's print bridge
   *  (see networkPrinter.ts) when no USB printer is connected. */
  networkPrinter?: boolean;
}

export const LIBRARIES: Record<string, LibraryInfo> = {
  paraparaumu: { id: 'paraparaumu', name: 'Paraparaumu', lat: -40.9006, lon: 175.0067 },
  otaki: { id: 'otaki', name: 'Ōtaki', lat: -40.7560, lon: 175.1500, networkPrinter: true },
};

export const DEFAULT_LIBRARY = 'paraparaumu';

function requestedLibrary(): string | null {
  // HashRouter puts the route after '#', so the parameter can sit before it (?library=x#/upload)
  // or inside it (#/upload?library=x). Accept both.
  const fromSearch = new URLSearchParams(window.location.search).get('library');
  if (fromSearch) return fromSearch;
  const hashQuery = window.location.hash.split('?')[1];
  return hashQuery ? new URLSearchParams(hashQuery).get('library') : null;
}

export function currentLibrary(): LibraryInfo {
  const id = (requestedLibrary() ?? DEFAULT_LIBRARY)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, ''); // "Ōtaki" → "otaki"
  // An unknown (e.g. misspelt) id still gets its own queue rather than silently
  // sharing Paraparaumu's; the kiosk shows the name on screen so it's easy to spot.
  return LIBRARIES[id] ?? { ...LIBRARIES[DEFAULT_LIBRARY], id, name: `Unknown library "${id}"` };
}
