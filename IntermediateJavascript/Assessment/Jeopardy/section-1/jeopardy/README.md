Run the local proxy to avoid CORS when developing locally.

1. Install dependencies:

   npm install

2. Start the proxy server:

   npm start

This starts a small proxy on http://127.0.0.1:3000 that forwards requests to https://jservice.io/api and adds CORS headers. When you serve the client from http://127.0.0.1:5500, `jeopardy.js` will automatically use the local proxy as API_BASE.
