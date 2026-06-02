import { useState } from 'react';
import { useReservationStore } from '../../store/useReservationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ReservationPage() {
  const { addReservation } = useReservationStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    specialRequest: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      toast.error('Please select date and time');
      return;
    }
    
    addReservation({
      customerName: user.name,
      mobile: user.mobile || 'Not Provided',
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests),
      specialRequest: formData.specialRequest
    });

    toast.success('Reservation request submitted successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="container-max-width mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display-lg text-4xl text-primary font-bold mb-4">Reserve a Table</h1>
          <p className="text-on-surface-variant font-body-lg">
            Join us for an unforgettable dining experience. Please fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-container p-8 rounded-2xl border border-surface-bright space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Date</label>
              <input 
                type="date" 
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Time</label>
              <input 
                type="time" 
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Number of Guests</label>
            <select 
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
            >
              {[1,2,3,4,5,6,7,8,9,10, '10+'].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Special Request (Optional)</label>
            <textarea 
              rows="3"
              value={formData.specialRequest}
              onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
              placeholder="e.g. Anniversary, window seat, allergies..."
              className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
            ></textarea>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-on-surface font-body-md text-center">
              Booking for <span className="font-bold text-primary">{user.name}</span>
            </p>
          </div>

          <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary-fixed-dim transition-colors mt-4">
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
