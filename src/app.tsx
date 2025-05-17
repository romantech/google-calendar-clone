import { increment, selectCount, useAppDispatch, useAppSelector } from '@/store';
import { Calendar } from '@/components';
import { cn } from '@/lib';

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <main>
      <h1 className="underline">Hello world!</h1>
      <div>{`count: ${count}`}</div>
      <button
        type="button"
        className={cn('cursor-pointer')}
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
      <Calendar />
    </main>
  );
}

export default App;
