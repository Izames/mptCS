import './footer.css'
import { useNavigate } from 'react-router-dom'; 
import AppStore from '../store/StatusUser';
import clickSound  from '../assets/click-sound.mp3';

export function Footer() {
  const audio = new Audio(clickSound); 

  const playSound = () => {
    audio.currentTime = 0; 
    audio.play(); 
  };
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  const handleAuthorization = () => {
    playSound();
    setAuth(false);
      navigate('/'); 
    };
    return (
      <footer>
      <div style={{ backgroundColor: '#89A8B2', fontSize: '14px', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleAuthorization} className="button-exit">Выйти</button>
        <p className="text-style">Создатели: Зюзичев Иван Сергеевич и Мельниченко Игорь Дмитриевич. Год выпуска: 2025 </p>
      </div>
      </footer>
    );
  }