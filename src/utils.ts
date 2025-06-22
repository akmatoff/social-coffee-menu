export function formatNumber(price: string | number): string {
  const value = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(value)) {
    return price.toString();
  }

  return `${new Intl.NumberFormat("ru-RU").format(value)} с`;
}
