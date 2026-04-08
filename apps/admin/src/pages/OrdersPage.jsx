import React, { useState } from 'react';

const MOCK_ADMIN_ORDERS = [
  { id: 'OH-92837', customer: 'Madhab Mondal', email: 'madhab@example.com', date: 'Apr 05, 2026', total: '₹2,450', status: 'Delivered', vendor: 'FashionHub' },
  { id: 'OH-92711', customer: 'Rahul Sharma', email: 'rahul@example.com', date: 'Apr 07, 2026', total: '₹1,899', status: 'Shipped', vendor: 'TrendSetters' },
  { id: 'OH-92605', customer: 'Priya Das', email: 'priya@example.com', date: 'Apr 08, 2026', total: '₹699', status: 'Processing', vendor: 'DailyWear' },
  { id: 'OH-92590', customer: 'Arjun Singh', email: 'arjun@example.com', date: 'Apr 08, 2026', total: '₹4,500', status: 'Pending', vendor: 'FashionHub' },
  { id: 'OH-92100', customer: 'Sneha Kapur', email: 'sneha@example.com', date: 'Mar 28, 2026', total: '₹1,399', status: 'Cancelled', vendor: 'TrendSetters' },
];

const StatusBadge = ({ status }) => {
  const colors = {
    'Delivered': 'bg-green-100 text-green-700',
    'Shipped': 'bg-blue-100 text-blue-700',
    'Processing': 'bg-amber-100 text-amber-700',
    'Pending': 'bg-slate-100 text-slate-700',
    'Cancelled': 'bg-rose-100 text-rose-700',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors[status]}`}>
      {status}
    </span>
  );
};

export const OrdersPage = () => {
  const [filter, setFilter] = useState('All');

  const filteredOrders = MOCK_ADMIN_ORDERS.filter(o => filter === 'All' || o.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Orders', value: '1,284', change: '+12%', color: 'border-blue-200' },
          { label: 'Pending Fulfillment', value: '42', change: '-4%', color: 'border-amber-200' },
          { label: 'Revenue (MTD)', value: '₹4.2L', change: '+18%', color: 'border-green-200' },
          { label: 'Active Vendors', value: '24', change: '0%', color: 'border-purple-200' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white/80 backdrop-blur p-6 rounded-[24px] border shadow-sm ${stat.color}`}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">{stat.value}</span>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] shadow-xl border border-white/60 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-none">Order Management</h2>
            <p className="mt-2 text-sm text-slate-500">Monitor and manage cross-vendor order fulfillments.</p>
          </div>
          
          <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order ID</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Customer & Email</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Vendor</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">{order.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">{order.customer}</p>
                    <p className="text-xs text-slate-400">{order.email}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-600">{order.vendor}</td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-medium">{order.date}</td>
                  <td className="px-8 py-6 text-sm font-black text-slate-900">{order.total}</td>
                  <td className="px-8 py-6"><StatusBadge status={order.status} /></td>
                  <td className="px-8 py-6 text-right">
                    <button className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">Showing {filteredOrders.length} of {MOCK_ADMIN_ORDERS.length} records</p>
          <div className="flex gap-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 disabled:opacity-50" disabled>
              ←
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
