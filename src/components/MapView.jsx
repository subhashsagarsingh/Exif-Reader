import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ lat, lon }) => {
  if (!lat || !lon) return null;

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden my-4">
      <MapContainer center={[lat, lon]} zoom={13} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}>
          <Popup>Photo captured here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
