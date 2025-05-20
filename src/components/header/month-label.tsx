import { parseISO } from 'date-fns';
import { cn, formatYearMonth } from '@/lib';

import { selectSelectedDate, useAppSelector } from '@/store';

interface MonthLabelProps {
  className?: string;
}

export default function MonthLabel({ className }: MonthLabelProps) {
  const selectedDate = useAppSelector(selectSelectedDate);
  const baseDate = selectedDate ? parseISO(selectedDate) : new Date();

  return (
    <h2 className={cn('truncate px-6 text-[22px] select-none', className)}>
      {formatYearMonth(baseDate)}
    </h2>
  );
}
