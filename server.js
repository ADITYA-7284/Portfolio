

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files with correct MIME type for JS modules
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Catch-all fallback for SPA routing (no wildcard string — avoids path-to-regexp crash)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running locally at http://localhost:${PORT}`);
});