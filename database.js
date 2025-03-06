const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tv_programs.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        channel TEXT,
        date TEXT,
        link TEXT
    )`);
});

function addProgram(title, description, channel, date, link) {
    db.run(
        "INSERT INTO programs (title, description, channel, date, link) VALUES (?, ?, ?, ?, ?)",
        [title, description, channel, date, link],
        function (err) {
            if (err) {
                console.error("❌ Ошибка добавления:", err.message);
            } else {
                console.log(`✅ Добавлена передача: ${title}`);
            }
        }
    );
}

module.exports = { addProgram, db };

