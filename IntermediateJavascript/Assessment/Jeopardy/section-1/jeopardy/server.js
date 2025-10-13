const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const TARGET = 'https://jservice.io/api';

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/*', async (req, res) => {
  try {
    const path = req.params[0];
    const url = `${TARGET}/${path}` + (Object.keys(req.query).length ? '?' + new URLSearchParams(req.query).toString() : '');
    const response = await axios.get(url, { timeout: 10000 });
    res.json(response.data);
  } catch (err) {
    console.error(err && err.toString());
    res.status(500).json({ error: 'Proxy error', details: err.toString() });
  }
});

app.listen(PORT, () => console.log(`Proxy server listening on http://127.0.0.1:${PORT}`));
