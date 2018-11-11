const express = require('express');

const router = express.Router();

const burger = require("../models/burger.js")


router.get("/api/all", (req, res) => {
    burger.selectAll(data => {
        res.json(data)
    })
})

router.post("/api/burgers", (req, res) => {
    console.log(req.body.burger_name)
    let newBurger = req.body.burger_name;
    burger.insertOne(newBurger, result => {
        res.json({ id: result.insertId })
    })
})

router.put("/api/burgers/:id", (req, res) => {
    let id = req.params.id;
    console.log(id)
    console.log(req.body)
    console.log(req.body.data.devoured)

    burger.updateOne({devoured: true}, id, result => {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;