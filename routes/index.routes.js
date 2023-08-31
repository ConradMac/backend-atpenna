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

module.exports = router;
