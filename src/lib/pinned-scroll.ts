"use client";

import type { RefObject } from "react";
import { useLayoutEffect, useState } from "react";

type HorizontalScrollOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  viewportRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
};

type SequenceScrollOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  steps: number;
  stepRatio?: number;
};

type PinnedMetrics = {
  distance: number;
  sectionHeight?: number;
  reducedMotion: boolean;
};

function installMeasurementObservers(
  root: HTMLElement,
  measuredElements: HTMLElement[],
  measure: () => void,
) {
  let frame = 0;
  let active = true;
  const scheduleMeasure = () => {
    if (!active) return;
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(measure);
  };

  const resizeObserver = new ResizeObserver(scheduleMeasure);
  measuredElements.forEach((element) => resizeObserver.observe(element));

  const mutationObserver = new MutationObserver(scheduleMeasure);
  mutationObserver.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  const images = Array.from(root.querySelectorAll("img"));
  images.forEach((image) => image.addEventListener("load", scheduleMeasure));
  window.addEventListener("resize", scheduleMeasure, { passive: true });
  window.addEventListener("orientationchange", scheduleMeasure, { passive: true });

  void document.fonts?.ready.then(scheduleMeasure);
  scheduleMeasure();

  return () => {
    active = false;
    window.cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    images.forEach((image) => image.removeEventListener("load", scheduleMeasure));
    window.removeEventListener("resize", scheduleMeasure);
    window.removeEventListener("orientationchange", scheduleMeasure);
  };
}

export function useMeasuredHorizontalScroll({
  sectionRef,
  viewportRef,
  trackRef,
}: HorizontalScrollOptions): PinnedMetrics {
  const [metrics, setMetrics] = useState<PinnedMetrics>({
    distance: 0,
    reducedMotion: false,
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const reducedMotion = mediaQuery.matches;
      const distance = reducedMotion
        ? 0
        : Math.max(0, Math.ceil(track.scrollWidth - viewport.clientWidth));
      const viewportHeight = window.innerHeight;

      setMetrics((current) => {
        const next = {
          distance,
          sectionHeight: reducedMotion ? undefined : viewportHeight + distance,
          reducedMotion,
        };
        return current.distance === next.distance &&
          current.sectionHeight === next.sectionHeight &&
          current.reducedMotion === next.reducedMotion
          ? current
          : next;
      });
    };

    const cleanupObservers = installMeasurementObservers(
      section,
      [section, viewport, track],
      measure,
    );
    mediaQuery.addEventListener("change", measure);

    return () => {
      cleanupObservers();
      mediaQuery.removeEventListener("change", measure);
    };
  }, [sectionRef, trackRef, viewportRef]);

  return metrics;
}

export function useMeasuredPinnedSequence({
  sectionRef,
  steps,
  stepRatio = 0.68,
}: SequenceScrollOptions): PinnedMetrics {
  const [metrics, setMetrics] = useState<PinnedMetrics>({
    distance: 0,
    reducedMotion: false,
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const reducedMotion = mediaQuery.matches;
      const viewportHeight = window.innerHeight;
      const distance = reducedMotion
        ? 0
        : Math.max(0, steps - 1) *
          Math.max(360, Math.min(760, Math.round(viewportHeight * stepRatio)));

      setMetrics((current) => {
        const next = {
          distance,
          sectionHeight: reducedMotion ? undefined : viewportHeight + distance,
          reducedMotion,
        };
        return current.distance === next.distance &&
          current.sectionHeight === next.sectionHeight &&
          current.reducedMotion === next.reducedMotion
          ? current
          : next;
      });
    };

    const cleanupObservers = installMeasurementObservers(section, [section], measure);
    mediaQuery.addEventListener("change", measure);

    return () => {
      cleanupObservers();
      mediaQuery.removeEventListener("change", measure);
    };
  }, [sectionRef, stepRatio, steps]);

  return metrics;
}
