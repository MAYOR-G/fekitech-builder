"use client";
const Footer = () => {
  return (
    <footer className="bg-furniture-text text-furniture-bg pt-32 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="font-display text-5xl md:text-7xl mb-8">
              Begin a<br/><span className="italic text-furniture-ochre">Conversation.</span>
            </h2>
            <p className="text-furniture-bg/70 text-lg max-w-sm mb-12">
              Our atelier works closely with clients worldwide to create pieces of enduring significance.
            </p>
            <a href="mailto:inquiries@walnutandform.com" className="text-2xl font-light hover:text-furniture-ochre transition-colors inline-block border-b border-transparent hover:border-furniture-ochre pb-1">
              inquiries@walnutandform.com
            </a>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-12">
            <div>
              <h4 className="font-mono text-xs tracking-widest uppercase text-furniture-ochre mb-6">Location</h4>
              <p className="font-light leading-relaxed text-furniture-bg/80">
                124 Industrial Way<br/>
                Portland, OR 97201<br/>
                By Appointment Only
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs tracking-widest uppercase text-furniture-ochre mb-6">Social</h4>
              <div className="flex flex-col gap-2 font-light text-furniture-bg/80">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Pinterest</a>
                <a href="#" className="hover:text-white transition-colors">Journal</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-furniture-bg/20 text-sm font-light text-furniture-bg/50">
          <p>&copy; {new Date().getFullYear()} Walnut & Form. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Shipping</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
