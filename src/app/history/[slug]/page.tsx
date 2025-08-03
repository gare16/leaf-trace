import HistoryClientWrapper from "@/components/error-fetch";
import { ModalMap } from "@/components/modal-map";
import { TableHistory } from "@/components/table-history";
import { Label } from "@/components/ui/label";
import { getData } from "@/services/brake-service";
import { BrakeSchema } from "@/types/brakes";

export const revalidate = 60;

export default async function SlugHistoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  let data: BrakeSchema[] = [];
  let error = "";

  try {
    data = await getData(slug);
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
      <div className="w-ful flex justify-between mx-5">
        <Label className="text-2xl font-extrabold ms-2 py-4">
          Detail Data History
        </Label>
        <ModalMap data={data} />
      </div>
      <TableHistory brakes={data} />
    </>
  );
}
