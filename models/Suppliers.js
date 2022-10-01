const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const suppliersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true
    },
    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    contactNumber: [{
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid phone number"
        }
    }],
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide a emergency contact number"],
        validate: [validator.isMobilePhone, "Please provide a valid mobile number"]
    },
    tradeLicenseNumber: {
        type: Number,
        required: [true, "Please provide your trade license number"]
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide your present address"]
    },
    permanentAddress: {
        type: String,
        required: [true, "Please provide your permanent address"]
    },
    location: {
        type: String,
        required: true,
        lowercase: true
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    nationalIdImageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    status: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: "Status must be active or inactive"
        }
    }
}, {
    timestamps: true
})


const Supplier = mongoose.model("Supplier", suppliersSchema);

module.exports = Supplier; 