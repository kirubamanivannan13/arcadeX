import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  Plus, 
  Minus, 
  Layers, 
  Check, 
  Info, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle,
  FileCheck,
  FileType
} from 'lucide-react';
import { PrintSettings, UploadedDoc, User } from '../types';
import { calculateOrderCost, DEFAULT_PRICE_CONFIG } from '../services/storage';

interface NewOrderPageProps {
  user: User;
  onProceedToPayment: (orderDraft: any) => void;
  onCancel: () => void;
}

export const NewOrderPage: React.FC<NewOrderPageProps> = ({
  user,
  onProceedToPayment,
  onCancel,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Uploaded documents state
  const [files, setFiles] = useState<UploadedDoc[]>([
    {
      id: 'doc_1',
      name: 'Project_Report.pdf',
      size: 3450000,
      sizeFormatted: '3.4 MB',
      type: 'pdf',
      pageCount: 12,
    },
    {
      id: 'doc_2',
      name: 'Notes.docx',
      size: 1250000,
      sizeFormatted: '1.2 MB',
      type: 'docx',
      pageCount: 5,
    },
  ]);

  // Print customization options state
  const [settings, setSettings] = useState<PrintSettings>({
    printType: 'bw',
    sides: 'single',
    paperSize: 'A4',
    orientation: 'portrait',
    copies: 1,
    binding: 'staple',
    lamination: false,
    instructions: '',
  });

  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Compute total pages from files
  const basePages = files.reduce((sum, f) => sum + f.pageCount, 0);

  // Calculate pricing breakdown
  const cost = calculateOrderCost(basePages, settings.copies, settings);

  // File upload handler (real file upload)
  const handleFiles = (fileList: FileList) => {
    setValidationError(null);
    const newDocs: UploadedDoc[] = [];

    Array.from(fileList).forEach((file, index) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'file';
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const sizeFormatted = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`;

      // Estimate pages based on size / type
      let estPages = 1;
      if (ext === 'pdf') {
        estPages = Math.max(1, Math.round(file.size / (150 * 1024)));
      } else if (ext === 'docx' || ext === 'doc') {
        estPages = Math.max(1, Math.round(file.size / (80 * 1024)));
      }

      newDocs.push({
        id: `doc_${Date.now()}_${index}`,
        name: file.name,
        size: file.size,
        sizeFormatted,
        type: ext,
        pageCount: estPages,
      });
    });

    setFiles((prev) => [...prev, ...newDocs]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handlePageCountChange = (id: string, newCount: number) => {
    if (newCount < 1) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, pageCount: newCount } : f))
    );
  };

  const handleAddSampleFiles = () => {
    setFiles([
      {
        id: `sample_1_${Date.now()}`,
        name: 'Project_Report.pdf',
        size: 3450000,
        sizeFormatted: '3.4 MB',
        type: 'pdf',
        pageCount: 12,
      },
      {
        id: `sample_2_${Date.now()}`,
        name: 'Design_Manual.pdf',
        size: 2100000,
        sizeFormatted: '2.1 MB',
        type: 'pdf',
        pageCount: 8,
      },
      {
        id: `sample_3_${Date.now()}`,
        name: 'Lecture_Notes.docx',
        size: 890000,
        sizeFormatted: '890 KB',
        type: 'docx',
        pageCount: 5,
      },
    ]);
  };

  const handleProceed = () => {
    if (files.length === 0) {
      setValidationError('Please upload at least one document to proceed with printing.');
      return;
    }

    const orderDraft = {
      files: files.map((f) => ({
        fileName: f.name,
        fileSize: f.sizeFormatted,
        fileType: f.type,
        pageCount: f.pageCount,
        copies: settings.copies,
        printType: settings.printType,
        paperSize: settings.paperSize,
        sides: settings.sides,
        binding: settings.binding,
        lamination: settings.lamination,
        itemTotal: Math.round(
          f.pageCount *
            settings.copies *
            (settings.printType === 'color' ? 5 : 2) *
            (settings.paperSize === 'A3' ? 1.5 : 1)
        ),
      })),
      generalSettings: settings,
      totalPages: cost.totalPages,
      printingCost: cost.printingCost,
      bindingCost: cost.bindingCost,
      laminationCost: cost.laminationCost,
      gstAmount: cost.gstAmount,
      totalAmount: cost.totalAmount,
    };

    onProceedToPayment(orderDraft);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb Navigation matching Image 2 View 4 */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onCancel} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600">New Order</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          New Print Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload your documents and customize your print settings with live cost calculation.
        </p>
      </div>

      {validationError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Grid: Upload & Settings on Left (2 cols), Order Summary on Right (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Drag & Drop Upload Section matching Image 2 View 4 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Upload Documents
              </h2>
              <button
                type="button"
                onClick={handleAddSampleFiles}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
              >
                + Add sample student docs
              </button>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Drag & drop files here
              </p>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">
                or click to browse
              </p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                PDF, DOCX, JPG, JPEG, PNG (Max 50MB per file)
              </p>
            </div>

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Uploaded Files ({files.length})
                </p>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                          {file.type}
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-slate-800 truncate">{file.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {file.sizeFormatted} &bull; {file.pageCount} {file.pageCount === 1 ? 'page' : 'pages'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Page count adjuster */}
                        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1">
                          <span className="text-[10px] text-slate-400 font-medium mr-1">Pages:</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handlePageCountChange(file.id, file.pageCount - 1); }}
                            className="p-0.5 hover:bg-slate-100 rounded text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold text-slate-800">{file.pageCount}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handlePageCountChange(file.id, file.pageCount + 1); }}
                            className="p-0.5 hover:bg-slate-100 rounded text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove file */}
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Print Settings Card matching Image 2 View 4 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Print Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Print Type: B&W vs Color */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Print Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, printType: 'bw' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      settings.printType === 'bw'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>Black & White</span>
                    <span className="text-[10px] text-blue-600 font-semibold">₹2 / page</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, printType: 'color' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      settings.printType === 'color'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>Color</span>
                    <span className="text-[10px] text-blue-600 font-semibold">₹5 / page</span>
                  </button>
                </div>
              </div>

              {/* Double Sided */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Sides
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, sides: 'single' })}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      settings.sides === 'single'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    Single Sided
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, sides: 'double' })}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      settings.sides === 'double'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    Double Sided
                  </button>
                </div>
              </div>

              {/* Paper Size: A4 vs A3 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Paper Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, paperSize: 'A4' })}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                      settings.paperSize === 'A4'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    A4 (Standard)
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, paperSize: 'A3' })}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                      settings.paperSize === 'A3'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    A3 (Large)
                  </button>
                </div>
              </div>

              {/* Copies Counter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Copies
                </label>
                <div className="flex items-center justify-between p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, copies: Math.max(1, settings.copies - 1) })}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-black text-slate-900">{settings.copies}</span>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, copies: settings.copies + 1 })}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Finishing & Binding Options */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2.5">
                Binding & Finishing Options
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, binding: settings.binding === 'staple' ? 'none' : 'staple' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    settings.binding === 'staple'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>Staple Binding</span>
                    {settings.binding === 'staple' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block">+₹5 / document</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, binding: settings.binding === 'spiral' ? 'none' : 'spiral' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    settings.binding === 'spiral'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>Spiral Binding</span>
                    {settings.binding === 'spiral' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block">+₹30 / document</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, lamination: !settings.lamination })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    settings.lamination
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>Lamination</span>
                    {settings.lamination && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block">+₹20 / page</span>
                </button>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Special Instructions
              </label>
              <textarea
                value={settings.instructions}
                onChange={(e) => setSettings({ ...settings, instructions: e.target.value })}
                placeholder="e.g. Staple top left, print cover page in thick matte paper, keep orientation portrait..."
                rows={2}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Order Summary Card matching Image 2 View 4 */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg shadow-slate-200/50 space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            {/* Live calculation breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Total Pages</span>
                <span className="font-extrabold text-slate-900 text-sm">{cost.totalPages}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Printing Cost ({settings.printType.toUpperCase()} @ ₹{settings.printType === 'color' ? 5 : 2})</span>
                <span className="font-bold text-slate-800">₹{cost.printingCost}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Binding Cost</span>
                <span className="font-bold text-slate-800">₹{cost.bindingCost}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Lamination Cost</span>
                <span className="font-bold text-slate-800">₹{cost.laminationCost}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-800">₹{cost.gstAmount}</span>
              </div>
            </div>

            {/* Final Total Amount with smooth display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Final Amount</p>
                <p className="text-xs text-slate-500">All taxes included</p>
              </div>
              <motion.div
                key={cost.totalAmount}
                initial={{ scale: 1.1, color: '#2563eb' }}
                animate={{ scale: 1, color: '#1e3a8a' }}
                className="text-3xl font-black font-mono tracking-tight"
              >
                ₹{cost.totalAmount}
              </motion.div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>

            <p className="text-[10px] text-center text-slate-400">
              Order ID &amp; Token Number generated upon payment confirmation
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
