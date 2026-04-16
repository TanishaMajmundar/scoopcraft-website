# 🍦 Mithas - Indian Ice Cream Store

A full-stack MERN (MongoDB, Express, React, Node.js) Indian ice cream e-commerce web application with a cute pink theme, UPI payments, JWT authentication, and React frontend.

---

## 🗂️ Project Structure

```
icecream-store/
├── backend/
│   ├── models/
│   │   ├── User.js         ← Mongoose schema
│   │   ├── Product.js      ← Mongoose schema
│   │   └── Order.js        ← Mongoose schema
│   ├── routes/
│   │   ├── authRoutes.js   ← Register, Login, Profile
│   │   ├── productRoutes.js← CRUD + Multer image upload
│   │   ├── orders.js       ← Place & track orders
│   │   └── payment.js      ← UPI + COD mock payment
│   ├── middleware/
│   │   ├── authMiddleware.js ← JWT verification
│   │   └── upload.js       ← Multer config
│   ├── uploads/            ← Product images stored here
│   ├── server.js           ← Express + MongoDB entry point
│   └── .env
└── frontend/
    └── src/
        ├── context/AppContext.jsx  ← Global state (auth, cart)
        ├── api.js                  ← Axios + JWT interceptor
        ├── components/             ← Navbar, Footer
        └── pages/                  ← All React pages
```

---

## ✅ Lab Manual Requirements Covered

| Step | Feature | File | Status |
|------|---------|------|--------|
| 1 | Basic Express Server | server.js | ✅ |
| 2 | MongoDB Connection (Mongoose) | server.js | ✅ |
| 3 | Folder Structure | models/ routes/ middleware/ uploads/ | ✅ |
| 4 | User Model (Mongoose Schema) | models/User.js | ✅ |
| 5 | Register API (bcrypt hash) | routes/authRoutes.js | ✅ |
| 6 | Login API (JWT) | routes/authRoutes.js | ✅ |
| 7 | Auth Middleware (protect routes) | middleware/authMiddleware.js | ✅ |
| 8 | Product Model | models/Product.js | ✅ |
| 9 | Image Upload (Multer) | routes/productRoutes.js | ✅ |
| 10 | Mock Payment API | server.js + routes/payment.js | ✅ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally on port 27017)

### 1. Start MongoDB
```bash
mongod
# or on Windows: net start MongoDB
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
# → http://localhost:5000
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm start
# → http://localhost:3000
```

> 🍦 The backend auto-seeds 8 Indian ice cream products on first run!

---

## 🔑 Features

- **JWT Authentication** — Register/Login with bcryptjs password hashing
- **Protected Routes** — authMiddleware.js guards product/order endpoints
- **Image Upload** — Multer saves product images to /uploads
- **MongoDB** — Mongoose schemas for User, Product, Order
- **UPI Payment** — Mock UPI initiation + verification (PhonePe, GPay, Paytm)
- **Cash on Delivery** — COD order confirmation
- **React Frontend** — ProductList, ProductDetail, Cart, Checkout pages
- **Context API** — Global cart + auth state management
- **Axios** — API calls with auto JWT header injection

---

## 📮 API Endpoints

### Auth (`/api/auth`)
```
POST /register   Body: { name, email, password, phone }
POST /login      Body: { email, password } → returns JWT token
GET  /profile    Header: Authorization: Bearer <token>
```

### Products (`/api/products`)
```
GET    /                   List all (supports ?category=&search=)
GET    /:id                Get single product
POST   /                   Create with image (protected, multipart/form-data)
PUT    /:id                Update (protected)
DELETE /:id                Delete (protected)
```

### Orders (`/api/orders`)
```
GET   /my                  My orders (protected)
GET   /:id                 Single order (protected)
POST  /                    Place order (protected)
PATCH /:id/status          Update status (protected)
```

### Payment (`/api/payment`)
```
POST /upi/initiate         Initiate UPI (protected)
POST /verify               Verify payment (protected)
POST /cod/confirm          Confirm COD (protected)
POST /api/payment/simple   Simple mock (lab Step 10, no auth)
```

---

## 🧪 Postman Test Flow (Lab Manual Final Test)

1. **Register** → `POST /api/auth/register`
2. **Login** → `POST /api/auth/login` → copy token
3. **Add Product** → `POST /api/products` (use token in Authorization header, multipart/form-data)
4. **Get Products** → `GET /api/products`
5. **Payment** → `POST /api/payment/simple` with `{ "amount": 100 }`

Import `Mithas_API.postman_collection.json` for all pre-built requests.

---

## 🎨 Design

- **Theme**: Cute Indian pink 🌸 with saffron gold accents
- **Fonts**: Playfair Display + Poppins
- **Language**: Hinglish UI (Namaste, Swagat, Mithas मिठास)
- **Mobile**: Fully responsive

---

Made with 💕 in India 🇮🇳 | © 2024 Mithas Ice Cream
