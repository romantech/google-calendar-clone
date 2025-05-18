import { Button } from '@/components/ui/button.tsx';
import { AlignJustify } from 'lucide-react';

export default function MenuToggle() {
  return (
    <Button variant="ghost" className="size-12 cursor-not-allowed rounded-full hover:bg-slate-200">
      <AlignJustify className="size-5" />
    </Button>
  );
}
