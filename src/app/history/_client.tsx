"use client";

import { useMemo, useState } from "react";
import { HistoryCard } from "@/components/history-card";

type Props = {
  dates: string[];
};

export default function HistoryClient({ dates }: Props) {
  const [query, setQuery] = useState("");

  const filteredDates = useMemo(() => {
    return dates.filter((date) => date.includes(query));
  }, [query, dates]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between items-center w-full max-w-4xl">
        <h1 className="text-2xl font-bold">History</h1>
        <input
          type="text"
          placeholder="Cari tanggal (yyyy-mm-dd)"
          className="border px-3 py-1 rounded-md text-sm w-64"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filteredDates.length > 0 ? (
        filteredDates.map((date, idx) => (
          <HistoryCard data={date} idx={idx} key={idx} />
        ))
      ) : (
        <p className="text-gray-500 mt-4">Nggak ada data cocok.</p>
      )}
    </div>
  );
}
