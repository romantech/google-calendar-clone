import { Button } from '@/components/ui/button';
import { cn } from '@/lib';
import { setSelectedMonth, useAppDispatch } from '@/store';

interface JumpToTodayProps {
  className?: string;
  label?: string;
}

export default function JumpToToday({ className, label = '오늘' }: JumpToTodayProps) {
  const dispatch = useAppDispatch();

  const onSelect = () => {
    dispatch(setSelectedMonth(new Date().toISOString()));
  };

  return (
    <Button
      onClick={onSelect}
      variant="ghost"
      className={cn(
        'cursor-pointer rounded-full border border-gray-700 px-5 hover:bg-slate-200',
        className,
      )}
      size="lg"
    >
      {label}
    </Button>
  );
}
