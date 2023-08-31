const router = require("express").Router();
const Techno = require("./../models/Techno.models");
const { isAuthenticated, isAdmin } = require("./../middlewares/jwt.middleware");
const User = require("./../models/User.model");

// GET all technos
router.get("/", async (req, res, next) => {
    try {
        const ALLTECHNOS = await Techno.find();
        res.json(ALLTECHNOS);
    } catch (error) {
        next(error);
    }
});

// CREATE one techno
//http://localhost:5005/api/technos/
router.post("/", async (req, res, next) => {
    try {
        const newTechno = await Techno.create(req.body);
        res.status(201).json(newTechno);
    } catch (error) {
        next(error);
    }
});

// GET one techno
router.get("/:technoId", async (req, res, next) => {
    try {
        const ONETECHNO = await Techno.findById(req.params.technoId);
        res.json(ONETECHNO);
    } catch (error) {
        next(error);
    }
});

//UPDATE one techno
router.put("/:technoId", async (req, res, next) => {
    try {
        const UPDATETECHNO = await Techno.findByIdAndUpdate(req.params.technoId, req.body, { new: true });
        res.json(UPDATETECHNO);
    } catch (error) {
        next(error);
    }
});

//DELETE one techno
router.delete("/:technoId", async (req, res, next) => {
    try {
        await Techno.findByIdAndDelete(req.params.technoId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
