import { getBrakingEvents } from "@/services/brake-service";
import { MQTTProvider } from "../context/mqtt-context";
import { DashboardClient } from "@/components/dashboard-client";

export default async function DashboardPage() {
  const data = await getBrakingEvents("LIMIT 1", "");

  return (
    <MQTTProvider>
      <DashboardClient historyData={data} />
    </MQTTProvider>
  );
}
