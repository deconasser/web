const Product = require("../../models/product.model");
const filterProduct = require("../../helpers/filterStatus");

const systemConfig = require("../../config/system");
//  /ADMIN/PRODUCT/
module.exports.index = async (req, res) => {
// KHAI BÁO 
    let find = {
        deleted: false
    }

    let keyword = "";
    const filter = filterProduct(req.query);
// XỬ LÝ LOGIC
    if(req.query.status) {
        find.status = req.query.status;
    } 

    if(req.query.keyword) {
        keyword = req.query.keyword;

        const regax = new RegExp(keyword, "i");
        find.title = regax;

    }
    //Pagination
    let objectPagination = {
        limitItems: 4,
        currentPage: 1
    }
    
    
    if(req.query.page) {
        objectPagination.currentPage = req.query.page;
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    objectPagination.totalPage = totalPage;
    //End Pagination

    const products = await Product.find(find)
        .sort({position: "desc"})
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("./admin/pages/product/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filter,
        keyword: keyword,
        pagination: objectPagination
        
    })
}
// /ADMIN/PRODUCT/CHANGE-STATUS/:STATUS/:ID
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id:id},{status:status});
    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect("back");
}

// /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const status = req.body.type;
    console.log(req.body);
    var ids = req.body.ids.split(", ");

    switch(status) {
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status:"active"});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status:"inactive"});
            break;
        case "delete-all":
            await Product.updateMany(
                { _id: {$in: ids}},
                {
                    deleted: true,
                }
            )
            break;
        case "change-position":
            for(const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id:id}, {
                    position: position
                })
            }
        default:
            break;
    }
    res.redirect("back");
}
// admin/products/delete-item
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({_id:id}, {deleted: true});
    res.redirect("back");
}
//[GET] admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/product/create", {
        pageTitle: "Thêm mới sản phẩm",
    })
}

// [POST] admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    
    req.body.thumbnail = `/uploads/${req.file.filename}`;
    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
// [GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted:false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
        res.render("admin/pages/product/edit", {
            pageTitle: product.title,
            product: product
        })
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
// [PATCH] admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({_id:req.params.id}, req.body);
    } catch(error) {

    }
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}