import { Calendar, Header } from '@/components';
import { Sidebar } from '@/components/sidebar';

function App() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <Calendar />
      </div>
    </main>
  );
}

export default App;
