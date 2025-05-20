/** 24시간(1440분) */
export const MINUTES_IN_DAY = 24 * 60;
/** 1개 타임슬롯의 시간(분) */
export const MINUTES_PER_SLOT = 60;
/** 1개 타임슬롯 높이(픽셀) */
export const SLOT_HEIGHT = 48;

export const VIEW_LAYOUT_CLASSES = {
  week: {
    timeGrid: 'grid-cols-[4rem_0.625rem_repeat(7,minmax(5rem,_1fr))]',
    timeZoneRow: 'grid-cols-[4rem_0.625rem_repeat(7,minmax(5rem,_1fr))_0.9375rem]',
  },
} as const;
