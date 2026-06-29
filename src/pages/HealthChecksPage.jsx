import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from "framer-motion";
import {
    HeartPulse, Activity, ShieldCheck, CheckCircle2, ArrowRight, Loader2,
    Sparkles, Users, Bone, PhoneCall, Droplet, Heart
} from "lucide-react";

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
                <Link to="/specialities" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Body Navigator</Link>
                <Link to="/health-checks" className="text-sm font-semibold text-primary transition-colors border-b-[3px] border-primary h-full flex items-center">Health Checks</Link>
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

const BlurFade = ({ children, className, duration = 0.4, delay = 0, yOffset = 6, inView = false, inViewMargin = "-50px", blur = "6px" }) => {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;
    const variants = {
        hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
        visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
    };
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }} className={className}>
            {children}
        </motion.div>
    );
};

const HealthChecksPage = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            // @BACKEND_TEAM: Replace this mock data with actual API call
            const mockData = [
                {
                    id: 'pkg_1', title: "Basic Health Check", subtitle: "Affordable starter screening", price: "699",
                    icon: "Activity", isPopular: false,
                    tests: ["Complete Blood Count (CBC)", "Blood Sugar (Fasting)", "Blood Pressure Check", "BMI Assessment", "Doctor Consultation"]
                },
                {
                    id: 'pkg_2', title: "Essential Health Check", subtitle: "Basic screening for overall wellness", price: "999",
                    icon: "ShieldCheck", isPopular: false,
                    tests: ["Complete Blood Count (CBC)", "Fasting Blood Sugar", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Doctor Consultation"]
                },
                {
                    id: 'pkg_3', title: "Master Health Checkup", subtitle: "Comprehensive full body evaluation", price: "1,499",
                    icon: "Sparkles", isPopular: true,
                    tests: ["40+ Parameters covered", "Advanced Lipid & Liver Profile", "Thyroid Profile (T3, T4, TSH)", "HbA1c (Diabetes Marker)", "Urine Routine", "ECG", "Specialist Consultation"]
                },
                {
                    id: 'pkg_4', title: "Diabetes Care", subtitle: "Complete diabetes monitoring", price: "899",
                    icon: "Droplet", isPopular: false,
                    tests: ["Fasting & PP Blood Sugar", "HbA1c (3-month average)", "Kidney Function Test", "Lipid Profile", "Urine Microalbumin", "Diet Consultation"]
                },
                {
                    id: 'pkg_5', title: "Heart Health", subtitle: "Cardiac risk screening", price: "1,299",
                    icon: "Heart", isPopular: false,
                    tests: ["ECG", "Lipid Profile", "Blood Pressure Monitoring", "Cardiac Risk Markers", "Blood Sugar", "Cardiologist Consultation"]
                },
                {
                    id: 'pkg_6', title: "Women's Wellness", subtitle: "Tailored screening for women", price: "1,899",
                    icon: "HeartPulse", isPopular: false,
                    tests: ["Complete Blood Count", "Thyroid Profile", "Iron Deficiency Profile", "Vitamin D & B12", "Pap Smear", "Gynecology Consultation"]
                },
            ];
            setTimeout(() => { setPackages(mockData); setIsLoading(false); }, 1200);
        };
        fetchPackages();
    }, []);

    const getIconComponent = (iconName, className) => ({
        Activity: <Activity className={className} />, Sparkles: <Sparkles className={className} />,
        HeartPulse: <HeartPulse className={className} />, Users: <Users className={className} />,
        Bone: <Bone className={className} />, ShieldCheck: <ShieldCheck className={className} />,
        Droplet: <Droplet className={className} />, Heart: <Heart className={className} />,
    }[iconName] || <Activity className={className} />);

    const handleBookPackage = (pkg) => {
        console.log(`Booking package: ${pkg.id}`);
        navigate('/health-check-payment', { state: { pkg } });
    };

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-primary/20 selection:text-primary">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 bg-white overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-60"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <BlurFade>
                        <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                            Preventive <span className="text-primary italic">Health Checks</span>
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.1}>
                        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ 
                        </p>
                    </BlurFade>
                </div>
            </section>

            {/* Packages Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px]">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <p className="text-slate-500 font-medium animate-pulse">Fetching latest packages...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
                            {packages.map((pkg, index) => (
                                <BlurFade key={pkg.id} delay={0.08 * (index % 3)} className="h-full">
                                    <div className={cn(
                                        "relative h-full flex flex-col bg-white rounded-3xl p-8 transition-all duration-300",
                                        pkg.isPopular
                                            ? "border-2 border-primary shadow-2xl xl:scale-105 z-10 ring-4 ring-primary/10"
                                            : "border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-300"
                                    )}>
                                        {pkg.isPopular && (
                                            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                                <div className="bg-primary text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3" /> Most Popular
                                                </div>
                                            </div>
                                        )}

                                        <div className="mb-8">
                                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", pkg.isPopular ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-600")}>
                                                {getIconComponent(pkg.icon, "w-7 h-7")}
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-['Playfair_Display']">{pkg.title}</h3>
                                            <p className="text-sm text-slate-500 font-medium h-10">{pkg.subtitle}</p>
                                        </div>

                                        <div className="mb-8">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-bold text-slate-900">₹</span>
                                                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{pkg.price}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-semibold">Taxes included</p>
                                        </div>

                                        <div className="flex-grow flex flex-col gap-4 mb-8">
                                            {pkg.tests.map((test, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className={cn("w-5 h-5 shrink-0 mt-0.5", pkg.isPopular ? "text-primary" : "text-emerald-500")} />
                                                    <span className="text-sm text-slate-700 font-medium leading-tight">{test}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* TALLER button */}
                                        <button
                                            onClick={() => handleBookPackage(pkg)}
                                            className={cn(
                                                "w-full py-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 group shadow-md hover:-translate-y-1 mt-auto",
                                                pkg.isPopular
                                                    ? "bg-primary text-white hover:opacity-90 hover:shadow-red-500/30"
                                                    : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/20"
                                            )}
                                        >
                                            Book This Package
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </BlurFade>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HealthChecksPage;
