"use client";
const Footer = () => {
  return (
    <footer id="contact" className="bg-plumber-charcoal pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          <div className="w-full lg:w-1/2">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
              Ready to <br/><span className="text-plumber-copper">restore flow?</span>
            </h2>
            <p className="text-plumber-slate text-lg max-w-md mb-12">
              Engage our technical team for a comprehensive infrastructure survey and engineering proposal.
            </p>
            
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-plumber-copper flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span className="block text-plumber-slate text-sm font-mono mb-1">24/7 DISPATCH</span>
                <span className="block text-white text-2xl font-display font-bold group-hover:text-plumber-copper transition-colors">0800 123 4567</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-md">
            <form className="flex flex-col gap-6">
              <div className="relative group">
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-plumber-copper transition-colors peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-plumber-slate transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-plumber-copper peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Full Name / Organization
                </label>
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-plumber-copper transition-colors peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-plumber-slate transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-plumber-copper peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <textarea 
                  id="details" 
                  rows={3}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-plumber-copper transition-colors peer resize-none"
                  placeholder=" "
                ></textarea>
                <label 
                  htmlFor="details" 
                  className="absolute left-0 top-4 text-plumber-slate transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-plumber-copper peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Project Details / Requirements
                </label>
              </div>

              <button type="button" className="bg-plumber-copper text-white py-4 mt-4 font-medium hover:bg-white hover:text-plumber-charcoal transition-colors flex items-center justify-center gap-2 group">
                Submit Request
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-plumber-slate text-sm font-mono">
          <p>&copy; {new Date().getFullYear()} ClearFlow Engineering Ltd.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-plumber-copper transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-plumber-copper transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-plumber-copper transition-colors">Certifications</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
