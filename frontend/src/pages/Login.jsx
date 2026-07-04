import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Login(){
 const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const {login}=useAuth(); const nav=useNavigate();
 const submit=async(e)=>{e.preventDefault();setError('');setLoading(true);try{await login(form);nav('/dashboard')}catch(err){setError(err.response?.data?.message||'Login failed')}finally{setLoading(false)}};
 return <div className="min-h-screen grid place-items-center p-4"><form onSubmit={submit} className="card w-full max-w-md space-y-4"><h1 className="text-3xl font-bold">Login</h1><p className="text-slate-600">Access your inventory dashboard.</p>{error&&<div className="rounded bg-red-100 p-3 text-red-700">{error}</div>}<input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button disabled={loading} className="btn w-full">{loading?'Logging in...':'Login'}</button><p className="text-center text-sm">No account? <Link className="text-blue-600 font-semibold" to="/signup">Signup</Link></p></form></div>
}
