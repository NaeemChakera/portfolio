import { SectionHeading } from "@/components/section-heading";
import { TerminalFrame } from "@/components/terminal-frame";
import { socials, profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20">
      <SectionHeading command="contact --send" title="Get in touch" />

      <TerminalFrame title="mailto.sh" className="max-w-lg">
        <div className="p-5">
          <p className="text-ink/80">
            {profile.status}. If something here looks like a fit, reach out —
            I want to hear about it.
          </p>
          <ul className="mt-5 space-y-2 font-mono text-sm">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="text-accent hover:underline"
                >
                  $ open {social.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </TerminalFrame>
    </section>
  );
}
