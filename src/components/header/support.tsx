import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';

export default function Support() {
  return (
    <Button disabled variant="ghost" className="size-10 rounded-full hover:bg-slate-200">
      <CircleHelp className="size-5" />
    </Button>
  );
}
