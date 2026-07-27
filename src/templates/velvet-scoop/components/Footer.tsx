"use client";

import { FormEvent, useState } from "react";
import { useTemplateData } from "../TemplateContext";

function Lines({ value }: { value: string }) {
  return (
    <>
      {value.split("\n").map((line) => (
        <span key={line}>{line}<br /></span>
      ))}
    </>
  );
}

export default function Footer() {
  const { brand, footer } = useTemplateData();
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setMessage(footer.successMessage);
    form.reset();
  };

  return (
    <footer className="vs-footer" id="contact">
      <div className="vs-footer-main">
        <div className="vs-footer-left">
          <a className="vs-footer-logo" href="#/" aria-label={`${brand.name} homepage`}>{brand.logoText}</a>
          <div className="vs-footer-columns">
            <section>
              <h2>{footer.addressTitle}</h2>
              <p><Lines value={footer.address} /></p>
              {footer.legalLinks.slice(0, 2).map((link) => (
                <a key={link.label} href={link.href}>{link.label}</a>
              ))}
            </section>
            <section>
              <h2>{footer.contactTitle}</h2>
              <p>{footer.email}</p>
              <p>{footer.phone}</p>
              {footer.legalLinks.slice(2).map((link) => (
                <a key={link.label} href={link.href}>{link.label}</a>
              ))}
            </section>
            <section>
              <h2>{footer.hoursTitle}</h2>
              <p><Lines value={footer.hours} /></p>
              <div className="vs-social-links" aria-label={`${brand.name} social links`}>
                {footer.social.map((link) => (
                  <a key={link.label} href={link.href} aria-label={link.label}>
                    {link.label === "Instagram" ? "ig" : link.label.toLowerCase().slice(0, 1)}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        <form className="vs-newsletter" onSubmit={onSubmit}>
          <h2>{footer.newsletterTitle}</h2>
          <div className="vs-form-row">
            <label>
              <span>{footer.firstNameLabel}</span>
              <input name="firstName" required suppressHydrationWarning />
            </label>
            <label>
              <span>{footer.lastNameLabel}</span>
              <input name="lastName" suppressHydrationWarning />
            </label>
          </div>
          <label>
            <span>{footer.emailLabel}</span>
            <input name="email" type="email" required suppressHydrationWarning />
          </label>
          <label className="vs-checkbox">
            <input name="consent" type="checkbox" required suppressHydrationWarning />
            <span>{footer.consentLabel}</span>
          </label>
          <button type="submit">{footer.subscribeLabel}</button>
          <p className="vs-form-status" role="status">{message}</p>
        </form>
      </div>
      <p className="vs-copyright">{footer.copyright}</p>
    </footer>
  );
}
