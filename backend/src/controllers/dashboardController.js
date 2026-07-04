import { all, get } from '../config/db.js';
export const dashboard = async (req, res) => {
  const org = await get('SELECT default_low_stock_threshold FROM organizations WHERE id=?', [req.user.organizationId]);
  const summary = await get('SELECT COUNT(*) AS totalProducts, COALESCE(SUM(quantity),0) AS totalQuantity FROM products WHERE organization_id=?', [req.user.organizationId]);
  const lowStockItems = await all(`SELECT id,name,sku,quantity,COALESCE(low_stock_threshold, ?) AS threshold FROM products WHERE organization_id=? AND quantity <= COALESCE(low_stock_threshold, ?) ORDER BY quantity ASC`, [org.default_low_stock_threshold, req.user.organizationId, org.default_low_stock_threshold]);
  res.json({ totalProducts: summary.totalProducts, totalQuantity: summary.totalQuantity, lowStockItems });
};
