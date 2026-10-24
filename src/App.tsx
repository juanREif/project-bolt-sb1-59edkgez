import { useState } from 'react';
import { Menu, X, Bell, Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Diagnostico from '@/views/Diagnostico';
import Otimizacao from '@/views/Otimizacao';
import ChatIA from '@/views/ChatIA';
import MontarPC from '@/views/MontarPC';
import { NAV_ITEMS, type ViewId } from '@/lib/nav';

function App() {
  const [active, setActive] = useState<ViewId>('diagnostico');
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem = NAV_ITEMS.find((item) => item.id === active)!;

  const renderView = () => {
    switch (active) {
      case 'diagnostico':
        return <Diagnostico />;
      case 'otimizacao':
        return <Otimizacao />;
      case 'chat':
        return <ChatIA />;
      case 'montar':
        return <MontarPC />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-base-950">
      <Sidebar
        active={active}
        onNavigate={setActive}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-4 border-b border-base-700 bg-base-900/80 px-4 py-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-base-500 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white truncate">{activeItem.label}</h2>
            <p className="text-xs text-base-500 truncate hidden sm:block">{activeItem.description}</p>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-xl bg-base-800 px-3 py-2 ring-1 ring-base-700 w-64">
            <Search className="h-4 w-4 text-base-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-sm text-white placeholder-base-500 focus:outline-none"
            />
          </div>

          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-base-800 text-base-500 ring-1 ring-base-700 transition-colors hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-500" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">{renderView()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
