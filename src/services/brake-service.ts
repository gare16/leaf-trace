"use server";

import { prisma } from "@/lib/prisma";
import { BrakeSchema } from "@/types/brakes";

export async function getData(date: string): Promise<BrakeSchema[]> {
  if (!date) {
    throw new Error("Date is required");
  }

  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  try {
    const result = await prisma.gps_data.findMany({
      where: {
        timestamp: {
          gte: start,
          lt: end,
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getUniqueDates() {
  const data = await prisma.gps_data.findMany({
    select: {
      timestamp: true,
    },
    orderBy: {
      timestamp: "desc",
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
