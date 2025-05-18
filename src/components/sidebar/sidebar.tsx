import DatePicker from './date-picker';
import NewEvent from './new-event';

export default function Sidebar() {
  return (
    <aside className="w-full max-w-64 p-4">
      <NewEvent className="mb-4" />
      <DatePicker />
    </aside>
  );
}
