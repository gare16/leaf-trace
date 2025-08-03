import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const baseLat = -6.9192255;
const baseLng = 107.6186102;
const offset = 0.000135; // ≈15 meter

function randomOffset() {
  return (Math.random() - 0.5) * 2 * offset;
}

async function main() {
  const fixedDate = new Date("2025-08-01T00:00:00Z");

  const seedData = Array.from({ length: 10 }).map(() => {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);

    const timestamp = new Date(fixedDate);
    timestamp.setUTCHours(randomHour, randomMinute, randomSecond);

    return {
      latitude: baseLat + randomOffset(),
      longitude: baseLng + randomOffset(),
      road_condition: (["Mendatar", "Menanjak", "Menurun"] as const)[
        Math.floor(Math.random() * 3)
      ],
      brake_duration_ms: 15000 + Math.floor(Math.random() * 5000),
      start_speed_kmph: parseFloat((Math.random() * 5).toFixed(3)),
      end_speed_kmph: parseFloat((Math.random() * 2).toFixed(3)),
      avg_deceleration_mps2: parseFloat((Math.random() * 0.03).toFixed(6)),
      kategori: (["Hijau", "Kuning", "Merah"] as const)[
        Math.floor(Math.random() * 3)
      ],
      timestamp,
    };
  });

  await prisma.gps_data.createMany({ data: seedData });
  console.log(
    "✅ Seeder selesai: 10 data gps_data ditambahkan dengan tanggal tetap."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
