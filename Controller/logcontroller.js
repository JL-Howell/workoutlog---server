const express = require("express");
const router = express.Router();
const { Log } = require("../models");
const validateSession = require('../middleware/validateSession');


// WORKOUT LOG CREATE

router.post('/log', validateSession, async (req, res) => {
    try {
        const {description, definition, result} = req.body;

        const logEntry = await Log.create({
            description, definition, result  
        });
        res.status(200).json({
            log: logEntry,
            message: 'Yo! Workout Log Created!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'You failed!'
        })
    }
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
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

// UPDATED LOGS BY USER
router.put("/:id", (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id}};

    Log.update(req.body, {where: {id: query}})
        .then((logsUpdated) => {
            Log.findOne({ where: { id: query }})
            .then((locatedUpdateLog) => {
                res.status(200).json({
                    log: locatedUpdateLog,
                    message: "Workout Log Updated Successful",
                    logsChanged: logsUpdated
                });
            });
        })
        .catch((err) => res.json(req.errors));
});

// DELETE LOG ENTRY
router.delete("/:id", (req, res) => {
    Log.destroy({
        where: { id: req.params.id}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.json({error: err}))
});

module.exports = router;