"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useState } from "react";

// A macOS "Photo Booth" styled frame: traffic-light title bar, a dark
// viewfinder showing the current photo, and a shutter button along the
// bottom. The shutter is wired up to a `photos` array so it already
// cycles through more than one image — pass just one and it's inert
// (disabled), pass several and clicking it advances to the next.
export function PhotoBooth({
  photos,
  alt,
  className = "",
}: {
  photos: string[];
  alt: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const [pressed, setPressed] = useState(false);
  const canAdvance = photos.length > 1;

  function handleCapture() {
    if (!canAdvance) return;
    setFlashing(true);
    setPressed(true);
    setIndex((i) => (i + 1) % photos.length);
    window.setTimeout(() => setFlashing(false), 200);
    window.setTimeout(() => setPressed(false), 150);
  }

  return (
    <div
      className={`group rounded-lg border border-border bg-surface overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="relative flex items-center justify-center border-b border-border px-3 py-2">
        <div className="absolute left-3 flex items-center gap-2">
          <span className="terminal-control terminal-control-close h-2.5 w-2.5 rounded-full" />
          <span className="terminal-control terminal-control-minimize h-2.5 w-2.5 rounded-full" />
          <span className="terminal-control terminal-control-maximize h-2.5 w-2.5 rounded-full" />
        </div>
        <span className="font-mono text-xs text-muted">Photo Booth</span>
      </div>

      {/* Viewfinder */}
      <div className="relative aspect-[4/3] w-full bg-black">
        <Image
          src={photos[index]}
          alt={alt}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover"
        />
        {/* Shutter flash: a quick white pulse over the viewfinder on capture */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-150 ${
            flashing ? "opacity-80" : "opacity-0"
          }`}
        />
      </div>

      {/* Bottom control bar */}
      <div className="flex items-center justify-between bg-surface px-4 py-3">
        <span className="w-14 font-mono text-xs text-muted" aria-hidden="true" />
        <button
          type="button"
          onClick={handleCapture}
          disabled={!canAdvance}
          aria-label="Take photo"
          className="magnetic-control glow-accent flex h-9 w-9 items-center justify-center rounded-full bg-accent text-bg transition-opacity duration-150 hover:opacity-90 disabled:cursor-default disabled:opacity-70"
        >
          {/* Scale the icon (not the button) for the press feedback — the
              button itself already owns a transform via .magnetic-control's
              hover tilt, and a second transform source on the same element
              would just overwrite that one instead of combining with it. */}
          <Camera
            size={16}
            className={`transition-transform duration-150 ${
              pressed ? "scale-75" : "scale-100"
            }`}
          />
        </button>
        <span className="w-14 text-right font-mono text-xs text-muted">
          Effects
        </span>
      </div>
    </div>
  );
}