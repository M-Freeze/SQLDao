"use strict";

//Rest Module 
let express = require('express');
let bodyParser = require('body-parser');
let task = require('./tasksSQLDao');
let router = express.Router();

//middleware
router.use(bodyParser.json()); //used for post and put

//REST endpoints
//Create
router.post('/tasks', function(req, res, next) {
    let id = req.body.id;
    let text = req.body.text;
    let isDone = req.body.done;
    task.create(id,text,isDone);
    res.status(200).send('Create'); 
});

//Read
router.get('/tasks/:id', function(req, res, next) {
    let id = req.params.id;
    task.read(id);
    res.send(`Read ${id}`).status(203); 
});

//Update
router.put('/tasks/:id', function(req, res, next) {
    let id = req.params.id;
    let text = req.body.text;
    let isDone = req.body.done;
    task.update(id,text,isDone)
    res.status(200).send(`Update ${id}`); 
});

//Delete
router.delete('/tasks/:id', function(req, res, next) {
    let id = req.params.id;
    task.delete(id);
    res.status(200).send(`Delete ${id}`); 
});

//List
router.get('/tasks/list/:isDone', function(req, res, next) {
    let isDone = req.params.isDone;
    task.list(isDone);
    res.status(200).send(`List`); 
}); 

module.exports = router;
