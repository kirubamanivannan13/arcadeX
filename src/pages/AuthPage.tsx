import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  Building2, 
  Check, 
  CornerDownLeft,
  Phone,
  Eye,
  EyeOff
} from 'lucide-react';
import { User } from '../types';
import { INITIAL_USER, INITIAL_ADMIN, setCurrentUser } from '../services/storage';

interface AuthPageProps {
  onSuccess: (user: User) => void;
  onNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onNavigateHome }) => {
  // Mode state: 'signin' for single sign in page, 'register' for create account page
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sign In inputs: visible Student ID + invisible Password
  const [studentId, setStudentId] = useState('RIT2024CS089');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Create Account inputs
  const [regName, setRegName] = useState('Kiruba Manivannan');
  const [regStudentId, setRegStudentId] = useState('RIT2024CS089');
  const [regDept, setRegDept] = useState('Computer Science & Engineering');
  const [regPhone, setRegPhone] = useState('+91 98401 23456');
  const [regPassword, setRegPassword] = useState('123456');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Sign In Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanId = studentId.trim();
    if (!cleanId) {
      setError('Please enter your Student ID.');
      return;
    }

    setLoading(true);

    // Accept ANY password per user request
    setTimeout(() => {
      setLoading(false);

      if (cleanId.toLowerCase().includes('admin')) {
        setCurrentUser(INITIAL_ADMIN);
        setSuccessMsg('Admin verified! Opening internal dashboard...');
        setTimeout(() => onSuccess(INITIAL_ADMIN), 400);
      } else {
        const studentName = cleanId.toLowerCase().includes('kiruba')
          ? 'Kiruba Manivannan'
          : cleanId === 'RIT2024CS089'
          ? 'Kiruba Manivannan'
          : `Student (${cleanId.toUpperCase()})`;

        const studentEmail = cleanId.toLowerCase().includes('kiruba')
          ? 'kirubamanivannan13@gmail.com'
          : `${cleanId.toLowerCase()}@rit.ac.in`;

        const authenticatedUser: User = {
          ...INITIAL_USER,
          id: `usr_${cleanId}`,
          name: studentName,
          studentId: cleanId.toUpperCase(),
          email: studentEmail,
          department: cleanId.toUpperCase().includes('CS') ? 'Computer Science & Engineering' : 'Engineering Dept',
        };

        setCurrentUser(authenticatedUser);
        setSuccessMsg(`Welcome ${authenticatedUser.name}! Opening internal dashboard...`);
        setTimeout(() => onSuccess(authenticatedUser), 400);
      }
    }, 450);
  };

  // Create Account Submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regStudentId.trim()) {
      setError('Please provide your Full Name and Student ID.');
      return;
    }

    setLoading(true);

    // Accept ANY password per user request
    setTimeout(() => {
      setLoading(false);
      const cleanId = regStudentId.trim().toUpperCase();
      const newUser: User = {
        id: `usr_${cleanId}`,
        name: regName.trim(),
        studentId: cleanId,
        email: `${cleanId.toLowerCase()}@rit.ac.in`,
        mobile: regPhone.trim() || '+91 98401 23456',
        role: cleanId.includes('ADMIN') ? 'admin' : 'student',
        department: regDept,
        createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        totalSpent: 0,
        totalOrders: 0,
      };

      setCurrentUser(newUser);
      setSuccessMsg(`Account created for ${newUser.name}! Moving to internal dashboard...`);
      setTimeout(() => onSuccess(newUser), 450);
    }, 500);
  };

  const handleQuickSelect = (id: string, pass: string = 'password') => {
    setStudentId(id);
    setPassword(pass);
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-100/40 py-10 px-4 sm:px-6 flex flex-col justify-center items-center relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* RIT Crest Header */}
      <div className="mb-6 text-center">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs mb-3 hover:bg-white transition-all cursor-pointer"
        >
          <div className="w-7 h-7 rounded bg-[#102A45] flex items-center justify-center text-white text-xs font-black">
            RIT
          </div>
          <span className="text-xs font-bold text-slate-800 tracking-wider uppercase">
            Rajalakshmi Institute of Technology
          </span>
        </button>

        <div className="flex items-center justify-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 p-2 shadow-lg shadow-blue-500/25 flex items-center justify-center text-white">
            <Printer className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-slate-900 tracking-tight">Arcade</span>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Smart Xerox Management System &bull; Student Authentication
        </p>
      </div>

      {/* Notifications */}
      <div className="w-full max-w-md mb-4">
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 shadow-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Focused Authentication Card */}
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-300/60 border border-white/80 p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Slide Bar / Switch Tabs: [ Sign In ] [ Create Account ] */}
        <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-6 relative">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'signin'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Development Helper Badge */}
        <div className="mb-5 p-2.5 bg-blue-50/80 border border-blue-200/80 rounded-xl flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold">Dev Mode:</span>
            <span className="text-blue-700">Any password accepted!</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-blue-200 text-blue-900 font-mono text-[10px] font-bold">ALL PASS</span>
        </div>

        {/* PAGE 1: SIGN IN VIEW */}
        {authMode === 'signin' && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            <div className="mb-2">
              <h2 className="text-lg font-black text-slate-900">
                Sign In to Arcade
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your visible Student ID &amp; invisible password, then press Enter.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Visible Student ID Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Student ID / Roll Number <span className="text-blue-600 font-semibold">(Visible)</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleLoginSubmit(e);
                    }}
                    placeholder="e.g. RIT2024CS089"
                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black font-mono tracking-wider text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white uppercase transition-all"
                    autoFocus
                    required
                  />
                </div>
              </div>

              {/* Invisible Masked Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password <span className="text-slate-400 font-semibold">(Invisible Mode)</span>
                  </label>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    ✓ Accepts any input
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleLoginSubmit(e);
                    }}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold tracking-wider text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Development mode: Any password typed will log you in immediately!')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In &amp; Enter Dashboard</span>
                    <CornerDownLeft className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* "Don't have an account? Create Account" Link requested by user */}
            <div className="pt-3 text-center">
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setError(null);
                  }}
                  className="font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            </div>

            {/* Quick 1-Click Fast Credentials */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
                Quick 1-Click Test Credentials
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickSelect('RIT2024CS089', 'student123')}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 text-left transition-all hover:bg-blue-50/50 cursor-pointer"
                >
                  <p className="font-mono font-bold text-xs text-blue-700">RIT2024CS089</p>
                  <p className="text-[10px] text-slate-500">Kiruba (Student)</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickSelect('admin', 'admin123')}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 text-left transition-all hover:bg-slate-100 cursor-pointer"
                >
                  <p className="font-mono font-bold text-xs text-slate-800">admin</p>
                  <p className="text-[10px] text-slate-500">RIT Shop Admin</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* PAGE 2: CREATE ACCOUNT VIEW */}
        {authMode === 'register' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            <div className="mb-2">
              <h2 className="text-lg font-black text-slate-900">
                Create Student Account
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Register with your Student ID and jump straight to the Xerox dashboard.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <UserIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Kiruba Manivannan"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student / Roll ID *</label>
                <div className="relative">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regStudentId}
                    onChange={(e) => setRegStudentId(e.target.value)}
                    placeholder="e.g. RIT2024CS089"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department</label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    placeholder="Computer Science & Engineering"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number (for pickup SMS)</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98401 23456"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">Password</label>
                  <span className="text-[10px] text-emerald-600 font-semibold">Any password accepted</span>
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all mt-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Register &amp; Unlock Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* "Already have an account? Sign In" Link requested by user */}
            <div className="pt-2 text-center">
              <p className="text-xs text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setError(null);
                  }}
                  className="font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </motion.div>
        )}

        {/* Security and Return Link */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected by Spring Security &bull; MySQL</span>
          </div>
          <button
            onClick={onNavigateHome}
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            ← Welcome Landing Page
          </button>
        </div>
      </motion.div>
    </div>
  );
};
