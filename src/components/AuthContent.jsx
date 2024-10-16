
import { useNavigate } from 'react-router-dom'; 
import React, { useEffect} from 'react';
export function AuthContent() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Страница авторизации';
  }, []);
  const handleForgotPassword = () => {
    navigate('/Post'); 
  };
  const handleWorkSphere = () => {
    navigate('/Checkout'); 
  };

    return(
    
        <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'rgb(62, 100, 176)', fontSize: '44px', marginBottom: '20px', marginTop: '20px'}}>Авторизация</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <input type="text" placeholder="Почта" style={{ marginTop: '50px', fontSize: '44px', width: '600px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0' }} />
          <input type="password" placeholder="Пароль" style={{marginTop: '50px', fontSize: '44px', width: '600px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0' }} />
          <button onClick={handleWorkSphere} style={{marginBottom: '20px', marginTop: '20px', fontSize: '44px', width: '600px', backgroundColor: '#3E64B0', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Авторизоваться</button>
          <button onClick={handleForgotPassword}  style={{marginBottom: '20px', marginTop: '20px', fontSize: '28px', width: '600px', backgroundColor: 'white',  color: '#3E64B0', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer', textDecoration: 'underline' }}>Забыли пароль?</button>
        </div>
      </div>
    )
}