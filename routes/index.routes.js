const { isAuthenticated } = require("../middlewares/jwt.middleware");

// const router = require("express").Router();

const express = require("express");
const router = express.Router();

// const router = require("express").Router();
const User = require("../models/User.model");
const uploader = require("./../config/cloudinary.config");

router.get("/", (req, res, next) => {
    res.json("All good in here");
});

// router.use(isAuthenticated);
router.use("/prestations", require("./prestations.routes"));
router.use("/technos", require("./technos.routes"));
router.use("/users", require("./user.routes"));

// ajout auth signup
router.use("/auth", require("./auth.routes"));

// ajout pour photo
router.use("/team-images", require("./auth.routes"));

// upload picture route pour mes user.
router.post("/", uploader.single("picture"), async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const createdUser = await User.create({
            // name: req.body.name,
            picture: req.file.path,
        });
        res.json(createdUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
