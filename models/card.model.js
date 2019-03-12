const mongoose = require('mongoose');

const LABELS = ['Learning Unit', 'Lab', 'Example', 'Extra', 'Kata'];

const cardSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true,
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  label: {
    type: String,
    enum: LABELS
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
