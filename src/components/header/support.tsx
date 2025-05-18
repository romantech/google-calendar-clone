import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';

export default function Support() {
  return (
    <Button variant="ghost" className="hover:bg-hover size-10 cursor-not-allowed rounded-full">
      <CircleHelp className="size-5" />
    </Button>
  );
}
