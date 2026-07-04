import React, { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api.js';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('stockflow_token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('stockflow_user') || 'null'));
  const saveAuth = (data) => { localStorage.setItem('stockflow_token', data.token); localStorage.setItem('stockflow_user', JSON.stringify(data.user)); setToken(data.token); setUser(data.user); };
  const signup = async (payload) => saveAuth((await api.post('/auth/signup', payload)).data);
  const login = async (payload) => saveAuth((await api.post('/auth/login', payload)).data);
  const logout = () => { localStorage.removeItem('stockflow_token'); localStorage.removeItem('stockflow_user'); setToken(null); setUser(null); };
  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token), signup, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
