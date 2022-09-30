const Category = require("../models/Category.js");

module.exports.saveCategoryService = async (category) => {
    const result = await Category.create(category);
    return result;
}


module.exports.getCategoryService = async () => {
    const categories = await Category.find({});
    return categories;
}


module.exports.getCategoryByIdService = async (id) => {
    const category = await Category.findById(id);
    return category;
}



module.exports.updateCategoryService = async (id, data) => {
    const result = await Category.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}


module.exports.deleteCategoryService = async (id) => {
    const result = await Category.deleteOne({ _id: id });
    return result;
}