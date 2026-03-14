import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Store,
  CalendarDays,
  Scissors,
  FolderTree,
  FileText,
  Image,
  X,
} from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Usuarios", icon: Users },
  { to: "/owners", label: "Owners", icon: Store },
  { to: "/appointments", label: "Agendamentos", icon: CalendarDays },
  { to: "/services", label: "Servicos", icon: Scissors },
  { to: "/categories", label: "Categorias", icon: FolderTree },
  { to: "/requests", label: "Solicitacoes", icon: FileText },
  { to: "/photos", label: "Fotos", icon: Image },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-xl font-bold tracking-wide">Barberix</span>
          <button className="lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="mt-4 flex flex-col gap-1 px-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
