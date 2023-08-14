// FadeText.js

import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.css';
import FaceComponent from '../face/faceComponents';

function FadeText() {
  const messages = [
    'Hello, User',
    'We’re about to go on a journey of creating personalized artistic QR codes for your personal and business needs.',  
    'We hope you love it'
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let interval;
    
    if (messageIndex === 1) {
      interval = setInterval(() => {
        setMessageIndex(index => (index + 1) % messages.length);
      }, 5500);
    } else {
      interval = setInterval(() => {
        setMessageIndex(index => (index + 1) % messages.length);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [messageIndex, messages.length]);

  return (
    <div className="fading-text text-center sm:w-full px-3 mt-[-7rem] sm:px-80    mx-auto sm:text-left">
      {messages.map((message, index) => (
        <CSSTransition
          key={index}
          in={messageIndex === index}
          timeout={5000}
          classNames="fade"
        >
          <p className={`z-20 text-white text-center text-2xl sm:text-4xl ${messageIndex === index ? 'visible' : 'hidden'} ${index === 1 ? 'text-base sm:text-2xl' : ''}`}>{message}</p>
        </CSSTransition>
      ))}
      <FaceComponent />
    </div>
  );
}


export default FadeText;
