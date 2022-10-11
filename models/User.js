const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const crypto = require("crypto");


const userScheme = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => validator.isStrongPassword(value, {

                minLength: 6,
                minLowerCase: 3,
                minNumbers: 1,
                minSymbols: 1
            }),
            message: "Password {VALUE} is not strong enough"
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: "Password didn't match"
        }
    },
    role: {
        type: String,
        enum: {
            values: ["buyer", "store-manager", "admin"]
        },
        default: "buyer"
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid phone number"]
    },
    shippingAddress: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive", "blocked"]
    },

    confirmationToken: String,
    confirmationTokenExpire: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
})


userScheme.pre("save", function (next) {
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
})


userScheme.methods.comparePassword = function (pass, hash) {
    const isPasswordValid = bcrypt.compareSync(pass, hash);
    return isPasswordValid;
}


userScheme.methods.generateConfirmationToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.confirmationToken = token;

    const date = new Date();
    date.setDate(date.getDate() + 1);

    this.confirmationTokenExpire = date;

    return token;
}

const User = mongoose.model("User", userScheme);

module.exports = User;