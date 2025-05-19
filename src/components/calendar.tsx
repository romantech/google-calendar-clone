import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { WeekView } from '@/components/week-view';
import { Fragment } from 'react';

export default function Calendar() {
  return (
    <Fragment>
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <WeekView />
      </div>
    </Fragment>
  );
}
