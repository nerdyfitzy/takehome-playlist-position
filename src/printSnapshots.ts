import { all } from "./db.js";

interface SnapshotRow {
  playlist_id: number;
  track_id: number;
  track: string;
  position: number;
  snapshot_date: string;
}

//Query used for testing
const rows = all<SnapshotRow>(
  `SELECT s.track_id AS trackId,
            t.name      AS name,
            t.artist    AS artist,
            s.position  AS position
       FROM snapshots s
       JOIN tracks t ON t.id = s.track_id
      WHERE s.playlist_id = 101
        AND s.snapshot_date = (
          SELECT MAX(s2.snapshot_date)
            FROM snapshots s2
           WHERE s2.playlist_id = s.playlist_id
             AND s2.track_id = s.track_id
        )`,
);

// eslint-disable-next-line no-console
console.table(rows);
