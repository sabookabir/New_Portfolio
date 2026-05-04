import { useState } from 'react';
import api from '../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/messages', formData);
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or email directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-surface-700"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Email</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-surface-700"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Message</label>
        <textarea 
          required
          rows="5"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all resize-none placeholder:text-surface-700"
          placeholder="How can I help you?"
        ></textarea>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
          {status.message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary w-full py-5 text-lg"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
