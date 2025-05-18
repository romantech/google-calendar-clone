import { useState } from 'react';
import { DayPicker as ReactDatePicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DatePicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <section>
      <ReactDatePicker
        locale={ko}
        formatters={{
          formatCaption: (date, options) => format(date, 'yyyy년 M월', options),
        }}
        animate
        mode="single"
        selected={selected}
        onSelect={setSelected}
        classNames={{
          selected: 'bg-sky-200 rounded-full',
          today: 'bg-blue-700 text-white rounded-full',
          day: 'rounded-full hover:bg-slate-200',
          weekday: 'text-xs font-normal',
          weekdays: 'size-8',
          day_button: 'cursor-pointer text-xs size-8',
          caption_label: 'text-sm text-neutral-700 font-semibold',
          button_previous: 'm-0',
          button_next: 'm-2',
          month_caption: 'h-fit m-2',
          chevron: 'size-4',
        }}
      />
    </section>
  );
}
