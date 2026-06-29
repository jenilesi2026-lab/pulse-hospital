import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useInView } from "framer-motion";
import {
    HeartPulse, Activity, ShieldCheck, CheckCircle2, ArrowRight, Loader2,
    Sparkles, Users, Bone, PhoneCall, ArrowLeft, CreditCard, Lock,
    CheckCheck, Download, Printer, Droplet, Heart, User
} from "lucide-react";

// Safe cn fallback
const cn = (...args) => args.filter(Boolean).join(" ");

// Price ko hamesha clean NUMBER bana deta hai ("1,499" -> 1499, 999 -> 999)
const toNumber = (v) => Number(String(v).replace(/[^0-9.]/g, "")) || 0;

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

const getIcon = (name, cls) => ({
    Activity: <Activity className={cls} />, Sparkles: <Sparkles className={cls} />,
    HeartPulse: <HeartPulse className={cls} />, Users: <Users className={cls} />,
    Bone: <Bone className={cls} />, ShieldCheck: <ShieldCheck className={cls} />,
    Droplet: <Droplet className={cls} />, Heart: <Heart className={cls} />,
}[name] || <Activity className={cls} />);

const sanitize = {
    digits: (v, max) => v.replace(/\D/g, "").slice(0, max),
    letters: (v) => v.replace(/[^a-zA-Z\s]/g, ""),
};
const inputClass = "w-full px-5 py-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-base outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300";

// ====== PAYMENT + RECEIPT FLOW ======
const PaymentFlow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pkg = location.state?.pkg;

    const [step, setStep] = useState("pay"); // pay | processing | receipt
    const [form, setForm] = useState({ name: "", email: "", phone: "", card: "", expiry: "", cvv: "" });
    const [errors, setErrors] = useState({});
    const [txn, setTxn] = useState(null);

    useEffect(() => {
        if (!pkg) navigate('/health-checks');
    }, [pkg, navigate]);

    if (!pkg) return null;

    const onClose = () => navigate('/health-checks');

    // ✅ FIX: price ko number me convert karo, tab calculate karo
    const priceNum = toNumber(pkg.price);
    const gst = Math.round(priceNum * 0.18);
    const total = priceNum + gst;
    const fmt = (n) => n.toLocaleString("en-IN");

    const setField = (name, val, fn) => {
        setForm((p) => ({ ...p, [name]: fn ? fn(val) : val }));
        setErrors((p) => ({ ...p, [name]: "" }));
    };

    const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    const formatExpiry = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

    const validate = () => {
        const e = {};
        if (form.name.trim().length < 3) e.name = "Enter full name";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
        if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit number";
        if (form.card.replace(/\s/g, "").length !== 16) e.card = "Enter 16-digit card number";
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/YY";
        if (form.cvv.length !== 3) e.cvv = "3-digit CVV";
        return e;
    };

    const handlePay = async (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;

        setStep("processing");

        // ============================================================
        // @BACKEND_TEAM: Asli payment yahan integrate karo.
        // Steps:
        //   1. Backend pe order create karo (amount = `total`, packageId = pkg.id)
        //      e.g. const order = await fetch('/api/payments/create-order', {
        //              method: 'POST',
        //              headers: { 'Content-Type': 'application/json' },
        //              body: JSON.stringify({ packageId: pkg.id, amount: total }),
        //           }).then(r => r.json());
        //   2. Razorpay / Stripe checkout open karo us order ke saath.
        //   3. Payment success hone par backend se verify karo aur
        //      asli transaction id + date set karo (niche setTxn me).
        //   NOTE: Card number / CVV kabhi apne server pe mat bhejna —
        //         hamesha payment gateway (Razorpay/Stripe) handle kare.
        // ============================================================
        try {
            // --- DEMO simulation (backend ready hone par hata dena) ---
            await new Promise((res) => setTimeout(res, 1800));
            const fakeTxn = {
                id: "TXN" + Math.floor(Math.random() * 9000000000 + 1000000000),
                date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
            };
            setTxn(fakeTxn);
            setStep("receipt");
            // --- DEMO end ---
        } catch (err) {
            console.error("Payment failed:", err);
            setStep("pay");
            alert("Payment failed. Please try again.");
        }
    };

    const handlePrint = () => window.print();

    return (
        <motion.div
            className="min-h-screen bg-[#fafafa] print:bg-white"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <Navbar />
            <div className="container mx-auto px-4 max-w-3xl py-10">
                {step !== "receipt" && (
                    <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold mb-8 transition-colors print:hidden">
                        <ArrowLeft className="w-5 h-5" /> Back to Packages
                    </button>
                )}

                {/* PROCESSING */}
                {step === "processing" && (
                    <div className="text-center py-32">
                        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
                        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900 mb-2">Processing Payment...</h2>
                        <p className="text-slate-500">Please do not close or refresh this page.</p>
                    </div>
                )}

                {/* PAYMENT FORM */}
                {step === "pay" && (
                    <form onSubmit={handlePay} className="flex flex-col gap-7">
                        <BlurFade>
                            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900 mb-1">Secure <span className="text-primary italic">Payment</span></h1>
                            <p className="text-slate-600 font-medium">Complete your booking for the {pkg.title}.</p>
                        </BlurFade>

                        {/* Order summary */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{getIcon(pkg.icon, "w-6 h-6")}</div>
                                <div><h2 className="font-['Playfair_Display'] text-xl font-bold text-slate-900">{pkg.title}</h2><p className="text-sm text-slate-500">{pkg.subtitle}</p></div>
                            </div>
                            <div className="flex flex-col gap-2 text-slate-700">
                                <div className="flex justify-between"><span>Package Price</span><span className="font-semibold">₹ {fmt(priceNum)}</span></div>
                                <div className="flex justify-between"><span>GST (18%)</span><span className="font-semibold">₹ {fmt(gst)}</span></div>
                                <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-100"><span className="font-bold text-slate-900 text-lg">Total Payable</span><span className="font-bold text-primary text-2xl">₹ {fmt(total)}</span></div>
                            </div>
                        </div>

                        {/* Billing details */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><User className="w-5 h-5" /></div>
                                <h2 className="font-['Playfair_Display'] text-xl font-bold text-slate-900">Billing Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="flex flex-col md:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                                    <input value={form.name} onChange={(e) => setField("name", e.target.value, sanitize.letters)} placeholder="John Doe" autoComplete="name" className={inputClass} />
                                    {errors.name && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{errors.name}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-slate-700 mb-2">Email *</label>
                                    <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="john@example.com" autoComplete="email" className={inputClass} />
                                    {errors.email && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{errors.email}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-slate-700 mb-2">Phone *</label>
                                    <input type="tel" inputMode="numeric" value={form.phone} onChange={(e) => setField("phone", e.target.value, (v) => sanitize.digits(v, 10))} placeholder="9876543210" autoComplete="tel" className={inputClass} />
                                    {errors.phone && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{errors.phone}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Card details */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><CreditCard className="w-5 h-5" /></div>
                                <h2 className="font-['Playfair_Display'] text-xl font-bold text-slate-900">Card Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="flex flex-col md:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700 mb-2">Card Number *</label>
                                    <input inputMode="numeric" value={form.card} onChange={(e) => setField("card", e.target.value, formatCard)} placeholder="1234 5678 9012 3456" autoComplete="cc-number" className={inputClass} />
                                    {errors.card && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{errors.card}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-slate-700 mb-2">Expiry *</label>
                                    <input inputMode="numeric" value={form.expiry} onChange={(e) => setField("expiry", e.target.value, formatExpiry)} placeholder="MM/YY" autoComplete="cc-exp" className={inputClass} />
                                    {errors.expiry && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{errors.expiry}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold text-slate-700 mb-2">CVV *</label>
                                    <input type="password" inputMode="numeric" value={form.cvv} onChange={(e) => setField("cvv", e.target.value, (v) => sanitize.digits(v, 3))} placeholder="•••" autoComplete="cc-csc" className={inputClass} />
                                    {errors.cvv && <span className="text-[#e11d48] text-xs mt-1.5 font-medium">{errors.cvv}</span>}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/25">
                            <Lock className="w-5 h-5" /> Pay ₹ {fmt(total)}
                        </button>
                        <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1 -mt-3"><ShieldCheck className="w-4 h-4" /> 100% secure & encrypted payment</p>
                    </form>
                )}

                {/* RECEIPT */}
                {step === "receipt" && txn && (
                    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                        <div className="text-center mb-8 print:hidden">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCheck className="w-12 h-12 text-emerald-600" />
                            </motion.div>
                            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-slate-900">Payment Successful!</h1>
                            <p className="text-slate-500">Your health package has been booked.</p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10 print:shadow-none print:border">
                            <div className="flex items-center justify-between pb-6 border-b border-dashed border-slate-200 mb-6">
                                <div className="flex items-center gap-2">
                                    <HeartPulse className="w-7 h-7 text-primary" />
                                    <span className="font-['Playfair_Display'] font-bold text-xl text-slate-900">Pulse Life Care</span>
                                </div>
                                <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Receipt</p><p className="font-bold text-slate-900">PAID</p></div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-5 gap-x-8 mb-6">
                                <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Transaction ID</p><p className="text-slate-800 font-medium">{txn.id}</p></div>
                                <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Date & Time</p><p className="text-slate-800 font-medium">{txn.date}</p></div>
                                <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Billed To</p><p className="text-slate-800 font-medium">{form.name}</p></div>
                                <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</p><p className="text-slate-800 font-medium break-all">{form.email}</p></div>
                                <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p><p className="text-slate-800 font-medium">{form.phone}</p></div>
                                <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Paid Via</p><p className="text-slate-800 font-medium">Card •••• {form.card.slice(-4)}</p></div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <p className="font-bold text-slate-900 mb-3">{pkg.title}</p>
                                <div className="flex flex-col gap-2 text-sm text-slate-600">
                                    <div className="flex justify-between"><span>Package Price</span><span>₹ {fmt(priceNum)}</span></div>
                                    <div className="flex justify-between"><span>GST (18%)</span><span>₹ {fmt(gst)}</span></div>
                                    <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-200"><span className="font-bold text-slate-900 text-base">Total Paid</span><span className="font-bold text-emerald-600 text-xl">₹ {fmt(total)}</span></div>
                                </div>
                            </div>

                            <p className="text-center text-xs text-slate-400 mt-6">Thank you! Our team will contact you to schedule your tests. This is a computer-generated receipt.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pb-16 print:hidden">
                            <button onClick={handlePrint} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"><Printer className="w-5 h-5" /> Print</button>
                            <button onClick={handlePrint} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"><Download className="w-5 h-5" /> Download Receipt</button>
                            <button onClick={onClose} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-colors">Done</button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default PaymentFlow;
