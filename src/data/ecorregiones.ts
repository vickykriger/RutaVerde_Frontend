export interface Ecorregion {
  id: number;
  nombre: string;
  paises: string;
  resumen: string;
  bioma: string;
  contribuciones: number;
}

export async function obtenerEcorregiones(): Promise<Ecorregion[]> {
  try {
    const response = await fetch('http://localhost:5000/api/ecoregiones');
    
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((item: any, index: number) => ({
      id: item.id || item.id_region || index + 1,
      nombre: item.nombre || '',
      paises: item.paises || 'América Latina',
      resumen: item.resumen || item.descripcion || 'Sin descripción disponible.',
      bioma: item.bioma || 'Ecorregión',
      contribuciones: item.contribuciones || 0
    }));
  } catch (error) {
    console.error('❌ Error al conectar con /api/ecoregiones:', error);
    return [];
  }
}