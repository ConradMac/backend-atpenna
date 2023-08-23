const router = require("express").Router();
const Prestation = require("../models/prestation.model");

// GET all prestations
router.get("/", async (req, res, next) => {
    try {
        const allPrestations = await Prestation.find();
        res.json(allPrestations);
    } catch (error) {
        next(error);
    }
});

// GET one prestation
router.get("/:prestationId", async (req, res, next) => {
    try {
        const prestation = await Prestation.findById(req.params.prestationId);
        res.json(prestation);
    } catch (error) {
        next(error);
    }
});

// CREATE a new prestation
router.post("/", async (req, res, next) => {
    try {
        const newPrestation = await Prestation.create(req.body);
        res.status(201).json(newPrestation);
    } catch (error) {
        next(error);
    }
});

// UPDATE a prestation
router.put("/:prestationId", async (req, res, next) => {
    try {
        const updatedPrestation = await Prestation.findByIdAndUpdate(req.params.prestationId, req.body, { new: true });
        res.json(updatedPrestation);
    } catch (error) {
        next(error);
    }
});

// DELETE a prestation
router.delete("/:prestationId", async (req, res, next) => {
    try {
        await Prestation.findByIdAndDelete(req.params.prestationId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
