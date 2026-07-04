import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function ProtectedRoute({ children }) { return useAuth().isAuthenticated ? children : <Navigate to="/login" replace />; }
