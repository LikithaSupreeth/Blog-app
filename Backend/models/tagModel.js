const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tagModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, { timestamps: true });

const Tag = model('Tag', tagModel);

module.exports = Tag;
