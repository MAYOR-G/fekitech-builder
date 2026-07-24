import React from "react";
import { useTemplateData } from "../TemplateContext";
import { FacebookLogo, InstagramLogo, TwitterLogo } from "@phosphor-icons/react";

export default function Footer() {
  const data = useTemplateData();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    // Simulate successful subscription
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <footer className="bg-[#3a2d2a] text-white pt-24 pb-12 relative z-0 mt-[-1px]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-b border-white/10 pb-12 mb-12">
          
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-serif text-xl mb-4 text-white">Follow Us</h4>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <a href={data.footer.social.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-white text-[#3a2d2a] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 transition-all duration-300">
                <FacebookLogo size={20} weight="fill" />
              </a>
              <a href={data.footer.social.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-white text-[#3a2d2a] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 transition-all duration-300">
                <InstagramLogo size={20} weight="fill" />
              </a>
              <a href={data.footer.social.twitter} aria-label="Twitter" className="w-10 h-10 rounded-full bg-white text-[#3a2d2a] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 transition-all duration-300">
                <TwitterLogo size={20} weight="fill" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
             <div className="bg-[#3a2d2a] rounded-full p-4 shadow-lg border-2 border-dashed border-white/20 flex items-center justify-center w-32 h-32 relative">
              {data.brand.logo ? (
                <img src={data.brand.logo} alt={data.brand.name} className="w-full h-full object-contain relative z-10" />
              ) : (
                <div className="text-center relative z-10 leading-tight flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl text-white block font-black" style={{ lineHeight: 1 }}>{data.brand.name.split(" ")[0]}</span>
                  <span className="font-sans text-[0.6rem] text-[var(--color-secondary)] uppercase tracking-widest font-bold mt-1">
                    {data.brand.name.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-right">
            <h4 className="font-serif text-xl mb-4 text-white">Join Our Newsletter</h4>
            <form onSubmit={handleSubscribe} className="flex flex-col items-center md:items-end gap-2">
               <div className="flex w-full max-w-xs relative">
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                   placeholder="Your email address..." 
                   className={`w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 border rounded-l-md outline-none focus:border-[var(--color-primary)] ${status === 'error' ? 'border-red-500' : 'border-transparent'}`}
                 />
                 <button type="submit" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-r-md hover:bg-[var(--color-primary)]/90 transition-colors font-bold uppercase text-xs tracking-wider">
                   Subscribe
                 </button>
               </div>
               {status === "error" && <span className="text-red-400 text-xs">Please enter a valid email.</span>}
               {status === "success" && <span className="text-green-400 text-xs">Thank you for subscribing!</span>}
            </form>
          </div>

        </div>

        <div className="text-center">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
            {data.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
