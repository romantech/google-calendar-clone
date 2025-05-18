import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib';
import { moveWeek, useAppDispatch } from '@/store';

interface NavigatorProps {
  className?: string;
}

export default function Navigator({ className }: NavigatorProps) {
  const dispatch = useAppDispatch();

  const handleWeekMove = (direction: -1 | 1) => {
    dispatch(moveWeek(direction));
  };

  return (
    <section className={cn('flex items-center', className)}>
      <Button
        onClick={() => handleWeekMove(-1)}
        variant="ghost"
        className="size-8 cursor-pointer rounded-full hover:bg-slate-200 active:bg-slate-300"
      >
        <ChevronLeft className="size-5 stroke-[2.2px] text-gray-700" />
      </Button>
      <Button
        onClick={() => handleWeekMove(1)}
        variant="ghost"
        className="size-8 cursor-pointer rounded-full hover:bg-slate-200 active:bg-slate-300"
      >
        <ChevronRight className="size-5 stroke-[2.2px] text-gray-700" />
      </Button>
    </section>
  );
}
