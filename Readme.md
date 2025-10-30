🛒 Mock E-Commerce Cart App

A simple full-stack shopping cart application built for Vibe Commerce’s Full Stack Assignment.
It demonstrates complete integration between frontend, backend, and database using modern web technologies.

🚀 Tech Stack

Frontend: React + TypeScript + TailwindCSS
Backend: Node.js + Express + TypeScript
Database: MongoDB (Mongoose ODM)
API Style: REST APIs

📦 Features

Fetch and display mock products

Add or remove items from the cart

View cart items with real-time total

Perform a mock checkout (creates order in DB)

Responsive and clean UI

Type-safe backend and modular folder structure

⚙️ Backend API Endpoints
Method	Endpoint	Description
GET	/api/products	Get list of mock products
GET	/api/cart	View current cart and total
POST	/api/cart	Add an item to the cart
DELETE	/api/cart/:id	Remove an item from the cart
POST	/api/checkout	Create mock order and clear cart

🧠 The cart is stored in-memory for demo purposes since no authentication system is used.
Products and orders are stored in MongoDB.

🗂 Folder Structure
src/
 ├─ models/
 │   ├─ product.ts
 │   └─ order.ts
 ├─ data/
 │   └─ cartData.ts
 ├─ routes/
 │   ├─ productRoutes.ts
 │   ├─ cartRoutes.ts
 │   └─ checkoutRoute.ts
 ├─ lib/
 │   └─ db.ts
 ├─ seed/
 │   └─ seedProducts.ts
 └─ server.ts

🧩 Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/emad-ansari/shop-hub.git
cd mock-ecom-cart

2️⃣ Install dependencies

For both backend and frontend:

cd backend
npm install

cd ../frontend
npm install

4️⃣ Seed mock products (optional)
npm run seed

5️⃣ Start the backend server
npm run dev

6️⃣ Start the frontend
npm start

🧾 Demo Flow

View products on the main page

Add items to cart

View cart page with total and quantity updates

Proceed to checkout — creates mock order and shows a receipt

🎥 Demo Video

👉 Watch the demo here: Demo Video Link

(https://www.loom.com/share/987700190157435894fd1429bb1b9d36)

📘 Author

Mohammad Emad
Full Stack Developer | Node.js • React • TypeScript • MongoDB
LinkedIn
 | GitHub