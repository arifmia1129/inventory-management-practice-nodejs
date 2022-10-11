const { signupService, loggedInUserService, getUserByToken } = require("../services/signup.services");
const { sendMailWithGmail } = require("../utils/email");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
    try {
        const user = await signupService(req.body);

        const token = user.generateConfirmationToken();

        await user.save({ validateBeforeSave: false });

        const data = {
            to: user?.email,
            subject: "Verify your account",
            text: `Please confirm you account with this url: ${req.protocol + '://' + req.get('host') + req.originalUrl}/confirmation/${token}`
        }
        sendMailWithGmail(data)
        res.status(200).json({
            status: "success",
            message: "Successfully singed up"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. If not user send res
 * 4. Compare password
 * 5. If password not correct send res
 * 6. Check if user is active
 * 7. If not active send res
 * 8. Generate token
 * 9. Send user and token
 * */

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                message: "Make sure given email and password"
            })
        }


        const user = await loggedInUserService(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "User not found"
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "fail",
                message: "Email or password invalid"
            })
        }

        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                message: "User not active"
            })
        }


        const token = generateToken(user);

        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: {
                user: others,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}


exports.getMe = async (req, res) => {
    try {
        const user = await loggedInUserService(req?.user?.email);
        res.status(200).json({
            status: "success",
            message: "Valid user",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}


exports.getTokenUser = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await getUserByToken(token);
        const expired = new Date() > new Date(user?.confirmationTokenExpire);

        if (!user) {
            return res.status(403).json({
                status: "fail",
                message: "Invalid token"
            })
        }

        if (expired) {
            return res.status(401).json({
                status: "fail",
                message: "Token expired"
            })
        }

        user.status = "active";
        user.confirmationToken = undefined;
        user.confirmationTokenExpire = undefined;

        user.save({ validateBeforeSave: false });

        res.status(200).json({
            status: "success",
            message: "Account actived"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}