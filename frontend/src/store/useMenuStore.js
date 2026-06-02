import { create } from 'zustand';

const initialMenu = [
  { id: 'm1', name: 'Chicken Biryani', price: 249, category: 'Biryanis', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', available: true, description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices.' },
  { id: 'm2', name: 'Malabar Biryani', price: 299, category: 'Biryanis', image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=600&auto=format&fit=crop', available: true, description: 'Traditional Kerala style biryani with rich flavors.' },
  { id: 'm3', name: 'Butter Chicken', price: 279, category: 'North Indian', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop', available: true, description: 'Creamy and rich tomato-based curry with tender chicken pieces.' },
  { id: 'm4', name: 'Paneer Butter Masala', price: 239, category: 'North Indian', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=600&auto=format&fit=crop', available: true, description: 'Cottage cheese cubes in a rich, creamy tomato gravy.' },
  { id: 'm5', name: 'Masala Dosa', price: 129, category: 'South Indian', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=600&auto=format&fit=crop', available: true, description: 'Crispy rice crepe stuffed with spiced potato filling.' },
  { id: 'm6', name: 'Ghee Roast', price: 169, category: 'South Indian', image: 'https://images.unsplash.com/photo-1649931751101-72f8216dffcc?q=80&w=600&auto=format&fit=crop', available: true, description: 'Ultra-crispy dosa roasted in generous amounts of pure ghee.' },
  { id: 'm7', name: 'Kerala Porotta', price: 25, category: 'South Indian', image: 'https://images.unsplash.com/photo-1626200926735-a50e1faef845?q=80&w=600&auto=format&fit=crop', available: true, description: 'Flaky, layered flatbread from Kerala.' },
  { id: 'm8', name: 'Beef Fry', price: 249, category: 'Starters', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop', available: true, description: 'Spicy Kerala style beef roast with coconut slivers.' },
  { id: 'm9', name: 'Shawarma', price: 149, category: 'Starters', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop', available: true, description: 'Middle eastern wrap with spiced chicken and garlic mayo.' },
  { id: 'm10', name: 'Falooda', price: 119, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=600&auto=format&fit=crop', available: true, description: 'Rich layered dessert with rose syrup, vermicelli, and ice cream.' },
];

export const useMenuStore = create((set) => ({
  menu: initialMenu,
  categories: ['All', 'Starters', 'South Indian', 'North Indian', 'Biryanis', 'Chinese', 'Desserts', 'Beverages'],
  addMenuItem: (item) => set((state) => ({ 
    menu: [...state.menu, { ...item, id: `m${Date.now()}` }] 
  })),
  updateMenuItem: (id, updatedItem) => set((state) => ({
    menu: state.menu.map((item) => item.id === id ? { ...item, ...updatedItem } : item)
  })),
  deleteMenuItem: (id) => set((state) => ({
    menu: state.menu.filter((item) => item.id !== id)
  })),
}));
