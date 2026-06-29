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
import LTtit from './components/LTtit';
import LineaTiempo from './components/LineaTiempo';
import PFtit from './components/PFtit';
import PregFre from './components/PregFre';
import PregFre2 from './components/PregFre2';
import PregFre3 from './components/PregFre3';
import LT2 from './components/LT2';
import LT3 from './components/LT3';
import LT4 from './components/LT4';


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
          <InicioHistoria/>
          <Estadisticas/>
          <Historia/>
          <LTtit/>
          <LineaTiempo/>
          <LT2/>
          <LT3/>
          <LT4/>
          <PFtit/>
          <PregFre/>
          <PregFre2/>
          <PregFre3/>
  

        </>
      )}
      <Footer/>
    </>
  )
}

export default App;
