import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, PhoneCall, FileText, ClipboardList } from 'lucide-react';

const Navbar = () => {
    return (
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
                    <Link to="/reports" className="text-sm font-semibold text-primary transition-colors border-b-[3px] border-primary h-full flex items-center">Reports</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <button onClick={() => {
                        localStorage.removeItem('isAuthenticated');
                        window.location.href = '/login';
                    }} className="text-sm font-semibold text-muted-foreground hover:text-foreground hidden sm:block px-4 py-2 cursor-pointer transition-colors">Logout</button>
                    <a href="tel:911" className="flex items-center gap-3 bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-3.5 rounded-full font-black text-lg transition-all shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:-translate-y-1 cursor-pointer tracking-widest border-2 border-[#e11d48] hover:border-white/50">
                        <PhoneCall className="w-5 h-5 animate-pulse" />
                        <span>EMERGENCY</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default function ReportsHubPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
                <div className="text-center max-w-xl mb-12">
                    <h1 className="text-4xl font-bold font-['Playfair_Display'] text-slate-900 mb-3">
                        Choose Report Category
                    </h1>
                    <p className="text-slate-500">
                        Select which type of records you would like to view or manage.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                    {/* Medical Reports Card */}
                    <Link to="/medical-report" className="group block">
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Medical Reports</h2>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    Access clinical diagnostics, prescription logs, lab results, and patient clinical summary sheets.
                                </p>
                            </div>
                            <span className="text-sm font-bold text-blue-600 mt-auto flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                View Reports &rarr;
                            </span>
                        </div>
                    </Link>

                    {/* Plan Booking Receipt Card */}
                    <Link to="/plan-booking-receipt" className="group block">
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Plan Booking Receipt</h2>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    View your booked health packages and download your full-screen receipt.
                                </p>
                            </div>
                            <span className="text-sm font-bold text-emerald-600 mt-auto flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                View Receipt &rarr;
                            </span>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
