const User = require("../models/User")

exports.signupService = async (signupInfo) => {
    const user = await User.create(signupInfo);
    return user;
}


exports.loggedInUserService = async (email) => {
    return await User.findOne({ email });
}

exports.getUserByToken = async (token) => {
    return await User.findOne({ confirmationToken: token })
}