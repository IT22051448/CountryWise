import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// User Register
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await new User({ username, email, password: hash }).save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}

// User login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN,
      { expiresIn: '3h' }
    );
    res.json({ token, email: user.email, message: 'Logged in successfully!' });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}

// add country to visited
export async function addVisited(req, res) {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);
    if (!user.visited.includes(name)) {
      user.visited.push(name);
      await user.save();
    }
    res.json({ visited: user.visited });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}

// remove country from visited
export async function removeVisited(req, res) {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);
    user.visited = user.visited.filter((c) => c !== name);
    await user.save();
    res.json({ visited: user.visited });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}

// add country to wishlist
export async function addWishlist(req, res) {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);
    if (!user.wishlist.includes(name)) {
      user.wishlist.push(name);
      await user.save();
    }
    res.json({ wishlist: user.wishlist });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}

// remove country from wishlist
export async function removeWishlist(req, res) {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter((c) => c !== name);
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}

// Get all visited countries of a User
export async function getVisited(req, res) {
  try {
    const user = await User.findById(req.user.id).select('visited');
    res.json({ visited: user.visited });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}

// Get all wishlist countries of a User
export async function getWishlist(req, res) {
  try {
    const user = await User.findById(req.user.id).select('wishlist');
    res.json({ wishlist: user.wishlist });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
}
