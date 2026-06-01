import { useState } from 'react'
import Header from './components/Header'
import RegistroForm from './components/RegistroForm';
import Footer from './components/Footer';
import InicioForm from './components/InicioForm';
import Inicio from './components/Inicio';
import Estadisticas from './components/Estadisticas';
import HistoLand from './components/HistoLand';

function App() {

  return (
    <>
      <Header/>
      <Inicio/>
      <Estadisticas/>
      <HistoLand/>
      <Footer/>
    </>
  )
}

export default App;
