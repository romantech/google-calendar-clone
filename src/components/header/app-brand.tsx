import CalendarLogo from '@/assets/calendar-logo.svg?react';
import { cn } from '@/lib';

interface AppBrandProps {
  className?: string;
}

export default function AppBrand({ className }: AppBrandProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <CalendarLogo className="size-12" />
      <h1 className="text-[22px] leading-[48px] font-light capitalize select-none">calendar</h1>
    </div>
  );
}
