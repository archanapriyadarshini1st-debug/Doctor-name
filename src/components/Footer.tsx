import { contact, doctor, nav, specialties, IS_SAMPLE_CONTENT } from "@/content/practice";
import { RouteLink } from "@/lib/transition";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-12 py-16 md:py-20">
        {/* Identity */}
        <div className="col-span-12 lg:col-span-4">
          <p className="font-display text-[2rem] leading-none tracking-[-0.01em]">{doctor.name}</p>
          <p className="text-meta mt-3 text-paper/60">{doctor.title} · {doctor.location}</p>
          <p className="text-body mt-8 max-w-[34ch] text-paper/60">
            Longer appointments, plain explanations, and continuity of care.
          </p>
        </div>

        {/* Columns */}
        <nav aria-label="Footer" className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-6">
          <p className="text-eyebrow text-paper/50">Site</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <RouteLink to={n.href} className="link-draw text-[0.9375rem] text-paper/80 hover:text-paper">
                  {n.label}
                </RouteLink>
              </li>
            ))}
            <li>
              <RouteLink to="/appointments" className="link-draw text-[0.9375rem] text-paper/80 hover:text-paper">
                Appointments
              </RouteLink>
            </li>
          </ul>
        </nav>

        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
          <p className="text-eyebrow text-paper/50">Specialties</p>
          <ul className="mt-5 space-y-2.5">
            {specialties.map((s) => (
              <li key={s.id}>
                <RouteLink to={`/specialties#${s.id}`} className="link-draw text-[0.9375rem] text-paper/80 hover:text-paper">
                  {s.title}
                </RouteLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 sm:col-span-4 lg:col-span-3">
          <p className="text-eyebrow text-paper/50">Contact</p>
          <address className="mt-5 space-y-2.5 not-italic text-[0.9375rem] text-paper/80">
            <a href={contact.phoneHref} className="link-draw block w-fit hover:text-paper">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="link-draw block w-fit break-all hover:text-paper">
              {contact.email}
            </a>
            <p className="pt-2 text-paper/60">{contact.addressLines.join(", ")}</p>
          </address>
          <p className="text-eyebrow mt-8 text-paper/50">Hours</p>
          <ul className="mt-4 space-y-1.5 text-[0.875rem] text-paper/70">
            {contact.hours.slice(0, 2).map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-paper/90">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-4 py-6 text-meta text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {doctor.practiceName}. {doctor.registration}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Accessibility", "Complaints"].map((l) => (
              <li key={l}>
                <a href="#" className="link-draw hover:text-paper" onClick={(e) => e.preventDefault()}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {IS_SAMPLE_CONTENT && (
          <div className="container-x pb-6">
            <p className="text-meta max-w-[80ch] text-paper/35">
              Design preview. Persona, credentials, figures, testimonials and contact details are sample placeholders and must be replaced with verified information before publication. In an emergency, call 999.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
