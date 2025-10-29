import { Router } from 'express';
import { OrderModel } from '../models/Order.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, total, items } = req.body ?? {};
  if (!name || !email || typeof total !== 'number' || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const order = await OrderModel.create({ name, email, total, items });
    return res.status(201).json({ id: order.id, createdAt: order.createdAt });
  } catch (err) {
    console.error('Checkout error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;


