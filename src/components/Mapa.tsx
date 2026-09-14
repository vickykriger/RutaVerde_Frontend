import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import api from '../../api.js';
import type { Ecorregion } from '../data/ecorregiones';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';

const limitesAmericas = L.latLngBounds(
  L.latLng(-58, -170),
  L.latLng(75, -25)
);

const FitBoundsHelper = ({ geoJsonData }: { geoJsonData: any }) => {
  const map = useMap();

  useEffect(() => {
    if (geoJsonData) {
      const layer = L.geoJSON(geoJsonData);
      map.fitBounds(layer.getBounds());
    }
  }, [geoJsonData, map]);

  return null;
};
interface MapaProps {
  onSeleccionarRegion?: (region: Ecorregion) => void;
}

const MapaComponente: React.FC<MapaProps> = ({ onSeleccionarRegion }) => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    const cargarEcorregiones = async () => {
      try {
        const respuesta = await api.get('/api/ecorregiones');
        setGeoJsonData(respuesta.data);
      } catch (error) {
        console.error('Error al solicitar ecorregiones al Backend:', error);
      }
    };

    cargarEcorregiones();
  }, []);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        console.log('🔍 PROPIEDADES REALES DEL MAPA:', feature.properties);
        if (onSeleccionarRegion) {
          onSeleccionarRegion(feature.properties);
        }
      },
    });
  };

  const estiloEcorregiones = (feature: any) => {
    const cantidadContribuciones =
      feature?.properties?.contribuciones ||
      feature?.properties?.total_contribuciones ||
      0;

    return {
      color: '#1e293b',                                    
      weight: 1.2,                                      
      fillColor: obtenerColorPorContribuciones(cantidadContribuciones), 
      fillOpacity: 0.7,                                  
    };
  };
  const obtenerColorPorContribuciones = (contribuciones: number = 0): string => {
    if (contribuciones >= 14) return '#21330A';
    if (contribuciones >= 13) return '#324E11';
    if (contribuciones >= 12) return '#416718';
    if (contribuciones >= 11) return '#487212';
    if (contribuciones >= 10) return '#568715';
    if (contribuciones >= 9) return '#639C19';
    if (contribuciones >= 8) return '#72B11D';
    if (contribuciones >= 7) return '#8FBE3C';
    if (contribuciones >= 6) return '#A0C958';
    if (contribuciones >= 5) return '#AFD374';
    if (contribuciones >= 4) return '#BDDC8F';
    if (contribuciones >= 3) return '#CCE5AA';
    if (contribuciones >= 2) return '#DCEDC4';
    if (contribuciones >= 1) return '#EAF4DC';
    return '#F5FAF0';
  };
  return (
    <div className="mapa-wrapper">
      <MapContainer
        center={[-15, -60]}
        zoom={3}
        minZoom={3}
        maxBounds={limitesAmericas}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          bounds={limitesAmericas}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {geoJsonData && (
          <>
            <GeoJSON
              key={JSON.stringify(geoJsonData.length)}
              data={geoJsonData}
              style={estiloEcorregiones}
              onEachFeature={onEachFeature}
            />
            <FitBoundsHelper geoJsonData={geoJsonData} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapaComponente;