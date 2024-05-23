const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentModel = new Schema({
  content: {
    type: String,
    
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
   
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    
  }
}, { timestamps: true });

const Comment = model('Comment', commentModel);

module.exports = Comment;
