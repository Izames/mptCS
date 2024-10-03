import './App.css'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import {AuthorizationPage} from "./pages/AuthorizationPage.jsx";
import {CheckPage} from "./pages/CheckPage.jsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route index element={<AuthorizationPage/>} />
              <Route path="/Checkout" element={<CheckPage/>} /> {/*не забудь сделать обязательную проверку на авторизацию, чтобы нельзя было просто по пути зайти*/}
          </Routes>
      </Router>
  )
}

export default App
