import { Button } from '@/components/ui/button.tsx';
import { AlignJustify } from 'lucide-react';

export default function MenuToggle() {
  return (
    <Button disabled variant="ghost" className="size-12 rounded-full hover:bg-slate-200">
      <AlignJustify className="size-5" />
    </Button>
  );
}
