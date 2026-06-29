import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  HeartPulse, Brain, Bone, Activity, Stethoscope,
  PhoneCall, CalendarCheck, ShieldCheck, Clock, Users, ArrowRight, Star, Heart,
  Ambulance, MapPin, AlertTriangle, X, Phone
} from "lucide-react";
import Navbar from '../components/Navbar';

// Safe cn fallback
const cn = (...args) => args.filter(Boolean).join(" ");

const BlurFade = ({ children, className, variant, duration = 0.4, delay = 0, yOffset = 6, inView = false, inViewMargin = "-50px", blur = "6px" }) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={combinedVariants} transition={{ duration, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
};

const GradientBackground = () => (
    <>
        <style>{` @keyframes float1 { 0% { transform: translate(0, 0); } 50% { transform: translate(-15px, 15px); } 100% { transform: translate(0, 0); } } @keyframes float2 { 0% { transform: translate(0, 0); } 50% { transform: translate(15px, -15px); } 100% { transform: translate(0, 0); } } `}</style>
        <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full bg-[#fdfdfd] -z-10">
            <defs>
                <filter id="blurLg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="80"/></filter>
                <filter id="blurMd" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
                <filter id="blurXl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="100"/></filter>
            </defs>
            <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
                <ellipse cx="850" cy="450" rx="400" ry="350" fill="#ffb48f" filter="url(#blurXl)" opacity="0.4"/>
                <ellipse cx="700" cy="100" rx="300" ry="250" fill="#fff5cc" filter="url(#blurLg)" opacity="0.6"/>
            </g>
            <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
                <ellipse cx="150" cy="650" rx="350" ry="300" fill="#8b9ba8" filter="url(#blurXl)" opacity="0.45"/>
                <circle cx="300" cy="300" r="250" fill="#e2e8f0" filter="url(#blurMd)" opacity="0.5"/>
            </g>
        </svg>
    </>
);

// ====== EMERGENCY (FULL SCREEN) ======
const EmergencyModal = ({ onClose }) => {
    const services = [
        { icon: Ambulance, label: "Call Ambulance", sub: "Instant pickup • 24x7", tel: "102", tone: "bg-rose-500" },
        { icon: PhoneCall, label: "Emergency Helpline", sub: "Hospital direct line", tel: "+911811234567", tone: "bg-[#e11d48]" },
        { icon: HeartPulse, label: "Cardiac Emergency", sub: "Heart attack / chest pain", tel: "+911811234568", tone: "bg-red-600" },
        { icon: Brain, label: "Stroke / Trauma", sub: "Brain stroke / accident", tel: "+911811234569", tone: "bg-purple-600" },
    ];
    const firstAid = [
        "Stay calm and keep the patient still.",
        "For chest pain: make them sit, loosen tight clothes.",
        "For bleeding: apply firm pressure with a clean cloth.",
        "Do NOT give food or water to an unconscious person.",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] bg-[#fafafa] overflow-y-auto"
        >
            {/* Header bar */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#e11d48] to-rose-600 text-white">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse"><AlertTriangle className="w-7 h-7" /></div>
                        <div>
                            <h2 className="font-['Playfair_Display'] text-2xl font-bold">Emergency Help</h2>
                            <p className="text-white/80 text-sm font-medium">Tap any option to call instantly</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 font-semibold transition-colors">
                        <X className="w-5 h-5" /> Close
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl py-10 flex flex-col gap-6">
                {/* Service buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((s) => {
                        const Icon = s.icon;
                        return (
                            <a key={s.label} href={`tel:${s.tel}`} className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                                <div className={cn("w-14 h-14 rounded-2xl text-white flex items-center justify-center shrink-0", s.tone)}><Icon className="w-7 h-7" /></div>
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{s.label}</p>
                                    <p className="text-sm text-slate-500">{s.sub}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Nearest hospital */}
                <a href="https://www.google.com/maps/search/hospital+near+me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-6 hover:bg-blue-100 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0"><MapPin className="w-7 h-7" /></div>
                    <div>
                        <p className="font-bold text-slate-900">Find Nearest Hospital</p>
                        <p className="text-sm text-slate-500">Pulse Life Care • Marine Drive, Mumbai</p>
                    </div>
                </a>

                {/* First aid */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <p className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg"><ShieldCheck className="w-6 h-6 text-emerald-500" /> While help arrives</p>
                    <ul className="flex flex-col gap-3">
                        {firstAid.map((tip, i) => (
                            <li key={i} className="text-slate-600 flex items-start gap-2 leading-relaxed">
                                <span className="text-primary font-bold shrink-0">•</span> {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Big national emergency */}
                <a href="tel:112" className="flex items-center justify-center gap-3 bg-[#e11d48] hover:bg-[#be123c] text-white py-6 rounded-2xl font-black text-xl tracking-wide transition-all shadow-lg shadow-rose-500/30">
                    <PhoneCall className="w-6 h-6 animate-pulse" /> CALL NATIONAL EMERGENCY (112)
                </a>
                {/* @BACKEND_TEAM: numbers ko hospital ke real emergency numbers se replace karna */}
            </div>
        </motion.div>
    );
};



const HeroSection = ({ onEmergency }) => (
    <section className="relative w-full overflow-hidden min-h-[600px] flex items-center justify-center pt-10 pb-20">
        <GradientBackground />
        <div className="container mx-auto px-4 z-10 w-full">
            <div className="flex flex-col items-center text-center gap-8 w-full mx-auto">
                <BlurFade delay={0.1} inView>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                        <Star className="w-4 h-4" /> <span>World Class Healthcare in Your City</span>
                    </div>
                </BlurFade>
                <BlurFade delay={0.2} inView>
                    <h1 className="font-['Playfair_Display'] font-medium text-5xl sm:text-6xl md:text-7xl tracking-tight text-foreground leading-tight">
                        Advanced Care.<br/><span className="italic text-primary">Compassionate</span> Touch.
                    </h1>
                </BlurFade>
                <BlurFade delay={0.3} inView>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Schedule your appointment online with our expert doctors. Experience the finest medical infrastructure and ethical patient care.
                    </p>
                </BlurFade>
                <BlurFade delay={0.4} inView className="w-full mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/book" className="w-full sm:w-auto min-w-[220px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-14 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CalendarCheck className="w-5 h-5" /> <span>Book Now</span>
                    </Link>
                    {/* Emergency button -> opens modal (working) */}
                    <button onClick={onEmergency} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#e11d48] hover:bg-[#be123c] text-white px-10 py-4 rounded-full font-black text-lg transition-all shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:-translate-y-1 cursor-pointer tracking-widest border-2 border-[#e11d48] hover:border-white/50">
                        <PhoneCall className="w-5 h-5 animate-pulse" /> <span>EMERGENCY</span>
                    </button>
                </BlurFade>
            </div>
        </div>
    </section>
);

const DoctorsSection = () => {
    const doctors = [
        { name: "Dr. Anjali Sharma", spec: "Medical Oncology", img: "https://i.pinimg.com/736x/ad/6c/b0/ad6cb07e44a5e63ffc89d7723b181052.jpg" },
        { name: "Dr. Rajesh Iyer", spec: "Neurosurgery", img: "https://i.pinimg.com/736x/11/13/21/111321d846eef0721e0c2059f4b2509c.jpg" },
        { name: "Dr. Sneha Desai", spec: "Cardiology", img: "https://i.pinimg.com/736x/26/40/9f/26409f5a30e3603e7819c84b2b3b5ad9.jpg" },
    ];
    return (
        <section className="bg-slate-50/50" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-6xl mx-auto mb-20">
                    <BlurFade inView className="w-full flex flex-col items-center">
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium tracking-tight mb-4 text-center">Meet Our <span className="text-primary italic">Experts</span></h2>
                        <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto"></div>
                    </BlurFade>
                    <BlurFade delay={0.2} inView className="mt-8">
                        <Link to="/doctors" className="flex items-center gap-3 text-lg md:text-xl font-bold text-primary hover:gap-5 transition-all mx-auto px-8 py-4 rounded-full hover:bg-primary/10 w-fit">View All Doctors <ArrowRight className="w-6 h-6" /></Link>
                    </BlurFade>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {doctors.map((doc, i) => (
                        <BlurFade key={i} delay={0.1 * i} inView>
                            <div className="group cursor-pointer">
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-slate-100">
                                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="text-center"><h3 className="text-xl font-semibold mb-1">{doc.name}</h3><p className="text-muted-foreground">{doc.spec}</p></div>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
};

const OurValuesSection = () => {
    const values = [
        { title: "Patient Centricity", icon: <Heart className="w-10 h-10 text-purple-400" />, points: ["Commit to 'best outcomes and experience' for our patients", "Treat patients and their caregivers with compassion, care", "Our patients' needs will come first"] },
        { title: "Integrity", icon: <ShieldCheck className="w-10 h-10 text-rose-400" />, points: ["Be principled, open and honest", "Model and live our 'Values'", "Demonstrate moral courage to speak up and do the right things"] },
        { title: "Teamwork", icon: <Users className="w-10 h-10 text-indigo-400" />, points: ["Proactively support each other and operate as one team", "Respect and value people at all levels", "Demonstrate moral courage to speak up"] },
        { title: "Ownership", icon: <Activity className="w-10 h-10 text-amber-500" />, points: ["Be responsible and take pride in our actions", "Take initiative and go beyond the call of duty", "Deliver commitment and agreement made."] },
        { title: "Innovation", icon: <Brain className="w-10 h-10 text-teal-500" />, points: ["Continuously improve and innovate to exceed expectations", "Adopt a 'can-do' attitude", "Challenge ourselves to do things differently."] },
    ];
    return (
        <section className="bg-slate-50/30" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col items-center text-center mb-16">
                    <BlurFade inView className="w-full flex flex-col items-center">
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium tracking-tight mb-4 text-center text-foreground/90">Our Values</h2>
                        <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto"></div>
                    </BlurFade>
                </div>
                <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
                    {values.map((val, i) => (
                        <BlurFade key={i} delay={0.1 * i} inView className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] min-w-[320px]">
                            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex gap-4">
                                <div className="shrink-0 pt-1"><div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">{val.icon}</div></div>
                                <div>
                                    <h3 className="text-xl font-medium mb-3 text-slate-800">{val.title}</h3>
                                    <ul className="space-y-3">
                                        {val.points.map((pt, j) => (
                                            <li key={j} className="text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                                                <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyChooseUs = () => (
    <section className="bg-background" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <BlurFade inView>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">Excellence in <br/><span className="text-primary italic">Every Detail.</span></h2>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">We pledge to provide tailored, comprehensive care, positively impacting numerous lives each year with compassionate professionals and easy accessibility.</p>
                    <div className="space-y-8">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-1"><Stethoscope className="w-5 h-5 text-primary" /></div>
                            <div><h4 className="font-semibold text-lg mb-1">Clinical Excellence</h4><p className="text-muted-foreground text-sm leading-relaxed">Evidence-based care through innovation and advanced technology.</p></div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-1"><Heart className="w-5 h-5 text-primary" /></div>
                            <div><h4 className="font-semibold text-lg mb-1">Holistic Patient Care</h4><p className="text-muted-foreground text-sm leading-relaxed">Compassionate, personalized approach leading to superior patient trust.</p></div>
                        </div>
                    </div>
                </BlurFade>
                <BlurFade delay={0.2} inView>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl transform translate-x-4 translate-y-4"></div>
                        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" alt="Hospital Interior" className="rounded-3xl relative z-10 shadow-2xl object-cover aspect-square" />
                    </div>
                </BlurFade>
            </div>
        </div>
    </section>
);

const NetworkMapSection = () => (
    <section className="bg-slate-50/50" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-5/12 text-center md:text-left">
                    <BlurFade inView>
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground/90">
                            12 states, <span className="text-[#e85d45]">36 hospitals</span><br />
                            <span className="text-[#e85d45] text-3xl md:text-4xl">1 vision </span><span className="font-bold text-foreground">1 mission</span>
                        </h2>
                    </BlurFade>
                </div>
                <div className="md:w-7/12 relative flex items-center justify-center">
                    <BlurFade delay={0.2} inView className="relative w-full max-w-[800px]">
                        <img src="/map.png" alt="Hospital Network Map" className="w-full h-auto object-contain drop-shadow-xl" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                        <div style={{ display: 'none' }} className="w-full aspect-[4/3] bg-slate-100 rounded-3xl flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-300 drop-shadow-sm">
                            <p className="text-slate-600 font-semibold text-lg mb-2">Photo yahan nahi mili! 😅</p>
                            <p className="text-slate-500 text-sm">Apni photo ko <b>public</b> folder me <b>map.png</b> ke naam se save karo.</p>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </div>
    </section>
);

export default function DashboardPage() {
    const [emergencyOpen, setEmergencyOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                <HeroSection onEmergency={() => setEmergencyOpen(true)} />
                <DoctorsSection />
                <WhyChooseUs />
                <NetworkMapSection />
                <OurValuesSection />
            </main>

            <footer className="bg-foreground text-background py-12 text-center">
                <p className="opacity-60">&copy; 2026 Pulse Life Care Hospital. All rights reserved.</p>
            </footer>

            {/* Emergency Modal */}
            <AnimatePresence>
                {emergencyOpen && <EmergencyModal onClose={() => setEmergencyOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}
