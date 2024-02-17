const Product = require("../../models/product.model");
// [GET] /products
module.exports.index = async (req, res) => {
    const product = await Product.find({
        status: "active", 
        deleted: false
    });

    const newProducts = product.map(item => {
        item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    console.log(newProducts);
    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        product: product
    });
}
// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    console.log(req.params.slug);
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect("back");
    }
}

