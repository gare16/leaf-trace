import mqtt from "mqtt";

export const mqttClient = mqtt.connect("ws://20.66.101.230/:8083/mqtt");

mqttClient.on("connect", () => {
  console.log("Connected to EMQX");
});
