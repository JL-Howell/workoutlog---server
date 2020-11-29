const router = require('express').Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//USER SIGNUP
router.post('/register', (req, res) => {
    User.create({
        username: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                user: user,
                message: 'User successfully registered!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});

// USER LOGIN

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.user.username
        }
    })
    .then(function loginSuccess(user) {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                    res.status(200).json({
                        user: user, 
                        message: 'Yo, you got it...SUCCESSFUL!',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: 'failed!' })
                }
            });
        } else {
            res.status(500).json({ error: "Hey! You don't exist!"})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;

