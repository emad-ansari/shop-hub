import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db";
import productsRouter from "./routes/products";
import checkoutRouter from "./routes/checkout";
import cartRouter from './routes/cart'


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api', cartRouter);
app.use('/api', checkoutRouter);

const start = async () => {
	await connectDB();
	app.listen(process.env.PORT!, () => {
		console.log(`API listening on http://localhost:${process.env.PORT!}`);
	});
};

start().catch((err) => {
	console.error("Failed to start server", err);
	process.exit(1);
});
