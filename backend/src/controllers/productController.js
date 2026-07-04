import { all, get, run } from '../config/db.js';

const toIntOrNull = (v) => v === '' || v === undefined || v === null ? null : Number(v);
const toNumberOrNull = (v) => v === '' || v === undefined || v === null ? null : Number(v);

export const listProducts = async (req, res) => {
  const search = `%${(req.query.search || '').trim()}%`;
  const rows = await all(`SELECT * FROM products WHERE organization_id=? AND (name LIKE ? OR sku LIKE ?) ORDER BY created_at DESC`, [req.user.organizationId, search, search]);
  res.json(rows);
};

export const getProduct = async (req, res) => {
  const row = await get('SELECT * FROM products WHERE id=? AND organization_id=?', [req.params.id, req.user.organizationId]);
  if (!row) return res.status(404).json({ message: 'Product not found.' });
  res.json(row);
};

export const createProduct = async (req, res) => {
  try {
    const { name, sku, description } = req.body;
    if (!name || !sku) return res.status(400).json({ message: 'Product name and SKU are required.' });
    const quantity = Number(req.body.quantity ?? 0);
    if (!Number.isInteger(quantity) || quantity < 0) return res.status(400).json({ message: 'Quantity must be a non-negative integer.' });
    const result = await run(`INSERT INTO products (organization_id,name,sku,description,quantity,cost_price,selling_price,low_stock_threshold) VALUES (?,?,?,?,?,?,?,?)`, [req.user.organizationId, name.trim(), sku.trim(), description || '', quantity, toNumberOrNull(req.body.costPrice), toNumberOrNull(req.body.sellingPrice), toIntOrNull(req.body.lowStockThreshold)]);
    res.status(201).json(await get('SELECT * FROM products WHERE id=?', [result.id]));
  } catch (error) {
    if (String(error.message).includes('UNIQUE')) return res.status(409).json({ message: 'SKU must be unique within your organization.' });
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const existing = await get('SELECT id FROM products WHERE id=? AND organization_id=?', [req.params.id, req.user.organizationId]);
    if (!existing) return res.status(404).json({ message: 'Product not found.' });
    const quantity = Number(req.body.quantity ?? 0);
    if (!Number.isInteger(quantity) || quantity < 0) return res.status(400).json({ message: 'Quantity must be a non-negative integer.' });
    await run(`UPDATE products SET name=?, sku=?, description=?, quantity=?, cost_price=?, selling_price=?, low_stock_threshold=?, updated_at=CURRENT_TIMESTAMP WHERE id=? AND organization_id=?`, [req.body.name?.trim(), req.body.sku?.trim(), req.body.description || '', quantity, toNumberOrNull(req.body.costPrice), toNumberOrNull(req.body.sellingPrice), toIntOrNull(req.body.lowStockThreshold), req.params.id, req.user.organizationId]);
    res.json(await get('SELECT * FROM products WHERE id=?', [req.params.id]));
  } catch (error) {
    if (String(error.message).includes('UNIQUE')) return res.status(409).json({ message: 'SKU must be unique within your organization.' });
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const result = await run('DELETE FROM products WHERE id=? AND organization_id=?', [req.params.id, req.user.organizationId]);
  if (!result.changes) return res.status(404).json({ message: 'Product not found.' });
  res.json({ message: 'Product deleted.' });
};
