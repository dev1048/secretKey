const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Path to your JSON database
const DB_PATH = path.join(__dirname, "db.json");

// Ensure db.json exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ key: "" }, null, 2));
}

// Helper to read the JSON file
function readDB() {
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
}

// Helper to write to the JSON file
function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
    const db = readDB();
    res.send(db.key);
});

app.get("/update", (req, res) => {
    const newValue = req.query.key;
    if (!newValue) {
        return res.status(400).send("Please provide a 'key' query parameter");
    }

    const db = readDB();
    db.key = newValue;
    writeDB(db);

    res.send(`Key updated to: ${newValue}`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
