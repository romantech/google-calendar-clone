import { cn } from '@/lib';
import CalendarLogo from '@/assets/calendar-logo.svg?react';
import { Button } from '@/components/ui/button';
import { AlignJustify } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn(className, 'flex h-16 p-2')}>
      <section className="flex items-center">
        <Button variant="ghost" className="size-12 rounded-full hover:bg-[rgba(60,64,67,.08)]">
          <AlignJustify className="size-5" />
        </Button>
        <CalendarLogo className="size-12" />
        <h1 className="text-[22px] leading-[48px] font-light capitalize">calendar</h1>
      </section>
    </header>
  );
}
