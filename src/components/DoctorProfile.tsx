import { about, doctor } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "./ui/Section";
import { Button } from "./ui/Button";

export function DoctorProfile() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="about" aria-labelledby="about-heading" className="relative bg-paper py-24 md:py-32 lg:py-40">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
        {/* Sticky portrait */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
            <figure>
              <div data-mask className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                <img
                  src={doctor.portraitAbout}
                  alt={`${doctor.name} reviewing notes at her desk in the consultation room.`}
                  loading="lazy"
                  decoding="async"
                  width={1050}
                  height={1400}
                  className="h-full w-full object-cover will-change-transform"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between text-meta text-muted">
                <span>{doctor.name}</span>
                <span>{doctor.location}</span>
              </figcaption>
            </figure>

            {/* Floating credentials card — restrained, single elevated surface */}
            <div data-reveal className="mt-8 hidden border border-line bg-elevated p-6 md:block lg:-mr-12 lg:ml-24">
              <p className="text-eyebrow text-muted">Qualifications</p>
              <ul className="mt-4 divide-y divide-line">
                {about.credentials.map((c) => (
                  <li key={c} className="py-2.5 text-body text-ink-2">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Editorial text */}
        <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <Eyebrow data-reveal>{about.eyebrow}</Eyebrow>
          <h2 id="about-heading" data-reveal className="text-h2 mt-8 max-w-[14ch] text-balance text-ink">
            {about.headline}
          </h2>
          <p data-reveal className="text-lead mt-8 max-w-[46ch] text-ink-2">
            {about.intro}
          </p>
          <div className="mt-8 max-w-[58ch] space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} data-reveal className="text-body text-muted">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14">
            <p data-reveal className="text-eyebrow text-muted">
              How {doctor.firstName} practises
            </p>
            <dl data-reveal-group className="mt-6 grid gap-0 divide-y divide-line border-y border-line">
              {about.philosophy.map((item, i) => (
                <div key={item.k} data-reveal className="grid grid-cols-[3rem_1fr] gap-x-4 py-5 md:grid-cols-[4rem_12rem_1fr]">
                  <span className="text-meta pt-1 text-muted-2">0{i + 1}</span>
                  <dt className="font-display text-[1.5rem] leading-tight text-ink">{item.k}</dt>
                  <dd className="col-start-2 mt-1 text-body text-muted md:col-start-3 md:mt-1">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mobile credentials */}
          <div data-reveal className="mt-10 border border-line bg-elevated p-5 md:hidden">
            <p className="text-eyebrow text-muted">Qualifications</p>
            <ul className="mt-3 divide-y divide-line">
              {about.credentials.map((c) => (
                <li key={c} className="py-2 text-body text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="mt-12">
            <Button href="/appointments" variant="secondary" arrow>
              Arrange a consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
