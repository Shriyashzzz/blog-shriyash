export function normalizeDate(givenDate: string): string {
  const dateObj = new Date(givenDate);
  const readableLocal = dateObj.toLocaleDateString();
  return readableLocal;
}
