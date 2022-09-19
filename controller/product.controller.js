const { getAllProductsService, createNewProductService, updateProductService, bulkUpdateProductService, deleteProductService, bulkDeleteProductService } = require("../services/product.services");

module.exports.getProduct = async (req, res, next) => {
    try {
        // const product = await Product.where("quantity").equals(0);
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

        const product = await getAllProductsService(filters, queries);
        res.status(200).json({
            status: "success",
            message: "Find the products",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message
        })
    }
}


module.exports.createProduct = async (req, res, next) => {
    try {
        //mongoose have two way to save data. save or create

        // save
        // const product = new Product(req.body);



        // const result = await product.save();

        // create 
        const result = await createNewProductService(req.body);

        result.logger();

        res.status(200).json({
            status: "success",
            message: "Product saved successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product is not inserted",
            error: error.message
        })
    }
}


module.exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt update product",
            error: error.message
        })
    }
}
module.exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body);
        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt update product",
            error: error.message
        })
    }
}
module.exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await deleteProductService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't delete product"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt delete product",
            error: error.message
        })
    }
}
module.exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductService(req.body.ids);
        res.status(200).json({
            status: "success",
            message: "Given product deleted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could'nt delete given product",
            error: error.message
        })
    }
}