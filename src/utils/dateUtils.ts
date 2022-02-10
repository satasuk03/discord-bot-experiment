export function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  return new Date(newDate.setDate(date.getDate() + days));
}
