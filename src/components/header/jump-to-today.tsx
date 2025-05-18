import { Button } from '@/components/ui/button';
import { cn } from '@/lib';

interface JumpToTodayProps {
  className?: string;
  label?: string;
}

export default function JumpToToday({ className, label = '오늘' }: JumpToTodayProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'text-surface hover:bg-hover border-outline cursor-pointer rounded-full border px-5',
        className,
      )}
      size="lg"
    >
      {label}
    </Button>
  );
}
