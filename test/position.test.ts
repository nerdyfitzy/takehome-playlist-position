import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createServer } from '../src/server.js';

const app = createServer();
const PLAYLIST_ID = 101;

/**
 * The position each track should be reported at, keyed by track id. These are
 * the numbers a correct service returns for playlist 101.
 */
const EXPECTED_POSITION: Record<number, number> = {
  1: 1, // Essence
  2: 2, // Last Last
  3: 3, // Calm Down
  4: 4, // Love Nwantiti
  5: 5, // Peru
  6: 6, // Rush
};

describe('Part 1 — the playlist page and in-playlist search agree', () => {
  it('report the same position for every track', async () => {
    const playlistRes = await request(app).get(`/playlist/${PLAYLIST_ID}`);
    expect(playlistRes.status).toBe(200);

    const positionByTrackId = new Map<number, number>();
    for (const row of playlistRes.body.tracks) {
      positionByTrackId.set(row.trackId, row.position);
    }

    for (const row of playlistRes.body.tracks) {
      const searchRes = await request(app)
        .get(`/playlist/${PLAYLIST_ID}/search`)
        .query({ q: row.name });

      expect(searchRes.status).toBe(200);

      const match = searchRes.body.results.find(
        (r: { trackId: number }) => r.trackId === row.trackId
      );

      expect(match, `expected to find "${row.name}" in search results`).toBeDefined();
      expect(
        match.position,
        `position mismatch for "${row.name}": the playlist page shows #${positionByTrackId.get(
          row.trackId
        )} but search shows #${match.position}`
      ).toBe(positionByTrackId.get(row.trackId));
    }
  });

  it('report positions as a contiguous 1-indexed list', async () => {
    const res = await request(app).get(`/playlist/${PLAYLIST_ID}`);
    const positions = res.body.tracks.map((t: { position: number }) => t.position);
    expect([...positions].sort((a: number, b: number) => a - b)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('Part 2 — positions match where tracks actually are in the playlist', () => {
  it('reports each track at its correct current position', async () => {
    const res = await request(app).get(`/playlist/${PLAYLIST_ID}`);
    expect(res.status).toBe(200);

    for (const row of res.body.tracks) {
      const expected = EXPECTED_POSITION[row.trackId];
      expect(
        row.position,
        `wrong position for "${row.name}": expected #${expected} but got #${row.position}`
      ).toBe(expected);
    }
  });
});
