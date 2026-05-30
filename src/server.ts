import express from 'express';
import { all } from './db.js';
import { getPlaylistView, searchTrackInPlaylist } from './queries.js';

interface PlaylistMeta {
  id: number;
  name: string;
}

function findPlaylist(id: number): PlaylistMeta | undefined {
  return all<PlaylistMeta>('SELECT id, name FROM playlists WHERE id = $id', { $id: id })[0];
}

export function createServer() {
  const app = express();

  app.get('/playlist/:id', (req, res) => {
    const id = Number(req.params.id);
    const playlist = findPlaylist(id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    return res.json({
      id: playlist.id,
      name: playlist.name,
      tracks: getPlaylistView(id),
    });
  });

  app.get('/playlist/:id/search', (req, res) => {
    const id = Number(req.params.id);
    const q = typeof req.query.q === 'string' ? req.query.q : '';
    const playlist = findPlaylist(id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    return res.json({
      id: playlist.id,
      name: playlist.name,
      query: q,
      results: searchTrackInPlaylist(id, q),
    });
  });

  return app;
}
