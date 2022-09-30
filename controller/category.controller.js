const { saveCategoryService, getCategoryService, getCategoryByIdService, updateCategoryService, deleteCategoryService } = require("../services/category.services")

module.exports.saveCategory = async (req, res, next) => {
    try {
        const result = await saveCategoryService(req.body);
        res.status(200).json({
            status: "success",
            message: "Save category successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't save the category",
            error: error.message
        })
    }
}


module.exports.getCategory = async (req, res, next) => {
    try {
        const categories = await getCategoryService();
        res.status(200).json({
            status: "success",
            message: "Get categories successfully",
            data: categories
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the categories",
            error: error.message
        })
    }
}


module.exports.getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryByIdService(id);
        res.status(200).json({
            status: "success",
            message: "Get category successfully",
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the category",
            error: error.message
        })
    }
}


module.exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateCategoryService(id, req.body);

        if (!result.nModified) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't update the category"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Updated category successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the category",
            error: error.message
        })
    }
}


module.exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteCategoryService(id);
        res.status(200).json({
            status: "success",
            message: "Deleted category successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the category",
            error: error.message
        })
    }
}