const Stock = require("../models/Stock.js");

module.exports.getAllStocksService = async (filters, queries) => {
    const result = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const total = await Stock.countDocuments(filters);
    const pages = Math.ceil(total / queries.limit);
    return { result, total, pages };
}

module.exports.createNewStockService = async (stock) => {
    const result = await Stock.create(stock);
    return result;
}


module.exports.updateStockService = async (stockId, data) => {
    const result = await Stock.updateOne({ _id: stockId }, { $inc: data }, { runValidators: true })

    // const Stock = await Stock.findById(StockId);
    // const result = await Stock.set(data).save();
    return result;
}


module.exports.bulkUpdateStockService = async (data) => {

    // const result = await Stock.updateMany({ _id: data.ids }, data.data, {
    //     runValidators: true
    // })

    const stocks = []

    data.Stocks.forEach(stock => {
        stocks.push(Stock.updateOne({ _id: stock.id }, stock.data))
    })

    const result = await Promise.all(stocks);

    return result;
}


module.exports.deleteStockService = async (id) => {
    const result = await Stock.deleteOne({ _id: id });
    return result;
}
module.exports.bulkDeleteStockService = async (ids) => {
    const result = await Stock.deleteMany({ _id: ids });
    return result;
}

module.exports.getStockByIdService = async (id) => {
    const stock = await Stock.findOne({ _id: id }).populate("suppliedBy.id").populate("store.id").populate("brand.id");
    return stock;
}