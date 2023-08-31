const router = require("express").Router();
const Prestation = require("./../models/Prestation.models");
const User = require("./../models/User.model");

const { isAuthenticated } = require("../middlewares/jwt.middleware");

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
        const user = await User.findById(req.params.userId);

        // cela permet de trouver toutes les presta que le user a créee.
        const prestationOfUser = await Prestation.find({ creator: req.params.userId });

        //
        res.json({ user, prestation: prestationOfUser });
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
// router.put("/:userId", isAuthenticated, isOwnerOrAdmin, async (req, res, next) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
//         res.json(updatedUser);
//     } catch (error) {
//         next(error);
//     }
// });

// DELETE a user
router.delete("/:userId", async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

// ...

// Endpoint pour récupérer les images des membres de l'équipe
router.post("/team-images", async (req, res) => {
    try {
        const teamMembers = await User.find({ role: "User" }); // Vous pourriez utiliser un filtre pour récupérer uniquement les membres de l'équipe
        const teamImages = teamMembers.map((member) => member.picture);
        res.status(200).json(teamImages);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Endpoint pour récupérer les images des membres de l'équipe (GET)
router.get("/team-images", async (req, res) => {
    try {
        const teamMembers = await User.find({ role: "User" }); // Vous pourriez utiliser un filtre pour récupérer uniquement les membres de l'équipe
        const teamImages = teamMembers.map((member) => member.picture);
        res.status(200).json(teamImages);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
