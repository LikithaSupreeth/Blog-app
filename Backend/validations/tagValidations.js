const mongoose = require('mongoose');
const Tag = require('../models/tagModel');

const tagValidation = {
  name: {
    exists: {
      errorMessage: 'Name is required'
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty'
    },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'Name must be between 1 and 100 characters'
    },
    custom: {
      options: async (value) => {
        const tag = await Tag.findOne({ name: value });
        if (tag) {
          throw new Error('Name already in use');
        }
      }
    },
    trim: true
  },
  description: {
    optional: true, 
    isLength: {
      options: { max: 500 },
      errorMessage: 'Description must be at most 500 characters'
    },
    trim: true
  },
  posts: {
    optional: true, 
    isArray: {
      errorMessage: 'Posts must be an array of MongoIDs'
    },
    custom: {
      options: (value) => {
        return value.every(post => mongoose.Types.ObjectId.isValid(post));
      },
      errorMessage: 'Each post must be a valid MongoID'
    }
  }
};

const tagUpdateValidation = {
  name: {
    optional: true, 
    notEmpty: {
      errorMessage: 'Name cannot be empty'
    },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'Name must be between 1 and 100 characters'
    },
    custom: {
      options: async (value, { req }) => {
        const tag = await Tag.findOne({ name: value });
        if (tag && tag._id.toString() !== req.params.id) {
          throw new Error('Name already in use');
        }
      }
    },
    trim: true
  },
  description: {
    optional: true, 
    isLength: {
      options: { max: 500 },
      errorMessage: 'Description must be at most 500 characters'
    },
    trim: true
  },
  posts: {
    optional: true, 
    isArray: {
      errorMessage: 'Posts must be an array of MongoIDs'
    },
    custom: {
      options: (value) => {
        return value.every(post => mongoose.Types.ObjectId.isValid(post));
      },
      errorMessage: 'Each post must be a valid MongoID'
    }
  }
};

module.exports = { tagValidation, tagUpdateValidation };
