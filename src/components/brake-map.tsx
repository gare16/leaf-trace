"use client";

import { BrakeSchema } from "@/types/brakes";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

type BrakeMapProps = {
  message?: BrakeSchema[];
};

const BrakeMap: React.FC<BrakeMapProps> = ({ message }) => {
  const [center, setCenter] = useState<[number, number]>([-6.9, 107.6]);

  useEffect(() => {
    if (message && message.length > 0) {
      const lat = message[0].latitude;
      const lng = message[0].longitude;

      if (lat !== null && lng !== null) {
        setCenter([lat, lng]);
      }
    }
  }, [message]);

  return (
    <>
      <MapContainer
        center={center}
        zoom={19}
        style={{ height: "50vh", zIndex: 1 }}
        key={center.toString()}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {message?.map((marker) => {
          return (
            <CircleMarker
              key={marker.id}
              center={[marker.latitude, marker.longitude]}
              radius={6}
              pathOptions={{
                color: "white",
                fillColor:
                  marker.kategori === "Hijau"
                    ? "green"
                    : marker.kategori === "Merah"
                    ? "red"
                    : "yellow",
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <h1>Kategory: {marker.kategori}</h1>
                <h1>Kondisi: {marker.road_condition}</h1>
                <h1>Rata Rata Perlambatan: {marker.avg_deceleration_mps2}</h1>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default BrakeMap;
