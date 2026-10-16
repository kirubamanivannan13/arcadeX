import React from 'react';
import { motion } from 'motion/react';
import { 
  Printer, 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  CreditCard, 
  HardDrive, 
  CheckCircle, 
  Code2, 
  FileText, 
  ExternalLink,
  X
} from 'lucide-react';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackModal: React.FC<TechStackModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'java-code' | 'mysql-schema'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Header matching Image 1 */}
        <div className="bg-gradient-to-r from-[#102A45] via-[#163a61] to-[#1E3A8A] text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center border border-white/20">
                <span className="font-bold text-xs tracking-wider text-blue-200">RIT</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold leading-tight">
                  Rajalakshmi Institute of Technology
                </p>
                <p className="text-[9px] text-blue-300">Department of Computer Science & Reprographics</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 shadow-lg flex items-center justify-center">
                <Printer className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Arcade</h2>
            </div>
            <p className="text-sm font-medium text-blue-100 mt-1">Smart Xerox Management System</p>
            <p className="text-xs text-blue-200/80 mt-1">Modern Technology &bull; Seamless Experience &bull; Digital Printing</p>

            {/* Pill */}
            <div className="mt-3 px-4 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-semibold tracking-wider uppercase">
              Tech Stack & Java Spring Boot Architecture
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> System Architecture & Tech Cards
          </button>
          <button
            onClick={() => setActiveTab('java-code')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'java-code'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" /> Java 21+ Spring Boot Code
          </button>
          <button
            onClick={() => setActiveTab('mysql-schema')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'mysql-schema'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" /> MySQL Database Schema
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 6 Technology Stack Cards matching Image 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Frontend */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <span className="text-xl">💻</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Frontend — Website</h3>
                      <p className="text-xs text-slate-500">Next.js, React.js, Tailwind CSS</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">Next.js</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-50 text-cyan-700">React.js</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-sky-50 text-sky-700">Tailwind CSS</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700">Framer Motion</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800">shadcn/ui</span>
                  </div>
                </div>

                {/* 2. Backend - Java */}
                <div className="bg-white rounded-xl p-5 border-2 border-orange-200 bg-orange-50/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                      ☕
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        Backend — Java
                        <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Core</span>
                      </h3>
                      <p className="text-xs text-slate-500">Java 21+, Spring Boot 3, REST APIs</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-700">Java 21+</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-green-50 text-green-700">Spring Boot 3</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700">Spring Security</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700">REST APIs</span>
                  </div>
                </div>

                {/* 3. Database */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Database</h3>
                      <p className="text-xs text-slate-500">MySQL Relational Storage</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800">MySQL 8.0</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">Hibernate ORM</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">Spring Data JPA</span>
                  </div>
                </div>

                {/* 4. Authentication */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Authentication</h3>
                      <p className="text-xs text-slate-500">JWT, bcrypt & RBAC</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700">JSON Web Tokens</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">bcrypt Hash</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700">Student & Admin RBAC</span>
                  </div>
                </div>

                {/* 5. Payment Integration */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Payment Integration</h3>
                      <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700">Google Pay (UPI)</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700">PhonePe</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-sky-50 text-sky-700">Paytm</span>
                  </div>
                </div>

                {/* 6. File Storage & Tools */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">File Storage & Tools</h3>
                      <p className="text-xs text-slate-500">Local / Cloud Storage & PDF Generator</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700">Secure Storage</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700">PDF Generator</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700">File Validation</span>
                  </div>
                </div>
              </div>

              {/* End-to-End System Architecture Diagram matching Image 1 */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="text-center mb-4">
                  <span className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    System Architecture Flow
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm w-full md:w-auto flex-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center font-bold mb-1">
                      1
                    </div>
                    <p className="text-xs font-bold text-slate-800">Client Browser</p>
                    <p className="text-[10px] text-slate-500">Student & Admin Web UI</p>
                  </div>
                  <span className="text-slate-400 font-bold hidden md:inline">→</span>
                  <div className="text-center p-3 bg-white rounded-lg border border-blue-200 shadow-sm w-full md:w-auto flex-1">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white mx-auto flex items-center justify-center font-bold mb-1">
                      2
                    </div>
                    <p className="text-xs font-bold text-slate-800">Next.js / React</p>
                    <p className="text-[10px] text-blue-600">Frontend SPA & UI</p>
                  </div>
                  <span className="text-slate-400 font-bold hidden md:inline">→</span>
                  <div className="text-center p-3 bg-white rounded-lg border-2 border-orange-300 shadow-sm w-full md:w-auto flex-1">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white mx-auto flex items-center justify-center font-bold mb-1">
                      3
                    </div>
                    <p className="text-xs font-bold text-slate-800">Java Spring Boot</p>
                    <p className="text-[10px] text-orange-600">REST API & Security</p>
                  </div>
                  <span className="text-slate-400 font-bold hidden md:inline">→</span>
                  <div className="text-center p-3 bg-white rounded-lg border border-emerald-200 shadow-sm w-full md:w-auto flex-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold mb-1">
                      4
                    </div>
                    <p className="text-xs font-bold text-slate-800">MySQL Database</p>
                    <p className="text-[10px] text-emerald-600">Cloud / Relational DB</p>
                  </div>
                  <span className="text-slate-400 font-bold hidden md:inline">→</span>
                  <div className="text-center p-3 bg-white rounded-lg border border-amber-200 shadow-sm w-full md:w-auto flex-1">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white mx-auto flex items-center justify-center font-bold mb-1">
                      5
                    </div>
                    <p className="text-xs font-bold text-slate-800">File Storage</p>
                    <p className="text-[10px] text-amber-600">Local / Cloud PDFs</p>
                  </div>
                </div>
              </div>

              {/* Tagline footer in modal */}
              <div className="flex items-center justify-between pt-2 px-2 text-xs text-slate-500">
                <span>RIT &times; ARCADE | SMART XEROX MANAGEMENT SYSTEM</span>
                <span className="font-script text-xl text-blue-600 font-bold">From blank page to final print.</span>
              </div>
            </div>
          )}

          {activeTab === 'java-code' && (
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-xl p-4 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                  <span className="text-orange-400 font-bold">PrintOrderController.java (Java 21 + Spring Boot 3)</span>
                  <span className="bg-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-300">Spring REST API</span>
                </div>
                <pre>{`package com.rit.arcade.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class PrintOrderController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> orderPayload) {
        String orderId = "ARC" + System.currentTimeMillis();
        String token = "A-" + (new Random().nextInt(899) + 100);
        
        // 1. Calculate pricing via Spring Service
        // 2. Persist to MySQL print_orders table
        // 3. Issue Token Number and PDF receipt
        return ResponseEntity.ok(Map.of(
            "orderId", orderId,
            "tokenNumber", token,
            "status", "ORDER_RECEIVED",
            "message", "Order successfully created and queued in RIT Xerox system."
        ));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        // Real-time admin order state progression:
        // ORDER_RECEIVED -> PAYMENT_VERIFIED -> PRINTING_STARTED -> PRINTING_COMPLETED -> READY_FOR_PICKUP -> COMPLETED
        return ResponseEntity.ok(Map.of("orderId", id, "status", statusUpdate.get("status")));
    }
}`}</pre>
              </div>

              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-950 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Java 21 + Spring Boot Project Configured</p>
                  <p className="mt-1 text-slate-600">
                    The complete Java backend source code, Maven <code className="font-mono bg-white px-1 py-0.5 rounded">pom.xml</code>, 
                    <code className="font-mono bg-white px-1 py-0.5 rounded">application.properties</code>, controllers, and MySQL schemas are included in the 
                    <code className="font-mono bg-white px-1 py-0.5 rounded">backend-java/</code> folder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mysql-schema' && (
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-xl p-4 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                  <span className="text-emerald-400 font-bold">schema.sql (MySQL Database Tables)</span>
                  <span className="bg-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-300">MySQL 8.0</span>
                </div>
                <pre>{`CREATE DATABASE IF NOT EXISTS arcade_xerox;
USE arcade_xerox;

-- 1. Users Table (Students & Admins)
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'ADMIN') DEFAULT 'STUDENT',
    student_id VARCHAR(50),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Print Orders Table
CREATE TABLE print_orders (
    id VARCHAR(50) PRIMARY KEY, -- e.g. ARC202600123
    token_number VARCHAR(20) NOT NULL, -- e.g. A-105
    user_id VARCHAR(50) NOT NULL,
    total_pages INT NOT NULL,
    print_type ENUM('BW', 'COLOR') NOT NULL,
    paper_size ENUM('A4', 'A3') NOT NULL,
    copies INT NOT NULL DEFAULT 1,
    binding ENUM('NONE', 'STAPLE', 'SPIRAL') DEFAULT 'NONE',
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('GOOGLE_PAY', 'PHONEPE', 'PAYTM') NOT NULL,
    order_status ENUM('ORDER_RECEIVED', 'PAYMENT_VERIFIED', 'PRINTING_STARTED', 'PRINTING_COMPLETED', 'READY_FOR_PICKUP', 'COMPLETED') DEFAULT 'ORDER_RECEIVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer close */}
        <div className="bg-slate-100 p-4 px-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            Close Tech Stack View
          </button>
        </div>
      </motion.div>
    </div>
  );
};
