const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a category name"],
        trim: true,
        unique: true,
        lowercase: true
    },
    description: String,
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid image URL"]
    }
}, {
    timestamps: true
})


const Category = mongoose.model("Category", categorySchema);

model.exports = Category;