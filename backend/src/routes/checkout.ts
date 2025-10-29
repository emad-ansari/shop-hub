import express, { Request, Response } from 'express';
import { clearCart, getCart } from '../lib/cartData';
import { OrderModel } from '../models/Order';


const router = express.Router();

router.post('/api/checkout', async (req: Request, res: Response) => {
  try {
    const cartItems = getCart();
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await OrderModel.create({
      items: cartItems,
      total,
    });

    clearCart(); 

    res.status(201).json({
      message: 'Checkout successful',
      order,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
});

export default router;
