// Backend team: bas API_BASE aur endpoint set karo, baaki UI khud handle karega.

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function fetchMedicalReport(reportId) {
    const res = await fetch(`${API_BASE}/reports/${reportId}`, {
        headers: { "Content-Type": "application/json" },
        // credentials: "include", // agar auth cookies chahiye to uncomment
    });
    if (!res.ok) {
        throw new Error(`Failed to load report (status ${res.status})`);
    }
    return res.json(); // expected shape niche DEMO_REPORT jaisa
}
