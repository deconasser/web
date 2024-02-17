module.exports.index = (req, res) => {
    res.render("admin/pages/home/index", {
        pageTitle: "Trang chủ admin"
    });
}