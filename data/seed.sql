-- Schema + seed data for the playlist service.
-- This is loaded into an in-memory SQLite database when the service starts.

CREATE TABLE playlists (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  platform TEXT NOT NULL
);

CREATE TABLE tracks (
  id     INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,
  artist TEXT NOT NULL,
  isrc   TEXT NOT NULL
);

-- One row per track per snapshot date: where a track sat in a playlist on a
-- given day. A playlist is captured repeatedly over time, so a track has
-- several rows here.
CREATE TABLE snapshots (
  playlist_id   INTEGER NOT NULL,
  track_id      INTEGER NOT NULL,
  position      INTEGER NOT NULL,
  snapshot_date TEXT NOT NULL
);

INSERT INTO playlists (id, name, platform) VALUES
  (101, 'Afro-Soul Mix', 'spotify');

INSERT INTO tracks (id, name, artist, isrc) VALUES
  (1, 'Essence',       'Wizkid',      'USUM72021001'),
  (2, 'Last Last',     'Burna Boy',   'USUM72204002'),
  (3, 'Calm Down',     'Rema',        'USUM72209003'),
  (4, 'Love Nwantiti', 'CKay',        'USUM72100004'),
  (5, 'Peru',          'Fireboy DML', 'USUM72108005'),
  (6, 'Rush',          'Ayra Starr',  'USUM72211006');

INSERT INTO snapshots (playlist_id, track_id, position, snapshot_date) VALUES
  (101, 1, 0, '2026-05-01'),
  (101, 2, 1, '2026-05-01'),
  (101, 4, 2, '2026-05-01'),
  (101, 5, 3, '2026-05-01'),
  (101, 3, 4, '2026-05-01'),
  (101, 6, 5, '2026-05-01'),

  (101, 1, 0, '2026-05-15'),
  (101, 2, 1, '2026-05-15'),
  (101, 4, 2, '2026-05-15'),
  (101, 3, 3, '2026-05-15'),
  (101, 5, 4, '2026-05-15'),
  (101, 6, 5, '2026-05-15'),

  (101, 1, 0, '2026-05-28'),
  (101, 2, 1, '2026-05-28'),
  (101, 3, 2, '2026-05-28'),
  (101, 4, 3, '2026-05-28'),
  (101, 5, 4, '2026-05-28'),
  (101, 6, 5, '2026-05-28');
