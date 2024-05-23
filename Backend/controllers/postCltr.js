const Post = require('../models/postModel')
const { validationResult } = require('express-validator');


const postCtrl = {};

postCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  try {
    const post = new Post(body);
    post.author = req.user.id;
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

// postCtrl.getAll = async (req, res) => {
//   try {
//     const posts = await Post.find().populate('author').populate('comments').populate('tags');
//     res.status(200).json(posts);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'something went wrong' });
//   }
// };

// postCtrl.getById = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id).populate('author').populate('comments').populate('tags');
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.status(200).json(post);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'something went wrong' });
//   }
// };

// postCtrl.update = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const body = req.body;
//     const post = await Post.findByIdAndUpdate(req.params.id, body, { new: true }).populate('author').populate('comments').populate('tags');
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.status(200).json(post);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'something went wrong' });
//   }
// };

// postCtrl.delete = async (req, res) => {
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'something went wrong' });
//   }
// };



module.exports = postCtrl;
