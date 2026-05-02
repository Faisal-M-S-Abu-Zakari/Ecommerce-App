# Faisal — E-Commerce App

## Overview

A full-stack e-commerce application for a clothing store ("Faisal"), featuring a customer-facing storefront, a Node/Express REST API backend, and a separate React admin panel.

## Project Structure

```
/
├── frontend/     # React + Vite customer storefront (port 5000)
├── backend/      # Node.js + Express REST API (port 3000)
└── admin/        # React + Vite admin dashboard (port 5174)
```

## Architecture

- **Frontend**: React 19 + Vite + TailwindCSS v4. Handles product browsing, cart, checkout, orders, auth. Uses Vite dev proxy to forward `/api` requests to the backend.
- **Backend**: Express 5 + Mongoose. Connects to MongoDB Atlas. Handles user auth (JWT), products, orders, comments, and file uploads via Cloudinary/Multer.
- **Admin**: React 19 + Vite + TailwindCSS v3. Separate admin panel for managing products, orders, and comments. Uses `VITE_BACKEND_URL` env var to reach the backend.

## Workflows

- **Start application** — `cd frontend && npm run dev` — port 5000 (webview)
- **Backend API** — `cd backend && node server.js` — port 3000 (console)

## Environment Variables / Secrets

| Key | Description |
|-----|-------------|
| `MONGODB_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PORT` | Backend server port (set to 3000) |

## Key Notes

- `MONGODB_URL` was saved with surrounding quotes — `mongoDB.js` strips them via `.replace(/^["']|["']$/g, "")`.
- Frontend uses Vite's dev proxy (`/api` → `http://localhost:3000`) so API calls work in development with relative URLs.
- Admin panel has its own `VITE_BACKEND_URL` env var — needs to be set if running admin locally.
- Backend uses port 3000 (not the original 4000, which isn't available on Replit).

## Dependencies

- Frontend: React, React Router DOM, TailwindCSS v4 (via `@tailwindcss/vite`), EmailJS, React Toastify
- Backend: Express, Mongoose, bcrypt, JWT, Cloudinary, Multer, Razorpay, Stripe, Validator
- Admin: React, React Router DOM, Axios, TailwindCSS v3, React Toastify
