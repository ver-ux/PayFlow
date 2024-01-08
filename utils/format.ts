import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const currency = (value: number) => {
  return Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(value);
};

export const dateDayMonthYear = (value: Date) => {
  return Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
  }).format(value);
};
