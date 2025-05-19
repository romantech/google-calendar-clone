import { format, parseISO } from 'date-fns';
import { cn } from '@/lib';

import { selectSelectedDate, useAppSelector } from '@/store';
import { ko } from 'date-fns/locale';

interface MonthLabelProps {
  className?: string;
}

export default function MonthLabel({ className }: MonthLabelProps) {
  const selectedDate = useAppSelector(selectSelectedDate);
  const baseDate = selectedDate ? parseISO(selectedDate) : new Date();

  const label = format(baseDate, 'yyyy년 M월', { locale: ko });

  return <h2 className={cn('truncate px-6 text-[22px] select-none', className)}>{label}</h2>;
}
