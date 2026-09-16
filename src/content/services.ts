import type { Service } from './types';

export const services: readonly Service[] = [
  {
    slug: 'pregnancy-care',
    title: 'Pregnancy & Antenatal Care',
    shortTitle: 'Pregnancy Care',
    icon: 'pregnancy',
    excerpt:
      'Complete care from the first positive test to your postnatal review — scans, screening and a delivery plan made with you.',
    description: [
      'Pregnancy care at Nimitt is structured but never rushed. From your first visit we map out the whole journey: which scan happens when, which blood tests matter, what warning signs to watch for, and who to call at 2 AM.',
      'Every visit covers weight, blood pressure, uterine growth and fetal heart monitoring, with growth scans and screening scheduled at the right gestational weeks. High-risk pregnancies — gestational diabetes, hypertension, thyroid disease, previous caesarean, twins — are co-managed with Dr. Manoj Kumar PK so that your medical and obstetric care never pull in opposite directions.',
      'You will leave each appointment knowing what happens next. Delivery planning starts well before the due date, with a clear discussion of normal delivery, induction and caesarean, and what each would mean for you.',
    ],
    includes: [
      'Pre-conception counselling and folic acid planning',
      'Confirmation of pregnancy and viability scan',
      'Scheduled antenatal visits with a written plan',
      'NT/NB, anomaly and growth scan coordination',
      'Gestational diabetes and anaemia screening',
      'Tetanus and other pregnancy vaccinations',
      'High-risk pregnancy co-management',
      'Birth planning and labour preparation',
      'Postnatal review, lactation and contraception advice',
    ],
    whoIsItFor:
      'Anyone planning a pregnancy, newly pregnant, or seeking a second opinion on an ongoing pregnancy.',
    doctors: ['dr-sapna-chauhan', 'dr-manoj-kumar-pk'],
  },
  {
    slug: 'womens-health-check',
    title: "Women's Health & Wellness Check",
    shortTitle: "Women's Health Check",
    icon: 'womens-health',
    excerpt:
      'Periods, PCOS, fertility, cervical screening and menopause — investigated properly and explained in plain language.',
    description: [
      'Irregular periods, heavy bleeding, pelvic pain and hormonal symptoms are common — and commonly dismissed. This consultation exists to take them seriously.',
      'A visit begins with a detailed history and examination, followed by targeted investigations: hormonal profile, thyroid function, pelvic ultrasound, Pap smear or HPV testing where indicated. We explain what each result means before recommending anything.',
      'The clinic manages PCOS, endometriosis, fibroids, abnormal uterine bleeding, recurrent infections, contraception choices, infertility evaluation and the perimenopausal transition. Where treatment is lifestyle-first, we say so rather than reaching for a prescription.',
    ],
    includes: [
      'Detailed gynaecological consultation and examination',
      'Menstrual disorder and PCOS evaluation',
      'Hormonal and thyroid profile interpretation',
      'Pelvic ultrasound assessment',
      'Pap smear, HPV testing and colposcopy',
      'Breast examination and screening guidance',
      'Infertility evaluation for couples',
      'Contraception and family-planning counselling',
      'Menopause symptom management and bone health',
    ],
    whoIsItFor:
      'Women of any age with menstrual, hormonal, fertility or pelvic concerns — and anyone due for a routine annual check.',
    doctors: ['dr-sapna-chauhan'],
  },
  {
    slug: 'gynaecological-surgery',
    title: 'Gynaecological & Laparoscopic Surgery',
    shortTitle: 'Gynaecological Surgery',
    icon: 'surgery',
    excerpt:
      'Minimal-access procedures for fibroids, cysts and endometriosis — smaller incisions, shorter stays, faster recovery.',
    description: [
      'Where surgery is genuinely required, minimal-access technique is the default. Laparoscopic and hysteroscopic procedures mean smaller incisions, less blood loss, a shorter hospital stay and a considerably quicker return to normal life than open surgery.',
      'Before anything is scheduled, you get a straight answer to three questions: is surgery necessary now, what are the non-surgical alternatives, and what does recovery realistically look like. Dr. Manoj Kumar PK provides pre-operative medical clearance so that diabetes, blood pressure or thyroid issues are optimised beforehand.',
      'Procedures are performed at accredited partner hospitals in Indore with full anaesthesia and critical-care backup. Follow-up, suture review and recovery guidance happen back at the clinic.',
    ],
    includes: [
      'Diagnostic and operative laparoscopy',
      'Hysteroscopy for uterine cavity assessment',
      'Laparoscopic ovarian cystectomy',
      'Myomectomy for fibroids',
      'Endometriosis surgery',
      'Hysterectomy (laparoscopic and abdominal)',
      'Tubal evaluation and sterilisation',
      'Cervical procedures including LEEP',
      'Pre-operative clearance and post-operative follow-up',
    ],
    whoIsItFor:
      'Women advised surgery for fibroids, ovarian cysts, endometriosis or abnormal bleeding — including those seeking a second opinion before consenting.',
    doctors: ['dr-sapna-chauhan', 'dr-manoj-kumar-pk'],
  },
  {
    slug: 'internal-medicine',
    title: 'Internal Medicine Consultation',
    shortTitle: 'Internal Medicine',
    icon: 'internal-medicine',
    excerpt:
      'Diabetes, blood pressure, thyroid, fever and long-standing symptoms — diagnosed carefully, treated with the minimum effective plan.',
    description: [
      'Internal medicine is where unexplained symptoms get sorted out. Dr. Manoj Kumar PK evaluates the whole picture rather than one organ at a time, which is exactly what is needed when fatigue, breathlessness, recurrent fever or weight change has no obvious cause.',
      'Long-term conditions are managed for the long term. Diabetes, hypertension, thyroid and lipid disorders are reviewed on a fixed schedule with target values you can see, so that treatment is adjusted on evidence rather than guesswork.',
      'Acute illness — fever, infections, gastrointestinal and respiratory problems — is assessed the same day wherever possible, with clear guidance on when a symptom needs escalation to hospital care.',
    ],
    includes: [
      'Comprehensive adult medical consultation',
      'Diabetes management, including insulin titration',
      'Hypertension and cardiovascular risk assessment',
      'Thyroid and metabolic disorder management',
      'Fever and infectious disease evaluation',
      'Asthma and COPD review',
      'Anaemia and vitamin deficiency workup',
      'Annual preventive health check and adult vaccination',
      'Pre-operative medical fitness clearance',
    ],
    whoIsItFor:
      'Adults with a chronic condition to manage, an acute illness to treat, or symptoms nobody has explained yet.',
    doctors: ['dr-manoj-kumar-pk'],
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

export function getServicesForDoctor(doctorSlug: string): readonly Service[] {
  return services.filter((s) => s.doctors.includes(doctorSlug));
}
