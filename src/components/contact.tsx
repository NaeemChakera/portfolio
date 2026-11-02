import { SectionHeading } from "@/components/section-heading";
import { TerminalFrame } from "@/components/terminal-frame";
import { BootLog } from "@/components/boot-log";
import { Reveal } from "@/components/reveal";
import { socials, profile } from "@/lib/data";

const contactMessage = `${profile.status}. If something here looks like a fit, reach out — I want to hear about it.`;

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20">
      <SectionHeading command="contact --send" title="Get in touch" />

      <div className="grid gap-8 sm:grid-cols-[1.3fr_0.7fr]">
        <Reveal className="h-full">
          <TerminalFrame title="mailto.sh" className="max-w-lg" fill>
            <div className="p-5">
              <p className="text-ink/80">{contactMessage}</p>
              <ul className="mt-5 space-y-2 font-mono text-sm">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="magnetic-control inline-block rounded px-1 -mx-1 text-accent transition-colors hover:bg-accent/10 hover:underline"
                    >
                      $ open {social.label.toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </TerminalFrame>
        </Reveal>

        <Reveal delayMs={150} className="h-full">
          <BootLog />
        </Reveal>
      </div>
    </section>
  );
}
