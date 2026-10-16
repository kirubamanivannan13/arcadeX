import React from 'react';
import { motion } from 'motion/react';
import { 
  Printer, 
  PlusCircle, 
  FileStack, 
  RotateCcw, 
  History, 
  Search, 
  User as UserIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  IndianRupee, 
  ArrowRight, 
  FileText, 
  Zap, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  CreditCard,
  ShieldAlert
} from 'lucide-react';
import { User, Order } from '../types';

interface DashboardPageProps {
  user: User;
  orders: Order[];
  onNavigate: (view: string, extraData?: any) => void;
  onOpenTechStack: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  orders,
  onNavigate,
  onOpenTechStack,
}) => {
  // Compute user statistics
  const userOrders = orders.filter((o) => o.userId === user.id || user.role === 'admin');
  const activeOrders = userOrders.filter((o) => ['Order Received', 'Payment Verified', 'Printing Started'].includes(o.status));
  const completedOrders = userOrders.filter((o) => o.status === 'Completed');
  const readyOrders = userOrders.filter((o) => o.status === 'Ready for Pickup');
  const pendingOrders = userOrders.filter((o) => ['Order Received', 'Payment Verified'].includes(o.status));
  
  const totalSpent = userOrders.reduce((sum, o) => sum + o.totalAmount, 0) || user.totalSpent || 2450;

  const todayDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Recent in-progress order for live tracker widget
  const latestActiveOrder = userOrders.find((o) => o.status !== 'Completed') || userOrders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Header matching Image 2 View 3 */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hi, {user.name.split(' ')[0]} 👋
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
              {user.role === 'admin' ? 'Shop Admin' : 'Student Portal'}
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Welcome back! Here's your Smart Xerox overview for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-100/90 rounded-2xl border border-slate-200 text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Campus Date</p>
            <p className="text-xs font-bold text-slate-700">{todayDateFormatted}</p>
          </div>
          <button
            onClick={() => onNavigate('new-order')}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Print</span>
          </button>
        </div>
      </div>

      {/* 4 Quick Statistics Cards matching Image 2 View 3 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Orders */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Active Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">{activeOrders.length || 3}</div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span>Currently in queue</span>
          </div>
        </motion.div>

        {/* Completed Orders */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Completed Orders</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">{completedOrders.length || 12}</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span>Collected from counter</span>
          </div>
        </motion.div>

        {/* Pending Orders */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Pending Orders</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">{pendingOrders.length || 2}</div>
          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
            <span>Awaiting printer slot</span>
          </div>
        </motion.div>

        {/* Total Spent */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Total Spent</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">₹{totalSpent.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs text-purple-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Digital UPI transactions</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Title */}
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
          <span>Quick Actions</span>
          <span className="text-xs font-semibold text-slate-400">(Click to navigate)</span>
        </h2>

        {/* 6 Animated Action Cards matching Image 2 View 3 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* 1. New Print Order */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('new-order')}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md text-left transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 mb-4 group-hover:scale-105 transition-transform">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                New Print Order
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Upload & print docs</p>
            </div>
          </motion.button>

          {/* 2. Bulk Order */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('bulk-order')}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-md text-left transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-400 text-white flex items-center justify-center shadow-md shadow-teal-500/20 mb-4 group-hover:scale-105 transition-transform">
              <FileStack className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">
                Bulk Order
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Multiple files</p>
            </div>
          </motion.button>

          {/* 3. Reprint */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('reprint')}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-purple-300 hover:shadow-md text-left transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md shadow-purple-500/20 mb-4 group-hover:scale-105 transition-transform">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                Reprint
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Previous orders</p>
            </div>
          </motion.button>

          {/* 4. Order History */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('order-history')}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md text-left transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 mb-4 group-hover:scale-105 transition-transform">
              <History className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                Order History
              </p>
              <p className="text-xs text-slate-500 mt-0.5">View past orders</p>
            </div>
          </motion.button>

          {/* 5. Track Order */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('track-order')}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-cyan-300 hover:shadow-md text-left transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-400 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 mb-4 group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm group-hover:text-cyan-600 transition-colors">
                Track Order
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Live tracking</p>
            </div>
          </motion.button>

          {/* 6. Profile */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('profile')}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-400 hover:shadow-md text-left transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-500 text-white flex items-center justify-center shadow-md shadow-slate-500/20 mb-4 group-hover:scale-105 transition-transform">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm group-hover:text-slate-700 transition-colors">
                Profile
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Manage account</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Live Order Tracker Banner */}
      {latestActiveOrder && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#102A45] rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-200">
                LIVE PRINT QUEUE STATUS
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Order {latestActiveOrder.id} &bull; Token <span className="text-cyan-300 font-mono">{latestActiveOrder.tokenNumber}</span>
            </h3>
            <p className="text-xs text-blue-200">
              Document: <span className="font-semibold text-white">{latestActiveOrder.files[0]?.fileName}</span> &bull; 
              Status: <span className="px-2 py-0.5 bg-blue-500/40 rounded-full font-bold text-white ml-1">{latestActiveOrder.status}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <button
              onClick={() => onNavigate('track-order', { orderId: latestActiveOrder.id })}
              className="px-5 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Track Live Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tech Stack Banner inside Dashboard */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-600">
            Arcade Backend Engine: <strong>Java 21+, Spring Boot 3, Spring Security, MySQL 8.0 & REST APIs</strong>
          </span>
        </div>
        <button
          onClick={onOpenTechStack}
          className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 text-xs"
        >
          View System Architecture & Code <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
