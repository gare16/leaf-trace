import { RawBrakeType } from "@/types/brakes";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  data: RawBrakeType | undefined;
};

export function DataGeospasial({ data }: Props) {
  return (
    <div className="w-full flex justify-start items-center px-2 gap-4 py-4">
      <div>
        <Label className="text-2xl font-extrabold py-3">Latitude</Label>
        <Input defaultValue={data?.latitude ?? ""} readOnly />
      </div>
      <div>
        <Label className="text-2xl font-extrabold py-3">Longitude</Label>
        <Input defaultValue={data?.longitude ?? ""} readOnly />
      </div>
      <div>
        <Label className="text-2xl font-extrabold py-3">Altitude</Label>
        <Input defaultValue={data?.altitude ?? ""} readOnly />
      </div>
    </div>
  );
}
