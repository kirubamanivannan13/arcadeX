import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  Printer, 
  RotateCcw, 
  Eye, 
  History, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  CreditCard, 
  PlusCircle,
  FileText,
  X
} from 'lucide-react';
import { Order, User, OrderStatus } from '../types';
import { generateOrderReceiptPDF } from '../utils/pdfGenerator';

interface OrderHistoryPageProps {
  orders: Order[];
  user: User;
  onTrackOrder: (orderId: string) => void;
  onReprintOrder: (order: Order) => void;
  onNewOrder: () => void;
  onViewPrintableReceipt: (order: Order) => void;
  onBackToDashboard: () => void;
}

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({
  orders,
  user,
  onTrackOrder,
  onReprintOrder,
  onNewOrder,
  onViewPrintableReceipt,
  onBackToDashboard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [selectedDetailsOrder, setSelectedDetailsOrder] = useState<Order | null>(null);

  const userOrders = orders.filter((o) => o.userId === user.id || user.role === 'admin');

  // Filtering
  const filteredOrders = userOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.files.some((f) => f.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'All' || order.paymentMethod === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb matching Image 2 View 10 */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onBackToDashboard} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600">Order History</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order History &amp; Archive
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access past print jobs, view verified receipts, download PDFs, or request instant reprints.
          </p>
        </div>

        <button
          onClick={onNewOrder}
          className="self-start sm:self-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Place New Order</span>
        </button>
      </div>

      {/* Filter and Search Bar matching Image 2 View 10 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, Token, or File..."
            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Printing Started">Printing</option>
            <option value="Ready for Pickup">Ready for Pickup</option>
            <option value="Order Received">Order Received</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="All">All Payments</option>
            <option value="Google Pay">Google Pay</option>
            <option value="PhonePe">PhonePe</option>
            <option value="Paytm">Paytm</option>
          </select>
        </div>
      </div>

      {/* Table matching Image 2 View 10 */}
      {filteredOrders.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Order ID &amp; Token</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-4">Document</th>
                  <th className="py-3 px-2 text-center">Type</th>
                  <th className="py-3 px-2 text-center">Copies</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredOrders.map((order) => {
                  const mainFile = order.files[0]?.fileName || 'Document.pdf';
                  const isColor = order.generalSettings.printType === 'color';
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-blue-700">{order.id}</span>
                        <div className="font-mono text-[11px] font-black text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">
                          {order.tokenNumber}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                        {order.createdAt.split(',')[0]}
                      </td>
                      <td className="py-3.5 px-4 max-w-[180px]">
                        <p className="font-bold text-slate-900 truncate">{mainFile}</p>
                        <p className="text-[10px] text-slate-400">
                          {order.totalPages} pages &bull; {order.files.length} file(s)
                        </p>
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isColor ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {isColor ? 'Color' : 'B&W'}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-center font-bold">
                        {order.generalSettings.copies}
                      </td>
                      <td className="py-3.5 px-3 text-right font-black text-slate-900">
                        ₹{order.totalAmount}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-800 text-[11px] block">{order.paymentMethod}</span>
                        <span className="text-[9px] text-emerald-600 font-bold uppercase">PAID</span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                          order.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Printing Started'
                            ? 'bg-blue-100 text-blue-800 animate-pulse'
                            : order.status === 'Ready for Pickup'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            title="View Order Details"
                            onClick={() => setSelectedDetailsOrder(order)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Download PDF Receipt"
                            onClick={() => generateOrderReceiptPDF(order)}
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Printable Receipt View"
                            onClick={() => onViewPrintableReceipt(order)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Reprint this Order"
                            onClick={() => onReprintOrder(order)}
                            className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-xs max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Orders Found</h3>
          <p className="text-xs text-slate-500">
            No previous Xerox jobs match your current search or filter criteria.
          </p>
          <button
            onClick={onNewOrder}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            Place Your First Order
          </button>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedDetailsOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Order Overview</h3>
                  <p className="text-xs text-slate-500 font-mono">{selectedDetailsOrder.id}</p>
                </div>
                <button
                  onClick={() => setSelectedDetailsOrder(null)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-900">Pickup Token</span>
                    <p className="text-2xl font-black font-mono text-blue-700">{selectedDetailsOrder.tokenNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-blue-900">Status</span>
                    <p className="font-bold text-slate-800">{selectedDetailsOrder.status}</p>
                  </div>
                </div>

                <div className="space-y-1.5 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer:</span>
                    <span className="font-bold text-slate-800">{selectedDetailsOrder.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment:</span>
                    <span className="font-bold text-slate-800">{selectedDetailsOrder.paymentMethod} (PAID)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date Placed:</span>
                    <span className="font-bold text-slate-800">{selectedDetailsOrder.createdAt}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-700">Documents ({selectedDetailsOrder.files.length}):</p>
                  {selectedDetailsOrder.files.map((f, i) => (
                    <div key={i} className="flex justify-between p-2 bg-white border border-slate-200 rounded-lg">
                      <span>{f.fileName}</span>
                      <span className="font-bold">₹{f.itemTotal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    generateOrderReceiptPDF(selectedDetailsOrder);
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF Receipt
                </button>
                <button
                  onClick={() => {
                    const ord = selectedDetailsOrder;
                    setSelectedDetailsOrder(null);
                    onTrackOrder(ord.id);
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                >
                  Track
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
