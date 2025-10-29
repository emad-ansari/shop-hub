import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db";
import productsRouter from "./routes/products";
import checkoutRouter from "./routes/checkout";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.use("/api/products", productsRouter);
app.use("/api/checkout", checkoutRouter);

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
