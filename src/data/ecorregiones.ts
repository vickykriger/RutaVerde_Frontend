import axios from 'axios';

export interface Ecorregion {
  id: string | number;
  nombre: string;
  paises: string;
  resumen: string;
  bioma: string;
  contribuciones: number;
}

export const obtenerEcorregiones = async (): Promise<Ecorregion[]> => {
  try {
    const res = await axios.get('http://localhost:5000/api/ecorregiones');
    const datos = res.data;

    // Si viene como array plano de la BD o mock
    if (Array.isArray(datos)) {
      return datos.map((item: any, index: number) => ({
        id: item.id || item.ECO_ID || index,
        nombre: item.nombre || item.NOMBRE || 'Ecorregión sin nombre',
        paises: item.paises || item.COUNTRY || 'América Latina',
        resumen: item.resumen || item.CORRIDOR || item.VEG || 'Sin descripción disponible.',
        bioma: item.bioma || item.BIOME || 'Ecorregión',
        contribuciones: item.contribuciones || item.arbolesPlantados || 0,
      }));
    } 
    
    // Si viene en formato GeoJSON (FeatureCollection)
    if (datos && Array.isArray(datos.features)) {
      return datos.features.map((feature: any, index: number) => {
        const props = feature.properties || {};
        return {
          id: props.ECO_ID || props.id || index,
          nombre: props.NOMBRE || props.ECO_NAME || props.nombre || 'Ecorregión sin nombre',
          paises: props.COUNTRY || props.paises || 'América Latina',
          resumen: props.CORRIDOR || props.VEG || props.resumen || 'Sin descripción disponible.',
          bioma: props.BIOME || props.bioma || 'Ecorregión',
          contribuciones: props.contribuciones || props.arbolesPlantados || 0,
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Error al obtener ecorregiones:", error);
    return [];
  }
};