const mongoose = require("mongoose");
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Success to connect");
    } catch (error) {
        console.log("Fail to connect");
    }
}
