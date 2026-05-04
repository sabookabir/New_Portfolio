import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('project'); 
  const [formData, setFormData] = useState({});

  // Settings state
  const [profileData, setProfileData] = useState({ username: '', password: '' });
  const [profileStatus, setProfileStatus] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, msgRes, skillRes] = await Promise.all([
        api.get('/projects'),
        api.get('/messages'),
        api.get('/skills')
      ]);
      setProjects(projRes.data);
      setMessages(msgRes.data);
      setSkills(skillRes.data);
      setProfileData({ ...profileData, username: localStorage.getItem('username') || '' });
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (type) => {
    setModalType(type);
    setFormData(type === 'project' ? {
      title: '',
      description: '',
      techStack: '',
      link: '',
      image: ''
    } : {
      name: '',
      category: 'Frontend'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = modalType === 'project' ? '/projects' : '/skills';
      const data = modalType === 'project' ? {
        ...formData,
        techStack: typeof formData.techStack === 'string' ? formData.techStack.split(',').map(s => s.trim()) : formData.techStack
      } : formData;
      
      await api.post(endpoint, data);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert('Error saving data: ' + err.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileStatus('Updating...');
    try {
      await api.put('/auth/profile', profileData);
      setProfileStatus('Success! Profile updated.');
      if (profileData.username) localStorage.setItem('username', profileData.username);
    } catch (err) {
      setProfileStatus('Error: ' + err.response?.data?.message);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      const endpoint = type === 'project' ? `/projects/${id}` : `/skills/${id}`;
      await api.delete(endpoint);
      fetchData();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-base-950 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 pb-8 border-b border-white/5">
          <div>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Admin Dashboard</h1>
            <p className="text-surface-500 font-medium">Manage your content and settings</p>
          </div>
          <button onClick={logout} className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            Logout
          </button>
        </div>

        <div className="flex gap-6 mb-12 overflow-x-auto pb-4">
          {['projects', 'skills', 'messages', 'settings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${activeTab === tab ? 'bg-primary text-base-950' : 'bg-white/5 text-surface-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-white/5 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="reveal active">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold uppercase italic tracking-tighter text-white">Project List</h2>
                  <button onClick={() => handleAdd('project')} className="btn-primary py-2 text-sm px-8">Add New Project</button>
                </div>
                <div className="grid gap-4">
                  {projects.length > 0 ? projects.map(proj => (
                    <div key={proj._id} className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <img src={proj.image || 'https://via.placeholder.com/100'} className="w-16 h-16 rounded-xl object-cover" alt="" />
                        <div>
                          <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                          <p className="text-xs font-medium text-surface-500 uppercase tracking-widest mt-1">{Array.isArray(proj.techStack) ? proj.techStack.join(' | ') : proj.techStack}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDelete('project', proj._id)} className="p-3 text-surface-500 hover:text-secondary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  )) : <p className="text-surface-500 text-center py-20 uppercase tracking-widest italic">No projects added.</p>}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold uppercase italic tracking-tighter text-white">Technical Skills</h2>
                  <button onClick={() => handleAdd('skill')} className="btn-primary py-2 text-sm px-8">Add New Skill</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.length > 0 ? skills.map(skill => (
                    <div key={skill._id} className="bg-white/5 border border-white/10 px-5 py-2 rounded-lg font-bold text-sm text-surface-200 flex items-center gap-3">
                      {skill.name}
                      <button onClick={() => handleDelete('skill', skill._id)} className="hover:text-secondary transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                  )) : <p className="text-surface-500">No skills added.</p>}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                {messages.length > 0 ? messages.map(msg => (
                  <div key={msg._id} className="glass-card p-8 border-l-4 border-primary">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-white">{msg.name}</h4>
                        <p className="text-sm font-medium text-primary mt-1">{msg.email}</p>
                      </div>
                      <span className="text-[10px] font-bold text-surface-500 uppercase tracking-[0.2em]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-surface-300 leading-relaxed">{msg.message}</p>
                  </div>
                )) : (
                  <div className="py-20 text-center text-surface-500">No messages yet.</div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-xl">
                <h2 className="text-xl font-bold uppercase italic tracking-tighter mb-8 text-white">Account Settings</h2>
                <div className="glass-card p-10">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2 tracking-widest">Username</label>
                      <input 
                        type="text"
                        value={profileData.username}
                        onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2 tracking-widest">New Password</label>
                      <input 
                        type="password"
                        value={profileData.password}
                        onChange={(e) => setProfileData({...profileData, password: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                        placeholder="Leave blank to keep current"
                      />
                    </div>
                    
                    {profileStatus && (
                      <p className="text-sm font-medium text-primary">{profileStatus}</p>
                    )}

                    <button type="submit" className="btn-primary w-full py-4 mt-4">Update Profile</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-base-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg glass-card bg-surface-900 p-10 overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold mb-10 text-white uppercase italic tracking-tighter">{modalType === 'project' ? 'New Project' : 'New Skill'}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {modalType === 'project' ? (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2">Title</label>
                      <input 
                        type="text" required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2">Description</label>
                      <textarea 
                        required rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2">Tech Stack (comma separated)</label>
                      <input 
                        type="text" required
                        value={formData.techStack}
                        onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2">Project URL</label>
                      <input 
                        type="text"
                        value={formData.link}
                        onChange={(e) => setFormData({...formData, link: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2">Image URL</label>
                      <input 
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2">Skill Name</label>
                      <input 
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-surface-500 uppercase mb-2">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="flex gap-4 pt-6">
                  <button type="submit" className="flex-1 btn-primary py-4">Save</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn-secondary py-4">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
