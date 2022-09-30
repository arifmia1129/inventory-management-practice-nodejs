const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: "Product",
        require: true
    },
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        minLength: [3, "Name must be 3 character."],
        maxLength: [100, "Name is too large."]
    },
    description: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        require: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "Unit value must be kg/litre/pcs/bag"
        }
    },
    price: {
        type: Number,
        require: true,
        min: [0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        require: true,
        min: [0, "Product quantity can't be negative"]
    },
    imageURLs: [{
        type: String,
        require: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        return isValid = false;
                    }
                })
                return isValid;
            },
            message: "Please provide valid image url"
        }
    }],
    category: {
        type: String,
        require: true
    },
    brand: {
        name: {
            type: String,
            require: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            require: true
        }
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    }
}, {
    timestamps: true
})

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;