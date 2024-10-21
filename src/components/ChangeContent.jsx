import './Change.css'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

export function ChangeContent() {
  const navigate = useNavigate();
  const handleWorkSpheres = () => {
    navigate('/Checkout'); 
  };

  useEffect(() => {
    document.title = 'Страница ввода кода и нового пароля';
  }, []);

  return (
    <div className="change-container">
      <div className="change-form">
        <h1 className="change-title">Введите код из сообщения на почте</h1>
        <input type="text" placeholder="Код из сообщения" className="change-input" />
        <h1 className="change-title">Введите Новый пароль</h1>
        <input type="password" placeholder="Новый пароль" className="change-input" />
        <button onClick={handleWorkSpheres} className="change-button">Сменить пароль</button>
      </div>
    </div>
  )
}