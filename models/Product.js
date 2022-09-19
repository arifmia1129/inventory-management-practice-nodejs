const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        minLength: [3, "Name must be 3 character."],
        maxLength: [100, "Name is too large."]
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        min: [0, "Price can't be negative"],
        require: true
    },
    unit: {
        type: String,
        require: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Unit value must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        require: true,
        min: 0,
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        message: "Quantity value must be an integer."
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"]
        }
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier"
    // },
    // categories: [{
    //   name: {
    //     type: String,
    //     require: true
    //   },
    //   _id: mongoose.Schema.Types.ObjectId
    // }]
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