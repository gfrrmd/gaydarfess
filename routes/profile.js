const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Thread = require('../models/Thread');
const { requireAuth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).render('404');

    const threads = await Thread.find({ author: user._id })
      .populate('author', 'username displayName avatar')
      .sort({ createdAt: -1 });

    const replies = await Thread.find({ 'replies.author': user._id })
      .populate('author', 'username displayName avatar')
      .sort({ updatedAt: -1 });

    res.render('profile', { profileUser: user, threads, replies });
  } catch (err) {
    console.error(err);
    res.status(500).render('404');
  }
});

router.post('/edit', requireAuth, upload.single('avatar'), async (req, res) => {
  const update = {
    displayName: req.body.displayName?.trim() || '',
    bio: req.body.bio?.trim() || ''
  };
  if (req.file) update.avatar = req.file.path;
  await User.findByIdAndUpdate(req.session.user.id, update);
  const updated = await User.findById(req.session.user.id);
  req.session.user = {
    id: updated._id,
    username: updated.username,
    avatar: updated.avatar,
    displayName: updated.displayName
  };
  res.redirect('/profile/' + updated.username);
});

module.exports = router;
