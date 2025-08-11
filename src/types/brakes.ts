import { z } from "zod";

export const DataSchema = z.object({
  id: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  road_condition: z.enum(["Mendatar", "Menanjak", "Menurun"]),
  brake_duration_ms: z.number().int().nonnegative(),
  start_speed_kmph: z.number().nonnegative(),
  end_speed_kmph: z.number().nonnegative(),
  avg_deceleration_mps2: z.number(),
  kategori: z.enum(["Hijau", "Kuning", "Merah"]),
  timestamp: z.date(),
});

export type BrakeSchema = z.infer<typeof DataSchema>;
