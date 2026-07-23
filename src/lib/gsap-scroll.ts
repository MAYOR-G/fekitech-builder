"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export function ensureScrollTrigger() {
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
}

export function prefersReducedScrollMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function observeScrollTriggerLayout(root: HTMLElement) {
  let frame = 0;
  let active = true;

  const refresh = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => {
      if (active) ScrollTrigger.refresh();
    });
  };

  const resizeObserver = new ResizeObserver(refresh);
  resizeObserver.observe(root);

  const mutationObserver = new MutationObserver(refresh);
  mutationObserver.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  const images = Array.from(root.querySelectorAll("img"));
  images.forEach((image) => {
    if (!image.complete) image.addEventListener("load", refresh);
  });

  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("orientationchange", refresh, { passive: true });
  void document.fonts?.ready.then(refresh);
  refresh();

  return () => {
    active = false;
    window.cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    images.forEach((image) => image.removeEventListener("load", refresh));
    window.removeEventListener("resize", refresh);
    window.removeEventListener("orientationchange", refresh);
  };
}
