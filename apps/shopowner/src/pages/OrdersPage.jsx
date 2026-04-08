import React, { useState, useEffect } from 'react'
import {
  Bell, Box, LayoutDashboard, Package, ClipboardList, BarChart2,
  Settings, User, Search, ChevronDown, CheckCircle, AlertTriangle,
  Clock, XCircle, Truck, ChevronLeft, ChevronRight, TrendingUp
} from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orders?limit=100')
        const data = await response.json()
        if (data.success) {
          setOrders(data.data.items || data.data || [])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const formatOrderRow = (order) => {
    // Determine status badge class
    let sClass = 'pending'
    if (order.status === 'completed' || order.status === 'delivered') sClass = 'success'
    if (order.status === 'shipped') sClass = 'shipped'
    if (order.status === 'cancelled') sClass = 'cancelled'

    // Determine payment class (mocked if payment_status is missing)
    const paymentStr = order.payment_status || 'Paid'
    const pClass = paymentStr.toLowerCase() === 'unpaid' ? 'unpaid' : 'paid'

    // Extract customer dummy name if missing
    let cName = 'Guest Customer'
    if (order.shipping_address && order.shipping_address.name) {
       cName = order.shipping_address.name
    } else if (order.user_id) {
       cName = `User ${order.user_id.substring(0,6)}`
    }

    return {
      id: `#${(order.id || '').toString().split('-')[0]}`,
      customer: cName,
      email: order.shipping_address?.email || 'customer@example.com',
      date: new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: `$${parseFloat(order.total_amount || 0).toFixed(2)}`,
      status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending',
      sClass,
      payment: paymentStr,
      pClass
    }
  }

  const mappedOrders = orders.map(formatOrderRow)

  // Dynamic KPIs
  const allOrders = orders.length
  const pendingCount = orders.filter(o => o.status === 'pending').length
  const shippedCount = orders.filter(o => o.status === 'shipped').length
  const completedCount = orders.filter(o => o.status === 'completed' || o.status === 'delivered').length
  const cancelledCount = orders.filter(o => o.status === 'cancelled').length

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
          <Link to="/orders" className="sidebar-item active" style={{ textDecoration: 'none' }}>
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
          <div className="page-header" style={{ marginBottom: '2rem' }}>
            <h1 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Orders</h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Manage and process your customer orders efficiently.</p>
          </div>

          {/* Stats Bar */}
          <div className="stats-grid five-cols">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#e0e7ff' }}><ClipboardList size={22} color="#1e3a8a" /></div>
              <div className="stat-info">
                <p>All Orders</p>
                <h3>{loading ? '...' : allOrders}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#fef3c7' }}><Clock size={22} color="#f59e0b" /></div>
              <div className="stat-info">
                <p>Pending Orders</p>
                <h3>{loading ? '...' : pendingCount}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#dbeafe' }}><Truck size={22} color="#2563eb" /></div>
              <div className="stat-info">
                <p>Shipped Orders</p>
                <h3>{loading ? '...' : shippedCount}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#d1fae5' }}><CheckCircle size={22} color="#10b981" /></div>
              <div className="stat-info">
                <p>Completed Orders</p>
                <h3>{loading ? '...' : completedCount}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#fee2e2' }}><XCircle size={22} color="#ef4444" /></div>
              <div className="stat-info">
                <p>Cancelled</p>
                <h3>{loading ? '...' : cancelledCount}</h3>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <div className="search-wrapper">
              <Search size={18} />
              <input type="text" placeholder="Search orders, ID, customer..." />
            </div>
            <div className="filter-dropdowns">
              <select className="filter-select">
                <option>Status: All</option>
                <option>Pending</option>
                <option>Shipped</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              <select className="filter-select">
                <option>Date: All Time</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
                <option>Year 2024</option>
              </select>
              <button className="btn btn-primary">Apply Filters</button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                     <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading Orders...</td>
                  </tr>
                ) : mappedOrders.length === 0 ? (
                  <tr>
                     <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No orders found. Your sales journey begins soon!</td>
                  </tr>
                ) : mappedOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td><span className="order-id">{order.id}</span></td>
                    <td>
                      <div className="customer-cell">
                        <span className="customer-name">{order.customer}</span>
                        <span className="customer-email">{order.email}</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '0.875rem', color: '#64748b' }}>{order.date}</span></td>
                    <td><span className="amount-cell">{order.total}</span></td>
                    <td>
                      <div className={`status-badge badge-${order.sClass}`} style={{ marginBottom: 0 }}>
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge badge-${order.pClass}`} style={{ marginBottom: 0, padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                        {order.payment}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="page-btn" style={{ padding: '0.4rem 0.8rem', marginLeft: 'auto' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination UI */}
            <div className="pagination-row">
              <div className="pagination-info">
                Page 1 of 13
              </div>
              <div className="pagination-controls">
                <button className="page-btn" disabled><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
                <button className="page-btn" style={{ marginLeft: '0.5rem' }}>Next</button>
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

export default OrdersPage
