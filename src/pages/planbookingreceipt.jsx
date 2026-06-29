import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
    HeartPulse, PhoneCall, CheckCheck, Printer, Download, ArrowLeft,
    Calendar, User, Mail, Phone, CreditCard, ShieldCheck
} from "lucide-react";

// Safe cn fallback
const cn = (...args) => args.filter(Boolean).join(" ");
const toNumber = (v) => Number(String(v).replace(/[^0-9.]/g, "")) || 0;
const fmt = (n) => n.toLocaleString("en-IN");

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

// Demo data — agar page direct khola jaye (booking se data na aaye) to ye dikhega.
// @BACKEND_TEAM: asli receipt data booking/payment ke baad navigate state se ya API se aayega.
const DEMO = {
    txnId: "TXN" + "5829104736",
    date: "28 Jun 2026, 4:35 PM",
    customer: { name: "Rahul Verma", email: "rahul@example.com", phone: "9876543210", cardLast4: "4242" },
    pkg: { title: "Master Health Checkup", subtitle: "Comprehensive full body evaluation", price: 1499 },
};

const Row = ({ icon: Icon, label, value }) => (
    <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
            {Icon && <Icon className="w-3.5 h-3.5" />} {label}
        </p>
        <p className="text-slate-800 font-medium break-words">{value || "—"}</p>
    </div>
);

export default function HealthCheckReceipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const printRef = useRef(null);

    // Booking/payment se data aaya to wahi, warna demo
    const data = location.state?.receipt || DEMO;
    const priceNum = toNumber(data.pkg?.price);
    const gst = Math.round(priceNum * 0.18);
    const total = priceNum + gst;

    const handlePrint = () => window.print();

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-primary/20 selection:text-primary print:bg-white">
            <Navbar />

            <div className="container mx-auto px-4 max-w-2xl py-12">
                {/* Back */}
                <button onClick={() => navigate('/health-checks')} className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold mb-8 transition-colors print:hidden">
                    <ArrowLeft className="w-5 h-5" /> Back to Health Checks
                </button>

                {/* Success header */}
                <div className="text-center mb-8 print:hidden">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCheck className="w-12 h-12 text-emerald-600" />
                    </motion.div>
                    <h1 className="font-['Playfair_Display'] text-3xl font-bold text-slate-900">Booking Confirmed!</h1>
                    <p className="text-slate-500">Here is your health check-up receipt.</p>
                </div>

                {/* Receipt card */}
                <motion.div ref={printRef}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10 print:shadow-none print:border print:rounded-xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-dashed border-slate-200 mb-6">
                        <div className="flex items-center gap-2">
                            <HeartPulse className="w-8 h-8 text-primary" />
                            <div>
                                <p className="font-['Playfair_Display'] font-bold text-xl text-slate-900 leading-tight">Pulse Life Care</p>
                                <p className="text-xs text-slate-400">Health Check-up Receipt</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">Paid</span>
                        </div>
                    </div>

                    {/* Transaction info */}
                    <div className="grid grid-cols-2 gap-y-5 gap-x-8 mb-6">
                        <Row icon={CreditCard} label="Transaction ID" value={data.txnId} />
                        <Row icon={Calendar} label="Date & Time" value={data.date} />
                        <Row icon={User} label="Billed To" value={data.customer?.name} />
                        <Row icon={Mail} label="Email" value={data.customer?.email} />
                        <Row icon={Phone} label="Phone" value={data.customer?.phone} />
                        <Row icon={CreditCard} label="Paid Via" value={data.customer?.cardLast4 ? `Card •••• ${data.customer.cardLast4}` : "—"} />
                    </div>

                    {/* Package + amount breakdown */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <p className="font-bold text-slate-900 mb-1">{data.pkg?.title}</p>
                        {data.pkg?.subtitle && <p className="text-sm text-slate-500 mb-4">{data.pkg.subtitle}</p>}
                        <div className="flex flex-col gap-2 text-sm text-slate-600">
                            <div className="flex justify-between"><span>Package Price</span><span>₹ {fmt(priceNum)}</span></div>
                            <div className="flex justify-between"><span>GST (18%)</span><span>₹ {fmt(gst)}</span></div>
                            <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-200">
                                <span className="font-bold text-slate-900 text-base">Total Paid</span>
                                <span className="font-bold text-emerald-600 text-xl">₹ {fmt(total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-dashed border-slate-200 text-center">
                        <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                            <ShieldCheck className="w-4 h-4" /> Secure & verified payment
                        </p>
                        <p className="text-xs text-slate-400">Our team will contact you to schedule your tests. This is a computer-generated receipt.</p>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pb-16 print:hidden">
                    <button onClick={handlePrint} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
                        <Printer className="w-5 h-5" /> Print
                    </button>
                    <button onClick={handlePrint} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                        <Download className="w-5 h-5" /> Download Receipt
                    </button>
                    <button onClick={() => navigate('/health-checks')} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-colors">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
