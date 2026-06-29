import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    HeartPulse, PhoneCall, MapPin, Building2, ArrowLeft, ArrowRight,
    Phone, Clock, Navigation, Mail
} from "lucide-react";
import { Link } from 'react-router-dom';

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

// ===== Branches grouped by state =====
// @BACKEND_TEAM: addresses/phones API se aa sakte hain. Abhi sample address rakhe hain.
const STATES = [
    {
        state: "Himachal Pradesh",
        branches: [
            { id: "kangra", city: "Kangra", address: "NH-154, Civil Lines, Kangra, Himachal Pradesh 176001", phone: "+91 1892 123456" },
        ],
    },
    {
        state: "Punjab",
        branches: [
            { id: "mohali", city: "Mohali", address: "Sector 67, Mohali, Punjab 160062", phone: "+91 172 1234567" },
            { id: "ludhiana-mall", city: "Ludhiana - Mall Road", address: "Mall Road, Ludhiana, Punjab 141001", phone: "+91 161 1234567" },
            { id: "ludhiana-chd", city: "Ludhiana - Chandigarh Road", address: "Chandigarh Road, Ludhiana, Punjab 141008", phone: "+91 161 7654321" },
            { id: "amritsar", city: "Amritsar", address: "GT Road, Amritsar, Punjab 143001", phone: "+91 183 1234567" },
            { id: "jalandhar", city: "Jalandhar", address: "Cool Road, Jalandhar, Punjab 144001", phone: "+91 181 1234567" },
        ],
    },
    {
        state: "Rajasthan",
        branches: [
            { id: "jaipur", city: "Jaipur", address: "JLN Marg, Malviya Nagar, Jaipur, Rajasthan 302017", phone: "+91 141 1234567" },
        ],
    },
    {
        state: "Maharashtra",
        branches: [
            { id: "mulund", city: "Mumbai - Mulund", address: "LBS Marg, Mulund West, Mumbai, Maharashtra 400080", phone: "+91 22 11112222" },
            { id: "vashi", city: "Mumbai - Vashi", address: "Sector 17, Vashi, Navi Mumbai, Maharashtra 400703", phone: "+91 22 22223333" },
            { id: "kalyan", city: "Mumbai - Kalyan", address: "Station Road, Kalyan West, Maharashtra 421301", phone: "+91 251 1234567" },
            { id: "mahim", city: "Mumbai - Mahim", address: "Cadell Road, Mahim, Mumbai, Maharashtra 400016", phone: "+91 22 33334444" },
        ],
    },
    {
        state: "National Capital Region (Delhi NCR)",
        branches: [
            { id: "gurgaon", city: "Gurgaon", address: "Golf Course Road, Gurgaon, Haryana 122002", phone: "+91 124 1234567" },
            { id: "gurgaon-adayu", city: "Gurgaon (Adayu)", address: "Sector 56, Gurgaon, Haryana 122011", phone: "+91 124 7654321" },
            { id: "manesar", city: "Manesar", address: "IMT Manesar, Gurgaon, Haryana 122051", phone: "+91 124 9876543" },
            { id: "okhla", city: "Okhla", address: "Okhla Industrial Area, New Delhi 110020", phone: "+91 11 11112222" },
            { id: "vasant-kunj", city: "Vasant Kunj", address: "Nelson Mandela Marg, Vasant Kunj, New Delhi 110070", phone: "+91 11 22223333" },
            { id: "shalimar-bagh", city: "Shalimar Bagh", address: "Shalimar Bagh, New Delhi 110088", phone: "+91 11 33334444" },
            { id: "gk2", city: "Greater Kailash II", address: "Greater Kailash II, New Delhi 110048", phone: "+91 11 44445555" },
            { id: "nehru-place", city: "Nehru Place", address: "Nehru Place, New Delhi 110019", phone: "+91 11 55556666" },
            { id: "defence-colony", city: "Defence Colony", address: "Defence Colony, New Delhi 110024", phone: "+91 11 66667777" },
            { id: "noida", city: "Noida", address: "Sector 62, Noida, Uttar Pradesh 201309", phone: "+91 120 1234567" },
            { id: "greater-noida", city: "Greater Noida", address: "Knowledge Park, Greater Noida, Uttar Pradesh 201310", phone: "+91 120 7654321" },
            { id: "faridabad", city: "Faridabad", address: "Sector 16, Faridabad, Haryana 121002", phone: "+91 129 1234567" },
        ],
    },
    {
        state: "West Bengal",
        branches: [
            { id: "anandapur", city: "Kolkata - Anandapur", address: "EM Bypass, Anandapur, Kolkata, West Bengal 700107", phone: "+91 33 11112222" },
            { id: "rash-behari", city: "Kolkata - Rash Behari", address: "Rash Behari Avenue, Kolkata, West Bengal 700029", phone: "+91 33 22223333" },
        ],
    },
    {
        state: "Karnataka",
        branches: [
            { id: "bg-road", city: "Bengaluru - BG Road", address: "Bannerghatta Road, Bengaluru, Karnataka 560076", phone: "+91 80 11112222" },
            { id: "ch-road", city: "Bengaluru - CH Road", address: "Cunningham Road, Bengaluru, Karnataka 560052", phone: "+91 80 22223333" },
            { id: "nagarbhavi", city: "Bengaluru - Nagarbhavi", address: "Nagarbhavi, Bengaluru, Karnataka 560072", phone: "+91 80 33334444" },
            { id: "rajajinagar", city: "Bengaluru - Rajajinagar", address: "Rajajinagar, Bengaluru, Karnataka 560010", phone: "+91 80 44445555" },
            { id: "kengeri", city: "Bengaluru - Kengeri", address: "Kengeri, Bengaluru, Karnataka 560060", phone: "+91 80 55556666" },
            { id: "richmond-road", city: "Bengaluru - Richmond Road", address: "Richmond Road, Bengaluru, Karnataka 560025", phone: "+91 80 66667777" },
            { id: "yeswanthpur", city: "Bengaluru - Yeswanthpur", address: "Yeswanthpur, Bengaluru, Karnataka 560022", phone: "+91 80 77778888" },
        ],
    },
    {
        state: "Telangana",
        branches: [
            { id: "lakdi-ka-pul", city: "Hyderabad - Lakdi-Ka-Pul", address: "Lakdi-Ka-Pul, Hyderabad, Telangana 500004", phone: "+91 40 11112222" },
            { id: "lb-nagar", city: "Hyderabad - L.B. Nagar", address: "L.B. Nagar, Hyderabad, Telangana 500074", phone: "+91 40 22223333" },
        ],
    },
    {
        state: "Tamil Nadu",
        branches: [
            { id: "chennai", city: "Chennai", address: "Anna Salai, Chennai, Tamil Nadu 600002", phone: "+91 44 1234567" },
            { id: "perumbakkam", city: "Chennai - Perumbakkam (Sholinganallur)", address: "Perumbakkam, Sholinganallur, Chennai, Tamil Nadu 600100", phone: "+91 44 7654321" },
        ],
    },
    {
        state: "Chhattisgarh",
        branches: [
            { id: "raigarh", city: "Raigarh", address: "Jindal Road, Raigarh, Chhattisgarh 496001", phone: "+91 7762 123456" },
        ],
    },
];

const mapSrc = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
const mapLink = (q) => `https://www.google.com/maps/search/${encodeURIComponent(q)}`;

// ===== Branch Card =====
const BranchCard = ({ branch, index, onSelect }) => (
    <BlurFade delay={0.04 * (index % 4)}>
        <div onClick={() => onSelect(branch)} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 cursor-pointer group h-full flex flex-col">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Building2 className="w-5 h-5" /></div>
                <div className="flex-grow">
                    <h3 className="font-['Playfair_Display'] text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">{branch.city}</h3>
                </div>
            </div>
            <p className="text-sm text-slate-500 leading-snug flex-grow">{branch.address}</p>
            <div className="flex items-center gap-1 text-primary font-semibold text-sm mt-4">
                View Location <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </BlurFade>
);

// ===== Full Screen Branch Detail =====
const BranchDetail = ({ branch, onClose }) => (
    <motion.div className="min-h-screen bg-[#fafafa]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <Navbar />
        <div className="container mx-auto px-4 max-w-6xl py-10">
            <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to Hospitals
            </button>

            <motion.div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: details */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Pulse Life Care Hospital</p>
                        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900 mb-6">{branch.city}</h1>

                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-3">
                                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><MapPin className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Address</p>
                                    <p className="text-slate-700 font-medium leading-relaxed">{branch.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Phone className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                                    <p className="text-slate-700 font-medium">{branch.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0"><Clock className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Timings</p>
                                    <p className="text-slate-700 font-medium">OPD: 8 AM – 9 PM · Emergency: 24×7</p>
                                </div>
                            </div>
                        </div>

                        <a href={mapLink(`Pulse Life Care Hospital ${branch.address}`)} target="_blank" rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 w-full sm:w-auto">
                            <Navigation className="w-5 h-5" /> Get Directions
                        </a>
                    </div>

                    {/* Right: map */}
                    <div className="min-h-[320px] lg:min-h-full bg-slate-100">
                        <iframe
                            title={`Map of ${branch.city}`}
                            src={mapSrc(`Pulse Life Care Hospital ${branch.address}`)}
                            className="w-full h-full min-h-[320px] border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    </motion.div>
);

const OurHospitalsPage = () => {
    const [selectedBranch, setSelectedBranch] = useState(null);
    const totalBranches = STATES.reduce((sum, s) => sum + s.branches.length, 0);

    if (selectedBranch) {
        return <BranchDetail branch={selectedBranch} onClose={() => setSelectedBranch(null)} />;
    }

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-primary/20 selection:text-primary">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-20 pb-16 bg-white overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white opacity-60"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <BlurFade>
                        <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                            Our <span className="text-primary italic">Hospitals</span>
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.1}>
                        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                            {totalBranches}+ hospitals across {STATES.length} states. Find a Pulse Life Care branch near you and click to view its address and location.
                        </p>
                    </BlurFade>
                </div>
            </section>

            {/* States + branches */}
            <div className="container mx-auto px-4 max-w-7xl py-16 flex flex-col gap-16">
                {STATES.map((group, gi) => (
                    <div key={group.state}>
                        <BlurFade>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><MapPin className="w-6 h-6" /></div>
                                <div>
                                    <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-slate-900">{group.state}</h2>
                                    <p className="text-sm text-slate-400 font-medium">{group.branches.length} {group.branches.length === 1 ? "hospital" : "hospitals"}</p>
                                </div>
                            </div>
                        </BlurFade>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {group.branches.map((branch, bi) => (
                                <BranchCard key={branch.id} branch={branch} index={bi} onSelect={setSelectedBranch} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurHospitalsPage;
