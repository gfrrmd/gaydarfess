const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => res.render('auth/login', { error: null }));
router.get('/register', (req, res) => res.render('auth/register', { error: null }));

router.post('/register', async (req, res) => {
  const { username, displayName, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.render('auth/register', { error: 'Username sudah dipakai.' });
    const user = await User.create({ username, displayName, password });
    req.session.user = { id: user._id, username: user.username, avatar: user.avatar, displayName: user.displayName };
    res.redirect('/');
  } catch (err) {
    res.render('auth/register', { error: 'Terjadi kesalahan.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.render('auth/login', { error: 'Username atau password salah.' });
    req.session.user = { id: user._id, username: user.username, avatar: user.avatar, displayName: user.displayName };
    res.redirect('/');
  } catch (err) {
    res.render('auth/login', { error: 'Terjadi kesalahan.' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
