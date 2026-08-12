export function dateParser(givenIsoDate: Date): string {
  const isoDate = new Date(givenIsoDate);
  const readableDate = isoDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return readableDate;
}
