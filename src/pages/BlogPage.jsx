import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './BlogPage.css';

const blogData = {
  "1": {
    title: "That's why it is so important to check up regularly",
    tag: "Checkup",
    date: "February 18, 2022",
    author: "Dr. Anjali Desai",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200",
    content: `Regular medical check-ups are essential for maintaining optimal cardiovascular health. They help identify potential issues before they become severe problems. Early detection of conditions like high blood pressure, cholesterol imbalance, and arrhythmias can significantly improve treatment outcomes.
    
    A comprehensive heart check-up usually includes an electrocardiogram (ECG), an echocardiogram, and a detailed lipid profile. Your doctor will also discuss lifestyle factors such as diet, exercise, and stress management.
    
    Don't wait for symptoms to appear. Proactive healthcare is the key to enjoying a long, disease-free life. Schedule your annual check-up today and stay a step ahead of cardiovascular diseases.`
  },
  "2": {
    title: "Signs or risk factors for disease",
    tag: "Cardiac",
    date: "May 29, 2023",
    author: "Dr. Rajesh Sharma",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200",
    content: `Understanding the risk factors for heart disease is the first step in prevention. Some factors, such as age and family history, are out of our control. However, many others are heavily influenced by our daily choices.
    
    Key risk factors include high blood pressure, high cholesterol, smoking, obesity, and physical inactivity. Symptoms to watch out for include chest pain or discomfort, shortness of breath, unexplained fatigue, and irregular heartbeats.
    
    If you experience any of these symptoms or have multiple risk factors, it is crucial to consult a cardiologist. Lifestyle modifications, combined with appropriate medical interventions, can drastically reduce your risk and ensure a healthy heart.`
  },
  "hospital-info": {
    title: "Why Pulse Life Care is Your Trusted Health Partner",
    tag: "Hospital",
    date: "June 28, 2026",
    author: "Pulse Admin",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200",
    content: `Pulse Life Care Hospital is a premier medical facility dedicated to providing world-class healthcare with a compassionate touch. Our mission is to ensure every patient receives personalized attention and the best possible medical outcomes.
    
    Equipped with state-of-the-art infrastructure, advanced robotic surgical units, and highly trained specialists, we are equipped to handle everything from routine check-ups to complex cardiovascular surgeries. 
    
    Choose Pulse Life Care for a seamless, transparent, and superior healthcare experience.`
  },
  "emergency-help": {
    title: "Understanding Our 24/7 Emergency Services",
    tag: "Emergency",
    date: "June 25, 2026",
    author: "Dr. Vikram Singh",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200",
    content: `In a medical emergency, every second counts. That is why our Emergency Department operates 24/7, fully staffed with trauma specialists, cardiac care experts, and rapid response teams.
    
    Our advanced life support ambulances are equipped like mini-ICUs, ensuring critical care begins the moment our team reaches you. From heart attacks to severe trauma, we have protocols in place to deliver life-saving interventions swiftly.
    
    Save our emergency contact number today. Being prepared can make all the difference.`
  },
  "medical-treatment": {
    title: "Advanced Medical Treatments at Pulse",
    tag: "Treatment",
    date: "June 20, 2026",
    author: "Dr. Anjali Desai",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200",
    content: `Healthcare is evolving rapidly, and Pulse Life Care Hospital is at the forefront of this transformation. We offer a comprehensive suite of medical treatments tailored to each patient's unique physiological profile.
    
    Our specialized departments include Cardiology, Neurology, Orthopedics, and Oncology. We utilize minimally invasive surgical techniques, robotic-assisted surgeries, and precision medicine to ensure faster recovery times and better long-term results.
    
    Your health is your greatest asset. Trust our multidisciplinary teams to provide the advanced treatments you deserve.`
  },
  "medical-professionals": {
    title: "Meet the Experts Behind Your Care",
    tag: "Professionals",
    date: "June 15, 2026",
    author: "Pulse Admin",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200",
    content: `The backbone of Pulse Life Care Hospital is our exceptional team of medical professionals. We pride ourselves on having some of the most distinguished doctors, surgeons, and specialists in the country.
    
    Beyond their impressive credentials, our medical staff is chosen for their empathy, dedication, and patient-first approach. They continuously engage in medical research and training to bring the latest global healthcare advancements to our patients.
    
    When you are treated at Pulse, you are in the hands of experts who genuinely care.`
  },
  "pharmacy-lab": {
    title: "Comprehensive Pharmacy and Diagnostic Lab",
    tag: "Pharmacy",
    date: "June 10, 2026",
    author: "Pulse Lab Director",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200",
    content: `Accurate diagnostics are the foundation of effective medical treatment. Our in-house diagnostic laboratory features the latest imaging, pathology, and microbiology technologies, ensuring swift and highly accurate test results.
    
    Coupled with our 24/7 in-house pharmacy, patients have immediate access to authentic, high-quality medications. Our integrated approach ensures there is zero delay between diagnosis, prescription, and treatment.
    
    Experience the convenience and safety of our fully equipped pharmacy and laboratory services.`
  }
};

const BlogPage = () => {
  const { id } = useParams();
  const blog = blogData[id] || blogData["1"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="blog-page">
      <Navbar />
      
      <div className="blog-hero">
        <img src={blog.image} alt={blog.title} className="blog-hero-image" />
        <div className="blog-hero-overlay"></div>
        <div className="container blog-hero-content">
          <div className="blog-meta">
            <span className="blog-tag">{blog.tag}</span>
            <span className="blog-date">{blog.date}</span>
          </div>
          <h1 className="blog-title font-serif">{blog.title}</h1>
          <p className="blog-author">Written by {blog.author}</p>
        </div>
      </div>

      <div className="container blog-body">
        <div className="blog-content-wrapper">
          {blog.content.split(/\s{2,}/).map((paragraph, index) => (
            <p key={index} className="blog-paragraph">{paragraph}</p>
          ))}
        </div>
        
        <div className="blog-footer">
          <Link to="/" className="btn-dark">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
