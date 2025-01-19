const express = require("express")
const router = express.Router()
const { Users } = require("../models");
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
    const UsersList = await Users.findAll()
    res.json(UsersList)
});

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 13).then((hash) => {
        Users.create({
            username: username,
            password: hash
        });
    });
    res.json(` User: ${username} created.`);
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});
    if (user) {
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                res.json({message: "Erfolgreich eingeloggt."});
            } else {
                res.json({error: "Falsches Passwort oder Benutzername."});
            }
        });
    } else {
        res.destroy();
    }
});

module.exports = router