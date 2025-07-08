import { HistoryCard } from "@/components/history-card";
import { getUniqueDates } from "@/services/brake-service";

export default async function HistoryPage() {
  const dates = await getUniqueDates();
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between items-center w-full max-w-4xl">
        <h1 className="text-2xl font-bold">History</h1>
        <div></div>
      </div>
      {dates.map((date, idx) => (
        <HistoryCard data={date} idx={idx} key={idx} />
      ))}
    </div>
  );
}
