// function untuk mendapatkan timestamp hari ini
export function getDate() {
  const now = new Date();

  const fullDate = now.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  });

  // fullDate format: "4/8/2025, 00.39.18"
  const dateParts = fullDate.split(",")[0].split("/"); // ["4", "8", "2025"]

  const date = `${dateParts[2]}-${dateParts[1].padStart(
    2,
    "0"
  )}-${dateParts[0].padStart(2, "0")}`;

  const start = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end, date };
}

export function formatDate(value: Date | string): string {
  const date = new Date(value);
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const optionsFull: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };

  const optionsSecond: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  let options: Intl.DateTimeFormatOptions;

  if (typeof value === "string" && dateRegex.test(value)) {
    options = optionsSecond;
  } else {
    options = optionsFull;
  }

  const formatted = new Intl.DateTimeFormat("id-ID", options).format(date);
  return formatted;
}
