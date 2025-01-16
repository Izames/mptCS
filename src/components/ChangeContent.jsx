import './Change.css'
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import AppStore from '../store/StatusUser';

export function ChangeContent() {
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  const [Usermail, setUsermail] = useState('');
  const [UsermailError, setUsermailError] = useState(false);
  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState(false);
  const [Pin, setPin] = useState('');
  const [PinError, setPinError] = useState(false);
  const handleUsermailChange = (e) => {
    const usermail = e.target.value;
    setUsermail(usermail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setUsermailError(!emailRegex.test(usermail));
  }
  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordError(password.length<6)
  }
  const handleChangePin = (e) => {
    const pin = e.target.value;
    setPin(pin);
    setPinError(pin.length!=6)
  }
  const handleWorkSphere = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/checkPin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Usermail, Pin, Password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.jwt;
        localStorage.setItem('jwtToken', token);
        setAuth(true);
        navigate('/Checkout');
      } else {
        if (response.status === 400) {
          alert(`неверные данные.`);
        } else {
          alert(`Неизвестная ошибка.`);
        }
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  useEffect(() => {
    document.title = 'Страница ввода кода и нового пароля';
  }, []);

  return (
    <div className="change-container">
      <div className="change-form">
        <h1 className="change-title">Введите почту</h1>
        <input type="text" placeholder="почта" className={`change-input ${UsermailError ? 'border-red-500 border-[2px]' : ''}`}
               value={Usermail}
               onChange={handleUsermailChange} />
        <h1 className="change-title">Введите код из сообщения на почте</h1>
        <input type="text" placeholder="Код из сообщения" className={`change-input ${PinError ? 'border-red-500 border-[2px]' : ''}`}
               value={Pin}
               onChange={handleChangePin} />
        <h1 className="change-title">Введите Новый пароль</h1>
        <input type="password" placeholder="Новый пароль" className={`change-input ${PasswordError ? 'border-red-500 border-[2px]' : ''}`}
               value={Password}
               onChange={handleChangePassword} />
        <button onClick={handleWorkSphere} className="change-button">Сменить пароль</button>
      </div>
    </div>
  )
}