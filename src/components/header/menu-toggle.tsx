import { Button } from '@/components/ui/button.tsx';
import { AlignJustify } from 'lucide-react';

export default function MenuToggle() {
  return (
    <Button variant="ghost" className="hover:bg-hover size-12 cursor-not-allowed rounded-full">
      <AlignJustify className="size-5" />
    </Button>
  );
}
