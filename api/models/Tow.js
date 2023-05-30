const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const towSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add Tow name"],
      min: 3,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
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

module.exports = mongoose.model("Tow", towSchema);
