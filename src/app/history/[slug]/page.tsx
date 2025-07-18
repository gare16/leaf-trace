import HistoryClientWrapper from "@/components/error-fetch";
import { TableHistory } from "@/components/table-history";
import { Label } from "@/components/ui/label";
import { getBrakingEvents } from "@/services/brake-service";
import { BrakeType } from "@/types/brakes";

export const revalidate = 60;

export default async function SlugHistoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  let data: BrakeType[] = [];
  let error = "";

  try {
    data = await getBrakingEvents(slug);
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = "Got an Error.";
    }
  }

  return (
    <>
      <HistoryClientWrapper error={error} />
      <Label className="text-2xl font-extrabold ms-2 py-4">
        Detail Data History
      </Label>
      <TableHistory brakes={data} />
    </>
  );
}
