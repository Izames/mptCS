import './footer.css'
import { useNavigate } from 'react-router-dom'; 
export function Footer() {
  const navigate = useNavigate();
  const handleAuthorization = () => {
      navigate('/'); 
    };
    return (
      <footer>
      <div style={{ backgroundColor: 'rgb(62, 100, 176)', fontSize: '14px', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleAuthorization} style={{fontSize: '34px', width: '180px', padding: '25px', backgroundColor: 'white', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '30px', cursor: 'pointer'}}>Выйти</button>
        <p>Создатели: Мельниченко Игорь Дмитриевич и Зюзичев Иван Сергеевич Год выпуска: 2024 </p>
      </div>
      </footer>
    );
  }