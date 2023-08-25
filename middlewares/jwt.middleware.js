const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: getTokenFromHeaders,
});

function isAdmin(req, res, next) {
    if (req.user.role === "Admin") {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized." });
    }
}

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
    isAdmin,
};
