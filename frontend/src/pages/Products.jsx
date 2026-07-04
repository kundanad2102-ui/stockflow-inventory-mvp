import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import api from '../services/api.js';
export default function Products(){
 const [products,setProducts]=useState([]); const [search,setSearch]=useState(''); const load=()=>api.get('/products',{params:{search}}).then(r=>setProducts(r.data));
 useEffect(()=>{load()},[]);
 const del=async(id)=>{if(confirm('Are you sure you want to delete this product?')){await api.delete(`/products/${id}`);load();}};
 return <Layout><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><h1 className="text-3xl font-bold">Products</h1><Link className="btn text-center" to="/products/add">Add Product</Link></div><div className="card mt-6"><div className="flex gap-2"><input className="input" placeholder="Search by name or SKU" value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')load()}}/><button className="btn" onClick={load}>Search</button></div><div className="mt-4 overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b"><th className="py-2">Name</th><th>SKU</th><th>Quantity</th><th>Low Stock Threshold</th><th>Selling Price</th><th>Actions</th></tr></thead><tbody>{products.map(p=><tr key={p.id} className="border-b"><td className="py-2 font-medium">{p.name}</td><td>{p.sku}</td><td>{p.quantity}</td><td>{p.low_stock_threshold ?? 'Default'}</td><td>{p.selling_price ?? '-'}</td><td className="space-x-2"><Link className="text-blue-600 font-semibold" to={`/products/edit/${p.id}`}>Edit</Link><button className="text-red-600 font-semibold" onClick={()=>del(p.id)}>Delete</button></td></tr>)}{products.length===0&&<tr><td colSpan="6" className="py-4 text-slate-500">No products found.</td></tr>}</tbody></table></div></div></Layout>
}
