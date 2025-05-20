import { cn } from '@/lib';
import { selectCurrentTimezoneInfo, useAppSelector } from '@/store';

export default function TimeZoneRow({ days }: { days: Date[] }) {
  const { gmtOffset } = useAppSelector(selectCurrentTimezoneInfo);

  return (
    <div className="grid grid-cols-[4rem_0.625rem_repeat(7,_1fr)_0.9375rem]">
      <div className="justify-self-end pr-2 text-xs">{gmtOffset}</div>
      <div className="border-r border-b border-slate-200" /> {/* 시간 라벨 우측 경계용 셀 */}
      <div className="col-span-7 grid grid-cols-7 divide-x divide-slate-200 border-b">
        {days.map((day) => (
          <div key={day.toString()} className={cn('cursor-pointer hover:bg-slate-100')} />
        ))}
      </div>
      {/* 타임슬롯 스크롤 때문에 생긴 영역 맞추기 위한 빈 셀 */}
      <div className="border-b border-l" />
    </div>
  );
}
