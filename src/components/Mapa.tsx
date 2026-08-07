import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import api from '../../api.js';
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

const Mapa: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    const cargarEcorregiones = async () => {
      try {
        const respuesta = await api.get('/api/ecorregiones');
        console.log('¡Ecorregiones recibidas desde el Backend!', respuesta.data);
        setGeoJsonData(respuesta.data);
      } catch (error) {
        console.error('Error al solicitar ecorregiones al Backend:', error);
      }
    };

    cargarEcorregiones();
  }, []);

  const estiloEcorregiones = {
    color: '#2c3e50',
    weight: 1.5,
    fillColor: '#73b324',
    fillOpacity: 0.4,
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
            <GeoJSON data={geoJsonData} style={estiloEcorregiones} />
            <FitBoundsHelper geoJsonData={geoJsonData} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Mapa;