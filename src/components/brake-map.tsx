"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { RawBrakeType } from "@/types/brakes";

type MarkerType = {
  id: number;
  lat: number;
  lng: number;
};

type BrakeMapProps = {
  message?: RawBrakeType;
};

const BrakeMap: React.FC<BrakeMapProps> = ({ message }) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [center, setCenter] = useState<[number, number]>([-6.9, 107.6]);

  useEffect(() => {
    if (message && message.latitude !== null && message.longitude !== null) {
      const newMarker: MarkerType = {
        id: message.id!,
        lat: message.latitude,
        lng: message.longitude,
      };

      setMarkers((prev) => {
        if (prev.find((m) => m.id === newMarker.id)) return prev;
        return [...prev, newMarker];
      });

      setCenter([newMarker.lat, newMarker.lng]);
    }
  }, [message]);

  return (
    <>
      <h2 className="text-2xl font-extrabold ps-2 py-2">Monitoring</h2>
      <MapContainer
        center={center}
        zoom={19}
        style={{ height: "80vh" }}
        key={center.toString()} // agar map update saat center berubah
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {markers.map((marker) => (
          <CircleMarker
            key={marker.id}
            center={[marker.lat, marker.lng]}
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
