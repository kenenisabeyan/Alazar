import React, { useState, useEffect } from 'react';
import { 
  Play, 
  PenTool, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Film, 
  Layout, 
  ArrowUpRight, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Phone 
} from 'lucide-react';

export type CategoryType = 'all' | 'video' | 'design';

export interface ProjectItem {
  id: number;
  title: string;
  category: 'video' | 'design';
  client: string;
  thumbnail: string;
  description: string;
  role?: string;
  deliverables?: string[];
  year?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export interface NavProps {
  currentPage?: string;
  setCurrentPage: (page: string) => void;
}

export const theme = {
  colors: {
    background: '#1E0A0D',     
    cardBg: '#2E1216',         
    accent: '#8B1E3F',         
    text: '#F5F0F1',           
    textMuted: '#A89597',      
  },
  fonts: {
    heading: "'Cinzel', 'Playfair Display', serif",
    body: "'Inter', sans-serif"
  }
};

export const portfolioProjects: ProjectItem[] = [
  {
    id: 1,
    title: "Urban Echoes",
    category: "video",
    client: "Vanguard Apparel",
    thumbnail: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A fast-paced, documentary-style lookbook for Vanguard's Fall collection. Focused on kinetic movement, rhythmic cuts matched to an underground beat, and a moody, high-contrast color grade.",
    role: "Lead Editor & Colorist",
    deliverables: ["60s Main Reel", "3x 15s Social Teasers", "Raw footage color grading"]
  },
  {
    id: 2,
    title: "Lumina Brand Identity",
    category: "design",
    client: "Lumina Tech",
    thumbnail: "https://images.unsplash.com/photo-1626785773579-c93818bb51d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Complete visual overhaul for a modern tech startup. The goal was to create a minimalist, premium identity that stands out in a cluttered SaaS market.",
    role: "Art Director & Graphic Designer",
    deliverables: ["Logo Suite", "Brand Guidelines", "Social Media Templates"]
  },
  {
    id: 3,
    title: "The Craftsman",
    category: "video",
    client: "Oak & Iron",
    thumbnail: "https://images.unsplash.com/photo-1535016120720-40c746a480d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A slow-cinema inspired mini-documentary following a master woodworker. Emphasis on immersive sound design and warm, earthy color palettes.",
    role: "Cinematographer & Editor",
    deliverables: ["3-Minute Short Doc", "Sound Design Mix"]
  },
  {
    id: 4,
    title: "AURA Festival",
    category: "design",
    client: "AURA Music Group",
    thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A series of striking, abstract 3D poster designs for a boutique electronic music festival.",
    role: "Graphic & 3D Designer",
    deliverables: ["Print-ready Posters", "Digital Billboards", "Merch Designs"]
  }
];

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon, 
  onClick, 
  type = "button" 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium transition-all duration-300 ease-out tracking-wide text-sm";
  const variants: Record<string, string> = {
    primary: `bg-[#8B1E3F] text-[#F5F0F1] hover:bg-[#a3234a] hover:-translate-y-1 shadow-lg shadow-[#8B1E3F]/20`,
    secondary: `bg-[#2E1216] text-[#F5F0F1] border border-[#8B1E3F]/30 hover:border-[#8B1E3F] hover:bg-[#8B1E3F]/10 hover:-translate-y-1`,
    outline: `bg-transparent text-[#F5F0F1] border border-[#A89597] hover:border-[#F5F0F1] hover:text-[#F5F0F1]`
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export const Input: React.FC<InputProps> = ({ 
  label, 
  type = "text", 
  placeholder, 
  multiline = false,
  value,
  onChange,
  name
}) => {
  const baseClasses = "w-full bg-[#1E0A0D] border border-white/10 rounded-lg px-4 py-3 text-[#F5F0F1] focus:outline-none focus:border-[#8B1E3F] transition-colors placeholder:text-[#A89597]/50";
  
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-[#A89597] font-medium tracking-wide uppercase">{label}</label>}
      {multiline ? (
        <textarea 
          name={name}
          rows={4} 
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input 
          name={name}
          type={type} 
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          className={baseClasses} 
        />
      )}
    </div>
  );
};

export const Navigation: React.FC<NavProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#1E0A0D]/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="text-2xl font-bold tracking-widest text-[#F5F0F1] uppercase hover:opacity-80 transition-opacity" style={{ fontFamily: theme.fonts.heading }}>
          Alazar<span className="text-[#8B1E3F]">.</span>
        </button>

        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className={`${currentPage === link.id ? 'text-[#F5F0F1]' : 'text-[#A89597]'} font-medium text-xs tracking-widest uppercase hover:text-[#F5F0F1] transition-colors relative group`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-[#8B1E3F] transition-all duration-300 ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
          <Button variant="primary" className="text-xs px-6 py-2.5" onClick={() => handleNavClick('contact')}>Contact Me</Button>
        </nav>

        <button className="md:hidden text-[#F5F0F1]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1E0A0D] shadow-2xl py-6 px-6 flex flex-col space-y-6 border-t border-white/5">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleNavClick(link.id)} className={`text-left font-medium text-lg uppercase tracking-wider ${currentPage === link.id ? 'text-[#8B1E3F]' : 'text-[#F5F0F1] hover:text-[#8B1E3F]'}`}>
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC<NavProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-[#150709] text-[#F5F0F1] pt-24 pb-12 border-t border-[#8B1E3F]/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5 pr-10">
            <button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="text-3xl font-bold tracking-widest text-[#F5F0F1] uppercase block mb-6 text-left" style={{ fontFamily: theme.fonts.heading }}>
              Alazar<span className="text-[#8B1E3F]">.</span>
            </button>
            <p className="text-[#A89597] max-w-sm mb-8 leading-relaxed font-light">
              Premium cinematic video editing and expert graphic design services for brands that demand excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#8B1E3F]/30 flex items-center justify-center text-[#A89597] hover:bg-[#8B1E3F] hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#8B1E3F]/30 flex items-center justify-center text-[#A89597] hover:bg-[#8B1E3F] hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#8B1E3F]/30 flex items-center justify-center text-[#A89597] hover:bg-[#8B1E3F] hover:text-white transition-all"><Linkedin size={18} /></a>
            </div>
          </div>
          
          <div className="md:col-span-7 flex flex-wrap gap-16 md:justify-end">
            <div>
              <h4 className="text-white mb-6 uppercase tracking-widest text-xs font-semibold text-[#8B1E3F]">Navigation</h4>
              <ul className="space-y-4 text-[#A89597] font-light">
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="hover:text-[#F5F0F1]">Home</button></li>
                <li><button onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }} className="hover:text-[#F5F0F1]">Portfolio</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-[#F5F0F1]">Services</button></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A89597] tracking-wider uppercase font-light">
          <p>&copy; {new Date().getFullYear()} Alazar Asdesach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const HeroSection: React.FC<NavProps> = ({ setCurrentPage }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#1E0A0D]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#8B1E3F]/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight text-[#F5F0F1] tracking-tight" style={{ fontFamily: theme.fonts.heading }}>
            Cinematic Vision.<br/>
            <span className="italic font-light text-[#A89597]">Premium Design.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#A89597] max-w-2xl mx-auto leading-relaxed font-light">
            Crafting compelling narratives through high-end video editing and striking graphic design for visionary brands.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button variant="primary" icon={<ArrowRight size={18} />} onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>Explore Work</Button>
            <Button variant="secondary" icon={<Play size={18} />} onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>Watch Showreel</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Home: React.FC<NavProps> = ({ setCurrentPage }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <HeroSection setCurrentPage={setCurrentPage} />
      
      <section className="py-24 bg-[#1E0A0D] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-4xl font-normal text-[#F5F0F1] mb-8" style={{ fontFamily: theme.fonts.heading }}>Visual Storyteller & Architect of Aesthetics</h2>
          <p className="text-[#A89597] font-light text-lg leading-relaxed">I bridge the gap between motion and still imagery. Based on years of refining my craft, I bring a deep understanding of pacing, color theory, and narrative structure to every project.</p>
        </div>
      </section>

      <section className="py-24 bg-[#2E1216]">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-normal text-[#F5F0F1] mb-16" style={{ fontFamily: theme.fonts.heading }}>Two Disciplines.<br/><span className="italic text-[#A89597]">One Vision.</span></h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div onClick={() => setCurrentPage('portfolio')} className="cursor-pointer group p-10 bg-[#1E0A0D] border border-white/5 rounded-xl hover:border-[#8B1E3F]/50 transition-all">
               <Film size={40} className="text-[#8B1E3F] mb-6 mx-auto" />
               <h3 className="text-2xl text-[#F5F0F1] mb-3" style={{ fontFamily: theme.fonts.heading }}>Video Editing</h3>
               <p className="text-[#A89597] font-light text-sm">Cinematic storytelling, dynamic cuts, and color grading.</p>
            </div>
            <div onClick={() => setCurrentPage('portfolio')} className="cursor-pointer group p-10 bg-[#1E0A0D] border border-white/5 rounded-xl hover:border-[#8B1E3F]/50 transition-all">
               <Layout size={40} className="text-[#8B1E3F] mb-6 mx-auto" />
               <h3 className="text-2xl text-[#F5F0F1] mb-3" style={{ fontFamily: theme.fonts.heading }}>Graphic Design</h3>
               <p className="text-[#A89597] font-light text-sm">Brand identities, typography, and premium digital assets.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState<CategoryType>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = portfolioProjects.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

  return (
    <div className="min-h-screen bg-[#1E0A0D] pt-32 pb-24 animate-in fade-in duration-500">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#F5F0F1] mb-6" style={{ fontFamily: theme.fonts.heading }}>
          Selected <span className="italic font-light text-[#A89597]">Works</span>
        </h1>
        <div className="inline-flex bg-[#2E1216] p-1.5 rounded-full border border-white/5 mt-8">
          <button onClick={() => setFilter('all')} className={`px-6 py-2.5 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-[#8B1E3F] text-white' : 'text-[#A89597]'}`}>All</button>
          <button onClick={() => setFilter('video')} className={`px-6 py-2.5 rounded-full text-sm font-medium ${filter === 'video' ? 'bg-[#8B1E3F] text-white' : 'text-[#A89597]'}`}>Video</button>
          <button onClick={() => setFilter('design')} className={`px-6 py-2.5 rounded-full text-sm font-medium ${filter === 'design' ? 'bg-[#8B1E3F] text-white' : 'text-[#A89597]'}`}>Design</button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer rounded-sm overflow-hidden bg-[#2E1216] aspect-[4/5]"
            >
              <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A0D] to-transparent opacity-90"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl text-[#F5F0F1] mb-2" style={{ fontFamily: theme.fonts.heading }}>{project.title}</h3>
                <p className="text-[#A89597] text-xs uppercase tracking-widest">{project.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="bg-[#2E1216] border border-white/10 p-8 rounded-2xl max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl text-white mb-4" style={{ fontFamily: theme.fonts.heading }}>{selectedProject.title}</h2>
            <p className="text-[#A89597] text-sm mb-6">{selectedProject.description}</p>
            <Button variant="primary" onClick={() => setSelectedProject(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ServicesPage: React.FC<NavProps> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-[#1E0A0D] pt-32 pb-24 animate-in fade-in duration-500">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-[#F5F0F1] mb-6" style={{ fontFamily: theme.fonts.heading }}>
            Offerings & <span className="italic font-light text-[#A89597]">Process</span>
          </h1>
          <p className="text-[#A89597] font-light text-lg">Whether you need remote freelance support or an in-person shoot, my services are tailored to elevate your brand.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-[#2E1216] border border-white/5 p-10 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Film size={120} /></div>
            <h2 className="text-3xl text-[#F5F0F1] mb-6 relative z-10" style={{ fontFamily: theme.fonts.heading }}>Freelance & Remote</h2>
            <p className="text-[#A89597] mb-8 font-light leading-relaxed">High-end post-production and design assets delivered globally.</p>
            <ul className="space-y-4 mb-8">
              {['Cinematic Color Grading', 'Commercial Video Editing', 'Brand Identity Design', 'Social Media Asset Creation'].map((item, i) => (
                <li key={i} className="flex items-center text-[#F5F0F1] font-light"><CheckCircle2 size={18} className="text-[#8B1E3F] mr-3" /> {item}</li>
              ))}
            </ul>
            <Button variant="outline" onClick={() => setCurrentPage('contact')}>Request Quote</Button>
          </div>

          <div className="bg-[#2E1216] border border-[#8B1E3F]/30 p-10 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><MapPin size={120} /></div>
            <h2 className="text-3xl text-[#F5F0F1] mb-6 relative z-10" style={{ fontFamily: theme.fonts.heading }}>In-Person Business</h2>
            <p className="text-[#A89597] mb-8 font-light leading-relaxed">Hands-on videography and local design consultations.</p>
            <ul className="space-y-4 mb-8">
              {['On-Set Videography', 'Studio Strategy Sessions', 'Local Event Coverage', 'Direct Art Direction'].map((item, i) => (
                <li key={i} className="flex items-center text-[#F5F0F1] font-light"><CheckCircle2 size={18} className="text-[#8B1E3F] mr-3" /> {item}</li>
              ))}
            </ul>
            <Button variant="primary" onClick={() => setCurrentPage('contact')}>Contact Me</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1E0A0D] pt-32 pb-24 animate-in fade-in duration-500">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#F5F0F1] mb-6" style={{ fontFamily: theme.fonts.heading }}>
              Let's <span className="italic font-light text-[#A89597]">Create.</span>
            </h1>
            <p className="text-[#A89597] font-light text-lg mb-12 leading-relaxed">
              Ready to start your next visual project? Fill out the form or reach out directly to discuss availability and pricing.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2E1216] border border-white/5 rounded-full flex items-center justify-center text-[#8B1E3F]"><Mail size={20} /></div>
                <div>
                  <p className="text-sm text-[#A89597] uppercase tracking-wider font-semibold">Email</p>
                  <p className="text-[#F5F0F1] font-light">hello@alazar.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2E1216] border border-white/5 rounded-full flex items-center justify-center text-[#8B1E3F]"><Phone size={20} /></div>
                <div>
                  <p className="text-sm text-[#A89597] uppercase tracking-wider font-semibold">Phone</p>
                  <p className="text-[#F5F0F1] font-light">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2E1216] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email Address" type="email" placeholder="john@company.com" />
              
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#A89597] font-medium tracking-wide uppercase">Project Type</label>
                <select className="w-full bg-[#1E0A0D] border border-white/10 rounded-lg px-4 py-3 text-[#F5F0F1] focus:outline-none focus:border-[#8B1E3F] appearance-none">
                  <option value="freelance-video">Freelance Video Editing</option>
                  <option value="freelance-design">Freelance Graphic Design</option>
                  <option value="in-person">In-Person Consultation / Shoot</option>
                </select>
              </div>

              <Input label="Project Details" multiline placeholder="Tell me about your vision..." />
              
              <Button type="submit" variant="primary" className="w-full py-4 mt-4">Send Inquiry</Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'portfolio': return <PortfolioPage />;
      case 'services': return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'contact': return <ContactPage />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="font-sans bg-[#1E0A0D] text-[#F5F0F1] selection:bg-[#8B1E3F] selection:text-white min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
