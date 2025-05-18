import {
  DayPicker as ReactDatePicker,
  type DayPickerProps,
  type ModifiersClassNames,
} from 'react-day-picker';
import 'react-day-picker/style.css';
import { format, isToday } from 'date-fns'; // isToday 임포트
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

const modifiers: DayPickerProps['modifiers'] = {
  // 오늘 날짜는 hover 해도 배경색 유지, 오늘이 아닌 날짜는 hover 시 회색으로 표시하기 위해 modifier 사용
  notToday: (date: Date) => !isToday(date),
};

const modifiersClassNames: ModifiersClassNames = {
  notToday: 'hover:bg-slate-200',
};

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

  const formatCaption = (date: Date) => format(date, 'yyyy년 M월');

  return (
    <section>
      <ReactDatePicker
        locale={ko}
        formatters={{ formatCaption }}
        animate
        mode="single"
        month={toDate(selectedMonth)}
        onMonthChange={onMonthChange}
        selected={toDate(selectedDate)}
        onSelect={onSelect}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        classNames={{
          selected: 'bg-sky-200 rounded-full',
          today: 'bg-blue-700 text-white rounded-full',
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
