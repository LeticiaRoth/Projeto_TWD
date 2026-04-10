import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProvedorJogo } from './context/ContextoJogo';
import Home from './pages/Home/Home';
import Mapa from './pages/Mapa/Mapa';
import Quiz from './pages/Quiz/Quiz';
import Inventario from './pages/Inventario/Inventario';
import Puzzle from './pages/Puzzle/Puzzle';
import './index.css';

function App() {
  return (
    <ProvedorJogo>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/puzzle" element={<Puzzle />} />
        </Routes>
      </BrowserRouter>
    </ProvedorJogo>
  );
}

export default App;