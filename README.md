# Inventory Management System

A full-stack Inventory Management System built using **Next.js**, **Node.js**, **Express.js**, **MySQL**, and **Prisma**. The application allows users to manage products, inventory, orders, and stock history while maintaining accurate stock levels through automatic stock updates.

---

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Sonner (Toast Notifications)

### Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt
- Express Validator

### Database

- MySQL

---

# Features

## Authentication

- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

---

## Product Management

- Create Product
- Update Product
- Delete Product
- View Products
- Product Search
- Product Pagination
- Unique SKU Validation

---

## Stock Management

- Add Stock
- Update Current Stock Automatically
- Prevent Negative Stock
- Create Stock History on Every Stock Addition

---

## Order Management

- Create Order
- Multiple Products Per Order
- Automatic Stock Deduction
- View Orders
- View Order Details

---

## Order Cancellation

- Cancel Existing Order
- Restore Product Stock
- Record Stock History

---

## Stock History

Tracks every inventory movement:

- Stock Added
- Order Placed
- Order Cancelled

Each history record stores:

- Product
- Action
- Quantity
- Previous Stock
- New Stock
- Date & Time

---

## Dashboard

Displays:

- Total Products
- Total Orders
- Total Stock
- Recent Orders
- Recent Stock Activities

---

# Business Rules

- Stock can never become negative.
- Every stock movement creates a history record.
- Order placement deducts stock automatically.
- Order cancellation restores stock automatically.
- SKU must be unique.
- JWT Authentication is required for protected APIs.
- Database transactions are used for data consistency.

---

# Project Structure

```
Inventory-Management-System

├── backend
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── validations
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   └── package.json
│
└── README.md
```

---

# Database Tables

- User
- Product
- Order
- OrderItem
- StockHistory

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file.

```env
PORT=5000

DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/inventory_db"

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=1d
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Start Backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# API Modules

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
```

---

## Products

```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Stock

```
POST   /api/stock/add
GET    /api/stock/history
```

---

## Orders

```
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/cancel
```

---

## Dashboard

```
GET    /api/dashboard
```

---

# Authentication

After login, JWT Token must be included in every protected request.

```
Authorization: Bearer <token>
```

---

# Frontend Pages

- Login
- Dashboard
- Products
- Inventory
- Orders
- Stock History

---

# Validation

### Product

- SKU Required
- SKU Unique
- Price > 0

### Stock

- Quantity > 0

### Orders

- Quantity > 0
- Stock Availability Check

---

# Assignment Deliverables

- Backend Source Code
- Frontend Source Code
- Database Schema
- API Documentation
- Postman Collection
- README

---

# Future Improvements

- User Roles (Admin / Staff)
- Low Stock Notifications
- Export Orders to Excel/PDF
- Product Categories
- Customer Management
- Analytics Dashboard
- Image Upload for Products

---

# Author

**Prakash Deep Sharma**

Inventory Management System Assignment
