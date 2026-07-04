import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
sqlite3.verbose();
const dbFile = process.env.DB_FILE || './src/data/stockflow.sqlite';
const absolutePath = path.resolve(process.cwd(), dbFile);
fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
export const db = new sqlite3.Database(absolutePath);
export const run = (sql, params=[]) => new Promise((resolve,reject)=>db.run(sql, params, function(error){ error ? reject(error) : resolve({id:this.lastID, changes:this.changes}); }));
export const get = (sql, params=[]) => new Promise((resolve,reject)=>db.get(sql, params, (error,row)=> error ? reject(error) : resolve(row)));
export const all = (sql, params=[]) => new Promise((resolve,reject)=>db.all(sql, params, (error,rows)=> error ? reject(error) : resolve(rows)));
export const initDb = async () => {
 await run('PRAGMA foreign_keys = ON');
 await run(`CREATE TABLE IF NOT EXISTS organizations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, default_low_stock_threshold INTEGER NOT NULL DEFAULT 5, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
 await run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, organization_id INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE)`);
 await run(`CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, organization_id INTEGER NOT NULL, name TEXT NOT NULL, sku TEXT NOT NULL, description TEXT, quantity INTEGER NOT NULL DEFAULT 0, cost_price REAL, selling_price REAL, low_stock_threshold INTEGER, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE (organization_id, sku), FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE)`);
};
