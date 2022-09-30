const { createBrandService, getBrandsService, getBrandByIdService, brandUpdateService } = require("../services/brand.services")

module.exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "Brand created successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the brand",
            error: error.message
        })
    }
};


module.exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService();
        res.status(200).json({
            status: "success",
            message: "Get brands successfully",
            data: brands
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        })
    }
}
module.exports.getBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await getBrandByIdService(id);
        if (!brand) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't get the brand",
            })
        }
        res.status(200).json({
            status: "success",
            message: "Get brand successfully",
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brand",
            error: error.message
        })
    }
}
module.exports.brandUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await brandUpdateService(id, req.body);
        if (!result.nModified) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't update the brand",
            })
        }
        res.status(200).json({
            status: "success",
            message: "Update brand successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the brand",
            error: error.message
        })
    }
}