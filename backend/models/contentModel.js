const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    authorName : {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    addedToCart:{type: String, required: true}
    // image : {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentSchema);
