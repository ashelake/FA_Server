const mongoose = require("mongoose");
const mySchema = new mongoose.Schema({
    asset_id: String,
    asset_name: String,
    cost_center: String,
    doi: Date,
    dop: Date,
    rate: Number,
    dod: Date,
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
    verified: {
        type: Boolean,
        default: false
    },
});

const MyCapitalise = mongoose.model("capitals", mySchema);
module.exports = { MyCapitalise };