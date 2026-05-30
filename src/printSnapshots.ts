import { all } from './db.js';

interface SnapshotRow {
  playlist_id: number;
  track_id: number;
  track: string;
  position: number;
  snapshot_date: string;
}

const rows = all<SnapshotRow>(
  `SELECT --your query here
    `
);

// eslint-disable-next-line no-console
console.table(rows);
