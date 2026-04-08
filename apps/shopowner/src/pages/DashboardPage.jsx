import React, { useState, useEffect } from 'react'
import {
  Bell, Box, ImagePlus, LayoutDashboard, Package, List, BarChart2,
  Settings, ClipboardList, CheckCircle, AlertTriangle, Clock,
  Shirt, Footprints, ShoppingBag, Camera, Search, ChevronDown,
  User, TrendingUp
} from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'

function DashboardPage() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch('http://localhost:4000/api/products?limit=100'),
          fetch('http://localhost:4000/api/orders?limit=100').catch(()=>({json:()=>({data:[]})}))
        ])
        const prodData = await prodRes.json()
        const orderData = await orderRes.json().catch(()=>({data:[]}))

        if (prodData.success) setProducts(prodData.data.items || [])
        if (orderData && orderData.success) setOrders(orderData.data.items || orderData.data || [])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Dynamic calculations
  const totalProducts = products.length
  const activeListings = products.filter(p => p.stock_quantity > 0).length
  const outOfStock = products.filter(p => p.stock_quantity === 0 || !p.stock_quantity).length
  const pendingOrders = orders.filter(o => o.status === 'pending').length

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    
    let matchesCategory = true
    if (filterCategory !== 'All') {
      const dbCat = (p.category || '').toLowerCase().trim()
      const fCat = filterCategory.toLowerCase().trim()
      if (fCat === 'men') {
         matchesCategory = dbCat === 'men' || dbCat.startsWith('men ') || dbCat.startsWith("men's")
      } else if (fCat === 'women') {
         matchesCategory = dbCat === 'women' || dbCat.startsWith('women ') || dbCat.startsWith("women's")
      } else {
         matchesCategory = dbCat.includes(fCat)
      }
    }

    let matchesStatus = true
    if (filterStatus !== 'All') {
      const isOut = p.stock_quantity === 0 || !p.stock_quantity
      if (filterStatus === 'In Stock') matchesStatus = !isOut
      if (filterStatus === 'Out of Stock') matchesStatus = isOut
    }

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="app-container">
      {/* 1. Top Navbar */}
      <nav className="top-navbar">
        <div className="nav-brand">
          <Box size={24} color="white" />
          <span>Shop Owner Portal</span>
        </div>
        <div className="nav-user">
          <span>Welcome, John!</span>
          <div className="nav-bell"><Bell size={20} /></div>
          <div className="user-avatar"><User size={20} /></div>
        </div>
      </nav>

      <div className="app-body">
        {/* 2. Left Sidebar */}
        <aside className="sidebar">
          <Link to="/" className="sidebar-item active" style={{ textDecoration: 'none' }}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/add-product" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <Package size={20} /> Products
          </Link>
          <Link to="/stock" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <TrendingUp size={20} /> Stock
          </Link>
          <Link to="/orders" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <ClipboardList size={20} /> Orders
          </Link>
          <Link to="/analytics" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <BarChart2 size={20} /> Analytics
          </Link>
          <div className="sidebar-item" style={{ marginTop: 'auto' }}>
            <Settings size={20} /> Settings
          </div>
        </aside>

        {/* 3. Main Content */}
        <main className="main-content-scroll">
          
          {/* A. Stats Cards Row */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#e0e7ff'}}><Package size={24} color="#1e3a8a"/></div>
              <div className="stat-info">
                <p>Total Products</p>
                <h3>{loading ? '...' : totalProducts}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#d1fae5'}}><CheckCircle size={24} color="#10b981"/></div>
              <div className="stat-info">
                <p>Active Listings</p>
                <h3>{loading ? '...' : activeListings}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#fee2e2'}}><AlertTriangle size={24} color="#ef4444"/></div>
              <div className="stat-info">
                <p>Out of Stock</p>
                <h3>{loading ? '...' : outOfStock}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{backgroundColor: '#fef3c7'}}><Clock size={24} color="#f59e0b"/></div>
              <div className="stat-info">
                <p>Pending Orders</p>
                <h3>{loading ? '...' : pendingOrders}</h3>
              </div>
            </div>
          </div>

          {/* B. Add Product Banner */}
          <div className="add-product-banner">
            <div className="banner-content">
              <h2>Add New Product</h2>
              <p>Easily manage your catalog. Create a new listing manually, or upload to auto-generate details with our powerful AI assistant seamlessly.</p>
              <Link to="/add-product" className="btn btn-primary">Add Product</Link>
            </div>
            <div className="banner-illustration">
              <div className="banner-shapes">
                 <div className="shape-item"><Shirt size={48} strokeWidth={1} /></div>
                 <div className="shape-item" style={{marginTop: '4rem'}}><Footprints size={48} strokeWidth={1} /></div>
                 <div className="shape-item"><ShoppingBag size={48} strokeWidth={1} /></div>
                 <div className="shape-item" style={{marginTop: '4rem'}}><Camera size={48} strokeWidth={1} /></div>
              </div>
            </div>
          </div>

          {/* C. Product Listings Section */}
          <h2 className="section-title">Product Listings</h2>
          <div className="filters-bar">
            <div className="search-wrapper">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdowns">
              <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="All">Category: All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Accessories">Accessories</option>
                <option value="Footwear">Footwear</option>
              </select>
              <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">Status: All</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* D. Product Grid */}
          <div className="products-grid">
            {loading ? (
              <p style={{ color: '#64748b' }}>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ color: '#64748b' }}>No products match your filters.</p>
            ) : filteredProducts.map((prod, i) => {
              const isOut = prod.stock_quantity === 0 || !prod.stock_quantity
              const statusText = isOut ? 'Out of Stock' : 'In Stock'
              const sClass = isOut ? 'alert' : 'success'
              const priceText = `$${parseFloat(prod.price || 0).toFixed(2)}`
              
              // Handle real uploaded image if it exists, otherwise fallback to icon
              const hasImage = Array.isArray(prod.images) && prod.images.length > 0;

              return (
                <div className="product-card" key={i}>
                  <div className="product-img" style={hasImage ? { padding: 0, overflow: 'hidden' } : {}}>
                    {hasImage ? (
                      <img src={prod.images[0]} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Package size={48} color="#94a3b8" />
                    )}
                  </div>
                  <div className="product-details">
                    <h4>{prod.name}</h4>
                    <p className="price">{priceText}</p>
                    <div className={`status-badge badge-${sClass}`}>{statusText}</div>
                    <div className="product-card-actions">
                      <button>Edit</button>
                      <button>{isOut ? 'Restock' : 'Delete'}</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </main>
      </div>
    </div>
  )
}

export default DashboardPage
