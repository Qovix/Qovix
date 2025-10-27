import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Database, 
  Settings, 
  Plus,
  Bot,
  User
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const location = useLocation();

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Query History', href: '/history', icon: FileText },
    { name: 'Connected Databases', href: '/databases', icon: Database },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isCurrentPage = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary-700 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">QueryCraft</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const current = isCurrentPage(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${current 
                  ? 'bg-[#bc3a08] text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${current ? 'text-white' : 'text-gray-500'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-4 border-t border-gray-100">
        <Link
          to="/connect-database"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#bc3a08] text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Connect Database
        </Link>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 truncate">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;