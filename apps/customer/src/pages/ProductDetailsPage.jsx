import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { Navbar } from '../components/plp/Navbar';
import { ProductCard } from '../components/plp/ProductCard';
import { addToCart, toggleWishlist } from '../store/cartSlice';

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { items: products } = useSelector((state) => state.catalog);
  const { cartItems, wishlistItems } = useSelector((state) => state.cart);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = useMemo(() => products.find(p => p.id === id), [products, id]);
  
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  const isWishlisted = wishlistItems.some(item => item === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Product not found</p>
      </div>
    );
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartItems.length} />
      
      <main className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-slate-900">Home</button>
          <ChevronRight size={10} />
          <span className="cursor-pointer hover:text-slate-900">{product.category}</span>
          <ChevronRight size={10} />
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[450px_1fr] gap-10 items-start">
          {/* Image Gallery */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 group shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => dispatch(toggleWishlist(product.id))}
                className="absolute top-4 right-4 h-10 w-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-md transition-all"
              >
                <Heart size={20} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
              </button>
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-rose-500 text-white text-[10px] font-black rounded-lg shadow-lg">
                  {discountPercent}% OFF
                </div>
              )}
            </div>
            
            <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
              {[product.image, product.image, product.image].map((img, i) => (
                <div 
                  key={i}
                  className={`h-16 w-14 rounded-xl overflow-hidden border-2 cursor-pointer transition-all shrink-0 ${activeImage === i ? 'border-[#0066FF] shadow-md' : 'border-slate-100 opacity-60'}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-md">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md">
                  <Star size={12} className="fill-current" />
                  <span className="text-[11px] font-black">{product.rating}</span>
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                {product.name}
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Experience unparalleled comfort and style with our signature {product.name.toLowerCase()}. Crafted with premium materials designed for longevity and everyday elegance.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 tracking-tight">{formatCurrency(product.price)}</span>
                <span className="text-sm text-slate-300 line-through font-bold">{formatCurrency(product.originalPrice)}</span>
              </div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Inclusive of all taxes</p>
            </div>

            {/* Size Selector */}
            {product.sizes && (
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-[2.5rem] px-3 rounded-xl border-2 font-black text-[11px] transition-all ${selectedSize === size ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Quantity</h3>
              <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="h-8 w-8 flex items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-black text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="h-8 w-8 flex items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4">
              <button 
                onClick={() => {
                  dispatch(addToCart({ ...product, quantity }));
                  navigate('/cart');
                }}
                className="flex-[1.5] h-14 flex items-center justify-center gap-2 rounded-2xl bg-[#0066FF] text-white font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]"
              >
                <Zap size={18} fill="white" />
                Buy Now
              </button>
              <button 
                onClick={() => dispatch(addToCart({ ...product, quantity }))}
                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 text-slate-900 font-black text-sm hover:border-[#0066FF] hover:bg-blue-50 transition-all hover:text-[#0066FF]"
              >
                <ShoppingCart size={18} />
                Add to Bag
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-50">
              {[
                { icon: Truck, label: 'Swift Delivery', desc: 'Free on prepaid orders' },
                { icon: RotateCcw, label: '14-Day Returns', desc: 'No questions asked' },
                { icon: ShieldCheck, label: 'Secure Pay', desc: 'PCI Compliant' },
                { icon: Share2, label: 'Share Deal', desc: 'Earn points' }
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                    <f.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-black uppercase text-slate-900 truncate">{f.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">You Might Also Like</h2>
                <p className="text-slate-400 font-medium">Handpicked alternatives based on your style preferences.</p>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0066FF] hover:translate-x-1 transition-all"
              >
                View Collection
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map(p => (
                <div 
                  key={p.id} 
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <ProductCard 
                    product={p}
                    isWishlisted={wishlistItems.includes(p.id)}
                    onToggleWishlist={(id) => dispatch(toggleWishlist(id))}
                    onAddToCart={(id) => dispatch(addToCart(id))}
                    onBookNow={(id) => {
                      dispatch(addToCart(id));
                      navigate('/cart');
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* Newsletter Section */}
      <footer className="mt-40 bg-slate-50 py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] text-center space-y-8">
           <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Join the OutfitHub Elite</h2>
           <p className="text-slate-500 font-medium">Get exclusive access to pre-launches, celebrity drops, and weekly styling tips directly in your inbox.</p>
           <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Drop your email here..."
                className="flex-1 h-16 px-8 rounded-2xl bg-white border border-slate-100 shadow-sm outline-none focus:border-[#0066FF] transition-all font-bold text-slate-700"
              />
              <button 
                type="button"
                className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black tracking-widest uppercase text-xs hover:bg-slate-800 transition-all shadow-xl"
              >
                Subscribe
              </button>
           </form>
        </div>
      </footer>
    </div>
  );
};
