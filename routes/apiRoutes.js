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
    let noteID = req.params.id;
    //console.log(noteID);
    let results = notes;

    results.splice(req.params.id, 1);
    fs.writeFile('db/db.json', JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('deleted!');
    });
    res.json(results);
})

module.exports = router;