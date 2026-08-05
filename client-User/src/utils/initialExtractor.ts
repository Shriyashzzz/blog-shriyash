export function initialExtract(name: string): string {
  const nameArr = name.split(" ");
  const inital = nameArr.reduce(
    (acc, curr) => acc + curr.charAt(0).toUpperCase(),
    "",
  );
  return inital;
}
