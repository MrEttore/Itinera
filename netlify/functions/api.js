import fs from 'fs';
import path from 'path';

const json = (data, statusCode = 200) => ({
    statusCode,
    headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'access-control-allow-headers': 'Content-Type',
    },
    body: JSON.stringify(data),
});

export async function handler(event) {
    if (event.httpMethod === 'OPTIONS') return json({}, 204);

    let db = { cities: [] };
    try {
        const dbPath = path.join(process.cwd(), 'data', 'db.json');
        if (fs.existsSync(dbPath)) {
            db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        }
    } catch {
        // ignore read errors; fallback to empty
    }

    const { httpMethod, path: reqPath, body } = event;
    const baseRegex = /^\/\.netlify\/functions\/api/;
    let route = reqPath.replace(baseRegex, '') || '/';
    if (!route.startsWith('/')) route = `/${route}`;

    if (process.env.NETLIFY_DEV) {
        // eslint-disable-next-line no-console
        console.log('[api debug]', { httpMethod, reqPath, route });
    }

    if (httpMethod === 'GET' && (route === '/cities' || route === '/cities/')) {
        return json(db.cities);
    }

    const idMatch = route.match(/^\/cities\/([^/]+)$/);
    if (httpMethod === 'GET' && idMatch) {
        const id = idMatch[1];
        const item = db.cities.find((c) => String(c.id) === String(id));
        return item ? json(item) : json({ error: 'Not Found' }, 404);
    }

    if (httpMethod === 'POST' && route === '/cities') {
        const payload = body ? JSON.parse(body) : {};
        const id = payload.id ?? Date.now();
        return json({ ok: true, created: { ...payload, id } }, 201);
    }

    if (httpMethod === 'PUT' && idMatch) {
        const id = idMatch[1];
        const payload = body ? JSON.parse(body) : {};
        return json({ ok: true, updated: { id, ...payload } }, 200);
    }

    if (httpMethod === 'DELETE' && idMatch) {
        const id = idMatch[1];
        return json({ ok: true, deletedId: id }, 200);
    }

    return json(
        {
            error: 'Not Found',
            debug: process.env.NETLIFY_DEV ? { route, httpMethod } : undefined,
        },
        404,
    );
}
