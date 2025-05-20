import { cn } from '@/lib';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface TimeLabelProps {
  timeSlot: Date;
  isFirstRow: boolean;
  isLastRow: boolean;
}

export default function TimeLabel({ timeSlot, isFirstRow, isLastRow }: TimeLabelProps) {
  return (
    <>
      <div className="relative">
        <span
          className={cn('absolute right-2 -translate-y-1/2 text-xs', { invisible: isFirstRow })}
        >
          {format(timeSlot, 'a h시', { locale: ko })}
        </span>
      </div>
      {/* 시간 라벨 우측 경계용 셀 */}
      <div className={cn('border-r border-slate-200', { 'border-b': !isLastRow })} />
    </>
  );
}
