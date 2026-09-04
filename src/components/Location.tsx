import { contact, doctor } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "./ui/Section";
import { Button } from "./ui/Button";

/** Stylised, dependency-free map: a quiet street grid with a single marker. */
function MapPlate() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-2 lg:aspect-auto lg:h-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 600" aria-hidden preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#d6d0c4" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)" />
        {/* streets */}
        <g stroke="#f7f4ee" strokeLinecap="round" fill="none">
          <path d="M-20 180 C 200 170, 400 190, 820 160" strokeWidth="22" />
          <path d="M-20 400 C 250 380, 500 420, 820 390" strokeWidth="18" />
          <path d="M220 -20 C 230 200, 210 400, 240 620" strokeWidth="20" />
          <path d="M520 -20 C 500 200, 540 400, 510 620" strokeWidth="16" />
          <path d="M-20 290 L 820 280" strokeWidth="8" />
          <path d="M380 -20 L 370 620" strokeWidth="8" />
        </g>
        <g stroke="#cdc7bb" strokeWidth="0.8" fill="none">
          <path d="M-20 180 C 200 170, 400 190, 820 160" />
          <path d="M-20 400 C 250 380, 500 420, 820 390" />
          <path d="M220 -20 C 230 200, 210 400, 240 620" />
          <path d="M520 -20 C 500 200, 540 400, 510 620" />
        </g>
        {/* park */}
        <ellipse cx="660" cy="500" rx="120" ry="70" fill="#dbe8e5" opacity="0.7" />
        {/* marker */}
        <g transform="translate(378 285)">
          <circle r="26" fill="#12605c" opacity="0.12">
            <animate attributeName="r" values="18;34;18" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.18;0;0.18" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle r="7" fill="#12605c" stroke="#f5f2ec" strokeWidth="3" />
        </g>
      </svg>
      <div className="absolute bottom-4 left-4 border border-line bg-elevated px-3 py-2 text-meta text-ink">
        {doctor.practiceName} · {doctor.location}
      </div>
    </div>
  );
}

export function Location() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="location" aria-labelledby="location-heading" className="border-t border-line bg-surface py-24 md:py-32 lg:py-40">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow data-reveal>Find us</Eyebrow>
          <h2 id="location-heading" data-reveal className="text-h2 mt-8 max-w-[12ch] text-balance text-ink">
            Central, discreet, easy to reach.
          </h2>

          <dl data-reveal-group className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2">
            <div data-reveal>
              <dt className="text-eyebrow text-muted">Address</dt>
              <dd className="mt-3 text-body text-ink-2">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </dd>
              <dd className="mt-4">
                <a href={contact.mapsHref} target="_blank" rel="noreferrer" className="link-draw text-label text-teal">
                  Get directions ↗
                </a>
              </dd>
            </div>
            <div data-reveal>
              <dt className="text-eyebrow text-muted">Hours</dt>
              <dd className="mt-3">
                <ul className="divide-y divide-line">
                  {contact.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 py-2 text-body">
                      <span className="text-muted">{h.day}</span>
                      <span className="text-ink-2">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div data-reveal>
              <dt className="text-eyebrow text-muted">Contact</dt>
              <dd className="mt-3 flex flex-col items-start gap-1 text-body">
                <a href={contact.phoneHref} className="link-draw text-ink-2">
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="link-draw break-words text-ink-2">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div data-reveal>
              <dt className="text-eyebrow text-muted">Access & parking</dt>
              <dd className="mt-3">
                <ul className="space-y-1.5 text-body text-muted">
                  {contact.access.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div data-reveal className="mt-12">
            <Button href="/appointments" arrow>
              Book an appointment
            </Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal>
          <MapPlate />
        </div>
      </div>
    </section>
  );
}
