"use client";
import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";
import { Plus, Minus } from "lucide-react";

export function FeaturesAccordion() {
  const data = useTemplateData();
  const [openId, setOpenId] = useState<string>(data.features.items[0].id);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            {data.features.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="rounded-2xl overflow-hidden h-[500px] bg-[#e6e2db]">
            <img
              src={data.features.image}
              alt="Dental features"
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>

          {/* Accordion side */}
          <div className="space-y-4">
            {data.features.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-gray-200 pb-4"
                >
                  <button
                    className="w-full flex items-center justify-between text-left py-4 focus:outline-none"
                    onClick={() => setOpenId(isOpen ? "" : item.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-bold text-[#c95d3c]">{item.id}.</span>
                      <h3 className={`text-xl font-bold transition-colors ${isOpen ? "text-[#c95d3c]" : "text-gray-900"}`}>
                        {item.title}
                      </h3>
                    </div>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 pl-10 pr-4 pb-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
