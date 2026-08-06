const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export const formatPeriodLabel = (label) => {
  if (!label) return "";
  const parts = label.split("-");
  if (parts.length !== 2) return label;
  const monthIndex = parseInt(parts[1], 10) - 1;
  const year = parts[0];
  return `${MONTH_NAMES[monthIndex]} ${year}`;
};
