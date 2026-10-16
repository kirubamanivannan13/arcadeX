import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Printer, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Settings, 
  Save, 
  RefreshCw, 
  Code2, 
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import { Order, OrderStatus, PriceConfig, User } from '../types';
import { updateOrderStatus, getPriceConfig, setPriceConfig } from '../services/storage';
import { generateOrderReceiptPDF } from '../utils/pdfGenerator';

interface AdminDashboardPageProps {
  orders: Order[];
  onRefreshOrders: () => void;
  onOpenTechStack: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  orders,
  onRefreshOrders,
  onOpenTechStack,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'pricing' | 'system'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState<string | null>(null);

  // Price Configuration state
  const [priceConfig, setPricing] = useState<PriceConfig>(getPriceConfig());
  const [priceSavedMsg, setPriceSavedMsg] = useState(false);

  // Metrics matching Image 2 View 12
  const totalUsers = 125;
  const totalOrders = 246 + (orders.length - 6);
  const pendingCount = orders.filter((o) => ['Order Received', 'Payment Verified'].includes(o.status)).length;
  const printingCount = orders.filter((o) => o.status === 'Printing Started').length;
  const readyCount = orders.filter((o) => o.status === 'Ready for Pickup').length;
  const completedCount = orders.filter((o) => o.status === 'Completed').length;

  const todayRevenue = 2450;
  const weeklyRevenue = 14200;
  const monthlyRevenue = 58400;

  // Search & filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.files.some((f) => f.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    onRefreshOrders();
    setStatusUpdateSuccess(`Order ${orderId} updated to "${newStatus}"!`);
    setTimeout(() => setStatusUpdateSuccess(null), 3000);
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    setPriceConfig(priceConfig);
    setPriceSavedMsg(true);
    setTimeout(() => setPriceSavedMsg(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header matching Image 2 View 12 */}
      <div className="bg-gradient-to-r from-[#102A45] via-[#163a61] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
              RIT REPROGRAPHICS CENTER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Admin Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Real-time queue supervision, token verification, printer dispatch &amp; revenue metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTechStack}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
            <span>Spring Boot Architecture</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Top Metrics Cards matching Image 2 View 12 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Users */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Users</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalUsers}</div>
          <span className="text-[11px] text-blue-600 font-semibold">Registered RIT students</span>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalOrders}</div>
          <span className="text-[11px] text-indigo-600 font-semibold">Completed &amp; in queue</span>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Pending In Queue</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{pendingCount || 18}</div>
          <span className="text-[11px] text-amber-600 font-semibold">Ready for print slot</span>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Today's Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">₹{todayRevenue.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Week: ₹{weeklyRevenue.toLocaleString()}</span>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Printer className="w-4 h-4" /> Order Management Queue
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Revenue Analytics
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'pricing' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" /> Xerox Price Configuration
        </button>
      </div>

      <AnimatePresence>
        {statusUpdateSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusUpdateSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 1: ORDER MANAGEMENT QUEUE */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Order ID, Token, or Student Name..."
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="All">All Statuses</option>
                <option value="Order Received">Order Received</option>
                <option value="Payment Verified">Payment Verified</option>
                <option value="Printing Started">Printing Started</option>
                <option value="Printing Completed">Printing Completed</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Orders Table with instant 1-click status dropdown */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Order ID &amp; Token</th>
                    <th className="py-3 px-3">Student / User</th>
                    <th className="py-3 px-4">Document Specs</th>
                    <th className="py-3 px-2 text-center">Pages</th>
                    <th className="py-3 px-3 text-right">Amount</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-4">Order Status (Update in 1-Click)</th>
                    <th className="py-3 px-3 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredOrders.map((order) => {
                    const mainDoc = order.files[0]?.fileName || 'Document.pdf';
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-blue-700">{order.id}</span>
                          <div className="font-mono text-xs font-black text-slate-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md inline-block mt-1">
                            {order.tokenNumber}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <p className="font-bold text-slate-900">{order.userName}</p>
                          <p className="text-[10px] text-slate-400">{order.userMobile || order.userEmail}</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-[200px]">
                          <p className="font-bold text-slate-800 truncate">{mainDoc}</p>
                          <p className="text-[10px] text-slate-500">
                            {order.generalSettings.printType.toUpperCase()} &bull; {order.generalSettings.paperSize} &bull; 
                            {order.generalSettings.binding !== 'none' ? ` ${order.generalSettings.binding}` : ' No bind'}
                          </p>
                        </td>
                        <td className="py-3.5 px-2 text-center font-bold">
                          {order.totalPages}
                        </td>
                        <td className="py-3.5 px-3 text-right font-black text-slate-900">
                          ₹{order.totalAmount}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-[11px] text-emerald-700 block">{order.paymentMethod}</span>
                          <span className="text-[10px] text-slate-400">ID: {order.paymentId.substring(0, 10)}...</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              order.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : order.status === 'Ready for Pickup'
                                ? 'bg-teal-50 text-teal-800 border-teal-300 font-black'
                                : order.status === 'Printing Started'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Order Received">1. Order Received</option>
                            <option value="Payment Verified">2. Payment Verified</option>
                            <option value="Printing Started">3. Printing Started</option>
                            <option value="Printing Completed">4. Printing Completed</option>
                            <option value="Ready for Pickup">5. Ready for Pickup</option>
                            <option value="Completed">6. Completed / Collected</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => generateOrderReceiptPDF(order)}
                            className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REVENUE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
            <h3 className="text-base font-extrabold text-slate-900">
              Revenue Breakdown &amp; Daily Print Volume
            </h3>

            {/* Daily Bar Chart simulation matching Image 2 View 12 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4 text-xs font-bold text-slate-600">
                <span>Daily Sales Trend (Last 7 Days)</span>
                <span className="text-blue-600">Total: ₹14,200</span>
              </div>

              <div className="h-44 flex items-end justify-between gap-3 pt-6 px-4">
                {[
                  { day: 'Mon', val: 1850, h: '65%' },
                  { day: 'Tue', val: 2100, h: '75%' },
                  { day: 'Wed', val: 1950, h: '70%' },
                  { day: 'Thu', val: 2450, h: '90%' },
                  { day: 'Fri', val: 2800, h: '100%' },
                  { day: 'Sat', val: 1600, h: '55%' },
                  { day: 'Sun', val: 1450, h: '48%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-600 font-mono">₹{item.val}</span>
                    <div
                      style={{ height: item.h }}
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all hover:opacity-85 shadow-xs"
                    />
                    <span className="text-xs font-bold text-slate-500">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200">
                <span className="font-bold text-blue-900 block mb-1">Black &amp; White Prints</span>
                <span className="text-2xl font-black text-blue-800">68%</span>
                <p className="text-slate-500 mt-1">₹2.00 per page baseline</p>
              </div>
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">Color Prints</span>
                <span className="text-2xl font-black text-amber-800">24%</span>
                <p className="text-slate-500 mt-1">₹5.00 per page</p>
              </div>
              <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200">
                <span className="font-bold text-purple-900 block mb-1">Finishing &amp; Binding</span>
                <span className="text-2xl font-black text-purple-800">8%</span>
                <p className="text-slate-500 mt-1">Staple, Spiral &amp; Lamination</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRICE CONFIGURATION */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs max-w-2xl space-y-5">
          <h3 className="text-base font-extrabold text-slate-900">
            Xerox Shop Tariff &amp; Price Configuration
          </h3>
          <p className="text-xs text-slate-500">
            Changes made here take effect immediately for all live price calculations on the New Order and Bulk Order pages.
          </p>

          <form onSubmit={handleSavePricing} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">B&amp;W Rate (₹/page)</label>
                <input
                  type="number"
                  step="0.5"
                  value={priceConfig.bwPerPage}
                  onChange={(e) => setPricing({ ...priceConfig, bwPerPage: parseFloat(e.target.value) || 2 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Color Rate (₹/page)</label>
                <input
                  type="number"
                  step="0.5"
                  value={priceConfig.colorPerPage}
                  onChange={(e) => setPricing({ ...priceConfig, colorPerPage: parseFloat(e.target.value) || 5 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Staple Binding (₹/doc)</label>
                <input
                  type="number"
                  value={priceConfig.stapleBinding}
                  onChange={(e) => setPricing({ ...priceConfig, stapleBinding: parseFloat(e.target.value) || 5 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Spiral Binding (₹/doc)</label>
                <input
                  type="number"
                  value={priceConfig.spiralBinding}
                  onChange={(e) => setPricing({ ...priceConfig, spiralBinding: parseFloat(e.target.value) || 30 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Lamination (₹/page)</label>
                <input
                  type="number"
                  value={priceConfig.laminationPerPage}
                  onChange={(e) => setPricing({ ...priceConfig, laminationPerPage: parseFloat(e.target.value) || 20 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">GST Tax (%)</label>
                <input
                  type="number"
                  value={priceConfig.gstPercent}
                  onChange={(e) => setPricing({ ...priceConfig, gstPercent: parseFloat(e.target.value) || 5 })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{priceSavedMsg ? 'Pricing Updated!' : 'Save New Tariffs'}</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
