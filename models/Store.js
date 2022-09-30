const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;


const storeSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a store name"],
        trim: true,
        unique: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chattogram", "khulna", "barisal", "rajshahi", "rangpur"],
            message: "{VALUE} is not a valid name"
        }
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"]
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "User"
        }
    }
}, {
    timestamps: true
})


const Store = mongoose.model("Store", storeSchema);

module.exports = Store;