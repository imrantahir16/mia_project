const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add Emergency name"],
      min: 3,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emergency", emergencySchema);
