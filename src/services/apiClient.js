// Decide API base:
// - Netlify dev & production: use '/api' (functions)
// - Plain Vite (port 5173/3000): use json-server if running
let API_BASE = '/api';
if (typeof window !== 'undefined' && import.meta?.env?.DEV) {
    const port = window.location.port;
    if (/^(5173|3000)$/.test(port)) {
        API_BASE = 'http://localhost:9000';
    }
}

const LS_ADDS = 'cities_additions';
const LS_EDITS = 'cities_edits';
const LS_DELS = 'cities_deletions';

const readLS = (k, def) => {
    try {
        return JSON.parse(localStorage.getItem(k) ?? JSON.stringify(def));
    } catch {
        return def;
    }
};
const writeLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

if (typeof window !== 'undefined') {
    localStorage.removeItem('cities_additions');
    localStorage.removeItem('cities_edits');
    localStorage.removeItem('cities_deletions');
}

export async function getCities() {
    const res = await fetch(`${API_BASE}/cities`);
    const serverRaw = await res.json();
    const server = Array.isArray(serverRaw)
        ? serverRaw.map((c) => (c.cityName ? c : { ...c, cityName: c.name }))
        : serverRaw;

    const additions = readLS(LS_ADDS, []);
    const edits = readLS(LS_EDITS, {});
    const deletions = new Set(readLS(LS_DELS, []));

    const filtered = server.filter((c) => !deletions.has(String(c.id)));
    const edited = filtered.map((c) =>
        edits[c.id] ? { ...c, ...edits[c.id] } : c,
    );
    const merged = edited.concat(
        additions.filter((c) => !deletions.has(String(c.id))),
    );
    return merged;
}

export async function createCity(city) {
    const newCity = { id: city.id ?? Date.now(), ...city };
    const additions = readLS(LS_ADDS, []);
    writeLS(LS_ADDS, [...additions, newCity]);

    await fetch(`${API_BASE}/cities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCity),
    });

    return newCity;
}

export async function updateCity(id, partial) {
    const edits = readLS(LS_EDITS, {});
    writeLS(LS_EDITS, { ...edits, [id]: { ...(edits[id] || {}), ...partial } });

    await fetch(`${API_BASE}/cities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partial),
    });

    return { id, ...partial };
}

export async function deleteCity(id) {
    const dels = readLS(LS_DELS, []);
    if (!dels.includes(id)) writeLS(LS_DELS, [...dels, id]);

    await fetch(`${API_BASE}/cities/${id}`, { method: 'DELETE' });
    return id;
}

export function resetLocalMock() {
    localStorage.removeItem(LS_ADDS);
    localStorage.removeItem(LS_EDITS);
    localStorage.removeItem(LS_DELS);
}
