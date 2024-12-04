import React, { useState } from 'react';
import Contact from './Contact';

function FloatingButton() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContactForm = () => setIsContactOpen(!isContactOpen);

  return (
    <>
      <button
        onClick={toggleContactForm}
        className="fixed bottom-8 right-8 bg-[#35185A] text-[#D9D9D9] py-4 px-6 rounded-full shadow-lg hover:bg-[#00181C] transition-colors z-49"
      >
        Free Consultation
      </button>
      <Contact isOpen={isContactOpen} onClose={toggleContactForm} />
    </>
  );
}

export default FloatingButton;
