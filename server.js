const express = require('express');
const { db } = require('./database.js');

const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());


app.get('/programs', (req, res) => {
    db.all("SELECT * FROM programs", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});

