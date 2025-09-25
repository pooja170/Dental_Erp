import React, { useState } from 'react';
import Link from 'next/link';
// import LoginModal from '../components/LoginModal';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#F5FBFF] via-[#1E90FF] to-[#D9EEFF] text-gray-800 font-sans overflow-hidden">
      {/* Subtle abstract blobs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D9E6FA] bg-opacity-20 rounded-[40%_60%_70%_30%_/_60%_40%_30%_70%] mix-blend-multiply filter blur-xl opacity-70 animate-blob transform skew-y-3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D9E6FA] bg-opacity-20 rounded-[30%_70%_50%_50%_/_50%_50%_70%_30%] mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 transform skew-y-2"></div>

      {/* Header */}
      <header className="py-4 px-6 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          {/* Workfin Logo */}
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8Z" fill="url(#paint0_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2E7DF6"/>
                  <stop offset="1" stopColor="#1E6BE0"/>
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#123457]">Workfin</h1>
          </div>
          <nav className="hidden md:flex flex-grow justify-center space-x-6">
            <Link href="#" className="text-lg text-[#6A7F9F] font-medium hover:text-blue-600 transition-colors duration-300">Home</Link>
            <Link href="#" className="text-lg text-[#6A7F9F] font-medium hover:text-blue-600 transition-colors duration-300">About</Link>
            <Link href="#" className="text-lg text-[#6A7F9F] font-medium hover:text-blue-600 transition-colors duration-300">Features</Link>
          </nav>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#123457] py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-lg font-semibold transform hover:-translate-y-1 border border-[#2E7DF6]"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-10">
        {/* Central Card */}
        <section className="relative bg-white p-12 rounded-[24px] shadow-2xl max-w-5xl mx-auto text-gray-800 transform transition-all duration-500 ease-in-out hover:scale-105"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 10px rgba(0, 0, 0, 0.05)' }}>
          <div className="text-center">
            {/* Subtitle */}
            <p className="text-[#6A7F9F] text-sm uppercase tracking-widest font-semibold mb-4">INTEGRATED DENTAL ERP ECOSYSTEM</p>
            {/* Main Headline */}
            <h2 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight text-[#2C3E50]">
              Streamline your dental practice management with an all-in-one solution
            </h2>
            {/* CTA Button */}
            <button
              className="bg-gradient-to-r from-[#2E7DF6] to-[#1E6BE0] text-white py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-bold transform hover:-translate-y-1"
              style={{ boxShadow: '0 6px 24px rgba(46, 125, 246, 0.4)' }}
            >
              Get Started
            </button>

            {/* Secondary Logo/Icon */}
            <div className="mt-12 flex justify-center">
              <div className="w-16 h-16 bg-[#EAF4FF] rounded-full flex items-center justify-center shadow-inner">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20H20V22H4V20ZM6 16H8V4H6V16ZM11 16H13V8H11V16ZM16 16H18V12H16V16Z" fill="#2E7DF6"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 relative z-10">
        <div className="container mx-auto flex flex-col items-center justify-center text-sm text-[#123457]">
          <span className="mb-2">&copy; 2025 Workfin. All rights reserved.</span>
          <div className="flex space-x-4">
            <Link href="#" className="text-[#123457] hover:text-blue-600 font-medium">Terms and Conditions</Link>
            <span className="text-[#123457]">|</span>
            <Link href="#" className="text-[#123457] hover:text-blue-600 font-medium">Privacy Policy</Link>
            <span className="text-[#123457]">|</span>
            <Link href="#" className="text-[#123457] hover:text-blue-600 font-medium">Contact</Link>
          </div>
        </div>
      </footer>

      {/* <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </div>
  );
};

export default LandingPage;
