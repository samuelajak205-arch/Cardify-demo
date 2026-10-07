import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { 
  Users, Coins, Calendar, MessageSquare, Bell, 
  ChevronDown, Send, CheckCircle2, AlertTriangle, 
  Clock, CreditCard, Download, Sparkles, BookOpen
} from "lucide-react";

import { 
  mockStudents, 
  mockParents, 
  mockInvoices as initialInvoices, 
  mockAttendance, 
  mockGrades as initialGrades, 
  mockAnnouncements 
} from "../data/mockData";

import StatCard from "./StatCard";
import DataTable from "./DataTable";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";

export default function ParentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeParentId, showToast } = useRole();

  // Find active parent (Hon. Robert Sekamate)
  const parent = mockParents.find(p => p.id === activeParentId) || mockParents[0];

  // Linked children list (Liam Sekamate and Clara Sekamate)
  const linkedChildren = mockStudents.filter(s => parent.linkedStudentIds.includes(s.id));

  // State to manage active child selection (Stakeholders can toggle between kids!)
  const [selectedChildId, setSelectedChildId] = useState<string>(parent.linkedStudentIds[0] || "");

  // Stateful memory arrays to support live mock payment processing and message logs
  const [invoices, setInvoices] = useState(initialInvoices);
  const [grades, setGrades] = useState(initialGrades);
  const [parentMessages, setParentMessages] = useState(parent.messages);
  const [replyText, setReplyText] = useState("");

  const activeChild = mockStudents.find(s => s.id === selectedChildId) || linkedChildren[0];

  // Filter invoices, attendance, and grades for the ACTIVE child
  const childInvoices = invoices.filter(inv => inv.studentId === activeChild.id);
  const childAttendance = mockAttendance.filter(att => att.studentId === activeChild.id);
  const childGrades = grades.filter(g => g.studentId === activeChild.id);

  // Message replies handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      teacherId: "teacher-1",
      teacherName: "Mr. Joseph Mugisha",
      content: replyText,
      date: "2026-10-05 (Just now)",
      isFromTeacher: false
    };

    const updatedMessages = [...parentMessages, newMessage];
    setParentMessages(updatedMessages);
    
    // Persist message to mockData structure
    parent.messages = updatedMessages;
    
    showToast("Message dispatched directly to Mr. Joseph Mugisha!");
    setReplyText("");
  };

  // MOCK DIRECT TUITION PAYMENT PROCESSING (Highly interactive!)
  const handlePayTuition = (invoiceId: string, description: string, amount: number) => {
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: "Paid" as const,
          paidDate: "2026-10-05",
          receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
      }
      return inv;
    });

    initialInvoices.forEach(inv => {
      if (inv.id === invoiceId) {
        inv.status = "Paid";
        inv.paidDate = "2026-10-05";
        inv.receiptNumber = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      }
    });

    // Update invoices list
    setInvoices(updatedInvoices);

    // Update active student balance states in global mock data list so other roles see it instantly!
    const matchedStudent = mockStudents.find(s => s.id === activeChild.id);
    if (matchedStudent) {
      matchedStudent.feeBalance = Math.max(0, matchedStudent.feeBalance - amount);
      matchedStudent.totalPaid = matchedStudent.totalPaid + amount;
      if (matchedStudent.feeBalance === 0) {
        matchedStudent.feeStatus = "Paid";
      }
    }

    showToast(`Successfully processed payment of UGX ${amount.toLocaleString()} for "${description}"!`);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* Dynamic Children selector dropdown in page headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/80 shadow-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Guardian Account: {parent.name}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-tight">
            Toggle between linked children to view respective curriculum standings instantly.
          </span>
        </div>

        {/* Child Selector segmented buttons (Zero static pills, clean borders) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/40 dark:border-slate-700">
          {linkedChildren.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedChildId === child.id 
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-750" 
                  : "text-slate-505 hover:text-slate-900 text-slate-500 hover:text-slate-800"
              }`}
            >
              {child.name} ({child.gradeLevel})
            </button>
          ))}
        </div>
      </div>

      {/* 1. CHILD PROGRESS SUMMARY */}
      {location.pathname === "/parent" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Academic Summary: {activeChild.name}
            </h1>
            <Badge variant="success">{activeChild.gradeLevel}</Badge>
          </div>

          {/* Child Standings stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Practice Streak" 
              value={`${activeChild.streak} Days`} 
              icon={Sparkles} 
              subtext="Maintaining active study habits"
              color="text-rose-500"
            />
            <StatCard 
              title="Experience points (XP)" 
              value={`${activeChild.xp} XP`} 
              icon={BookOpen} 
              subtext={`Scholar Level: ${activeChild.level}`}
              color="text-indigo-600 dark:text-indigo-400"
            />
            <StatCard 
              title="Attendance Rate" 
              value={`${activeChild.attendanceRate}%`} 
              icon={Calendar} 
              subtext="Classroom presence Term II"
              color="text-emerald-500"
            />
            <StatCard 
              title="Financial Standings" 
              value={activeChild.feeBalance > 0 ? `UGX ${activeChild.feeBalance.toLocaleString()}` : "Settled"} 
              icon={Coins} 
              subtext={`Total Paid: UGX ${activeChild.totalPaid.toLocaleString()}`}
              color={activeChild.feeBalance > 0 ? "text-rose-500" : "text-emerald-500"}
            />
          </div>

          {/* Sub progress charts or tables */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left: Active child's grades summary */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3">
                Recent Report Card Entries
              </h3>

              <DataTable 
                data={childGrades}
                keyExtractor={(item) => item.id}
                columns={[
                  {
                    header: "Topic Subject",
                    accessor: (item: any) => (
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{item.deckTitle}</span>
                        <span className="text-[10px] text-slate-400 block">{item.className}</span>
                      </div>
                    )
                  },
                  {
                    header: "Score",
                    accessor: (item: any) => (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white font-mono">{item.score}%</span>
                        <Badge variant={item.score >= 85 ? "success" : item.score >= 60 ? "warning" : "danger"}>
                          {item.correctAnswers} / {item.totalQuestions}
                        </Badge>
                      </div>
                    )
                  },
                  {
                    header: "Instructor Review",
                    accessor: (item: any) => (
                      <p className="text-[11px] text-slate-500 italic max-w-sm">
                        "{item.feedback}"
                      </p>
                    )
                  }
                ]}
              />
            </div>

            {/* Right: Message snippet */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3">
                  Classroom Correspondence
                </h3>
                
                {parentMessages.length > 0 ? (
                  (() => {
                    const lastMsg = parentMessages[parentMessages.length - 1];
                    return (
                      <div className="pt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <img 
                            src="https://ui-avatars.com/api/?name=Joseph+Mugisha&background=4F46E5&color=fff" 
                            alt={lastMsg.teacherName} 
                            className="w-6 h-6 rounded-full" 
                          />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{lastMsg.teacherName}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 line-clamp-3 leading-relaxed">
                          "{lastMsg.content}"
                        </p>
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No messages yet.</p>
                )}
              </div>

              <button 
                onClick={() => navigate("/parent/messages")}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700 text-slate-600 dark:text-slate-350 text-[10px] font-bold uppercase tracking-wider rounded-xl text-center cursor-pointer"
              >
                Open Messages Inbox
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. TUITION FEES PAYMENT STATUS & PAYMENT PORTALS */}
      {location.pathname === "/parent/fees" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Fee Statements & Tuition payments
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              View child invoice items, review detailed receipt receipts, or settle outstanding fee balances.
            </p>
          </div>

          <DataTable 
            data={childInvoices}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "Billing Item",
                accessor: (item: any) => (
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{item.description}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Invoice #{item.id}</span>
                  </div>
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
                header: "Target Due Date",
                accessor: (item: any) => (
                  <span className="font-semibold text-slate-500 font-mono">{item.dueDate}</span>
                )
              },
              {
                header: "Payment Standing",
                accessor: (item: any) => (
                  <Badge variant={item.status === "Paid" ? "success" : item.status === "Pending" ? "warning" : "danger"}>
                    {item.status}
                  </Badge>
                )
              },
              {
                header: "Transactions Action",
                className: "text-right",
                accessor: (item: any) => {
                  if (item.status === "Paid") {
                    return (
                      <div className="flex items-center justify-end gap-2 text-emerald-500">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">{item.receiptNumber}</span>
                      </div>
                    );
                  }
                  return (
                    <button
                      onClick={() => handlePayTuition(item.id, item.description, item.amount)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ml-auto cursor-pointer shadow-md shadow-emerald-500/10"
                    >
                      <CreditCard size={11} />
                      <span>Settle Now</span>
                    </button>
                  );
                }
              }
            ]}
          />
        </div>
      )}

      {/* 3. ATTENDANCE HISTORICAL LOGS */}
      {location.pathname === "/parent/attendance" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Attendance Records: {activeChild.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Daily classroom presence anomalies, lates, or absent flags.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left table of anomalies */}
            <div className="lg:col-span-2">
              <DataTable 
                data={childAttendance}
                keyExtractor={(item) => item.id}
                columns={[
                  {
                    header: "Date Flagged",
                    accessor: (item: any) => (
                      <span className="font-semibold text-slate-500 font-mono">{item.date}</span>
                    )
                  },
                  {
                    header: "Class Stream",
                    accessor: (item: any) => (
                      <span className="font-bold text-slate-800 dark:text-white">{item.className}</span>
                    )
                  },
                  {
                    header: "Standing State",
                    accessor: (item: any) => (
                      <Badge variant={item.status === "Present" ? "success" : item.status === "Late" ? "warning" : "danger"}>
                        {item.status}
                      </Badge>
                    )
                  }
                ]}
                emptyState={
                  <div className="py-6 text-center text-slate-400 space-y-1.5">
                    <CheckCircle2 size={24} className="mx-auto text-emerald-500" />
                    <p className="text-xs font-bold uppercase text-slate-500">Perfect attendance logged!</p>
                    <p className="text-[11px] text-slate-400">No anomalies, absences, or lates flagged this calendar month.</p>
                  </div>
                }
              />
            </div>

            {/* Right summary note */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm h-fit space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3">
                Presence Audit Ratings
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-slate-500">Total Attendance Rating:</span>
                  <span className="text-xl font-mono font-black text-slate-900 dark:text-white">{activeChild.attendanceRate}%</span>
                </div>
                
                <ProgressBar progress={activeChild.attendanceRate} variant="success" size="lg" />

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/30 flex items-start gap-2.5">
                  <Clock size={15} className="text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    Term regulations mandate at least 85% classroom attendance to clear qualifications for UNEB candidate registers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. TEACHER CORRESPONDENCE MESSAGE BOARDS */}
      {location.pathname === "/parent/messages" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Direct Teacher Correspondence
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Securely correspond with {activeChild.name}'s subject instructors regarding academic performance.
            </p>
          </div>

          <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm overflow-hidden flex flex-col h-[460px]">
            
            {/* Header info */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/85 flex items-center gap-3">
              <img 
                src="https://ui-avatars.com/api/?name=Joseph+Mugisha&background=4F46E5&color=fff" 
                alt="Dr. Joseph Mugisha" 
                className="w-8 h-8 rounded-full" 
              />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Dr. Joseph Mugisha</span>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Organic Chemistry & Biology lead</span>
              </div>
            </div>

            {/* Messages box scrolls */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {parentMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${
                    msg.isFromTeacher ? "self-start" : "self-end items-end ml-auto"
                  }`}
                >
                  <span className="text-[9px] text-slate-400 font-semibold mb-1">
                    {msg.isFromTeacher ? msg.teacherName : "You"} · {msg.date}
                  </span>
                  <div className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                    msg.isFromTeacher 
                      ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-tl-none" 
                      : "bg-indigo-600 text-white dark:bg-indigo-650 rounded-tr-none shadow-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input field */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-700/85 bg-slate-50/60 dark:bg-slate-900/30 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response to Mr. Joseph Mugisha..."
                className="flex-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-brand-primary"
              />
              <button
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer shadow-md transition-colors"
                title="Send message reply"
              >
                <Send size={15} />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* 5. SCHOOL ANNOUNCEMENTS LIST */}
      {location.pathname === "/parent/announcements" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Official School Announcements
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Read urgent releases, financial audit notices, and academic releases from administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockAnnouncements.map((ann) => (
              <div 
                key={ann.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      ann.category === "Urgent" ? "danger" : ann.category === "Financial" ? "warning" : ann.category === "Academic" ? "info" : "neutral"
                    }>
                      {ann.category}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                  </div>
                  <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider leading-snug">
                    {ann.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {ann.content}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-50 dark:border-slate-700 text-[9px] font-bold text-slate-400 uppercase">
                  Issued By: {ann.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
