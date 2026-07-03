
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Historia from './pages/Historia';
import Aportes from './pages/Aportes';
import InicioForm from './components/InicioForm';
import RegistroForm from './components/RegistroForm';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/aportes" element={<Aportes />} />
        <Route path="/ingresar" element={<InicioForm />} />
        <Route path="/registrarse" element={<RegistroForm />} />
        {/* agregáár /mapa y /noticias cuando esten armadas */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;