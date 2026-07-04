import React,{useEffect,useState} from 'react';
import Layout from '../components/Layout.jsx';
import api from '../services/api.js';
export default function Dashboard(){
 const [data,setData]=useState({totalProducts:0,totalQuantity:0,lowStockItems:[]});
 useEffect(()=>{api.get('/dashboard').then(r=>setData(r.data))},[]);
 return <Layout><h1 className="text-3xl font-bold">Dashboard</h1><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="card"><p className="text-slate-500">Total Products</p><h2 className="text-4xl font-bold">{data.totalProducts}</h2></div><div className="card"><p className="text-slate-500">Total Quantity</p><h2 className="text-4xl font-bold">{data.totalQuantity}</h2></div><div className="card"><p className="text-slate-500">Low Stock Items</p><h2 className="text-4xl font-bold">{data.lowStockItems.length}</h2></div></div><div className="card mt-6"><h2 className="text-xl font-bold">Low Stock Products</h2><div className="mt-4 overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b"><th className="py-2">Name</th><th>SKU</th><th>Quantity</th><th>Threshold</th></tr></thead><tbody>{data.lowStockItems.map(p=><tr key={p.id} className="border-b"><td className="py-2">{p.name}</td><td>{p.sku}</td><td>{p.quantity}</td><td>{p.threshold}</td></tr>)}{data.lowStockItems.length===0&&<tr><td colSpan="4" className="py-4 text-slate-500">No low-stock products.</td></tr>}</tbody></table></div></div></Layout>
}
