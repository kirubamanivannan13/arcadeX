import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TechStackModal } from './components/TechStackModal';
import { PrintReceiptModal } from './components/PrintReceiptModal';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewOrderPage } from './pages/NewOrderPage';
import { BulkOrderPage } from './pages/BulkOrderPage';
import { ReprintPage } from './pages/ReprintPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { User, Order } from './types';
import { getCurrentUser, setCurrentUser, getOrders, INITIAL_USER, INITIAL_ADMIN } from './services/storage';

export default function App() {
  const [currentUser, setUser] = useState<User | null>(() => getCurrentUser());
  const [orders, setOrders] = useState<Order[]>(() => getOrders());
  const [currentView, setCurrentView] = useState<string>('landing');

  // Draft checkout state
  const [orderDraft, setOrderDraft] = useState<any | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [targetTrackingOrderId, setTargetTrackingOrderId] = useState<string | undefined>(undefined);

  // Modals
  const [techStackOpen, setTechStackOpen] = useState(false);
  const [receiptModalOrder, setReceiptModalOrder] = useState<Order | null>(null);

  const refreshOrders = () => {
    setOrders(getOrders());
  };

  const handleNavigate = (view: string, extraData?: any) => {
    if (view === 'track-order' && extraData?.orderId) {
      setTargetTrackingOrderId(extraData.orderId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchRole = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      setUser(INITIAL_ADMIN);
      setCurrentUser(INITIAL_ADMIN);
    } else {
      setUser(INITIAL_USER);
      setCurrentUser(INITIAL_USER);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentUser(null);
    setCurrentView('auth');
  };

  const handleProceedToPayment = (draft: any) => {
    setOrderDraft(draft);
    setCurrentView('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (newOrder: Order) => {
    refreshOrders();
    setLastPlacedOrder(newOrder);
    setOrderDraft(null);
    setCurrentView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReprintOrder = (order: Order) => {
    const draft = {
      files: order.files,
      generalSettings: order.generalSettings,
      totalPages: order.totalPages,
      printingCost: order.printingCost,
      bindingCost: order.bindingCost,
      laminationCost: order.laminationCost,
      gstAmount: order.gstAmount,
      totalAmount: order.totalAmount,
      isReprint: true,
      originalOrderId: order.id,
    };
    handleProceedToPayment(draft);
  };

  const activeOrdersCount = orders.filter(
    (o) => o.status !== 'Completed' && o.status !== 'Cancelled'
  ).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Global Brand Header / Navbar */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenTechStack={() => setTechStackOpen(true)}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        activeOrderCount={activeOrdersCount}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onGetStarted={() => {
              setCurrentView('auth');
            }}
            onOpenTechStack={() => setTechStackOpen(true)}
          />
        )}

        {currentView === 'auth' && (
          <AuthPage
            onSuccess={(authenticatedUser) => {
              setUser(authenticatedUser);
              if (authenticatedUser.role === 'admin') {
                setCurrentView('admin');
              } else {
                setCurrentView('dashboard');
              }
            }}
            onNavigateHome={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'dashboard' && (
          currentUser ? (
            <DashboardPage
              user={currentUser}
              orders={orders}
              onNavigate={handleNavigate}
              onOpenTechStack={() => setTechStackOpen(true)}
            />
          ) : (
            <AuthPage
              onSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setCurrentView('dashboard');
              }}
              onNavigateHome={() => setCurrentView('landing')}
            />
          )
        )}

        {currentView === 'new-order' && (
          currentUser ? (
            <NewOrderPage
              user={currentUser}
              onProceedToPayment={handleProceedToPayment}
              onCancel={() => setCurrentView('dashboard')}
            />
          ) : (
            <AuthPage
              onSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setCurrentView('new-order');
              }}
              onNavigateHome={() => setCurrentView('landing')}
            />
          )
        )}

        {currentView === 'bulk-order' && (
          currentUser ? (
            <BulkOrderPage
              user={currentUser}
              onProceedToPayment={handleProceedToPayment}
              onCancel={() => setCurrentView('dashboard')}
            />
          ) : (
            <AuthPage
              onSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setCurrentView('bulk-order');
              }}
              onNavigateHome={() => setCurrentView('landing')}
            />
          )
        )}

        {currentView === 'reprint' && (
          currentUser ? (
            <ReprintPage
              orders={orders}
              user={currentUser}
              onProceedToReprintPayment={handleProceedToPayment}
              onCancel={() => setCurrentView('dashboard')}
            />
          ) : (
            <AuthPage
              onSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setCurrentView('reprint');
              }}
              onNavigateHome={() => setCurrentView('landing')}
            />
          )
        )}

        {currentView === 'payment' && currentUser && (
          <PaymentPage
            user={currentUser}
            orderDraft={orderDraft}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => setCurrentView('new-order')}
          />
        )}

        {currentView === 'order-success' && lastPlacedOrder && (
          <OrderSuccessPage
            order={lastPlacedOrder}
            onTrackOrder={(orderId) => {
              setTargetTrackingOrderId(orderId);
              setCurrentView('track-order');
            }}
            onNewOrder={() => setCurrentView('new-order')}
            onGoToDashboard={() => setCurrentView('dashboard')}
            onViewPrintableReceipt={() => setReceiptModalOrder(lastPlacedOrder)}
          />
        )}

        {currentView === 'track-order' && (
          <OrderTrackingPage
            orders={orders}
            initialOrderId={targetTrackingOrderId}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onRefreshOrders={refreshOrders}
          />
        )}

        {currentView === 'order-history' && (
          currentUser ? (
            <OrderHistoryPage
              orders={orders}
              user={currentUser}
              onTrackOrder={(orderId) => {
                setTargetTrackingOrderId(orderId);
                setCurrentView('track-order');
              }}
              onReprintOrder={handleReprintOrder}
              onNewOrder={() => setCurrentView('new-order')}
              onViewPrintableReceipt={(order) => setReceiptModalOrder(order)}
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          ) : (
            <AuthPage
              onSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setCurrentView('order-history');
              }}
              onNavigateHome={() => setCurrentView('landing')}
            />
          )
        )}

        {currentView === 'profile' && (
          currentUser ? (
            <ProfilePage
              user={currentUser}
              orders={orders}
              onUpdateUser={(updated) => setUser(updated)}
              onLogout={handleLogout}
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          ) : (
            <AuthPage
              onSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setCurrentView('profile');
              }}
              onNavigateHome={() => setCurrentView('landing')}
            />
          )
        )}

        {currentView === 'admin' && (
          currentUser?.role === 'admin' ? (
            <AdminDashboardPage
              orders={orders}
              onRefreshOrders={refreshOrders}
              onOpenTechStack={() => setTechStackOpen(true)}
            />
          ) : (
            <AuthPage
              onSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setCurrentView(authenticatedUser.role === 'admin' ? 'admin' : 'dashboard');
              }}
              onNavigateHome={() => setCurrentView('landing')}
            />
          )
        )}
      </main>

      {/* Interactive Tech Stack & Java 21+ Spring Boot Architecture Modal */}
      <TechStackModal
        isOpen={techStackOpen}
        onClose={() => setTechStackOpen(false)}
      />

      {/* Printable Receipt Preview Modal */}
      <PrintReceiptModal
        order={receiptModalOrder}
        isOpen={!!receiptModalOrder}
        onClose={() => setReceiptModalOrder(null)}
      />
    </div>
  );
}
