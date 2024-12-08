import './Check.css'
import React, {useEffect, useState} from 'react';
export function CheckContent() {
  useEffect(() => {
    document.title = 'Страница проверки накладок';
  }, []);
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState(false);

  const [schedules, setSchedules] = useState([]);
  const [teachers, setTeachers] = useState(null);
  const [colors, setColors] = useState([]);
  const [places, setPlaces] = useState([]);
  const [color, setColor] = useState('#1A1A1A');
  const [place, setPlace] = useState('');


  const handleColorChange = (e) => {
    setColor(e.target.value);
  }
  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  }

  const addPlaceColor = () => {
    if (place !== '') {
      alert(`добавлено ${place} ${color}`)
      places.push(place);
      setPlaces(places);
      setPlace('');
      colors.push(color);
      setColors(colors);
      setColor('#1A1A1A')
    }
    else {
      alert('выберите место')
    }
  }
  const handleSchedulesFiles = (event) => {
    setSchedules(Array.from(event.target.files));
  };

  const handleTeacherFile = (event) => {
    setTeachers(event.target.files[0]);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  }
  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordError(password.length<6)
  }

  const handleWorkSphere = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      if (response.ok) {
        alert('пользователь добавлен')
      } else {
        if (response.status === 400) {
          alert(`неверные данные для нового пользователя/пользователь уже существует.`);
        } else {
          alert(`Неизвестная ошибка.`);
        }
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  const handleCheck = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    schedules.forEach((file) => formData.append('schedules', file));
    formData.append('teachers', teachers);
    formData.append('year', '2023/2024');
    colors.forEach((color) => formData.append('colors', color));
    places.forEach((place) => formData.append('places', place));

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('Токен не найден!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/schedule/CheckSchedule', {
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

      const blob = await response.blob(); // Получаем ответ как blob
      const url = URL.createObjectURL(blob); // Создаём URL из blob

      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule.zip'; // Имя файла для скачивания
      a.style.display = 'none'; // Скрываем ссылку
      document.body.appendChild(a);
      a.click(); // Программный клик на ссылку
      document.body.removeChild(a); // Удаляем ссылку после скачивания
      URL.revokeObjectURL(url); // Освобождаем URL

    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Ошибка сети!');
    }
  };

  return (
      <main className="check-container">
        <input type="text" placeholder="Почта: (mpt@mpt.ru)"
               className={`check-input ${EmailError ? 'border-red-500 border-[2px]' : ''}`}
               value={Email}
               onChange={handleEmailChange}/>
        <input type="password" placeholder="Пароль: (123mpt)"
               className={`check-input ${PasswordError ? 'border-red-500 border-[2px]' : ''}`}
               value={Password}
               onChange={handleChangePassword}/>
        <button className="check-button" onClick={handleWorkSphere}>Добавить пользователя</button>

        <input type="text" placeholder="Корпус: (Нахимовский)" value={place} className="check-input"
               onChange={handlePlaceChange}/>
        <input type="color" className="check-input" value={color} onChange={handleColorChange}/>
        <button className="check-button" onClick={addPlaceColor}>Добавить корпус в систему</button>


        <div className="addbtn">
          <p className="check-text">Введите текущий учебный год и информацию:</p>
          <input type="text" placeholder="Учебный год: (2023/2024)" className="check-input"/>
        </div>
        <div>
          <p className="check-text">Выбор файла (типа .xlsx):</p>
          <input type='file' multiple={true} onChange={handleSchedulesFiles}/>
          <p className="check-text">Выбор файла (типа .xlsx):</p>
          <input type="file" onChange={handleTeacherFile}/>
        </div>
        <div>
          <p className="check-text">Проверить верность расписания:</p>
          <button className="check-button" onClick={handleCheck}>Отправить информацию для проверки</button>
        </div>
      </main>
  );
}

