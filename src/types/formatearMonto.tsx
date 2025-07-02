export const formatearMonto = (monto: number, isNegative?: boolean): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(isNegative ? -monto : monto);
};
