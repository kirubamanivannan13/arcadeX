import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  Printer, 
  CreditCard, 
  PackageCheck, 
  FileCheck2, 
  Sparkles, 
  ArrowLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { updateOrderStatus, getOrders } from '../services/storage';

interface OrderTrackingPageProps {
  orders: Order[];
  initialOrderId?: string;
  onBackToDashboard: () => void;
  onRefreshOrders: () => void;
}

const STAGES: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'Order Received', label: 'Order Received', icon: FileCheck2 },
  { status: 'Payment Verified', label: 'Payment Verified', icon: CreditCard },
  { status: 'Printing Started', label: 'Printing Started', icon: Printer },
  { status: 'Printing Completed', label: 'Printing Completed', icon: PackageCheck },
  { status: 'Ready for Pickup', label: 'Ready for Pickup', icon: Clock },
  { status: 'Completed', label: 'Order Collected', icon: CheckCircle2 },
];

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  orders,
  initialOrderId,
  onBackToDashboard,
  onRefreshOrders,
}) => {
  const [query, setQuery] = useState(initialOrderId || orders[0]?.id || '');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders.find((o) => o.id === (initialOrderId || orders[0]?.id)) || orders[0] || null
  );
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);

    const cleanQuery = query.trim().toUpperCase();
    const found = orders.find(
      (o) => o.id.toUpperCase() === cleanQuery || o.tokenNumber.toUpperCase() === cleanQuery
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      setSearchError(`No order found matching "${query}". Try searching by Order ID (e.g. ARC202600123) or Token (e.g. A-105).`);
    }
  };

  // Simulate advancing order stage in real-time
  const handleSimulateNextStage = () => {
    if (!selectedOrder) return;
    const currentIdx = STAGES.findIndex((s) => s.status === selectedOrder.status);
    if (currentIdx < STAGES.length - 1) {
      const nextStatus = STAGES[currentIdx + 1].status;
      const updated = updateOrderStatus(selectedOrder.id, nextStatus);
      if (updated) {
        setSelectedOrder({ ...updated });
        onRefreshOrders();
      }
    }
  };

  const getStageIndex = (status: OrderStatus) => {
    return STAGES.findIndex((s) => s.status === status);
  };

  const currentStageIndex = selectedOrder ? getStageIndex(selectedOrder.status) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb matching Image 2 View 9 */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onBackToDashboard} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600">Track Order</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Live Order Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time Xerox progress from submission to counter pickup.
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="self-start sm:self-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Search Input matching Image 2 View 9 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. ARC202600123) or Token (e.g. A-105)..."
              className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            Track Order
          </button>
        </form>

        {searchError && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}

        {/* Quick chip selector from recent orders */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400">Quick Track:</span>
          {orders.slice(0, 4).map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setQuery(o.id);
                setSelectedOrder(o);
                setSearchError(null);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedOrder?.id === o.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {o.tokenNumber} ({o.id.substring(o.id.length - 5)})
            </button>
          ))}
        </div>
      </div>

      {selectedOrder ? (
        /* Order Tracking Card matching Image 2 View 9 */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {selectedOrder.id}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 font-black font-mono text-sm rounded-xl">
                  Token: {selectedOrder.tokenNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Document: <span className="font-bold text-slate-800">{selectedOrder.files[0]?.fileName}</span> &bull; 
                Total Pages: {selectedOrder.totalPages} pgs &bull; Paid: ₹{selectedOrder.totalAmount}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-slate-400 block font-medium">Estimated Pickup</span>
              <span className="text-xl font-black text-blue-600 font-mono">
                {selectedOrder.estimatedPickupTime}
              </span>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {selectedOrder.status}
              </span>
            </div>
          </div>

          {/* Animated 6-Stage Timeline matching Image 2 View 9 */}
          <div className="py-4">
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0 hidden md:block" />
              <div 
                className="absolute top-5 left-6 h-1 bg-blue-600 transition-all duration-500 -z-0 hidden md:block"
                style={{ width: `${(Math.min(currentStageIndex, 5) / 5) * 88}%` }}
              />

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
                {STAGES.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isCompleted = idx < currentStageIndex || (idx === currentStageIndex && selectedOrder.status === 'Completed');
                  const isCurrent = idx === currentStageIndex && selectedOrder.status !== 'Completed';
                  const isUpcoming = idx > currentStageIndex;

                  return (
                    <div key={stage.status} className="flex flex-col items-center text-center">
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                          isCompleted
                            ? 'bg-blue-600 text-white'
                            : isCurrent
                            ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>

                      <p className={`text-xs font-bold mt-2.5 ${
                        isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {stage.label}
                      </p>

                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Status Advance Simulation Button */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-slate-800">Real-Time Sync Engine</p>
              <p className="text-slate-500">
                Status automatically changes when shop staff scan token or advance queue in the Admin Dashboard.
              </p>
            </div>
            {currentStageIndex < STAGES.length - 1 && (
              <button
                onClick={handleSimulateNextStage}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Simulate Next Stage</span>
              </button>
            )}
          </div>

        </div>
      ) : null}
    </div>
  );
};
