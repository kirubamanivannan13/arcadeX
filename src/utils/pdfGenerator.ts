import jsPDF from 'jspdf';
import { Order } from '../types';

export const generateOrderReceiptPDF = (order: Order) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5', // A5 receipt format is standard, crisp, and printable
  });

  // Colors
  const navy = [16, 42, 69];
  const accentBlue = [37, 99, 235];
  const slateDark = [51, 65, 85];
  const lightBg = [248, 250, 252];

  // Header Background Banner
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 148, 28, 'F');

  // Institution Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('RAJALAKSHMI INSTITUTE OF TECHNOLOGY', 74, 11, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('ARCADE SMART XEROX MANAGEMENT SYSTEM', 74, 17, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setTextColor(200, 220, 255);
  doc.text('Campus Digital Printing & Reprographics Wing', 74, 22, { align: 'center' });

  // Token Box (prominent right under banner)
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(12, 34, 124, 26, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(12, 34, 124, 26, 3, 3, 'D');

  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('PICKUP TOKEN NUMBER', 35, 42, { align: 'center' });

  doc.setTextColor(accentBlue[0], accentBlue[1], accentBlue[2]);
  doc.setFontSize(22);
  doc.text(order.tokenNumber, 35, 52, { align: 'center' });

  // Order Info on Right side of Token Box
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Order ID:`, 75, 42);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(order.id, 96, 42);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Date & Time:`, 75, 48);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(order.createdAt, 96, 48);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Estimated Pickup:`, 75, 54);
  doc.setTextColor(16, 149, 193);
  doc.setFont('helvetica', 'bold');
  doc.text(order.estimatedPickupTime, 102, 54);

  // Customer Details Section
  let y = 68;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(12, y, 136, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('CUSTOMER & PAYMENT DETAILS', 12, y);
  y += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`Name: ${order.userName}`, 12, y);
  doc.text(`Payment: ${order.paymentMethod} (PAID)`, 80, y);
  y += 4.5;
  doc.text(`Contact: ${order.userMobile || order.userEmail}`, 12, y);
  doc.text(`Txn ID: ${order.paymentId}`, 80, y);
  y += 6;

  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(12, y, 124, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('DOCUMENT / FILE', 15, y + 5);
  doc.text('SPECS', 68, y + 5);
  doc.text('PAGES x COPIES', 96, y + 5);
  doc.text('AMOUNT', 125, y + 5);
  y += 9;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  order.files.forEach((file) => {
    const fileNameShort = file.fileName.length > 26 ? file.fileName.substring(0, 24) + '...' : file.fileName;
    doc.text(fileNameShort, 15, y);
    const specs = `${file.printType.toUpperCase()} | ${file.paperSize} | ${file.binding !== 'none' ? file.binding : 'No bind'}`;
    doc.text(specs, 68, y);
    doc.text(`${file.pageCount} pgs × ${file.copies}`, 96, y);
    doc.text(`INR ${file.itemTotal}`, 125, y);
    y += 5.5;
  });

  if (order.generalSettings.instructions) {
    y += 1;
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Special Note: "${order.generalSettings.instructions}"`, 15, y);
    y += 5;
  }

  // Cost summary line
  y += 2;
  doc.line(12, y, 136, y);
  y += 6;

  doc.setFontSize(8);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`Printing Charges:`, 80, y);
  doc.text(`INR ${order.printingCost}`, 125, y);
  y += 4.5;

  if (order.bindingCost > 0) {
    doc.text(`Binding Charges:`, 80, y);
    doc.text(`INR ${order.bindingCost}`, 125, y);
    y += 4.5;
  }

  if (order.laminationCost > 0) {
    doc.text(`Lamination:`, 80, y);
    doc.text(`INR ${order.laminationCost}`, 125, y);
    y += 4.5;
  }

  if (order.gstAmount > 0) {
    doc.text(`GST (5%):`, 80, y);
    doc.text(`INR ${order.gstAmount}`, 125, y);
    y += 4.5;
  }

  // Grand Total box
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(75, y, 61, 8, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('TOTAL PAID:', 80, y + 5.5);
  doc.text(`INR ${order.totalAmount}`, 123, y + 5.5);

  // Footer instructions & QR / Barcode aesthetic
  y = 175;
  doc.setDrawColor(203, 213, 225);
  doc.line(12, y, 136, y);
  y += 6;

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Show this Token at the Xerox Shop counter inside RIT Academic Block ground floor.', 74, y, { align: 'center' });
  y += 4;
  doc.text('Online tracking available anytime at arcade-xerox.rit.ac.in', 74, y, { align: 'center' });
  y += 5;

  // Simple simulated barcode lines
  doc.setDrawColor(71, 85, 105);
  const barXStart = 45;
  const barY = y;
  const barWeights = [1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 3, 1, 1];
  let curX = barXStart;
  barWeights.forEach((w) => {
    doc.setLineWidth(w * 0.4);
    doc.line(curX, barY, curX, barY + 7);
    curX += w * 0.4 + 1.2;
  });

  // Save the PDF
  doc.save(`Arcade_Receipt_${order.id}_Token_${order.tokenNumber}.pdf`);
};
