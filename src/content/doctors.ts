import type { Doctor } from './types';

/**
 * ⚠️ VERIFY BEFORE LAUNCH
 * Degrees, medical council registration numbers, fellowships and years of
 * experience below are realistic placeholders. Publishing unverified medical
 * credentials is a regulatory risk — confirm every line with each doctor.
 */
export const doctors: readonly Doctor[] = [
  {
    slug: 'dr-sapna-chauhan',
    name: 'Dr. Sapna Chauhan',
    honorific: 'Dr.',
    specialty: 'Obstetrics & Gynaecology',
    specialtyShort: 'Obstetrics & Gynaecology',
    qualifications: 'MBBS, MS (Obstetrics & Gynaecology)',
    registration: 'MPMC Reg. No. TODO',
    yearsExperience: 12,
    languages: ['Hindi', 'English'],
    photo: '/images/doctors/dr-sapna-chauhan.jpg',
    photoAlt: 'Dr. Sapna Chauhan, Obstetrician and Gynaecologist at Nimitt Clinic, Indore',
    headline: 'Obstetrician & Gynaecologist in Indore',
    summary:
      'Dr. Sapna Chauhan cares for women through pregnancy, fertility concerns, gynaecological surgery and menopause — with unhurried consultations and decisions made together, never for you.',
    bio: [
      'Dr. Sapna Chauhan is an obstetrician and gynaecologist with over a decade of clinical practice in Indore. She trained in high-risk obstetrics and minimal-access gynaecological surgery, and has since guided thousands of women through pregnancy, delivery and recovery.',
      'Her practice is built around a simple conviction: a woman should leave every consultation understanding exactly what is happening in her body and why a particular course of treatment has been recommended. Consultations are unhurried, questions are welcome, and treatment plans are agreed on together.',
      'Alongside antenatal and postnatal care, Dr. Chauhan manages PCOS, endometriosis, abnormal uterine bleeding, infertility evaluation, contraception counselling and menopause. She performs laparoscopic and hysteroscopic procedures, and coordinates closely with anaesthesia and neonatal colleagues for deliveries at partner hospitals.',
    ],
    credentials: [
      {
        abbr: 'MBBS',
        title: 'Bachelor of Medicine & Bachelor of Surgery',
        description: 'The foundational degree in modern medical education.',
      },
      {
        abbr: 'MS (Obst. & Gynae.)',
        title: 'Master of Surgery — Obstetrics & Gynaecology',
        description:
          'Postgraduate surgical specialisation in pregnancy care, gynaecological disease and operative obstetrics.',
      },
      {
        abbr: 'FMAS',
        title: 'Fellowship in Minimal Access Surgery',
        description:
          'Advanced training in laparoscopic and hysteroscopic gynaecological procedures.',
      },
      {
        abbr: 'Certified Colposcopist',
        title: 'Cervical cancer screening & colposcopy',
        description:
          'Structured training in Pap smear interpretation, HPV testing and colposcopic evaluation.',
      },
    ],
    expertise: [
      'High-risk pregnancy & antenatal care',
      'Normal and caesarean delivery',
      'Laparoscopic & hysteroscopic surgery',
      'PCOS and hormonal disorders',
      'Infertility evaluation & counselling',
      'Abnormal uterine bleeding',
      'Cervical cancer screening & colposcopy',
      'Contraception & family planning',
      'Menopause management',
      'Adolescent gynaecology',
    ],
    consultationDays: 'Monday – Saturday',
    consultationTime: '10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM',
  },
  {
    slug: 'dr-manoj-kumar-pk',
    name: 'Dr. Manoj Kumar PK',
    honorific: 'Dr.',
    specialty: 'Internal Medicine',
    specialtyShort: 'Internal Medicine',
    qualifications: 'MBBS, MD (General Medicine)',
    registration: 'MPMC Reg. No. TODO',
    yearsExperience: 11,
    languages: ['Hindi', 'English', 'Malayalam'],
    photo: '/images/doctors/dr-manoj-kumar-pk.jpg',
    photoAlt: 'Dr. Manoj Kumar PK, Internal Medicine specialist at Nimitt Clinic, Indore',
    headline: 'Internal Medicine Specialist in Indore',
    summary:
      'Dr. Manoj Kumar PK looks after adult medicine end to end — diabetes, blood pressure, thyroid, infections and unexplained symptoms — with an emphasis on getting the diagnosis right the first time.',
    bio: [
      'Dr. Manoj Kumar PK is a consultant physician in internal medicine with more than a decade of experience across emergency, inpatient and outpatient care. He handles the full breadth of adult medicine: diabetes, hypertension, thyroid and lipid disorders, infections, respiratory illness, and the symptoms that no single specialist seems able to explain.',
      'His approach starts with a careful history and examination rather than a long list of tests. Investigations are ordered when they will change the plan, results are explained in plain language, and medication is kept to the smallest set that does the job.',
      'Dr. Kumar also runs the clinic’s preventive health programme — annual reviews, cardiovascular risk assessment, vaccination for adults, and pre-operative fitness evaluation, including for patients under Dr. Chauhan’s surgical care.',
    ],
    credentials: [
      {
        abbr: 'MBBS',
        title: 'Bachelor of Medicine & Bachelor of Surgery',
        description: 'The foundational degree in modern medical education.',
      },
      {
        abbr: 'MD (General Medicine)',
        title: 'Doctor of Medicine — Internal Medicine',
        description:
          'Postgraduate specialisation in the diagnosis and long-term management of complex adult illness.',
      },
      {
        abbr: 'Diabetology',
        title: 'Certificate Course in Diabetes Management',
        description:
          'Focused training in insulin therapy, continuous glucose monitoring and diabetic complications.',
      },
      {
        abbr: 'ACLS',
        title: 'Advanced Cardiac Life Support',
        description: 'Current certification in emergency cardiac and critical care protocols.',
      },
    ],
    expertise: [
      'Diabetes & insulin management',
      'Hypertension and heart-risk assessment',
      'Thyroid & hormonal disorders',
      'Fever and infectious disease',
      'Asthma, COPD & respiratory illness',
      'Anaemia and nutritional deficiency',
      'Preventive health & annual check-ups',
      'Pre-operative medical fitness',
      'Adult vaccination',
      'Second opinion on unexplained symptoms',
    ],
    consultationDays: 'Monday – Saturday',
    consultationTime: '11:00 AM – 2:00 PM & 6:00 PM – 9:00 PM',
  },
] as const;

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export const doctorSlugs = doctors.map((d) => d.slug);
