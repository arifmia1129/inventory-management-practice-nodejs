const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const productSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [3, "Name must be 3 character."],
        maxLength: [100, "Name is too large."]
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "Unit value must be kg/litre/pcs/bag"
        }
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity can't be negative"]
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide valid url(s)"]
    }],
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    },
    saleCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;