const Supplier = require("../models/Suppliers.js");

module.exports.saveSupplierService = async (supplier) => {
    const result = await Supplier.create(supplier);
    return result;
}


module.exports.getSupplierService = async () => {
    const suppliers = await Supplier.find({});
    return suppliers;
}


module.exports.getSupplierByIdService = async (id) => {
    const supplier = await Supplier.findById(id);
    return supplier;
}



module.exports.updateSupplierService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}


module.exports.deleteSupplierService = async (id) => {
    const result = await Supplier.deleteOne({ _id: id });
    return result;
}