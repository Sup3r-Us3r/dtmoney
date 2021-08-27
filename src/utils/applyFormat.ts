export function formatPrice(value: number) {
  const newPrice = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);

  return newPrice;
}

export function formatDate(value: string) {
  const newDate = Intl.DateTimeFormat('pt-BR').format(new Date(value));

  return newDate;
}