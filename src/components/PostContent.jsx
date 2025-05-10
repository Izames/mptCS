import './Post.css';
import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom'; 
import clickSound from '../assets/click-sound.mp3';
import { PageTransition } from './PageTransition';
export function PostContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ''
  });
  
  const [errors, setErrors] = useState({
    email: false
  });
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    document.title = 'Страница отправки кода на почту';
    audioRef.current = new Audio(clickSound);
    
    // Восстановление таймера при загрузке страницы
    const savedEndTime = localStorage.getItem('timerEndTime');
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const now = Math.floor(Date.now() / 1000);
      const remainingTime = endTime - now;
      
      if (remainingTime > 0) {
        setIsButtonEnabled(false);
        setTimeLeft(remainingTime);
      } else {
        localStorage.removeItem('timerEndTime');
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({email});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors({email: !emailRegex.test(email)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound();
    
    if (errors.email) return;
    
    try {
      const response = await fetch('http://localhost:8091/sendPin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: formData.email }),
      });

      if (response.ok) {
        navigate('/Change');
      } else {
        alert('Неверная почта');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
    
    setIsButtonEnabled(false);
    setTimeLeft(60);
    const endTime = Math.floor(Date.now() / 1000) + 60;
    localStorage.setItem('timerEndTime', endTime.toString());
  };

  useEffect(() => {
    let intervalId;

    if (!isButtonEnabled && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setIsButtonEnabled(true);
            localStorage.removeItem('timerEndTime');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isButtonEnabled, timeLeft]);

  return (
    <PageTransition>
    <div className="auth-container">
      <h1 className="auth-title">Введите почту для отправки кода</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-text">Почта</h1>
        <input
          type="email"
          name="email"
          className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
          value={formData.email}
          onChange={handleEmailChange}
          required
        />
        {errors.email && <span className="error-message">Введите корректный email</span>}
        
        <button
          type="submit"
          className="auth-button"
          disabled={!isButtonEnabled || errors.email}
        >
          {isButtonEnabled ? 'Отправить код' : `Повторить через ${timeLeft} сек`}
        </button>
      </form>
    </div>
    </PageTransition>
  );
}