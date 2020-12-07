## Project dependencies:
 - Node 14.15.1 (prolly works in earlier but I haven't tested.)
 - A 1up application client id and client secret, as described here: https://1up.health/dev/quick-start

 The project is in two halves - back and fron end - to separate code & dependencies for clarity, and to allow the front-end half to be managed by create-react-app.


## Setting up the front-end:
1. Go to the frontend `cd /frontend`.
2. Do an `npm install`.
3. Build `npm run build`.

## Setting up the back-end:
1. Edit the included `.env.example` in /backend - add real secrets, and rename to `.env`.
2. Go to the backend `cd /backend`
3. Do an `npm install`

## To run the app:
From /backend, run `npm start`. If you haven't changed the port in `.env`, the server will start on port 8080.

## For development
The backend express server will serve the front-end from `/frontend/build`, which was generated in the build step above.
Optionally, you can also start a webpack server from the frontend to watch changes and hot-reload. To do so run `npm start` from /frontend. By default, this will start on port 3000.
