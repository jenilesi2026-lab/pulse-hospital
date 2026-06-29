import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';
import heartImage from '../assets/heart_transparent.png';
import aboutObject from '../assets/about_object.png';
import dnaObject from '../assets/dna_object.png';

const testimonials = [
  {
    text: "The state-of-the-art facilities and dedicated medical team made a complex procedure feel seamless and reassuring. I cannot thank the team enough for their expert care.",
    name: "Maria Flynn",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150"
  },
  {
    text: "The exceptional care I received was truly life-changing. The doctors and staff were incredibly attentive, providing top-notch medical expertise combined with genuine compassion at every step.",
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150"
  },
  {
    text: "I felt safe and well-informed throughout my entire treatment journey. The state-of-the-art facilities and dedicated medical team made a complex procedure feel seamless and reassuring.",
    name: "Sarah Chen",
    image: "https://i.pinimg.com/1200x/f2/7e/0e/f27e0e4516721e53dbe5874abc8eaf75.jpg"
  }
];

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="landing-page">
      <div className="grid-bg"></div>
      <Navbar />
      
      <main className="hero-section container">
        <div className="hero-content animate-fade-in">
          <div className="pulse-line">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10H10L13 2L20 18L25 5L28 10H40" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="trusted-text" style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '1rem', display: 'block' }}>
              Trusted leader in Pulse Life Care Hospital.
            </span>
          </div>
          
          <h1 className="hero-title" data-aos="fade-up">
            Enjoy a <span className="highlight-red">Disease Free</span> Life
          </h1>
          
          <p className="hero-description" data-aos="fade-up" data-aos-delay="100" style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2.5rem' }}>
            Combining world-class medical expertise with modern healthcare innovation, we deliver personalized cardiac treatments in a safe, comfortable, and technologically advanced environment.
          </p>
          
          <div className="hero-actions" data-aos="fade-up" data-aos-delay="200">
            <Link to="/blog/hospital-info" className="btn-primary-lg" style={{ background: '#333333', color: 'white', borderRadius: '30px', padding: '0.8rem 2rem', border: 'none', fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}>Read More</Link>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="ekg-background">
             <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100 H100 L120 40 L160 180 L190 70 L210 100 H500" stroke="var(--accent-red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ekg-path"/>
            </svg>
          </div>
          <div className="heart-container">
            <img src={heartImage} alt="Realistic Beating Heart" className="heart-image animate-heartbeat" />
          </div>
          
          <div className="floating-card card-1">
             <div className="card-dot"></div>
             <img src="https://i.pinimg.com/736x/24/7e/0a/247e0a055a4c3173f41d5c79c5c5883e.jpg" alt="Doctor 1" className="card-image-placeholder" style={{ objectFit: 'cover' }} />
          </div>
          <div className="floating-card card-2">
             <div className="card-dot"></div>
             <img src="https://i.pinimg.com/webp/736x/8a/6d/d8/8a6dd87223d635ecec8494a5c729528f.webp" alt="Doctor 2" className="card-image-placeholder" style={{ objectFit: 'cover' }} />
          </div>
          <div className="floating-card card-3">
             <div className="card-dot"></div>
             <img src="https://i.pinimg.com/736x/db/be/d9/dbbed9d30d137e8a9dc724cf9d777f77.jpg" alt="Doctor 3" className="card-image-placeholder" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </main>

      <section className="about-section">
        <div className="about-container container">
          <div className="about-white-box">
            
            <div className="about-visual">
              <svg className="about-ekg-line" width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100 H100 L120 40 L160 180 L190 70 L210 100 H500" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              <img src={aboutObject} alt="3D Stethoscope" className="about-main-image" />
              
              <div className="about-circle-img img-top-left">
                <div className="circle-inner bg-medical-1"></div>
              </div>
              <div className="about-circle-img img-bottom-right">
                <div className="circle-inner bg-medical-2"></div>
              </div>
            </div>
            
            <div className="about-content" data-aos="fade-left">
              <p className="about-subtitle font-serif">Welcome to Pulse Life Care Hospital</p>
              <h2 className="about-title font-serif">About Hospital</h2>
              <div className="about-text">
                <p>
                  Our hospital is dedicated to providing exceptional cardiovascular care through advanced medical technology, experienced specialists, and a patient-centered approach. Every treatment is guided by precision, compassion, and a commitment to improving lives.
                </p>
              </div>
              
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div className="service-info">
                    <h3>Medical Treatment</h3>
                    <Link to="/blog/medical-treatment">Read More <span>&#8250;</span></Link>
                  </div>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/><path d="M12 7v4"/><path d="M10 9h4"/></svg>
                  </div>
                  <div className="service-info">
                    <h3>Emergency Help</h3>
                    <Link to="/blog/emergency-help">Read More <span>&#8250;</span></Link>
                  </div>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
                  </div>
                  <div className="service-info">
                    <h3>Pharmacy & Lab</h3>
                    <Link to="/blog/pharmacy-lab">Read More <span>&#8250;</span></Link>
                  </div>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M16 11h6"/></svg>
                  </div>
                  <div className="service-info">
                    <h3>Medical Professionals</h3>
                    <Link to="/blog/medical-professionals">Read More <span>&#8250;</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-timeline-section">
        <div className="container">
          <h2 className="section-title text-center">Our Services</h2>
          
          <div className="timeline-container">
            <div className="timeline-row" data-aos="fade-up">
              <div className="timeline-image-wrapper">
                <img src="https://i.pinimg.com/1200x/f2/7e/0e/f27e0e4516721e53dbe5874abc8eaf75.jpg" alt="Heart Surgery" className="timeline-img" />
              </div>
              <div className="timeline-content right-content">
                <div className="watermark">01</div>
                <h3 className="timeline-title">HEART SURGERY</h3>
                <p className="timeline-desc">
                  Advanced surgical procedures performed by experienced cardiac surgeons using modern technology to ensure safe, precise, and successful outcomes.
                </p>
              </div>
              
              <div className="vertical-right"></div>
              <div className="dot dot-start"></div>
              
              <div className="connector-r2l">
                <div className="curve-br">
                  <div className="arrow a-down" style={{right: '-6px', top: '50%'}}></div>
                </div>
                <div className="curve-tl">
                  <div className="arrow a-left" style={{left: '50%', top: '-5px'}}></div>
                </div>
                <div className="dot dot-mid-left"></div>
              </div>
            </div>

            <div className="timeline-row reverse-row" data-aos="fade-up">
              <div className="timeline-image-wrapper">
                <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800" alt="Valve Diseases" className="timeline-img" />
              </div>
              <div className="timeline-content left-content">
                <div className="watermark">02</div>
                <h3 className="timeline-title">Blood Bank Services</h3>
                <p className="timeline-desc">
                  Safe, reliable, and readily available blood and blood component services, ensuring timely support for surgeries, emergencies, and critical patient care.
                </p>
              </div>

              <div className="vertical-left"></div>

              <div className="connector-l2r">
                <div className="curve-bl">
                  <div className="arrow a-down" style={{left: '-5px', top: '50%'}}></div>
                </div>
                <div className="curve-tr">
                  <div className="arrow a-right" style={{right: '50%', top: '-5px'}}></div>
                </div>
                <div className="dot dot-mid-right"></div>
              </div>
            </div>

            <div className="timeline-row" data-aos="fade-up">
              <div className="timeline-image-wrapper">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800" alt="Cardiac Care Units" className="timeline-img" />
              </div>
              <div className="timeline-content right-content">
                <div className="watermark">03</div>
                <h3 className="timeline-title">Cardiac Care Units</h3>
                <p className="timeline-desc">
                  Round-the-clock emergency response with rapid assessment, critical care support, and experienced cardiac specialists available whenever every second matters.
                </p>
              </div>

              <div className="vertical-right-final"></div>
              <div className="dot dot-end"></div>
            </div>
          </div>
          
          <div className="view-all-container text-center">
            <button className="btn-dark view-all-btn">View All Services</button>
          </div>
        </div>
      </section>

      {/* Deep Green Features Section */}
      <section className="features-section">
        <div className="features-container container">
          <div className="features-grid">
            
            <div className="features-column left-column">
              <div className="feature-card" data-aos="fade-right" data-aos-delay="100">
                <h4>Cutting Edge Technology</h4>
                <p>Equipped with the latest medical advancements, ensuring precise diagnostics and highly effective treatments for all cardiac conditions.</p>
              </div>
              <div className="feature-card" data-aos="fade-right" data-aos-delay="300">
                <h4>State Of The Art Infrastructure</h4>
                <p>A modern, patient-friendly facility designed to provide maximum comfort, safety, and a healing environment.</p>
              </div>
            </div>
            
            <div className="features-center" data-aos="zoom-in" data-aos-duration="1200">
              <img src={dnaObject} alt="Golden DNA" className="features-main-image" />
            </div>
            
            <div className="features-column right-column">
              <div className="feature-card" data-aos="fade-left" data-aos-delay="200">
                <h4>Leadership Legacy</h4>
                <p>Guided by decades of medical excellence, our founders have established a legacy of trust and pioneering cardiovascular care.</p>
              </div>
              <div className="feature-card" data-aos="fade-left" data-aos-delay="400">
                <h4>Global Pioneers In Telerobotics</h4>
                <p>Leading the way in remote surgical interventions, bringing world-class robotic precision to complex procedures.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Doctors Team Section */}
      <section className="doctors-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Our Doctors Team</h2>
          
          <div className="doctors-grid">
            {/* Doctor 1 */}
            <div className="doctor-card" data-aos="fade-up" data-aos-delay="100">
              <div className="doctor-img-wrapper">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300" alt="Dr. Anjali Desai" />
              </div>
              <h4 className="doctor-name">Dr. Anjali Desai</h4>
              <p className="doctor-degree">MD, FACC, FESC, DM</p>
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">ig</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </div>
            {/* Doctor 2 */}
            <div className="doctor-card" data-aos="fade-up" data-aos-delay="200">
              <div className="doctor-img-wrapper">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300" alt="Dr. Rajesh Sharma" />
              </div>
              <h4 className="doctor-name">Dr. Rajesh Sharma</h4>
              <p className="doctor-degree">MD, DM</p>
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">ig</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </div>
            {/* Doctor 3 */}
            <div className="doctor-card" data-aos="fade-up" data-aos-delay="300">
              <div className="doctor-img-wrapper">
                <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300" alt="Dr. Vikram Singh" />
              </div>
              <h4 className="doctor-name">Dr. Vikram Singh</h4>
              <p className="doctor-degree">M.B.B.S., M.S., D.N.B.</p>
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">ig</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </div>
            {/* Doctor 4 */}
            <div className="doctor-card" data-aos="fade-up" data-aos-delay="400">
              <div className="doctor-img-wrapper">
                <img src="https://images.unsplash.com/photo-1594824432258-f73f27f09569?auto=format&fit=crop&w=300" alt="Dr. Priya Patel" />
              </div>
              <h4 className="doctor-name">Dr. Priya Patel</h4>
              <p className="doctor-degree">M.S., M.Ch, F.I.A.C.S.</p>
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">ig</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </div>
          </div>
          
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/doctors" className="btn-dark" style={{textDecoration: 'none', display: 'inline-block'}}>View All Team</Link>
          </div>
        </div>
      </section>

      {/* Blog & Testimonial Section */}
      <section className="blog-testimonial-section">
        <div className="container bt-grid">
          
          {/* Blog Column */}
          <div className="blog-column" data-aos="fade-right">
            <p className="timeline-subtitle">Recent News</p>
            <h2 className="bt-title font-serif" style={{fontWeight: 400}}>What's Going on <br/><strong style={{fontWeight: 800}}>In Our Blog ?</strong></h2>
            
            <div className="blog-list">
              <Link to="/blog/1" className="blog-card blog-link">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300" alt="Blog 1" className="blog-img" />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-tag">View All Team</span>
                    <span className="blog-date">February 18, 2022</span>
                  </div>
                  <h4 className="blog-card-title">That's why it is so important to check up regularly</h4>
                  <p className="blog-card-desc">Early detection through regular check-ups is the key to preventing serious cardiovascular conditions and maintaining long-term health.</p>
                </div>
              </Link>

              <Link to="/blog/2" className="blog-card blog-link">
                <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=300" alt="Blog 2" className="blog-img" />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-tag">Cardiac</span>
                    <span className="blog-date">May 29, 2023</span>
                  </div>
                  <h4 className="blog-card-title">Signs or risk factors for disease</h4>
                  <p className="blog-card-desc">Understanding common risk factors and early warning signs can significantly improve treatment outcomes for heart disease.</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Testimonial Column */}
          <div className="testimonial-column" data-aos="fade-left">
            <div className="testimonial-card">
              <p className="testimonial-subtitle">Testimonials</p>
              <h2 className="testimonial-title font-serif">What's Our <br/><strong>Patient's Talking ?</strong></h2>
              
              <div className="quote-icon">“</div>
              <p className="testimonial-text font-serif">
                {testimonials[currentTestimonial].text}
              </p>
              
              <div className="testimonial-footer">
                <div className="patient-info">
                  <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="patient-img" />
                  <span className="patient-name">{testimonials[currentTestimonial].name}</span>
                </div>
                <div className="slider-arrows">
                  <button className="slider-btn" onClick={prevTestimonial}>&#8592;</button>
                  <button className="slider-btn" onClick={nextTestimonial}>&#8594;</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container footer-grid">
          
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 36.6667C20 36.6667 6.66667 26.6667 6.66667 15C6.66667 11.4638 8.07142 8.07239 10.5719 5.5719C13.0724 3.07142 16.4638 1.66667 20 1.66667C23.5362 1.66667 26.9276 3.07142 29.4281 5.5719C31.9286 8.07239 33.3333 11.4638 33.3333 15C33.3333 26.6667 20 36.6667 20 36.6667Z" stroke="#1C1C1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 20V10" stroke="#1C1C1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 15H25" stroke="#1C1C1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="footer-desc">
              Pulse Life Care Hospital is committed to delivering world-class cardiovascular care through innovation, expertise, and a steadfast dedication to patient well-being.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">About Doctor</a></li>
              <li><a href="#">What's New</a></li>
              <li><a href="#">Center</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Facilities</h4>
            <ul className="footer-links">
              <li><a href="#">Invasive Procedure Unit</a></li>
              <li><a href="#">Other Invasive Procedures</a></li>
              <li><a href="#">Non-Invasive Procedures</a></li>
              <li><a href="#">Surgery</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">&#9990;</span>
                <div>
                  +91 12345-12345<br/>
                  +91 54321-54321
                </div>
              </li>
              <li>
                <span className="contact-icon">&#9993;</span>
                <div>test.pulselife@gmail.com</div>
              </li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
