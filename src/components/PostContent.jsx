import './Post.css'; 
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

export function PostContent() {
  const navigate = useNavigate();
  const [Usermail, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(email));
    }
  const handleChange = async () => {
      try {
          const response = await fetch('http://localhost:8080/auth/sendPin', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ Usermail }),
          });

          if (response.ok) {
              navigate('/Change');
          } else {
              alert(`неверная почта.`);
          }
      } catch (error) {
          console.error('Ошибка сети:', error);
      }
  };

  useEffect(() => {
    document.title = 'Страница отправки кода на почту';
  }, []);

  return (
    <div className="post-container">
      <h1 className="post-title">Введите почту для отправки кода</h1>
      <div className="post-form">
        <input type="text" placeholder="Почта" className={`post-input ${EmailError ? 'border-red-500 border-[2px]' : ''}`}
               value={Usermail}
               onChange={handleEmailChange} />
        <button onClick={handleChange} className="post-button">Отправить код</button>
      </div>
    </div>
  )
}