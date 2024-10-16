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
    return(
        <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <h1 style={{ color: 'rgb(62, 100, 176)', fontSize: '44px', marginBottom: '20px', marginTop: '20px'}}>Введите код из сообщения на почте</h1>
          <input type="text" placeholder="Код из сообщения" style={{marginBottom: '20px', marginTop: '20px', fontSize: '44px', width: '600px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0' }} />
          <h1 style={{ color: 'rgb(62, 100, 176)', fontSize: '44px', marginBottom: '20px', marginTop: '20px'}}>Введите Новый пароль</h1>
          <input type="password" placeholder="Новый пароль" style={{marginBottom: '20px', marginTop: '20px', fontSize: '44px', width: '600px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0' }} />
          <button onClick={handleWorkSpheres} style={{marginBottom: '20px', marginTop: '20px', fontSize: '44px', width: '600px', backgroundColor: '#3E64B0', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Сменить пароль</button>
          </div>
      </div>
    )
}