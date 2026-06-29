import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    HeartPulse, PhoneCall, User, Phone, ShieldAlert, Stethoscope,
    GraduationCap, Languages, Clock, BadgeIndianRupee, CheckCircle2, Check
} from "lucide-react";
import { Link } from 'react-router-dom';
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

const Navbar = () => (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <HeartPulse className="w-8 h-8 text-primary" />
                <span className="font-['Playfair_Display'] font-bold text-2xl tracking-tight text-foreground">Pulse Life Care Hospital</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 h-full">
                <Link to="/dashboard" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/doctors" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Doctors</Link>
                <Link to="/specialities" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Body Navigator</Link>
                <Link to="/health-checks" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Health Checks</Link>
            </nav>
            <div className="flex items-center gap-4">
                <a href="tel:911" className="flex items-center gap-3 bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-3.5 rounded-full font-black text-lg transition-all shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:-translate-y-1 cursor-pointer tracking-widest border-2 border-[#e11d48] hover:border-white/50">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                    <span>EMERGENCY</span>
                </a>
            </div>
        </div>
    </header>
);

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const initialState = {
    fullName: "", dob: "", age: "", gender: "", bloodGroup: "",
    phone: "", email: "", address: "", city: "", pincode: "",
    emergencyName: "", emergencyPhone: "",
    symptoms: "", allergies: "", history: "",
    department: "", doctorId: "", appointmentDate: "", appointmentTime: "",
};

// --- Sanitizers (input restrictions) ---
const sanitize = {
    digits: (v, max) => v.replace(/\D/g, "").slice(0, max),        // sirf numbers
    letters: (v) => v.replace(/[^a-zA-Z\s]/g, ""),                 // sirf letters + space
    name: (v) => v.replace(/[^a-zA-Z\s.]/g, ""),                   // letters, space, dot (Dr.)
};

// --- Reusable Field ---
const Field = ({ label, error, required, full, children }) => (
    <div className={cn("flex flex-col", full && "md:col-span-2")}>
        <label className="text-sm font-semibold text-slate-700 mb-2">
            {label} {required && <span className="text-[#e11d48]">*</span>}
        </label>
        {children}
        {error && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{error}</span>}
    </div>
);

const inputClass = (hasError) => cn(
    "w-full px-5 py-4 rounded-xl border bg-white text-slate-800 text-base outline-none transition-all",
    "focus:border-primary focus:ring-4 focus:ring-primary/10",
    hasError ? "border-[#e11d48]" : "border-slate-200 hover:border-slate-300"
);

const Section = ({ icon: Icon, title, subtitle, children, delay = 0 }) => (
    <BlurFade delay={delay}>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900">{title}</h2>
                    {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {children}
        </div>
    </BlurFade>
);

export default function PatientRegistrationForm() {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);

    React.useEffect(() => {
        api('/departments').then(data => setDepartments(data)).catch(console.error);
        api('/doctors').then(data => setDoctors(data)).catch(console.error);
    }, []);

    const filteredDoctors = useMemo(() => doctors.filter((d) => d.department?.slug === form.department || d.department?.id === form.department), [form.department, doctors]);
    const selectedDoctor = useMemo(() => doctors.find((d) => String(d.id) === String(form.doctorId)), [form.doctorId, doctors]);

    // Generic setter with optional sanitizer
    const setField = (name, rawValue, sanitizer) => {
        const value = sanitizer ? sanitizer(rawValue) : rawValue;
        setForm((prev) => {
            const next = { ...prev, [name]: value };
            if (name === "department") next.doctorId = "";
            if (name === "dob" && value) {
                const diff = Date.now() - new Date(value).getTime();
                next.age = Math.max(0, Math.floor(diff / 31557600000));
            }
            return next;
        });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleChange = (e) => setField(e.target.name, e.target.value);

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = "Full name is required";
        else if (form.fullName.trim().length < 3) e.fullName = "Name is too short";
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
        if (form.emergencyPhone && form.emergencyPhone === form.phone) e.emergencyPhone = "Emergency number must be different from your number";
        if (!form.symptoms.trim()) e.symptoms = "Please describe the reason for visit";
        if (!form.department) e.department = "Please select a department";
        if (!form.doctorId) e.doctorId = "Please select a doctor";
        if (!form.appointmentDate) e.appointmentDate = "Select an appointment date";
        if (!form.appointmentTime) e.appointmentTime = "Select an appointment time";
        return e;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        setServerError("");
        if (Object.keys(e).length === 0) {
            setLoading(true);
            try {
                await api('/appointments', {
                    method: 'POST',
                    body: JSON.stringify(form)
                });
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (err) {
                setServerError(err.message || "Failed to book appointment. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            const firstKey = Object.keys(e)[0];
            document.querySelector(`[name="${firstKey}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleReset = () => { setForm(initialState); setErrors({}); setSubmitted(false); };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#fafafa]">
                <Navbar />
                <div className="container mx-auto px-4 max-w-2xl py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center"
                        >
                            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                        </motion.div>
                        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-slate-900 mb-2">Appointment Confirmed!</h2>
                        <p className="text-slate-600 mb-8">Thank you, <strong>{form.fullName}</strong>. Your appointment is booked successfully.</p>
                        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 text-left space-y-3 mb-8">
                            <SummaryRow label="Doctor" value={selectedDoctor?.name} />
                            <SummaryRow label="Department" value={selectedDoctor?.department?.name || form.department} />
                            <SummaryRow label="Date & Time" value={`${form.appointmentDate} at ${form.appointmentTime}`} />
                            <SummaryRow label="Consultation Fee" value={`₹ ${selectedDoctor?.fee}`} accent />
                        </div>
                        <button onClick={handleReset} className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                            Book Another Appointment
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-primary/20 selection:text-primary">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-16 pb-14 bg-white overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white opacity-60"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <BlurFade>
                        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Patient <span className="text-primary italic">Registration</span>
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.1}>
                        <p className="text-base md:text-lg text-slate-600 font-medium max-w-xl mx-auto">
                            Fill in your details below to book an appointment with our specialists.
                        </p>
                    </BlurFade>
                </div>
            </section>

            <form onSubmit={handleSubmit} noValidate className="container mx-auto px-4 max-w-3xl py-16 flex flex-col gap-10">

                {/* Personal Details */}
                <Section icon={User} title="Personal Details" subtitle="Basic information about the patient">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                        <Field label="Full Name" error={errors.fullName} required>
                            <input name="fullName" value={form.fullName}
                                onChange={(e) => setField("fullName", e.target.value, sanitize.name)}
                                placeholder="John Doe" className={inputClass(errors.fullName)} />
                        </Field>
                        <Field label="Date of Birth" error={errors.dob} required>
                            <input type="date" name="dob" value={form.dob} onChange={handleChange} max={new Date().toISOString().split("T")[0]} className={inputClass(errors.dob)} />
                        </Field>
                        <Field label="Age">
                            <input name="age" value={form.age} readOnly placeholder="Auto-filled" className={cn(inputClass(false), "bg-slate-50 text-slate-500")} />
                        </Field>
                        <Field label="Gender" error={errors.gender} required>
                            <select name="gender" value={form.gender} onChange={handleChange} className={inputClass(errors.gender)}>
                                <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                            </select>
                        </Field>
                        <Field label="Blood Group" error={errors.bloodGroup} required full>
                            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className={inputClass(errors.bloodGroup)}>
                                <option value="">Select</option>
                                {BLOOD_GROUPS.map((b) => <option key={b}>{b}</option>)}
                            </select>
                        </Field>
                    </div>
                </Section>

                {/* Contact Details */}
                <Section icon={Phone} title="Contact Details" subtitle="How we can reach you" delay={0.05}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                        <Field label="Phone Number" error={errors.phone} required>
                            <input name="phone" type="tel" inputMode="numeric" value={form.phone}
                                onChange={(e) => setField("phone", e.target.value, (v) => sanitize.digits(v, 10))}
                                placeholder="9876543210" className={inputClass(errors.phone)} />
                        </Field>
                        <Field label="Email" error={errors.email}>
                            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass(errors.email)} />
                        </Field>
                        <Field label="City" error={errors.city} required>
                            <input name="city" value={form.city}
                                onChange={(e) => setField("city", e.target.value, sanitize.letters)}
                                placeholder="Mumbai" className={inputClass(errors.city)} />
                        </Field>
                        <Field label="Pincode" error={errors.pincode} required>
                            <input name="pincode" type="tel" inputMode="numeric" value={form.pincode}
                                onChange={(e) => setField("pincode", e.target.value, (v) => sanitize.digits(v, 6))}
                                placeholder="400001" className={inputClass(errors.pincode)} />
                        </Field>
                        <Field label="Address" error={errors.address} required full>
                            <textarea name="address" value={form.address} onChange={handleChange} rows={2} placeholder="House no, street, area" className={inputClass(errors.address)} />
                        </Field>
                    </div>
                </Section>

                {/* Emergency Contact */}
                <Section icon={ShieldAlert} title="Emergency Contact" subtitle="Person to contact in case of emergency" delay={0.05}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                        <Field label="Contact Name" error={errors.emergencyName} required>
                            <input name="emergencyName" value={form.emergencyName}
                                onChange={(e) => setField("emergencyName", e.target.value, sanitize.name)}
                                placeholder="Relative's name" className={inputClass(errors.emergencyName)} />
                        </Field>
                        <Field label="Contact Number" error={errors.emergencyPhone} required>
                            <input name="emergencyPhone" type="tel" inputMode="numeric" value={form.emergencyPhone}
                                onChange={(e) => setField("emergencyPhone", e.target.value, (v) => sanitize.digits(v, 10))}
                                placeholder="9876543210" className={inputClass(errors.emergencyPhone)} />
                        </Field>
                    </div>
                </Section>

                {/* Medical Information */}
                <Section icon={Stethoscope} title="Medical Information" subtitle="Help the doctor understand your condition" delay={0.05}>
                    <div className="grid grid-cols-1 gap-7">
                        <Field label="Reason for Visit / Symptoms" error={errors.symptoms} required>
                            <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={3} placeholder="Describe your symptoms" className={inputClass(errors.symptoms)} />
                        </Field>
                        <Field label="Known Allergies">
                            <input name="allergies" value={form.allergies} onChange={handleChange} placeholder="e.g. Penicillin, dust (optional)" className={inputClass(false)} />
                        </Field>
                        <Field label="Existing Medical History">
                            <textarea name="history" value={form.history} onChange={handleChange} rows={3} placeholder="Diabetes, BP, past surgeries etc. (optional)" className={inputClass(false)} />
                        </Field>
                    </div>
                </Section>

                {/* Appointment */}
                <Section icon={HeartPulse} title="Book Appointment" subtitle="Choose your department, doctor and slot" delay={0.05}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                        <Field label="Department" error={errors.department} required>
                            <select name="department" value={form.department} onChange={handleChange} className={inputClass(errors.department)}>
                                <option value="">Select Department</option>
                                {departments.map((d) => <option key={d.id} value={d.slug}>{d.name}</option>)}
                            </select>
                        </Field>
                        <Field label="Doctor" error={errors.doctorId} required>
                            <select name="doctorId" value={form.doctorId} onChange={handleChange} disabled={!form.department} className={cn(inputClass(errors.doctorId), !form.department && "bg-slate-50 cursor-not-allowed")}>
                                <option value="">{form.department ? "Select Doctor" : "Select department first"}</option>
                                {filteredDoctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </Field>
                        <Field label="Appointment Date" error={errors.appointmentDate} required>
                            <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className={inputClass(errors.appointmentDate)} />
                        </Field>
                        <Field label="Appointment Time" error={errors.appointmentTime} required>
                            <input type="time" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} className={inputClass(errors.appointmentTime)} />
                        </Field>

                        {selectedDoctor && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="md:col-span-2 mt-3 bg-blue-50/60 border border-blue-100 rounded-2xl p-6"
                            >
                                <h3 className="font-['Playfair_Display'] text-xl font-bold text-slate-900 mb-4">{selectedDoctor.name}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <DocInfo icon={<GraduationCap className="w-4 h-4 text-blue-600" />} label="Qualification" value={selectedDoctor.degrees} />
                                    <DocInfo icon={<Languages className="w-4 h-4 text-emerald-600" />} label="Languages" value={selectedDoctor.languages?.join(', ')} />
                                    <DocInfo icon={<Clock className="w-4 h-4 text-orange-600" />} label="Joined" value={new Date(selectedDoctor.joinedDate).toLocaleDateString()} />
                                    <DocInfo icon={<Stethoscope className="w-4 h-4 text-rose-600" />} label="Department" value={selectedDoctor.department?.name} />
                                    <div className="sm:col-span-2 flex items-center gap-2 pt-3 border-t border-blue-100">
                                        <BadgeIndianRupee className="w-5 h-5 text-blue-600" />
                                        <span className="font-semibold text-slate-700">Consultation Fee:</span>
                                        <span className="text-blue-600 font-bold text-lg">₹ {selectedDoctor.fee}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </Section>

                {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl flex items-center justify-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> {serverError}
                    </div>
                )}
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 pb-16">
                    <button type="button" onClick={handleReset} className="px-16 py-6 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-xl hover:bg-slate-50 transition-colors">
                        Reset Form
                    </button>
                    <button type="submit" disabled={loading} className="flex items-center justify-center gap-3 px-16 py-6 rounded-2xl bg-blue-600 text-white font-bold text-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 disabled:opacity-70">
                        {loading ? 'Processing...' : 'Book Appointment Now'} <Check className="w-7 h-7" />
                    </button>
                </div>

            </form>
        </div>
    );
}

const SummaryRow = ({ label, value, accent }) => (
    <div className="flex justify-between items-center">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className={cn("font-bold", accent ? "text-blue-600 text-lg" : "text-slate-800")}>{value}</span>
    </div>
);

const DocInfo = ({ icon, label, value }) => (
    <div className="flex items-start gap-2">
        <div className="mt-0.5">{icon}</div>
        <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-slate-700 font-medium leading-snug">{value}</p>
        </div>
    </div>
);
