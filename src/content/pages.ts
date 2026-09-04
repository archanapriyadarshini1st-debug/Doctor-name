/**
 * PAGE-LEVEL CONTENT
 * Headers for each route and the index of pages shown on the home page.
 */
import {
  doctor,
  contact,
  specialties,
  journey,
  faqs,
  gallery,
} from "./practice";
import portraitAbout from "../assets/portrait-about.jpg";
import detailStethoscope from "../assets/detail-stethoscope.jpg";
import detailHands from "../assets/detail-hands.jpg";
import clinicReception from "../assets/clinic-reception.jpg";
import clinicRoom from "../assets/clinic-room.jpg";
import clinicExterior from "../assets/clinic-exterior.jpg";

export type PageHeaderContent = {
  index: string;
  eyebrow: string;
  /** [lead words, italic accent] — accent is rendered in serif italic teal */
  headline: [string, string];
  copy: string;
  facts: { label: string; value: string }[];
};

export const pageHeaders = {
  about: {
    index: "01",
    eyebrow: "About the doctor",
    headline: ["The person behind", "the practice."],
    copy: `${doctor.name} has spent ${doctor.yearsInPractice} years as a consultant learning that the best cardiology begins with listening. This page is about how she works, and why.`,
    facts: [
      { label: "Role", value: doctor.title },
      { label: "Experience", value: `${doctor.yearsInPractice} years` },
      { label: "Registration", value: doctor.registration },
      { label: "Based in", value: doctor.location },
    ],
  },
  specialties: {
    index: "02",
    eyebrow: "Areas of focus",
    headline: ["Four things done", "properly."],
    copy: "A deliberately narrow practice. Each area below is one Dr. Navarro sees week in, week out — and where a case falls outside them, she will tell you and refer you on.",
    facts: [
      { label: "Areas", value: `${specialties.length} specialties` },
      { label: "First visit", value: "60 minutes" },
      { label: "Results", value: "Within 48 hours" },
      { label: "Referrals", value: "Not required" },
    ],
  },
  visit: {
    index: "03",
    eyebrow: "Your visit",
    headline: ["Know what happens,", "before it happens."],
    copy: "From the first call to the written summary afterwards, every step of a visit is set out here so nothing on the day comes as a surprise.",
    facts: [
      { label: "Steps", value: `${journey.length} stages` },
      { label: "Consultation", value: "Unhurried" },
      { label: "Summary", value: "Written, 48h" },
      { label: "Follow-up", value: "Direct line" },
    ],
  },
  clinic: {
    index: "04",
    eyebrow: "The clinic",
    headline: ["A quiet building on", "a quiet street."],
    copy: "Calm rooms, natural light and a reception that knows your name. Find the building, the hours and everything you need to plan the journey.",
    facts: [
      { label: "Address", value: contact.addressLines.slice(1).join(", ") },
      { label: "Access", value: "Step-free" },
      { label: "Rooms", value: `${gallery.length} spaces` },
      { label: "Weekdays", value: contact.hours[0].time },
    ],
  },
  faq: {
    index: "05",
    eyebrow: "Common questions",
    headline: ["Answers, before", "you ask."],
    copy: "The questions patients most often raise before a first appointment — costs, referrals, what to bring and what happens next.",
    facts: [
      { label: "Questions", value: `${faqs.length} answered` },
      { label: "Can't find it?", value: "Call the clinic" },
      { label: "Phone", value: contact.phone },
      { label: "Email", value: contact.email },
    ],
  },
  appointments: {
    index: "06",
    eyebrow: "Appointments",
    headline: ["Begin with a", "conversation."],
    copy: "Request a time that suits you and the clinic will confirm within one working day. If it is easier, simply call — a person will answer.",
    facts: [
      { label: "Next availability", value: "This week" },
      { label: "Confirmation", value: "1 working day" },
      { label: "Phone", value: contact.phone },
      { label: "Hours", value: contact.hours[0].time },
    ],
  },
} satisfies Record<string, PageHeaderContent>;

export type SitePage = {
  index: string;
  href: string;
  title: string;
  short: string;
  image: string;
  imageAlt: string;
};

/** Index of the site, shown on the home page. */
export const sitePages: SitePage[] = [
  {
    index: "01",
    href: "/about",
    title: "About the doctor",
    short: "Training, philosophy and the reasons the practice runs at a human pace.",
    image: portraitAbout,
    imageAlt: `${doctor.name} at her desk in the consultation room.`,
  },
  {
    index: "02",
    href: "/specialties",
    title: "Specialties",
    short: "Preventive cardiology, chest pain, rhythm disorders and long-term care.",
    image: detailStethoscope,
    imageAlt: "A stethoscope resting on a linen surface.",
  },
  {
    index: "03",
    href: "/your-visit",
    title: "Your visit",
    short: "What happens at each stage, from booking to the written summary.",
    image: detailHands,
    imageAlt: "A doctor's hands explaining a result to a patient.",
  },
  {
    index: "04",
    href: "/clinic",
    title: "The clinic",
    short: "Rooms, access, hours and how to find the building in Marylebone.",
    image: clinicReception,
    imageAlt: "The clinic reception, bright and calm.",
  },
  {
    index: "05",
    href: "/faq",
    title: "Questions",
    short: "Costs, referrals, insurance and what to bring on the day.",
    image: clinicRoom,
    imageAlt: "A consulting room with natural light.",
  },
  {
    index: "06",
    href: "/appointments",
    title: "Appointments",
    short: "Request a time online or call the clinic directly.",
    image: clinicExterior,
    imageAlt: "The clinic's exterior on a quiet street.",
  },
];
