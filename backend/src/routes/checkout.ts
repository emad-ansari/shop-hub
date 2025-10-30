import express, { Request, Response } from 'express';
import { clearCart, getCart } from '../lib/cartData';


const router = express.Router();

router.post('/checkout', (req: Request, res: Response) => {
  console.log('CHECKOUT POST BODY:', req.body);
  const { name, email, cartItems } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart items are required' });
  }

  for (const item of cartItems) {
    if (
      typeof item.id === 'undefined' ||
      typeof item.name !== 'string' ||
      typeof item.price !== 'number' ||
      typeof item.quantity !== 'number' ||
      item.quantity < 1
    ) {
      return res.status(400).json({ message: 'Invalid cart item structure', item });
    }
  }
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return res.status(200).json({
    receipt: {
      name,
      email,
      total,
      items: cartItems,
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
