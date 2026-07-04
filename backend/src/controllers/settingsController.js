import { get, run } from '../config/db.js';
export const getSettings = async (req, res) => {
  const org = await get('SELECT name AS organizationName, default_low_stock_threshold AS defaultLowStockThreshold FROM organizations WHERE id=?', [req.user.organizationId]);
  res.json(org);
};
export const updateSettings = async (req, res) => {
  const threshold = Number(req.body.defaultLowStockThreshold);
  if (!Number.isInteger(threshold) || threshold < 0) return res.status(400).json({ message: 'Threshold must be a non-negative integer.' });
  await run('UPDATE organizations SET default_low_stock_threshold=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', [threshold, req.user.organizationId]);
  res.json(await get('SELECT name AS organizationName, default_low_stock_threshold AS defaultLowStockThreshold FROM organizations WHERE id=?', [req.user.organizationId]));
};
