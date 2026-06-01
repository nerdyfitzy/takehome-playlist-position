# Take-Home: Playlist Track-Position

Welcome, and thanks for taking the time to work on this. This is a small, self-contained React + TypeScript app. The assignment is designed to take around 2 hours, with a maximum recommended time of 3 hours, so please avoid spending significantly more time than that.

## The product

We track music playlists. Each playlist has an ordered list of tracks, and the
product shows a track's position in two places:

1. A **playlist page** that lists every track with its position (#1, #2, #3, …).
   This is the numbering the customer sees in the product.
2. A **search box** that lets a customer search for a track _inside_ a playlist
   and tells them which position that track sits at.

## What customers are reporting

> "When I look at my playlist, a song shows at one position — but when I search
> for that same song inside the playlist, it tells me it's at a **different**
> position. And the number it gives me doesn't even match where the song
> actually is in the playlist right now."

There are **two separate problems** hiding in that report. The work is split
into two parts, and the test suite is grouped to match. Reproduce things first:

```bash
npm install
npm run dev   # starts the service on http://localhost:3000

# In another terminal:
curl "http://localhost:3000/playlist/101"
curl "http://localhost:3000/playlist/101/search?q=Calm%20Down"
```

NOTE: A track's position in the product is the source of truth for what
"correct" looks like.

### Part 1 — the two views disagree

Look at what the playlist page says about a track's position, then search for
that same track inside the playlist. The two report **different positions for
the same track**. They should always agree.

Your job: make search and the playlist page report the same position for a
track.

### Part 2 — the position is out of date

Once Part 1 is done and the two views agree, there's still a problem: the
position they report is wrong. A customer tells us:

> "Calm Down is the 3rd song in my playlist right now, but your service keeps
> telling me it's #5."

They're right — on the live playlist on Spotify, Calm Down currently sits at #3. 

Here's how the data flows: we ingest each playlist from Spotify on a recurring
basis and store every capture in our database. That table is the source of truth for where a track
sits today. You can inspect it the way you would in real life — by querying the
database: 
open `data/seed.sql` to read the schema and rows directly and write a SQL query to get the data that you need from the table. Then to visualize the return of your query you can run:

```bash
npm run data   # prints the stored playlist data as a table, straight from the DB
```

Work out what each track's current position _should_ be from that data, then
make the service report it.

Your job: make the service report each track's correct, current position.

## Your task, in short

1. Get the service running and reproduce both problems.
2. Investigate and fix **Part 1**, then **Part 2** (see above).
3. Make the full test suite pass (`npm test`).

We care more about _how_ you reason about the data than about lines of code.
Use the `pr_description_template.md` file to explain your solution. The template already includes sections for user-facing and team-facing messages, which will be used to evaluate your communication skills.

## Getting started

```bash
npm install
npm test          # the suite currently fails — that's expected
npm run dev       # starts the service on http://localhost:3000
```

Try it by hand:

```bash
curl "http://localhost:3000/playlist/101"
curl "http://localhost:3000/playlist/101/search?q=Calm%20Down"
```

## What we're evaluating

- Correctly identifying each root cause, rather than patching the symptom or
  tweaking values until the tests go green.
- Choosing the right source of truth and keeping the customer-facing behavior
  correct.
- Clean, well-placed fixes. Bonus points if you make this class of bug hard to
  reintroduce.
- Clear communication about what was wrong and what you changed.

## Project layout

```
data/
  seed.sql     # schema + seed data, loaded into an in-memory SQLite DB
src/
  db.ts        # boots the SQLite DB and exposes a query helper
  queries.ts   # the SQL that powers each endpoint
  server.ts    # builds the express app with the two endpoints
  index.ts     # entry point that starts the server
  printSnapshots.ts  # `npm run data` — prints the snapshots table
test/
  position.test.ts   # the acceptance tests
```

You should only need to touch `src/`. You shouldn't need to edit the tests or
the seed data, but read them carefully.

## Handy commands

```bash
npm run data   # print the snapshots table (playlist contents over time)
npm test       # run the acceptance suite
npm run dev    # start the service with reload
```

## Submission Instructions

1. Fork this repository.
2. Complete the assignment in your own fork.
3. Open a pull request with your completed solution.
4. Use the `pr_description_template.md` file for your PR description.
   - Explain the root cause and your solution.
   - Include the customer-facing follow-up message requested in the template.
   - Include the team-facing message requested in the template.
5. Email the GitHub link to your pull request to hiring@chartmetric.com with the subject line:

   `[Your Name - Customer Success Engineer] Take-Home Assignment`
