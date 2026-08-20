const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const { requireAuth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/:id', async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate('author', 'username displayName avatar bio')
      .populate('replies.author', 'username displayName avatar');
    if (!thread) return res.status(404).render('404');
    res.render('thread-detail', { thread });
  } catch (err) {
    console.error(err);
    res.status(404).render('404');
  }
});

router.post('/', requireAuth, upload.single('media'), async (req, res) => {
  try {
    await Thread.create({
      author: req.session.user.id,
      content: req.body.content,
      media: req.file ? req.file.path : ''
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.post('/:id/like', requireAuth, async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) return res.status(404).json({ error: 'Not found' });
  const userId = req.session.user.id;
  const liked = thread.likes.map(String).includes(String(userId));
  if (liked) thread.likes.pull(userId);
  else thread.likes.push(userId);
  await thread.save();
  res.json({ likes: thread.likes.length, liked: !liked });
});

router.post('/:id/reply', requireAuth, async (req, res) => {
  if (!req.body.content || !req.body.content.trim()) return res.redirect('/threads/' + req.params.id);
  await Thread.findByIdAndUpdate(req.params.id, {
    $push: { replies: { author: req.session.user.id, content: req.body.content.trim() } }
  });
  res.redirect('/threads/' + req.params.id);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (thread && thread.author.toString() === req.session.user.id) await thread.deleteOne();
  res.redirect('/');
});

module.exports = router;
