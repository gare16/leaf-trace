import { getDate } from "@/lib/date";
import { MQTTProvider } from "../context/mqtt-context";
import { getBrakingEvents } from "@/services/brake-service";
import DashboardClient from "@/components/dashboard-client";

export default async function DashboardPage() {
  const { date } = getDate();
  const existed = "2025-07-17";
  const data = await getBrakingEvents(existed);
  return (
    <MQTTProvider>
      <DashboardClient messages={data} />
    </MQTTProvider>
  );
}
