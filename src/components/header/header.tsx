import { cn } from '@/lib';
import Navigator from './navigator';
import MonthLabel from './month-label';
import MenuToggle from './menu-toggle';
import AppBrand from './app-brand';
import Today from './today.tsx';
import Search from './search.tsx';
import Support from '@/components/header/support';
import Settings from '@/components/header/settings';
import ViewSwitcher from '@/components/header/view-switcher';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn(className, 'flex h-16 items-center p-2')}>
      <section className="mr-12 flex items-center">
        <MenuToggle />
        <AppBrand />
      </section>
      <section className="flex items-center">
        <Today className="mr-5" />
        <Navigator />
        <MonthLabel />
      </section>
      <section className="ml-auto flex items-center gap-2">
        <Search />
        <Support />
        <Settings />
        <ViewSwitcher />
      </section>
    </header>
  );
}
