import './App.css'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import {AuthorizationPage} from "./pages/AuthorizationPage.jsx";
import {CheckPage} from "./pages/CheckPage.jsx";
import { ChangePage } from './pages/ChangePage.jsx';
import { PostPage } from './pages/PostPage.jsx';
function App() {
  return (
      <Router>
          <Routes>
              <Route index element={<AuthorizationPage/>} />
              <Route path="/Checkout" element={<CheckPage/>} />
              <Route path="/Change" element={<ChangePage/>} />
              <Route path="/Post" element={<PostPage/>} />
               </Routes>
      </Router>
  )
}

export default App
