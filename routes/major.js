const router = require("express").Router();
const Major = require("../models/major.model");
const jwt = require("jsonwebtoken");
const util = require("../util.js");

router.post("/add", util.checkLogin, util.authAdmin, async (req, res) => {
    try{
        const {name} = req.body;
        const existingMajor = await Major.findOne({ name });
        if (existingMajor)
            return res.status(400).json({
                errorMessage: "this major already exists.",
            });
        const newMajor = new Major({name});
        const savedMajor = await newMajor.save();
        res.send();
    } catch (err) {
    console.error(err);
    res.status(500).send();
  }

});

module.exports = router;