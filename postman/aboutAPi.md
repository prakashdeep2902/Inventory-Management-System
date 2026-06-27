Based on your Postman collection, here are the **full API URLs**, **HTTP methods**, and the **expected response** for each endpoint.

| Module        | Method | Full URL                                             | Expected Response                                            |
| ------------- | ------ | ---------------------------------------------------- | ------------------------------------------------------------ |
| **Auth**      | POST   | `http://localhost:5000/api/auth/register`            | Register a new user successfully                             |
| **Auth**      | POST   | `http://localhost:5000/api/auth/login`               | Login successful, returns JWT token                          |
| **Auth**      | GET    | `http://localhost:5000/api/auth/profile`             | Returns logged-in user's profile                             |
| **Products**  | GET    | `http://localhost:5000/api/products/get`             | Returns all products                                         |
| **Products**  | GET    | `http://localhost:5000/api/products/:id`             | Returns a single product by ID                               |
| **Products**  | POST   | `http://localhost:5000/api/products`                 | Creates a new product                                        |
| **Products**  | PUT    | `http://localhost:5000/api/products/:id`             | Updates an existing product                                  |
| **Products**  | DELETE | `http://localhost:5000/api/products/:id`             | Deletes the specified product                                |
| **Stock**     | POST   | `http://localhost:5000/api/stock/in`                 | Adds stock to a product and records history                  |
| **Stock**     | POST   | `http://localhost:5000/api/stock/out`                | Removes stock from a product and records history             |
| **Stock**     | GET    | `http://localhost:5000/api/stock/history`            | Returns complete stock transaction history                   |
| **Stock**     | GET    | `http://localhost:5000/api/stock/history/:productId` | Returns stock history for a specific product                 |
| **Orders**    | POST   | `http://localhost:5000/api/orders`                   | Creates a new order and updates stock                        |
| **Orders**    | PATCH  | `http://localhost:5000/api/orders/:id/cancel`        | Cancels an order and restores stock                          |
| **Dashboard** | GET    | `http://localhost:5000/api/dashboard`                | Returns dashboard statistics (products, orders, stock, etc.) |

---

## Sample Success Responses

### Register

```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "id": 1,
    "name": "Prakash",
    "email": "prakash@example.com"
  }
}
```

### Login

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "name": "Prakash",
    "email": "prakash@example.com",
    "role": "STAFF"
  }
}
```

### Profile

```json
{
  "success": true,
  "message": "Profile fetched successfully.",
  "data": {
    "id": 1,
    "name": "Prakash",
    "email": "prakash@example.com",
    "role": "STAFF"
  }
}
```

### Get Products

```json
{
  "success": true,
  "message": "Products fetched successfully.",
  "data": []
}
```

### Get Product By ID

```json
{
  "success": true,
  "message": "Product fetched successfully.",
  "data": {}
}
```

### Create Product

```json
{
  "success": true,
  "message": "Product created successfully.",
  "data": {}
}
```

### Update Product

```json
{
  "success": true,
  "message": "Product updated successfully.",
  "data": {}
}
```

### Delete Product

```json
{
  "success": true,
  "message": "Product deleted successfully."
}
```

### Stock In

```json
{
  "success": true,
  "message": "Stock added successfully.",
  "data": {}
}
```

### Stock Out

```json
{
  "success": true,
  "message": "Stock removed successfully.",
  "data": {}
}
```

### Get Stock History

```json
{
  "success": true,
  "message": "Stock history fetched successfully.",
  "data": []
}
```

### Get Stock History By Product

```json
{
  "success": true,
  "message": "Stock history fetched successfully.",
  "data": []
}
```

### Create Order

```json
{
  "success": true,
  "message": "Order created successfully.",
  "data": {}
}
```

### Cancel Order

```json
{
  "success": true,
  "message": "Order cancelled successfully.",
  "data": {}
}
```

### Dashboard

```json
{
  "success": true,
  "message": "Dashboard data fetched successfully.",
  "data": {
    "totalProducts": 0,
    "totalOrders": 0,
    "totalStock": 0,
    "lowStockProducts": 0
  }
}
```

This provides all **15 APIs** with:

- ✅ HTTP Method
- ✅ Full URL
- ✅ Expected success response
- ✅ Brief description of what each API returns.
