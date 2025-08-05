import { ModalMap } from "@/components/modal-map";
import { TableHistory } from "@/components/table-history";
import { Label } from "@/components/ui/label";
import { getData } from "@/services/brake-service";

export const revalidate = 60;

export default async function SlugHistoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(slug);

  return (
    <>
      <div className="w-full flex justify-between mx-5">
        <Label className="text-2xl font-extrabold ms-2 py-4">
          Detail Data History
        </Label>
        <ModalMap data={data} />
      </div>
      <TableHistory brakes={data} />
    </>
  );
}
