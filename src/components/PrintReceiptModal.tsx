import React from 'react';
import { motion } from 'motion/react';
import { X, Download, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Order } from '../types';
import { generateOrderReceiptPDF } from '../utils/pdfGenerator';

interface PrintReceiptModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const handleDownloadPDF = () => {
    generateOrderReceiptPDF(order);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-6"
      >
        {/* Modal Top Actions */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 px-6 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Digital Receipt</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Paid & Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div id="printable-receipt" className="p-8 bg-white text-slate-800">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-6 h-6 rounded bg-[#102A45] text-white flex items-center justify-center text-[10px] font-extrabold">
                RIT
              </div>
              <h2 className="text-base font-extrabold tracking-tight text-[#102A45] uppercase">
                Rajalakshmi Institute of Technology
              </h2>
            </div>
            <p className="text-xs font-bold text-blue-800 tracking-wider">ARCADE SMART XEROX MANAGEMENT SYSTEM</p>
            <p className="text-[11px] text-slate-500">Campus Digital Reprographics Center &bull; Ground Floor, Academic Block</p>
          </div>

          {/* Token Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-xl p-5 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Order Token Number</p>
              <p className="text-4xl font-black text-blue-700 tracking-tight font-mono">{order.tokenNumber}</p>
              <p className="text-xs text-slate-600 mt-1">Present this token at the Xerox counter for pickup</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Order ID</div>
              <div className="text-sm font-bold font-mono text-slate-900">{order.id}</div>
              <div className="text-xs text-slate-500 mt-2">Estimated Pickup</div>
              <div className="text-sm font-bold text-emerald-700">{order.estimatedPickupTime}</div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-slate-200 text-xs">
            <div>
              <span className="text-slate-500">Customer Name:</span>
              <p className="font-bold text-slate-800">{order.userName}</p>
              <span className="text-slate-500 mt-1 block">Contact:</span>
              <p className="font-medium text-slate-700">{order.userMobile || order.userEmail}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Order Date:</span>
              <p className="font-medium text-slate-800">{order.createdAt}</p>
              <span className="text-slate-500 mt-1 block">Payment Method:</span>
              <p className="font-bold text-emerald-700">{order.paymentMethod} (ID: {order.paymentId.substring(0, 14)}...)</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-2 px-3 font-bold">Item / Document</th>
                  <th className="py-2 px-2 font-bold">Specs</th>
                  <th className="py-2 px-2 font-bold text-center">Pages &times; Copies</th>
                  <th className="py-2 px-3 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.files.map((file, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{file.fileName}</div>
                      <div className="text-[10px] text-slate-400">{file.fileSize}</div>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600">
                      <span className="font-medium uppercase">{file.printType}</span> &bull; {file.paperSize} &bull; {file.binding !== 'none' ? file.binding : 'No binding'}
                    </td>
                    <td className="py-2.5 px-2 text-center font-medium">
                      {file.pageCount} pgs &times; {file.copies}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      ₹{file.itemTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {order.generalSettings.instructions && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 mb-5">
              <span className="font-bold">Instructions: </span>
              {order.generalSettings.instructions}
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Printing Charges</span>
              <span>₹{order.printingCost}</span>
            </div>
            {order.bindingCost > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Binding Charges</span>
                <span>₹{order.bindingCost}</span>
              </div>
            )}
            {order.laminationCost > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Lamination Charges</span>
                <span>₹{order.laminationCost}</span>
              </div>
            )}
            {order.gstAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span>
                <span>₹{order.gstAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-300">
              <span>Total Paid Amount</span>
              <span className="text-blue-700 text-base">₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Verification Barcode simulation & Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-semibold text-slate-600">
                Digitally verified by RIT Arcade Smart Xerox System &bull; Java Spring Boot & MySQL Backend
              </span>
            </div>
            <p className="font-script text-xl text-blue-600">From blank page to final print.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
