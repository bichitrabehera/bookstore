const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors())

// ✅ CORS middleware — before any routes
// app.use(cors({
//   origin: 'https://bookstore-seven-peach.vercel.app', // ❗ no trailing slash, not an array
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// ✅ Optional: handles CORS preflight requests
app.options('*', cors());

app.use(express.json());

// ✅ Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Book Store Server is running!");
});

// ✅ MongoDB connection
async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB connected successfully!");
}
main().catch(err => console.log(err));

// ✅ Listen using dynamic Render port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
