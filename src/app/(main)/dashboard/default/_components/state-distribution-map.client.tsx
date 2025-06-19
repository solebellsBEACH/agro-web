import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});


type StateMapData = {
  name: string;
  value: number;
  lat: number;
  lng: number;
};


function StateDistributionMap({ data }: { data: StateMapData[] }) {
  return (
    <MapContainer
      center={[-14.235, -51.9253]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map(({ name, value, lat, lng }) => (
        <Marker key={name} position={[lat, lng]}>
          <Popup>
            {name}: {value.toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default StateDistributionMap;