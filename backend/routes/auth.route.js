import express from 'express';
import dotenv from 'dotenv';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  register,
  login,
  addVisited,
  removeVisited,
  getVisited,
  addWishlist,
  removeWishlist,
  getWishlist,
} from '../controllers/user.controller.js';

dotenv.config();

const router = express.Router();

// public
router.post('/register', register);
router.post('/login', login);

router.post('/visited', authMiddleware, addVisited);
router.delete('/visited', authMiddleware, removeVisited);
router.get('/visited', authMiddleware, getVisited);

router.post('/wishlist', authMiddleware, addWishlist);
router.delete('/wishlist', authMiddleware, removeWishlist);
router.get('/wishlist', authMiddleware, getWishlist);

export default router;
