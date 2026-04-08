import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus, 
  MapPin, 
  Phone, 
  User, 
  Home, 
  Trash2, 
  Edit3, 
  Check, 
  ArrowLeft,
  MoreVertical,
  Navigation,
  Package
} from 'lucide-react';
import { Navbar } from '../components/plp/Navbar';
import { AddressMapPicker } from '../components/checkout/AddressMapPicker';
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../store/addressSlice';

const AddressCard = ({ addr, onEdit, onDelete, onSetDefault }) => (
  <div className={`relative p-6 rounded-[32px] border-2 transition-all ${addr.isDefault ? 'border-[#0066FF] bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}>
    {addr.isDefault && (
      <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-[#0066FF] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
        <Check size={10} />
        Default
      </div>
    )}
    
    <div className="flex items-start gap-4 mb-6">
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${addr.isDefault ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-500'}`}>
        {addr.label === 'Work' ? <Package size={22} /> : addr.label === 'Home' ? <Home size={22} /> : <MapPin size={22} />}
      </div>
      <div className="min-w-0 pr-12">
        <h3 className="text-lg font-black text-slate-900 truncate">{addr.receiverName}</h3>
        <p className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mt-0.5">{addr.label || 'Other'}</p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-start gap-3 text-slate-600">
        <Navigation size={16} className="mt-1 shrink-0 text-slate-400" />
        <div className="text-sm font-medium leading-relaxed">
           <span className="font-bold text-slate-900">{addr.houseName}</span>
           <p className="mt-1">{addr.address}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-slate-600">
        <Phone size={16} className="shrink-0 text-slate-400" />
        <p className="text-sm font-bold tracking-wide">{addr.phone}</p>
      </div>
    </div>

    <div className="mt-8 flex items-center gap-3 pt-6 border-t border-slate-100">
      {!addr.isDefault && (
        <button 
          onClick={() => onSetDefault(addr.id)}
          className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#0066FF] transition-colors"
        >
          Set as Default
        </button>
      )}
      <div className="flex-1"></div>
      <button 
        onClick={() => onEdit(addr)}
        className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <Edit3 size={18} />
      </button>
      <button 
        onClick={() => onDelete(addr.id)}
        className="p-2.5 rounded-xl bg-slate-50 text-rose-500 hover:bg-rose-50 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export const ShippingAddressesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addresses } = useSelector(state => state.address);
  const cartItems = useSelector(state => state.cart.cartItems);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  
  const [formData, setFormData] = useState({
    receiverName: '',
    phone: '',
    houseName: '',
    address: '',
    label: 'Home',
    isDefault: false
  });

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setFormData({
      receiverName: '',
      phone: '',
      houseName: '',
      address: '',
      label: 'Home',
      isDefault: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setFormData(addr);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      dispatch(updateAddress({ ...formData, id: editingAddress.id }));
    } else {
      dispatch(addAddress(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cartItems.length} />
      
      <main className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#0066FF] transition-colors"
            >
              <ArrowLeft size={14} />
              Return to Profile
            </button>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Shipping Addresses</h1>
            <p className="text-slate-500 font-medium max-w-lg">
              Manage your delivery locations for a faster and smoother checkout experience.
            </p>
          </div>

          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-3 px-8 py-5 rounded-3xl bg-[#0066FF] text-white font-black shadow-lg shadow-blue-200 hover:bg-[#0052CC] hover:-translate-y-1 transition-all active:scale-95"
          >
            <Plus size={20} />
            Add New Address
          </button>
        </div>

        {addresses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addresses.map(addr => (
              <AddressCard 
                key={addr.id} 
                addr={addr} 
                onEdit={handleOpenEdit}
                onDelete={(id) => dispatch(deleteAddress(id))}
                onSetDefault={(id) => dispatch(setDefaultAddress(id))}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center bg-white rounded-[48px] border-2 border-dashed border-slate-200">
            <div className="h-24 w-24 rounded-[40px] bg-slate-50 flex items-center justify-center text-slate-300 mb-8">
              <MapPin size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">No addresses saved yet</h3>
            <p className="mt-4 text-slate-500 max-w-xs leading-relaxed">
              Add a shipping address to speed up your checkout process and track deliveries.
            </p>
            <button 
              onClick={handleOpenAdd}
              className="mt-10 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all"
            >
              Add First Address
            </button>
          </div>
        )}
      </main>

      {/* Address Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                {editingAddress ? 'Edit Address' : 'New Address'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 transition-colors"
              >
                <ArrowLeft size={24} className="rotate-90" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Receiver Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066FF] transition-colors" size={18} />
                    <input 
                      required
                      type="text"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#0066FF] outline-none font-bold text-slate-700 transition-all"
                      placeholder="e.g. John Doe"
                      value={formData.receiverName}
                      onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066FF] transition-colors" size={18} />
                    <input 
                      required
                      type="tel"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#0066FF] outline-none font-bold text-slate-700 transition-all"
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">House / Apartment / Building Name</label>
                <div className="relative group">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066FF] transition-colors" size={18} />
                  <input 
                    required
                    type="text"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#0066FF] outline-none font-bold text-slate-700 transition-all"
                    placeholder="e.g. Green View Apt, 402"
                    value={formData.houseName}
                    onChange={(e) => setFormData({...formData, houseName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066FF] transition-colors" size={18} />
                  <input 
                    readOnly
                    required
                    type="text"
                    className="w-full pl-12 pr-28 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none cursor-not-allowed"
                    placeholder="Pin location on map"
                    value={formData.address}
                  />
                  <button 
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Set on Map
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {['Home', 'Work', 'Other'].map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setFormData({...formData, label: l})}
                    className={`flex-1 py-4 rounded-2xl border-2 font-black text-xs transition-all ${formData.label === l ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-5 rounded-2xl bg-slate-50 text-slate-600 font-black text-sm hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                >
                  {editingAddress ? 'Save Changes' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Map Picker Modal */}
      <AddressMapPicker 
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        initialAddress={formData.address}
        onConfirm={(newAddress) => {
          setFormData({...formData, address: newAddress});
          setIsMapOpen(false);
        }}
      />
    </div>
  );
};
