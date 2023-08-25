const router = require("express").Router();
const User = require("../models/User.model");
// const { isAuthenticated } = require("../middlewares/authentication");

//afficlier techno a user team pr ke kan je clik/photo je sois rediriger sur page avec all user avec id techno & then click sur photo pour voir profil de la person que je souhaite.

//http://localhost:5005/api/users/64e74dcc35e133edc3137002/techno //id tehcno + techno de la techno.
router.get("/:technoId/techno", async (req, res, next) => {
    try {
        const ONETECHNO = await User.find({ techno: { $in: [req.params.technoId] } }).populate("techno");
        res.json(ONETECHNO);
    } catch (error) {
        next(error);
    }
});

// faire de meme avec prestation quand je clique sur prestation que je sois rediriger sur page avec all user avec id prestation & then click sur photo pour voir profil de la person que je souhaite.
router.get("/:prestationId/prestations", async (req, res, next) => {
    try {
        const ONETECHNO = await User.find({ prestation: { $in: [req.params.prestationId] } });
        res.json(ONETECHNO);
    } catch (error) {
        next(error);
    }
});

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
// router.post("/", async (req, res, next) => {
//     try {
//         const newUser = await User.create(req.body);
//         res.status(201).json(newUser);
//     } catch (error) {
//         next(error);
//     }
// });

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
