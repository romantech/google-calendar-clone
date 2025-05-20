import { DayPicker as ReactDatePicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { isSameDay, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  setSelectedDate,
  setSelectedMonth,
  useAppDispatch,
  useSelectedDateAndMonth,
} from '@/store';
import { formatYearMonth, toDate } from '@/lib/utils';

export default function DatePicker() {
  const dispatch = useAppDispatch();
  const { selectedDate, selectedMonth } = useSelectedDateAndMonth();

  const onChange = (date?: Date, from: 'select' | 'month' = 'select') => {
    const setter = from === 'select' ? setSelectedDate : setSelectedMonth;
    dispatch(setter(date?.toISOString()));
  };

  const isHoverable = (date: Date) => {
    const selected = toDate(selectedDate);
    if (!selected) return false;
    // 오늘 날짜가 아니고, 선택된 날짜도 아닌 경우에만 호버 배경 적용하기 위한 조건
    return !isToday(date) && !isSameDay(date, selected);
  };

  return (
    <section>
      <ReactDatePicker
        animate
        locale={ko}
        formatters={{ formatCaption: formatYearMonth }}
        mode="single"
        month={toDate(selectedMonth)}
        selected={toDate(selectedDate)}
        onMonthChange={(date) => onChange(date, 'month')}
        onSelect={(date) => onChange(date, 'select')}
        modifiers={{ hoverable: isHoverable }}
        modifiersClassNames={{ hoverable: 'hover:bg-slate-200' }}
        classNames={{
          selected: 'bg-sky-200',
          today: '!bg-blue-700 text-white',
          day: 'rounded-full',
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
