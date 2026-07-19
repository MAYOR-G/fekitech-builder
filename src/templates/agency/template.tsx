"use client";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import EditableText from "@/components/editor/blocks/EditableText";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";

const themeStyles = {} as React.CSSProperties;

export default function AgencyTemplate({ data }: { data: TemplateData }) {
  const templateData = mergeTemplateData(editableData, data);

  return (
    <TemplateContext.Provider value={templateData}>
      <div
        style={themeStyles}
        className="template-wrapper min-h-screen font-sans"
      >
        <div
          className="min-h-screen font-sans"
          style={{
            backgroundColor: templateData.colors?.background,
            color: templateData.colors?.text,
          }}
        >
          <header id="top" className="py-6 px-8 md:px-16 flex justify-between items-center border-b border-black/5">
            <EditableText
              section="hero"
              field="title"
              value={templateData.hero?.title}
              as="div"
              className="font-bold text-2xl tracking-tighter"
              style={{ color: templateData.colors?.primary }}
            />
            <nav className="hidden md:flex gap-8 font-medium text-sm">
              <a href="#top" className="hover:opacity-70 transition-opacity">Home</a>
              <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
              <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
            </nav>
          </header>

          <main>
            <section className="py-32 px-8 md:px-16 flex flex-col items-center text-center max-w-5xl mx-auto">
              <EditableText
                section="hero"
                field="title"
                value={templateData.hero?.title}
                as="h1"
                className="text-5xl md:text-7xl font-bold mb-8 font-heading leading-tight tracking-tight"
              />
              <EditableText
                section="hero"
                field="subtitle"
                value={templateData.hero?.subtitle}
                as="p"
                className="text-xl md:text-2xl opacity-70 mb-12 max-w-3xl leading-relaxed"
              />
              <a
                href="#contact"
                className="px-10 py-5 rounded-full font-bold text-white text-lg transition-transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: templateData.colors?.primary }}
              >
                <EditableText
                  section="hero"
                  field="button"
                  value={templateData.hero?.button}
                  as="span"
                />
              </a>
            </section>

            <section id="services" className="py-24 px-8 md:px-16 bg-black/5">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center font-heading">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {(templateData.services || []).map((service, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                      <p className="opacity-70 leading-relaxed">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <footer id="contact" className="py-12 px-8 text-center opacity-60 text-sm">
            &copy; {new Date().getFullYear()} {templateData.hero?.title}. All rights reserved.
          </footer>
        </div>
      </div>
    </TemplateContext.Provider>
  );
}
