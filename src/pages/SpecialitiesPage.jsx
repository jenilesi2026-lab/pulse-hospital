import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HeartPulse, PhoneCall, Brain, Bone, ArrowRight,
    Activity, ShieldCheck, Heart, User, CalendarCheck, X,
    Eye, Wind, Stethoscope, Droplet
} from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

// Safe cn fallback
const cn = (...args) => args.filter(Boolean).join(" ");

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
                <Link to="/specialities" className="text-sm font-semibold text-primary transition-colors border-b-[3px] border-primary h-full flex items-center">Body Navigator</Link>
                <Link to="/health-checks" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Health Checks</Link>
                <Link to="/reports" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Reports</Link>
            </nav>
            <div className="flex items-center gap-4">
                <button onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.href = '/login'; }} className="text-sm font-semibold text-muted-foreground hover:text-foreground hidden sm:block px-4 py-2 cursor-pointer transition-colors">Logout</button>
                <a href="tel:911" className="flex items-center gap-3 bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-3.5 rounded-full font-black text-lg transition-all shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:-translate-y-1 cursor-pointer tracking-widest border-2 border-[#e11d48] hover:border-white/50">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                    <span>EMERGENCY</span>
                </a>
            </div>
        </div>
    </header>
);

const SPECIALITIES = [
    { id: "neurology", name: "Brain & Mental Health", description: "Advanced care for brain, nervous system, and mental health.", icon: Brain, color: "blue", bgGlow: "bg-blue-500/20", borderGlow: "border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]", doctors: [{ id: 2, name: "Dr. Rajesh Iyer", spec: "Neurology" }, { id: 11, name: "Dr. Ritu Verma", spec: "Psychiatry" }] },
    { id: "ophthalmology", name: "Eye Care & Vision", description: "Expert eye care and vision correction surgeries.", icon: Eye, color: "cyan", bgGlow: "bg-cyan-500/20", borderGlow: "border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]", doctors: [{ id: 14, name: "Dr. Manish Gupta", spec: "Ophthalmology" }] },
    { id: "endocrinology", name: "Thyroid & Hormones", description: "Treatment for thyroid, diabetes, and hormonal imbalances.", icon: ShieldCheck, color: "purple", bgGlow: "bg-purple-500/20", borderGlow: "border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]", doctors: [{ id: 9, name: "Dr. Priya Kadam", spec: "Endocrinology" }] },
    { id: "pulmonology", name: "Lungs & Breathing", description: "Specialized care for lungs and respiratory conditions.", icon: Wind, color: "sky", bgGlow: "bg-sky-500/20", borderGlow: "border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]", doctors: [{ id: 10, name: "Dr. Arun Kumar", spec: "Pulmonology" }] },
    { id: "cardiology", name: "Heart Care", description: "Comprehensive care for heart and vascular diseases.", icon: Heart, color: "rose", bgGlow: "bg-rose-500/20", borderGlow: "border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]", doctors: [{ id: 1, name: "Dr. Anjali Sharma", spec: "Cardiothoracic Surgery" }] },
    { id: "gastroenterology", name: "Stomach & Digestion", description: "Digestive system, stomach, and liver disease treatments.", icon: Stethoscope, color: "orange", bgGlow: "bg-orange-500/20", borderGlow: "border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]", doctors: [{ id: 6, name: "Dr. Aditya Menon", spec: "Gastroenterology" }] },
    { id: "nephrology", name: "Kidneys & Urinary", description: "Kidney care and urinary tract treatments.", icon: Droplet, color: "yellow", bgGlow: "bg-yellow-500/20", borderGlow: "border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]", doctors: [{ id: 8, name: "Dr. Sanjay Patel", spec: "Nephrology" }, { id: 12, name: "Dr. Rohan Das", spec: "Urology" }] },
    { id: "gynaecology", name: "Women's Health", description: "Women's health, pregnancy, and reproductive care.", icon: User, color: "pink", bgGlow: "bg-pink-500/20", borderGlow: "border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]", doctors: [{ id: 5, name: "Dr. Meera Reddy", spec: "Obstetrics & Gynecology" }] },
    { id: "orthopaedics", name: "Bones & Joints", description: "Expert treatment for bone, joint, and muscle conditions.", icon: Bone, color: "emerald", bgGlow: "bg-emerald-500/20", borderGlow: "border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]", doctors: [{ id: 4, name: "Dr. Vikram Singh", spec: "Orthopaedics" }, { id: 13, name: "Dr. Shweta Joshi", spec: "Rheumatology" }] },
    { id: "dermatology", name: "Skin & Cosmetic", description: "Skin care, aesthetics, and reconstructive surgery.", icon: ShieldCheck, color: "amber", bgGlow: "bg-amber-500/20", borderGlow: "border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]", doctors: [{ id: 7, name: "Dr. Kavita Banerjee", spec: "Dermatology" }, { id: 15, name: "Dr. Neha Agarwal", spec: "Plastic Surgery" }] },
    { id: "oncology", name: "Cancer Care", description: "Comprehensive cancer care and pediatric oncology.", icon: Activity, color: "red", bgGlow: "bg-red-500/20", borderGlow: "border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]", doctors: [{ id: 3, name: "Dr. Sneha Desai", spec: "Pediatric Oncology" }, { id: 16, name: "Dr. Tarun Chatterjee", spec: "Medical Oncology" }] },
];

const InteractiveHologram = ({ onSelectSpeciality, activeSpeciality }) => (
    <div className="relative h-full flex flex-col items-center justify-start pt-12">
        <div className="relative h-full flex flex-col items-center justify-center animate-[float1_6s_ease-in-out_infinite]">
            <div className="relative h-full inline-block">
                <img src="/8k body.png" alt="High Res Human Body Model" className="h-full w-auto object-contain" />

                {/* Brain */}
                <div className="absolute top-[4%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('neurology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('neurology', true)}>
                    <div className={cn("w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-500/20 transition-all duration-300", activeSpeciality === 'neurology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Eyes */}
                <div className="absolute top-[8%] left-[51%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('ophthalmology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('ophthalmology', true)}>
                    <div className={cn("w-4 h-4 rounded-full border-2 border-cyan-500 bg-cyan-500/20 transition-all duration-300", activeSpeciality === 'ophthalmology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Neck */}
                <div className="absolute top-[16%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('endocrinology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('endocrinology', true)}>
                    <div className={cn("w-6 h-6 rounded-full border-2 border-purple-500 bg-purple-500/20 transition-all duration-300", activeSpeciality === 'endocrinology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Lungs */}
                <div className="absolute top-[26%] left-[43%] -translate-x-1/2 -translate-y-1/2 w-20 h-12 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('pulmonology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('pulmonology', true)}>
                    <div className={cn("w-14 h-8 rounded-full border-2 border-sky-500 bg-sky-500/20 transition-all duration-300", activeSpeciality === 'pulmonology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Heart */}
                <div className="absolute top-[26%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('cardiology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('cardiology', true)}>
                    <div className={cn("w-10 h-10 rounded-full border-2 border-rose-500 bg-rose-500/20 transition-all duration-300", activeSpeciality === 'cardiology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Stomach */}
                <div className="absolute top-[33%] left-[54%] -translate-x-1/2 -translate-y-1/2 w-20 h-16 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('gastroenterology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('gastroenterology', true)}>
                    <div className={cn("w-14 h-10 rounded-full border-2 border-orange-500 bg-orange-500/20 transition-all duration-300", activeSpeciality === 'gastroenterology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Kidneys L+R */}
                <div className="absolute top-[42%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('nephrology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('nephrology', true)}>
                    <div className={cn("w-6 h-6 rounded-full border-2 border-yellow-500 bg-yellow-500/20 transition-all duration-300", activeSpeciality === 'nephrology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                <div className="absolute top-[42%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('nephrology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('nephrology', true)}>
                    <div className={cn("w-6 h-6 rounded-full border-2 border-yellow-500 bg-yellow-500/20 transition-all duration-300", activeSpeciality === 'nephrology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Pelvis */}
                <div className="absolute top-[47%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-20 h-16 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('gynaecology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('gynaecology', true)}>
                    <div className={cn("w-14 h-10 rounded-full border-2 border-pink-500 bg-pink-500/20 transition-all duration-300", activeSpeciality === 'gynaecology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Arm/Skin */}
                <div className="absolute top-[48%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-16 h-24 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('dermatology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('dermatology', true)}>
                    <div className={cn("w-10 h-16 rounded-full border-2 border-amber-500 bg-amber-500/20 transition-all duration-300", activeSpeciality === 'dermatology' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Knees L+R */}
                <div className="absolute top-[75%] left-[39%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('orthopaedics')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('orthopaedics', true)}>
                    <div className={cn("w-8 h-8 rounded-full border-2 border-emerald-500 bg-emerald-500/20 transition-all duration-300", activeSpeciality === 'orthopaedics' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                <div className="absolute top-[75%] left-[62%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer group/spot z-20 flex items-center justify-center" onMouseEnter={() => onSelectSpeciality('orthopaedics')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('orthopaedics', true)}>
                    <div className={cn("w-8 h-8 rounded-full border-2 border-emerald-500 bg-emerald-500/20 transition-all duration-300", activeSpeciality === 'orthopaedics' ? "opacity-100 scale-125 animate-pulse" : "opacity-0 group-hover/spot:opacity-100 scale-100")}></div>
                </div>
                {/* Oncology */}
                <div className="absolute top-[30%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 cursor-pointer group/spot z-20 flex flex-col items-center justify-center" onMouseEnter={() => onSelectSpeciality('oncology')} onMouseLeave={() => onSelectSpeciality(null)} onClick={() => onSelectSpeciality('oncology', true)}>
                    <div className={cn("w-12 h-12 rounded-full border-2 border-red-500 bg-red-500/20 flex items-center justify-center transition-all duration-300", activeSpeciality === 'oncology' ? "opacity-100 scale-125 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]" : "opacity-0 group-hover/spot:opacity-100 scale-100")}>
                        <Activity className="w-5 h-5 text-red-500" />
                    </div>
                    <span className={cn("text-[10px] font-bold text-red-500 mt-2 transition-opacity", activeSpeciality === 'oncology' ? "opacity-100" : "opacity-0 group-hover/spot:opacity-100")}>CANCER CARE</span>
                </div>
            </div>
        </div>
    </div>
);

const SpecialitiesPage = () => {
    const navigate = useNavigate();
    const [activeSpeciality, setActiveSpeciality] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);

    // Book pe click -> Doctors page ke booking page pe bhejo, us doctor ke saath
    const handleBookAppointment = (doctor, specData) => {
        setSelectedSpeciality(null);
        navigate('/doctors', {
            state: {
                bookDoctorId: doctor.id,
                doctor: {
                    id: doctor.id,
                    name: doctor.name,
                    speciality: doctor.spec,
                    department: specData.name,
                },
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-slate-900 overflow-hidden selection:bg-primary/20 selection:text-primary relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white opacity-60 pointer-events-none"></div>
            <Navbar />

            <div className="w-full relative z-10 min-h-screen">
                <div className="sticky top-[100px] z-20 pointer-events-none w-full text-center px-4">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="bg-white/50 backdrop-blur-md border border-white/40 py-4 px-8 rounded-full shadow-sm inline-block mx-auto pointer-events-auto">
                        <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-slate-900 mb-2">Centers of <span className="text-primary italic">Excellence</span></h1>
                        <p className="text-slate-600 font-medium text-sm md:text-base">Scroll down to explore the anatomy and click to view doctors.</p>
                    </motion.div>
                </div>

                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

                <div className="relative w-full h-[250vh] flex justify-center pb-[20vh] z-10">
                    <InteractiveHologram activeSpeciality={activeSpeciality} onSelectSpeciality={(id, isClick) => { if (isClick) setSelectedSpeciality(id); else setActiveSpeciality(id); }} />
                </div>
            </div>

            {/* Centered Modal */}
            <AnimatePresence>
                {selectedSpeciality && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSpeciality(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[70] flex flex-col overflow-hidden max-h-[85vh] border border-white/20">
                            {(() => {
                                const specData = SPECIALITIES.find(s => s.id === selectedSpeciality);
                                if (!specData) return null;
                                const Icon = specData.icon;
                                return (
                                    <>
                                        <div className={`p-6 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r ${specData.bgGlow} to-white`}>
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-2xl shadow-sm"><Icon className={`w-8 h-8 text-${specData.color}-500`} /></div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900 font-['Playfair_Display']">{specData.name}</h2>
                                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Specialized Care Team</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setSelectedSpeciality(null)} className="p-2 text-slate-400 hover:text-slate-900 bg-white/50 hover:bg-white rounded-full transition-all shadow-sm"><X className="w-5 h-5" /></button>
                                        </div>

                                        <div className="p-6 flex-grow overflow-y-auto bg-slate-50/50">
                                            <div className="flex flex-col gap-5">
                                                {specData.doctors.map(doctor => (
                                                    <div key={doctor.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-red-500/30 hover:shadow-lg transition-all group">
                                                        <div className="flex items-center gap-4 mb-5">
                                                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center shadow-inner"><User className="w-7 h-7 text-slate-400" /></div>
                                                            <div className="flex-1">
                                                                <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{doctor.name}</h4>
                                                                <p className="text-sm text-slate-500 font-medium">{doctor.spec}</p>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => handleBookAppointment(doctor, specData)} className="w-full py-4 bg-primary hover:opacity-90 text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-red-500/30 hover:-translate-y-0.5 font-semibold text-sm">
                                                            <CalendarCheck className="w-4 h-4" />
                                                            <span>Book Appointment</span>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SpecialitiesPage;
