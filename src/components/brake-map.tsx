"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { BrakeType } from "@/types/brakes";

type BrakeMapProps = {
  message?: BrakeType[];
};

const BrakeMap: React.FC<BrakeMapProps> = ({ message }) => {
  const [center, setCenter] = useState<[number, number]>([-6.9, 107.6]);

  useEffect(() => {
    if (message && message.length > 0) {
      const lat = message[0].latitude_1;
      const lng = message[0].longitude_1;

      if (lat !== null && lng !== null) {
        setCenter([lat, lng]);
      }
    }
  }, [message]);

  return (
    <>
      <h2 className="text-2xl font-extrabold ps-2 py-2">Monitoring</h2>
      <MapContainer
        center={center}
        zoom={19}
        style={{ height: "65vh", zIndex: "1" }}
        key={center.toString()} // agar map update saat center berubah
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {message?.map((marker) => (
          <CircleMarker
            key={marker.id}
            center={[marker.latitude_1, marker.longitude_1]}
            radius={6}
            pathOptions={{
              color: "white",
              fillColor: "blue",
              fillOpacity: 0.8,
            }}
          >
            <Popup>Rem aktif! ID: {marker.id}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
};

export default BrakeMap;
