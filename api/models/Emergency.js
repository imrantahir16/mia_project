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
    addedBy: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emergency", emergencySchema);
