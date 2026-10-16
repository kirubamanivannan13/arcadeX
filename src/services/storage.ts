import { Order, OrderStatus, PrintSettings, UploadedDoc, User, PriceConfig, PaymentMethod } from '../types';

export const DEFAULT_PRICE_CONFIG: PriceConfig = {
  bwPerPage: 2,
  colorPerPage: 5,
  a3Multiplier: 1.5,
  stapleBinding: 5,
  spiralBinding: 30,
  laminationPerPage: 20,
  gstPercent: 5,
};

export const INITIAL_USER: User = {
  id: 'usr_kiruba_01',
  name: 'Kiruba Manivannan',
  email: 'kirubamanivannan13@gmail.com',
  mobile: '+91 98401 23456',
  role: 'student',
  studentId: 'RIT2024CS089',
  department: 'Computer Science & Engineering',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '15 Jan 2026',
  totalSpent: 2450,
  totalOrders: 17,
};

export const INITIAL_ADMIN: User = {
  id: 'usr_admin_rit',
  name: 'RIT Xerox Center Admin',
  email: 'admin@rit.ac.in',
  mobile: '+91 94440 99887',
  role: 'admin',
  department: 'Campus Reprographics & Digital Printing Dept',
  createdAt: '01 Jan 2024',
  totalSpent: 0,
  totalOrders: 246,
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ARC202600123',
    tokenNumber: 'A-105',
    userId: 'usr_kiruba_01',
    userName: 'Kiruba Manivannan',
    userEmail: 'kirubamanivannan13@gmail.com',
    userMobile: '+91 98401 23456',
    files: [
      {
        fileName: 'Project_Report.pdf',
        fileSize: '3.4 MB',
        fileType: 'pdf',
        pageCount: 12,
        copies: 1,
        printType: 'bw',
        paperSize: 'A4',
        sides: 'single',
        binding: 'staple',
        lamination: false,
        itemTotal: 29,
      },
      {
        fileName: 'Notes.docx',
        fileSize: '1.2 MB',
        fileType: 'docx',
        pageCount: 5,
        copies: 1,
        printType: 'bw',
        paperSize: 'A4',
        sides: 'single',
        binding: 'none',
        lamination: false,
        itemTotal: 10,
      },
    ],
    generalSettings: {
      printType: 'bw',
      sides: 'single',
      paperSize: 'A4',
      orientation: 'portrait',
      copies: 1,
      binding: 'staple',
      lamination: false,
      instructions: 'Please staple the report neatly at the top left corner.',
    },
    totalPages: 17,
    printingCost: 34,
    bindingCost: 15,
    laminationCost: 0,
    gstAmount: 2,
    totalAmount: 51,
    paymentMethod: 'Google Pay',
    paymentId: 'gpay_txn_98321049281',
    paymentTime: '26 Aug 2026, 02:30 PM',
    status: 'Printing Started',
    statusTimeline: [
      { status: 'Order Received', time: '02:26 PM', completed: true, active: false },
      { status: 'Payment Verified', time: '02:28 PM', completed: true, active: false },
      { status: 'Printing Started', time: '02:30 PM', completed: false, active: true },
      { status: 'Printing Completed', time: 'Est. 02:40 PM', completed: false, active: false },
      { status: 'Ready for Pickup', time: 'Est. 02:45 PM', completed: false, active: false },
      { status: 'Completed', time: 'Pending', completed: false, active: false },
    ],
    createdAt: '26 Aug 2026, 02:26 PM',
    estimatedPickupTime: '2:45 PM',
  },
  {
    id: 'ARC202600002',
    tokenNumber: 'A-104',
    userId: 'usr_kiruba_01',
    userName: 'Kiruba Manivannan',
    userEmail: 'kirubamanivannan13@gmail.com',
    userMobile: '+91 98401 23456',
    files: [
      {
        fileName: 'Design_Poster.jpg',
        fileSize: '1.8 MB',
        fileType: 'jpg',
        pageCount: 2,
        copies: 2,
        printType: 'color',
        paperSize: 'A4',
        sides: 'single',
        binding: 'none',
        lamination: false,
        itemTotal: 20,
      },
    ],
    generalSettings: {
      printType: 'color',
      sides: 'single',
      paperSize: 'A4',
      orientation: 'portrait',
      copies: 2,
      binding: 'none',
      lamination: false,
      instructions: 'High glossy color output please.',
    },
    totalPages: 4,
    printingCost: 20,
    bindingCost: 0,
    laminationCost: 0,
    gstAmount: 1,
    totalAmount: 21,
    paymentMethod: 'PhonePe',
    paymentId: 'phonepe_91238472',
    paymentTime: '24 Aug 2026, 11:15 AM',
    status: 'Ready for Pickup',
    statusTimeline: [
      { status: 'Order Received', time: '11:10 AM', completed: true, active: false },
      { status: 'Payment Verified', time: '11:12 AM', completed: true, active: false },
      { status: 'Printing Started', time: '11:14 AM', completed: true, active: false },
      { status: 'Printing Completed', time: '11:25 AM', completed: true, active: false },
      { status: 'Ready for Pickup', time: '11:30 AM', completed: true, active: true },
      { status: 'Completed', time: 'Pending', completed: false, active: false },
    ],
    createdAt: '24 Aug 2026, 11:10 AM',
    estimatedPickupTime: '11:30 AM',
  },
  {
    id: 'ARC202600003',
    tokenNumber: 'B-101',
    userId: 'usr_kiruba_01',
    userName: 'Kiruba Manivannan',
    userEmail: 'kirubamanivannan13@gmail.com',
    userMobile: '+91 98401 23456',
    files: [
      {
        fileName: 'DSA_Unit3_Notes.docx',
        fileSize: '890 KB',
        fileType: 'docx',
        pageCount: 45,
        copies: 1,
        printType: 'bw',
        paperSize: 'A4',
        sides: 'double',
        binding: 'spiral',
        lamination: false,
        itemTotal: 90,
      },
    ],
    generalSettings: {
      printType: 'bw',
      sides: 'double',
      paperSize: 'A4',
      orientation: 'portrait',
      copies: 1,
      binding: 'spiral',
      lamination: false,
      instructions: 'Double sided with clear transparent cover spiral binding.',
    },
    totalPages: 45,
    printingCost: 90,
    bindingCost: 30,
    laminationCost: 0,
    gstAmount: 6,
    totalAmount: 126,
    paymentMethod: 'Paytm',
    paymentId: 'paytm_8932749',
    paymentTime: '20 Aug 2026, 09:40 AM',
    status: 'Completed',
    statusTimeline: [
      { status: 'Order Received', time: '09:35 AM', completed: true, active: false },
      { status: 'Payment Verified', time: '09:38 AM', completed: true, active: false },
      { status: 'Printing Started', time: '09:45 AM', completed: true, active: false },
      { status: 'Printing Completed', time: '10:00 AM', completed: true, active: false },
      { status: 'Ready for Pickup', time: '10:05 AM', completed: true, active: false },
      { status: 'Completed', time: '10:20 AM', completed: true, active: true },
    ],
    createdAt: '20 Aug 2026, 09:35 AM',
    estimatedPickupTime: 'Collected',
  },
  {
    id: 'ARC202600004',
    tokenNumber: 'A-102',
    userId: 'usr_kiruba_01',
    userName: 'Kiruba Manivannan',
    userEmail: 'kirubamanivannan13@gmail.com',
    userMobile: '+91 98401 23456',
    files: [
      {
        fileName: 'Capstone_Presentation.pdf',
        fileSize: '4.8 MB',
        fileType: 'pdf',
        pageCount: 10,
        copies: 3,
        printType: 'color',
        paperSize: 'A4',
        sides: 'single',
        binding: 'staple',
        lamination: true,
        itemTotal: 150,
      },
    ],
    generalSettings: {
      printType: 'color',
      sides: 'single',
      paperSize: 'A4',
      orientation: 'landscape',
      copies: 3,
      binding: 'staple',
      lamination: true,
      instructions: 'Front and back cover lamination.',
    },
    totalPages: 30,
    printingCost: 150,
    bindingCost: 15,
    laminationCost: 40,
    gstAmount: 10,
    totalAmount: 215,
    paymentMethod: 'Google Pay',
    paymentId: 'gpay_txn_7781039',
    paymentTime: '15 Aug 2026, 03:00 PM',
    status: 'Completed',
    statusTimeline: [
      { status: 'Order Received', time: '02:50 PM', completed: true, active: false },
      { status: 'Payment Verified', time: '02:55 PM', completed: true, active: false },
      { status: 'Printing Started', time: '03:10 PM', completed: true, active: false },
      { status: 'Printing Completed', time: '03:25 PM', completed: true, active: false },
      { status: 'Ready for Pickup', time: '03:30 PM', completed: true, active: false },
      { status: 'Completed', time: '03:45 PM', completed: true, active: true },
    ],
    createdAt: '15 Aug 2026, 02:50 PM',
    estimatedPickupTime: 'Collected',
  },
  {
    id: 'ARC202600005',
    tokenNumber: 'A-101',
    userId: 'usr_kiruba_01',
    userName: 'Kiruba Manivannan',
    userEmail: 'kirubamanivannan13@gmail.com',
    userMobile: '+91 98401 23456',
    files: [
      {
        fileName: 'Campus_Floor_Plan.pdf',
        fileSize: '2.1 MB',
        fileType: 'pdf',
        pageCount: 4,
        copies: 8,
        printType: 'bw',
        paperSize: 'A3',
        sides: 'single',
        binding: 'none',
        lamination: false,
        itemTotal: 64,
      },
    ],
    generalSettings: {
      printType: 'bw',
      sides: 'single',
      paperSize: 'A3',
      orientation: 'landscape',
      copies: 8,
      binding: 'none',
      lamination: false,
      instructions: 'A3 architectural print, sharp line quality.',
    },
    totalPages: 32,
    printingCost: 64,
    bindingCost: 0,
    laminationCost: 0,
    gstAmount: 3,
    totalAmount: 67,
    paymentMethod: 'PhonePe',
    paymentId: 'phonepe_662819',
    paymentTime: '10 Aug 2026, 10:15 AM',
    status: 'Completed',
    statusTimeline: [
      { status: 'Order Received', time: '10:00 AM', completed: true, active: false },
      { status: 'Payment Verified', time: '10:05 AM', completed: true, active: false },
      { status: 'Printing Started', time: '10:15 AM', completed: true, active: false },
      { status: 'Printing Completed', time: '10:30 AM', completed: true, active: false },
      { status: 'Ready for Pickup', time: '10:35 AM', completed: true, active: false },
      { status: 'Completed', time: '10:50 AM', completed: true, active: true },
    ],
    createdAt: '10 Aug 2026, 10:00 AM',
    estimatedPickupTime: 'Collected',
  },
  {
    id: 'ARC202600006',
    tokenNumber: 'B-103',
    userId: 'usr_kiruba_01',
    userName: 'Kiruba Manivannan',
    userEmail: 'kirubamanivannan13@gmail.com',
    userMobile: '+91 98401 23456',
    files: [
      {
        fileName: 'Maths_Assignment_3.pdf',
        fileSize: '1.1 MB',
        fileType: 'pdf',
        pageCount: 8,
        copies: 1,
        printType: 'bw',
        paperSize: 'A4',
        sides: 'single',
        binding: 'none',
        lamination: false,
        itemTotal: 16,
      },
    ],
    generalSettings: {
      printType: 'bw',
      sides: 'single',
      paperSize: 'A4',
      orientation: 'portrait',
      copies: 1,
      binding: 'none',
      lamination: false,
      instructions: '',
    },
    totalPages: 8,
    printingCost: 16,
    bindingCost: 0,
    laminationCost: 0,
    gstAmount: 1,
    totalAmount: 17,
    paymentMethod: 'Google Pay',
    paymentId: 'gpay_txn_555123',
    paymentTime: '12 Aug 2026, 04:10 PM',
    status: 'Order Received',
    statusTimeline: [
      { status: 'Order Received', time: '04:10 PM', completed: true, active: true },
      { status: 'Payment Verified', time: '04:12 PM', completed: true, active: false },
      { status: 'Printing Started', time: 'Pending', completed: false, active: false },
      { status: 'Printing Completed', time: 'Pending', completed: false, active: false },
      { status: 'Ready for Pickup', time: 'Pending', completed: false, active: false },
      { status: 'Completed', time: 'Pending', completed: false, active: false },
    ],
    createdAt: '12 Aug 2026, 04:10 PM',
    estimatedPickupTime: '4:45 PM',
  },
];

const STORAGE_KEYS = {
  ORDERS: 'arcade_orders_v1',
  CURRENT_USER: 'arcade_current_user_v1',
  PRICE_CONFIG: 'arcade_price_config_v1',
  SAVED_DOCS: 'arcade_saved_docs_v1',
};

export const getPriceConfig = (): PriceConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRICE_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return DEFAULT_PRICE_CONFIG;
};

export const setPriceConfig = (config: PriceConfig) => {
  localStorage.setItem(STORAGE_KEYS.PRICE_CONFIG, JSON.stringify(config));
};

export const getCurrentUser = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return null;
};

export const setCurrentUser = (user: User | null) => {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } else {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }
};

export const getOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  // Initialize with seed orders
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const calculateOrderCost = (
  pages: number,
  copies: number,
  settings: PrintSettings,
  config: PriceConfig = DEFAULT_PRICE_CONFIG
) => {
  const ratePerPage = settings.printType === 'color' ? config.colorPerPage : config.bwPerPage;
  const sizeMultiplier = settings.paperSize === 'A3' ? config.a3Multiplier : 1;
  
  // Total pages printed = pages * copies
  const totalSheets = pages * copies;
  const printingCost = Math.round(totalSheets * ratePerPage * sizeMultiplier);
  
  // Binding charge
  let bindingCost = 0;
  if (settings.binding === 'staple') {
    bindingCost = config.stapleBinding * copies;
  } else if (settings.binding === 'spiral') {
    bindingCost = config.spiralBinding * copies;
  }

  // Lamination charge
  let laminationCost = 0;
  if (settings.lamination) {
    laminationCost = config.laminationPerPage * pages * copies;
  }

  const subtotal = printingCost + bindingCost + laminationCost;
  const gstAmount = Math.round((subtotal * config.gstPercent) / 100);
  const totalAmount = subtotal + gstAmount;

  return {
    totalPages: totalSheets,
    printingCost,
    bindingCost,
    laminationCost,
    gstAmount,
    totalAmount,
  };
};

export const generateNextOrderId = (): string => {
  const orders = getOrders();
  const nextNum = 124 + orders.length;
  return `ARC202600${nextNum}`;
};

export const generateNextTokenNumber = (): string => {
  const letters = ['A', 'B', 'C'];
  const prefix = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${num}`;
};

export const updateOrderStatus = (orderId: string, newStatus: OrderStatus): Order | null => {
  const orders = getOrders();
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex === -1) return null;

  const order = orders[orderIndex];
  order.status = newStatus;

  // Update status timeline
  const stages: OrderStatus[] = [
    'Order Received',
    'Payment Verified',
    'Printing Started',
    'Printing Completed',
    'Ready for Pickup',
    'Completed',
  ];
  const targetIdx = stages.indexOf(newStatus);

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  order.statusTimeline = stages.map((stage, idx) => {
    return {
      status: stage,
      time: idx <= targetIdx ? (order.statusTimeline[idx]?.time || timeStr) : 'Pending',
      completed: idx < targetIdx || (idx === targetIdx && newStatus === 'Completed'),
      active: idx === targetIdx && newStatus !== 'Completed',
    };
  });

  if (newStatus === 'Ready for Pickup') {
    order.estimatedPickupTime = 'Ready Now';
  } else if (newStatus === 'Completed') {
    order.estimatedPickupTime = 'Collected';
  }

  orders[orderIndex] = order;
  saveOrders(orders);
  return order;
};
