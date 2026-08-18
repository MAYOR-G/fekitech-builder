import React from "react";
import { useTemplateData } from "../TemplateContext";
import { MapPin, Phone, Mail } from "lucide-react";

export function Location() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[#f9f8f6]" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            {data.location.title}
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find us easily in the heart of West London. We have comfortable and modern facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Clinic</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Address</h4>
                    <p className="text-gray-600">{data.brand.address}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-gray-600">{data.brand.phone}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600">{data.brand.email}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Opening Hours</h4>
              <p className="text-gray-600">{data.brand.hours}</p>
            </div>
          </div>

          {/* Map/Image side */}
          <div className="rounded-2xl overflow-hidden h-[500px] bg-gray-200">
            <img
              src={data.location.image}
              alt="Clinic Location"
              className="w-full h-full object-cover grayscale-[0.2]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
