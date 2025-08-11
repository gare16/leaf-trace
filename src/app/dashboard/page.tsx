import { getDate } from "@/lib/date";
import DashboardClient from "@/components/dashboard-client";
import { MQTTProvider } from "../../context/mqtt-context";
import { getData } from "@/services/brake-service";

export default async function DashboardPage() {
  const { date } = getDate();
  const dataSpesific = await getData(date);
  return (
    <MQTTProvider>
      <DashboardClient messages={dataSpesific} />
    </MQTTProvider>
  );
}
