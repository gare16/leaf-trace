import { getUniqueDates } from "@/services/brake-service";
import HistoryClient from "./_client";

export default async function HistoryPage() {
  const dates = await getUniqueDates();
  console.log(dates);
  return <HistoryClient dates={dates} />;
}
