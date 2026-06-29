export const departments = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "Heart",
    description: "Heart & Cardiovascular Care",
    doctors: [
      {
        id: "doc-001",
        name: "Dr. Rajesh Sharma",
        department: "cardiology",
        qualification: "MBBS, MD, DM (Cardiology)",
        experience: "18 Years",
        availability: "Mon-Sat",
        fee: 1200,
        languages: ["Hindi", "English", "Punjabi"],
        diseases: ["Heart Attack", "Chest Pain", "Arrhythmia", "High BP", "Heart Failure"]
      },
      {
        id: "doc-002",
        name: "Dr. Priya Mehta",
        department: "cardiology",
        qualification: "MBBS, MD, FACC",
        experience: "14 Years",
        availability: "Mon, Wed, Fri",
        fee: 1000,
        languages: ["Hindi", "English", "Gujarati"],
        diseases: ["Valve Disorders", "High Cholesterol", "High BP", "Angina"]
      },
    ],
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: "Brain",
    description: "Brain & Nervous System",
    doctors: [
      {
        id: "doc-003",
        name: "Dr. Anil Verma",
        department: "neurology",
        qualification: "MBBS, MD, DM (Neurology)",
        experience: "20 Years",
        availability: "Tue, Thu, Sat",
        fee: 1300,
        languages: ["Hindi", "English", "Urdu"],
        diseases: ["Stroke", "Epilepsy", "Parkinson's", "Multiple Sclerosis"]
      },
      {
        id: "doc-004",
        name: "Dr. Sunita Kapoor",
        department: "neurology",
        qualification: "MBBS, MD, DM (Neuro)",
        experience: "12 Years",
        availability: "Mon-Fri",
        fee: 1100,
        languages: ["Hindi", "English"],
        diseases: ["Migraine", "Neuropathy", "Alzheimer's", "Dementia", "Vertigo"]
      },
    ],
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: "Bone",
    description: "Bones, Joints & Muscles",
    doctors: [
      {
        id: "doc-005",
        name: "Dr. Vikram Singh",
        department: "orthopedics",
        qualification: "MBBS, MS (Ortho), MCh",
        experience: "16 Years",
        availability: "Mon-Sat",
        fee: 1100,
        languages: ["Hindi", "English", "Haryanvi"],
        diseases: ["Fractures", "Joint Replacement", "Arthritis", "Spondylitis"]
      },
      {
        id: "doc-006",
        name: "Dr. Neha Gupta",
        department: "orthopedics",
        qualification: "MBBS, MS (Ortho)",
        experience: "10 Years",
        availability: "Mon, Wed, Fri",
        fee: 900,
        languages: ["Hindi", "English"],
        diseases: ["Osteoporosis", "Back Pain", "Ligament Injury", "Slip Disc"]
      },
    ],
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: "Sparkles",
    description: "Skin, Hair & Nails",
    doctors: [
      {
        id: "doc-007",
        name: "Dr. Kavita Joshi",
        department: "dermatology",
        qualification: "MBBS, MD (Dermatology)",
        experience: "13 Years",
        availability: "Mon-Sat",
        fee: 800,
        languages: ["Hindi", "English", "Marathi"],
        diseases: ["Acne", "Eczema", "Hair Loss", "Skin Infections"]
      },
      {
        id: "doc-008",
        name: "Dr. Rohit Bansal",
        department: "dermatology",
        qualification: "MBBS, MD, FRCP",
        experience: "9 Years",
        availability: "Tue, Thu, Sat",
        fee: 750,
        languages: ["Hindi", "English"],
        diseases: ["Psoriasis", "Skin Allergies", "Dermatitis", "Pruritus"]
      },
    ],
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: "Eye",
    description: "Eye Care & Vision",
    doctors: [
      {
        id: "doc-009",
        name: "Dr. Meera Nair",
        department: "ophthalmology",
        qualification: "MBBS, MS (Ophth), FRCS",
        experience: "15 Years",
        availability: "Mon, Wed, Fri, Sat",
        fee: 900,
        languages: ["Hindi", "English", "Malayalam"],
        diseases: ["Cataract", "Glaucoma", "Vision Correction", "Macular Degeneration"]
      },
      {
        id: "doc-010",
        name: "Dr. Arjun Reddy",
        department: "ophthalmology",
        qualification: "MBBS, DO, DNB (Ophth)",
        experience: "8 Years",
        availability: "Mon-Fri",
        fee: 700,
        languages: ["English", "Telugu", "Hindi"],
        diseases: ["Dry Eyes", "Refractive Error", "Conjunctivitis", "Astigmatism"]
      },
    ],
  },
  {
    id: "ent",
    name: "ENT",
    icon: "Ear",
    description: "Ear, Nose & Throat",
    doctors: [
      {
        id: "doc-011",
        name: "Dr. Suresh Kumar",
        department: "ent",
        qualification: "MBBS, MS (ENT)",
        experience: "19 Years",
        availability: "Mon-Sat",
        fee: 800,
        languages: ["Hindi", "English", "Tamil"],
        diseases: ["Sinusitis", "Tonsillitis", "Hearing Loss", "Nasal Polyps"]
      },
      {
        id: "doc-012",
        name: "Dr. Anita Desai",
        department: "ent",
        qualification: "MBBS, DLO, DNB (ENT)",
        experience: "11 Years",
        availability: "Mon, Wed, Fri",
        fee: 700,
        languages: ["Hindi", "English", "Gujarati"],
        diseases: ["Ear Infections", "Vertigo", "Tinnitus", "Throat Disorders"]
      },
    ],
  },
  {
    id: "gynecology",
    name: "Gynecology",
    icon: "Baby",
    description: "Women's Health & Maternity",
    doctors: [
      {
        id: "doc-013",
        name: "Dr. Shalini Rao",
        department: "gynecology",
        qualification: "MBBS, MS (OBG), FRCOG",
        experience: "22 Years",
        availability: "Mon-Sat",
        fee: 1000,
        languages: ["Hindi", "English", "Kannada"],
        diseases: ["Pregnancy Care", "PCOD/PCOS", "Fibroids", "Menopause Care"]
      },
      {
        id: "doc-014",
        name: "Dr. Pooja Agarwal",
        department: "gynecology",
        qualification: "MBBS, DGO, DNB (OBG)",
        experience: "9 Years",
        availability: "Tue, Thu, Sat",
        fee: 800,
        languages: ["Hindi", "English"],
        diseases: ["Menstrual Disorders", "Ovarian Cysts", "Antenatal Care"]
      },
    ],
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: "Baby",
    description: "Child Health & Development",
    doctors: [
      {
        id: "doc-015",
        name: "Dr. Ravi Iyer",
        department: "pediatrics",
        qualification: "MBBS, MD (Pediatrics), IAP Fellow",
        experience: "17 Years",
        availability: "Mon-Sat",
        fee: 900,
        languages: ["Hindi", "English", "Tamil"],
        diseases: ["Child Growth", "Pediatric Infections", "Asthma in Kids", "Common Cold"]
      },
      {
        id: "doc-016",
        name: "Dr. Meghna Pillai",
        department: "pediatrics",
        qualification: "MBBS, DCH, MD (Pediatrics)",
        experience: "10 Years",
        availability: "Mon, Wed, Fri",
        fee: 750,
        languages: ["Hindi", "English", "Malayalam"],
        diseases: ["Vaccination", "Newborn Care", "Child Nutrition", "Bedwetting"]
      },
    ],
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    icon: "Stethoscope",
    description: "General Health & Internal Medicine",
    doctors: [
      {
        id: "doc-017",
        name: "Dr. Sanjay Mishra",
        department: "general-medicine",
        qualification: "MBBS, MD (Medicine)",
        experience: "25 Years",
        availability: "Mon-Sat",
        fee: 600,
        languages: ["Hindi", "English", "Bhojpuri"],
        diseases: ["Fever", "Diabetes", "Typhoid", "Malaria", "Asthma", "Flu"]
      },
      {
        id: "doc-018",
        name: "Dr. Deepa Narayan",
        department: "general-medicine",
        qualification: "MBBS, DNB (Medicine)",
        experience: "12 Years",
        availability: "Mon-Fri",
        fee: 500,
        languages: ["Hindi", "English"],
        diseases: ["Viral Fever", "High BP", "Infections", "Acidity", "Thyroid"]
      },
    ],
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    icon: "Scissors",
    description: "Surgical Procedures & Operations",
    doctors: [
      {
        id: "doc-019",
        name: "Dr. Ashok Choudhary",
        department: "general-surgery",
        qualification: "MBBS, MS (Surgery), FACS",
        experience: "21 Years",
        availability: "Mon, Wed, Fri",
        fee: 1200,
        languages: ["Hindi", "English"],
        diseases: ["Hernia", "Appendicitis", "Gallstones", "Fistula"]
      },
      {
        id: "doc-020",
        name: "Dr. Ritu Saxena",
        department: "general-surgery",
        qualification: "MBBS, MS (Surgery)",
        experience: "13 Years",
        availability: "Tue, Thu, Sat",
        fee: 1000,
        languages: ["Hindi", "English"],
        diseases: ["Lipoma", "Piles", "Wound Care", "Abscess"]
      },
    ],
  },
  {
    id: "urology",
    name: "Urology",
    icon: "Activity",
    description: "Kidney & Urinary System",
    doctors: [
      {
        id: "doc-021",
        name: "Dr. Manish Tiwari",
        department: "urology",
        qualification: "MBBS, MS, MCh (Urology)",
        experience: "16 Years",
        availability: "Mon, Wed, Fri, Sat",
        fee: 1100,
        languages: ["Hindi", "English"],
        diseases: ["Kidney Stones", "Urinary Tract Infection (UTI)", "Prostate Issues"]
      },
      {
        id: "doc-022",
        name: "Dr. Swati Dubey",
        department: "urology",
        qualification: "MBBS, MS, DNB (Urology)",
        experience: "8 Years",
        availability: "Tue, Thu",
        fee: 900,
        languages: ["Hindi", "English"],
        diseases: ["Bladder Disorders", "Urinary Incontinence", "Hematuria"]
      },
    ],
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    icon: "Wind",
    description: "Lungs & Respiratory Care",
    doctors: [
      {
        id: "doc-023",
        name: "Dr. Prakash Jha",
        department: "pulmonology",
        qualification: "MBBS, MD, DTCD, FCCP",
        experience: "18 Years",
        availability: "Mon-Sat",
        fee: 900,
        languages: ["Hindi", "English", "Maithili"],
        diseases: ["Asthma", "COPD", "Tuberculosis", "Pneumonia"]
      },
      {
        id: "doc-024",
        name: "Dr. Kirti Mahajan",
        department: "pulmonology",
        qualification: "MBBS, MD (Pulmonary Medicine)",
        experience: "7 Years",
        availability: "Mon, Wed, Fri",
        fee: 750,
        languages: ["Hindi", "English"],
        diseases: ["Bronchitis", "Sleep Apnea", "Chronic Cough", "Pleurisy"]
      },
    ],
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    icon: "Pill",
    description: "Stomach, Liver & Digestive System",
    doctors: [
      {
        id: "doc-025",
        name: "Dr. Rajiv Malhotra",
        department: "gastroenterology",
        qualification: "MBBS, MD, DM (Gastro), FAGE",
        experience: "20 Years",
        availability: "Mon, Wed, Fri",
        fee: 1200,
        languages: ["Hindi", "English"],
        diseases: ["Acidity", "Liver Cirrhosis", "IBS", "Gastritis", "Constipation"]
      },
      {
        id: "doc-026",
        name: "Dr. Nisha Bhatia",
        department: "gastroenterology",
        qualification: "MBBS, MD, DM (Gastro)",
        experience: "9 Years",
        availability: "Tue, Thu, Sat",
        fee: 1000,
        languages: ["Hindi", "English"],
        diseases: ["Fatty Liver", "Ulcers", "Jaundice", "Pancreatitis"]
      },
    ],
  },
  {
    id: "endocrinology",
    name: "Endocrinology",
    icon: "FlaskConical",
    description: "Hormones, Diabetes & Thyroid",
    doctors: [
      {
        id: "doc-027",
        name: "Dr. Amit Patel",
        department: "endocrinology",
        qualification: "MBBS, MD, DM (Endo)",
        experience: "15 Years",
        availability: "Mon, Wed, Fri",
        fee: 1000,
        languages: ["Hindi", "English", "Gujarati"],
        diseases: ["Diabetes", "Thyroid Disorders", "Obesity", "Goiter"]
      },
      {
        id: "doc-028",
        name: "Dr. Sangeeta Rani",
        department: "endocrinology",
        qualification: "MBBS, MD (Endocrinology)",
        experience: "8 Years",
        availability: "Tue, Thu, Sat",
        fee: 800,
        languages: ["Hindi", "English"],
        diseases: ["Hormonal Imbalance", "PCOS", "Growth Hormone Disorders"]
      },
    ],
  },
  {
    id: "psychiatry",
    name: "Psychiatry",
    icon: "Brain",
    description: "Mental Health & Counseling",
    doctors: [
      {
        id: "doc-029",
        name: "Dr. Vikas Kohli",
        department: "psychiatry",
        qualification: "MBBS, MD (Psychiatry)",
        experience: "19 Years",
        availability: "Mon, Wed, Fri",
        fee: 1100,
        languages: ["Hindi", "English", "Punjabi"],
        diseases: ["Depression", "Anxiety", "Insomnia", "OCD", "Schizophrenia"]
      },
      {
        id: "doc-030",
        name: "Dr. Shikha Verma",
        department: "psychiatry",
        qualification: "MBBS, DPM, MD (Psychiatry)",
        experience: "11 Years",
        availability: "Tue, Thu, Sat",
        fee: 900,
        languages: ["Hindi", "English"],
        diseases: ["ADHD", "Bipolar Disorder", "Stress Management", "Addiction"]
      },
    ],
  },
  {
    id: "dentistry",
    name: "Dentistry",
    icon: "Smile",
    description: "Dental Care & Oral Health",
    doctors: [
      {
        id: "doc-031",
        name: "Dr. Puneet Sharma",
        department: "dentistry",
        qualification: "BDS, MDS (Orthodontics)",
        experience: "14 Years",
        availability: "Mon-Sat",
        fee: 700,
        languages: ["Hindi", "English"],
        diseases: ["Braces", "Root Canal Treatment", "Cavities", "Gum Diseases"]
      },
      {
        id: "doc-032",
        name: "Dr. Anjali Kulkarni",
        department: "dentistry",
        qualification: "BDS, MDS (Prosthodontics)",
        experience: "10 Years",
        availability: "Mon, Wed, Fri",
        fee: 600,
        languages: ["Hindi", "English", "Marathi"],
        diseases: ["Dental Implants", "Dentures", "Teeth Whitening", "Crowns & Bridges"]
      },
    ],
  },
];

export const allDoctors = departments.flatMap((dept) => dept.doctors);

export const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const visitTypes = [
  { value: "new", label: "New Patient" },
  { value: "follow-up", label: "Follow-up Visit" },
  { value: "consultation", label: "Second Opinion / Consultation" },
  { value: "emergency", label: "Emergency Referral" },
];
