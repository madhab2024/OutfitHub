import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  XCircle,
  AlertCircle,
  ShoppingBag,
  ExternalLink,
  Calendar,
  MapPin,
  CreditCard,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Navbar } from '../components/plp/Navbar';

const MOCK_ORDERS = [
  {
    id: 'OH-92837',
    date: 'April 05, 2026',
    status: 'Delivered',
    total: 2450,
    paymentMethod: 'UPI (Paytm)',
    address: 'Flat 402, Green Valley Apartments, Bangalore - 560001',
    items: [
      { id: 'P1001', name: 'Casual Denim Jacket', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80', quantity: 1, price: 1200 },
      { id: 'P1014', name: 'Classic White Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80', quantity: 1, price: 1099 }
    ],
    tracking: [
      { status: 'Order Placed', date: 'April 05, 10:30 AM', active: true },
      { status: 'Packed', date: 'April 05, 04:15 PM', active: true },
      { status: 'Shipped', date: 'April 06, 09:00 AM', active: true },
      { status: 'Delivered', date: 'April 08, 02:30 PM', active: true }
    ]
  },
  {
    id: 'OH-92711',
    date: 'April 07, 2026',
    status: 'In Transit',
    total: 1899,
    paymentMethod: 'Credit Card (HDFC)',
    address: '12 Fashion St, Cyber City, Bangalore - 560100',
    items: [
      { id: 'P1015', name: 'Floral Maxi Dress', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', quantity: 1, price: 1899 }
    ],
    tracking: [
      { status: 'Order Placed', date: 'April 07, 11:20 AM', active: true },
      { status: 'Packed', date: 'April 07, 08:45 PM', active: true },
      { status: 'In Transit', date: 'April 08, 07:00 AM', active: true },
      { status: 'Out for Delivery', date: '--', active: false }
    ]
  },
  {
    id: 'OH-92605',
    date: 'April 08, 2026',
    status: 'Processing',
    total: 699,
    paymentMethod: 'Cash on Delivery',
    address: 'Near Metro Station, Indiranagar, Bangalore - 560038',
    items: [
      { id: 'P1007', name: 'Green Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80', quantity: 1, price: 699 }
    ],
    tracking: [
      { status: 'Order Placed', date: 'April 08, 05:30 PM', active: true },
      { status: 'Processing', date: 'In Progress', active: true },
      { status: 'Shipped', date: '--', active: false },
      { status: 'Delivered', date: '--', active: false }
    ]
  }
];

const OrderStatusBadge = ({ status }) => {
  const styles = {
    'Processing': 'bg-blue-50 text-blue-600 border-blue-100',
    'In Transit': 'bg-amber-50 text-amber-600 border-amber-100',
    'Delivered': 'bg-green-50 text-green-600 border-green-100',
    'Cancelled': 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${status === 'Processing' ? 'bg-blue-600 animate-pulse' : 
                                               status === 'In Transit' ? 'bg-amber-600 animate-bounce' : 
                                               status === 'Delivered' ? 'bg-green-600' : 'bg-rose-600'}`}></div>
      {status}
    </div>
  );
};

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`group bg-white rounded-[32px] border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-[#0066FF] shadow-2xl' : 'border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200'}`}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="text-lg font-black text-slate-900 tracking-tight">{order.id}</span>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-slate-400 font-medium">Placed on {order.date}</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Total</p>
              <p className="text-2xl font-black text-slate-900 leading-none">₹{order.total.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all ${isExpanded ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="relative group/item">
              <div className="h-20 w-16 rounded-2xl overflow-hidden bg-slate-100 shadow-sm transition-transform group-hover/item:scale-110">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-lg">
                {item.quantity}
              </div>
            </div>
          ))}
          {!isExpanded && (
            <div className="hidden sm:flex items-center ml-4 border-l border-slate-100 pl-6">
              <p className="text-sm font-bold text-slate-700">{order.items[0].name}</p>
              {order.items.length > 1 && (
                <p className="ml-2 text-sm text-slate-400 font-medium">and {order.items.length - 1} more items</p>
              )}
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="mt-10 pt-10 border-t border-slate-50 animate-in slide-in-from-top-4 duration-500">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#0066FF] mb-6">Delivery Progress</h4>
                  <div className="space-y-6">
                    {order.tracking?.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`h-6 w-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${step.active ? 'bg-[#0066FF]' : 'bg-slate-200'}`}>
                            {step.status === 'Delivered' && <CheckCircle2 size={10} className="text-white" />}
                          </div>
                          {i !== order.tracking.length - 1 && (
                            <div className={`w-0.5 h-10 ${step.active && order.tracking[i+1]?.active ? 'bg-[#0066FF]' : 'bg-slate-100'}`}></div>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${step.active ? 'text-slate-900' : 'text-slate-300'}`}>{step.status}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="flex-1 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                    Real-time Tracking
                  </button>
                  <button className="px-8 py-4 rounded-2xl border-2 border-slate-100 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-all">
                    Invoice PDF
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[32px] p-8 space-y-8">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Shipping Address</h5>
                    <p className="text-sm font-bold text-slate-900 leading-snug">{order.address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Payment Method</h5>
                    <p className="text-sm font-bold text-slate-900">{order.paymentMethod}</p>
                  </div>
                </div>

                <div className="border-t border-white pt-6">
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Item Breakdown</h5>
                   <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 font-medium truncate max-w-[180px]">{item.name} <span className="text-xs ml-1 opacity-50">x{item.quantity}</span></span>
                          <span className="font-bold text-slate-900">₹{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-white flex justify-between items-center">
                        <span className="text-slate-900 font-black">Total Amount</span>
                        <span className="text-slate-900 font-black">₹{order.total.toLocaleString()}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CustomerOrdersPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTab = activeTab === 'All' || order.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cartItems.length} />
      
      <main className="mx-auto w-full max-w-[1100px] px-4 py-12 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#0066FF] transition-colors"
            >
              <ArrowLeft size={14} />
              Return to Profile
            </button>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">My Orders</h1>
            <p className="text-slate-500 font-medium max-w-lg">
              Manage your orders, track shipments in real-time, and download invoices for your purchases.
            </p>
          </div>

          <div className="flex items-center gap-3 p-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            {['All', 'Processing', 'In Transit', 'Delivered'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-xs font-black transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-10 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0066FF]" size={22} />
          <input 
            type="text" 
            placeholder="Search by Order ID, item name or category..."
            className="w-full pl-16 pr-8 py-5 rounded-3xl border-2 border-transparent bg-white shadow-sm focus:border-[#0066FF] focus:ring-8 focus:ring-blue-100/50 transition-all outline-none text-lg text-slate-700 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Order List */}
        <div className="space-y-8">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="py-32 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-[40px] bg-white shadow-xl flex items-center justify-center text-slate-200 mb-8 border border-slate-100">
                <ShoppingBag size={48} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">No matching orders found</h3>
              <p className="mt-4 text-slate-500 max-w-xs leading-relaxed">
                Adjust your filters or search term to find what you're looking for.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
                className="mt-10 px-8 py-4 rounded-2xl bg-white border-2 border-slate-100 text-sm font-black text-slate-900 hover:bg-slate-50 transition-all"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Support */}
        <div className="mt-20 rounded-[40px] bg-slate-900 p-10 md:p-14 text-white overflow-hidden relative">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black tracking-tight leading-tight">Something not right?<br/>We're here to help.</h2>
              <p className="mt-4 text-slate-400 font-medium leading-relaxed">
                Whether it's a sizing issue, a missing item, or you just changed your mind — our priority is your satisfaction. Returns are always hassle-free.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="px-8 py-4 rounded-2xl bg-[#FFCC00] text-slate-900 font-black text-sm hover:scale-105 transition-transform">
                  Contact Support
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white/10 text-white font-black text-sm hover:bg-white/20 transition-all backdrop-blur-md">
                   Return Policy
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="h-48 w-48 rounded-full border-8 border-white/5 flex items-center justify-center">
                 <Package size={80} className="text-white/20" />
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
        </div>
      </main>
    </div>
  );
};