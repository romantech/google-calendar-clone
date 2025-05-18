import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';

export default function Support() {
  return (
    <Button variant="ghost" className="size-10 cursor-not-allowed rounded-full hover:bg-slate-200">
      <CircleHelp className="size-5" />
    </Button>
  );
}
