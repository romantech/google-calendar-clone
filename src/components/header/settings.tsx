import { Button } from '@/components/ui/button.tsx';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <Button variant="ghost" className="hover:bg-hover size-10 cursor-not-allowed rounded-full">
      <SettingsIcon className="size-5" />
    </Button>
  );
}
