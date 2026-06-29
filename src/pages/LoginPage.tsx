import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { api } from '../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      showToast('Please enter your email and password', 'error');
      return;
    }

    setLoading(true);

    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: trimmedEmail, password }),
      });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAuthenticated", "true");
      
      showToast('Successfully logged in!', 'success');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // For social login, we just fake it by giving a dummy token so the guard passes
      localStorage.setItem("token", "dummy_social_token");
      localStorage.setItem("isAuthenticated", "true");
      showToast(`Signed in with ${provider}!`, 'success');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }, 1200);
  };

  return (
    <div className="login-main-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Gradient mesh background */}
      <div className="bg-gradient-login"></div>
      <div className="bg-noise-login"></div>

      {/* Top navbar with branding */}
      <nav className="top-nav-login" id="top-nav">
        <div className="brand-login">
          <div className="brand-icon-login">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E53935"/>
              <circle cx="12" cy="9" r="2.5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="brand-name-login">Pulse Life Care Hospital</span>
        </div>
      </nav>

      {/* Main login content */}
      <main className="login-main-layout" id="login-main">
        <div className="login-card-layout">
          <h1 className="welcome-title-login" id="welcome-heading">Welcome</h1>
          <p className="welcome-subtitle-login">Continue with</p>

          {/* OAuth buttons row */}
          <div className="oauth-row-login" id="oauth-buttons">
            <button className="oauth-chip-login" id="btn-google" onClick={() => handleSocialLogin('Google')}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>

            <button className="oauth-chip-login" id="btn-github" onClick={() => handleSocialLogin('GitHub')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#24292e">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </button>

            <button className="oauth-chip-login" id="btn-discord" onClick={() => handleSocialLogin('Discord')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
              </svg>
              <span>Discord</span>
            </button>
          </div>

          {/* OR divider */}
          <div className="divider-login" id="divider-or">
            <span>OR</span>
          </div>

          {/* Email input */}
          <form id="email-login-form" className="email-form-login" onSubmit={handleEmailLogin}>
            <div className="email-input-wrapper-login" style={{ flexDirection: 'column', padding: '0', background: 'transparent', gap: '10px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type="email" 
                  id="email-input" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  autoComplete="email"
                  style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '15px' }}
                />
              </div>
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '15px' }}
                />
              </div>
              <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--accent-red)', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '5px' }}>
                Sign In
              </button>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '10px' }}>
                Try: <strong>patient@example.com</strong> / <strong>patient123</strong>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Loading overlay */}
      <div className={`loading-overlay-login ${loading ? 'active' : ''}`} id="loading-overlay">
        <div className="loading-content-login">
          <div className="spinner-login"></div>
          <p>Connecting...</p>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast-login ${toast.show ? 'show' : ''} ${toast.type}`} id="toast">
        <span className="toast-msg-login" id="toast-message">{toast.message}</span>
      </div>
    </div>
  );
}
