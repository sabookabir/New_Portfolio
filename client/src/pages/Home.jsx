import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import api from '../services/api';
import { motion } from 'framer-motion';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, skillRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills')
        ]);
        setProjects(projRes.data);
        setSkills(skillRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-base-950 min-h-screen text-surface-200">
      <Hero />
      
      {/* Metrics Section */}
      <section className="py-24 bg-surface-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Successful Projects', value: '12+' },
              { label: 'Client Satisfaction', value: '100%' },
              { label: 'Years Experience', value: '03+' },
              { label: 'Tech Stack Skills', value: '25+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
              >
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-[11px] font-bold text-surface-500 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-32 bg-base-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4">Featured Work</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none uppercase italic">Selected Projects.</h3>
            </div>
            <p className="text-surface-400 max-w-sm font-medium leading-relaxed">
              A collection of digital solutions built with precision, focusing on user experience and technical excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {loading ? (
              [1, 2].map(i => (
                <div key={i} className="h-[450px] glass-card animate-pulse"></div>
              ))
            ) : projects.length > 0 ? (
              projects.map((project, i) => (
                <motion.div 
                  key={project._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card group"
                >
                  <div className="aspect-[16/9] relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={project.image || 'https://via.placeholder.com/800x450'} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-base-950/40 group-hover:bg-base-950/20 transition-all"></div>
                  </div>
                  <div className="p-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="chip-premium">{tech}</span>
                      ))}
                    </div>
                    <h4 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">{project.title}</h4>
                    <p className="text-surface-400 text-sm mb-8 leading-relaxed font-medium">
                      {project.description}
                    </p>
                    <a href={project.link} target="_blank" rel="noreferrer" className="btn-secondary py-3 text-xs inline-flex group/link">
                      View Live Site
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center glass-card border-dashed">
                <p className="text-surface-500 font-bold uppercase tracking-widest">No projects to display yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="skills" className="py-32 bg-surface-900/20 relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4">Technical Stack</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">Core Skills.</h3>
              <p className="text-surface-400 text-lg leading-relaxed mb-12 font-medium">
                I specialize in full-stack development using modern technologies that ensure speed, security, and scalability.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span key={skill._id} className="px-5 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:border-primary/50 transition-all">{skill.name}</span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Frontend', desc: 'Modern interfaces built with React, Next.js, and advanced CSS frameworks.' },
                { title: 'Backend', desc: 'Secure and scalable server-side logic using Node.js and specialized APIs.' },
                { title: 'Database', desc: 'Robust data management with MongoDB, PostgreSQL, and cloud solutions.' },
                { title: 'Architecture', desc: 'System design focused on performance, security, and future-proof code.' }
              ].map((box, i) => (
                <div key={i} className="p-10 glass-card group">
                  <h4 className="text-primary font-bold mb-3 uppercase italic text-xl">{box.title}</h4>
                  <p className="text-sm text-surface-500 font-medium leading-relaxed">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-base-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-6">Contact</h2>
            <h3 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-10">Get In <span className="text-primary">Touch.</span></h3>
          </div>

          <div className="glass-card p-10 sm:p-20 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
