# SevenBites Backend API

Express + MongoDB backend for the SevenBites food delivery app.

## Tech Stack
- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — Database (use MongoDB Compass to view data)
- **JWT** — Authentication
- **bcryptjs** — Password hashing

## Quick Start

### 1. Install dependencies
```bash
cd sevenbites-backend
npm install
```

### 2. Make sure MongoDB is running
Open **MongoDB Compass** → connect to `mongodb://localhost:27017`  
(MongoDB service must be running on your machine)

### 3. Seed the database
```bash
npm run seed
```
This creates 10 restaurants, full menus, and a demo user.

### 4. Start the server
```bash
npm run dev       # development (auto-restart with nodemon)
npm start         # production
```

Server runs at: **http://localhost:5000**

---

## Demo Credentials
```
Email:    demo@sevenbites.com
Password: demo123
```

---

## API Endpoints

### Auth
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login |
| GET | /api/auth/profile | ✅ | Get current user |
| PUT | /api/auth/profile | ✅ | Update profile |

### Restaurants
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/restaurants | ❌ | All restaurants (with ?category=Pizza&sort=rating) |
| GET | /api/restaurants/search?q=biryani | ❌ | Search restaurants |
| GET | /api/restaurants/:id | ❌ | Single restaurant |

### Menu
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/menu/:restaurantId | ❌ | Menu for a restaurant |

### Orders
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/orders | ✅ | Place order |
| GET | /api/orders/my-orders | ✅ | User's order history |
| GET | /api/orders/:id | ✅ | Single order |
| PUT | /api/orders/:id/cancel | ✅ | Cancel order |

### Address
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/address | ✅ | All addresses |
| POST | /api/address | ✅ | Add address |
| DELETE | /api/address/:id | ✅ | Delete address |
| PUT | /api/address/:id/default | ✅ | Set as default |

### Reviews
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/reviews | ✅ | Add review |
| GET | /api/reviews/:restaurantId | ❌ | Get reviews |

---

## Connecting Frontend

In your React Native app, `src/utils/constants.js`:
```js
export const BASE_URL = 'http://localhost:5000/api';
// OR for physical device on same WiFi:
export const BASE_URL = 'http://YOUR_LOCAL_IP:5000/api';
```

To find your local IP:
- **Mac/Linux**: `ifconfig | grep "inet "`
- **Windows**: `ipconfig`

---

## MongoDB Compass

After seeding, open Compass and connect to `mongodb://localhost:27017`

You'll see the **sevenbites** database with collections:
- `users` — registered users
- `restaurants` — 10 restaurants with full details
- `menuitems` — all menu items per restaurant
- `orders` — placed orders
- `addresses` — saved delivery addresses
- `reviews` — restaurant reviews

---

## Environment Variables (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/sevenbites
JWT_SECRET=sevenbites_super_secret_jwt_key_2024
JWT_EXPIRE=30d
NODE_ENV=development
```
