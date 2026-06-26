# Inventory Management System

A full-stack Inventory Management System built as a technical assignment.

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js (JavaScript)

### Database

- MySQL
- Prisma ORM v6

### Authentication

- JWT (Planned)
- bcrypt (Planned)

### API Testing

- Postman

---

## Project Progress

### ✅ Step 1: Project Planning

- Designed the overall project architecture.
- Identified modules based on assignment requirements.
- Planned folder structure for frontend and backend.

### ✅ Step 2: Frontend Setup

- Created Next.js project using App Router.
- Configured TypeScript.
- Installed and configured Tailwind CSS.

### ✅ Step 3: Database Design

Designed the database schema for:

- Users
- Products
- Orders
- Order Items
- Stock History

Defined relationships between entities to support inventory operations.

### ✅ Step 4: Backend Setup

- Initialized Express.js project.
- Created modular folder structure.
- Configured environment variables.
- Installed required dependencies.

### ✅ Step 5: Express Configuration

- Configured Express server.
- Added middleware:
  - express.json()
  - CORS
  - dotenv
- Verified server startup.

### ✅ Step 6: Prisma & MySQL Configuration

- Installed Prisma ORM v6.
- Connected Prisma to MySQL.
- Configured `.env` with database connection.
- Generated Prisma Client.

### ✅ Step 7: Prisma Database Models

Created database models for:

- User
- Product
- Order
- OrderItem
- StockHistory

Implemented:

- Enums
- Relationships
- Primary Keys
- Foreign Keys
- Timestamps

### ✅ Step 8: Database Migration

- Created MySQL tables using Prisma Migration.
- Generated Prisma Client successfully.
- Verified database schema.

---

## Assignment Features (Planned)

- User Authentication (JWT)
- Role-Based Authorization
- Product Management
- Stock Management
- Order Management
- Order Cancellation
- Stock History
- Dashboard
- Database Transactions
- Prevent Negative Stock
- RESTful APIs
- Responsive Frontend

---

## Current Status

✔ Project structure completed

✔ Database connected

✔ Prisma configured

✔ Database schema created

🔄 Authentication module in progress

---

## Project Structure

```text
inventory-management-system/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── .env
│
└── README.md
```
