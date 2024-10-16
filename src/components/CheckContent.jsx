import React, { useEffect } from 'react';
export function CheckContent() {
    useEffect(() => {
      document.title = 'Страница проверки накладок';
    }, []);
    return (
        <>
        
 <main style={{marginLeft: '10px', marginRight: '10px', marginTop: '10px', marginBottom: '10px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', borderRadius: '30px'}}>
      <input type="text" placeholder="Почта" style={{ fontSize: '27px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0', width: '400px', height: '100px' }} />
      <input type="password" placeholder="Пароль" style={{ fontSize: '27px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0', width: '400px', height: '100px' }} />
      <button style={{fontSize: '27px', backgroundColor: 'rgb(75, 119, 206)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer', width: '400px', height: '100px' }}>Добавить пользователя</button>
      <p style={{fontSize: '27px',  width: '400px', height: '60px', textAlign: 'center'}}>Введите текущий учебный год и информацию:</p>
      <p style={{fontSize: '27px', width: '400px', height: '60px', textAlign: 'center'}}>Полное расписание:</p>
     <p style={{fontSize: '27px', width: '400px', height: '60px', textAlign: 'center'}}>Индивидуальное расписание:</p>
     <input type="text" placeholder="Пример: 2023/2024" style={{ fontSize: '27px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0', width: '400px', height: '100px' }} />
     <button style={{fontSize: '27px', backgroundColor: 'rgb(88, 166, 210)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer', width: '400px', height: '100px' }}>Экспорт полного расписания</button>
      <button style={{fontSize: '27px', backgroundColor: 'rgb(88, 166, 210)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer', width: '400px', height: '100px' }}>Экспорт индивидуальных расписаний</button>
      <input type="text" placeholder="Пример: номер телефона" style={{ fontSize: '27px', padding: '25px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f0f0f0', width: '400px', height: '100px' }} />
     <p style={{fontSize: '27px', width: '400px', height: '60px', textAlign: 'center'}}>Выбор файла:</p>
      <p style={{fontSize: '27px', width: '400px', height: '60px', textAlign: 'center'}}>Выбор файла:</p>
      <button style={{ fontSize: '27px', backgroundColor: 'rgb(75, 119, 206)',color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer', width: '400px', height: '100px'  }}>Добавить информацию</button>
      <button style={{ fontSize: '27px', backgroundColor: 'rgb(75, 119, 206)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer', width: '400px', height: '100px'   }}>Импорт таблиц расписания</button>
      <button style={{ fontSize: '27px', backgroundColor: 'rgb(75, 119, 206)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer', width: '400px', height: '100px'   }}>Импорт таблиц преподавателей</button>
    </main>
        </>
    )
}