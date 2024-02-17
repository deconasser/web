const express = require("express");

require("dotenv").config();
const router_admin = require("./routes/admin/index.route");
const router = require("./routes/client/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT;
database.connect();
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));
//Flash
app.use(cookieParser("thinhdeptraivai"));
app.use(session({ cookie: {maxAge: 60000}}));
app.use(flash());
// End Flash
router(app);

router_admin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
