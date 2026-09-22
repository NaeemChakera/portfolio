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

    const updateTarget = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      dot.classList.add("is-visible");
      orbit.classList.add("is-visible");
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
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
      <div ref={orbitRef} aria-hidden="true" className="cursor-orbit" />
    </>
  );
}