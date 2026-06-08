import { useState } from 'react'
import Header from './components/Header'
import RegistroForm from './components/RegistroForm';
import Footer from './components/Footer';
import InicioForm from './components/InicioForm';
import Inicio from './components/Inicio';
import Estadisticas from './components/Estadisticas';
import HistoLand from './components/HistoLand';
import Noticia from './components/Noticia';
import CarruNoti from './components/CarruNoti';
import MapaInteractivo from './components/MapaInteractivo';
import SubirBaldosa from './components/SubirBaldosa';
import InicioHistoria from './components/InicioHistoria';
import Historia from './components/Historia';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleBackToHome = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleGoToLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleGoToRegister = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const isFormView = showLoginForm || showRegisterForm;

  return (
    <>
      <Header 
        onLoginClick={handleGoToLogin} 
        onRegisterClick={handleGoToRegister}
        onLogoClick={handleBackToHome}
        isFormView={isFormView}
      />
      {showLoginForm ? (
        <InicioForm onRegisterClick={handleGoToRegister} />
      ) : showRegisterForm ? (
        <RegistroForm onLoginClick={handleGoToLogin} />
      ) : (
        <>
          <Inicio/>
          <Estadisticas/>
          <HistoLand/>
          <CarruNoti/>
          <MapaInteractivo/>
        </>
      )}
      <Footer/>
    </>
  )
}

export default App;
