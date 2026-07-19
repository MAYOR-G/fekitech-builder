"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { Reveal } from "./Reveal";

import { useTemplateData } from "../TemplateContext";
export function AboutStudio() {
  const { brand } = useTemplateData();

  return (
    <section id="about" className="bg-white px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <Reveal>
            <div className="relative">
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-chantilly rounded-sm border border-chocolate/5 transform -rotate-2 -z-10" />
              
              <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-sm bg-chocolate/5">
                <TemplateImage 
                  src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=85" 
                  alt="A beautiful modern cake studio set up" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badge */}
              <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white p-6 rounded-sm shadow-xl border border-chocolate/10 max-w-[200px]">
                <p className="font-display italic text-2xl text-ganache text-center">
                  &quot;Every detail, considered.&quot;
                </p>
              </div>
            </div>
          </Reveal>

          {/* Text Side */}
          <Reveal delay={100}>
            <div className="max-w-xl">
              <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-rose/90">
                The Studio
              </p>
              <h2 className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-ganache sm:text-5xl lg:text-[4rem] mb-8">
                Baking as a fine art.
              </h2>
              <div className="space-y-6 text-[1.05rem] leading-[1.8] tracking-wide text-[#2D2D2D]">
                <p>
                  At {brand.name}, we believe that a celebration cake should be as memorable as the occasion it honors. Our studio focuses on combining structural elegance with exceptional, balanced flavours.
                </p>
                <p>
                  We source premium ingredients—real butter, pure vanilla bean, and Belgian chocolate—to ensure that the interior of the cake is as considered as the exterior finish. Every petal, ribbon, and tier is placed with intention.
                </p>
                <p>
                  Based in our New York studio, we work closely with clients to translate their vision into an edible centrepiece, offering a calm, guided ordering process from the initial tasting to the venue delivery.
                </p>
              </div>
              
              <div className="mt-10 pt-10 border-t border-chocolate/10">
                <TemplateImage 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=100&h=100&q=85" 
                  alt="Head baker" 
                  className="w-16 h-16 rounded-full object-cover grayscale opacity-80"
                />
                <p className="mt-4 font-display text-xl text-ganache">Eleanor Vane</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2D2D2D]/75">Creative Director & Head Baker</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
