import { Button } from '@/components/ui/button';
import { cn } from '@/lib';
import { moveToToday, useAppDispatch } from '@/store';

interface JumpToTodayProps {
  className?: string;
}

export default function Today({ className }: JumpToTodayProps) {
  const dispatch = useAppDispatch();

  const onSelect = () => {
    dispatch(moveToToday());
  };

  return (
    <Button
      onClick={onSelect}
      variant="ghost"
      className={cn(
        'cursor-pointer rounded-full border border-gray-700 px-5 hover:bg-slate-200 active:bg-slate-300',
        className,
      )}
      size="lg"
    >
      오늘
    </Button>
  );
}
