const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    // reading the json file
    fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
        if (!err) {
            res.status(200).json(JSON.parse(db));
        } else {
            res.status(500).json(err);
        }
    });
});

notes.post('/', (req, res) => {
    // id for the new note
    const new_id = uuidv4();
    // read and parse json file
    fs.readFile('./db/db.json', {encoding: 'utf8'}, (err,db) => {
        if (!err) {
            const db_json = JSON.parse(db);
            const { title, text } = req.body;
            // create note object with the new id
            const new_note = {
                id : new_id,
                title : title,
                text : text
            }
            // add new note to array in db.json
            db_json.push(new_note);
            // write the array to db.json
            fs.writeFile('./db/db.json',JSON.stringify(db_json), (err) => {
                err ? console.error(err) : console.info('save success');
            });

            console.log(response);
            res.status(201).json(response);
        } else {
            res.status(500).json('Error in posting new note.');
        }
    });
});