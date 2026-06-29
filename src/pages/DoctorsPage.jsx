import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    HeartPulse, PhoneCall, Languages, GraduationCap, ArrowRight, Award,
    ArrowLeft, Star, Briefcase, BadgeCheck, CalendarDays, Stethoscope, Building2,
    User, Phone, CheckCircle2, Check, BadgeIndianRupee, Heart, ClipboardList
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { api } from '../lib/api';

const cn = (...args) => args.filter(Boolean).join(" ");

const BlurFade = ({ children, delay = 0, className, yOffset = 20 }) => (
    <motion.div
        initial={{ opacity: 0, y: yOffset, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);



const DOCTORS_DATA = [
    { id: 1, name: "Dr. Anjali Sharma", speciality: "Cardiothoracic Surgery", department: "Cardiology", degrees: "MBBS, MS, MCh (Cardio Thoracic Surgery)", languages: "English, Hindi, Marathi", image: "https://i.pinimg.com/736x/ad/6c/b0/ad6cb07e44a5e63ffc89d7723b181052.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 800, experience: "12+ Years", bmdc: "84220", joined: "26 Sep 2021", rating: 5.0, ratingCount: 5512 },
    { id: 2, name: "Dr. Rajesh Iyer", speciality: "Neurology", department: "Neurology", degrees: "MBBS, MD (Medicine), DM (Neurology)", languages: "English, Tamil, Hindi", image: "https://i.pinimg.com/736x/11/13/21/111321d846eef0721e0c2059f4b2509c.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 1000, experience: "15+ Years", bmdc: "78911", joined: "12 Mar 2019", rating: 4.9, ratingCount: 4820 },
    { id: 3, name: "Dr. Sneha Desai", speciality: "Pediatric Oncology", department: "Pediatrics", degrees: "MBBS, MD (Pediatrics), Fellowship in Oncology", languages: "English, Gujarati, Hindi", image: "https://i.pinimg.com/736x/26/40/9f/26409f5a30e3603e7819c84b2b3b5ad9.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 900, experience: "10+ Years", bmdc: "90233", joined: "05 Jan 2022", rating: 5.0, ratingCount: 3120 },
    { id: 4, name: "Dr. Vikram Singh", speciality: "Orthopaedics", department: "Orthopedics", degrees: "MBBS, MS (Orthopaedics), FRCS", languages: "English, Hindi, Punjabi", image: "https://i.pinimg.com/1200x/4c/ee/6c/4cee6c22feeb033e76f96c293c48bb0a.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 850, experience: "14+ Years", bmdc: "67455", joined: "18 Jul 2018", rating: 4.8, ratingCount: 6210 },
    { id: 5, name: "Dr. Meera Reddy", speciality: "Obstetrics & Gynecology", department: "Gynecology", degrees: "MBBS, MD (OBG), MRCOG", languages: "English, Telugu, Kannada", image: "https://i.pinimg.com/736x/4a/de/6d/4ade6d2a43e9bdf4cb20cf1dc05def79.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 950, experience: "11+ Years", bmdc: "81200", joined: "22 Nov 2020", rating: 4.9, ratingCount: 4015 },
    { id: 6, name: "Dr. Aditya Menon", speciality: "Gastroenterology", department: "Gastroenterology", degrees: "MBBS, MD, DM (Gastroenterology)", languages: "English, Malayalam, Hindi", image: "https://i.pinimg.com/1200x/76/27/0a/76270a3a64daf1fc55424eed6f2cf00a.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 1100, experience: "13+ Years", bmdc: "73622", joined: "09 Feb 2019", rating: 4.7, ratingCount: 2890 },
    { id: 7, name: "Dr. Kavita Banerjee", speciality: "Dermatology", department: "Dermatology", degrees: "MBBS, MD (Dermatology & Venereology)", languages: "English, Bengali, Hindi", image: "https://i.pinimg.com/736x/a0/2c/fb/a02cfb3c7982465c2da06d90bcf2dd02.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 700, experience: "9+ Years", bmdc: "88541", joined: "14 Aug 2021", rating: 5.0, ratingCount: 5340 },
    { id: 8, name: "Dr. Sanjay Patel", speciality: "Nephrology", department: "Nephrology", degrees: "MBBS, MD, DM (Nephrology), FASN", languages: "English, Gujarati, Hindi", image: "https://i.pinimg.com/736x/21/4b/23/214b230635d0c066a57db357c6902483.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 1050, experience: "16+ Years", bmdc: "65120", joined: "30 May 2017", rating: 4.8, ratingCount: 7100 },
    { id: 9, name: "Dr. Priya Kadam", speciality: "Endocrinology", department: "Endocrinology", degrees: "MBBS, MD (Medicine), DM (Endocrinology)", languages: "English, Marathi, Hindi", image: "https://i.pinimg.com/1200x/fe/0c/ba/fe0cba212ae98329e562f17b19c147d1.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 900, experience: "10+ Years", bmdc: "91002", joined: "03 Apr 2022", rating: 4.9, ratingCount: 2450 },
    { id: 10, name: "Dr. Arun Kumar", speciality: "Pulmonology", department: "Pulmonology", degrees: "MBBS, MD (Pulmonary Medicine), FCCP", languages: "English, Hindi, Bhojpuri", image: "https://i.pinimg.com/736x/7c/b6/e4/7cb6e4622063bc1fc06a9c3281f439d0.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 800, experience: "12+ Years", bmdc: "79330", joined: "20 Oct 2019", rating: 4.7, ratingCount: 3600 },
    { id: 11, name: "Dr. Ritu Verma", speciality: "Psychiatry", department: "Psychiatry", degrees: "MBBS, MD (Psychiatry), DPM", languages: "English, Hindi", image: "https://i.pinimg.com/1200x/a8/72/5a/a8725a458327278bd2c3aae0dd474ad8.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 950, experience: "8+ Years", bmdc: "93450", joined: "11 Jun 2022", rating: 5.0, ratingCount: 1980 },
    { id: 12, name: "Dr. Rohan Das", speciality: "Urology", department: "Urology", degrees: "MBBS, MS (Surgery), MCh (Urology)", languages: "English, Bengali, Hindi", image: "https://i.pinimg.com/1200x/82/fc/75/82fc75a6e1ffd447261b69c03c60372a.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 1000, experience: "13+ Years", bmdc: "70188", joined: "07 Dec 2018", rating: 4.8, ratingCount: 4500 },
    { id: 13, name: "Dr. Shweta Joshi", speciality: "Rheumatology", department: "Rheumatology", degrees: "MBBS, MD (Medicine), DM (Rheumatology)", languages: "English, Marathi, Hindi", image: "https://i.pinimg.com/736x/fb/5a/02/fb5a0294b403e8440aa687ea94ed316c.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 900, experience: "9+ Years", bmdc: "86700", joined: "16 Feb 2021", rating: 4.9, ratingCount: 2760 },
    { id: 14, name: "Dr. Manish Gupta", speciality: "Ophthalmology", department: "Ophthalmology", degrees: "MBBS, MS (Ophthalmology), DO", languages: "English, Hindi, Punjabi", image: "https://i.pinimg.com/1200x/eb/31/75/eb31750dbf64dd06d425d11774794a26.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 750, experience: "11+ Years", bmdc: "82345", joined: "28 Sep 2020", rating: 4.8, ratingCount: 3950 },
    { id: 15, name: "Dr. Neha Agarwal", speciality: "Plastic Surgery", department: "Plastic Surgery", degrees: "MBBS, MS, MCh (Plastic Surgery)", languages: "English, Hindi", image: "https://i.pinimg.com/736x/c3/8e/de/c38ede58942b903f34297eb287e51524.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 1200, experience: "14+ Years", bmdc: "68900", joined: "02 Mar 2018", rating: 5.0, ratingCount: 5600 },
    { id: 16, name: "Dr. Tarun Chatterjee", speciality: "Medical Oncology", department: "Oncology", degrees: "MBBS, MD (Medicine), DM (Medical Oncology)", languages: "English, Bengali, Hindi", image: "https://i.pinimg.com/736x/30/f0/57/30f0570f5711c52346ed50f93e2f4e33.jpg", workplace: "Pulse Life Care Hospital, Mumbai", fee: 1150, experience: "15+ Years", bmdc: "64211", joined: "19 Jul 2017", rating: 4.9, ratingCount: 6800 }
];



const StatPill = ({ icon, label, value, accent }) => (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
        <div className="flex items-center gap-2 text-slate-400">{icon}<span className="text-xs font-semibold uppercase tracking-wider">{label}</span></div>
        <p className={cn("text-xl font-bold", accent || "text-slate-900")}>{value}</p>
    </div>
);

// --- Doctor card (with Book) ---
const DoctorCard = ({ doctor, index, onSelect }) => (
    <BlurFade delay={0.05 * (index % 4)} className="group h-full">
        <div onClick={() => onSelect(doctor)} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2 cursor-pointer">
            <div className="relative h-64 overflow-hidden bg-slate-100">
                <img src={doctor.imageUrl || "https://i.pinimg.com/736x/ad/6c/b0/ad6cb07e44a5e63ffc89d7723b181052.jpg"} alt={doctor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"><Award className="w-5 h-5 text-primary" /></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                    <p className="text-primary font-semibold text-sm uppercase tracking-wider">{doctor.department?.name || 'Specialist'}</p>
                </div>
                <div className="flex flex-col gap-3 flex-grow justify-end">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-50 p-1.5 rounded-md text-blue-600"><GraduationCap className="w-4 h-4" /></div>
                        <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Qualifications</p><p className="text-sm font-medium text-slate-700 leading-snug">{doctor.degrees}</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-emerald-50 p-1.5 rounded-md text-emerald-600"><Languages className="w-4 h-4" /></div>
                        <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Languages</p><p className="text-sm font-medium text-slate-700">{doctor.languages?.join(', ')}</p></div>
                    </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onSelect(doctor); }} className="mt-6 w-full py-4 rounded-xl bg-slate-50 text-slate-700 font-bold text-base hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 group/btn border border-slate-100 hover:border-primary">
                    Book Appointment <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </BlurFade>
);

// --- Staff card (Nurse/Peon, clickable for profile, NO book) ---
const StaffCard = ({ person, index, onSelect, accent, BadgeIcon, primaryLabel, secondaryLabel, secondaryValue }) => (
    <BlurFade delay={0.05 * (index % 4)} className="group h-full">
        <div onClick={() => onSelect(person)} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-2 cursor-pointer">
            <div className="relative h-64 overflow-hidden bg-slate-100">
                <img src={person.imageUrl || "https://i.pinimg.com/736x/03/35/37/033537ea8a2b3cd24fb3b816644bf5f9.jpg"} alt={person.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"><BadgeIcon className={cn("w-5 h-5", accent)} /></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900 mb-1">{person.name}</h3>
                    <p className={cn("font-semibold text-sm uppercase tracking-wider", accent)}>{person.role}</p>
                </div>
                <div className="flex flex-col gap-3 flex-grow justify-end">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-50 p-1.5 rounded-md text-blue-600"><GraduationCap className="w-4 h-4" /></div>
                        <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{secondaryLabel}</p><p className="text-sm font-medium text-slate-700 leading-snug">{secondaryValue}</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-emerald-50 p-1.5 rounded-md text-emerald-600"><Languages className="w-4 h-4" /></div>
                        <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Languages</p><p className="text-sm font-medium text-slate-700">{person.languages?.join(', ')}</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-amber-50 p-1.5 rounded-md text-amber-600"><Briefcase className="w-4 h-4" /></div>
                        <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Experience</p><p className="text-sm font-medium text-slate-700">{person.experience} Years</p></div>
                    </div>
                </div>
            </div>
        </div>
    </BlurFade>
);

// --- BOOKING FORM (doctors only) ---
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const sanitize = { digits: (v, max) => v.replace(/\D/g, "").slice(0, max), letters: (v) => v.replace(/[^a-zA-Z\s]/g, ""), name: (v) => v.replace(/[^a-zA-Z\s.]/g, "") };
const inputClass = (hasError) => cn("w-full px-5 py-4 rounded-xl border bg-white text-slate-800 text-base outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10", hasError ? "border-[#e11d48]" : "border-slate-200 hover:border-slate-300");
const Field = ({ label, error, required, full, children }) => (
    <div className={cn("flex flex-col", full && "md:col-span-2")}>
        <label className="text-sm font-semibold text-slate-700 mb-2">{label} {required && <span className="text-[#e11d48]">*</span>}</label>
        {children}
        {error && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{error}</span>}
    </div>
);
const SectionCard = ({ icon: Icon, title, children }) => (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Icon className="w-5 h-5" /></div>
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-slate-900">{title}</h2>
        </div>
        {children}
    </div>
);

const BookingForm = ({ doctor, onClose }) => {
    const initialState = { fullName: "", dob: "", age: "", gender: "", bloodGroup: "", phone: "", email: "", address: "", city: "", pincode: "", emergencyName: "", emergencyPhone: "", symptoms: "", appointmentDate: "", appointmentTime: "" };
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const setField = (name, rawValue, sanitizer) => {
        const value = sanitizer ? sanitizer(rawValue) : rawValue;
        setForm((prev) => {
            const next = { ...prev, [name]: value };
            if (name === "dob" && value) { const diff = Date.now() - new Date(value).getTime(); next.age = Math.max(0, Math.floor(diff / 31557600000)); }
            return next;
        });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };
    const handleChange = (e) => setField(e.target.name, e.target.value);

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = "Full name is required"; else if (form.fullName.trim().length < 3) e.fullName = "Name is too short";
        if (!form.dob) e.dob = "Date of birth is required";
        if (!form.gender) e.gender = "Please select gender";
        if (!form.bloodGroup) e.bloodGroup = "Please select blood group";
        if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
        if (!form.address.trim()) e.address = "Address is required";
        if (!form.city.trim()) e.city = "City is required";
        if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit pincode";
        if (!form.emergencyName.trim()) e.emergencyName = "Emergency contact name required";
        if (!/^[6-9]\d{9}$/.test(form.emergencyPhone)) e.emergencyPhone = "Enter a valid 10-digit number";
        if (form.emergencyPhone && form.emergencyPhone === form.phone) e.emergencyPhone = "Must differ from your number";
        if (!form.symptoms.trim()) e.symptoms = "Please describe the reason for visit";
        if (!form.appointmentDate) e.appointmentDate = "Select an appointment date";
        if (!form.appointmentTime) e.appointmentTime = "Select an appointment time";
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length === 0) { setSubmitted(true); console.log("Booking:", { ...form, department: typeof doctor.department === 'object' ? doctor.department?.name : doctor.department, doctor: doctor.name, fee: doctor.fee }); }
        else { document.querySelector(`[name="${Object.keys(e)[0]}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }
    };

    return (
        <motion.div className="min-h-screen bg-[#fafafa]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <Navbar />
            <div className="container mx-auto px-4 max-w-3xl py-10">
                <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold mb-8 transition-colors"><ArrowLeft className="w-5 h-5" /> Back to Profile</button>
                {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 text-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-12 h-12 text-emerald-600" /></motion.div>
                        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-slate-900 mb-2">Appointment Confirmed!</h2>
                        <p className="text-slate-600 mb-8">Thank you, <strong>{form.fullName}</strong>. Your appointment with <strong>{doctor.name}</strong> is booked.</p>
                        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 text-left space-y-3 mb-8">
                            <div className="flex justify-between"><span className="text-slate-500 font-medium">Doctor</span><span className="font-bold text-slate-800">{doctor.name}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500 font-medium">Department</span><span className="font-bold text-slate-800">{typeof doctor.department === 'object' ? doctor.department?.name : doctor.department}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500 font-medium">Date & Time</span><span className="font-bold text-slate-800">{form.appointmentDate} at {form.appointmentTime}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500 font-medium">Consultation Fee</span><span className="font-bold text-blue-600 text-lg">₹ {doctor.fee}</span></div>
                        </div>
                        <button onClick={onClose} className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors">Done</button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex items-center gap-5">
                            <img src={doctor.imageUrl || "https://i.pinimg.com/736x/ad/6c/b0/ad6cb07e44a5e63ffc89d7723b181052.jpg"} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover bg-[#dbeafe] shrink-0" />
                            <div className="flex-grow">
                                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900">Book with {doctor.name}</h1>
                                <p className="text-primary font-semibold text-sm">{doctor.speciality}</p>
                                <div className="flex items-center gap-2 mt-1 text-slate-600 text-sm"><BadgeIndianRupee className="w-4 h-4 text-blue-600" />Consultation Fee: <span className="text-blue-600 font-bold">₹ {doctor.fee}</span></div>
                            </div>
                        </motion.div>
                        <SectionCard icon={Stethoscope} title="Department">
                            <div className="flex items-center gap-3 bg-blue-50/60 border border-blue-100 rounded-xl px-5 py-4"><CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" /><span className="text-slate-700 font-medium">Auto-selected: <span className="font-bold text-blue-600">{typeof doctor.department === 'object' ? doctor.department?.name : doctor.department}</span> <span className="text-slate-400 text-sm">(based on {doctor.name})</span></span></div>
                        </SectionCard>
                        <SectionCard icon={User} title="Patient Details">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                                <Field label="Full Name" error={errors.fullName} required><input name="fullName" value={form.fullName} onChange={(e) => setField("fullName", e.target.value, sanitize.name)} placeholder="John Doe" className={inputClass(errors.fullName)} /></Field>
                                <Field label="Date of Birth" error={errors.dob} required><input type="date" name="dob" value={form.dob} onChange={handleChange} max={new Date().toISOString().split("T")[0]} className={inputClass(errors.dob)} /></Field>
                                <Field label="Age"><input value={form.age} readOnly placeholder="Auto-filled" className={cn(inputClass(false), "bg-slate-50 text-slate-500")} /></Field>
                                <Field label="Gender" error={errors.gender} required><select name="gender" value={form.gender} onChange={handleChange} className={inputClass(errors.gender)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></Field>
                                <Field label="Blood Group" error={errors.bloodGroup} required full><select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className={inputClass(errors.bloodGroup)}><option value="">Select</option>{BLOOD_GROUPS.map((b) => <option key={b}>{b}</option>)}</select></Field>
                            </div>
                        </SectionCard>
                        <SectionCard icon={Phone} title="Contact Details">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                                <Field label="Phone Number" error={errors.phone} required><input name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={(e) => setField("phone", e.target.value, (v) => sanitize.digits(v, 10))} placeholder="9876543210" className={inputClass(errors.phone)} /></Field>
                                <Field label="Email" error={errors.email}><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass(errors.email)} /></Field>
                                <Field label="City" error={errors.city} required><input name="city" value={form.city} onChange={(e) => setField("city", e.target.value, sanitize.letters)} placeholder="Mumbai" className={inputClass(errors.city)} /></Field>
                                <Field label="Pincode" error={errors.pincode} required><input name="pincode" type="tel" inputMode="numeric" value={form.pincode} onChange={(e) => setField("pincode", e.target.value, (v) => sanitize.digits(v, 6))} placeholder="400001" className={inputClass(errors.pincode)} /></Field>
                                <Field label="Address" error={errors.address} required full><textarea name="address" value={form.address} onChange={handleChange} rows={2} placeholder="House no, street, area" className={inputClass(errors.address)} /></Field>
                                <Field label="Emergency Contact Name" error={errors.emergencyName} required><input name="emergencyName" value={form.emergencyName} onChange={(e) => setField("emergencyName", e.target.value, sanitize.name)} placeholder="Relative's name" className={inputClass(errors.emergencyName)} /></Field>
                                <Field label="Emergency Contact Number" error={errors.emergencyPhone} required><input name="emergencyPhone" type="tel" inputMode="numeric" value={form.emergencyPhone} onChange={(e) => setField("emergencyPhone", e.target.value, (v) => sanitize.digits(v, 10))} placeholder="9876543210" className={inputClass(errors.emergencyPhone)} /></Field>
                            </div>
                        </SectionCard>
                        <SectionCard icon={CalendarDays} title="Appointment">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                                <Field label="Appointment Date" error={errors.appointmentDate} required><input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className={inputClass(errors.appointmentDate)} /></Field>
                                <Field label="Appointment Time" error={errors.appointmentTime} required><input type="time" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} className={inputClass(errors.appointmentTime)} /></Field>
                                <Field label="Reason for Visit / Symptoms" error={errors.symptoms} required full><textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={3} placeholder="Describe your symptoms" className={inputClass(errors.symptoms)} /></Field>
                            </div>
                        </SectionCard>
                        <div className="flex justify-center pt-2 pb-16"><button type="submit" className="flex items-center justify-center gap-3 px-16 py-6 rounded-2xl bg-blue-600 text-white font-bold text-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">Confirm Appointment <Check className="w-7 h-7" /></button></div>
                    </form>
                )}
            </div>
        </motion.div>
    );
};

// --- Doctor full-screen profile (with Book) ---
const DoctorProfile = ({ doctor, onClose, onBook }) => (
    <motion.div className="min-h-screen bg-[#fafafa]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <Navbar />
        <div className="container mx-auto px-4 max-w-6xl py-10">
            <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold mb-8 transition-colors"><ArrowLeft className="w-5 h-5" /> Back to Doctors</button>
            <motion.div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 md:gap-10">
                    <div className="rounded-3xl bg-[#dbeafe] overflow-hidden aspect-square flex items-center justify-center"><img src={doctor.imageUrl || "https://i.pinimg.com/736x/ad/6c/b0/ad6cb07e44a5e63ffc89d7723b181052.jpg"} alt={doctor.name} className="w-full h-full object-cover" /></div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900 mb-1">{doctor.name}</h1>
                        <p className="text-slate-400 font-medium text-base mb-4">{doctor.degrees}</p>
                        <div className="flex items-start gap-3 mb-3"><Stethoscope className="w-5 h-5 text-primary mt-0.5 shrink-0" /><p className="text-slate-700 font-medium">Specialties in <span className="font-semibold">{doctor.speciality}</span></p></div>
                        <div className="flex items-start gap-3 mb-5"><Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /><p className="text-slate-700 font-medium">Working at: <span className="font-semibold">{doctor.workplace}</span></p></div>
                        <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100"><p className="text-slate-600 font-medium">Consultation Fee: <span className="text-blue-600 font-bold text-lg">₹ {doctor.fee}</span><span className="text-slate-400 text-sm"> (incl. GST) Per consultation</span></p></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <StatPill icon={<Briefcase className="w-4 h-4" />} label="Total Experience" value={`${doctor.experience || 0} Years`} />
                    <StatPill icon={<BadgeCheck className="w-4 h-4" />} label="BMDC Number" value={doctor.bmdcNumber} />
                    <StatPill icon={<CalendarDays className="w-4 h-4" />} label="Joined" value={doctor.joinedDate ? new Date(doctor.joinedDate).toLocaleDateString() : (doctor.joined || 'N/A')} />
                    <StatPill icon={<Star className="w-4 h-4" />} label="Total Rating" accent="text-amber-500" value={<span className="flex items-center gap-1"><Star className="w-5 h-5 fill-amber-400 text-amber-400" />{doctor.rating?.toFixed(2)}<span className="text-slate-400 text-sm font-medium">({doctor.ratingCount})</span></span>} />
                </div>
                <button onClick={onBook} className="mt-8 w-full py-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl transition-colors flex items-center justify-center gap-3 shadow-lg shadow-blue-600/25">Book Appointment Now <ArrowRight className="w-6 h-6" /></button>
            </motion.div>
        </div>
    </motion.div>
);

// --- Staff full-screen profile (Nurse/Peon, NO book) ---
const StaffProfile = ({ person, onClose, accentBg, infoLabel, infoValue }) => (
    <motion.div className="min-h-screen bg-[#fafafa]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <Navbar />
        <div className="container mx-auto px-4 max-w-6xl py-10">
            <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold mb-8 transition-colors"><ArrowLeft className="w-5 h-5" /> Back to Team</button>
            <motion.div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 md:gap-10">
                    <div className={cn("rounded-3xl overflow-hidden aspect-square flex items-center justify-center", accentBg)}><img src={person.imageUrl || "https://i.pinimg.com/736x/03/35/37/033537ea8a2b3cd24fb3b816644bf5f9.jpg"} alt={person.name} className="w-full h-full object-cover" /></div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900 mb-1">{person.name}</h1>
                        <p className="text-primary font-semibold text-base mb-4 uppercase tracking-wider">{person.role}</p>
                        <div className="flex items-start gap-3 mb-3"><GraduationCap className="w-5 h-5 text-primary mt-0.5 shrink-0" /><p className="text-slate-700 font-medium">{infoLabel}: <span className="font-semibold">{infoValue}</span></p></div>
                        <div className="flex items-start gap-3 mb-3"><Languages className="w-5 h-5 text-primary mt-0.5 shrink-0" /><p className="text-slate-700 font-medium">Languages: <span className="font-semibold">{Array.isArray(person.languages) ? person.languages.join(', ') : person.languages}</span></p></div>
                        <div className="flex items-start gap-3 mb-3"><Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /><p className="text-slate-700 font-medium">Working at: <span className="font-semibold">{person.workplace}</span></p></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <StatPill icon={<Briefcase className="w-4 h-4" />} label="Total Experience" value={person.experience} />
                    <StatPill icon={<CalendarDays className="w-4 h-4" />} label="Joined" value={person.joinedDate ? new Date(person.joinedDate).toLocaleDateString() : (person.joined || 'N/A')} />
                    {person.rating && <StatPill icon={<Star className="w-4 h-4" />} label="Patient Rating" accent="text-amber-500" value={<span className="flex items-center gap-1"><Star className="w-5 h-5 fill-amber-400 text-amber-400" />{person.rating.toFixed(2)}<span className="text-slate-400 text-sm font-medium">({person.ratingCount})</span></span>} />}
                </div>
            </motion.div>
        </div>
    </motion.div>
);

const SectionHeading = ({ title, highlight, subtitle }) => (
    <div className="text-center max-w-2xl mx-auto mt-8 mb-20">

        <BlurFade>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-slate-900 mb-5">
                {title} <span className="text-primary italic">{highlight}</span>
            </h2>
        </BlurFade>
        <BlurFade delay={0.1}>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">{subtitle}</p>
        </BlurFade>
    </div>
);

const DoctorsPage = () => {
    const location = useLocation();
    const [doctors, setDoctors] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [peons, setPeons] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookingDoctor, setBookingDoctor] = useState(null);
    const [selectedNurse, setSelectedNurse] = useState(null);
    const [selectedPeon, setSelectedPeon] = useState(null);

    useEffect(() => {
        api('/doctors').then(data => setDoctors(data));
        api('/staff?type=NURSE').then(data => setNurses(data));
        api('/staff?type=SUPPORT_STAFF').then(data => setPeons(data));
    }, []);

    useEffect(() => {
        const incoming = location.state?.doctor;
        if (incoming) { const full = doctors.find(d => d.id === incoming.id) || incoming; setBookingDoctor(full); }
    }, [location.state, doctors]);

    if (bookingDoctor) return <BookingForm doctor={bookingDoctor} onClose={() => setBookingDoctor(null)} />;
    if (selectedDoctor) return <DoctorProfile doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} onBook={() => setBookingDoctor(selectedDoctor)} />;
    if (selectedNurse) return <StaffProfile person={selectedNurse} onClose={() => setSelectedNurse(null)} accentBg="bg-rose-100" infoLabel="Qualification" infoValue={selectedNurse.qualification} />;
    if (selectedPeon) return <StaffProfile person={selectedPeon} onClose={() => setSelectedPeon(null)} accentBg="bg-slate-100" infoLabel="Department" infoValue={selectedPeon.department} />;

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-primary/20 selection:text-primary">
            <Navbar />

            {/* DOCTORS */}
            <section className="pt-24 pb-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <SectionHeading title="Meet Our" highlight="Medical Experts" subtitle="Highly qualified specialists dedicated to providing world-class, compassionate care across every speciality." />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        {doctors.map((doctor, idx) => (
                            <DoctorCard key={doctor.id} doctor={doctor} index={idx} onSelect={setSelectedDoctor} />
                        ))}
                    </div>
                </div>
            </section>

            {/* NURSES */}
            <section className="pt-24 pb-24 bg-white border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-7xl">
                    <SectionHeading title="Our Caring" highlight="Nursing Team" subtitle="The compassionate hands of our hospital — skilled nurses who care for patients day and night with warmth and dedication." />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {nurses.map((nurse, idx) => (
                            <StaffCard key={nurse.id} person={nurse} index={idx} onSelect={setSelectedNurse} accent="text-rose-500" BadgeIcon={Heart} secondaryLabel="Qualification" secondaryValue={nurse.qualification} />
                        ))}
                    </div>
                </div>
            </section>

            {/* PEONS */}
            <section className="pt-24 pb-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <SectionHeading title="Our Dedicated" highlight="Support Staff" subtitle="The backbone of our hospital — hard-working attendants and helpers who keep everything running smoothly behind the scenes." />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {peons.map((peon, idx) => (
                            <StaffCard key={peon.id} person={peon} index={idx} onSelect={setSelectedPeon} accent="text-slate-500" BadgeIcon={ClipboardList} secondaryLabel="Department" secondaryValue={peon.department} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DoctorsPage;
