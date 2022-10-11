const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role
    }

    return token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: "1d"
    })
}