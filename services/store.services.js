const Store = require("../models/Store.js");

module.exports.saveStoreService = async (store) => {
    const result = await Store.create(store);
    return result;
}


module.exports.getStoreService = async () => {
    const stores = await Store.find({});
    return stores;
}


module.exports.updateStoreService = async (id, data) => {
    const result = await Store.updateOne({ _id: id }, data, { runValidators: true });
    return result;
}


module.exports.deleteStoreService = async (id) => {
    const result = await Store.deleteOne({ _id: id });
    return result;
}