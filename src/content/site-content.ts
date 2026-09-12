import type { Faq, Feature, Stat, Testimonial } from './types';

export const features: readonly Feature[] = [
  {
    icon: 'doctor',
    title: 'Expert Doctors',
    description:
      'Two specialists, twenty-three years of combined practice. Obstetrics and gynaecology alongside internal medicine, so your care never gets handed off mid-way.',
  },
  {
    icon: 'facility',
    title: 'Modern Facilities',
    description:
      'In-house ultrasound, on-site sample collection and digital records, with laparoscopic procedures at accredited partner hospitals in Indore.',
  },
  {
    icon: 'care',
    title: 'Caring Staff',
    description:
      'Appointment slots long enough to actually talk. A front desk that answers the phone, and a team that remembers you between visits.',
  },
  {
    icon: 'education',
    title: 'Patient Education',
    description:
      'Every diagnosis explained in plain language, every prescription justified. You leave knowing what is happening and what comes next.',
  },
] as const;

export const stats: readonly Stat[] = [
  { value: 12000, suffix: '+', label: 'Patients Cared For' },
  { value: 23, suffix: '+', label: 'Years Combined Experience' },
  { value: 2500, suffix: '+', label: 'Deliveries Supported' },
  { value: 98, suffix: '%', label: 'Would Recommend Us' },
] as const;

/**
 * ⚠️ VERIFY BEFORE LAUNCH
 * Replace with real, consented patient reviews (Google/Practo) before going
 * live. Publishing invented testimonials as genuine is both unethical and,
 * in India, a violation of consumer-protection rules on misleading claims.
 */
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      'Dr. Sapna handled my pregnancy from week six to delivery. Every scan was scheduled in advance, every question answered without me feeling like a nuisance. When my BP rose in the eighth month she coordinated with Dr. Manoj the same day. My daughter is four months old now and both of us are well.',
    author: 'Priya S.',
    context: 'Antenatal care & delivery',
    rating: 5,
  },
  {
    quote:
      'I had been on three different diabetes medications for years without anyone explaining why. Dr. Manoj reviewed everything, dropped one drug, adjusted another and set an actual target for me. My HbA1c came down from 9.4 to 6.8 in seven months.',
    author: 'Rakesh J.',
    context: 'Diabetes management',
    rating: 5,
  },
  {
    quote:
      'Two other doctors advised an open hysterectomy for my fibroids. Dr. Sapna explained why a laparoscopic myomectomy was possible in my case, and what the trade-offs were. I was back at work in twelve days. I only wish I had come here first.',
    author: 'Anjali M.',
    context: 'Laparoscopic myomectomy',
    rating: 5,
  },
] as const;

export const faqs: readonly Faq[] = [
  {
    question: 'Do I need an appointment, or can I walk in?',
    answer:
      'Walk-ins are accepted during consultation hours, but you will wait less with an appointment. Book on WhatsApp or by phone — same-day slots are usually available, and urgent cases are always accommodated.',
  },
  {
    question: 'Which conditions does each doctor see?',
    answer:
      'Dr. Sapna Chauhan handles pregnancy, gynaecological problems and gynaecological surgery. Dr. Manoj Kumar PK handles adult medicine — diabetes, blood pressure, thyroid, fever, respiratory illness and preventive health. If you are not sure who to see, call the front desk and we will route you correctly.',
  },
  {
    question: 'Can both doctors see me for the same problem?',
    answer:
      'Yes, and for some situations that is the point of the clinic. A pregnancy with gestational diabetes, or surgery in a patient with hypertension, is co-managed by both doctors so that the obstetric and medical plans agree with each other.',
  },
  {
    question: 'Is an ultrasound available at the clinic?',
    answer:
      'Yes. Obstetric and pelvic ultrasound is performed in-house during consultation hours, so most patients get their scan and its interpretation in the same visit.',
  },
  {
    question: 'What should I bring to my first visit?',
    answer:
      'Any previous prescriptions, reports and scan films, a list of medicines you currently take, and your ID. For pregnancy visits, bring your antenatal card if you already have one.',
  },
  {
    question: 'Do you handle deliveries and surgery at the clinic?',
    answer:
      'Consultations, scans and minor procedures happen at the clinic. Deliveries and laparoscopic surgery are performed at accredited partner hospitals in Indore with full anaesthesia and neonatal support, under Dr. Chauhan’s care.',
  },
  {
    question: 'Do you accept insurance or cashless claims?',
    answer:
      'Clinic consultations are self-pay. For hospital admissions, deliveries and surgery, cashless and reimbursement claims are supported at our partner hospitals — the front desk will tell you which insurers are empanelled and help with paperwork.',
  },
  {
    question: 'How do I reach you in an emergency?',
    answer:
      'Call the clinic number directly — it is monitored outside consultation hours for existing patients. For anything life-threatening, go to the nearest emergency department first and call us on the way.',
  },
] as const;

export const patientJourney = [
  {
    step: '01',
    title: 'Book in under a minute',
    description:
      'Message us on WhatsApp or call the clinic. Tell us the problem in one line and we will give you the right doctor and the earliest slot.',
  },
  {
    step: '02',
    title: 'An unhurried consultation',
    description:
      'History, examination, and time for your questions. Investigations are ordered only where they will change the plan.',
  },
  {
    step: '03',
    title: 'A plan you understand',
    description:
      'You leave with the diagnosis in plain language, a written prescription, and a clear answer to “what happens next”.',
  },
  {
    step: '04',
    title: 'Follow-through',
    description:
      'Scheduled reviews, results explained when they arrive, and one point of contact if something changes in between.',
  },
] as const;

export const emergencySigns = [
  'Heavy vaginal bleeding or passing clots during pregnancy',
  'Severe abdominal pain, or pain with fever',
  'Reduced or absent fetal movement',
  'Leaking fluid or contractions before 37 weeks',
  'Severe headache, blurred vision or swelling in pregnancy',
  'Chest pain, breathlessness at rest, or fainting',
  'Blood sugar below 70 mg/dL with confusion, or above 400 mg/dL',
  'Fever above 103°F that will not settle, or fever with a stiff neck',
] as const;
