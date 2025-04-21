import './Check.css'
import checkImage from '../assets/image.png'
import React, {useEffect, useState} from 'react';
import clickSound from '../assets/click-sound.mp3';

export function CheckContent() {
  useEffect(() => {
    document.title = 'Страница создания расписания';
  }, []);

  const [director, setDirector] = useState('');
  const [years, setYears] = useState('');
  const [directorYR, setDirectorYR] = useState('');
  const [md, setMD] = useState('');
  const [currentYear, setYear] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [group, setGroup] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [extracts, setExtracts] = useState([]);
  const audio = new Audio(clickSound);

  const playSound = () => {
    audio.currentTime = 0;
    audio.play();
  };

  const handleDirector = (e) => setDirector(e.target.value);
  const handleYears = (e) => setYears(e.target.value);
  const handleDirectorYR = (e) => setDirectorYR(e.target.value);
  const handleMD = (e) => setMD(e.target.value);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const handleImportTeacher = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeacher(file);
    }
    e.target.value = ''; // Сброс input для возможности повторной загрузки того же файла
  }

  const handleImportGroup = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroup(file);
    }
    e.target.value = '';
  }

  const handleImportExtracts = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setExtracts(prev => [...prev, ...files]);
    }
    e.target.value = '';
  }

  const removeTeacherFile = () => {
    setTeacher(null);
  }

  const removeGroupFile = () => {
    setGroup(null);
  }

  const removeExtractFile = (index) => {
    setExtracts(prev => prev.filter((_, i) => i !== index));
  }

  const handleFinal = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('director', director);
    formData.append('deputy_director_ur', directorYR);
    formData.append('methodological_department', md);
    formData.append('current_year', currentYear);
    formData.append('validity_term', startDate);
    formData.append('end_date', endDate);
    formData.append('years', years);
    if (teacher) formData.append('teacher', teacher);
    if (group) formData.append('group', group);

    extracts.forEach((file) => formData.append('extracts', file));

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('Токен не найден!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8091/schedule/generateSchedule', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(`Ошибка отправки данных: ${response.status} - ${errorData.error || 'Неизвестная ошибка'}`);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule.zip';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Ошибка сети!');
    }
  }

  return (
      <main className="check-container">
        <p className="check-thank-you">Необходимо заполнить поля!</p>

        <div className="fields-container">
          <div className="field-group">
            <div className="field-column">
              <p className="check-texts">ФИО действующего директора</p>
              <p className="check-texts">ФИО зам. директора по УР</p>
              <p className="check-texts">ФИО начальника учебно-методического отдела</p>
              <p className="check-texts">Учебный год расписания</p>
              <p className="check-texts">Год утверждения расписания</p>
            </div>

            <div className="field-column">
              <input type="text" className="check-input" placeholder="Введите данные" onChange={handleDirector}
                     value={director}/>

              <input type="text" className="check-input" placeholder="Введите данные" onChange={handleDirectorYR}
                     value={directorYR}/>
              <input type="text" className="check-input" placeholder="Введите данные" onChange={handleMD} value={md}/>
              <input type="text" className="check-input" placeholder="Введите данные" onChange={handleYears} value={years}/>
              <input type="text" className="check-input" placeholder="Введите данные" onChange={handleYearChange}
                     value={currentYear}/>
            </div>
          </div>

          <div className="field-group">
            <div className="field-column">
              <p className="check-texts">Срок действия расписания с</p>
              <p className="check-texts">Срок действия расписания до</p>
            </div>

            <div className="field-column">
              <input type="text" className="check-input" placeholder="Введите данные" onChange={handleStartDate}
                     value={startDate}/>
              <input type="text" className="check-input" placeholder="Введите данные" onChange={handleEndDate}
                     value={endDate}/>
              <div className="button-container">
                <label className="check-button">
                  Импорт ограничений преподавателя
                  <input
                      type="file"
                      style={{display: 'none'}}
                      onChange={(e) => {
                        playSound();
                        handleImportTeacher(e);
                      }}
                  />
                </label>
                {teacher && (
                    <div className="file-info">
                      <span>{teacher.name}</span>
                      <button onClick={removeTeacherFile} className="remove-file-btn">×</button>
                    </div>
                )}

                <label className="check-button23">
                  Импорт ограничений для групп
                  <input
                      type="file"
                      style={{display: 'none'}}
                      onChange={(e) => {
                        playSound();
                        handleImportGroup(e);
                      }}
                  />
                </label>
                {group && (
                    <div className="file-info">
                      <span>{group.name}</span>
                      <button onClick={removeGroupFile} className="remove-file-btn">×</button>
                    </div>
                )}

                <label className="check-button23">
                  Импорт выписок
                  <input
                      type="file"
                      style={{display: 'none'}}
                      multiple
                      onChange={(e) => {
                        playSound();
                        handleImportExtracts(e);
                      }}
                  />
                </label>
                {extracts.length > 0 && (
                    <div className="extracts-list">
                      {extracts.map((file, index) => (
                          <div key={index} className="file-info">
                            <span>{file.name}</span>
                            <button onClick={() => removeExtractFile(index)} className="remove-file-btn">×</button>
                          </div>
                      ))}
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="field-column">
          <p className="check-texts">Ознакомиться с результатом можно, нажав на кнопку:</p>
          <div className="button-container">
            <button className="check-button-final" onClick={(e) => {
              playSound();
              handleFinal(e);
            }}>Получить результат работы программы
            </button>
          </div>
        </div>
        <p className="check-thank-you">Инструкция к применению</p>

        <img src={checkImage} alt="Check Image" className="check-image"/>
      </main>
  );
}