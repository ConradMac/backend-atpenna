const { expressjwt: jwt } = require("express-jwt");
const User = require("../models/User.model");

// ajouter isOwnerOrAdmin

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: getTokenFromHeaders,
});

async function isAdminOrSuperAdmin(req, res, next) {
    try {
        const user = await User.findById(req.payload._id);
        if (user.role === "Admin" || user.role === "SuperAdmin") {
            req.user = user;
            next();
        } else {
            return res.status(401).json({ message: "Unauthorized." });
        }
    } catch (error) {
        next(error);
    }
}

async function isOwnerOrAdmin(req, res, next) {
    try {
        const tokenUser = await User.findById(req.payload._id);
        if (tokenUser.role === "Admin") {
            req.user = tokenUser;
            return next();
        } else if (req.params.userId === req.payload._id) {
            return next();
        } else {
            return res.status(401).json({ message: "Unauthorized to modify this profile." });
        }
    } catch (error) {
        next(error);
    }
}

// isOwnerOrAdmin = extraire l'utilisateur actuel à partir du token JWT en utilisant le payload puis check if  (tokenUser.role === "Admin"). si si oui, il autorise la requête en appelant next(). Sinon, je  vérifie si l'userId passé dans les paramètres de la requête

// const checkRole =
//     (...roles) =>
//     (req, res, next) => {
//         if (roles.includes(req.session.currentUser.role)) {
//             next();
//         }
//         // else {
//         //    res.render('auth/login-form', { errorMessage: 'MSG' })
//         // }
//     };

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
    console.log("req.headers", req.headers);
    // Check if the token is available on the request Headers
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        // Get the encoded token string and return it
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        return token;
    }

    return null;
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
    isAuthenticated,
    isAdminOrSuperAdmin,
    isOwnerOrAdmin,
};
