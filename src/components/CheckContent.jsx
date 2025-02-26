import './Check.css'
import checkImage from '../assets/image.png'
import React, {useEffect, useState} from 'react';
import clickSound  from '../assets/click-sound.mp3';
export function CheckContent() {
  useEffect(() => {
    document.title = 'Страница создания расписания';
  }, []);

  const [director, setDirector] = useState('');
  const [directorYMR, setDirectorYMR] = useState('');
  const [directorYR, setDirectorYR] = useState('');
  const [popova, setPopova] = useState('');
  const [year, setYear] = useState('');
  const [date_s, setDate_s] = useState('');
  const [date_do, setDate_do] = useState('');
  const audio = new Audio(clickSound); 

  const playSound = () => {
    audio.currentTime = 0; 
    audio.play(); 
  };

  const handleDirector = (e) => {
    // setDirector(e.target.value);
  }
  const handleDirectorYMR = (e) => {
    // setDirectorYMR(e.target.value);
  }
  const handleDirectorYR = (e) => {
    // setDirectorYR(e.target.value);
  }
  const handlePopova = (e) => {
    // setPopova(e.target.value);
  }
  const handleDateS = (e) => {
    // setDate_s(e.target.value);
  }
  const handleDateDo= (e) => {
    // setDate_do(e.target.value);
  }
  const handleYearChange = (e) => {
    // setYear(e.target.value);
  }

  const handleFinal = (e) => {
 
  }

  const handleImportTeacher = (e) => {
 
  }

  const handleImportGroup= (e) => {
 
  }

  const handleImportVipiski= (e) => {
 
  }


  return (
    <main className="check-container">
  
  
      <p className="check-thank-you">Необходимо заполнить поля!</p>
  
  
<div className="fields-container">
      <div className="field-group">
        <div className="field-column">
          <p className="check-texts">ФИО действующего директора</p>
          <p className="check-texts">ФИО зам. директора по УМР</p>
          <p className="check-texts">ФИО зам. директора по УР</p>
          <p className="check-texts">ФИО начальника учебно-методического отдела</p>
          <p className="check-texts">Учебный год расписания</p>
        </div>

        <div className="field-column">
          <input type="text"  className="check-input" placeholder="Введите данные" onChange={handleDirector} />
          <input type="text" className="check-input" placeholder="Введите данные" onChange={handleDirectorYMR} />
          <input type="text" className="check-input" placeholder="Введите данные" onChange={handleDirectorYR} />
          <input type="text" className="check-input" placeholder="Введите данные" onChange={handlePopova} />
          <input type="text" className="check-input" placeholder="Введите данные" onChange={handleYearChange} />
        </div>
      </div>

      <div className="field-group">
        <div className="field-column">
        <p className="check-texts">Срок действия расписания с</p>
        <p className="check-texts">Срок действия расписания до</p>
          
        </div>

        <div className="field-column">
        <input type="text" className="check-input" placeholder="Введите данные" onChange={handleDateS} />
        <input type="text" className="check-input" placeholder="Введите данные" onChange={handleDateDo} />
        <div className="button-container">
        <button className="check-button" onClick={playSound} onChange={handleImportTeacher}>Импорт ограничений преподавателя</button>
        <button className="check-button23" onClick={playSound} onChange={handleImportGroup}>Импорт ограничений для групп</button>
        <button className="check-button23" onClick={playSound} onChange={handleImportVipiski}>Импорт выписок</button>
      </div>
        </div>
      </div>
    </div>

 <div className="field-column">
    <p className="check-texts">Ознакомиться с результатом можно, нажав на кнопку:</p>
    <div className="button-container">
      <button className="check-button-final" onClick={playSound} onChange={handleFinal}>Получить результат работы программы</button>
    </div>
  </div>
  <p className="check-thank-you">Инструкция к применению</p>
  
  <img src={checkImage} alt="Check Image" className="check-image" />
    </main>
  );
}

