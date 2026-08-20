const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');

router.get('/', async (req, res) => {
  try {
    const threads = await Thread.find()
      .populate('author', 'username displayName avatar')
      .populate('replies.author', 'username avatar displayName')
      .sort({ createdAt: -1 })
      .limit(50);
    res.render('index', { threads });
  } catch (err) {
    console.error(err);
    res.render('index', { threads: [] });
  }
});

module.exports = router;
