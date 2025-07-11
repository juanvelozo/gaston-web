import { useMemo } from 'react';
import {
  format,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  parseISO,
  isSameYear,
  getYear,
  getMonth,
  startOfWeek,
  subDays,
  isBefore,
  isAfter,
} from 'date-fns';
import { es } from 'date-fns/locale';

export type ArrayAgrupadoPorFecha<T> = {
  label: string;
  list: T[];
};

interface UseArrayAgrupadoPorFechaOptions {
  ascending?: boolean;
  relativeToToday?: boolean;
}

export function useArrayAgrupadoPorFecha<T extends { createdAt: string }>(
  data: T[] = [],
  options: UseArrayAgrupadoPorFechaOptions = {}
): ArrayAgrupadoPorFecha<T>[] {
  const { ascending = false, relativeToToday = false } = options;

  return useMemo(() => {
    const groups: Record<string, T[]> = {};
    const now = new Date();
    const currentYear = getYear(now);
    const currentMonth = getMonth(now);

    // Rango para días agrupados individualmente cuando relativeToToday = false
    // Último día a mostrar como día: anteayer
    // Primer día a mostrar como día: mismo día de la semana pasada

    const anteayerDate = subDays(now, 2);

    // Para obtener el mismo día de la semana pasada, usamos startOfWeek para normalizar y sumamos
    // Pero para ser exactos, vamos a restar 7 días a la fecha de hoy (mismo día semana pasada)
    const sameDayLastWeek = subDays(now, 7);

    data.forEach((item) => {
      const date = parseISO(item.createdAt);
      const itemYear = getYear(date);
      const itemMonth = getMonth(date);
      const daysDiff = differenceInDays(now, date);

      let label = '';

      if (isToday(date)) {
        label = 'Hoy';
      } else if (isYesterday(date)) {
        label = 'Ayer';
      } else if (daysDiff === 1) {
        label = 'Anteayer';
      } else if (relativeToToday) {
        // Ya funciona como antes, todo el mes actual agrupado por día
        if (itemYear === currentYear && itemMonth === currentMonth) {
          label = format(date, 'eeee d', { locale: es });
        } else {
          if (itemYear !== currentYear) {
            label = format(date, 'yyyy', { locale: es });
          } else {
            label = format(date, 'MMMM', { locale: es });
          }
        }
      } else {
        // relativeToToday === false
        // Solo agrupamos por día individual si:
        // la fecha está entre 'mismo día semana pasada' y 'anteayer' (inclusive)

        // isAfter: true si date > start, isBefore: true si date < end
        // Queremos date >= sameDayLastWeek && date <= anteayerDate

        if (
          itemYear === currentYear &&
          itemMonth === currentMonth &&
          !isBefore(date, sameDayLastWeek) && // date >= sameDayLastWeek
          !isAfter(date, anteayerDate) // date <= anteayerDate
        ) {
          label = format(date, 'eeee d', { locale: es });
        } else if (itemYear === currentYear && itemMonth === currentMonth) {
          // Para semanas anteriores (más viejas que sameDayLastWeek y dentro del mes actual)
          const weeksDiff = differenceInWeeks(now, date);
          if (weeksDiff === 1) {
            label = 'Hace una semana';
          } else {
            label = `Hace ${weeksDiff} semanas`;
          }
        } else {
          // Fuera del mes actual, agrupamos por mes o año
          if (itemYear !== currentYear) {
            label = format(date, 'yyyy', { locale: es });
          } else {
            label = format(date, 'MMMM', { locale: es });
          }
        }
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(item);
    });

    const agrupado = Object.entries(groups)
      .map(([label, list]) => ({
        label,
        list: list.sort(
          (a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
        ),
      }))
      .sort((a, b) => {
        const aDate = parseISO(a.list[0].createdAt);
        const bDate = parseISO(b.list[0].createdAt);
        return ascending ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
      });

    return agrupado;
  }, [data, ascending, relativeToToday]);
}
