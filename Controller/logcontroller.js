const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validateSession');
const Log = require('../db').import('../models/log');


// WORKOUT LOG CREATE
router.post('/log', validateSession, (req, res) => {
    const LogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner: req.user.id
    }
    Log.create(LogEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
});

// GET ALL LOGS BY USER
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll ({
        where: { owner: userid }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

// GETS INDIVIDUAL LOGS BY ID 
router.get('/:id', function (req, res) {
    let id = req.params.title;

    Log.findAll({
        where: { id: id}
    })
        .then(logs => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

// UPDATED LOGS BY USER
router.put("/log/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    };

    const query = { where: { id: req.params.id, owner: req.user.id } };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});

// DELETE LOG ENTRY
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Log.destroy(query)
        .then(() => res.status(200).json({ message: "Journal Entry Removed "}))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;