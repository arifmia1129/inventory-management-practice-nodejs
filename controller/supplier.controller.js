const { saveSupplierService, getSupplierService, getSupplierByIdService, updateSupplierService, deleteSupplierService } = require("../services/supplier.services")

module.exports.saveSupplier = async (req, res, next) => {
    try {
        const result = await saveSupplierService(req.body);
        res.status(200).json({
            status: "success",
            message: "Save supplier successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't save the supplier",
            error: error.message
        })
    }
}


module.exports.getSupplier = async (req, res, next) => {
    try {
        const suppliers = await getSupplierService();
        res.status(200).json({
            status: "success",
            message: "Get suppliers successfully",
            data: suppliers
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the categories",
            error: error.message
        })
    }
}


module.exports.getSupplierById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const supplier = await getSupplierByIdService(id);
        res.status(200).json({
            status: "success",
            message: "Get supplier successfully",
            data: supplier
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the supplier",
            error: error.message
        })
    }
}


module.exports.updateSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateSupplierService(id, req.body);

        if (!result.nModified) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't update the supplier"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Updated supplier successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the supplier",
            error: error.message
        })
    }
}


module.exports.deleteSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteSupplierService(id);
        res.status(200).json({
            status: "success",
            message: "Deleted supplier successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the supplier",
            error: error.message
        })
    }
}