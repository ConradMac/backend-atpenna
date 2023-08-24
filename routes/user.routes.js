const router = require("express").Router();
const User = require("../models/User.model");
// const { isAuthenticated } = require("../middlewares/authentication");

// GET all users
router.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.find().populate("techno");
        res.json(allUsers);
    } catch (error) {
        next(error);
    }
});

// GET one user
router.get("/:userId", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).populate("prestation");
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// CREATE a new user
router.post("/", async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// UPDATE a user
router.put("/:userId", async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// DELETE a user
router.delete("/:userId", async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
