const mongoose = require ('mongoose');

const noteSchema = new mongoose.Schema (
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    dateTime: {
      type: Date,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    expired: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model ('Note', noteSchema);
