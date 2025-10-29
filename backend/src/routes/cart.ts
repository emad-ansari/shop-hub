import { Router, Request, Response } from 'express';
import { addToCart, getCart, removeFromCart } from '../lib/cartData';
const router = Router();

router.get('/api/cart', (req: Request, res: Response) => {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total });
});


router.post('/api/cart', (req: Request, res: Response) => {
  const item = req.body;
  addToCart(item);
  res.status(201).json({ message: 'Item added to cart', item });
});

router.delete('/api/cart/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  removeFromCart(id);
  res.json({ message: 'Item removed from cart' });
});

export default router;