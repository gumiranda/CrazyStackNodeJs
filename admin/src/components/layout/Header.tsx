import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      <button
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </button>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.name}</span>
        <button
          onClick={logout}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </header>
  );
}
