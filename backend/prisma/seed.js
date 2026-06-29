// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── 1. Admin User ──────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@pulselife.com" },
    update: {},
    create: {
      name: "Hospital Admin",
      email: "admin@pulselife.com",
      passwordHash: adminHash,
      role: "ADMIN",
      phone: "9000000000",
    },
  });
  console.log("✅ Admin created:", admin.email);

  // Demo patient user
  const patientHash = await bcrypt.hash("patient123", 10);
  await prisma.user.upsert({
    where: { email: "patient@example.com" },
    update: {},
    create: {
      name: "Demo Patient",
      email: "patient@example.com",
      passwordHash: patientHash,
      role: "PATIENT",
      phone: "9111111111",
    },
  });
  console.log("✅ Demo patient created");

  // ─── 2. Departments ─────────────────────────────────────────────────────────
  const departmentsData = [
    { slug: "neurology",       name: "Brain & Mental Health",  description: "Advanced care for brain, nervous system, and mental health.", iconName: "Brain",       color: "blue"    },
    { slug: "ophthalmology",   name: "Eye Care & Vision",      description: "Expert eye care and vision correction surgeries.",             iconName: "Eye",        color: "cyan"    },
    { slug: "endocrinology",   name: "Thyroid & Hormones",     description: "Treatment for thyroid, diabetes, and hormonal imbalances.",    iconName: "ShieldCheck", color: "purple"  },
    { slug: "pulmonology",     name: "Lungs & Breathing",      description: "Specialized care for lungs and respiratory conditions.",       iconName: "Wind",        color: "sky"     },
    { slug: "cardiology",      name: "Heart Care",             description: "Comprehensive care for heart and vascular diseases.",          iconName: "Heart",       color: "rose"    },
    { slug: "gastroenterology",name: "Stomach & Digestion",    description: "Digestive system, stomach, and liver disease treatments.",     iconName: "Stethoscope", color: "orange"  },
    { slug: "nephrology",      name: "Kidneys & Urinary",      description: "Kidney care and urinary tract treatments.",                   iconName: "Droplet",     color: "yellow"  },
    { slug: "gynaecology",     name: "Women's Health",         description: "Women's health, pregnancy, and reproductive care.",           iconName: "User",        color: "pink"    },
    { slug: "orthopaedics",    name: "Bones & Joints",         description: "Expert treatment for bone, joint, and muscle conditions.",    iconName: "Bone",        color: "emerald" },
    { slug: "dermatology",     name: "Skin & Cosmetic",        description: "Skin care, aesthetics, and reconstructive surgery.",          iconName: "ShieldCheck", color: "amber"   },
    { slug: "oncology",        name: "Cancer Care",            description: "Comprehensive cancer care and pediatric oncology.",           iconName: "Activity",    color: "red"     },
    { slug: "psychiatry",      name: "Mental Health",          description: "Mental health and psychiatric care.",                         iconName: "Brain",       color: "violet"  },
    { slug: "urology",         name: "Urology",                description: "Treatment for urinary and male reproductive conditions.",     iconName: "Droplet",     color: "teal"    },
    { slug: "rheumatology",    name: "Rheumatology",           description: "Arthritis and autoimmune disease care.",                      iconName: "Bone",        color: "lime"    },
    { slug: "plastic-surgery", name: "Plastic Surgery",        description: "Reconstructive and cosmetic surgical procedures.",           iconName: "ShieldCheck", color: "pink"    },
    { slug: "pediatrics",      name: "Pediatrics",             description: "Specialized medical care for children and newborns.",         iconName: "Users",       color: "green"   },
  ];

  const deptMap = {}; // slug -> id
  for (const d of departmentsData) {
    const dept = await prisma.department.upsert({
      where: { slug: d.slug },
      update: {},
      create: d,
    });
    deptMap[d.slug] = dept.id;
  }
  console.log("✅ Departments seeded:", Object.keys(deptMap).length);

  // ─── 3. Doctors ─────────────────────────────────────────────────────────────
  const doctorsData = [
    {
      name: "Dr. Anjali Sharma",      speciality: "Cardiothoracic Surgery",     departmentSlug: "cardiology",
      degrees: "MBBS, MS, MCh (Cardio Thoracic Surgery)", languages: ["English", "Hindi", "Marathi"],
      imageUrl: "https://i.pinimg.com/736x/ad/6c/b0/ad6cb07e44a5e63ffc89d7723b181052.jpg",
      fee: 800,  experience: "12+ Years", bmdcNumber: "84220", rating: 5.0, ratingCount: 5512,
      joinedDate: new Date("2021-09-26"),
      diseases: ["Heart Disease", "Valve Repair", "Bypass Surgery"],
    },
    {
      name: "Dr. Rajesh Iyer",        speciality: "Neurology",                  departmentSlug: "neurology",
      degrees: "MBBS, MD (Medicine), DM (Neurology)", languages: ["English", "Tamil", "Hindi"],
      imageUrl: "https://i.pinimg.com/736x/11/13/21/111321d846eef0721e0c2059f4b2509c.jpg",
      fee: 1000, experience: "15+ Years", bmdcNumber: "78911", rating: 4.9, ratingCount: 4820,
      joinedDate: new Date("2019-03-12"),
      diseases: ["Epilepsy", "Migraine", "Parkinson's", "Stroke"],
    },
    {
      name: "Dr. Sneha Desai",        speciality: "Pediatric Oncology",         departmentSlug: "pediatrics",
      degrees: "MBBS, MD (Pediatrics), Fellowship in Oncology", languages: ["English", "Gujarati", "Hindi"],
      imageUrl: "https://i.pinimg.com/736x/26/40/9f/26409f5a30e3603e7819c84b2b3b5ad9.jpg",
      fee: 900,  experience: "10+ Years", bmdcNumber: "90233", rating: 5.0, ratingCount: 3120,
      joinedDate: new Date("2022-01-05"),
      diseases: ["Childhood Cancer", "Leukemia"],
    },
    {
      name: "Dr. Vikram Singh",       speciality: "Orthopaedics",               departmentSlug: "orthopaedics",
      degrees: "MBBS, MS (Orthopaedics), FRCS", languages: ["English", "Hindi", "Punjabi"],
      imageUrl: "https://i.pinimg.com/1200x/4c/ee/6c/4cee6c22feeb033e76f96c293c48bb0a.jpg",
      fee: 850,  experience: "14+ Years", bmdcNumber: "67455", rating: 4.8, ratingCount: 6210,
      joinedDate: new Date("2018-07-18"),
      diseases: ["Joint Replacement", "Fractures", "Sports Injuries"],
    },
    {
      name: "Dr. Meera Reddy",        speciality: "Obstetrics & Gynecology",    departmentSlug: "gynaecology",
      degrees: "MBBS, MD (OBG), MRCOG", languages: ["English", "Telugu", "Kannada"],
      imageUrl: "https://i.pinimg.com/736x/4a/de/6d/4ade6d2a43e9bdf4cb20cf1dc05def79.jpg",
      fee: 950,  experience: "11+ Years", bmdcNumber: "81200", rating: 4.9, ratingCount: 4015,
      joinedDate: new Date("2020-11-22"),
      diseases: ["Pregnancy", "PCOS", "Infertility"],
    },
    {
      name: "Dr. Aditya Menon",       speciality: "Gastroenterology",           departmentSlug: "gastroenterology",
      degrees: "MBBS, MD, DM (Gastroenterology)", languages: ["English", "Malayalam", "Hindi"],
      imageUrl: "https://i.pinimg.com/1200x/76/27/0a/76270a3a64daf1fc55424eed6f2cf00a.jpg",
      fee: 1100, experience: "13+ Years", bmdcNumber: "73622", rating: 4.7, ratingCount: 2890,
      joinedDate: new Date("2019-02-09"),
      diseases: ["IBS", "Liver Disease", "Ulcers"],
    },
    {
      name: "Dr. Kavita Banerjee",    speciality: "Dermatology",                departmentSlug: "dermatology",
      degrees: "MBBS, MD (Dermatology & Venereology)", languages: ["English", "Bengali", "Hindi"],
      imageUrl: "https://i.pinimg.com/736x/a0/2c/fb/a02cfb3c7982465c2da06d90bcf2dd02.jpg",
      fee: 700,  experience: "9+ Years",  bmdcNumber: "88541", rating: 5.0, ratingCount: 5340,
      joinedDate: new Date("2021-08-14"),
      diseases: ["Acne", "Eczema", "Psoriasis", "Skin Cancer"],
    },
    {
      name: "Dr. Sanjay Patel",       speciality: "Nephrology",                 departmentSlug: "nephrology",
      degrees: "MBBS, MD, DM (Nephrology), FASN", languages: ["English", "Gujarati", "Hindi"],
      imageUrl: "https://i.pinimg.com/736x/21/4b/23/214b230635d0c066a57db357c6902483.jpg",
      fee: 1050, experience: "16+ Years", bmdcNumber: "65120", rating: 4.8, ratingCount: 7100,
      joinedDate: new Date("2017-05-30"),
      diseases: ["Kidney Failure", "Dialysis", "Kidney Stones"],
    },
    {
      name: "Dr. Priya Kadam",        speciality: "Endocrinology",              departmentSlug: "endocrinology",
      degrees: "MBBS, MD (Medicine), DM (Endocrinology)", languages: ["English", "Marathi", "Hindi"],
      imageUrl: "https://i.pinimg.com/1200x/fe/0c/ba/fe0cba212ae98329e562f17b19c147d1.jpg",
      fee: 900,  experience: "10+ Years", bmdcNumber: "91002", rating: 4.9, ratingCount: 2450,
      joinedDate: new Date("2022-04-03"),
      diseases: ["Diabetes", "Thyroid", "Hormonal Imbalance"],
    },
    {
      name: "Dr. Arun Kumar",         speciality: "Pulmonology",                departmentSlug: "pulmonology",
      degrees: "MBBS, MD (Pulmonary Medicine), FCCP", languages: ["English", "Hindi", "Bhojpuri"],
      imageUrl: "https://i.pinimg.com/736x/7c/b6/e4/7cb6e4622063bc1fc06a9c3281f439d0.jpg",
      fee: 800,  experience: "12+ Years", bmdcNumber: "79330", rating: 4.7, ratingCount: 3600,
      joinedDate: new Date("2019-10-20"),
      diseases: ["Asthma", "COPD", "Tuberculosis"],
    },
    {
      name: "Dr. Ritu Verma",         speciality: "Psychiatry",                 departmentSlug: "psychiatry",
      degrees: "MBBS, MD (Psychiatry), DPM", languages: ["English", "Hindi"],
      imageUrl: "https://i.pinimg.com/1200x/a8/72/5a/a8725a458327278bd2c3aae0dd474ad8.jpg",
      fee: 950,  experience: "8+ Years",  bmdcNumber: "93450", rating: 5.0, ratingCount: 1980,
      joinedDate: new Date("2022-06-11"),
      diseases: ["Depression", "Anxiety", "Schizophrenia"],
    },
    {
      name: "Dr. Rohan Das",          speciality: "Urology",                    departmentSlug: "urology",
      degrees: "MBBS, MS (Surgery), MCh (Urology)", languages: ["English", "Bengali", "Hindi"],
      imageUrl: "https://i.pinimg.com/1200x/82/fc/75/82fc75a6e1ffd447261b69c03c60372a.jpg",
      fee: 1000, experience: "13+ Years", bmdcNumber: "70188", rating: 4.8, ratingCount: 4500,
      joinedDate: new Date("2018-12-07"),
      diseases: ["Kidney Stones", "Prostate", "Bladder Cancer"],
    },
    {
      name: "Dr. Shweta Joshi",       speciality: "Rheumatology",               departmentSlug: "rheumatology",
      degrees: "MBBS, MD (Medicine), DM (Rheumatology)", languages: ["English", "Marathi", "Hindi"],
      imageUrl: "https://i.pinimg.com/736x/fb/5a/02/fb5a0294b403e8440aa687ea94ed316c.jpg",
      fee: 900,  experience: "9+ Years",  bmdcNumber: "86700", rating: 4.9, ratingCount: 2760,
      joinedDate: new Date("2021-02-16"),
      diseases: ["Arthritis", "Lupus", "Gout"],
    },
    {
      name: "Dr. Manish Gupta",       speciality: "Ophthalmology",              departmentSlug: "ophthalmology",
      degrees: "MBBS, MS (Ophthalmology), DO", languages: ["English", "Hindi", "Punjabi"],
      imageUrl: "https://i.pinimg.com/1200x/eb/31/75/eb31750dbf64dd06d425d11774794a26.jpg",
      fee: 750,  experience: "11+ Years", bmdcNumber: "82345", rating: 4.8, ratingCount: 3950,
      joinedDate: new Date("2020-09-28"),
      diseases: ["Cataract", "Glaucoma", "Diabetic Retinopathy"],
    },
    {
      name: "Dr. Neha Agarwal",       speciality: "Plastic Surgery",            departmentSlug: "plastic-surgery",
      degrees: "MBBS, MS, MCh (Plastic Surgery)", languages: ["English", "Hindi"],
      imageUrl: "https://i.pinimg.com/736x/c3/8e/de/c38ede58942b903f34297eb287e51524.jpg",
      fee: 1200, experience: "14+ Years", bmdcNumber: "68900", rating: 5.0, ratingCount: 5600,
      joinedDate: new Date("2018-03-02"),
      diseases: ["Reconstructive Surgery", "Burns", "Cosmetic Surgery"],
    },
    {
      name: "Dr. Tarun Chatterjee",   speciality: "Medical Oncology",           departmentSlug: "oncology",
      degrees: "MBBS, MD (Medicine), DM (Medical Oncology)", languages: ["English", "Bengali", "Hindi"],
      imageUrl: "https://i.pinimg.com/736x/30/f0/57/30f0570f5711c52346ed50f93e2f4e33.jpg",
      fee: 1150, experience: "15+ Years", bmdcNumber: "64211", rating: 4.9, ratingCount: 6800,
      joinedDate: new Date("2017-07-19"),
      diseases: ["Blood Cancer", "Solid Tumors", "Chemotherapy"],
    },
  ];

  for (const d of doctorsData) {
    const { departmentSlug, ...rest } = d;
    await prisma.doctor.upsert({
      where: { bmdcNumber: rest.bmdcNumber ?? undefined },
      update: {},
      create: {
        ...rest,
        experience: parseInt(String(rest.experience), 10) || null,
        departmentId: deptMap[departmentSlug],
      },
    }).catch(() => {}); // skip duplicate upsert issues
  }
  console.log("✅ Doctors seeded:", doctorsData.length);

  // ─── 4. Nurses ──────────────────────────────────────────────────────────────
  const nursesData = [
    { name: "Sister Anita Pillai",  role: "Head Nurse - ICU",           type: "NURSE", qualification: "B.Sc Nursing, Critical Care Certified",  languages: ["English", "Hindi", "Malayalam"], imageUrl: "https://i.pinimg.com/736x/03/35/37/033537ea8a2b3cd24fb3b816644bf5f9.jpg", experience: "14+ Years", joinedDate: new Date("2016-03-10"), rating: 4.9, ratingCount: 1240 },
    { name: "Sister Reena Thomas",  role: "Senior Nurse - Cardiology",   type: "NURSE", qualification: "B.Sc Nursing, Cardiac Care",              languages: ["English", "Hindi", "Tamil"],      imageUrl: "https://i.pinimg.com/736x/54/82/85/54828523ad4647bd03b95257b557579c.jpg", experience: "11+ Years", joinedDate: new Date("2018-07-22"), rating: 4.8, ratingCount: 980  },
    { name: "Sister Pooja Sharma",  role: "Staff Nurse - Pediatrics",    type: "NURSE", qualification: "GNM, Pediatric Nursing",                   languages: ["English", "Hindi", "Punjabi"],   imageUrl: "https://i.pinimg.com/1200x/69/d9/d5/69d9d5fb0658f36b2a50e427428c84af.jpg", experience: "8+ Years",  joinedDate: new Date("2020-01-05"), rating: 4.9, ratingCount: 760  },
    { name: "Sister Fatima Khan",   role: "Senior Nurse - Maternity",    type: "NURSE", qualification: "B.Sc Nursing, Midwifery",                  languages: ["English", "Hindi", "Urdu"],      imageUrl: "https://i.pinimg.com/736x/96/16/c2/9616c2a5ed4b6ace9fa3b5b7f9f6767d.jpg", experience: "12+ Years", joinedDate: new Date("2017-08-18"), rating: 5.0, ratingCount: 1410 },
    { name: "Sister Lakshmi Nair",  role: "Staff Nurse - Emergency",     type: "NURSE", qualification: "B.Sc Nursing, Trauma Care",                languages: ["English", "Hindi", "Malayalam"], imageUrl: "https://i.pinimg.com/1200x/eb/8b/ce/eb8bcec0e1526c6fd520c3c9a30b14e3.jpg", experience: "9+ Years",  joinedDate: new Date("2019-11-30"), rating: 4.7, ratingCount: 690  },
    { name: "Sister Deepa Verma",   role: "Staff Nurse - General Ward",  type: "NURSE", qualification: "GNM Nursing",                              languages: ["English", "Hindi"],               imageUrl: "https://i.pinimg.com/736x/b2/50/eb/b250eb1de2e1585bc12c71a8713f06f0.jpg", experience: "7+ Years",  joinedDate: new Date("2021-02-14"), rating: 4.8, ratingCount: 540  },
    { name: "Sister Joseph Mary",   role: "Senior Nurse - Oncology",     type: "NURSE", qualification: "B.Sc Nursing, Oncology Care",              languages: ["English", "Hindi", "Marathi"],  imageUrl: "https://i.pinimg.com/736x/27/40/fb/2740fb4abb4289c479a55de9d0596add.jpg", experience: "13+ Years", joinedDate: new Date("2016-06-09"), rating: 5.0, ratingCount: 1180 },
    { name: "Sister Kiran Bedi",    role: "Staff Nurse - Orthopedics",   type: "NURSE", qualification: "GNM, Ortho Care",                          languages: ["English", "Hindi", "Haryanvi"],  imageUrl: "https://i.pinimg.com/736x/da/6d/84/da6d84f3dfcbf1ec09115af05c064a49.jpg", experience: "6+ Years",  joinedDate: new Date("2021-09-25"), rating: 4.7, ratingCount: 430  },
  ];

  for (const n of nursesData) {
    await prisma.staff.create({ data: { ...n, experience: parseInt(String(n.experience), 10) || null } }).catch(() => {});
  }
  console.log("✅ Nurses seeded:", nursesData.length);

  // ─── 5. Support Staff ────────────────────────────────────────────────────────
  const peonsData = [
    { name: "Ramesh Yadav",   role: "Ward Attendant",    type: "SUPPORT_STAFF", department: "ICU",          languages: ["Hindi", "Bhojpuri"],  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", experience: "10+ Years", joinedDate: new Date("2016-04-12") },
    { name: "Suresh Patil",   role: "Support Staff",     type: "SUPPORT_STAFF", department: "General Ward", languages: ["Hindi", "Marathi"],    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", experience: "8+ Years",  joinedDate: new Date("2018-06-20") },
    { name: "Mahesh Kumar",   role: "Stretcher Bearer",  type: "SUPPORT_STAFF", department: "Emergency",    languages: ["Hindi", "English"],   imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", experience: "6+ Years",  joinedDate: new Date("2020-03-03") },
    { name: "Dinesh Gupta",   role: "Housekeeping Staff",type: "SUPPORT_STAFF", department: "OPD",          languages: ["Hindi"],              imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", experience: "12+ Years", joinedDate: new Date("2014-01-08") },
    { name: "Rajan Singh",    role: "Ward Attendant",    type: "SUPPORT_STAFF", department: "Cardiology",   languages: ["Hindi", "Punjabi"],   imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", experience: "9+ Years",  joinedDate: new Date("2017-09-16") },
    { name: "Vijay Sharma",   role: "Support Staff",     type: "SUPPORT_STAFF", department: "Pediatrics",   languages: ["Hindi", "English"],   imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", experience: "5+ Years",  joinedDate: new Date("2021-11-21") },
    { name: "Anil Mishra",    role: "Stretcher Bearer",  type: "SUPPORT_STAFF", department: "Orthopedics",  languages: ["Hindi", "Bhojpuri"],  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", experience: "7+ Years",  joinedDate: new Date("2019-05-11") },
    { name: "Prakash Jadhav", role: "Housekeeping Staff",type: "SUPPORT_STAFF", department: "General Ward", languages: ["Hindi", "Marathi"],   imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", experience: "11+ Years", joinedDate: new Date("2015-02-02") },
    { name: "Santosh Rao",    role: "Ward Attendant",    type: "SUPPORT_STAFF", department: "Maternity",    languages: ["Hindi", "Telugu"],    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", experience: "8+ Years",  joinedDate: new Date("2018-07-29") },
    { name: "Mukesh Verma",   role: "Support Staff",     type: "SUPPORT_STAFF", department: "Oncology",     languages: ["Hindi", "English"],   imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", experience: "6+ Years",  joinedDate: new Date("2020-10-17") },
  ];

  for (const p of peonsData) {
    await prisma.staff.create({ data: { ...p, experience: parseInt(String(p.experience), 10) || null } }).catch(() => {});
  }
  console.log("✅ Support staff seeded:", peonsData.length);

  console.log("\n🎉 Seeding complete!");
  console.log("   Admin login  → email: admin@pulselife.com  password: admin123");
  console.log("   Patient login→ email: patient@example.com  password: patient123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
