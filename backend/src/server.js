import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import { initDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import productRoutes from './routes/productRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing in .env');
  process.exit(1);
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);

const port = process.env.PORT || 5000;
initDb().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((error) => {
  console.error('Database initialization failed:', error.message);
  process.exit(1);
});
