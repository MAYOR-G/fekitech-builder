"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { CalendarCheck, Send } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./Reveal";

import { useTemplateData } from "../TemplateContext";
export function AppointmentCTA() {
  const { appointmentOptions, brand, clinicImages } = useTemplateData();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    visitType: appointmentOptions[0],
    message: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="appointment" className="bg-ink px-5 py-20 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <Reveal>
          <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/12 shadow-soft">
            <TemplateImage
              src={clinicImages.booking}
              alt="Bright dental consultation room prepared for an appointment."
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,39,43,0.12)_0%,rgba(19,39,43,0.78)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">
                Book a visit
              </p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.02]">
                Start with a calm conversation.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/76">
                Call {brand.phone}, email {brand.email}, or use the appointment
                form placeholder to connect the template to your real workflow.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="h-full rounded-[2rem] border border-white/12 bg-white p-5 text-ink shadow-soft sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-pearl text-ocean">
                <CalendarCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean">
                  Appointment request
                </p>
                <h3 className="font-display text-3xl font-semibold">
                  Tell us what you need.
                </h3>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className="min-h-12 w-full rounded-[0.9rem] border border-ink/12 bg-porcelain px-4 text-base outline-none transition focus:border-ocean focus:ring-4 focus:ring-ocean/15"
                  placeholder="Alex Morgan"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="min-h-12 w-full rounded-[0.9rem] border border-ink/12 bg-porcelain px-4 text-base outline-none transition focus:border-ocean focus:ring-4 focus:ring-ocean/15"
                  placeholder="alex@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="min-h-12 w-full rounded-[0.9rem] border border-ink/12 bg-porcelain px-4 text-base outline-none transition focus:border-ocean focus:ring-4 focus:ring-ocean/15"
                  placeholder="(312) 555-0198"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="visitType" className="text-sm font-semibold">
                  Visit type
                </label>
                <select
                  id="visitType"
                  name="visitType"
                  value={form.visitType}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      visitType: event.target.value,
                    }))
                  }
                  className="min-h-12 w-full rounded-[0.9rem] border border-ink/12 bg-porcelain px-4 text-base outline-none transition focus:border-ocean focus:ring-4 focus:ring-ocean/15"
                >
                  {appointmentOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label htmlFor="message" className="text-sm font-semibold">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                className="min-h-36 w-full rounded-[0.9rem] border border-ink/12 bg-porcelain px-4 py-3 text-base outline-none transition focus:border-ocean focus:ring-4 focus:ring-ocean/15"
                placeholder="Share a concern, preferred appointment time, or treatment interest."
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ocean focus:outline-none focus-visible:ring-4 focus-visible:ring-ocean/24"
            >
              Send Request
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="mt-5 text-sm leading-6 text-graphite/66">
              This frontend form is a template placeholder. Connect it to a
              secure booking or intake provider before collecting patient data.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
