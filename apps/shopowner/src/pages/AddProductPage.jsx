import React, { useState } from 'react'
import {
  Bell, Box, CloudUpload, User, Sparkles, LayoutDashboard,
  Package, ClipboardList, BarChart2, Settings, ArrowLeft, TrendingUp
} from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'example-key'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

function AddProductPage() {
  const [activeTab, setActiveTab] = useState('manual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    size: '',
    style: '',
    stock_quantity: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleGenerateDescription = async () => {
    if (!formData.name || !formData.category || !formData.price) {
      setFeedback({ type: 'error', message: 'Please enter Name, Category, and Price to generate a description.' })
      setTimeout(() => setFeedback({ type: '', message: '' }), 4000)
      return
    }

    setIsGeneratingAi(true)
    setFeedback({ type: '', message: 'Generating AI description...' })

    try {
      const response = await fetch('http://localhost:4000/api/products/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          style: formData.style,
          size: formData.size,
          price: `$${formData.price}`
        })
      })

      const data = await response.json()
      if (data.success && data.data && data.data.description) {
        setFormData(prev => ({ ...prev, description: data.data.description }))
        setFeedback({ type: 'success', message: 'AI Description generated successfully!' })
      } else {
        throw new Error('Failed to generate description from server')
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message })
    } finally {
      setIsGeneratingAi(false)
      setTimeout(() => setFeedback({ type: '', message: '' }), 4000)
    }
  }

  const uploadImagesToSupabase = async () => {
    if (selectedFiles.length === 0) return []
    
    const imageUrls = []
    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `public/${fileName}`

      const { data, error } = await supabase.storage
        .from('product_images')
        .upload(filePath, file)

      if (error) {
        throw new Error(`Image upload failed: ${error.message}`)
      }

      const { data: publicUrlData } = supabase.storage
        .from('product_images')
        .getPublicUrl(filePath)
        
      if (publicUrlData) {
        imageUrls.push(publicUrlData.publicUrl)
      }
    }
    return imageUrls
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback({ type: '', message: 'Uploading images...' })

    try {
      // 1. Upload images first
      const uploadedImageUrls = await uploadImagesToSupabase()

      setFeedback({ type: '', message: 'Saving product details...' })
      
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock_quantity: parseInt(formData.stock_quantity, 10) || 0,
        images: uploadedImageUrls
      }

      // 2. Transmit product data + image URLs to backend API
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token' // Placeholder Auth
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to save product')
      }

      setFeedback({ type: 'success', message: 'Product successfully saved to Supabase with images!' })
      setFormData({ name: '', category: '', price: '', size: '', style: '', stock_quantity: '', description: '' })
      setSelectedFiles([])
    } catch (err) {
      setFeedback({ type: 'error', message: err.message })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setFeedback({ type: '', message: '' }), 5000)
    }
  }

  return (
    <div className="app-container">
      {/* 1. Top Navbar */}
      <nav className="top-navbar">
        <div className="nav-brand">
          <Link to="/" className="icon-btn" style={{marginRight: '0.5rem', color: 'white', display: 'flex'}}><ArrowLeft size={20}/></Link>
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
          <Link to="/add-product" className="sidebar-item active" style={{ textDecoration: 'none' }}>
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
          <div className="modal-ui" style={{maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
            <div className="modal-tabs" style={{display: 'flex', borderBottom: '1px solid #e2e8f0'}}>
              <button 
                className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
                onClick={() => setActiveTab('manual')}
                style={{flex: 1, padding: '1rem', background: activeTab === 'manual' ? '#f8fafc' : 'white', border: 'none', borderBottom: activeTab === 'manual' ? '2px solid #1e3a8a' : '2px solid transparent', fontWeight: 600, cursor: 'pointer', color: activeTab === 'manual' ? '#1e3a8a' : '#64748b'}}
              >
                Manual Input
              </button>
              <button 
                className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
                style={{flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: activeTab === 'ai' ? '#f8fafc' : 'white', border: 'none', borderBottom: activeTab === 'ai' ? '2px solid #1e3a8a' : '2px solid transparent', fontWeight: 600, cursor: 'pointer', color: activeTab === 'ai' ? '#1e3a8a' : '#64748b'}}
              >
                 <Sparkles size={16}/> AI Generator
              </button>
            </div>
            
            {feedback.message && (
               <div style={{ padding: '1rem 2rem', background: feedback.type === 'success' ? '#d1fae5' : '#fee2e2', color: feedback.type === 'success' ? '#065f46' : '#991b1b', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500' }}>
                 {feedback.message}
               </div>
            )}

            <div className="modal-content" style={{padding: '2rem'}}>
              {activeTab === 'manual' ? (
                <form className="manual-form" onSubmit={handleSubmit}>
                  <div className="form-group" style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
                    <label style={{marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem'}}>Product Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Cotton T-Shirt" style={{padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px'}} required />
                  </div>
                  <div className="form-group flex-group" style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                    <div className="half" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                      <label style={{marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem'}}>Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} style={{padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px'}} required>
                        <option value="">Select Category...</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Footwear">Footwear</option>
                      </select>
                    </div>
                    <div className="half" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                      <label style={{marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem'}}>Price</label>
                      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="$ 0.00" step="0.01" style={{padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', width: '100%'}} required />
                    </div>
                  </div>
                  <div className="form-group flex-group" style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                    <div className="half" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                      <label style={{marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem'}}>Size</label>
                      <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g. S, M, L, XL" style={{padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px'}} />
                    </div>
                    <div className="half" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                      <label style={{marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem'}}>Style</label>
                      <input type="text" name="style" value={formData.style} onChange={handleChange} placeholder="e.g. Casual, Formal" style={{padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px'}} />
                    </div>
                  </div>
                  <div className="form-group" style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
                     <label style={{marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem'}}>Stock Quantity</label>
                     <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="Quantity" style={{padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px'}} required />
                  </div>
                  <div className="form-group" style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem'}}>
                      <label style={{fontWeight: 500, fontSize: '0.875rem'}}>Description</label>
                      <button 
                         type="button" 
                         onClick={handleGenerateDescription} 
                         disabled={isGeneratingAi}
                         style={{display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid #1e3a8a', color: '#1e3a8a', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: isGeneratingAi ? 'not-allowed' : 'pointer', opacity: isGeneratingAi ? 0.6 : 1}}
                      >
                         <Sparkles size={14} /> {isGeneratingAi ? 'Generating...' : 'Auto-Generate with AI'}
                      </button>
                    </div>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter full product details or auto-generate..." style={{padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontFamily: 'inherit'}}></textarea>
                  </div>
                  <div className="form-group" style={{marginTop: '1.5rem', display: 'flex', flexDirection: 'column'}}>
                    <label style={{marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem'}}>Product Images</label>
                    <div className="upload-box" style={{padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: 0, border: '2px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc'}} onClick={() => document.getElementById('image-upload-input').click()}>
                      <CloudUpload size={32} color="#1e3a8a" />
                      <p className="upload-text" style={{marginTop: 0, fontSize: '0.875rem', color: '#64748b'}}>
                        {selectedFiles.length > 0 
                           ? <span style={{color: '#10b981', fontWeight: 'bold'}}>{selectedFiles.length} file(s) selected for upload</span>
                           : <>Drag & drop or <span style={{color: '#1e3a8a', fontWeight: 'bold'}}>click to upload</span> multiple images</>}
                      </p>
                      <input id="image-upload-input" type="file" multiple accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
                    </div>
                  </div>
                  <div className="form-group" style={{marginTop: '2rem'}}>
                    <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '1rem'}} disabled={isSubmitting}>
                       {isSubmitting ? 'Saving to Database...' : 'Save Product'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="ai-form">
                  <div className="upload-box" style={{padding: '5rem 2rem', cursor: 'pointer', border: '2px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={() => document.getElementById('ai-image-upload-input').click()}>
                    <CloudUpload size={48} color="#1e3a8a" />
                    <p className="upload-text" style={{marginTop: '1rem', fontSize: '0.875rem', color: '#64748b', textAlign: 'center'}}>Drag & drop your product image here <br/><span style={{color: '#1e3a8a', fontWeight: 'bold'}}>or click to browse</span></p>
                    <input id="ai-image-upload-input" type="file" accept="image/*" style={{display: 'none'}} />
                  </div>
                  <button className="btn btn-primary" style={{marginTop: '2rem', width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center'}}>
                    <Sparkles size={20} /> Generate Details Automatically
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddProductPage
