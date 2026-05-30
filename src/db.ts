/**
 * A tiny in-memory SQLite database for the take-home.
 *
 * On startup we create a fresh SQLite database (via sql.js, which is SQLite
 * compiled to WebAssembly — no native build step) and load the schema and seed
 * data from `data/seed.sql`. The tables mirror the real ones in production:
 * `playlists`, `tracks`, and `snapshots`.
 *
 * You should NOT need to change this file or the seed data to solve the task.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import initSqlJs, { type Database, type BindParams } from 'sql.js';

const wasmFile = readFileSync(
  fileURLToPath(new URL('../node_modules/sql.js/dist/sql-wasm.wasm', import.meta.url))
);
const wasmBinary = wasmFile.buffer.slice(
  wasmFile.byteOffset,
  wasmFile.byteOffset + wasmFile.byteLength
) as ArrayBuffer;

const SQL = await initSqlJs({ wasmBinary });

const seed = readFileSync(fileURLToPath(new URL('../data/seed.sql', import.meta.url)), 'utf8');

const database: Database = new SQL.Database();
database.run(seed);

/**
 * Run a query and return the rows as plain objects. Supports bound parameters,
 * e.g. all('SELECT * FROM tracks WHERE id = $id', { $id: 1 }).
 */
export function all<T>(sql: string, params: BindParams = {}): T[] {
  const stmt = database.prepare(sql);
  stmt.bind(params);

  const rows: T[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as unknown as T);
  }
  stmt.free();

  return rows;
}
