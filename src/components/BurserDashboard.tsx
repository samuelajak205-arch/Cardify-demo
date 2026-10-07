import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { 
  Coins, CreditCard, FileText, Bell, Award, 
  Search, Filter, Plus, Printer, Send, HelpCircle, 
  CheckCircle, AlertCircle, TrendingUp, Mail
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from "recharts";

import { 
  mockStudents as initialStudents, 
  mockInvoices as initialInvoices 
} from "../data/mockData";

import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import DataTable from "./DataTable";
import Badge from "./Badge";

export default function BurserDashboard() {
  const location = useLocation();
  const { showToast } = useRole();

  // Dynamic memory states
  const [invoices, setInvoices] = useState(initialInvoices);
  const [students, setStudents] = useState(initialStudents);

  // SEARCH AND FILTER STATES
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Paid" | "Pending" | "Overdue">("All");

  // ADD INVOICE STATE
  const [isAddInvoiceOpen, setIsAddModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    studentId: "student-1",
    amount: 1800000,
    description: "Senior 5 Term III Tuition Fees",
    dueDate: "2026-11-01"
  });

  // Calculate statistics in real time
  const totalPaid = invoices
    .filter(inv => inv.status === "Paid")
    .reduce((sum, current) => sum + current.amount, 0);

  const totalPending = invoices
    .filter(inv => inv.status === "Pending")
    .reduce((sum, current) => sum + current.amount, 0);

  const totalOverdue = invoices
    .filter(inv => inv.status === "Overdue")
    .reduce((sum, current) => sum + current.amount, 0);

  const totalBilled = totalPaid + totalPending + totalOverdue;
  const collectionPercentage = ((totalPaid / totalBilled) * 100).toFixed(1);

  // Filter invoices for display
  const getFilteredInvoices = () => {
    let result = invoices;
    if (statusFilter !== "All") {
      result = invoices.filter(inv => inv.status === statusFilter);
    }
    if (invoiceSearch) {
      result = result.filter(inv => 
        inv.studentName.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
        inv.description.toLowerCase().includes(invoiceSearch.toLowerCase())
      );
    }
    return result;
  };

  const filteredInvoices = getFilteredInvoices();

  // Filter students with outstanding fees for the Reminders view
  const debtorsList = students.filter(s => s.feeStatus !== "Paid");

  // Chart data definitions
  const weeklyCollectionProgression = [
    { week: "Week 1", Collected: 3200000, Expected: 4500000 },
    { week: "Week 2", Collected: 7800000, Expected: 9000000 },
    { week: "Week 3", Collected: 11400000, Expected: 13500000 },
    { week: "Week 4", Collected: 15300000, Expected: 18000000 },
    { week: "Week 5 (Act)", Collected: totalPaid, Expected: totalBilled }
  ];

  const paymentRatioPie = [
    { name: "Paid Invoices", value: totalPaid, color: "#10B981" },
    { name: "Pending", value: totalPending, color: "#F59E0B" },
    { name: "Overdue Outstanding", value: totalOverdue, color: "#F43F5E" }
  ];

  // ACTION HANDLERS
  const handleAddInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.id === newInvoice.studentId);
    if (!targetStudent) return;

    const createdInvoice = {
      id: `inv-${Date.now()}`,
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      studentClass: targetStudent.gradeLevel,
      amount: Number(newInvoice.amount),
      description: newInvoice.description,
      status: "Pending" as const,
      dueDate: newInvoice.dueDate
    };

    // Update students balances in state
    setStudents(students.map(s => {
      if (s.id === targetStudent.id) {
        return {
          ...s,
          feeBalance: s.feeBalance + createdInvoice.amount,
          feeStatus: "Pending" as const
        };
      }
      return s;
    }));

    // Update global and local invoice lists
    initialInvoices.unshift(createdInvoice);
    setInvoices([createdInvoice, ...invoices]);
    showToast(`Invoice successfully dispatched to ${targetStudent.name}!`);
    setIsAddModalOpen(false);
  };

  const handleSendReminder = (studentName: string) => {
    showToast(`Dispatched payment reminder email and SMS to ${studentName}'s parent.`);
  };

  const handlePrintReceipt = (receiptNo: string) => {
    showToast(`Constructing and preparing printable slip for ${receiptNo}...`);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. FINANCIAL OVERVIEW PAGE */}
      {location.pathname === "/finance" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Bursary & Fee Desk
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Welcome, Eleanor. Real-time tuition ledgers and invoice status logs.
              </p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold bg-brand-primary text-white rounded-xl shadow-md hover:bg-brand-primary-hover flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus size={14} />
              <span>Raise Invoice</span>
            </button>
          </div>

          {/* KPI Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Billed" 
              value={`UGX ${(totalBilled / 1000000).toFixed(2)}M`} 
              icon={Coins} 
              subtext="Accumulated Term II invoices"
              color="text-indigo-600 dark:text-indigo-400"
            />
            <StatCard 
              title="Tuition Collected" 
              value={`UGX ${(totalPaid / 1000000).toFixed(2)}M`} 
              icon={CheckCircle} 
              subtext={`Collection speed: ${collectionPercentage}%`}
              trend={{ value: "Target: 95%", type: "up" }}
              color="text-emerald-500"
            />
            <StatCard 
              title="Overdue Outstanding" 
              value={`UGX ${(totalOverdue / 1000000).toFixed(2)}M`} 
              icon={AlertCircle} 
              subtext="Unpaid past target due dates"
              color="text-rose-500"
            />
            <StatCard 
              title="Pending Approval" 
              value={`UGX ${(totalPending / 1000000).toFixed(2)}M`} 
              icon={CreditCard} 
              subtext="Awaiting parent processing"
              color="text-amber-500"
            />
          </div>

          {/* Area charts and ratios */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8">
              <ChartCard title="Weekly Tuition Collection Progression" description="Cumulative collected receipts vs forecasted term billings (Millions UGX)">
                <ResponsiveContainer width="100%" height={230}>
                  <AreaChart data={weeklyCollectionProgression} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBurser" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/60" />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="#94A3B8" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#94A3B8" />
                    <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "12px" }} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                    <Area type="monotone" dataKey="Collected" stroke="#10B981" fillOpacity={1} fill="url(#colorBurser)" strokeWidth={2} name="Cash Receipts Logged" />
                    <Area type="monotone" dataKey="Expected" stroke="#4F46E5" fillOpacity={0} strokeWidth={2} strokeDasharray="4 4" name="Target Billings" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="lg:col-span-4">
              <ChartCard title="Capital Allocation Split" description="Billing status ratio breakdown">
                <ResponsiveContainer width="100%" height={230}>
                  <PieChart>
                    <Pie
                      data={paymentRatioPie}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {paymentRatioPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => `UGX ${(Number(v) / 1000000).toFixed(2)}M`} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </div>
      )}

      {/* 2. INVOICE AND PAYMENT STATUS TABLE */}
      {location.pathname === "/finance/invoices" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Invoices & Billings
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Track individual student billing lines, verify payments, and log cash receipts.
              </p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold bg-brand-primary text-white rounded-xl shadow-md hover:bg-brand-primary-hover flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus size={14} />
              <span>Raise Invoice</span>
            </button>
          </div>

          {/* Filtering Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700">
            <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/20">
              {["All", "Paid", "Pending", "Overdue"].map((status) => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`px-4.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    statusFilter === status 
                      ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xs" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="relative flex-1 sm:max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                placeholder="Search by student or invoice description..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          {/* Invoices list */}
          <DataTable 
            data={filteredInvoices}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "Invoice ID",
                accessor: (item: any) => (
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500">#{item.id}</span>
                )
              },
              {
                header: "Student Name",
                accessor: (item: any) => (
                  <span className="font-bold text-slate-900 dark:text-white block">{item.studentName}</span>
                )
              },
              {
                header: "Description",
                accessor: (item: any) => (
                  <span className="font-semibold text-slate-600 dark:text-slate-350">{item.description}</span>
                )
              },
              {
                header: "Billing Amount",
                accessor: (item: any) => (
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    UGX {item.amount.toLocaleString()}
                  </span>
                )
              },
              {
                header: "Due Date",
                accessor: (item: any) => (
                  <span className="font-semibold text-slate-500 font-mono">{item.dueDate}</span>
                )
              },
              {
                header: "Status",
                accessor: (item: any) => (
                  <Badge variant={item.status === "Paid" ? "success" : item.status === "Pending" ? "warning" : "danger"}>
                    {item.status}
                  </Badge>
                )
              },
              {
                header: "Receipt",
                className: "text-right",
                accessor: (item: any) => {
                  if (item.status === "Paid") {
                    return (
                      <button
                        onClick={() => handlePrintReceipt(item.receiptNumber)}
                        className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                        title="Print receipt ticket"
                      >
                        <Printer size={13} />
                      </button>
                    );
                  }
                  return (
                    <button
                      onClick={() => handleSendReminder(item.studentName)}
                      className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-indigo-500 rounded-lg transition-colors cursor-pointer"
                      title="Send payment reminder"
                    >
                      <Mail size={13} />
                    </button>
                  );
                }
              }
            ]}
          />
        </div>
      )}

      {/* 3. DETAILED FEE LEDGER PANEL */}
      {location.pathname === "/finance/ledgers" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Sovereign Fee Ledger
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Account balances, cumulative billings, and payment ratios per enrolled student.
            </p>
          </div>

          <DataTable 
            data={students}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "Student Candidate",
                accessor: (item: any) => (
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-700 shrink-0" 
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                      <span className="text-[10px] text-slate-400 block">{item.gradeLevel}</span>
                    </div>
                  </div>
                )
              },
              {
                header: "Total Billings",
                accessor: (item: any) => {
                  const billed = item.totalPaid + item.feeBalance;
                  return (
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                      UGX {billed.toLocaleString()}
                    </span>
                  );
                }
              },
              {
                header: "Amount Paid",
                accessor: (item: any) => (
                  <span className="font-mono font-bold text-emerald-500 tabular-nums">
                    UGX {item.totalPaid.toLocaleString()}
                  </span>
                )
              },
              {
                header: "Outstanding Balance",
                accessor: (item: any) => (
                  <span className={`font-mono font-bold tabular-nums ${item.feeBalance > 0 ? "text-rose-500" : "text-slate-400"}`}>
                    UGX {item.feeBalance.toLocaleString()}
                  </span>
                )
              },
              {
                header: "Account standing",
                accessor: (item: any) => (
                  <Badge variant={item.feeStatus === "Paid" ? "success" : item.feeStatus === "Pending" ? "warning" : "danger"}>
                    {item.feeStatus}
                  </Badge>
                )
              }
            ]}
          />
        </div>
      )}

      {/* 4. RECEIPTS LOG */}
      {location.pathname === "/finance/receipts" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Logged Receipts History
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Sovereign receipts mapped to transaction IDs and Term II billing codes.
            </p>
          </div>

          <DataTable 
            data={invoices.filter(i => i.status === "Paid")}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "Receipt No.",
                accessor: (item: any) => (
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{item.receiptNumber}</span>
                )
              },
              {
                header: "Billed Candidate",
                accessor: (item: any) => (
                  <span className="font-bold text-slate-900 dark:text-white block">{item.studentName}</span>
                )
              },
              {
                header: "Tuition Details",
                accessor: (item: any) => (
                  <span className="font-semibold text-slate-600 dark:text-slate-350">{item.description}</span>
                )
              },
              {
                header: "Receipt Date",
                accessor: (item: any) => (
                  <span className="font-semibold text-slate-500 font-mono">{item.paidDate}</span>
                )
              },
              {
                header: "Cash amount Received",
                accessor: (item: any) => (
                  <span className="font-mono font-bold text-emerald-500 tabular-nums">
                    UGX {item.amount.toLocaleString()}
                  </span>
                )
              },
              {
                header: "Action",
                className: "text-right",
                accessor: (item: any) => (
                  <button
                    onClick={() => handlePrintReceipt(item.receiptNumber)}
                    className="px-3 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 hover:text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 ml-auto cursor-pointer"
                  >
                    <Printer size={11} />
                    <span>Print Receipt</span>
                  </button>
                )
              }
            ]}
          />
        </div>
      )}

      {/* 5. DISPATCH OVERDUE REMINDERS */}
      {location.pathname === "/finance/reminders" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Fee Collection Reminders
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Oversee outstanding fee accounts. Click to dispatch invoice balances immediately.
            </p>
          </div>

          <DataTable 
            data={debtorsList}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "Candidate Name",
                accessor: (item: any) => (
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-700 shrink-0" 
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                      <span className="text-[10px] text-slate-400 block">{item.gradeLevel}</span>
                    </div>
                  </div>
                )
              },
              {
                header: "Billed Account Balance",
                accessor: (item: any) => (
                  <span className="font-mono font-bold text-rose-500 tabular-nums">
                    UGX {item.feeBalance.toLocaleString()}
                  </span>
                )
              },
              {
                header: "Account standing",
                accessor: (item: any) => (
                  <Badge variant={item.feeStatus === "Overdue" ? "danger" : "warning"}>
                    {item.feeStatus}
                  </Badge>
                )
              },
              {
                header: "Action",
                className: "text-right",
                accessor: (item: any) => (
                  <button
                    onClick={() => handleSendReminder(item.name)}
                    className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 ml-auto cursor-pointer shadow-md shadow-indigo-500/10"
                  >
                    <Send size={11} />
                    <span>Send Reminder</span>
                  </button>
                )
              }
            ]}
          />
        </div>
      )}

      {/* DISPATCH INVOICE DIALOG MODAL */}
      {isAddInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Disburse Invoice
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddInvoiceSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Select Student Candidate
                </label>
                <select
                  value={newInvoice.studentId}
                  onChange={(e) => setNewInvoice({ ...newInvoice, studentId: e.target.value })}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.gradeLevel})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Billing Item Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior 5 Term II Sports Resource Fees"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Disbursed Amount (UGX)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 450000"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Target Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center shadow-md"
              >
                Disburse Billing Line
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
