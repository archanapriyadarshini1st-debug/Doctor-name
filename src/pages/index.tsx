/**
 * ROUTE PAGES
 * Each page composes the existing sections unchanged, opened by a PageHeader.
 */
import { pageHeaders } from "@/content/pages";
import { usePageTitle } from "@/lib/transition";
import { PageHeader } from "@/components/PageHeader";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { SiteIndex } from "@/components/SiteIndex";
import { DoctorProfile } from "@/components/DoctorProfile";
import { SpecialtyExplorer } from "@/components/SpecialtyExplorer";
import { PatientJourney } from "@/components/PatientJourney";
import { Testimonials } from "@/components/Testimonials";
import { ClinicGallery } from "@/components/ClinicGallery";
import { Location } from "@/components/Location";
import { AppointmentForm } from "@/components/AppointmentForm";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";

export function HomePage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <TrustStrip />
      <SiteIndex />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

export function AboutPage() {
  usePageTitle("About");
  return (
    <>
      <PageHeader content={pageHeaders.about} crumb="About" />
      <DoctorProfile />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

export function SpecialtiesPage() {
  usePageTitle("Specialties");
  return (
    <>
      <PageHeader content={pageHeaders.specialties} crumb="Specialties" />
      <SpecialtyExplorer />
      <FinalCTA />
    </>
  );
}

export function VisitPage() {
  usePageTitle("Your visit");
  return (
    <>
      <PageHeader content={pageHeaders.visit} crumb="Your visit" />
      <PatientJourney />
      <FAQ />
      <FinalCTA />
    </>
  );
}

export function ClinicPage() {
  usePageTitle("The clinic");
  return (
    <>
      <PageHeader content={pageHeaders.clinic} crumb="Clinic" />
      <ClinicGallery />
      <Location />
      <FinalCTA />
    </>
  );
}

export function FaqPage() {
  usePageTitle("Questions");
  return (
    <>
      <PageHeader content={pageHeaders.faq} crumb="FAQ" />
      <FAQ />
      <FinalCTA />
    </>
  );
}

export function AppointmentsPage() {
  usePageTitle("Appointments");
  return (
    <>
      <PageHeader content={pageHeaders.appointments} crumb="Appointments" />
      <AppointmentForm />
      <Location />
    </>
  );
}

export function NotFoundPage() {
  usePageTitle("Page not found");
  return (
    <section className="relative isolate min-h-[100svh] bg-paper pt-[var(--nav-h)]">
      <div className="container-x grid min-h-[calc(100svh-var(--nav-h))] grid-cols-12 gap-x-6 py-16">
        <div className="col-span-12 flex flex-col justify-center lg:col-span-8 lg:col-start-4">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="text-h1 mt-8 max-w-[12ch] text-ink [text-wrap:balance]">
            That page isn't <em className="serif-italic text-teal">here</em>.
          </h1>
          <p className="text-lead mt-8 max-w-[44ch] text-muted">
            The address may have changed. Everything the practice publishes is one step from the home page.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" size="lg" arrow>
              Back to home
            </Button>
            <Button href="/appointments" size="lg" variant="secondary">
              Book an appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
