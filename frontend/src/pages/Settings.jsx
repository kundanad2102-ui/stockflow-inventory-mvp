import React,{useEffect,useState} from 'react';
import Layout from '../components/Layout.jsx';
import api from '../services/api.js';
export default function Settings(){
 const [threshold,setThreshold]=useState(5); const [org,setOrg]=useState(''); const [msg,setMsg]=useState(''); const [err,setErr]=useState('');
 useEffect(()=>{api.get('/settings').then(r=>{setThreshold(r.data.defaultLowStockThreshold);setOrg(r.data.organizationName)})},[]);
 const submit=async(e)=>{e.preventDefault();setMsg('');setErr('');try{const r=await api.put('/settings',{defaultLowStockThreshold:Number(threshold)});setThreshold(r.data.defaultLowStockThreshold);setMsg('Settings updated.')}catch(error){setErr(error.response?.data?.message||'Update failed')}};
 return <Layout><h1 className="text-3xl font-bold">Settings</h1><form onSubmit={submit} className="card mt-6 max-w-lg space-y-4"><p className="text-slate-600">Organization: <b>{org}</b></p>{msg&&<div className="rounded bg-green-100 p-3 text-green-700">{msg}</div>}{err&&<div className="rounded bg-red-100 p-3 text-red-700">{err}</div>}<label>Default Low Stock Threshold<input className="input mt-1" type="number" min="0" value={threshold} onChange={e=>setThreshold(e.target.value)}/></label><button className="btn">Save Settings</button></form></Layout>
}
