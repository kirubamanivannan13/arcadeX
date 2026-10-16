export type PrintType = 'bw' | 'color';
export type PaperSize = 'A4' | 'A3';
export type SideOption = 'single' | 'double';
export type OrientationOption = 'portrait' | 'landscape';
export type BindingOption = 'none' | 'staple' | 'spiral';

export type OrderStatus =
  | 'Order Received'
  | 'Payment Verified'
  | 'Printing Started'
  | 'Printing Completed'
  | 'Ready for Pickup'
  | 'Completed'
  | 'Cancelled';

export type PaymentMethod = 'Google Pay' | 'PhonePe' | 'Paytm';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'student' | 'admin';
  studentId?: string;
  department?: string;
  avatar?: string;
  createdAt: string;
  totalSpent: number;
  totalOrders: number;
}

export interface PrintSettings {
  printType: PrintType;
  sides: SideOption;
  paperSize: PaperSize;
  orientation: OrientationOption;
  copies: number;
  binding: BindingOption;
  lamination: boolean;
  instructions: string;
}

export interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  sizeFormatted: string;
  type: string;
  pageCount: number;
  dataUrl?: string;
  customSettings?: PrintSettings;
}

export interface OrderItemSummary {
  fileName: string;
  fileSize: string;
  fileType: string;
  pageCount: number;
  copies: number;
  printType: PrintType;
  paperSize: PaperSize;
  sides: SideOption;
  binding: BindingOption;
  lamination: boolean;
  itemTotal: number;
}

export interface Order {
  id: string; // e.g. ARC202600123
  tokenNumber: string; // e.g. A-105
  userId: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  files: OrderItemSummary[];
  generalSettings: PrintSettings;
  totalPages: number;
  printingCost: number;
  bindingCost: number;
  laminationCost: number;
  gstAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentId: string;
  paymentTime: string;
  status: OrderStatus;
  statusTimeline: {
    status: OrderStatus;
    time: string;
    completed: boolean;
    active: boolean;
  }[];
  createdAt: string;
  estimatedPickupTime: string;
  isReprint?: boolean;
  originalOrderId?: string;
}

export interface PriceConfig {
  bwPerPage: number;
  colorPerPage: number;
  a3Multiplier: number;
  stapleBinding: number;
  spiralBinding: number;
  laminationPerPage: number;
  gstPercent: number;
}
