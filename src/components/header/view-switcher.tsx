import { cn } from '@/lib';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface ViewSwitcherProps {
  className?: string;
}

export default function ViewSwitcher({ className }: ViewSwitcherProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'cursor-pointer rounded-full border border-gray-700 hover:bg-slate-200',
        className,
      )}
      size="lg"
    >
      주
      <ChevronDown />
    </Button>
  );
}
