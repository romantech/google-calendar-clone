import { Button } from '@/components/ui/button.tsx';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <Button disabled variant="ghost" className="size-10 rounded-full hover:bg-slate-200">
      <SettingsIcon className="size-5" />
    </Button>
  );
}
