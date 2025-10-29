import { Router } from 'express';
import { ProductModel } from '../models/Product.js';

const router = Router();


router.get('/', async (_req, res) => {
  const products = await ProductModel.find({}).sort({ id: 1 }).lean();
  res.json(products);
});

export default router;


