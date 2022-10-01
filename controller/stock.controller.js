const { getAllStocksService, createNewStockService, updateStockService, bulkUpdateStockService, deleteStockService, bulkDeleteStockService, getStockByIdService } = require("../services/stock.services");

module.exports.getStock = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        const queries = {};


        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            queries.skip = (page - 1) * Number(limit);
            queries.limit = Number(limit);
        }

        const excludeField = ["page", "limit", "sort", "fields"];

        excludeField.forEach(field => delete filters[field]);

        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`);

        filters = JSON.parse(filterString);

        const products = await getAllStocksService(filters, queries);
        res.status(200).json({
            status: "success",
            message: "Find the products",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the stocks",
            error: error.message
        })
    }
}

module.exports.getStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const stock = await getStockByIdService(id);

        if(!stock) {
            return res.status(400).json({
                status: "fail",
                message: "Can't get the stock"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Find the stock",
            data: stock
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the stock",
            error: error.message
        })
    }
}


module.exports.createStock = async (req, res, next) => {
    try {

        const result = await createNewStockService(req.body);

        res.status(200).json({
            status: "success",
            message: "Stock saved successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Stock is not inserted",
            error: error.message
        })
    }
}


module.exports.updateStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStockService(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Stock updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt update stock",
            error: error.message
        })
    }
}
module.exports.bulkUpdateStock = async (req, res, next) => {
    try {
        const result = await bulkUpdateStockService(req.body);
        res.status(200).json({
            status: "success",
            message: "Stock updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt update stock",
            error: error.message
        })
    }
}
module.exports.deleteStock = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await deleteStockService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't delete stock"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Stock deleted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt delete stock",
            error: error.message
        })
    }
}
module.exports.bulkDeleteStock = async (req, res, next) => {
    try {
        const result = await bulkDeleteStockService(req.body.ids);
        res.status(200).json({
            status: "success",
            message: "Given Stock deleted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt delete given stock",
            error: error.message
        })
    }
}


module.exports.fileUpload = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            message: "File uploaded successfully",
            data: req.files
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt uploaded file",
            error: error.message
        })
    }
}