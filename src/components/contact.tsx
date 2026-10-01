import { SectionHeading } from "@/components/section-heading";
import { TerminalFrame } from "@/components/terminal-frame";
import { PhotoBooth } from "@/components/photo-booth";
import { Reveal } from "@/components/reveal";
import { socials, profile } from "@/lib/data";

const contactMessage = `${profile.status}. If something here looks like a fit, reach out — I want to hear about it.`;

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20">
      <SectionHeading command="contact --send" title="Get in touch" />

      <div className="grid gap-8 sm:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <TerminalFrame title="mailto.sh" className="max-w-lg">
            <div className="p-5">
              <p className="text-ink/80">{contactMessage}</p>
              <ul className="mt-5 space-y-2 font-mono text-sm">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="magnetic-control glow-accent inline-block rounded px-1 -mx-1 text-accent hover:underline"
                    >
                      $ open {social.label.toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </TerminalFrame>
        </Reveal>

        <Reveal delayMs={150} className="sm:-mt-[89px]">
              <PhotoBooth
                photos={[
                  "/naeem-bike-photo.jpg",
                  "/01-hawaii-sunset.jpg",
                  "/02-river-friends.jpg",
                  "/03-volcano-crater.jpg",
                  "/04-green-hills.jpg",
                  "/05-rainbow-waikiki.jpg"
                ]}
                alt="Naeem Chakera"
              />
        </Reveal>
      </div>
    </section>
  );
}