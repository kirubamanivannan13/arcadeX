import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  UploadCloud, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ChevronRight, 
  FileStack, 
  Sliders, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { User, PrintType, PaperSize, SideOption, BindingOption } from '../types';

interface BulkFileItem {
  id: string;
  name: string;
  type: string;
  sizeFormatted: string;
  pages: number;
  copies: number;
  printType: PrintType;
  sides: SideOption;
  paperSize: PaperSize;
  binding: BindingOption;
  lamination: boolean;
}

interface BulkOrderPageProps {
  user: User;
  onProceedToPayment: (orderDraft: any) => void;
  onCancel: () => void;
}

export const BulkOrderPage: React.FC<BulkOrderPageProps> = ({
  user,
  onProceedToPayment,
  onCancel,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initial bulk files matching Image 2 View 5
  const [items, setItems] = useState<BulkFileItem[]>([
    {
      id: 'bulk_1',
      name: 'Report.pdf',
      type: 'PDF',
      sizeFormatted: '2.4 MB',
      pages: 12,
      copies: 1,
      printType: 'bw',
      sides: 'single',
      paperSize: 'A4',
      binding: 'none',
      lamination: false,
    },
    {
      id: 'bulk_2',
      name: 'Design.jpg',
      type: 'JPG',
      sizeFormatted: '1.8 MB',
      pages: 1,
      copies: 2,
      printType: 'color',
      sides: 'single',
      paperSize: 'A4',
      binding: 'none',
      lamination: false,
    },
    {
      id: 'bulk_3',
      name: 'Notes.docx',
      type: 'DOCX',
      sizeFormatted: '1.1 MB',
      pages: 5,
      copies: 1,
      printType: 'bw',
      sides: 'single',
      paperSize: 'A4',
      binding: 'staple',
      lamination: false,
    },
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateItemPrice = (item: BulkFileItem) => {
    const rate = item.printType === 'color' ? 5 : 2;
    const sizeMultiplier = item.paperSize === 'A3' ? 1.5 : 1;
    const printCost = item.pages * item.copies * rate * sizeMultiplier;
    const bindingCost = item.binding === 'staple' ? 5 * item.copies : item.binding === 'spiral' ? 30 * item.copies : 0;
    const laminationCost = item.lamination ? 20 * item.pages * item.copies : 0;
    return Math.round(printCost + bindingCost + laminationCost);
  };

  const grandPrintCost = items.reduce((sum, item) => {
    const rate = item.printType === 'color' ? 5 : 2;
    const sizeMultiplier = item.paperSize === 'A3' ? 1.5 : 1;
    return sum + (item.pages * item.copies * rate * sizeMultiplier);
  }, 0);

  const grandBindingCost = items.reduce((sum, item) => {
    return sum + (item.binding === 'staple' ? 5 * item.copies : item.binding === 'spiral' ? 30 * item.copies : 0);
  }, 0);

  const grandLaminationCost = items.reduce((sum, item) => {
    return sum + (item.lamination ? 20 * item.pages * item.copies : 0);
  }, 0);

  const totalPages = items.reduce((sum, item) => sum + (item.pages * item.copies), 0);
  const subtotal = Math.round(grandPrintCost + grandBindingCost + grandLaminationCost);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  const handleFileUpload = (fileList: FileList) => {
    setError(null);
    const newItems: BulkFileItem[] = [];

    Array.from(fileList).forEach((file, index) => {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const sizeFormatted = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`;

      let estPages = 1;
      if (ext === 'PDF') estPages = Math.max(1, Math.round(file.size / (150 * 1024)));

      newItems.push({
        id: `bulk_${Date.now()}_${index}`,
        name: file.name,
        type: ext,
        sizeFormatted,
        pages: estPages,
        copies: 1,
        printType: 'bw',
        sides: 'single',
        paperSize: 'A4',
        binding: 'none',
        lamination: false,
      });
    });

    setItems((prev) => [...prev, ...newItems]);
  };

  const handleProceed = () => {
    if (items.length === 0) {
      setError('Please add at least one document for bulk printing.');
      return;
    }

    const orderDraft = {
      files: items.map((item) => ({
        fileName: item.name,
        fileSize: item.sizeFormatted,
        fileType: item.type.toLowerCase(),
        pageCount: item.pages,
        copies: item.copies,
        printType: item.printType,
        paperSize: item.paperSize,
        sides: item.sides,
        binding: item.binding,
        lamination: item.lamination,
        itemTotal: calculateItemPrice(item),
      })),
      generalSettings: {
        printType: 'mixed',
        sides: 'single',
        paperSize: 'A4',
        orientation: 'portrait',
        copies: 1,
        binding: 'none',
        lamination: false,
        instructions: 'Bulk order batch with custom per-file settings.',
      },
      totalPages,
      printingCost: Math.round(grandPrintCost),
      bindingCost: grandBindingCost,
      laminationCost: grandLaminationCost,
      gstAmount: gst,
      totalAmount: grandTotal,
    };

    onProceedToPayment(orderDraft);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb matching Image 2 View 5 */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onCancel} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600">Bulk Order</span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Bulk Order Processing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload multiple documents at once and customize print specs independently for each file.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Drag & Drop Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all bg-white ${
          dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-blue-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
        <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <p className="text-xs sm:text-sm font-bold text-slate-800">
          Drag &amp; drop multiple files here or <span className="text-blue-600 underline">browse</span>
        </p>
        <p className="text-[11px] text-slate-400 mt-1">PDF, DOCX, JPG, JPEG, PNG</p>
      </div>

      {/* Main Bulk Table and Floating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Table of Files (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Files Queue ({items.length})
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                + Add More Files
              </button>
            </div>

            <table className="w-full text-left text-xs min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">File Name</th>
                  <th className="py-2.5 px-2">Type</th>
                  <th className="py-2.5 px-2">Pages</th>
                  <th className="py-2.5 px-2">Copies</th>
                  <th className="py-2.5 px-2">Settings</th>
                  <th className="py-2.5 px-2 text-right">Price</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {items.map((item) => {
                  const itemPrice = calculateItemPrice(item);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.sizeFormatted}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          min="1"
                          value={item.pages}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, pages: val } : i));
                          }}
                          className="w-12 px-1.5 py-1 border border-slate-200 rounded text-center text-xs font-bold"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, copies: Math.max(1, i.copies - 1) } : i));
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-bold">{item.copies}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, copies: i.copies + 1 } : i));
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-2 space-y-1">
                        <select
                          value={item.printType}
                          onChange={(e) => {
                            setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, printType: e.target.value as PrintType } : i));
                          }}
                          className="text-[11px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-bold"
                        >
                          <option value="bw">B&amp;W (₹2)</option>
                          <option value="color">Color (₹5)</option>
                        </select>
                        <select
                          value={item.binding}
                          onChange={(e) => {
                            setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, binding: e.target.value as BindingOption } : i));
                          }}
                          className="text-[11px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 block"
                        >
                          <option value="none">No Bind</option>
                          <option value="staple">Staple (+₹5)</option>
                          <option value="spiral">Spiral (+₹30)</option>
                        </select>
                      </td>
                      <td className="py-3 px-2 text-right font-black text-slate-900">
                        ₹{itemPrice}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Order Summary (1 Col) matching Image 2 View 5 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-5 sticky top-24">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Files</span>
                <span className="font-extrabold text-slate-900">{items.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Sheets Printed</span>
                <span className="font-extrabold text-slate-900">{totalPages}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Printing Cost</span>
                <span className="font-bold text-slate-800">₹{Math.round(grandPrintCost)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Binding Cost</span>
                <span className="font-bold text-slate-800">₹{grandBindingCost}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Lamination Cost</span>
                <span className="font-bold text-slate-800">₹{grandLaminationCost}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-800">₹{gst}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-blue-900 uppercase">Grand Total</p>
                <p className="text-xs text-slate-500">Bulk batch checkout</p>
              </div>
              <div className="text-3xl font-black text-blue-900 font-mono">
                ₹{grandTotal}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
