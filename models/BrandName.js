const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a brand name."],
        trim: true,
        unique: true,
        maxLength: 100,
        lowercase: true
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email address"],
        lowercase: true
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid website address"]
    },
    location: String,
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})


const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;