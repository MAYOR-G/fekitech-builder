"use client";
import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export function Booking() {
  const data = useTemplateData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="dentara-container">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="dentara-badge mb-4">
            <span data-editable-path="booking.badge" data-editable-type="text">
              {data.booking.badge}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] tracking-tight leading-tight mb-4 font-heading"
            data-editable-path="booking.title"
            data-editable-type="text"
          >
            {data.booking.title}
          </h2>
          <p
            className="text-base sm:text-lg text-[#6d6d6d] leading-relaxed"
            data-editable-path="booking.description"
            data-editable-type="text"
          >
            {data.booking.description}
          </p>
        </div>

        {/* Two Column Booking & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Clinic Image & Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-[28px] overflow-hidden border border-[#e0e7fe] shadow-sm group">
              <img
                src={data.booking.image}
                alt={data.booking.imageAlt}
                className="w-full h-[280px] sm:h-[340px] object-cover object-center group-hover:scale-103 transition-transform duration-500"
                data-editable-path="booking.image"
                data-editable-type="image"
                data-editable-alt-path="booking.imageAlt"
              />
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#f5f8fb] border border-[#e2e8f0]">
                <div className="w-9 h-9 rounded-xl bg-[#0454ff]/10 text-[#0454ff] flex items-center justify-center mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs text-[#6d6d6d] font-semibold uppercase block mb-1">
                  Call Clinic
                </span>
                <a
                  href={data.brand.phoneHref}
                  className="text-sm font-bold text-[#0f0f0f] hover:text-[#0454ff] transition-colors"
                  data-editable-path="brand.phone"
                  data-editable-type="link"
                  data-editable-href-path="brand.phoneHref"
                >
                  {data.brand.phone}
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f8fb] border border-[#e2e8f0]">
                <div className="w-9 h-9 rounded-xl bg-[#0454ff]/10 text-[#0454ff] flex items-center justify-center mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs text-[#6d6d6d] font-semibold uppercase block mb-1">
                  Email Us
                </span>
                <a
                  href={data.brand.emailHref}
                  className="text-xs font-bold text-[#0f0f0f] hover:text-[#0454ff] transition-colors truncate block"
                  data-editable-path="brand.email"
                  data-editable-type="link"
                  data-editable-href-path="brand.emailHref"
                >
                  {data.brand.email}
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f8fb] border border-[#e2e8f0] sm:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0454ff]/10 text-[#0454ff] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6d6d6d] font-semibold uppercase block mb-1">
                      Clinic Location
                    </span>
                    <span
                      className="text-sm font-bold text-[#0f0f0f] leading-snug"
                      data-editable-path="brand.address"
                      data-editable-type="text"
                    >
                      {data.brand.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f8fb] border border-[#e2e8f0] sm:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0454ff]/10 text-[#0454ff] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6d6d6d] font-semibold uppercase block mb-1">
                      Opening Hours
                    </span>
                    <span
                      className="text-sm font-medium text-[#2f2f2f] leading-snug"
                      data-editable-path="brand.hours"
                      data-editable-type="text"
                    >
                      {data.brand.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form Card */}
          <div className="lg:col-span-7 bg-[#f5f8fb] border border-[#e0e7fe] rounded-[28px] p-6 sm:p-10 shadow-sm">
            <div className="mb-6">
              <h3
                className="text-2xl font-bold text-[#0f0f0f] tracking-tight mb-2 font-heading"
                data-editable-path="booking.formTitle"
                data-editable-type="text"
              >
                {data.booking.formTitle}
              </h3>
              <p
                className="text-sm text-[#6d6d6d]"
                data-editable-path="booking.formSubtitle"
                data-editable-type="text"
              >
                {data.booking.formSubtitle}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-white border border-[#e0e7fe] text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0f0f0f] mb-2 font-heading">
                  Thank you! Consultation Requested.
                </h4>
                <p className="text-sm text-[#6d6d6d] max-w-md mb-6">
                  Our reception team has received your message and will call or email you within 24 hours to confirm your preferred appointment slot.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="dentara-btn-secondary py-2.5 px-6 text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f0f] mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={data.booking.formFields.namePlaceholder}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e2e8f0] bg-white text-[#0f0f0f] text-sm focus:outline-none focus:border-[#0454ff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f0f] mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={data.booking.formFields.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e2e8f0] bg-white text-[#0f0f0f] text-sm focus:outline-none focus:border-[#0454ff] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f0f] mb-1.5 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={data.booking.formFields.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e2e8f0] bg-white text-[#0f0f0f] text-sm focus:outline-none focus:border-[#0454ff] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f0f] mb-1.5 uppercase tracking-wide">
                      Treatment Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e2e8f0] bg-white text-[#0f0f0f] text-sm focus:outline-none focus:border-[#0454ff] transition-colors"
                    >
                      <option value="">{data.booking.formFields.servicePlaceholder}</option>
                      {data.booking.servicesOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0f0f0f] mb-1.5 uppercase tracking-wide">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder={data.booking.formFields.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-[#0f0f0f] text-sm focus:outline-none focus:border-[#0454ff] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="dentara-btn-primary w-full py-4 text-base font-bold justify-center"
                >
                  <Send className="w-4 h-4" />
                  <span
                    data-editable-path="booking.formFields.submitButton"
                    data-editable-type="text"
                  >
                    {data.booking.formFields.submitButton}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
