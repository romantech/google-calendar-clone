import { Calendar, Header, Sidebar } from '@/components';

function App() {
  return (
    <main>
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <Calendar />
      </div>
    </main>
  );
}

export default App;
