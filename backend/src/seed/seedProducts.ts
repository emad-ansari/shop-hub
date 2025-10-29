import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from "../lib/db";
import { ProductModel } from "../models/Product";

const products = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: 79.99,
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
		description: "Premium sound quality with noise cancellation",
	},
	{
		id: 2,
		name: "Smart Watch",
		price: 199.99,
		image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
		description: "Track your fitness and stay connected",
	},
	{
		id: 3,
		name: "Laptop Backpack",
		price: 49.99,
		image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
		description: "Durable and stylish for everyday use",
	},
	{
		id: 4,
		name: "Coffee Maker",
		price: 89.99,
		image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80",
		description: "Brew perfect coffee every morning",
	},
	{
		id: 5,
		name: "Running Shoes",
		price: 129.99,
		image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
		description: "Comfortable and lightweight design",
	},
	{
		id: 6,
		name: "Desk Lamp",
		price: 39.99,
		image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
		description: "Adjustable LED lighting for your workspace",
	},
	{
		id: 7,
		name: "Yoga Mat",
		price: 29.99,
		image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
		description: "Non-slip surface for all your exercises",
	},
	{
		id: 8,
		name: "Water Bottle",
		price: 24.99,
		image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
		description: "Insulated stainless steel construction",
	},
];

async function run() {
  try {
    await connectDB();
    for (const p of products) {
      await ProductModel.updateOne(
        { id: p.id },
        { $set: p },
        { upsert: true }
      );
    }
    console.log(`Seeded ${products.length} products`);
    process.exit(0);
    
  }
  catch(error: any) {
    throw new Error(error);
  }
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
