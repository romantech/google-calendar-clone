import { useAppDispatch, useAppSelector } from './store/hooks';
import { increment } from './store/counter-slice';
import Calendar from '@/components/calendar';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main>
      <h1 className="underline">Hello world!</h1>
      <div>{`count: ${count}`}</div>
      <button
        type="button"
        className="cursor-pointer"
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
