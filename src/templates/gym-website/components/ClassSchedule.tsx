"use client";
import React, { useState } from 'react';

const schedule = [
  { time: "06:00 AM", class: "HIIT Blast", trainer: "Marcus Cole", duration: "45 min" },
  { time: "07:30 AM", class: "Strength & Conditioning", trainer: "David Chen", duration: "60 min" },
  { time: "09:00 AM", class: "Mobility Flow", trainer: "Elena Rodriguez", duration: "45 min" },
  { time: "12:00 PM", class: "Express Strength", trainer: "Marcus Cole", duration: "45 min" },
  { time: "05:30 PM", class: "HIIT & Core", trainer: "Elena Rodriguez", duration: "50 min" },
  { time: "06:45 PM", class: "Heavy Lifts", trainer: "David Chen", duration: "60 min" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ClassSchedule = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="schedule" className="relative z-20 py-24 bg-gym-charcoal lg:-mt-[100vh]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm">Timetable</h2>
            <h3 className="text-4xl md:text-5xl font-black font-display uppercase">Class Schedule</h3>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 mb-8 pb-4 hide-scrollbar">
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`min-w-[80px] py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors ${activeDay === idx ? 'bg-gym-accent text-gym-darker' : 'bg-gym-dark text-gray-400 hover:bg-white/10'}`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="bg-gym-dark rounded-3xl overflow-hidden border border-white/5">
          <div className="divide-y divide-white/5">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 mb-4 md:mb-0">
                  <div className="font-display font-bold text-xl text-gym-accent w-24">
                    {item.time}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 group-hover:text-white transition-colors">{item.class}</h4>
                    <p className="text-sm text-gray-400">with {item.trainer}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <span className="text-sm text-gray-400">{item.duration}</span>
                  <button className="px-6 py-2 rounded-full border border-white/20 text-sm font-bold uppercase tracking-wider group-hover:bg-white group-hover:text-gym-darker transition-colors">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
