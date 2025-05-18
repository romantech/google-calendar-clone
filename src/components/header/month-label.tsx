import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib';

interface MonthLabelProps {
  className?: string;
}

export default function MonthLabel({ className }: MonthLabelProps) {
  const label = format(new Date(), 'yyyy년 M월', { locale: ko });

  return <h2 className={cn('px-6 text-[22px] select-none', className)}>{label}</h2>;
}
