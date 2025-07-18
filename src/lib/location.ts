import { BrakeType } from "@/types/brakes";

export type LatLongOnly = Pick<
  BrakeType,
  "latitude_1" | "latitude_2" | "longitude_1" | "longitude_2"
>;

export function extractLatLong(data: BrakeType[]): LatLongOnly[] {
  return data.map((item) => ({
    latitude_1: item.latitude_1,
    latitude_2: item.latitude_2,
    longitude_1: item.longitude_1,
    longitude_2: item.longitude_2,
  }));
}
