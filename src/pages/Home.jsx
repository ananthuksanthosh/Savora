import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-primary font-label-sm tracking-[0.2em] uppercase mb-4 animate-fade-in-up">Welcome to</span>
          <h1 className="text-5xl md:text-7xl font-display-lg text-on-surface font-bold mb-6">
            A Symphony of <span className="text-primary">Spices</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-body-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the royal flavors of India in a setting that blends tradition with contemporary luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/menu" className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-sm uppercase hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-2">
              Explore Menu
            </Link>
            <Link to="/reserve" className="bg-transparent border border-primary text-primary px-8 py-4 rounded-full font-label-sm uppercase hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container-max-width mx-auto px-4 lg:px-8 py-24 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-4xl mb-4 text-on-surface">Signature Dishes</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { name: 'Nawabi Biryani', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', desc: 'Slow-cooked aromatic basmati rice with exotic spices.' },
            { name: 'Butter Chicken Masala', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop', desc: 'Tender chicken in a rich, creamy tomato gravy.' },
            { name: 'Malabar Prawn Curry', img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=600&auto=format&fit=crop', desc: 'Coastal delicacy cooked in coconut milk.' }
          ].map((dish, i) => (
            <div key={i} className="group cursor-pointer rounded-2xl overflow-hidden bg-surface-container border border-surface-bright hover:border-primary/50 transition-colors">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-headline-md text-xl text-on-surface mb-2 group-hover:text-primary transition-colors">{dish.name}</h3>
                <p className="text-on-surface-variant font-body-md text-sm">{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/menu" className="mt-12 text-primary font-label-sm uppercase tracking-wider flex items-center gap-2 hover:gap-4 transition-all">
          View Full Menu <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
