import { useState } from 'react';
import { useMenuStore } from '../../store/useMenuStore';
import { Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ManageFood() {
  const { menu, categories, addMenuItem, deleteMenuItem, updateMenuItem } = useMenuStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', category: categories[1], image: '', description: '', available: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) return;
    addMenuItem({ ...formData, price: Number(formData.price) });
    setIsAdding(false);
    setFormData({ name: '', price: '', category: categories[1], image: '', description: '', available: true });
    toast.success('Menu item added');
  };

  const toggleAvailability = (item) => {
    updateMenuItem(item.id, { available: !item.available });
    toast.info(`${item.name} availability updated`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display-lg text-primary font-bold">Manage Menu</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm uppercase hover:bg-primary-fixed-dim transition-colors"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Item</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-surface-container border border-surface-bright p-6 rounded-xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Item Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-surface border border-surface-bright rounded-lg p-3 text-on-surface" />
          <input type="number" placeholder="Price (₹)" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="bg-surface border border-surface-bright rounded-lg p-3 text-on-surface" />
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="bg-surface border border-surface-bright rounded-lg p-3 text-on-surface">
            {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="bg-surface border border-surface-bright rounded-lg p-3 text-on-surface" />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="bg-surface border border-surface-bright rounded-lg p-3 text-on-surface md:col-span-2" rows="2"></textarea>
          <button type="submit" className="bg-primary text-on-primary py-3 rounded-lg md:col-span-2 uppercase font-bold">Save Item</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className={`bg-surface-container rounded-xl border ${item.available ? 'border-surface-bright' : 'border-error/50 opacity-75'} p-4 flex flex-col`}>
            <div className="flex gap-4 mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="font-bold text-on-surface text-lg">{item.name}</h3>
                <p className="text-primary font-bold">₹{item.price}</p>
                <p className="text-xs text-on-surface-variant uppercase">{item.category}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-bright">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={item.available} onChange={() => toggleAvailability(item)} className="accent-primary" />
                Available
              </label>
              <button onClick={() => { deleteMenuItem(item.id); toast.success('Deleted item'); }} className="text-error hover:text-error/80 p-2"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
