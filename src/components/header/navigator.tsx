import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib';

interface NavigatorProps {
  className?: string;
}

export default function Navigator({ className }: NavigatorProps) {
  return (
    <section className={cn('flex items-center', className)}>
      <Button variant="ghost" className="hover:bg-hover size-8 cursor-pointer rounded-full">
        <ChevronLeft className="text-surface-variant size-5 stroke-[2.2px]" />
      </Button>
      <Button variant="ghost" className="hover:bg-hover size-8 cursor-pointer rounded-full">
        <ChevronRight className="text-surface-variant size-5 stroke-[2.2px]" />
      </Button>
    </section>
  );
}
