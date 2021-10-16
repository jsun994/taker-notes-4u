const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const note = req.body;
    note.id = uniqid();
    let results = notes;
    results.push(note);
    
    fs.writeFile('db/db.json', JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('note saved!');
    });
    res.json(results);
});

router.delete('/notes/:id', (req, res) => {
    const noteID = req.params.id;
    let results = notes;

    for(let i = 0; i < results.length; i++) {
        if(results[i].id == noteID) {
            results.splice(i, 1);
            break;
        }
    }

    fs.writeFile('db/db.json', JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('deleted!');
    });
    res.json(results);
})

module.exports = router;