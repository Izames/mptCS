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
    return(
        <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'rgb(62, 100, 176)', fontSize: '44px', marginBottom: '80px', marginTop: "80px"}}>Введите почту для отправки кода</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <input type="text" placeholder="Почта" style={{marginBottom: '80px', marginTop: '20px', fontSize: '44px', width: '600px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0' }} />
          <button onClick={handleChange} style={{marginBottom: '80px', marginTop: '20px', fontSize: '44px', width: '600px', backgroundColor: '#3E64B0', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Отправить код</button>
          </div>
      </div>
    )
}