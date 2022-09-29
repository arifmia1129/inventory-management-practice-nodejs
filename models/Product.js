const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
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
    }
}, {
    timestamps: true
})

// mongoose middleware pre & post
productSchema.pre("save", function (next) {
    if (this.quantity === 0) {
        this.status = "out-of-stock"
    }
    next();
})

// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// })

productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

const Product = mongoose.model("Product", productSchema);

module.exports = Product;