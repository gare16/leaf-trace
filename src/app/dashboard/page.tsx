import { getDate } from "@/lib/date";
import { MQTTProvider } from "../../context/mqtt-context";
import { getData } from "@/services/brake-service";
import DashboardClient from "@/components/dashboard-client";

export default async function DashboardPage() {
  const { date } = getDate();
  const dataSpesific = await getData(date);
  console.log(date);
  return (
    <MQTTProvider>
      <DashboardClient messages={dataSpesific} />
    </MQTTProvider>
  );
}
