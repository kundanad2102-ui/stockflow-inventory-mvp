import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import ProductForm from './pages/ProductForm.jsx';
import Products from './pages/Products.jsx';
import Settings from './pages/Settings.jsx';
import Signup from './pages/Signup.jsx';
export default function App(){
 return <Routes><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/><Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/><Route path="/products/add" element={<ProtectedRoute><ProductForm/></ProtectedRoute>}/><Route path="/products/edit/:id" element={<ProtectedRoute><ProductForm/></ProtectedRoute>}/><Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/></Routes>
}
