import { z } from "zod";

export const BrakeSchema = z.object({
  start_braking: z.date(),
  stop_braking: z.date(),
  speed: z.number(),
  distance: z.number(),
  duration_braking: z.number(),
  category: z.string(),
});

// Type otomatis dari schema
export type BrakeType = z.infer<typeof BrakeSchema>;

export const RawBrakeSchema = z.object({
  id: z.number().optional(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  speed: z.number().nullable().optional(),
  altitude: z.number().nullable(),
  hdop: z.number().nullable().optional(),
  satellites: z.number().nullable().optional(),
  timestamp: z.date().nullable().optional(),
  is_rem: z.number().nullable().optional(),
});

export type RawBrakeType = z.infer<typeof RawBrakeSchema>;
