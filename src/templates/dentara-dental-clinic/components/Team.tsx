"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Team() {
  const data = useTemplateData();

  return (
    <section id="team" className="py-12 sm:py-16 lg:py-24 bg-[#f5f8fb]">
      <div className="dentara-container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="dentara-badge mb-4">
            <span data-editable-path="team.badge" data-editable-type="text">
              {data.team.badge}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] tracking-tight leading-tight mb-4 font-heading"
            data-editable-path="team.title"
            data-editable-type="text"
          >
            {data.team.title}
          </h2>
          <p
            className="text-base sm:text-lg text-[#6d6d6d] leading-relaxed"
            data-editable-path="team.subtitle"
            data-editable-type="text"
          >
            {data.team.subtitle}
          </p>
        </div>

        {/* 6 Specialist Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.team.members.map((member, idx) => (
            <div
              key={idx}
              className="dentara-card overflow-hidden bg-white flex flex-col p-4 sm:p-5 group"
            >
              {/* Doctor Portrait */}
              <div className="relative rounded-2xl overflow-hidden mb-5 bg-[#f5f8fb] aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.imageAlt}
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                  data-editable-path={`team.members.${idx}.image`}
                  data-editable-type="image"
                  data-editable-alt-path={`team.members.${idx}.imageAlt`}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col items-start px-2 pb-2">
                <h3
                  className="text-xl font-bold text-[#0f0f0f] tracking-tight mb-1 font-heading"
                  data-editable-path={`team.members.${idx}.name`}
                  data-editable-type="text"
                >
                  {member.name}
                </h3>
                <span
                  className="text-sm font-semibold text-[#0454ff] mb-1"
                  data-editable-path={`team.members.${idx}.role`}
                  data-editable-type="text"
                >
                  {member.role}
                </span>
                <span
                  className="text-xs text-[#6d6d6d] font-medium"
                  data-editable-path={`team.members.${idx}.qualifications`}
                  data-editable-type="text"
                >
                  {member.qualifications}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
