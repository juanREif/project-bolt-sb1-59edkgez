import { NAV_ITEMS, LOGO_ICON, type ViewId } from '@/lib/nav';

interface SidebarProps {
  active: ViewId;
  onNavigate: (id: ViewId) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ active, onNavigate, mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static z-40 flex h-full w-72 flex-col border-r border-base-700 bg-base-900 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6 border-b border-base-700">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/20">
            <LOGO_ICON className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">TechHub</h1>
            <p className="text-xs text-base-500 font-medium">Painel Técnico</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-base-500">
            Menu
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-500/10 text-primary-300 ring-1 ring-primary-500/30'
                        : 'text-base-500 hover:bg-base-800 hover:text-gray-300'
                    }`}
                  >
                    <Icon
                      className={`mt-0.5 h-5 w-5 shrink-0 transition-colors ${
                        isActive
                          ? 'text-primary-400'
                          : 'text-base-500 group-hover:text-gray-300'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold ${isActive ? 'text-primary-300' : ''}`}>
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-tight text-base-500 truncate">
                        {item.description}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-base-700 px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-base-800 px-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-success-500 to-primary-500 text-sm font-bold text-white">
              U
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">Usuário</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse-slow" />
                <p className="text-xs text-base-500">Online</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
