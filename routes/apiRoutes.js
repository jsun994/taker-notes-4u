const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const save = req.body;
    let results = notes
    results.push(save);
    fs.writeFile('db/db.json', JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
    res.json(results);
});

module.exports = router;