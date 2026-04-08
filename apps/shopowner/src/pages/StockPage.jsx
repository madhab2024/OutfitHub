import React, { useState, useEffect } from 'react'
import {
  Bell, Box, LayoutDashboard, Package, ClipboardList, BarChart2,
  Settings, User, Search, TrendingUp, ChevronDown, Download,
  ChevronLeft, ChevronRight, Shirt, ShoppingBag, Headphones, Footprints
} from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'

function StockPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products?limit=100')
        const data = await response.json()
        if (data.success && data.data && data.data.items) {
          setProducts(data.data.items)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const formatProductRow = (product) => {
    const qty = product.stock_quantity || 0
    let status = 'In Stock'
    let sClass = 'in'
    let color = '#10b981'
    let percent = Math.min((qty / 200) * 100, 100)

    if (qty === 0) {
      status = 'Out of Stock'
      sClass = 'out'
      color = '#ef4444'
      percent = 0
    } else if (qty < 20) {
      status = 'Low Stock'
      sClass = 'low'
      color = '#f59e0b'
    }

    // Attempt to parse images securely
    const hasImage = Array.isArray(product.images) && product.images.length > 0;

    return {
      id: product.id,
      name: product.name,
      sub: product.style || product.size || 'Standard Fit',
      category: product.category || 'General',
      price: `$${parseFloat(product.price || 0).toFixed(2)}`,
      level: `${qty} ${status.toLowerCase()}`,
      status,
      sClass,
      color,
      percent,
      image: hasImage ? product.images[0] : null
    }
  }

  const stockItems = products.map(formatProductRow)

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesCategory = true;
    if (filterCategory !== 'All') {
      const dbCat = item.category.toLowerCase().trim()
      const fCat = filterCategory.toLowerCase().trim()
      if (fCat === 'men') {
         matchesCategory = dbCat === 'men' || dbCat.startsWith('men ') || dbCat.startsWith("men's")
      } else if (fCat === 'women') {
         matchesCategory = dbCat === 'women' || dbCat.startsWith('women ') || dbCat.startsWith("women's")
      } else {
         matchesCategory = dbCat.includes(fCat)
      }
    }

    let matchesStatus = true;
    if (filterStatus !== 'All') {
      matchesStatus = item.status === filterStatus
    }

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalProducts = products.length
  const outOfStock = products.filter(p => !p.stock_quantity || p.stock_quantity === 0).length
  const lowStock = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 20).length
  const surplusStock = products.filter(p => p.stock_quantity && p.stock_quantity > 50).length

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
          <Link to="/" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/add-product" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <Package size={20} /> Products
          </Link>
          <Link to="/stock" className="sidebar-item active" style={{ textDecoration: 'none' }}>
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
          <div className="header-action-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h1 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Stock Management</h1>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Monitor and manage your product inventory efficiently.</p>
            </div>
            <button className="header-action-btn">
              <Download size={18} /> Export Stock <ChevronDown size={14} />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#e0e7ff' }}><ClipboardList size={22} color="#1e3a8a" /></div>
              <div className="stat-info">
                <p>Total Products</p>
                <h3>{loading ? '...' : totalProducts}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#fff7ed' }}><TrendingUp size={22} color="#f97316" /></div>
              <div className="stat-info">
                <p>Low Stock</p>
                <h3>{loading ? '...' : lowStock}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#fff1f2' }}><TrendingUp size={22} color="#f43f5e" /></div>
              <div className="stat-info">
                <p>Out of Stock</p>
                <h3>{loading ? '...' : outOfStock}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#fdf2f8' }}><ShoppingBag size={22} color="#db2777" /></div>
              <div className="stat-info">
                <p>Surplus Stock</p>
                <h3>{loading ? '...' : surplusStock}</h3>
              </div>
            </div>
          </div>

          {/* Filters */}
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
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Stock Table */}
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Level</th>
                  {/* Status column merged back into standard columns slightly for cleaner look earlier, preserving structure */}
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                     <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading Inventory...</td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                     <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No products found matching your search.</td>
                  </tr>
                ) : filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="customer-cell" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                        <div className="product-thumb" style={{ width: '40px', height: '40px', overflow: 'hidden' }}>
                           {item.image ? (
                              <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                           ) : (
                              <Box size={20} color="#64748b" />
                           )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                           <span className="customer-name">{item.name}</span>
                           <span className="customer-email" style={{ fontSize: '0.7rem' }}>{item.sub}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.category}</span>
                      </div>
                    </td>
                    <td><span className="amount-cell">{item.price}</span></td>
                    <td>
                      <div className="stock-level-cell">
                        <div className={`stock-badge-pill pill-${item.sClass}-stock`}>
                          {item.level}
                        </div>
                        <div className="stock-progress-mini">
                          <div className="stock-progress-fill" style={{ width: `${item.percent}%`, background: item.color, opacity: 0.6 }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className="btn-ghost">Edit</button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-btn-group">
                         <button className="btn-solid-sm">
                           {item.status === 'Out of Stock' ? 'Restock' : 'Update Stock'}
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="pagination-row">
              <div className="pagination-info">
                Page 1 of 5
              </div>
              <div className="pagination-controls">
                <button className="pager-btn"><ChevronLeft size={16} /></button>
                <div className="pagination-pager">
                   <button className="pager-btn active">1</button>
                   <button className="pager-btn">2</button>
                   <button className="pager-btn">3</button>
                </div>
                <button className="pager-btn"><ChevronRight size={16} /></button>
                <button className="btn-solid-sm" style={{ marginLeft: '0.5rem', background: 'white' }}>Next <ChevronRight size={14}/></button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Mockup */}
      <footer style={{ padding: '1.5rem 2rem', borderTop: '1px solid #e2e8f0', background: 'white', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>About</span>
          <span>Pricing</span>
          <span>FAQs</span>
          <span>Contact</span>
        </div>
        <div>
          © 2026 Shop Owner Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default StockPage
