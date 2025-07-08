"use server";

import { getDate } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import { BrakeType } from "@/types/brakes";

export async function getBrakingEvents(
  limit?: string,
  date?: string
): Promise<BrakeType[]> {
  const queryLimit = limit ?? "";
  let queryTimestamp = "";

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (date) {
    if (!dateRegex.test(date)) {
      return Promise.reject(
        new Error("Invalid date format. Expected YYYY-MM-DD.")
      );
    }
    queryTimestamp = `WHERE timestamp::date = '${date}'`;
  } else {
    queryTimestamp = "";
  }

  const query = `
    WITH flags AS (
      SELECT
        *,
        LAG(is_rem) OVER (ORDER BY timestamp) AS prev_is_rem
      FROM gps_data
      ${queryTimestamp}
    ),
    starts AS (
      SELECT
        id,
        timestamp AS start_braking
      FROM flags
      WHERE is_rem = 1 AND (prev_is_rem = 0 OR prev_is_rem IS NULL)
      ${queryLimit}
    ),
    stops AS (
      SELECT
        id,
        timestamp AS stop_braking
      FROM flags
      WHERE is_rem = 0 AND prev_is_rem = 1
      ${queryLimit}
    ),
    pairs AS (
      SELECT
        s.start_braking,
        t.stop_braking,
        EXTRACT(EPOCH FROM t.stop_braking - s.start_braking) AS duration_braking
      FROM starts s
      JOIN stops t ON t.stop_braking > s.start_braking
      WHERE NOT EXISTS (
        SELECT 1 FROM starts s2
        WHERE s2.start_braking > s.start_braking
          AND s2.start_braking < t.stop_braking
      )
    )
    SELECT
      p.start_braking,
      p.stop_braking,
      p.duration_braking,
      (SELECT AVG(speed) FROM gps_data WHERE timestamp BETWEEN p.start_braking AND p.stop_braking AND is_rem = 1) AS speed,
      (SELECT MAX(altitude) - MIN(altitude)
      FROM gps_data
      WHERE timestamp BETWEEN p.start_braking AND p.stop_braking AND is_rem = 1) AS distance,
      CASE
        WHEN (SELECT MAX(altitude) - MIN(altitude) FROM gps_data WHERE timestamp BETWEEN p.start_braking AND p.stop_braking AND is_rem = 1) >= 5 THEN 'uphill'
        WHEN (SELECT MIN(altitude) - MAX(altitude) FROM gps_data WHERE timestamp BETWEEN p.start_braking AND p.stop_braking AND is_rem = 1) >= 5 THEN 'downhill'
        ELSE 'flat'
      END AS category
    FROM pairs p
    ORDER BY p.start_braking DESC;
  `;

  try {
    const result = await prisma.$queryRawUnsafe<BrakeType[]>(query);

    const transformed = result.map((item) => {
      const transformedItem = {
        ...Object.fromEntries(
          Object.entries(item).map(([key, value]) => {
            if (["speed", "distance", "duration_braking"].includes(key)) {
              return [key, Number(value)];
            }
            return [key, value];
          })
        ),
      } as BrakeType;

      return transformedItem;
    });

    return transformed;
  } catch (error) {
    console.error("Error fetching braking events:", error);
    return [];
  }
}

export async function getBrakingDate() {
  const { start, end } = getDate();
  const result = await prisma.gps_data.findMany({
    where: {
      timestamp: {
        gte: start,
        lt: end,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  return result;
}

export async function getUniqueDates() {
  const data = await prisma.gps_data.findMany({
    where: {
      timestamp: { not: null },
    },
    select: {
      timestamp: true,
    },
  });

  const dates = Array.from(
    new Set(data.map((item) => item.timestamp!.toISOString().slice(0, 10)))
  );

  return dates;
}

export async function getBrakingLatest() {
  const result = await prisma.gps_data.findFirst({
    orderBy: {
      timestamp: "desc",
    },
  });
  console.log("fetching to getBrakingLatest!");
  return result;
}
