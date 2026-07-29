import React from "react";
import { useTemplateData } from "../TemplateContext";
import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { brand, social, footer, navigation, visit, packages } = useTemplateData();
  const hours = visit?.hours ?? [
    { day: "Tue - Fri", time: "7 AM - 5 PM" },
    { day: "Saturday", time: "8 AM - 4 PM" },
    { day: "Sunday", time: "Pre-orders only" },
  ];
  const areas = visit?.areas ?? ["Birmingham", "Solihull", "Wolverhampton", "Coventry"];

  return (
    <footer className="gf-footer">
      {packages && (
        <div className="gf-packages" id="packages">
          <div className="gf-package-head">
            <div>
              <span>Packages</span>
              <h2>{packages.title}</h2>
            </div>
            <p>{packages.description}</p>
          </div>

          <div className="gf-package-grid">
            {packages.items.map((pkg, idx) => (
              <div key={pkg.name} className={idx === 1 ? "gf-package is-featured" : "gf-package"}>
                <h3>{pkg.name}</h3>
                <div>{pkg.price}</div>
                <p>{pkg.description}</p>
                
                <ul>
                  {pkg.features.map((f, i) => (
                    <li key={i}>
                      <span aria-hidden="true">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                
                <a href={pkg.buttonHref}>
                  {pkg.buttonLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="gf-footer-inner">
        <div className="gf-visit-grid">
          <div className="gf-visit-main">
            <h2>{visit?.title ?? "Pastry for mornings, meetings and parties."}</h2>
            <p>{visit?.description ?? footer.note}</p>
            <div>
              <a href={visit?.primaryHref ?? `mailto:${brand.email}`}>
                {visit?.primaryLabel ?? "Plan an order"}
              </a>
            </div>
          </div>

          <div className="gf-footer-column">
            <h4>Hours</h4>
            <ul>
              {hours.map((h, i) => (
                <li key={i}>
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="gf-footer-column">
            <h4>Visit</h4>
            <p>
              <span>{visit?.areasLabel ?? "Delivery and collection"}</span><br />
              {areas.join(", ")}<br /><br />
              {brand.address}
            </p>
            <a href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
              {brand.phone}
            </a>
          </div>

          <div className="gf-footer-column gf-footer-nav">
            <h4>Explore</h4>
            {navigation.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="gf-footer-bottom">
          <div>
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} />
            ) : (
              <span>{brand.name}</span>
            )}
            <p>{footer.copyright}</p>
          </div>
          
          <div>
            <a href={social.instagramHref}>
              <InstagramLogo size={20} /> Instagram
            </a>
            <a href={social.facebookHref}>
              <FacebookLogo size={20} /> Facebook
            </a>
            <a href={social.tiktokHref}>
              <TiktokLogo size={20} /> TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
