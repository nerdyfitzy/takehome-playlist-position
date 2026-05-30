import { createServer } from './server.js';

const port = Number(process.env.PORT ?? 3000);

const server = createServer().listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Playlist service listening on http://localhost:${port}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    // eslint-disable-next-line no-console
    console.error(
      `Port ${port} is already in use. Start on another port with: PORT=3001 npm run dev`
    );
    process.exit(1);
  }
  throw err;
});
