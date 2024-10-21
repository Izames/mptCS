import './Check.css'
import React, { useEffect } from 'react';
export function CheckContent() {
  useEffect(() => {
    document.title = 'Страница проверки накладок';
  }, []);

  return (
    <main className="check-container">
<input type="text" placeholder="Почта" className="check-input" />
<input type="password" placeholder="Пароль" className="check-input" />
<button className="check-button">Добавить пользователя</button>
<div className="addbtn">
  <p className="check-text">Введите текущий учебный год и информацию:</p>
  <input type="text" placeholder="Пример: 2023/2024" className="check-input" />
  <input type="text" placeholder="Пример: номер телефона" className="check-phone-input" />
  <button className="check-button">Добавить информацию</button>
</div>
<div>
  <p className="check-text">Выбор файла (типа .xlsx):</p>
  <button className="check-button2">Импорт таблиц расписания занятий</button>
  <p className="check-text">Выбор файла (типа .xlsx):</p>
  <button className="check-button2">Импорт таблиц преподавателей</button>
</div>
<div>
  <p className="check-text">Полное расписание:</p>
  <button className="check-button">Экспорт полного расписания</button>
  <p className="check-text">Индивидуальное расписание:</p>
  <button className="check-button">Экспорт индивидуальных расписаний</button>
</div>

    </main>
  );
}

