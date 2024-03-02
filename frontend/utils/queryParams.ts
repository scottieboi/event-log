export function serializeSearchParams(searchParams: Record<string, string>) {
  return Object.entries(searchParams).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc += `${acc === "" ? "?" : "&"}${key}=${value}`;
      }
      return acc;
    }, "");
}
