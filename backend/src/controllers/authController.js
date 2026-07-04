import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get, run } from '../config/db.js';

const tokenFor = (user) => jwt.sign({ id: user.id, email: user.email, organizationId: user.organization_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const signup = async (req, res) => {
  try {
    const { email, password, organizationName } = req.body;
    if (!email || !password || !organizationName) return res.status(400).json({ message: 'Email, password and organization name are required.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    const existing = await get('SELECT id FROM users WHERE lower(email)=lower(?)', [email]);
    if (existing) return res.status(409).json({ message: 'Email already registered.' });
    const org = await run('INSERT INTO organizations (name) VALUES (?)', [organizationName.trim()]);
    const hash = await bcrypt.hash(password, 10);
    const userResult = await run('INSERT INTO users (email, password_hash, organization_id) VALUES (?, ?, ?)', [email.trim().toLowerCase(), hash, org.id]);
    const user = { id: userResult.id, email: email.trim().toLowerCase(), organization_id: org.id };
    res.status(201).json({ token: tokenFor(user), user: { id: user.id, email: user.email, organizationId: org.id, organizationName } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
    const user = await get(`SELECT users.*, organizations.name AS organization_name FROM users JOIN organizations ON organizations.id=users.organization_id WHERE lower(users.email)=lower(?)`, [email]);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json({ token: tokenFor(user), user: { id: user.id, email: user.email, organizationId: user.organization_id, organizationName: user.organization_name } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const me = async (req, res) => {
  const user = await get(`SELECT users.id, users.email, organizations.id AS organizationId, organizations.name AS organizationName FROM users JOIN organizations ON organizations.id=users.organization_id WHERE users.id=?`, [req.user.id]);
  res.json({ user });
};
