import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import PerfilUser from '../components/PerfilUser';

const Perfil: React.FC = () => {
  const { isLoggedIn } = useAuth();

  // Si no está logueado, redirigir a /ingresar
  if (!isLoggedIn) {
    return <Navigate to="/ingresar" replace />;
  }

  return (
    <>
      <Header />
      <PerfilUser />
    </>
  );
};

export default Perfil;
