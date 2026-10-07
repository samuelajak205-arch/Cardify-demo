import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { useTheme } from "../context/ThemeContext";
import { 
  Users, Shield, BookOpen, Coins, Plus, Trash2, 
  Check, Search, Filter, HelpCircle, Save, CheckSquare,
  AlertCircle, Activity, Server, Clock, MessageSquare, 
  Lock, Ban, Eye, Edit3, Share2, ToggleLeft, TrendingUp
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, Legend, 
  LineChart, Line
} from "recharts";

import { 
  mockStudents as initialStudents, 
  mockTeachers as initialTeachers, 
  mockParents,
  mockInvoices,
  mockDecks,
  mockAnnouncements,
  mockExpenses,
  mockPendingApprovals as initialPending,
  mockRecentActivity,
  mockSystemHealth
} from "../data/mockData";

import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import DataTable from "./DataTable";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useRole();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [pendingApprovals, setPendingApprovals] = useState(initialPending);
  const [userTab, setUserTab] = useState<"all" | "student" | "teacher" | "parent">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [settings, setSettings] = useState({
    schoolName: "Cardify Senior Academy",
    term: "Term 3, 2026"
  });

  // Modals
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [isSendAnnOpen, setIsSendAnnOpen] = useState(false);

  // Form states
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    gradeLevel: "Senior 4",
    subject: "Chemistry"
  });

  const [newClass, setNewClass] = useState({
    name: "",
    subject: "Chemistry",
    teacherId: "teacher-1"
  });

  const [newAnn, setNewAnn] = useState({
    title: "",
    category: "General" as "General" | "Academic" | "Financial" | "Urgent",
    content: ""
  });

  // Class structures
  const [classOverview, setClassOverview] = useState([
    { name: "Senior 4 Chem", teacher: "Mr. Joseph Mugisha", count: 6, performance: "76%" },
    { name: "Senior 5 Bio", teacher: "Mr. Joseph Mugisha", count: 4, performance: "97%" },
    { name: "Senior 6 Chem", teacher: "Mr. Joseph Mugisha", count: 3, performance: "82%" },
    { name: "Senior 5 Physics", teacher: "Madam Florence Nakazzi", count: 3, performance: "91%" },
    { name: "Senior 6 Pure Math", teacher: "Madam Florence Nakazzi", count: 3, performance: "88%" },
    { name: "Senior 4 Applied Math", teacher: "Madam Florence Nakazzi", count: 5, performance: "84%" }
  ]);

  // Statistics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalParents = mockParents.length;
  const totalClasses = classOverview.length;
  const avgAttendance = 92.4; // School-wide average

  const totalPaid = mockInvoices
    .filter(inv => inv.status === "Paid")
    .reduce((sum, current) => sum + current.amount, 0);

  // CHARTS DATA
  // 1. Enrollment trend (last 6 months)
  const enrollmentTrendData = [
    { name: "May", Students: 8 },
    { name: "Jun", Students: 9 },
    { name: "Jul", Students: 10 },
    { name: "Aug", Students: 10 },
    { name: "Sep", Students: 11 },
    { name: "Oct", Students: 12 }
  ];

  // 2. Revenue vs Expenses
  const revenueVsExpensesData = [
    { name: "May", Revenue: 3.2, Expenses: 1.8 },
    { name: "Jun", Revenue: 6.4, Expenses: 3.1 },
    { name: "Jul", Revenue: 9.8, Expenses: 4.5 },
    { name: "Aug", Revenue: 13.5, Expenses: 6.2 },
    { name: "Sep", Revenue: 18.2, Expenses: 7.9 },
    { name: "Oct", Revenue: 21.8, Expenses: 11.2 }
  ];

  // Quick Action Handlers
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      showToast("Please fill in all details");
      return;
    }

    if (newUser.role === "student") {
      const s: any = {
        id: `student-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        gradeLevel: newUser.gradeLevel,
        studentId: `CARD-2026-0${Math.floor(100 + Math.random() * 900)}`,
        streak: 0,
        streakHistory: [],
        xp: 0,
        level: 1,
        attendanceRate: 100,
        attendanceSummary: { present: 30, absent: 0, late: 0 },
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=4F46E5&color=fff`,
        linkedParentId: "parent-1",
        feeStatus: "Pending",
        feeBalance: 1800000,
        totalPaid: 0,
        classes: [newUser.gradeLevel === "Senior 4" ? "Senior 4 Chem" : "Senior 5 Bio"],
        rank: students.length + 1,
        badges: []
      };
      setStudents([s, ...students]);
      showToast(`Student ${newUser.name} enrolled successfully!`);
    } else {
      const t: any = {
        id: `teacher-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=10B981&color=fff`,
        subjects: [newUser.subject],
        classesAssigned: [`${newUser.gradeLevel} ${newUser.subject}`],
        bio: "Newly onboarded staff member."
      };
      setTeachers([t, ...teachers]);
      showToast(`Teacher ${newUser.name} added to staff roster!`);
    }

    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "student", gradeLevel: "Senior 4", subject: "Chemistry" });
  };

  const handleCreateClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name) {
      showToast("Please enter a class name");
      return;
    }
    const t = teachers.find(teach => teach.id === newClass.teacherId) || teachers[0];
    const updated = [
      ...classOverview,
      { name: newClass.name, teacher: t.name, count: 0, performance: "N/A" }
    ];
    setClassOverview(updated);
    showToast(`Class "${newClass.name}" created successfully!`);
    setIsCreateClassOpen(false);
    setNewClass({ name: "", subject: "Chemistry", teacherId: "teacher-1" });
  };

  const handleSendAnnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) {
      showToast("Please fill in the fields");
      return;
    }
    showToast(`Announcement "${newAnn.title}" published!`);
    setIsSendAnnOpen(false);
    setNewAnn({ title: "", category: "General", content: "" });
  };

  const handleApprove = (id: string, name: string) => {
    setPendingApprovals(pendingApprovals.filter(p => p.id !== id));
    showToast(`Approved registration for ${name}`);
  };

  const handleDeny = (id: string, name: string) => {
    setPendingApprovals(pendingApprovals.filter(p => p.id !== id));
    showToast(`Rejected registration request for ${name}`);
  };

  // Sort and Search handler
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const getFilteredUsers = () => {
    const query = searchQuery.toLowerCase();
    
    let list: any[] = [];
    if (userTab === "all" || userTab === "student") {
      list = [...list, ...students.map(s => ({ ...s, rawRole: "student", roleLabel: "Student", specific: s.gradeLevel, joinedDate: "2026-02-12" }))];
    }
    if (userTab === "all" || userTab === "teacher") {
      list = [...list, ...teachers.map(t => ({ ...t, rawRole: "teacher", roleLabel: "Teacher", specific: t.subjects.join(", "), joinedDate: "2025-08-15" }))];
    }
    if (userTab === "all" || userTab === "parent") {
      list = [...list, ...mockParents.map(p => ({ ...p, rawRole: "parent", roleLabel: "Parent", specific: p.phone, joinedDate: "2026-01-20" }))];
    }

    // Apply Search Query
    let result = list.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    );

    // Apply Sorting
    result.sort((a, b) => {
      let aVal = a[sortField] || "";
      let bVal = b[sortField] || "";
      if (typeof aVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  };

  const filteredUsers = getFilteredUsers();

  // Chart configuration parameters
  const strokeColor = isDark ? "#475569" : "#E2E8F0";
  const labelColor = isDark ? "#94A3B8" : "#64748B";

  return (
    <div className="space-y-6 select-none text-slate-800 dark:text-slate-100">
      
      {/* 1. OVERVIEW COCKPIT PAGE */}
      {location.pathname === "/admin" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                Principal's Dashboard
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                Cardify Senior Academy core overview. Theme: {theme === "dark" ? "Dark Mode Active" : "Light Mode Active"}.
              </p>
            </div>
            
            {/* Quick Actions Row */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setIsAddUserOpen(true)}
                className="px-3.5 py-2 text-xs font-bold bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl shadow-sm transition-all cursor-pointer"
              >
                + Add User
              </button>
              <button 
                onClick={() => setIsCreateClassOpen(true)}
                className="px-3.5 py-2 text-xs font-bold bg-brand-accent text-white rounded-xl shadow-sm hover:brightness-95 transition-all cursor-pointer"
              >
                + Create Class
              </button>
              <button 
                onClick={() => setIsSendAnnOpen(true)}
                className="px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm transition-all cursor-pointer"
              >
                📣 Broadcast Alert
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <StatCard title="Total Students" value={totalStudents} icon={Users} color="text-indigo-600 dark:text-indigo-400" />
            <StatCard title="Teachers Staff" value={totalTeachers} icon={BookOpen} color="text-emerald-500" />
            <StatCard title="Guardians List" value={totalParents} icon={Users} color="text-rose-500" />
            <StatCard title="Streams" value={totalClasses} icon={CheckSquare} color="text-sky-500" />
            <StatCard title="Revenue (Term)" value={`UGX ${(totalPaid / 1000000).toFixed(1)}M`} icon={Coins} color="text-amber-500" />
            <StatCard title="Attendance Average" value={`${avgAttendance}%`} icon={Clock} color="text-teal-500" />
          </div>

          {/* Graphical row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ChartCard title="Enrollment Growth Trajectory" description="Cumulative candidate list logs (Last 6 Months)">
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={enrollmentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={strokeColor} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                  <YAxis tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "12px", background: isDark ? "#1E293B" : "#FFF", border: isDark ? "1px solid #334155" : "1px solid #E2E8F0", color: isDark ? "#FFF" : "#0F172A" }} />
                  <Area type="monotone" dataKey="Students" stroke="#4F46E5" fillOpacity={1} fill="url(#colorEnroll)" strokeWidth={2.5} name="Total Students" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revenue vs Expenses" description="Monthly operations analysis (Millions UGX)">
              <ResponsiveContainer width="100%" height={230}>
                <LineChart data={revenueVsExpensesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={strokeColor} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                  <YAxis tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "12px", background: isDark ? "#1E293B" : "#FFF", border: isDark ? "1px solid #334155" : "1px solid #E2E8F0" }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                  <Line type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={2.5} name="Revenue Collected" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Expenses" stroke="#F43F5E" strokeWidth={2} strokeDasharray="4 4" name="Expenses Disbursed" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Activity Feeds, approvals, health panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Recent Activity Feed */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3">
                Recent Activities
              </h3>
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {mockRecentActivity.map((act) => (
                  <div key={act.id} className="text-xs flex gap-3 items-start border-b border-slate-50 dark:border-slate-700 pb-2.5 last:border-b-0">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 mt-0.5 shrink-0">
                      <Activity size={13} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 dark:text-white block leading-tight">{act.title}</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{act.description}</p>
                      <span className="text-[9px] text-slate-400 font-mono block pt-0.5">{act.time} · {act.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3">
                Pending Approvals ({pendingApprovals.length})
              </h3>
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {pendingApprovals.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">All requests approved!</p>
                ) : (
                  pendingApprovals.map((p) => (
                    <div key={p.id} className="text-xs flex flex-col gap-2 p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/40">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-bold text-slate-800 dark:text-white block">{p.name}</span>
                          <span className="text-[10px] text-slate-400 block">{p.email}</span>
                        </div>
                        <Badge variant={p.role === "student" ? "success" : "info"}>{p.role}</Badge>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-2 text-[10px] font-semibold text-slate-500">
                        <span>Cohort: {p.gradeOrSubject}</span>
                        <div className="flex gap-1 shrink-0">
                          <button 
                            onClick={() => handleDeny(p.id, p.name)}
                            className="p-1 hover:bg-rose-100 dark:hover:bg-rose-950/20 text-rose-500 rounded cursor-pointer"
                          >
                            Deny
                          </button>
                          <button 
                            onClick={() => handleApprove(p.id, p.name)}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold cursor-pointer"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3">
                System Status (Mock)
              </h3>
              
              <div className="space-y-4 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500 dark:text-slate-400">Core Storage allocation:</span>
                    <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">{mockSystemHealth.storage.used} / {mockSystemHealth.storage.total}</span>
                  </div>
                  <ProgressBar progress={mockSystemHealth.storage.percentage} variant="primary" size="sm" />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/40 text-center">
                    <Server size={14} className="mx-auto text-indigo-500 mb-1" />
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Uptime Rate</span>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">{mockSystemHealth.uptime}</span>
                  </div>

                  <div className="p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/40 text-center">
                    <Activity size={14} className="mx-auto text-emerald-500 mb-1" />
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">CPU Load</span>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">{mockSystemHealth.cpuLoad}</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 dark:border-slate-700 pt-3 text-[11px] font-semibold text-slate-500">
                  <div className="flex justify-between">
                    <span>Database Status:</span>
                    <span className="text-emerald-500 font-mono">● {mockSystemHealth.databaseStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Sessions:</span>
                    <span className="font-mono text-slate-700 dark:text-white">{mockSystemHealth.activeUsers} devices</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. USER DIRECTORY */}
      {location.pathname === "/admin/users" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                User Management Directory
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Audit, search, suspend, or view students, teachers, and guardians profiles.
              </p>
            </div>
            <button 
              onClick={() => setIsAddUserOpen(true)}
              className="px-4 py-2 text-xs font-semibold bg-brand-primary text-white rounded-xl shadow-md hover:bg-brand-primary-hover flex items-center gap-2 cursor-pointer transition-all"
            >
              + Enroll User
            </button>
          </div>

          {/* Filter bars and search engines */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700">
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl gap-0.5 max-w-sm">
              {[
                { tab: "all", label: "All Users" },
                { tab: "student", label: "Students" },
                { tab: "teacher", label: "Teachers" },
                { tab: "parent", label: "Parents" }
              ].map(t => (
                <button 
                  key={t.tab}
                  onClick={() => setUserTab(t.tab as any)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${userTab === t.tab ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="relative flex-1 sm:max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search profiles..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* DataTable */}
          <DataTable 
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "Profile",
                accessor: (item: any) => (
                  <div className="flex items-center gap-3">
                    <img src={item.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-700 shrink-0" />
                    <div>
                      <span className="font-extrabold text-slate-800 dark:text-white block hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => showToast(`Opening card credentials for ${item.name}...`)}>{item.name}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">{item.email}</span>
                    </div>
                  </div>
                )
              },
              {
                header: "Role type",
                accessor: (item: any) => (
                  <Badge variant={item.rawRole === "student" ? "success" : item.rawRole === "teacher" ? "info" : "warning"}>
                    {item.roleLabel}
                  </Badge>
                )
              },
              {
                header: "Specialization / Taught",
                accessor: (item: any) => (
                  <span className="font-semibold text-slate-600 dark:text-slate-350">{item.specific}</span>
                )
              },
              {
                header: "Joined Date",
                accessor: (item: any) => (
                  <span className="font-semibold font-mono text-slate-500">{item.joinedDate}</span>
                )
              },
              {
                header: "Status",
                accessor: (item: any) => (
                  <Badge variant={item.rawRole === "student" && item.feeStatus === "Overdue" ? "danger" : "success"}>
                    Active
                  </Badge>
                )
              },
              {
                header: "Actions",
                className: "text-right",
                accessor: (item: any) => (
                  <div className="flex items-center justify-end gap-1">
                    <button 
                      onClick={() => showToast(`Reviewing full portfolio of ${item.name}`)}
                      className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                      title="View details"
                    >
                      <Eye size={13} />
                    </button>
                    <button 
                      onClick={() => showToast(`Edit credentials dialog for ${item.name}`)}
                      className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                      title="Edit properties"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button 
                      onClick={() => showToast(`Access tokens suspended for ${item.name}`)}
                      className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Suspend credentials"
                    >
                      <Ban size={13} />
                    </button>
                  </div>
                )
              }
            ]}
          />
        </div>
      )}

      {/* 3. CLASS & COHORTS LIST */}
      {location.pathname === "/admin/classes" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                Class Streams & Assignments
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Manage academy cohorts, stream instructors, and curriculum progress averages.
              </p>
            </div>
            <button 
              onClick={() => setIsCreateClassOpen(true)}
              className="px-4 py-2 text-xs font-semibold bg-brand-accent text-white rounded-xl shadow-md hover:brightness-95 flex items-center gap-2 cursor-pointer transition-all"
            >
              + Create Class Stream
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classOverview.map((cls, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      Assigned Class Stream
                    </span>
                    <Badge variant={cls.performance === "N/A" ? "neutral" : "success"}>{cls.performance === "N/A" ? "New" : "Academic"}</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                    {cls.name}
                  </h3>
                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Assigned Tutor:</span>
                      <strong className="text-slate-700 dark:text-white">{cls.teacher}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Roster size:</span>
                      <strong className="text-slate-700 dark:text-white font-mono">{cls.count} candidates</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-50 dark:border-slate-700 pt-1.5">
                      <span>Average performance:</span>
                      <strong className="text-brand-accent font-mono">{cls.performance}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-50 dark:border-slate-700 flex gap-2">
                  <button 
                    onClick={() => showToast(`Curriculum calendar audits for ${cls.name}`)}
                    className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 border border-slate-250/40 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-350 rounded-lg text-center cursor-pointer"
                  >
                    Curriculum
                  </button>
                  <button 
                    onClick={() => showToast(`Access tokens for ${cls.name} parent rosters`)}
                    className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/20 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 rounded-lg text-center cursor-pointer"
                  >
                    Parent Logs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. REPORTS PAGE */}
      {location.pathname === "/admin/reports" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
              Financial & Academic Reports
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              School term revenue logs, expense tracking audits, and projected financial stats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Tuition Billings Billed" value={`UGX ${(totalPaid / 1000000 + 4.2).toFixed(1)}M`} icon={Coins} color="text-indigo-650" />
            <StatCard title="Salaries & Operations" value={`UGX 15.4M`} icon={Server} color="text-rose-500" />
            <StatCard title="Capital Reserves" value={`UGX 6.2M`} icon={TrendingUp} color="text-emerald-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ChartCard title="Capital Collection Progression" description="Progression of cash assets vs expenses disbursed (Millions UGX)">
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={revenueVsExpensesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReportsPaid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={strokeColor} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                  <YAxis tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "12px", background: isDark ? "#1E293B" : "#FFF", border: isDark ? "1px solid #334155" : "1px solid #E2E8F0" }} />
                  <Area type="monotone" dataKey="Revenue" stroke="#10B981" fillOpacity={1} fill="url(#colorReportsPaid)" strokeWidth={2.5} name="Sovereign Collection" />
                  <Area type="monotone" dataKey="Expenses" stroke="#F43F5E" fillOpacity={0} strokeWidth={2} strokeDasharray="4 4" name="Expenditures Logged" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Expenses DataTable inside reports page */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                  Operations Expenditure Logs
                </h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {mockExpenses.map(exp => (
                    <div key={exp.id} className="py-2.5 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{exp.description}</span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">{exp.category} · {exp.date}</span>
                      </div>
                      <span className="font-mono font-bold text-rose-500 whitespace-nowrap">
                        - UGX {exp.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SYSTEM SETTINGS */}
      {location.pathname === "/admin/settings" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
              Academy Settings & Controls
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              School profiles settings, grading scale presets, and secure portal parameters.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-sm max-w-2xl">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-3 mb-5">
              Portal Parameters
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); showToast("System configurations saved successfully!"); }} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Academy Moniker</label>
                  <input type="text" defaultValue={settings.schoolName} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-805 text-slate-800 dark:text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Active Calendar Term</label>
                  <input type="text" defaultValue={settings.term} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-805 text-slate-800 dark:text-white" />
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-2">Configurations</span>
                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Allow Student Self-Testing</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Allows students to study flashcard decks for automatic continuous assessment.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-brand-primary border-slate-350 dark:border-slate-700 focus:ring-brand-primary" />
                </div>
                <div className="flex items-center justify-between py-1 border-t border-slate-50 dark:border-slate-700 pt-2">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Parent Direct Billing Logs</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Allows guardians to view outstanding balance logs and execute direct payments.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-brand-primary border-slate-350 dark:border-slate-700 focus:ring-brand-primary" />
                </div>
              </div>

              <button type="submit" className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer flex items-center gap-2 justify-center shadow-sm">
                <Save size={13} />
                <span>Save Settings</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* 1. Add User modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Onboard Member</h3>
              <button onClick={() => setIsAddUserOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold p-1">✕</button>
            </div>
            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Role Type</label>
                <div className="flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl gap-0.5">
                  <button type="button" onClick={() => setNewUser({ ...newUser, role: "student" })} className={`flex-1 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${newUser.role === "student" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xs" : "text-slate-500"}`}>Student</button>
                  <button type="button" onClick={() => setNewUser({ ...newUser, role: "teacher" })} className={`flex-1 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${newUser.role === "teacher" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xs" : "text-slate-500"}`}>Teacher</button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Name</label>
                <input type="text" required placeholder="e.g. Mugisha Moses" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Email</label>
                <input type="email" required placeholder="e.g. moses@cardify.edu" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
              </div>
              {newUser.role === "student" ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Cohort</label>
                  <select value={newUser.gradeLevel} onChange={(e) => setNewUser({ ...newUser, gradeLevel: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white">
                    <option value="Senior 4">Senior 4</option>
                    <option value="Senior 5">Senior 5</option>
                    <option value="Senior 6">Senior 6</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Subject</label>
                  <select value={newUser.subject} onChange={(e) => setNewUser({ ...newUser, subject: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white">
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
              )}
              <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">Confirm Onboarding</button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Create Class modal */}
      {isCreateClassOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Create Class Stream</h3>
              <button onClick={() => setIsCreateClassOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold p-1">✕</button>
            </div>
            <form onSubmit={handleCreateClassSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Stream Name</label>
                <input type="text" required placeholder="e.g. Senior 5 Chem Stream B" value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Tutor Leader</label>
                <select value={newClass.teacherId} onChange={(e) => setNewClass({ ...newClass, teacherId: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white">
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">Establish Stream</button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Send Announcement modal */}
      {isSendAnnOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Broadcast Alert</h3>
              <button onClick={() => setIsSendAnnOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold p-1">✕</button>
            </div>
            <form onSubmit={handleSendAnnSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Alert Title</label>
                <input type="text" required placeholder="e.g. Mid-Term exam details..." value={newAnn.title} onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Alert Category</label>
                <select value={newAnn.category} onChange={(e) => setNewAnn({ ...newAnn, category: e.target.value as any })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white">
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                  <option value="Financial">Financial</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Broadcasting Content</label>
                <textarea required rows={4} placeholder="Type announcement prose..." value={newAnn.content} onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white focus:bg-white" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm">Send Broadcast</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
