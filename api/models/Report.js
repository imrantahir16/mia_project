const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    // user_id
    // soft delete ,
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
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    traffic: {
      type: String,
      required: true,
    },
    reportImages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
