const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    location: {
      description: {
        type: String,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    time: {
      type: Date,
      default: Date.now,
    },
    weather: {
      type: String,
    },
    speed: {
      type: Number,
    },
    traffic: {
      type: String,
    },
    reportImages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
