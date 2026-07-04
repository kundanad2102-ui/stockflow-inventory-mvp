<<<<<<< HEAD
# StockFlow MVP - SaaS Inventory Management System

This project follows the technical assessment PRD for a 6-hour MVP inventory app.

## Implemented requirements

- Signup and login
- Signup requires email, password, organization name
- Organization is created during signup
- User is linked to one organization
- One user per organization MVP design
- Product CRUD: add, view, edit, delete
- Product fields: name, SKU, description, quantity, cost price, selling price, low stock threshold, created date, updated date
- Delete confirmation in frontend
- Dashboard: total products, total quantity, low-stock products
- Low stock rule: quantity <= product threshold, or organization default threshold if product threshold is empty
- Settings page: default low stock threshold
- Search products by product name or SKU
- Multi-tenancy: every product query is filtered by organization_id

## Tech stack

Backend:
- Node.js
- Express.js
- SQLite
- JWT
- bcryptjs

Frontend:
- React + Vite
- Tailwind CSS
- React Router DOM
- Axios

## Backend setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

For Mac/Linux:

```bash
cp .env.example .env
```

Backend runs on:

```text
http://localhost:5000
```

## Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

For Mac/Linux:

```bash
cp .env.example .env
```

Frontend runs on:

```text
http://localhost:5173
```

## Test flow

1. Open http://localhost:5173
2. Signup using email, password and organization name.
3. Dashboard opens.
4. Add a product.
5. View products.
6. Edit the product.
7. Delete the product.
8. Add a product with quantity lower than threshold and check dashboard.
9. Update default threshold from Settings.
10. Signup with another email and organization to confirm tenant isolation.

## API routes

Auth:
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me

Products:
- GET /api/products
- POST /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id

Dashboard:
- GET /api/dashboard

Settings:
- GET /api/settings
- PUT /api/settings

## Notes

This MVP intentionally excludes employees, roles, purchase orders, suppliers, images, reports, charts, billing, payment integration, CSV upload, and warehouse management because they are out of scope in the PRD.
=======
# stockflow-inventory-mvp
>>>>>>> 95a829d0bb206dcd14cc62adb4b8f00d2b455272
