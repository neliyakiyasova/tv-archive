const express = require('express');
const { searchPrograms } = require('./database');
const app = express();

app.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Введите запрос" });

    const results = await searchPrograms(query);
    res.json(results);
});
app.get('/', (req, res) => {
    res.send('API для поиска ТВ-программ. Используйте /search?query=название');
});


app.listen(3005, () => console.log('Сервер запущен на http://localhost:3005'));
