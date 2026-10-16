import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  Search, 
  PlusCircle, 
  LayoutDashboard, 
  Clock, 
  ShieldCheck, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { Order } from '../types';
import { generateOrderReceiptPDF } from '../utils/pdfGenerator';

interface OrderSuccessPageProps {
  order: Order;
  onTrackOrder: (orderId: string) => void;
  onNewOrder: () => void;
  onGoToDashboard: () => void;
  onViewPrintableReceipt: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  order,
  onTrackOrder,
  onNewOrder,
  onGoToDashboard,
  onViewPrintableReceipt,
}) => {
  const [copiedToken, setCopiedToken] = React.useState(false);

  useEffect(() => {
    // Confetti celebration burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#6366f1', '#f59e0b'],
    });
  }, []);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(order.tokenNumber);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleDownloadPDF = () => {
    generateOrderReceiptPDF(order);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Success Badge & Animated Checkmark matching Image 2 View 8 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center space-y-3"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
          Your Xerox order has been placed successfully and sent to the RIT print center queue.
        </p>
      </motion.div>

      {/* Main Order & Token Card matching Image 2 View 8 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6">
        
        {/* Token Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#102A45] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold text-blue-200 uppercase tracking-widest">
              CAMPUS PICKUP TOKEN NUMBER
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-cyan-300">
                {order.tokenNumber}
              </span>
              <button
                onClick={handleCopyToken}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToken ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-blue-200 mt-1">
              Show this token on your phone at RIT Academic Block ground floor Xerox counter.
            </p>
          </div>

          <div className="sm:text-right bg-white/10 p-3.5 rounded-xl border border-white/10 shrink-0">
            <p className="text-[10px] text-blue-200 uppercase font-bold">Estimated Pickup</p>
            <p className="text-lg font-black text-white">{order.estimatedPickupTime}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
              {order.status}
            </span>
          </div>
        </div>

        {/* Detailed Order Metadata grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Order ID</span>
            <span className="font-mono font-bold text-slate-900">{order.id}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Customer</span>
            <span className="font-bold text-slate-900">{order.userName}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Payment Method</span>
            <span className="font-bold text-emerald-700">{order.paymentMethod}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Total Amount Paid</span>
            <span className="font-black text-slate-900 text-sm">₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Document Files Details matching Image 2 View 8 */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Documents In This Order ({order.files.length})
          </h3>
          <div className="space-y-2">
            {order.files.map((file, idx) => (
              <div
                key={idx}
                className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] uppercase">
                    {file.fileType}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{file.fileName}</p>
                    <p className="text-[11px] text-slate-500">
                      {file.pageCount} pgs &bull; {file.copies} copies &bull; {file.printType.toUpperCase()} &bull; {file.paperSize}
                    </p>
                  </div>
                </div>
                <div className="font-bold text-slate-800">
                  ₹{file.itemTotal}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons matching Prompt 8 */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Receipt (PDF)</span>
            </button>
            <button
              onClick={onViewPrintableReceipt}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Receipt</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onTrackOrder(order.id)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track Order</span>
            </button>
            <button
              onClick={onGoToDashboard}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
