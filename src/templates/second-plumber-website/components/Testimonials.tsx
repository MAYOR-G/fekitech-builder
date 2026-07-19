"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const testimonials = [
  {
    quote: "ClearFlow engineered a complete repipe of our 1920s commercial property with zero disruption to our ground-floor retail tenants. Exceptional technical competence.",
    author: "Margaret Chen, Birmingham",
    role: "Commercial Property Manager",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "They diagnosed a slab leak that three other firms missed using their thermal imaging. The precision saved us thousands in unnecessary concrete demolition.",
    author: "David Harrison, Leeds",
    role: "Residential Client",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "The only firm we trust for high-end architectural bathroom installations. Their attention to detail on custom fixtures and rough-ins is unmatched in the region.",
    author: "Sophie Althaus, London",
    role: "Interior Architect",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Emergency response times are as promised. We had a catastrophic main line failure at 3 AM; they had the pressure stabilized and repair underway by 4:30 AM.",
    author: "James Sterling, Manchester",
    role: "Facility Director",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  }
];

const Testimonials = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-[#F2F2EE]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-plumber-copper"></span>
            <span className="font-mono text-sm tracking-wider uppercase text-plumber-copper font-medium">
              Client Standards
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-plumber-charcoal">
            Verified Excellence.
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 w-max pb-12">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="w-[85vw] md:w-[600px] bg-white p-10 md:p-14 shadow-xl shadow-plumber-charcoal/5 flex flex-col justify-between"
            >
              <div>
                <svg className="w-12 h-12 text-plumber-copper/20 mb-8" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-xl md:text-2xl text-plumber-charcoal leading-relaxed mb-10 font-medium">
                  {item.quote}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <TemplateImage src={item.img} alt={item.author} className="w-14 h-14 rounded-full object-cover grayscale" />
                <div>
                  <h4 className="font-display font-bold text-plumber-charcoal text-lg">{item.author}</h4>
                  <p className="text-plumber-slate text-sm">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
