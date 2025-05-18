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
        'text-surface hover:bg-hover border-outline cursor-pointer rounded-full border',
        className,
      )}
      size="lg"
    >
      주
      <ChevronDown />
    </Button>
  );
}
