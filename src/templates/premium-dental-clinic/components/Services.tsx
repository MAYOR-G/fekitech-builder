import React from "react";
import { useTemplateData } from "../TemplateContext";
import { ArrowRight } from "lucide-react";

export function Services() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[#f9f8f6]" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            {data.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.services.items.map((service, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
              <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-black group-hover:text-gray-600 transition-colors">
                {service.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-3 bg-white border border-gray-200 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 pr-2">
              {data.services.cta}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
