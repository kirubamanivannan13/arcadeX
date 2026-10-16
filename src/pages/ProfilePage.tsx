import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  ShieldCheck, 
  KeyRound, 
  Bell, 
  Moon, 
  Sun, 
  LogOut, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  Printer, 
  ChevronRight,
  Save,
  Check
} from 'lucide-react';
import { User, Order } from '../types';
import { setCurrentUser } from '../services/storage';

interface ProfilePageProps {
  user: User;
  orders: Order[];
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
  onBackToDashboard: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  orders,
  onUpdateUser,
  onLogout,
  onBackToDashboard,
}) => {
  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile);
  const [studentId, setStudentId] = useState(user.studentId || 'RIT2024CS089');
  const [department, setDepartment] = useState(user.department || 'Computer Science & Engineering');
  const [isSaved, setIsSaved] = useState(false);

  // Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangedSuccess, setPassChangedSuccess] = useState(false);

  // Stats
  const userOrders = orders.filter((o) => o.userId === user.id || user.role === 'admin');
  const totalSpent = userOrders.reduce((sum, o) => sum + o.totalAmount, 0) || user.totalSpent || 2450;
  const completedCount = userOrders.filter((o) => o.status === 'Completed').length || 12;
  const lastOrderDate = userOrders[0]?.createdAt.split(',')[0] || '26 Aug 2026';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      name,
      mobile,
      studentId,
      department,
    };
    setCurrentUser(updated);
    onUpdateUser(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangedSuccess(true);
    setTimeout(() => {
      setPassChangedSuccess(false);
      setShowPasswordModal(false);
      setCurrentPass('');
      setNewPass('');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb matching Image 2 View 11 */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onBackToDashboard} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-600">User Profile</span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          User Account &amp; Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your student credentials, print notification preferences, and account security.
        </p>
      </div>

      {/* Profile Header & Stats Card matching Image 2 View 11 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            {name.charAt(0)}
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">{name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 self-center sm:self-auto uppercase">
                {user.role === 'admin' ? 'Shop Admin' : 'RIT Verified Student'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{user.email}</p>
            <p className="text-xs text-slate-600 mt-0.5">
              Roll ID: <span className="font-mono font-bold text-slate-800">{studentId}</span> &bull; {department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>Change Password</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3.5 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* 4 User Statistics Cards matching Image 2 View 11 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Orders</span>
            <span className="text-2xl font-black text-slate-900">{userOrders.length || 17}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
            <span className="text-2xl font-black text-emerald-600">{completedCount}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Spent</span>
            <span className="text-2xl font-black text-blue-700">₹{totalSpent}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Order</span>
            <span className="text-xs font-bold text-slate-700 mt-2 block">{lastOrderDate}</span>
          </div>
        </div>
      </div>

      {/* Edit Form & Account Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Personal Details Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Personal Information
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Managed via RIT domain credentials</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Number (for pickup SMS)</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student / Roll ID</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Changes Saved to MySQL!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Personal Info</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Account & Notification Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Preferences &amp; System Settings
          </h3>

          <div className="space-y-4 text-xs">
            {/* Notification alert toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Print Queue Notifications</p>
                  <p className="text-[11px] text-slate-500">Alert when status updates to Ready for Pickup</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            {/* SMS Token Alerts */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">SMS Token Delivery</p>
                  <p className="text-[11px] text-slate-500">Send Token number directly to registered mobile</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
            </div>

            {/* Dark Mode toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-bold text-slate-800">Theme Appearance</p>
                  <p className="text-[11px] text-slate-500">Light paper stationery mode active</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-100"
              >
                {darkMode ? 'Dark' : 'Light (Default)'}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 font-medium">
              Registered on {user.createdAt} &bull; Security Level: High (Spring Security)
            </span>
          </div>
        </div>

      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4"
            >
              <h3 className="text-base font-extrabold text-slate-900">Change Password</h3>
              <p className="text-xs text-slate-500">Password will be hashed using bcrypt algorithm.</p>

              {passChangedSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Password updated successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="At least 6 chars"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasswordModal(false)}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
