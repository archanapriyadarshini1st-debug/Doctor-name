import { useId, useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, MQ, E } from "@/lib/motion";
import { contact, doctor, specialties } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "./ui/Section";
import { Button } from "./ui/Button";
import { cn } from "@/utils/cn";

type Values = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  notes: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initial: Values = { name: "", email: "", phone: "", date: "", time: "", reason: "", notes: "" };

const times = ["Morning (08:30–12:00)", "Midday (12:00–14:00)", "Afternoon (14:00–18:00)"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = "Enter a valid phone number.";
  if (!v.date) e.date = "Choose a preferred date.";
  else if (new Date(v.date) < new Date(new Date().toDateString())) e.date = "Please choose a date in the future.";
  if (!v.time) e.time = "Choose a preferred time.";
  if (!v.reason) e.reason = "Tell us the reason for your visit.";
  return e;
}

const fieldBase =
  "peer w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 pb-3 pt-6 text-[1rem] text-ink outline-none transition-[border-color] duration-300 placeholder:text-transparent focus:border-teal";

function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 top-6 text-[1rem] text-muted transition-all duration-300 ease-[var(--ease-out-expo)]",
          "peer-focus:top-0 peer-focus:text-[0.6875rem] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:font-mono peer-focus:text-teal",
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.6875rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.12em] peer-[:not(:placeholder-shown)]:font-mono",
          "peer-data-[filled=true]:top-0 peer-data-[filled=true]:text-[0.6875rem] peer-data-[filled=true]:uppercase peer-data-[filled=true]:tracking-[0.12em] peer-data-[filled=true]:font-mono"
        )}
      >
        {label}
      </label>
      <p
        id={`${id}-msg`}
        role={error ? "alert" : undefined}
        className={cn("mt-2 min-h-[1.25rem] text-[0.8125rem]", error ? "text-error" : "text-muted-2")}
      >
        {error ?? hint ?? ""}
      </p>
    </div>
  );
}

export function AppointmentForm() {
  const scope = useReveal<HTMLElement>();
  const uid = useId();
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Values) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, date: true, time: true, reason: true, notes: true });
    if (Object.keys(errs).length) {
      const firstKey = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      // No backend is connected. Simulate a network round-trip so the
      // loading state is real. Replace with a fetch() to your booking API.
      await new Promise((r) => setTimeout(r, 1100));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  useGSAP(
    () => {
      if (status !== "success" || !successRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(successRef.current!.children, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: E.out, stagger: 0.08 });
      });
      successRef.current.focus();
    },
    { dependencies: [status] }
  );

  const id = (k: keyof Values) => `${uid}-${k}`;
  const today = new Date().toISOString().split("T")[0];

  return (
    <section ref={scope} id="appointment" aria-labelledby="appointment-heading" className="border-t border-line bg-paper py-24 md:py-32 lg:py-40">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow data-reveal>Appointments</Eyebrow>
          <h2 id="appointment-heading" data-reveal className="text-h2 mt-8 max-w-[12ch] text-balance text-ink">
            Request a <em className="serif-italic text-teal">consultation.</em>
          </h2>
          <p data-reveal className="text-body mt-8 max-w-[38ch] text-muted">
            Tell us a little about what you need. The clinic will call or email to confirm a time — usually within one working day.
          </p>
          <div data-reveal className="mt-10 border-l border-line pl-5 text-body text-muted">
            <p>Prefer to speak to someone?</p>
            <a href={contact.phoneHref} className="link-draw mt-1 inline-block text-ink">
              {contact.phone}
            </a>
            <p className="mt-3 text-meta text-muted-2">Mon–Thu 08:30–18:00 · Fri to 15:30</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6" data-reveal>
          {status === "success" ? (
            <div ref={successRef} tabIndex={-1} className="border border-line bg-elevated p-8 outline-none md:p-12" aria-live="polite">
              <p className="text-eyebrow text-success">Request prepared</p>
              <h3 className="text-h3 mt-6 text-ink">Thank you, {values.name.split(" ")[0]}.</h3>
              <p className="text-body mt-4 max-w-[48ch] text-muted">
                In a live deployment, the clinic would now receive your request for{" "}
                <span className="text-ink">{new Date(values.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>{" "}
                ({values.time.toLowerCase()}) and confirm by email.
              </p>
              <p className="mt-6 border-l-2 border-line pl-4 text-[0.8125rem] leading-relaxed text-muted-2">
                Demo mode: no appointment has been booked and nothing was sent. Connect this form to your booking system or email service before launch.
              </p>
              <button
                type="button"
                onClick={() => {
                  setValues(initial);
                  setTouched({});
                  setErrors({});
                  setStatus("idle");
                }}
                className="link-draw mt-8 text-label text-teal"
              >
                Make another request
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <Field id={id("name")} label="Full name" error={touched.name ? errors.name : undefined}>
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Full name"
                  value={values.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={`${id("name")}-msg`}
                  className={cn(fieldBase, touched.name && errors.name ? "border-error" : "border-line-2")}
                />
              </Field>

              <Field id={id("email")} label="Email" error={touched.email ? errors.email : undefined}>
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="Email"
                  value={values.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={`${id("email")}-msg`}
                  className={cn(fieldBase, touched.email && errors.email ? "border-error" : "border-line-2")}
                />
              </Field>

              <Field id={id("phone")} label="Phone (optional)" error={touched.phone ? errors.phone : undefined}>
                <input
                  id={id("phone")}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Phone"
                  value={values.phone}
                  onChange={set("phone")}
                  onBlur={blur("phone")}
                  aria-invalid={touched.phone && !!errors.phone}
                  aria-describedby={`${id("phone")}-msg`}
                  className={cn(fieldBase, touched.phone && errors.phone ? "border-error" : "border-line-2")}
                />
              </Field>

              <Field id={id("date")} label="Preferred date" error={touched.date ? errors.date : undefined}>
                <input
                  id={id("date")}
                  name="date"
                  type="date"
                  min={today}
                  required
                  placeholder="Preferred date"
                  value={values.date}
                  onChange={set("date")}
                  onBlur={blur("date")}
                  data-filled={values.date ? "true" : "false"}
                  aria-invalid={touched.date && !!errors.date}
                  aria-describedby={`${id("date")}-msg`}
                  className={cn(fieldBase, "min-h-[3.5rem]", touched.date && errors.date ? "border-error" : "border-line-2")}
                />
              </Field>

              <Field id={id("time")} label="Preferred time" error={touched.time ? errors.time : undefined}>
                <select
                  id={id("time")}
                  name="time"
                  required
                  value={values.time}
                  onChange={set("time")}
                  onBlur={blur("time")}
                  data-filled={values.time ? "true" : "false"}
                  aria-invalid={touched.time && !!errors.time}
                  aria-describedby={`${id("time")}-msg`}
                  className={cn(fieldBase, "min-h-[3.5rem] cursor-pointer", !values.time && "text-transparent", touched.time && errors.time ? "border-error" : "border-line-2")}
                >
                  <option value="" disabled hidden />
                  {times.map((t) => (
                    <option key={t} value={t} className="text-ink">
                      {t}
                    </option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute right-0 top-7 text-muted">
                  ↓
                </span>
              </Field>

              <Field id={id("reason")} label="Reason for visit" error={touched.reason ? errors.reason : undefined}>
                <select
                  id={id("reason")}
                  name="reason"
                  required
                  value={values.reason}
                  onChange={set("reason")}
                  onBlur={blur("reason")}
                  data-filled={values.reason ? "true" : "false"}
                  aria-invalid={touched.reason && !!errors.reason}
                  aria-describedby={`${id("reason")}-msg`}
                  className={cn(fieldBase, "min-h-[3.5rem] cursor-pointer", !values.reason && "text-transparent", touched.reason && errors.reason ? "border-error" : "border-line-2")}
                >
                  <option value="" disabled hidden />
                  {specialties.map((s) => (
                    <option key={s.id} value={s.title} className="text-ink">
                      {s.title}
                    </option>
                  ))}
                  <option value="Second opinion" className="text-ink">Second opinion</option>
                  <option value="Not sure" className="text-ink">Not sure — I'd like advice</option>
                </select>
                <span aria-hidden className="pointer-events-none absolute right-0 top-7 text-muted">
                  ↓
                </span>
              </Field>

              <div className="sm:col-span-2">
                <Field id={id("notes")} label="Anything else we should know? (optional)" hint="Please don't include urgent symptoms here — call 999 in an emergency.">
                  <textarea
                    id={id("notes")}
                    name="notes"
                    rows={3}
                    placeholder="Notes"
                    value={values.notes}
                    onChange={set("notes")}
                    aria-describedby={`${id("notes")}-msg`}
                    className={cn(fieldBase, "resize-none border-line-2")}
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg" arrow disabled={status === "submitting"} aria-busy={status === "submitting"} className="disabled:opacity-70" data-cursor="Book">
                  {status === "submitting" ? "Sending request…" : "Send request"}
                </Button>
                <p className="text-meta max-w-[34ch] text-muted-2">
                  By sending, you agree to {doctor.practiceName} contacting you about this request. No data is stored in this preview.
                </p>
              </div>

              {status === "error" && (
                <p role="alert" className="text-[0.875rem] text-error sm:col-span-2">
                  Something went wrong sending your request. Please try again or call the clinic.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
