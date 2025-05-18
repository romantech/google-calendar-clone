import { DayPicker as ReactDatePicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format, isSameDay, isToday } from 'date-fns'; // isToday 임포트
import { ko } from 'date-fns/locale';
import {
  selectSelectedDate,
  selectSelectedMonth,
  setSelectedDate,
  setSelectedMonth,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { toDate } from '@/lib/utils';

export default function DatePicker() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectSelectedDate);
  const selectedMonth = useAppSelector(selectSelectedMonth);

  const onSelect = (date?: Date) => {
    dispatch(setSelectedDate(date?.toISOString()));
  };

  const onMonthChange = (date?: Date) => {
    dispatch(setSelectedMonth(date?.toISOString()));
  };

  const isHoverable = (date: Date) => {
    const selected = toDate(selectedDate);
    if (!selected) return false;
    // 오늘 날짜가 아니고, 선택된 날짜도 아닌 경우에만 호버 배경 적용하기 위한 조건
    return !isToday(date) && !isSameDay(date, selected);
  };

  const formatCaption = (date: Date) => format(date, 'yyyy년 M월');

  return (
    <section>
      <ReactDatePicker
        animate
        locale={ko}
        formatters={{ formatCaption }}
        mode="single"
        month={toDate(selectedMonth)}
        selected={toDate(selectedDate)}
        onMonthChange={onMonthChange}
        onSelect={onSelect}
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
