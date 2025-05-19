import { type Control, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { type CalendarEvent, type RecurrenceType, recurrenceTypes } from '@/store';
import { addHours, format, isAfter, isBefore, isSameHour } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRef } from 'react';

const recurrenceLabels: Record<RecurrenceType, string> = {
  none: '반복 안 함',
  weekly: '주마다 반복',
  monthly: '월마다 반복',
};

const formSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    startTime: z.date(),
    endTime: z.date(),
    recurrence: z.enum(recurrenceTypes),
  })
  .refine((data) => isAfter(data.endTime, data.startTime), {
    message: '종료 시간은 시작 시간보다 이후여야 합니다',
    path: ['endTime'],
  });

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  initialTime: Date;
  onSubmit: (event: Omit<CalendarEvent, 'id'> & { recurrence: RecurrenceType }) => void;
  onCancel: () => void;
  onSave?: () => void;
  /** 선택한 날짜의 모든 시간슬롯 */
  dateTimeSlots: Date[];
}

export default function EventForm({
  initialTime,
  onSubmit,
  onCancel,
  onSave,
  dateTimeSlots,
}: EventFormProps) {
  const formattedTimeSlots = useRef(
    dateTimeSlots.map((slot) => ({
      date: slot,
      isoString: slot.toISOString(),
      formattedTime: format(slot, 'HH:mm'),
    })),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      startTime: initialTime,
      endTime: addHours(initialTime, 1),
      recurrence: 'none',
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      title: values.title,
      startTime: values.startTime.toISOString(),
      endTime: values.endTime.toISOString(),
      recurrence: values.recurrence,
    });

    onSave?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="이벤트 제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2">
          <TimeSelect
            control={form.control}
            name="startTime"
            label="시작 시간"
            timeSlots={formattedTimeSlots.current}
            placeholder="시작 시간"
          />

          <TimeSelect
            control={form.control}
            name="endTime"
            label="종료 시간"
            timeSlots={formattedTimeSlots.current}
            placeholder="종료 시간"
          />
        </div>

        <FormField
          control={form.control}
          name="recurrence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>반복 설정</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="반복 설정을 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {recurrenceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {recurrenceLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>이벤트를 어떻게 반복할지 선택하세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </Form>
  );
}

interface TimeSelectProps {
  control: Control<FormValues>;
  name: 'startTime' | 'endTime';
  label: string;
  timeSlots: { date: Date; isoString: string; formattedTime: string }[];
  placeholder?: string;
}

export function TimeSelect({ control, name, label, timeSlots, placeholder }: TimeSelectProps) {
  const startTime = useWatch({ control, name: 'startTime' });

  const shouldDisabled = (date: Date) => {
    if (name === 'endTime') return isBefore(date, startTime) || isSameHour(date, startTime);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(timeStr) => onChange(new Date(timeStr))}
            defaultValue={value.toISOString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? label}>
                  {format(value, 'HH:mm')}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem
                  disabled={shouldDisabled(slot.date)}
                  key={`${name}-${slot.isoString}`}
                  value={slot.isoString}
                >
                  {slot.formattedTime}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
