const mongoose = require("mongoose");
const mySchema = new mongoose.Schema({
  asset_id: String,
  asset_name: String,
  cost_center: String,
  doi: Date,
  dop: Date,
  dod: Date,
  other_value: Number,
  description: String,
  invoice_no: String,
  life: Number,
  location: String,
  rate: Number,
  nature_of_asset: String,
  salvage_value: Number,
  supplier_name: String,
  cost: Number,
  quantity: {
    type: Number,
    default: 1
  },
  user: String,
});

const Mydata = mongoose.model("assets", mySchema);
module.exports = { Mydata };