const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/urls', async (req, res) => {
    const { url, tags, note } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO urls (url, tags, note) VALUES ($1, $2, $3) RETURNING *',
            [url, tags, note]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/urls', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM urls');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
