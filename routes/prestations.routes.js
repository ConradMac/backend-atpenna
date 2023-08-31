const { isAuthenticated, isAdminOrSuperAdmin } = require("./../middlewares/jwt.middleware");

const router = require("express").Router();
const Prestation = require("./../models/Prestation.models");

// GET all prestations
//localhost:5005/api/prestations/
router.get("/", async (req, res, next) => {
    try {
        const allPrestations = await Prestation.find();
        res.json(allPrestations);
    } catch (error) {
        next(error);
    }
});

router.get("/:prestationId", async (req, res, next) => {
    const prestationId = req.params.prestationId;

    try {
        const prestation = await Prestation.findById(prestationId);
        res.json(prestation);
    } catch (error) {
        next(error);
    }
});

// CREATE a new prestation
router.post("/", isAuthenticated, async (req, res, next) => {
    try {
        const newPrestation = await Prestation.create({ ...req.body, creator: req.payload._id });
        res.status(201).json(newPrestation);
    } catch (error) {
        next(error);
    }
});

// CREATE a new prestation for a specific user
// router.post("/:userId", async (req, res, next) => {
//     try {
//         const userId = req.params.userId;
//         // You can use the userId to associate the prestation with the user
//         const newPrestation = await Prestation.create({
//             ...req.body,
//             userId: userId,
//         });
//         res.status(201).json(newPrestation);
//     } catch (error) {
//         next(error);
//     }
// });

// UPDATE a prestation
//localhost:5005/api/prestations/64e62446078d1d08037b04cd ( we have to add the ID after )
router.put("/:prestationId", isAuthenticated, isAdminOrSuperAdmin, async (req, res, next) => {
    try {
        const updatedPrestation = await Prestation.findOneAndUpdate({ _id: req.params.prestationId }, req.body, {
            new: true,
        });
        res.json(updatedPrestation);
    } catch (error) {
        next(error);
    }
});

// DELETE a prestation
//http://localhost:5005/api/prestations/64e62446078d1d08037b04cd
router.delete("/:prestationId", isAuthenticated, async (req, res, next) => {
    try {
        await Prestation.findOneAndDelete({ _id: req.params.prestationId, creator: req.payload._id });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
