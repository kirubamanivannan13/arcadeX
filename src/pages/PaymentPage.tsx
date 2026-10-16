import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  ArrowRight, 
  QrCode, 
  Smartphone, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { PaymentMethod, User, Order } from '../types';
import { generateNextOrderId, generateNextTokenNumber, getOrders, saveOrders } from '../services/storage';

interface PaymentPageProps {
  user: User;
  orderDraft: any;
  onPaymentSuccess: (newOrder: Order) => void;
  onCancel: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  user,
  orderDraft,
  onPaymentSuccess,
  onCancel,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('Google Pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState(`${user.name.toLowerCase().replace(/\s+/g, '')}@okaxis`);
  const [showQR, setShowQR] = useState(true);

  if (!orderDraft) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-slate-600 mb-4">No active print order in checkout.</p>
        <button onClick={onCancel} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">
          Start a New Order
        </button>
      </div>
    );
  }

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const orderId = generateNextOrderId();
      const tokenNumber = generateNextTokenNumber();
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      // Estimated pickup 15 mins from now
      const pickupDate = new Date(now.getTime() + 15 * 60000);
      const estPickup = pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newOrder: Order = {
        id: orderId,
        tokenNumber,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userMobile: user.mobile,
        files: orderDraft.files,
        generalSettings: orderDraft.generalSettings,
        totalPages: orderDraft.totalPages,
        printingCost: orderDraft.printingCost,
        bindingCost: orderDraft.bindingCost,
        laminationCost: orderDraft.laminationCost,
        gstAmount: orderDraft.gstAmount,
        totalAmount: orderDraft.totalAmount,
        paymentMethod: selectedMethod,
        paymentId: `${selectedMethod.toLowerCase().replace(/\s+/g, '_')}_txn_${Date.now()}`,
        paymentTime: `${dateStr}, ${timeStr}`,
        status: 'Order Received',
        statusTimeline: [
          { status: 'Order Received', time: timeStr, completed: true, active: true },
          { status: 'Payment Verified', time: timeStr, completed: true, active: false },
          { status: 'Printing Started', time: 'Queued', completed: false, active: false },
          { status: 'Printing Completed', time: 'Pending', completed: false, active: false },
          { status: 'Ready for Pickup', time: `Est. ${estPickup}`, completed: false, active: false },
          { status: 'Completed', time: 'Pending', completed: false, active: false },
        ],
        createdAt: `${dateStr}, ${timeStr}`,
        estimatedPickupTime: estPickup,
        isReprint: orderDraft.isReprint || false,
        originalOrderId: orderDraft.originalOrderId,
      };

      // Persist in orders storage
      const existing = getOrders();
      saveOrders([newOrder, ...existing]);

      // Trigger success callback
      onPaymentSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb Navigation matching Image 2 View 7 */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onCancel} className="hover:text-blue-600">Order</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600">Payment &amp; Checkout</span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Payment &amp; Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your order specification, select your preferred UPI payment method, and complete payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Complete Order Summary matching Image 2 View 7 (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-bold text-blue-600">
                {orderDraft.files.length} Document(s)
              </span>
            </h2>

            {/* Document list preview matching Image 2 View 7 */}
            <div className="space-y-2.5">
              {orderDraft.files.map((file: any, index: number) => (
                <div
                  key={index}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold uppercase text-[11px]">
                      {file.fileType || 'PDF'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{file.fileName}</p>
                      <p className="text-[11px] text-slate-500">
                        {file.pageCount} pages &bull; {file.copies} {file.copies > 1 ? 'copies' : 'copy'} &bull; 
                        <span className="uppercase font-semibold ml-1 text-slate-700">{file.printType}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-sm">₹{file.itemTotal}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Itemized Pricing Rules Breakdown */}
            <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Billable Pages</span>
                <span className="font-bold text-slate-800">{orderDraft.totalPages} pgs</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Printing Charges</span>
                <span className="font-bold text-slate-800">₹{orderDraft.printingCost}</span>
              </div>
              {orderDraft.bindingCost > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Binding Charges</span>
                  <span className="font-bold text-slate-800">₹{orderDraft.bindingCost}</span>
                </div>
              )}
              {orderDraft.laminationCost > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Lamination Charges</span>
                  <span className="font-bold text-slate-800">₹{orderDraft.laminationCost}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-800">₹{orderDraft.gstAmount}</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Payable</p>
                <p className="text-xs text-blue-200">Instant UPI Verification</p>
              </div>
              <div className="text-3xl font-black font-mono text-cyan-300">
                ₹{orderDraft.totalAmount}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Options matching Image 2 View 7 (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Select Payment Method
            </h2>

            {/* 3 Payment Options matching Image 2 View 7: Google Pay, PhonePe, Paytm */}
            <div className="space-y-3">
              
              {/* Google Pay */}
              <button
                type="button"
                onClick={() => setSelectedMethod('Google Pay')}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  selectedMethod === 'Google Pay'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1.5 shadow-2xs">
                    {/* Google Pay G Logo representation */}
                    <span className="text-base font-black text-blue-600">G</span>
                    <span className="text-xs font-black text-rose-500">P</span>
                    <span className="text-xs font-black text-amber-500">a</span>
                    <span className="text-xs font-black text-emerald-500">y</span>
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-slate-900 text-sm">Google Pay</p>
                    <p className="text-[11px] text-slate-500">UPI (GPay Instant)</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'Google Pay' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}>
                  {selectedMethod === 'Google Pay' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>

              {/* PhonePe */}
              <button
                type="button"
                onClick={() => setSelectedMethod('PhonePe')}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  selectedMethod === 'PhonePe'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5f259f] text-white flex items-center justify-center font-bold text-lg shadow-2xs">
                    पे
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-slate-900 text-sm">PhonePe</p>
                    <p className="text-[11px] text-slate-500">UPI &amp; Wallet</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'PhonePe' ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                }`}>
                  {selectedMethod === 'PhonePe' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>

              {/* Paytm */}
              <button
                type="button"
                onClick={() => setSelectedMethod('Paytm')}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  selectedMethod === 'Paytm'
                    ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#002e6e] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                    Paytm
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-slate-900 text-sm">Paytm</p>
                    <p className="text-[11px] text-slate-500">UPI &amp; Postpaid</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'Paytm' ? 'border-sky-600 bg-sky-600' : 'border-slate-300'
                }`}>
                  {selectedMethod === 'Paytm' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            </div>

            {/* Dynamic UPI QR Code Simulator */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Scan &amp; Pay with Any App</span>
                <span className="font-mono text-blue-600 font-bold">ritxerox@upi</span>
              </div>

              {/* Visual simulated QR pattern */}
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center relative">
                <div className="w-full h-full bg-slate-900 rounded-lg p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-white" /></div>
                    <div className="w-6 h-6 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-white" /></div>
                  </div>
                  <div className="text-center font-mono text-[9px] text-cyan-300 font-bold">
                    ₹{orderDraft.totalAmount}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-6 h-6 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-white" /></div>
                    <div className="w-4 h-4 bg-white rounded-xs" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">
                Supports BHIM, Google Pay, PhonePe, Paytm, CRED &amp; Bank UPI
              </p>
            </div>

            {/* Pay Now Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Payment via UPI Gateway...</span>
                </div>
              ) : (
                <>
                  <span>Pay Now (₹{orderDraft.totalAmount})</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* 256-bit SSL Security badge matching Image 2 View 7 */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-600">Secure Payment &bull; 256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
