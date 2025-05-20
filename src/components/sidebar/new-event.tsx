import { Button } from '@/components/ui/button';
import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib';

interface NewEventProps {
  className?: string;
}

export default function NewEvent({ className }: NewEventProps) {
  return (
    <Button
      disabled
      variant="ghost"
      className={cn('rounded-lg border border-gray-700 p-6 hover:bg-slate-200', className)}
    >
      <Plus />
      <span>만들기</span>
      <ChevronDown />
    </Button>
  );
}
