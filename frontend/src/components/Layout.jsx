import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Layout({ children }) {
 const { user, logout } = useAuth(); const navigate = useNavigate();
 const nav = 'block rounded-lg px-3 py-2 font-medium'; const active = ({isActive}) => `${nav} ${isActive?'bg-blue-600 text-white':'text-slate-200 hover:bg-slate-700'}`;
 return <div className="min-h-screen md:flex">
  <aside className="bg-slate-900 text-white md:w-64 p-5">
   <Link to="/dashboard" className="text-2xl font-bold">StockFlow</Link>
   <p className="mt-1 text-sm text-slate-300">{user?.organizationName}</p>
   <nav className="mt-8 space-y-2"><NavLink className={active} to="/dashboard">Dashboard</NavLink><NavLink className={active} to="/products">Products</NavLink><NavLink className={active} to="/settings">Settings</NavLink></nav>
   <button className="mt-8 w-full rounded-lg bg-red-600 px-3 py-2 font-semibold" onClick={()=>{logout();navigate('/login')}}>Logout</button>
  </aside>
  <main className="flex-1 p-6 md:p-8">{children}</main>
 </div>;
}
