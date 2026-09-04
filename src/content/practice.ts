/**
 * PRACTICE CONTENT — SINGLE SOURCE OF TRUTH
 *
 * ⚠️ SAMPLE CONTENT. The persona, credentials, figures, testimonials,
 * address and hours below are illustrative placeholders for design
 * preview. Replace every value with verified information before launch.
 * Anything flagged `verify: true` must be checked against real records.
 */

import portraitHero from "../assets/portrait-hero.jpg";
import portraitAbout from "../assets/portrait-about.jpg";
import clinicReception from "../assets/clinic-reception.jpg";
import clinicRoom from "../assets/clinic-room.jpg";
import clinicCorridor from "../assets/clinic-corridor.jpg";
import clinicExterior from "../assets/clinic-exterior.jpg";
import detailStethoscope from "../assets/detail-stethoscope.jpg";
import detailHands from "../assets/detail-hands.jpg";

export const IS_SAMPLE_CONTENT = true;

export const doctor = {
  name: "Dr. Elena Navarro",
  shortName: "Dr. Navarro",
  firstName: "Elena",
  title: "Consultant Cardiologist",
  practiceName: "Navarro Cardiology",
  location: "Marylebone, London",
  yearsInPractice: 18, // verify
  registration: "GMC No. [0000000]", // verify
  qualifications: ["MD", "[Qualification]", "[Fellowship]"], // verify
  portraitHero,
  portraitAbout,
};

export const contact = {
  phone: "+44 20 7946 0318", // sample — replace
  phoneHref: "tel:+442079460318",
  email: "reception@navarro.example", // sample — replace
  addressLines: ["[Clinic Address]", "Marylebone", "London W1G"], // verify
  mapsHref: "https://maps.google.com/?q=Marylebone,+London",
  hours: [
    { day: "Monday – Thursday", time: "08:30 – 18:00" },
    { day: "Friday", time: "08:30 – 15:30" },
    { day: "Saturday", time: "By arrangement" },
    { day: "Sunday", time: "Closed" },
  ],
  access: [
    "Step-free access from street level",
    "Lift to all consulting floors",
    "Nearest stations: Bond Street, Regent's Park",
    "Metered parking on Wimpole Street (limited)",
  ],
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Specialties", href: "/specialties" },
  { label: "Your visit", href: "/your-visit" },
  { label: "Clinic", href: "/clinic" },
  { label: "FAQ", href: "/faq" },
];

export const hero = {
  eyebrow: "Private cardiology practice · Marylebone",
  headlineLines: ["Heart care,", "considered", "unhurried."],
  copy:
    "Longer appointments, clear explanations, and a plan you understand. Dr. Navarro combines eighteen years of consultant experience with the time to listen properly.",
  facts: [
    { label: "Specialty", value: "Cardiology" },
    { label: "Experience", value: "18 years" },
    { label: "Location", value: "Marylebone, W1" },
    { label: "Next availability", value: "This week" },
  ],
};

export const trust = [
  { value: 18, suffix: "", label: "Years as a consultant", note: "verify" },
  { value: 60, suffix: "min", label: "First consultation length" },
  { value: 4, suffix: "", label: "Areas of focus" },
  { value: 48, suffix: "h", label: "Typical results turnaround" },
];

export const about = {
  eyebrow: "About the doctor",
  headline: "Medicine practised at a human pace.",
  intro:
    "Elena trained in London and Boston before returning to build a practice around one conviction: patients make better decisions when they are given time and the truth.",
  paragraphs: [
    "Her clinical interests span preventive cardiology, the assessment of chest pain and palpitations, and the long-term care of people living with heart conditions. She works closely with a small network of imaging specialists and surgeons when further intervention is needed.",
    "Consultations are never rushed. Each new patient is given a full hour, a written summary within 48 hours, and a direct line to the clinic for questions that arise afterwards.",
  ],
  philosophy: [
    { k: "Listen first", v: "The history tells you most of what you need to know." },
    { k: "Explain plainly", v: "No jargon without a translation." },
    { k: "Decide together", v: "You hold the final say on your own care." },
  ],
  credentials: [
    "MD, [University]",
    "[Fellowship or Board Certification]",
    "[Professional membership]",
    "[Hospital affiliation]",
  ],
};

export type Specialty = {
  id: string;
  index: string;
  title: string;
  short: string;
  body: string;
  image: string;
  imageAlt: string;
  points: string[];
};

export const specialties: Specialty[] = [
  {
    id: "preventive",
    index: "01",
    title: "Preventive cardiology",
    short: "Understanding your risk before it becomes a problem.",
    body:
      "A structured review of blood pressure, cholesterol, family history and lifestyle, followed by a realistic plan. For people who want to stay well, not just react when something goes wrong.",
    image: detailHands,
    imageAlt: "A doctor's hands gently holding a patient's hand across a desk.",
    points: ["Cardiovascular risk assessment", "Blood pressure management", "Lipid clinics"],
  },
  {
    id: "symptoms",
    index: "02",
    title: "Chest pain & palpitations",
    short: "Careful assessment when something doesn't feel right.",
    body:
      "Symptoms are taken seriously and investigated efficiently. Most patients receive an ECG and echocardiogram at the first visit, with a clear explanation of what was found and what happens next.",
    image: clinicRoom,
    imageAlt: "A calm consultation room with an echocardiogram machine.",
    points: ["Same-visit ECG and echo", "Ambulatory monitoring", "Rapid access pathways"],
  },
  {
    id: "diagnostics",
    index: "03",
    title: "Cardiac diagnostics",
    short: "Modern imaging, interpreted in person.",
    body:
      "Echocardiography, 24-hour and 7-day monitoring, exercise testing and CT coronary angiography via partner imaging centres. Results are reviewed with you rather than sent in a letter.",
    image: detailStethoscope,
    imageAlt: "A stethoscope resting on an ECG printout on an oak desk.",
    points: ["Echocardiography", "Holter & event monitoring", "CT coronary angiography"],
  },
  {
    id: "longterm",
    index: "04",
    title: "Long-term heart care",
    short: "Steady, continuous care for established conditions.",
    body:
      "For patients living with heart failure, valve disease, arrhythmia or after a cardiac event. Regular reviews, medication optimisation, and coordination with your GP and any other specialists.",
    image: clinicCorridor,
    imageAlt: "A serene clinic corridor with soft daylight.",
    points: ["Heart failure follow-up", "Valve disease surveillance", "Post-event rehabilitation"],
  },
];

export const journey = [
  {
    step: "01",
    title: "Book",
    body: "Request an appointment online or by phone. We'll confirm within one working day and send a short pre-visit questionnaire.",
  },
  {
    step: "02",
    title: "Consultation",
    body: "A full hour with Dr. Navarro. History, examination, and any same-day tests such as ECG or echocardiogram.",
  },
  {
    step: "03",
    title: "Personalised care",
    body: "A written plan in plain language, shared with you and — with your consent — your GP, within 48 hours.",
  },
  {
    step: "04",
    title: "Follow-up",
    body: "Scheduled reviews, direct access to the clinic for questions, and adjustments as your needs change.",
  },
];

export const testimonials = [
  {
    quote:
      "For the first time a doctor drew the diagram, waited for my questions, and didn't look at the clock once.",
    who: "Patient, 62",
    context: "Preventive review",
  },
  {
    quote:
      "I arrived frightened about palpitations and left with a monitor, a plan, and the sense that someone was in charge.",
    who: "Patient, 41",
    context: "Palpitations assessment",
  },
  {
    quote:
      "The written summary arrived the next day. My GP said it was the clearest letter she'd received in years.",
    who: "Patient, 57",
    context: "Long-term care",
  },
];

export const gallery = [
  { src: clinicReception, alt: "Clinic reception with a travertine desk and oak panelling.", caption: "Reception", ratio: "aspect-[4/3]" },
  { src: clinicRoom, alt: "Consultation room with an examination couch and ultrasound machine.", caption: "Consulting room 2", ratio: "aspect-[3/4]" },
  { src: clinicCorridor, alt: "Clinic corridor lit by a long horizontal window.", caption: "First floor", ratio: "aspect-[3/4]" },
  { src: detailStethoscope, alt: "Stethoscope on an ECG printout.", caption: "Diagnostics", ratio: "aspect-square" },
  { src: clinicExterior, alt: "Limestone townhouse exterior with a black front door.", caption: "The building", ratio: "aspect-[4/3]" },
];

export const faqs = [
  {
    q: "How long is a first consultation?",
    a: "Sixty minutes. This allows time for a thorough history, an examination, and usually an ECG and echocardiogram in the same visit. Follow-up appointments are thirty minutes.",
  },
  {
    q: "Do I need a referral from my GP?",
    a: "No, you can book directly. If you have private medical insurance, however, your insurer may require a GP referral before authorising cover. We recommend checking with them first.",
  },
  {
    q: "How should I prepare for my appointment?",
    a: "Bring a list of current medications, any previous test results or letters, and a note of your symptoms and when they occur. Wear clothing that is easy to remove from the waist up for the examination.",
  },
  {
    q: "Which insurers do you work with?",
    a: "The clinic is recognised by the major UK private medical insurers. Please bring your policy number and pre-authorisation code. Self-paying patients receive a written fee estimate in advance.",
  },
  {
    q: "When will I receive my results?",
    a: "Tests performed in clinic are explained during your visit. A written summary is sent to you within 48 hours. External imaging results are reviewed with you at a follow-up, in person or by video.",
  },
  {
    q: "Do you offer video consultations?",
    a: "Yes, for follow-up appointments and results discussions. New patients are seen in person so that a proper examination can take place.",
  },
];
