const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated, isAdmin } = require("../middlewares/jwt.middleware.js");

//req middleware qui permet de mettre en ligne l'image !!!!!
const uploader = require("./../config/cloudinary.config");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", uploader.single("picture"), async (req, res, next) => {
    const { email, password, lastName, firstName, address, zipcode, city, phone } = req.body;
    // Check if email or password or name are provided as empty strings

    //     try {
    //         const createdUser = await User.create({
    //             // name: req.body.name,
    //             email: req.body.email,
    //             password: req.body.password,
    //             picture: req.file.path,
    //             lastName: req.body.lastName,
    //             firstName: req.body.firstName,
    //             address: req.body.address,
    //             zipcode: req.body.zipcode,
    //             city: req.body.city,
    //             phone: req.body.phone,
    //         });

    //         res.json(createdUser);
    //     } catch (error) {
    //         next(error);
    //     }
    // });

    if (
        email === "" ||
        password === "" ||
        lastName === "" ||
        firstName === "" ||
        address === "" ||
        zipcode === "" ||
        city === "" ||
        phone === ""
    ) {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }

    // This regular expression check that the email is of a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    // This regular expression checks password for special characters and minimum length
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            message:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
    }

    // Check the users collection if a user with the same email already exists
    User.findOne({ email })
        .then((foundUser) => {
            // If the user with the same email already exists, send an error response
            if (foundUser) {
                res.status(400).json({ message: "User already exists." });
                return;
            }

            // If email is unique, proceed to hash the password
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            // Create the new user in the database
            // We return a pending promise, which allows us to chain another `then`
            return User.create({
                email,
                password: hashedPassword,
                lastName,
                firstName,
                address,
                zipcode,
                city,
                phone,
                picture: req.file.path,
            });
        })
        .then((createdUser) => {
            // Deconstruct the newly created user object to omit the password
            // We should never expose passwords publicly
            const { email, lastName, firstName, _id } = createdUser;

            // Create a new object that doesn't expose the password
            const user = { email, lastName, firstName, _id };

            // Send a json response containing the user object
            res.status(201).json({ user: user });
        })
        .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;

    // Check if email or password are provided as empty string
    if (email === "" || password === "") {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    // Check the users collection if a user with the same email exists
    User.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                // If the user is not found, send an error response
                res.status(401).json({ message: "User not found." });
                return;
            }

            // Compare the provided password with the one saved in the database
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (passwordCorrect) {
                // Deconstruct the user object to omit the password
                const { _id, email, lastName, firstName } = foundUser;

                // Create an object that will be set as the token payload
                //les propriétés lastName et firstName sont ajoutées au jeton JWT, ce qui permettrait au serveur d'authentification de connaître le nom complet de l'utilisateur sans avoir à le chercher à nouveau dans la base de données. ! A retenir et a le noter
                const payload = { _id, email, lastName, firstName };

                // Create a JSON Web Token and sign it
                const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "6h",
                });

                // Send the token as the response
                res.status(200).json({ authToken: authToken });
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    console.log(`req.payload`, req.payload);
    User.findById(req.payload._id).then((user) => {
        res.status(200).json({ user });
    });
    // Send back the token payload object containing the user data
});

module.exports = router;
