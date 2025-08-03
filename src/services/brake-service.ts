"use server";

import { prisma } from "@/lib/prisma";
import { BrakeSchema } from "@/types/brakes";

export async function getData(date?: string): Promise<BrakeSchema[]> {
  if (!date) {
    throw new Error("Date is required");
  }

  try {
    const result = await prisma.$queryRaw<BrakeSchema[]>`
  SELECT *
  FROM gps_data
  WHERE timestamp::date = ${date}::date
`;
    return result;
  } catch (error) {
    console.error("Error fetching raw data:", error);
    throw error;
  }
}

export async function getUniqueDates() {
  const data = await prisma.gps_data.findMany({
    select: {
      timestamp: true,
    },
  });

  const dates = Array.from(
    new Set(
      data
        .filter((item) => item.timestamp !== null)
        .map((item) => item.timestamp!.toISOString().slice(0, 10))
    )
  );

  return dates;
}
