"use server";

import { prisma } from "@/lib/prisma";
import { BrakeType, RawBrakeType } from "@/types/brakes";

export async function getBrakingEvents(date?: string): Promise<BrakeType[]> {
  let queryTimestamp = "";

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (date) {
    if (!dateRegex.test(date)) {
      return Promise.reject(
        new Error("Invalid date format. Expected YYYY-MM-DD.")
      );
    }
    queryTimestamp = `AND timestamp::date = '${date}'`;
  } else {
    queryTimestamp = "";
  }

  const query = `
WITH rem_events AS (
	  SELECT
	    id,
		latitude AS latitude_1,
		longitude AS longitude_1,
	    speed AS speed_1,
	    altitude AS altitude_1,
	    "timestamp" AS time_1,
		LEAD(latitude) OVER (ORDER BY "timestamp") AS latitude_2,
		LEAD(longitude) OVER (ORDER BY "timestamp") AS longitude_2,
	    LEAD(speed) OVER (ORDER BY "timestamp") AS speed_2,
	    LEAD(altitude) OVER (ORDER BY "timestamp") AS altitude_2,
	    LEAD("timestamp") OVER (ORDER BY "timestamp") AS time_2
	  FROM gps_data
	  WHERE is_rem = 1
    ${queryTimestamp}
	),
	processed AS (
	  SELECT
	    id,
		latitude_1,
		latitude_2,
		longitude_1,
		longitude_2,
	    speed_1,
	    speed_2,
	    altitude_1,
	    altitude_2,
	    time_1,
	    time_2,
		EXTRACT(EPOCH FROM (time_2 - time_1)) AS duration_brake,
    	(speed_1 - speed_2) AS delta_speed,
	    (speed_1 - speed_2) / NULLIF(EXTRACT(EPOCH FROM (time_2 - time_1)), 0) AS deceleration,
	    (altitude_2 - altitude_1) AS delta_altitude,
	    CASE
	      WHEN (altitude_2 - altitude_1) > 1 THEN 'Menanjak'
	      WHEN (altitude_2 - altitude_1) < -1 THEN 'Menurun'
	      ELSE 'Mendatar'
	    END AS road_condition
	  FROM rem_events
	  WHERE speed_2 IS NOT NULL AND time_2 IS NOT NULL
	),
	categorized AS (
	  SELECT
	    *,
	    CASE
	      WHEN deceleration IS NULL OR deceleration < 0 THEN 'Hijau'
	      WHEN deceleration <= 2 THEN 'Hijau'
	      WHEN deceleration <= 4 THEN 'Kuning'
	      ELSE 'Merah'
	    END AS category_brake
	  FROM processed
	)
	
	SELECT *
	FROM categorized
	ORDER BY time_1;
  `;

  try {
    const result = await prisma.$queryRawUnsafe<BrakeType[]>(query);

    const transformed = result.map((item) => {
      const transformedItem = {
        ...Object.fromEntries(
          Object.entries(item).map(([key, value]) => {
            if (
              [
                "speed_1",
                "speed_2",
                "altitude",
                "duration_brake",
                "deceleration",
              ].includes(key)
            ) {
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

export async function getRawData(date?: string): Promise<RawBrakeType[]> {
  if (!date) {
    throw new Error("Date is required");
  }

  try {
    const result = await prisma.$queryRaw<RawBrakeType[]>`
      SELECT id, latitude, longitude
      FROM gps_data
      WHERE timestamp::date = ${date}
    `;
    return result;
  } catch (error) {
    console.error("Error fetching raw data:", error);
    throw error;
  }
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
