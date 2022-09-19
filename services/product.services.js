const Product = require("../models/Product.js");

module.exports.getAllProductsService = async (filters, queries) => {
    const result = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const total = await Product.countDocuments(filters);
    const pages = Math.ceil(total / queries.limit);
    return { result, total, pages };
}

module.exports.createNewProductService = async (product) => {
    const result = await Product.create(product);
    return result;
}


module.exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $inc: data }, { runValidators: true })

    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
}


module.exports.bulkUpdateProductService = async (data) => {

    // const result = await Product.updateMany({ _id: data.ids }, data.data, {
    //     runValidators: true
    // })

    const products = []

    data.products.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data))
    })

    const result = await Promise.all(products);

    return result;
}


module.exports.deleteProductService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
}
module.exports.bulkDeleteProductService = async (ids) => {
    const result = await Product.deleteMany({ _id: ids });
    return result;
}