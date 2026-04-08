import React, { useState, useEffect } from 'react'
import {
  Bell, Box, LayoutDashboard, Package, ClipboardList, BarChart2,
  Settings, User, DollarSign, ShoppingCart, TrendingUp, Users,
  ArrowUpRight, ArrowDownRight, ChevronDown, CheckCircle, PackageCheck,
  RotateCcw, XCircle, Shirt, Footprints, ShoppingBag, Camera, Download
} from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'

function AnalyticsPage() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch('http://localhost:4000/api/products?limit=500'),
          fetch('http://localhost:4000/api/orders?limit=500')
        ])
        
        const prodData = await prodRes.json()
        const orderData = await orderRes.json()

        if (prodData.success) setProducts(prodData.data.items || [])
        // If orders api is failing or empty, fallback to empty array gracefully
        if (orderData && orderData.success) setOrders(orderData.data || [])
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Calculate dynamic KPIs
  const totalRevenue = orders.reduce((acc, o) => acc + (parseFloat(o.total_amount) || 0), 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0
  const totalUnits = products.reduce((acc, p) => acc + (parseInt(p.stock_quantity) || 0), 0)
  const inventoryValue = products.reduce((acc, p) => acc + (parseFloat(p.price) * (parseInt(p.stock_quantity) || 0)), 0)

  const kpis = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, change: '+0%', up: true, icon: <DollarSign size={20} color="#1e3a8a" />, bg: '#e0e7ff' },
    { label: 'Total Orders', value: totalOrders.toString(), change: '+0%', up: true, icon: <ShoppingCart size={20} color="#1e3a8a" />, bg: '#e0e7ff' },
    { label: 'Total Inventory Value', value: `$${inventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, change: '-', up: true, icon: <DollarSign size={20} color="#065f46" />, bg: '#d1fae5' },
    { label: 'Avg Order Value', value: `$${avgOrderValue.toFixed(2)}`, change: '-', up: true, icon: <Users size={20} color="#065f46" />, bg: '#d1fae5' },
    { label: 'Total Units in Stock', value: totalUnits.toString(), change: '-', up: true, icon: <Package size={20} color="#1e3a8a" />, bg: '#e0e7ff' },
  ]

  // Dynamic Category Breakdown based on inventory value (since sales line items are unavailable)
  const categoryMap = {}
  products.forEach(p => {
    const cat = p.category || 'Uncategorized'
    const val = parseFloat(p.price) * (parseInt(p.stock_quantity) || 0)
    if (!categoryMap[cat]) categoryMap[cat] = 0
    categoryMap[cat] += val
  })
  
  const categoryColors = ['#1e3a8a', '#10b981', '#f59e0b', '#94a3b8', '#8b5cf6', '#ec4899']
  const categories = Object.keys(categoryMap).map((key, i) => {
     const val = categoryMap[key]
     const pct = inventoryValue > 0 ? (val / inventoryValue) * 100 : 0
     return { name: key, revenue: `$${val.toLocaleString(undefined, {maximumFractionDigits:0})}`, percent: pct, color: categoryColors[i % categoryColors.length] }
  }).sort((a,b) => b.percent - a.percent)

  // Top products fallback to most valuable products by stock since orders aren't detailed
  const sortedByValue = [...products].sort((a,b) => (parseFloat(b.price) * b.stock_quantity) - (parseFloat(a.price) * a.stock_quantity)).slice(0, 3)
  const topProducts = sortedByValue.map(p => ({
    name: p.name,
    sales: `$${(parseFloat(p.price) * p.stock_quantity).toLocaleString(undefined, {maximumFractionDigits:0})}`,
    units: `${p.stock_quantity} units stock`,
    icon: <Box size={18} />
  }))

  // Order stats dynamically
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const shippedOrders = orders.filter(o => o.status === 'shipped').length
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length

  const orderStats = [
    { label: 'Pending', count: pendingOrders, color: '#f59e0b', percent: totalOrders ? (pendingOrders/totalOrders)*100 : 0 },
    { label: 'Shipped', count: shippedOrders, color: '#2563eb', percent: totalOrders ? (shippedOrders/totalOrders)*100 : 0 },
    { label: 'Delivered', count: deliveredOrders, color: '#10b981', percent: totalOrders ? (deliveredOrders/totalOrders)*100 : 0 },
    { label: 'Cancelled', count: cancelledOrders, color: '#ef4444', percent: totalOrders ? (cancelledOrders/totalOrders)*100 : 0 },
  ]
  // Fallbacks if orders are completely empty to preserve the UI structure look
  if (totalOrders === 0 && !loading) {
     orderStats.forEach(s => s.percent = 0)
  }

  const recentActivity = [
    { title: 'Analytics dashboard connected', time: 'Live', icon: <CheckCircle size={16} color="white" />, bg: '#10b981' },
    { title: `Tracked ${totalProducts} database items`, time: 'Live', icon: <PackageCheck size={16} color="white" />, bg: '#4f46e5' },
    { title: `${totalUnits} stock units catalogued`, time: 'Live', icon: <RotateCcw size={16} color="white" />, bg: '#94a3b8' },
  ]

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
          <Link to="/stock" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <TrendingUp size={20} /> Stock
          </Link>
          <Link to="/orders" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <ClipboardList size={20} /> Orders
          </Link>
          <Link to="/analytics" className="sidebar-item active" style={{ textDecoration: 'none' }}>
            <BarChart2 size={20} /> Analytics
          </Link>
          <div className="sidebar-item" style={{ marginTop: 'auto' }}>
            <Settings size={20} /> Settings
          </div>
        </aside>

        {/* 3. Main Content */}
        <main className="main-content-scroll">
          
          <div className="header-action-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h1 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Analytics</h1>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Track your store performance and insights.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="page-btn">Last 30 days <ChevronDown size={16} /></button>
              <button className="page-btn active" style={{ background: 'var(--color-primary)', color: 'white' }}>Download Report <Download size={16} /></button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="stats-grid five-cols">
            {kpis.map((kpi, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon" style={{ backgroundColor: kpi.bg }}>{kpi.icon}</div>
                <div className="stat-info">
                  <p>{kpi.label}</p>
                  <h3>
                    {kpi.value}
                    <span className={`indicator indicator-${kpi.up ? 'up' : 'down'}`}>
                      {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {kpi.change}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Main Chart Section */}
          <div className="analytics-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="section-title" style={{ marginBottom: 0 }}>Revenue Overview</h3>
                <div className="chart-toggles">
                  <button className="toggle-btn">Daily</button>
                  <button className="toggle-btn active">Weekly</button>
                  <button className="toggle-btn">Monthly</button>
                </div>
              </div>
              
              <div className="chart-visualization">
                <div className="chart-grid-lines">
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                </div>
                {/* SVG Area Chart Mockup */}
                <div className="chart-svg-wrap">
                  <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0,250 C 100,220 200,240 300,180 C 400,200 500,140 600,160 C 700,180 800,140 800,120 L 800,300 L 0,300 Z" fill="url(#gradient)" />
                    <path d="M 0,250 C 100,220 200,240 300,180 C 400,200 500,140 600,160 C 700,180 800,140 800,120" fill="none" stroke="#1e3a8a" strokeWidth="3" />
                    {/* Data Points */}
                    <circle cx="300" cy="180" r="4" fill="#1e3a8a" />
                    <circle cx="600" cy="160" r="4" fill="#1e3a8a" />
                    <circle cx="800" cy="120" r="6" fill="#1e3a8a" stroke="white" strokeWidth="2" />
                  </svg>
                  {/* Tooltip Mock */}
                  <div className="chart-tooltip-mock" style={{ position: 'absolute', top: '20%', left: '78%', background: 'white', padding: '0.75rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0', zIndex: 10 }}>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.25rem' }}>Monday, Apr 22</p>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: '#1e3a8a' }}>$685</p>
                  </div>
                </div>
                {/* Labels */}
                <div style={{ position: 'absolute', bottom: '-1.5rem', width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', padding: '0 1rem' }}>
                  <span>Apr 7</span><span>Apr 8</span><span>Apr 11</span><span>Apr 15</span><span>Apr 18</span><span>Apr 22</span><span>Apr 23</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="chart-card">
                <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Orders Analytics</h3>
                {orderStats.map((stat, i) => (
                  <div className="breakdown-row" key={i}>
                    <div className="breakdown-info">
                      <span>{stat.label}</span>
                      <span style={{ color: '#94a3b8' }}>{stat.count}</span>
                    </div>
                    <div className="progress-wrap">
                      <div className="progress-fill" style={{ width: `${stat.percent}%`, background: stat.color }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chart-card">
                <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Recent Activity</h3>
                <div className="activity-feed">
                  {recentActivity.map((act, i) => (
                    <div className="activity-item" key={i}>
                      <div className="activity-icon" style={{ background: act.bg }}>{act.icon}</div>
                      <div className="activity-text">
                        <span className="activity-title">{act.title}</span>
                        <span className="activity-time">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination-row" style={{ padding: '1rem 0 0 0', border: 'none', marginTop: '1rem' }}>
                   <div className="pagination-info" style={{fontSize: '0.75rem'}}>Page 1 of 2</div>
                   <div className="pagination-controls">
                      <button className="page-btn active" style={{padding: '0.3rem 0.6rem'}}>1</button>
                      <button className="page-btn" style={{padding: '0.3rem 0.6rem'}}>2</button>
                      <button className="page-btn">Next</button>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Grid for Sales Breakdown and Top Products */}
          <div className="analytics-sub-grid">
             <div className="chart-card">
                <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Sales Breakdown</h3>
                <div className="sales-breakdown">
                  <div className="breakdown-info" style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.75rem' }}>
                    <span>Sales by Category</span>
                    <span>Revenue</span>
                  </div>
                  {categories.map((cat, i) => (
                    <div className="breakdown-row" key={i}>
                      <div className="breakdown-info">
                        <span>{cat.name}</span>
                        <span>{cat.revenue}</span>
                      </div>
                      <div className="progress-wrap">
                        <div className="progress-fill" style={{ width: `${cat.percent}%`, background: cat.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="chart-card">
                <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Top Selling Products</h3>
                <div className="top-products-list">
                   {topProducts.map((prod, i) => (
                     <div className="top-product-item" key={i}>
                        <div className="product-thumb">{prod.icon}</div>
                        <div className="product-name-small">{prod.name}</div>
                        <div className="product-sales-info">
                           <span className="sales-val">{prod.sales}</span>
                           <span className="units-val">{prod.units}</span>
                        </div>
                     </div>
                   ))}
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

export default AnalyticsPage
