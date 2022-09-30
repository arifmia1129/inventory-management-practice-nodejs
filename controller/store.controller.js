const { saveStoreService, getStoreService, updateStoreService, deleteStoreService } = require("../services/store.services")

module.exports.saveStore = async (req, res, next) => {
    try {
        const result = await saveStoreService(req.body);
        res.status(200).json({
            status: "success",
            message: "Saved store successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't save the store",
            error: error.message
        })
    }
}


module.exports.getStores = async (req, res, next) => {
    try {
        const stores = await getStoreService();
        res.status(200).json({
            status: "success",
            message: "Get stores successfully",
            data: stores
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the stores",
            error: error.message
        })
    }
}


module.exports.updateStore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStoreService(id, req.body);

        if (!result.nModified) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't update the category",
            })
        }
        res.status(200).json({
            status: "success",
            message: "Updated store successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the store",
            error: error.message
        })
    }
}


module.exports.deleteStore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteStoreService(id);
        res.status(200).json({
            status: "success",
            message: "Deleted store successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the store",
            error: error.message
        })
    }
}