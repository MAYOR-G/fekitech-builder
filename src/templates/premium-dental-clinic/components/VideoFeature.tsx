import React from "react";
import { useTemplateData } from "../TemplateContext";
import { Check, Play } from "lucide-react";

export function VideoFeature() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight mb-6 max-w-md">
            {data.videoFeature.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
            {data.videoFeature.description}
          </p>

          <div className="space-y-4 mb-10">
            {data.videoFeature.list.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                </div>
                <p className="ml-3 text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            {data.videoFeature.cta}
          </a>
        </div>

        {/* Image side */}
        <div className="order-1 lg:order-2 relative">
          <div className="rounded-2xl overflow-hidden h-[600px] bg-gray-100">
            <img
              src={data.videoFeature.image}
              alt="Video Feature"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay Box */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md rounded-xl p-4 flex items-center space-x-4 max-w-xs text-white">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium leading-tight">Transforming smiles, improving lives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
