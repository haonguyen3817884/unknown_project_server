const jwt = require("jsonwebtoken");

const verifyToken = (req, response, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (token === undefined) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.customer = decoded;
            return next();
        } catch(decodedError) {
            return response.send({
                error: true,
                message: "Token is invalid",
                data: []
            });
        }
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = {
    verifyToken
};