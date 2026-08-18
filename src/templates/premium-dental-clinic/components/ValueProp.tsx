import React from "react";
import { useTemplateData } from "../TemplateContext";
import { ShieldCheck, Star, Award } from "lucide-react";

export function ValueProp() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden h-[500px] bg-gray-100">
            <img
              src={data.valueProp.image}
              alt="Dental care"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Awards overlay on bottom left */}
          <div className="absolute -bottom-6 -left-6 flex space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col items-center justify-center w-20 h-24 border border-gray-100">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-1" />
              <span className="text-[10px] font-bold text-center leading-tight">Top Rated Clinic</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col items-center justify-center w-20 h-24 border border-gray-100">
              <Star className="w-8 h-8 text-yellow-500 mb-1" />
              <span className="text-[10px] font-bold text-center leading-tight">5 Star Service</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col items-center justify-center w-20 h-24 border border-gray-100">
              <Award className="w-8 h-8 text-red-500 mb-1" />
              <span className="text-[10px] font-bold text-center leading-tight">Award Winning</span>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="lg:pl-8">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight mb-6">
            {data.valueProp.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {data.valueProp.description}
          </p>
          <a
            href="#"
            className="inline-flex bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            {data.valueProp.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
