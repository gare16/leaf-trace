import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatDate } from "@/lib/date";

export function HistoryCard({ data, idx }: { data: string; idx: number }) {
  const formatted = formatDate(data);
  return (
    <Link
      className="w-full max-w-4xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-muted/30 backdrop-blur"
      href={`/history/${data}`}
    >
      <Card className="">
        <CardHeader className="flex flex-col">
          <CardTitle className="flex items-center gap-2">
            🚗 Track {idx + 1}
          </CardTitle>
          <span className="text-sm text-foreground opacity-60">
            {formatted}
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-2">
            Detail Data Braking.
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
