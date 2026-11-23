/**
 * Network (Ethernet) receipt printers.
 *
 * A web page can only reach USB printers by itself. For a printer with just a network port,
 * the kiosk Pi runs a small "print bridge" (pi/print_bridge.py) that the page sends the print
 * to; the bridge passes it down the cable to the printer.
 *
 * Only kiosks set up for it use the bridge (LibraryInfo.networkPrinter, or ?printer=network
 * in the kiosk URL), so other kiosks and phones never try to reach it.
 */
import type { LibraryInfo } from './library';

const BRIDGE = 'http://127.0.0.1:9101';

function urlParam(name: string): string | null {
  const fromSearch = new URLSearchParams(window.location.search).get(name);
  if (fromSearch) return fromSearch;
  const hashQuery = window.location.hash.split('?')[1];
  return hashQuery ? new URLSearchParams(hashQuery).get(name) : null;
}

/** Should this kiosk look for a network printer (when no USB printer is connected)? */
export function usesNetworkPrinter(library: LibraryInfo): boolean {
  const choice = urlParam('printer')?.toLowerCase();
  if (choice === 'network') return true;
  if (choice === 'usb') return false;
  return !!library.networkPrinter;
}

async function bridge(path: string, init: RequestInit, timeoutMs: number): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(BRIDGE + path, { ...init, signal: controller.signal, cache: 'no-store' });
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/** The printer's network address if the bridge can see it, otherwise null. */
export async function networkPrinterStatus(): Promise<string | null> {
  try {
    const status = await bridge('/status', {}, 5000);
    return status?.ok ? String(status.printer) : null;
  } catch {
    return null; // bridge not running (not a network-printer kiosk) or not started yet
  }
}

/** Sends ESC/POS bytes to the network printer. Throws with a readable message if it fails. */
export async function printOverNetwork(data: Uint8Array): Promise<string> {
  let result: any;
  try {
    result = await bridge('/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: data,
    }, 45000);
  } catch (err: any) {
    throw new Error(err?.name === 'AbortError'
      ? 'Printer did not respond. Check paper and lid.'
      : 'Print bridge not running on this Pi. Restart the Pi.');
  }
  if (!result?.ok) throw new Error(result?.error || 'Network printer not found.');
  return String(result.printer);
}
