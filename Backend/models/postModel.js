const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postModel = new Schema({
  title: {
    type: String,
    
  },
  content: {
    type: String,
    
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag' 
  }],
  featuredImage: {
    type: String
  }
}, { timestamps: true });

const Post = model('Post', postModel);

module.exports = Post;
