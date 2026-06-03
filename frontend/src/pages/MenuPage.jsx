import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/useMenuStore';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { Search, Plus, Minus, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

export default function MenuPage() {
  const { menu, categories } = useMenuStore();
  const { items: cartItems, addItem, updateQuantity, getTotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredMenu = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = getTotal();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      toast.info('Please sign in to add items to your cart');
      navigate('/login');
      return;
    }
    addItem(item);
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <div className="container-max-width mx-auto px-4 lg:px-8 py-12 relative flex">
      {/* Menu Section */}
      <div className={`flex-1 transition-all ${isCartOpen ? 'lg:pr-96' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="font-display-lg text-4xl text-primary font-bold">Our Menu</h1>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high border border-surface-bright rounded-full pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-label-sm uppercase transition-colors border ${
                activeCategory === cat 
                  ? 'bg-primary text-on-primary border-primary' 
                  : 'bg-transparent text-on-surface-variant border-surface-bright hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-surface-container rounded-2xl overflow-hidden border border-surface-bright flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {!item.available && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="text-error font-bold font-label-sm uppercase">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-xl text-on-surface">{item.name}</h3>
                  <span className="font-bold text-primary">₹{item.price}</span>
                </div>
                <p className="text-on-surface-variant text-sm mb-6 flex-1 line-clamp-2">{item.description}</p>
                <button 
                  disabled={!item.available}
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-3 rounded-lg bg-surface border border-primary text-primary font-label-sm uppercase hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {filteredMenu.length === 0 && (
            <div className="col-span-full py-12 text-center text-on-surface-variant">
              No dishes found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button (Mobile/when closed) */}
      {!isCartOpen && cartCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-primary text-on-primary p-4 rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <ShoppingCart size={24} />
          <span className="font-bold">{cartCount}</span>
        </button>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-surface-container-high border-l border-surface-bright shadow-2xl z-50 flex flex-col transition-transform transform translate-x-0">
          <div className="p-6 border-b border-surface-bright flex justify-between items-center bg-surface-container-highest">
            <h2 className="font-headline-md text-xl flex items-center gap-2">
              <ShoppingCart size={24} className="text-primary" /> 
              Your Cart
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="text-on-surface-variant hover:text-error p-2">
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-on-surface-variant my-auto flex flex-col items-center">
                <ShoppingCart size={48} className="mb-4 opacity-20" />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-on-surface">{item.name}</h4>
                      <div className="text-primary font-semibold">₹{item.price}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center hover:bg-surface-variant transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center hover:bg-surface-variant transition-colors text-primary">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-surface-bright bg-surface-container-highest">
            <div className="flex justify-between items-center mb-6">
              <span className="font-body-lg">Total</span>
              <span className="font-display-lg-mobile text-2xl text-primary font-bold">₹{cartTotal}</span>
            </div>
            <button 
              disabled={cartItems.length === 0}
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary-fixed-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
