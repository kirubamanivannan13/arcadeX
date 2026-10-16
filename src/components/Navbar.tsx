import React from 'react';
import { 
  Printer, 
  Layers, 
  ShieldAlert, 
  User as UserIcon, 
  LogOut, 
  Clock, 
  PlusCircle, 
  History, 
  Search, 
  FileStack, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  Bell
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenTechStack: () => void;
  onLogout: () => void;
  onSwitchRole: (role: 'student' | 'admin') => void;
  activeOrderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onOpenTechStack,
  onLogout,
  onSwitchRole,
  activeOrderCount,
}) => {
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand with RIT Crest & Arcade */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('landing')}>
          {/* RIT Crest badge */}
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-[#102A45] flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
              RIT
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-[11px] font-extrabold tracking-wider text-[#102A45] uppercase leading-tight">
                RAJALAKSHMI
              </span>
              <span className="block text-[9px] font-semibold tracking-wider text-slate-500 uppercase leading-none">
                INSTITUTE OF TECHNOLOGY
              </span>
            </div>
          </div>

          {/* Arcade Brand Icon */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-2 shadow-md shadow-blue-500/20 flex items-center justify-center text-white">
                <Printer className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none block">
                Arcade
              </span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase block">
                Smart Xerox System
              </span>
            </div>
          </div>
        </div>

        {/* Central Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentView === 'landing' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate(currentUser ? 'dashboard' : 'auth')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate(currentUser ? 'new-order' : 'auth')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'new-order' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-blue-500" />
            New Print
          </button>
          <button
            onClick={() => onNavigate(currentUser ? 'bulk-order' : 'auth')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'bulk-order' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileStack className="w-4 h-4 text-purple-500" />
            Bulk Order
          </button>
          <button
            onClick={() => onNavigate(currentUser ? 'reprint' : 'auth')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'reprint' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-amber-500" />
            Reprint
          </button>
          <button
            onClick={() => onNavigate('track-order')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'track-order' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-500" />
            Track
          </button>
          <button
            onClick={() => onNavigate(currentUser ? 'order-history' : 'auth')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'order-history' ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <History className="w-4 h-4 text-slate-500" />
            History
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5">
          {/* Tech Stack Button matching pill in Image 1 */}
          <button
            onClick={onOpenTechStack}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all shadow-2xs hover:scale-102 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Tech Stack &amp; Java</span>
          </button>

          {/* Role switcher (visible when logged in) */}
          {currentUser && (
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => {
                  onSwitchRole('student');
                  if (currentView === 'admin') onNavigate('dashboard');
                }}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentUser?.role === 'student'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  onSwitchRole('admin');
                  onNavigate('admin');
                }}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                  currentUser?.role === 'admin'
                    ? 'bg-[#102A45] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldAlert className="w-3 h-3 text-amber-300" />
                Admin
              </button>
            </div>
          )}

          {/* User Account / Dropdown */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-slate-800 max-w-[90px] truncate hidden sm:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[10px] rounded-full uppercase">
                      {currentUser.role === 'admin' ? 'Shop Administrator' : 'RIT Student'}
                    </span>
                  </div>

                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigate('profile');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigate('order-history');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <History className="w-4 h-4 text-slate-400" />
                      Order History
                    </button>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigate('track-order');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <Search className="w-4 h-4 text-slate-400" />
                      Track Live Order
                    </button>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          onNavigate('admin');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-blue-700 font-semibold"
                      >
                        <ShieldAlert className="w-4 h-4 text-blue-600" />
                        Admin Dashboard
                      </button>
                    )}
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('auth')}
              className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
