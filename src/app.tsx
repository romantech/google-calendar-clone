import { Calendar, Header, Sidebar } from '@/components';

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
