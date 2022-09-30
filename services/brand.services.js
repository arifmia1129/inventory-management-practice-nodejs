const Brand = require("../models/BrandName")

module.exports.createBrandService = async (brand) => {
    const result = await Brand.create(brand);
    return result;
}


module.exports.getBrandsService = async () => {
    const brands = await Brand.find({}).select("-products -supplier");
    return brands;
}


module.exports.getBrandByIdService = async (id) => {
    const brand = await Brand.findById(id);
    return brand;
}


module.exports.brandUpdateService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, { runValidators: true });
    return result;
}

