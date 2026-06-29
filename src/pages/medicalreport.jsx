import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    HeartPulse, PhoneCall, User, Stethoscope, CalendarDays, Pill,
    FlaskConical, FileText, Printer, Download, Phone, MapPin,
    BadgeIndianRupee, Loader2, AlertCircle, FileX
} from "lucide-react";
import { Link } from 'react-router-dom';
import { fetchMedicalReport } from '../services/reportService';

// Safe cn fallback
const cn = (...args) => args.filter(Boolean).join(" ");

// ===== DEMO DATA (sirf demo ke liye — teammate USE_DEMO = false kar dega) =====
const USE_DEMO = true;
const DEMO_REPORT = {
    reportId: "PLC-2026-004821",
    issuedOn: "28 Jun 2026",
    hospital: { name: "Pulse Life Care Hospital", address: "12 Marine Drive, Mumbai 400001", phone: "+91 22 1234 5678" },
    patient: { name: "Rahul Verma", patientId: "PT-90231", age: 34, gender: "Male", bloodGroup: "B+", phone: "9876543210" },
    doctor: { name: "Dr. Anjali Sharma", department: "Cardiology", degrees: "MBBS, MS, MCh (Cardio Thoracic Surgery)" },
    visit: {
        date: "26 Jun 2026", type: "Consultation",
        symptoms: "Chest tightness, fatigue, shortness of breath on exertion",
        diagnosis: "Mild hypertension with occasional chest discomfort. ECG normal. Advised lifestyle changes and monitoring.",
    },
    vitals: [
        { label: "Blood Pressure", value: "138/88 mmHg" },
        { label: "Heart Rate", value: "82 bpm" },
        { label: "Temperature", value: "98.4 °F" },
        { label: "SpO₂", value: "98%" },
        { label: "Weight", value: "74 kg" },
        { label: "Height", value: "172 cm" },
    ],
    medicines: [
        { name: "Amlodipine 5mg", dosage: "1 tablet", freq: "Once daily (morning)", duration: "30 days" },
        { name: "Aspirin 75mg", dosage: "1 tablet", freq: "Once daily (after lunch)", duration: "30 days" },
        { name: "Atorvastatin 10mg", dosage: "1 tablet", freq: "Once at night", duration: "30 days" },
    ],
    labTests: [
        { name: "Lipid Profile", result: "Total Cholesterol 215 mg/dL", status: "Borderline" },
        { name: "Blood Sugar (Fasting)", result: "96 mg/dL", status: "Normal" },
        { name: "ECG", result: "Normal sinus rhythm", status: "Normal" },
    ],
    advice: "Reduce salt intake, exercise 30 mins daily, avoid smoking. Follow-up after 1 month with repeat BP readings.",
    followUp: "26 Jul 2026",
    billing: { consultation: 800, tests: 1200, medicines: 650 },
};

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl print:hidden">
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
                <Link to="/reports" className="text-sm font-semibold text-primary transition-colors border-b-[3px] border-primary h-full flex items-center">Reports</Link>
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

const ReportSection = ({ icon: Icon, title, children, delay = 0 }) => (
    <BlurFade delay={delay}>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 print:shadow-none print:border print:rounded-xl">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Icon className="w-5 h-5" /></div>
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-slate-900">{title}</h2>
            </div>
            {children}
        </div>
    </BlurFade>
);

const InfoRow = ({ label, value }) => (
    <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-slate-800 font-medium">{value || "—"}</p>
    </div>
);

// ===== State screens (loading / error / empty) =====
const CenterState = ({ icon: Icon, spin, title, subtitle, tone = "slate" }) => {
    const toneMap = { slate: "text-slate-400 bg-slate-100", rose: "text-rose-500 bg-rose-100", blue: "text-blue-600 bg-blue-100" };
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Navbar />
            <div className="container mx-auto px-4 max-w-2xl py-32 text-center">
                <div className={cn("w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center", toneMap[tone])}>
                    <Icon className={cn("w-10 h-10", spin && "animate-spin")} />
                </div>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900 mb-2">{title}</h2>
                <p className="text-slate-500">{subtitle}</p>
            </div>
        </div>
    );
};

export default function MedicalReport() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                if (USE_DEMO) {
                    // Demo mode: thoda delay taaki loading bhi dikhe
                    await new Promise((r) => setTimeout(r, 400));
                    if (active) setReport(DEMO_REPORT);
                } else {
                    // Real mode: teammate yahan reportId pass karega (URL param / props se)
                    const data = await fetchMedicalReport("latest");
                    if (active) setReport(data);
                }
            } catch (err) {
                if (active) setError(err.message || "Something went wrong");
            } finally {
                if (active) setLoading(false);
            }
        };
        load();
        return () => { active = false; };
    }, []);

    const handlePrint = () => window.print();

    if (loading) return <CenterState icon={Loader2} spin tone="blue" title="Loading Report..." subtitle="Please wait while we fetch the report." />;
    if (error) return <CenterState icon={AlertCircle} tone="rose" title="Could not load report" subtitle={error} />;
    if (!report) return <CenterState icon={FileX} title="No Report Found" subtitle="This report does not exist or has been removed." />;

    const r = report;
    const billTotal = (r.billing?.consultation || 0) + (r.billing?.tests || 0) + (r.billing?.medicines || 0);

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-primary/20 selection:text-primary print:bg-white">
            <Navbar />

            <section className="relative pt-14 pb-10 bg-white overflow-hidden border-b border-slate-100 print:hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white opacity-60"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <BlurFade><h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-slate-900 mb-2">Medical <span className="text-primary italic">Report</span></h1></BlurFade>
                        <BlurFade delay={0.1}><p className="text-slate-600 font-medium">Report ID: <span className="font-bold text-slate-800">{r.reportId}</span> · Issued {r.issuedOn}</p></BlurFade>
                    </div>
                    <BlurFade delay={0.15}>
                        <div className="flex gap-3">
                            <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"><Printer className="w-5 h-5" /> Print</button>
                            <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"><Download className="w-5 h-5" /> Download PDF</button>
                        </div>
                    </BlurFade>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-4xl py-12 flex flex-col gap-7 print:py-4 print:gap-4">

                <BlurFade>
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 print:shadow-none print:border">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><HeartPulse className="w-8 h-8" /></div>
                            <div>
                                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900">{r.hospital?.name}</h2>
                                <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-slate-500 mt-1">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {r.hospital?.address}</span>
                                    <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {r.hospital?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </BlurFade>

                <ReportSection icon={User} title="Patient & Doctor Details" delay={0.05}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                        <InfoRow label="Patient Name" value={r.patient?.name} />
                        <InfoRow label="Patient ID" value={r.patient?.patientId} />
                        <InfoRow label="Age / Gender" value={r.patient ? `${r.patient.age} yrs / ${r.patient.gender}` : ""} />
                        <InfoRow label="Blood Group" value={r.patient?.bloodGroup} />
                        <InfoRow label="Phone" value={r.patient?.phone} />
                        <InfoRow label="Visit Date" value={r.visit?.date} />
                        <InfoRow label="Consulting Doctor" value={r.doctor?.name} />
                        <InfoRow label="Department" value={r.doctor?.department} />
                        <InfoRow label="Qualification" value={r.doctor?.degrees} />
                    </div>
                </ReportSection>

                <ReportSection icon={Stethoscope} title="Vitals" delay={0.05}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(r.vitals || []).map((v) => (
                            <div key={v.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{v.label}</p>
                                <p className="text-lg font-bold text-slate-900">{v.value}</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>

                <ReportSection icon={FileText} title="Diagnosis & Symptoms" delay={0.05}>
                    <div className="flex flex-col gap-4">
                        <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reported Symptoms</p><p className="text-slate-700 font-medium">{r.visit?.symptoms}</p></div>
                        <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p><p className="text-slate-700 font-medium leading-relaxed">{r.visit?.diagnosis}</p></div>
                    </div>
                </ReportSection>

                <ReportSection icon={Pill} title="Prescribed Medicines" delay={0.05}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="text-slate-400 uppercase tracking-wider text-xs">
                                    <th className="pb-3 font-semibold">Medicine</th><th className="pb-3 font-semibold">Dosage</th>
                                    <th className="pb-3 font-semibold">Frequency</th><th className="pb-3 font-semibold">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {(r.medicines || []).map((m, i) => (
                                    <tr key={i} className="text-slate-700">
                                        <td className="py-3 font-semibold text-slate-900">{m.name}</td>
                                        <td className="py-3">{m.dosage}</td><td className="py-3">{m.freq}</td><td className="py-3">{m.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ReportSection>

                <ReportSection icon={FlaskConical} title="Lab Test Results" delay={0.05}>
                    <div className="flex flex-col gap-3">
                        {(r.labTests || []).map((t, i) => (
                            <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
                                <div><p className="font-semibold text-slate-900">{t.name}</p><p className="text-sm text-slate-500">{t.result}</p></div>
                                <span className={cn("px-3 py-1 rounded-full text-xs font-bold",
                                    t.status === "Normal" ? "bg-emerald-100 text-emerald-700" :
                                    t.status === "Borderline" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700")}>
                                    {t.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </ReportSection>

                <ReportSection icon={Stethoscope} title="Doctor's Advice & Follow-up" delay={0.05}>
                    <p className="text-slate-700 font-medium leading-relaxed mb-4">{r.advice}</p>
                    <div className="flex items-center gap-2 bg-blue-50/60 border border-blue-100 rounded-xl px-5 py-4">
                        <CalendarDays className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-slate-700 font-medium">Next Follow-up: <span className="font-bold text-blue-600">{r.followUp}</span></span>
                    </div>
                </ReportSection>

                <ReportSection icon={BadgeIndianRupee} title="Billing Summary" delay={0.05}>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between text-slate-700"><span>Consultation Fee</span><span className="font-semibold">₹ {r.billing?.consultation}</span></div>
                        <div className="flex justify-between text-slate-700"><span>Lab Tests</span><span className="font-semibold">₹ {r.billing?.tests}</span></div>
                        <div className="flex justify-between text-slate-700"><span>Medicines</span><span className="font-semibold">₹ {r.billing?.medicines}</span></div>
                        <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-100">
                            <span className="font-bold text-slate-900 text-lg">Total Amount</span>
                            <span className="font-bold text-blue-600 text-2xl">₹ {billTotal}</span>
                        </div>
                    </div>
                </ReportSection>

                <BlurFade delay={0.05}>
                    <div className="text-center text-sm text-slate-400 py-4">
                        <p>This is a computer-generated report. For queries, contact {r.hospital?.phone}.</p>
                        <p className="mt-1">© {r.hospital?.name} · Report ID {r.reportId}</p>
                    </div>
                </BlurFade>

                <div className="flex justify-center gap-4 pb-16 print:hidden">
                    <button onClick={handlePrint} className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"><Printer className="w-5 h-5" /> Print Report</button>
                    <button onClick={handlePrint} className="flex items-center gap-2 px-10 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"><Download className="w-5 h-5" /> Download PDF</button>
                </div>
            </div>
        </div>
    );
}
