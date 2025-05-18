import { DayPicker as ReactDatePicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { setSelectedDate, useAppDispatch, useAppSelector } from '@/store';

export default function DatePicker() {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const dispatch = useAppDispatch();

  const onSelect = (date: Date | undefined) => {
    dispatch(setSelectedDate(date));
  };

  return (
    <section>
      <ReactDatePicker
        locale={ko}
        formatters={{
          formatCaption: (date, options) => format(date, 'yyyy년 M월', options),
        }}
        animate
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        classNames={{
          selected: 'bg-sky-200 rounded-full',
          today: 'bg-blue-700 text-white rounded-full',
          day: 'rounded-full hover:bg-slate-200',
          weekday: 'text-xs font-normal',
          weekdays: 'size-8',
          day_button: 'cursor-pointer text-xs size-8',
          caption_label: 'text-sm text-neutral-700 font-semibold',
          button_previous: 'cursor-pointer hover:bg-slate-200 rounded-full p-1',
          button_next: 'cursor-pointer hover:bg-slate-200 rounded-full p-1 mr-1 ml-2',
          month_caption: 'h-fit m-2',
          chevron: 'size-4',
        }}
      />
    </section>
  );
}
