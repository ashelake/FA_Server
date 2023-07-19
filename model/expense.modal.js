const mongoose = require("mongoose");
const mySchema = new mongoose.Schema({
    asset_id: String,
    asset_name: String,
    cost_center: String,
    doi: Date,
    dop: Date,
    doe: {
        type: Date,
        default: new Date()
    },
    description: String,
    invoce_no: String,
    life: String,
    location: String,
    nature_of_asset: String,
    salvage_value: String,
    supplier_name: String,
    cost: Number,
    quantity: Number,
    user: String,
});

const MyExpense = mongoose.model("expenses", mySchema);
module.exports = { MyExpense };