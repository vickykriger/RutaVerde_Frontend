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

function App() {

  return (
    <>
      <Header/>
      <Inicio/>
      <Estadisticas/>
      <HistoLand/>
      <CarruNoti/>
      <MapaInteractivo/>
      <Footer/>
    </>
  )
}

export default App;
