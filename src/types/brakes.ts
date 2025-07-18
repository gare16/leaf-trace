import { z } from "zod";

export const BrakeSchema = z.object({
  id: z.number(),
  speed_1: z.number().nullable(), // kecepatan awal (m/s)
  speed_2: z.number().nullable(), // kecepatan akhir (m/s)
  latitude_1: z.number(),
  latitude_2: z.number(),
  longitude_1: z.number(),
  longitude_2: z.number(),
  altitude_1: z.number().nullable(), // ketinggian awal (m)
  altitude_2: z.number().nullable(), // ketinggian akhir (m)
  time_1: z.string().datetime(), // timestamp awal
  time_2: z.string().datetime(), // timestamp akhir
  duration_brake: z.number(), // durasi pengereman (detik)
  deceleration: z.number().nullable(), // perlambatan (m/s^2)
  delta_altitude: z.number().nullable(), // perubahan ketinggian (m)
  delta_speed: z.number().nullable(),
  road_condition: z.enum(["Menanjak", "Menurun", "Mendatar"]),
  category_brake: z.enum(["Hijau", "Kuning", "Merah"]),
});

// Type otomatis dari schema
export type BrakeType = z.infer<typeof BrakeSchema>;

export const RawBrakeSchema = z.object({
  id: z.number().optional(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  speed: z.number().nullable().optional(),
  altitude: z.number().nullable().optional(),
  hdop: z.number().nullable().optional(),
  satellites: z.number().nullable().optional(),
  timestamp: z.date().nullable().optional(),
  is_rem: z.number().nullable().optional(),
});

export type RawBrakeType = z.infer<typeof RawBrakeSchema>;
