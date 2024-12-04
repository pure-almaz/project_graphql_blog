import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { cleanUpResponse } from '../helpers/cleanUpResponse';

function Contact({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sending, setSending] = useState(false);

  const mailService = process.env.NEXT_PUBLIC_MAIL_SERVICE;
  const mailTemplate = process.env.NEXT_PUBLIC_MAIL_TEMPLATE;

  const mailKey = process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY;

  emailjs.init({
    publicKey: mailKey,
    blockHeadless: true,
    blockList: {
      list: [''],
    },
    limitRate: {
      throttle: 10000, // 10s
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setError(false);
    setSuccessMessage('');
    setSuccess(false);
    setSending(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email || !message) {
      setErrorMessage('All fields are required.');
      setError(true);
      setSending(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid Email Address!');
      setError(true);
      setSending(false);
      return;
    }

    const content = cleanUpResponse(message);
    const templateParams = { content, name, email };

    emailjs.send(mailService, mailTemplate, templateParams)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage('Message sent successfully! We will get back to you soon.');
          setSuccess(true);
          setName('');
          setEmail('');
          setMessage('');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
          setError(true);
        }
        setSending(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div style={{backgroundColor:"#D9D9D9"}} className="bg-[#D9D9D9] rounded-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl text-[#00181C] hover:text-[#35185A]">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#35185A]">Get a free consultation.</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              style={{backgroundColor:"#D9D9D9"}}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 focus:outline-none focus:border-[#35185A] p-2"
              required
            />
          </div>
          <div>
            <input
              type="email"
              style={{backgroundColor:"#D9D9D9"}}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 focus:outline-none focus:border-[#35185A] p-2"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="How may we help you?"
              style={{backgroundColor:"#D9D9D9"}}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border-b-2 focus:outline-none focus:border-[#35185A] p-2 h-32"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{errorMessage}</div>}
          {success && <div className="text-green-500 text-sm">{successMessage}</div>}

          <button
            type="submit"
            disabled={sending}
            className="bg-[#35185A] text-[#D9D9D9] py-2 px-4 w-full rounded-lg transition-colors hover:bg-[#00181C]"
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
