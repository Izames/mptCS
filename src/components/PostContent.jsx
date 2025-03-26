import './Post.css'; 
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import clickSound  from '../assets/click-sound.mp3';

export function PostContent() {
  
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0); 
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(email));
    }
    const audio = new Audio(clickSound); 

    const playSound = () => {
      audio.currentTime = 0; 
      audio.play(); 
    };
  const handleChange = async () => {
    playSound();
      try {
          const response = await fetch('http://localhost:8091/sendPin', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ Email }),
          });

          if (response.ok) {
              navigate('/Change');
          } else {
              alert(`неверная почта.`);
          }
      } catch (error) {
          console.error('Ошибка сети:', error);
      }
    setIsButtonEnabled(false);
    setTimeLeft(60);
  };

  useEffect(() => {
    document.title = 'Страница отправки кода на почту';
  }, []);

  useEffect(() => {
    let intervalId;

    if (!isButtonEnabled) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isButtonEnabled, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !isButtonEnabled) {
      setIsButtonEnabled(true); 
      setTimeLeft(0);
    }
  }, [timeLeft, isButtonEnabled]);

  return (
    <div className="post-container">
      <h1 className="post-title">Введите почту для отправки кода</h1>
      <div className="post-form">
        <input
          type="text"
          className={`post-input ${EmailError ? 'border-red-500 border-[2px]' : ''}`}
          value={Email}
          onChange={handleEmailChange}
        />
        <button
          onClick={handleChange}
          className="post-button"
          disabled={!isButtonEnabled} 
        >
          {isButtonEnabled ? 'Отправить код' : `Повторить через ${timeLeft} сек`}
        </button>
      </div>
    </div>
  );
}