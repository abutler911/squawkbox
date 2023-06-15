const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SquawkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Squawk = mongoose.model("Squawk", SquawkSchema);

module.exports = Squawk;
