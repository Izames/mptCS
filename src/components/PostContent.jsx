import './Post.css'; 
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

export function PostContent() {
  const navigate = useNavigate();
  const handleChange = () => {
    navigate('/Change'); 
  };

  useEffect(() => {
    document.title = 'Страница отправки кода на почту';
  }, []);

  return (
    <div className="post-container">
      <h1 className="post-title">Введите почту для отправки кода</h1>
      <div className="post-form">
        <input type="text" placeholder="Почта" className="post-input" />
        <button onClick={handleChange} className="post-button">Отправить код</button>
      </div>
    </div>
  )
}