import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpDown, 
  Eye, 
  Plus, 
  Minus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText,
  X
} from 'lucide-react';
import { Order, User, PrintType } from '../types';

interface ReprintPageProps {
  orders: Order[];
  user: User;
  onProceedToReprintPayment: (orderDraft: any) => void;
  onCancel: () => void;
}

export const ReprintPage: React.FC<ReprintPageProps> = ({
  orders,
  user,
  onProceedToReprintPayment,
  onCancel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Modal customization state for reprint
  const [reprintCopies, setReprintCopies] = useState(1);
  const [reprintPrintType, setReprintPrintType] = useState<PrintType>('bw');

  const userOrders = orders.filter((o) => o.userId === user.id || user.role === 'admin');

  // Filter & search orders
  const filteredOrders = userOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.files.some((f) => f.fileName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReprintModal = (order: Order) => {
    setSelectedOrder(order);
    setReprintCopies(order.generalSettings.copies || 1);
    setReprintPrintType(order.generalSettings.printType || 'bw');
  };

  // Live recalculate reprint price
  const calculateReprintTotal = () => {
    if (!selectedOrder) return 0;
    const basePages = selectedOrder.files.reduce((sum, f) => sum + f.pageCount, 0);
    const rate = reprintPrintType === 'color' ? 5 : 2;
    const sizeMultiplier = selectedOrder.generalSettings.paperSize === 'A3' ? 1.5 : 1;
    const printing = basePages * reprintCopies * rate * sizeMultiplier;
    const binding = selectedOrder.bindingCost > 0 ? selectedOrder.bindingCost : 0;
    const lamination = selectedOrder.laminationCost > 0 ? selectedOrder.laminationCost : 0;
    const sub = printing + binding + lamination;
    const gst = Math.round(sub * 0.05);
    return Math.round(sub + gst);
  };

  const handleConfirmReprint = () => {
    if (!selectedOrder) return;

    const basePages = selectedOrder.files.reduce((sum, f) => sum + f.pageCount, 0);
    const rate = reprintPrintType === 'color' ? 5 : 2;
    const sizeMultiplier = selectedOrder.generalSettings.paperSize === 'A3' ? 1.5 : 1;
    const printingCost = Math.round(basePages * reprintCopies * rate * sizeMultiplier);
    const totalAmount = calculateReprintTotal();

    const orderDraft = {
      files: selectedOrder.files.map((f) => ({
        ...f,
        copies: reprintCopies,
        printType: reprintPrintType,
        itemTotal: Math.round(f.pageCount * reprintCopies * rate * sizeMultiplier),
      })),
      generalSettings: {
        ...selectedOrder.generalSettings,
        copies: reprintCopies,
        printType: reprintPrintType,
        instructions: `Reprint of previous order ${selectedOrder.id}. ${selectedOrder.generalSettings.instructions || ''}`,
      },
      totalPages: basePages * reprintCopies,
      printingCost,
      bindingCost: selectedOrder.bindingCost,
      laminationCost: selectedOrder.laminationCost,
      gstAmount: Math.round(printingCost * 0.05),
      totalAmount,
      isReprint: true,
      originalOrderId: selectedOrder.id,
    };

    onProceedToReprintPayment(orderDraft);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb matching Image 2 View 6 */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onCancel} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600">Reprint</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Reprint Previous Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Instantly re-order previous documents without re-uploading files. Modify copies or settings anytime.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar matching Image 2 View 6 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or File Name..."
            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Printing Started">Printing</option>
            <option value="Ready for Pickup">Ready for Pickup</option>
            <option value="Order Received">Pending</option>
          </select>
        </div>
      </div>

      {/* Table matching Image 2 View 6 */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">File Name</th>
                <th className="py-3 px-2 text-center">Type</th>
                <th className="py-3 px-2 text-center">Copies</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredOrders.map((order) => {
                const primaryFile = order.files[0]?.fileName || 'Document.pdf';
                const fileType = order.generalSettings.printType === 'color' ? 'Color' : 'B&W';
                return (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-blue-700">{order.id}</span>
                      <span className="block text-[10px] text-slate-400 font-mono">Token: {order.tokenNumber}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {order.createdAt.split(',')[0]}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{primaryFile}</div>
                      {order.files.length > 1 && (
                        <span className="text-[10px] text-blue-600 font-semibold">
                          +{order.files.length - 1} more file
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        fileType === 'Color' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {fileType}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      {order.generalSettings.copies}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-slate-900">
                      ₹{order.totalAmount}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Printing Started'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenReprintModal(order)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 mx-auto shadow-2xs cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reprint Now</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Reprint Customization */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Reprint Order</h3>
                  <p className="text-xs text-slate-500 font-mono">Original: {selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Document details */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-slate-800">{selectedOrder.files[0]?.fileName}</p>
                <p className="text-slate-500">
                  Total Pages: {selectedOrder.files.reduce((sum, f) => sum + f.pageCount, 0)} pages &bull; 
                  Binding: {selectedOrder.generalSettings.binding !== 'none' ? selectedOrder.generalSettings.binding : 'None'}
                </p>
              </div>

              {/* Copies adjuster */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Number of Copies</label>
                <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <button
                    onClick={() => setReprintCopies(Math.max(1, reprintCopies - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                  >
                    <Minus className="w-4 h-4 text-slate-700" />
                  </button>
                  <span className="text-xl font-black text-slate-900">{reprintCopies}</span>
                  <button
                    onClick={() => setReprintCopies(reprintCopies + 1)}
                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                  >
                    <Plus className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>

              {/* Print Type toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Color Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setReprintPrintType('bw')}
                    className={`p-2.5 rounded-xl border text-xs font-bold ${
                      reprintPrintType === 'bw'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Black &amp; White (₹2)
                  </button>
                  <button
                    onClick={() => setReprintPrintType('color')}
                    className={`p-2.5 rounded-xl border text-xs font-bold ${
                      reprintPrintType === 'color'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Color (₹5)
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-blue-900 uppercase">Reprint Cost</p>
                  <p className="text-xs text-slate-500">Live updated amount</p>
                </div>
                <div className="text-2xl font-black text-blue-800 font-mono">
                  ₹{calculateReprintTotal()}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleConfirmReprint}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
