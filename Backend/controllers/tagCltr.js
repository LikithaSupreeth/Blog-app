const Tag = require('../models/tagModel');
const { validationResult } = require('express-validator');

const tagCtrl = {};

tagCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  try {
    const tag = new Tag(body);
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

// tagCtrl.update = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!tag) {
//       return res.status(404).json({ error: 'Tag not found' });
//     }
//     res.status(200).json(tag);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'something went wrong' });
//   }
// };

module.exports = tagCtrl;
