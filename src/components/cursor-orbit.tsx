"use client";

import { useEffect, useRef } from "react";

export function CursorOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    const dot = dotRef.current;
    if (!orbit || !dot || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrame = 0;

    const getMagneticControl = (target: EventTarget | null) => {
      return target instanceof Element
        ? target.closest<HTMLElement>(".magnetic-control")
        : null;
    };

    const resetMagneticControl = (control: HTMLElement) => {
      control.classList.remove("is-magnetic-hover");
      control.style.removeProperty("--magnetic-x");
      control.style.removeProperty("--magnetic-y");
    };

    const updateTarget = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      dot.classList.add("is-visible");
      orbit.classList.add("is-visible");

      const control = getMagneticControl(event.target);
      if (control) {
        const bounds = control.getBoundingClientRect();
        const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
        const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
        control.style.setProperty("--magnetic-x", `${offsetX}px`);
        control.style.setProperty("--magnetic-y", `${offsetY}px`);
        control.classList.add("is-magnetic-hover");
      }
    };

    const updateHoverState = (event: PointerEvent) => {
      const element = event.target;
      const interactive =
        element instanceof Element &&
        element.closest("a, button, input, textarea, select, [role='button']");
      const enteredInteractive = Boolean(interactive);
      const leftInteractive =
        event.relatedTarget instanceof Element &&
        event.relatedTarget.closest(
          "a, button, input, textarea, select, [role='button']",
        );
      const control = getMagneticControl(event.target);
      const nextControl = getMagneticControl(event.relatedTarget);

      if (control && control !== nextControl) {
        resetMagneticControl(control);
      }

      if (enteredInteractive || !leftInteractive) {
        orbit.classList.toggle("is-hovering", enteredInteractive);
        dot.classList.toggle("is-hovering", enteredInteractive);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      orbit.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animationFrame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", updateTarget, { passive: true });
    window.addEventListener("pointerover", updateHoverState, { passive: true });
    window.addEventListener("pointerout", updateHoverState, { passive: true });
    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("pointermove", updateTarget);
      window.removeEventListener("pointerover", updateHoverState);
      window.removeEventListener("pointerout", updateHoverState);
      window.cancelAnimationFrame(animationFrame);

      document
        .querySelectorAll<HTMLElement>(".magnetic-control")
        .forEach(resetMagneticControl);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
      <div ref={orbitRef} aria-hidden="true" className="cursor-orbit" />
    </>
  );
}