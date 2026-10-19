import axios from 'axios';

export interface Ecorregion {
  id: number;
  nombre: string;
  paises: string;
  resumen: string;
  bioma: string;
  contribuciones: number;
}

export const obtenerEcorregiones = async () => {
  try {
    // 1. Usamos la URL con una o dos 'r' según tu backend
    const res = await axios.get('http://localhost:5000/api/ecorregiones');
    
    // 2. Si el backend devuelve un objeto GeoJSON, extraemos el array 'features'
    //    Si devuelve un array directo, usamos res.data
    const datos = res.data;
    
    if (Array.isArray(datos)) {
      return datos;
    } else if (datos && Array.isArray(datos.features)) {
      return datos.features; // Extrae el array de características del GeoJSON
    }
    
    return []; // Retorna array vacío para evitar que .map rompa la interfaz
  } catch (error) {
    console.error("Error al obtener ecorregiones:", error);
    return [];
  }
};