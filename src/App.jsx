import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';

import DashboardPage from './pages/DashboardPage';
import DoctorsPage from './pages/DoctorsPage';
import SpecialitiesPage from './pages/SpecialitiesPage';
import HealthChecksPage from './pages/HealthChecksPage';
import BookingPage from './pages/BookingPage';
import MedicalReport from './pages/medicalreport';
import ReportsHubPage from './pages/ReportsHubPage';
import HealthCheckBookPayment from './pages/healthcheckbookpayment';
import PlanBookingReceipt from './pages/planbookingreceipt';
import OurBranches from './pages/ourbranches';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        
        <Route path="/login" element={
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        
        <Route path="/doctors" element={
          <ProtectedRoute>
            <DoctorsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/specialities" element={
          <ProtectedRoute>
            <SpecialitiesPage />
          </ProtectedRoute>
        } />
        
        <Route path="/health-checks" element={
          <ProtectedRoute>
            <HealthChecksPage />
          </ProtectedRoute>
        } />
        
        <Route path="/book" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        
        <Route path="/medical-report" element={
          <ProtectedRoute>
            <MedicalReport />
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            <ReportsHubPage />
          </ProtectedRoute>
        } />

        <Route path="/health-check-payment" element={
          <ProtectedRoute>
            <HealthCheckBookPayment />
          </ProtectedRoute>
        } />

        <Route path="/plan-booking-receipt" element={
          <ProtectedRoute>
            <PlanBookingReceipt />
          </ProtectedRoute>
        } />

        <Route path="/our-branches" element={
          <ProtectedRoute>
            <OurBranches />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
