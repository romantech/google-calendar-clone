import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib';

interface NavigatorProps {
  className?: string;
}

export default function Navigator({ className }: NavigatorProps) {
  return (
    <section className={cn('flex items-center', className)}>
      <Button variant="ghost" className="size-8 cursor-pointer rounded-full hover:bg-slate-200">
        <ChevronLeft className="size-5 stroke-[2.2px] text-gray-700" />
      </Button>
      <Button variant="ghost" className="size-8 cursor-pointer rounded-full hover:bg-slate-200">
        <ChevronRight className="size-5 stroke-[2.2px] text-gray-700" />
      </Button>
    </section>
  );
}
