"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import mqtt from "mqtt";
import { RawBrakeType } from "@/types/brakes";

type MQTTContextType = {
  client: mqtt.MqttClient | null;
  messages: RawBrakeType | undefined;
};

const MQTTContext = createContext<MQTTContextType>({
  client: null,
  messages: undefined,
});

export const MQTTProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<RawBrakeType>();
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_WS!);
    const topic = process.env.NEXT_PUBLIC_TOPIC_MQTT!;
    clientRef.current = client;

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker");
      client.subscribe(topic);
    });

    client.on("message", (_topic, message) => {
      try {
        const parsed: RawBrakeType = JSON.parse(message.toString());
        setMessages(parsed);
      } catch (error) {
        console.error("❌ Invalid message:", error);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <MQTTContext.Provider value={{ client: clientRef.current, messages }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => useContext(MQTTContext);
