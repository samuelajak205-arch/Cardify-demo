import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { useTheme } from "../context/ThemeContext";
import { 
  BookOpen, Users, PlusCircle, ClipboardList, Award, 
  Search, Filter, Plus, Save, Trash2, Send, CheckCircle,
  HelpCircle, ChevronRight, Info, AlertTriangle, Clock, 
  MessageSquare, BookOpen as BookIcon, CheckSquare
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, LineChart, Line 
} from "recharts";

import { 
  mockTeachers, 
  mockStudents as initialStudents, 
  mockDecks as initialDecks, 
  mockAssignments as initialAssignments, 
  mockGrades as initialGrades,
  mockParents
} from "../data/mockData";

import StatCard from "./StatCard";
import DataTable from "./DataTable";
import Badge from "./Badge";
import ChartCard from "./ChartCard";

export default function TeacherDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTeacherId, showToast } = useRole();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Find active teacher (Mr. Joseph Mugisha)
  const teacher = mockTeachers.find(t => t.id === activeTeacherId) || mockTeachers[0];

  // Dynamic memory states
  const [decks, setDecks] = useState(initialDecks);
  const [students, setStudents] = useState(initialStudents);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [grades, setGrades] = useState(initialGrades);
  
  // Timetable
  const timetable = [
    { subject: "Senior 5 Biology", time: "08:30 - 10:00", room: "Lab A" },
    { subject: "Senior 4 Chemistry", time: "11:30 - 13:00", room: "Lab A" },
    { subject: "Senior 6 Chemistry", time: "14:30 - 16:00", room: "Lab B" }
  ];

  // Class list details
  const myClasses = [
    { name: "Senior 4 Chem", size: 6, subject: "Chemistry", avgScore: 76, nextLesson: "Today 11:30 at Lab A" },
    { name: "Senior 5 Bio", size: 4, subject: "Biology", avgScore: 97, nextLesson: "Today 08:30 at Lab A" },
    { name: "Senior 6 Chem", size: 3, subject: "Chemistry", avgScore: 82, nextLesson: "Mon 14:00 at Lab B" }
  ];

  const myDecks = decks.filter(d => d.createdByTeacherId === teacher.id);

  // SEARCH AND FILTER ROSTERS
  const [studentSearch, setStudentSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  // CREATE DECK FORM
  const [isAddDeckOpen, setIsAddDeckOpen] = useState(false);
  const [newDeck, setNewDeck] = useState({
    title: "",
    description: "",
    subject: "Chemistry",
    cards: [
      { id: "new-c1", topic: "Intro", question: "", answer: "" }
    ]
  });

  // ASSIGN TASK FORM
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    deckId: "deck-1",
    className: "Senior 4 Chem",
    dueDate: "2026-10-18",
    xpReward: 150
  });

  // FEEDBACK FORM
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  // ATTENDANCE MARKER STATE
  const [activeAttendanceClass, setActiveAttendanceClass] = useState("Senior 5 Bio");
  const [attendanceRoster, setAttendanceRoster] = useState<Record<string, "Present" | "Absent" | "Late">>({
    "student-1": "Present",
    "student-3": "Present",
    "student-4": "Present",
    "student-8": "Present"
  });

  // CORRESPONDENCE CHATS
  const [selectedParentId, setSelectedParentId] = useState<string>("parent-1");
  const [messageText, setMessageText] = useState("");
  const [parents, setParents] = useState(mockParents);

  const activeParent = parents.find(p => p.id === selectedParentId) || parents[0];

  // Performance datasets (Scores over time)
  const performanceTrendData = [
    { exam: "Quiz 1", S4: 70, S5: 88, S6: 80 },
    { exam: "Quiz 2", S4: 72, S5: 92, S6: 82 },
    { exam: "Quiz 3", S4: 75, S5: 95, S6: 78 },
    { exam: "Quiz 4", S4: 76, S5: 97, S6: 82 }
  ];

  // ACTION HANDLERS
  const handleAddCardRow = () => {
    setNewDeck({
      ...newDeck,
      cards: [
        ...newDeck.cards,
        { id: `new-c-${Date.now()}-${newDeck.cards.length}`, topic: "General", question: "", answer: "" }
      ]
    });
  };

  const handleRemoveCardRow = (index: number) => {
    if (newDeck.cards.length === 1) {
      showToast("Decks must have at least one card!");
      return;
    }
    setNewDeck({
      ...newDeck,
      cards: newDeck.cards.filter((_, idx) => idx !== index)
    });
  };

  const handleCardFieldChange = (index: number, field: "topic" | "question" | "answer", val: string) => {
    const updatedCards = [...newDeck.cards];
    updatedCards[index][field] = val;
    setNewDeck({ ...newDeck, cards: updatedCards });
  };

  const handleSaveDeckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeck.title || !newDeck.description) {
      showToast("Please enter a title and description");
      return;
    }
    const hasEmpty = newDeck.cards.some(c => !c.question || !c.answer);
    if (hasEmpty) {
      showToast("Please fill in all questions and answers!");
      return;
    }

    const created = {
      id: `deck-${Date.now()}`,
      title: newDeck.title,
      description: newDeck.description,
      subject: newDeck.subject,
      cardCount: newDeck.cards.length,
      cards: newDeck.cards,
      createdByTeacherId: teacher.id,
      popularity: 75
    };

    initialDecks.unshift(created);
    setDecks([created, ...decks]);
    showToast(`Deck "${newDeck.title}" published to student recall store!`);
    setIsAddDeckOpen(false);
    setNewDeck({ title: "", description: "", subject: "Chemistry", cards: [{ id: "new-c1", topic: "Intro", question: "", answer: "" }] });
  };

  const handleAssignTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) {
      showToast("Please enter an assignment task name");
      return;
    }

    const created = {
      id: `asg-${Date.now()}`,
      title: newTask.title,
      deckId: newTask.deckId,
      className: newTask.className,
      dueDate: newTask.dueDate,
      assignedByTeacherId: teacher.id,
      xpReward: Number(newTask.xpReward),
      subject: "Chemistry",
      status: "created" as const
    };

    initialAssignments.unshift(created);
    setAssignments([created, ...assignments]);
    showToast(`Homework task "${newTask.title}" assigned successfully!`);
    setIsAssignTaskOpen(false);
    setNewTask({ title: "", deckId: "deck-1", className: "Senior 4 Chem", dueDate: "2026-10-18", xpReward: 150 });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGradeId || !feedbackText) return;

    const updated = grades.map(g => {
      if (g.id === selectedGradeId) {
        return {
          ...g,
          feedback: feedbackText,
          feedbackByTeacherId: teacher.id
        };
      }
      return g;
    });

    initialGrades.forEach(g => {
      if (g.id === selectedGradeId) {
        g.feedback = feedbackText;
        g.feedbackByTeacherId = teacher.id;
      }
    });

    setGrades(updated);
    showToast("Feedback comment dispatched directly!");
    setSelectedGradeId(null);
    setFeedbackText("");
  };

  const handleMarkAttendance = (studentId: string, status: "Present" | "Absent" | "Late") => {
    setAttendanceRoster({
      ...attendanceRoster,
      [studentId]: status
    });
  };

  const handleSaveAttendance = () => {
    const present = Object.values(attendanceRoster).filter(v => v === "Present").length;
    const late = Object.values(attendanceRoster).filter(v => v === "Late").length;
    const absent = Object.values(attendanceRoster).filter(v => v === "Absent").length;
    showToast(`Attendance saved for ${activeAttendanceClass}! Present: ${present}, Late: ${late}, Absent: ${absent}`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText) return;

    const updatedParents = parents.map(p => {
      if (p.id === selectedParentId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          teacherId: teacher.id,
          teacherName: teacher.name,
          content: messageText,
          date: "2026-10-05 (Just now)",
          isFromTeacher: true
        };
        return {
          ...p,
          messages: [...p.messages, newMsg]
        };
      }
      return p;
    });

    setParents(updatedParents);
    mockParents.forEach(p => {
      if (p.id === selectedParentId) {
        p.messages.push({
          id: `msg-${Date.now()}`,
          teacherId: teacher.id,
          teacherName: teacher.name,
          content: messageText,
          date: "2026-10-05 (Just now)",
          isFromTeacher: true
        });
      }
    });

    showToast(`Message sent directly to ${activeParent.name}!`);
    setMessageText("");
  };

  // Filter roster students
  const getFilteredStudents = () => {
    let result = students;
    if (classFilter !== "All") {
      result = students.filter(s => s.classes.includes(classFilter));
    }
    if (studentSearch) {
      result = result.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()));
    }
    return result;
  };

  const filteredStudents = getFilteredStudents();

  // Charts parameters
  const strokeColor = isDark ? "#475569" : "#E2E8F0";
  const labelColor = isDark ? "#94A3B8" : "#64748B";

  return (
    <div className="space-y-6 select-none text-slate-800 dark:text-slate-100">
      
      {/* 1. OVERVIEW & Timetables */}
      {location.pathname === "/teacher" && (
        <div className="space-y-6">
          
          {/* PROFILE HEADER */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <img src={teacher.avatar} alt="" className="w-14 h-14 rounded-full border-2 border-brand-primary shrink-0" />
              <div className="space-y-0.5">
                <h1 className="text-xl font-black text-slate-900 dark:text-white font-serif">{teacher.name}</h1>
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  <span>Specialist: {teacher.subjects.join(", ")}</span>
                  <span>·</span>
                  <span>Curriculum Director</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button onClick={() => setIsAddDeckOpen(true)} className="flex-1 md:flex-none px-3.5 py-2 text-xs font-bold bg-brand-primary text-white rounded-xl shadow-sm transition-all cursor-pointer hover:bg-brand-primary-hover">+ Add Deck</button>
              <button onClick={() => setIsAssignTaskOpen(true)} className="flex-1 md:flex-none px-3.5 py-2 text-xs font-bold bg-brand-accent text-white rounded-xl shadow-sm transition-all cursor-pointer hover:brightness-95">+ Assign Task</button>
            </div>
          </div>

          {/* Classes layout summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {myClasses.map((cls, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">{cls.subject}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{cls.size} students</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{cls.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Next: {cls.nextLesson}</p>
                </div>
                <div className="pt-2 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Average: {cls.avgScore}% Nom</span>
                  <button onClick={() => { setClassFilter(cls.name); navigate("/teacher/students"); }} className="text-indigo-600 hover:underline flex items-center gap-0.5">Roster <ChevronRight size={12} /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Timetable & Performance Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Today's Timetable */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
                Today's Timetable
              </h3>
              <div className="space-y-3.5">
                {timetable.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/30">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{slot.subject}</span>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">{slot.room}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class performance chart */}
            <div className="lg:col-span-7">
              <ChartCard title="Classroom Performance Over Time" description="Average diagnostic recall marks mapped across evaluations (%)">
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={strokeColor} />
                    <XAxis dataKey="exam" tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                    <YAxis tick={{ fontSize: 10, fill: labelColor }} stroke={strokeColor} />
                    <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "12px", background: isDark ? "#1E293B" : "#FFF", border: isDark ? "1px solid #334155" : "1px solid #E2E8F0" }} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                    <Line type="monotone" dataKey="S4" stroke="#10B981" strokeWidth={2} name="Senior 4" />
                    <Line type="monotone" dataKey="S5" stroke="#4F46E5" strokeWidth={2} name="Senior 5" />
                    <Line type="monotone" dataKey="S6" stroke="#F59E0B" strokeWidth={2} name="Senior 6" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

          </div>

        </div>
      )}

      {/* 2. STUDENT PROGRESS TABLE */}
      {location.pathname === "/teacher/students" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">Student Progress Logs</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Track average grades, active recall strengths, and trends across cohorts.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700">
            <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/20">
              <button onClick={() => setClassFilter("All")} className={`px-4.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${classFilter === "All" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-500"}`}>All Streams</button>
              {myClasses.map(c => (
                <button key={c.name} onClick={() => setClassFilter(c.name)} className={`px-4.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${classFilter === c.name ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-500"}`}>{c.name}</button>
              ))}
            </div>
            <div className="relative flex-1 sm:max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} placeholder="Search candidate..." className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
            </div>
          </div>

          <DataTable 
            data={filteredStudents}
            keyExtractor={(s) => s.id}
            columns={[
              {
                header: "Candidate Name",
                accessor: (s: any) => (
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{s.name}</span>
                      <span className="text-[10px] text-slate-400 block">{s.studentId}</span>
                    </div>
                  </div>
                )
              },
              {
                header: "Curriculum Score",
                accessor: (s: any) => {
                  const scoreVal = s.id === "student-1" ? 92 : s.id === "student-3" ? 96 : 65;
                  return (
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono">{scoreVal}%</span>
                      <Badge variant={scoreVal >= 85 ? "success" : "warning"}>{scoreVal >= 85 ? "A" : "C"}</Badge>
                    </div>
                  );
                }
              },
              {
                header: "Attendance",
                accessor: (s: any) => (
                  <span className={`font-bold font-mono ${s.attendanceRate >= 90 ? "text-emerald-500" : "text-rose-500"}`}>{s.attendanceRate}%</span>
                )
              },
              {
                header: "Study Streak",
                accessor: (s: any) => (
                  <span className="font-bold text-rose-500 font-mono">{s.streak} Days</span>
                )
              },
              {
                header: "Trend",
                accessor: (s: any) => (
                  <span className={s.id === "student-5" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>{s.id === "student-5" ? "↓ falling" : "↑ climbing"}</span>
                )
              }
            ]}
          />
        </div>
      )}

      {/* 3. DECKS & BUILDERS */}
      {location.pathname === "/teacher/decks" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">Curriculum Deck Creator</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Publish study cards directly to student self-testing libraries.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Creator form */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider block border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">Study Cards Builder</h3>
              <form onSubmit={handleSaveDeckSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Deck Title</label>
                    <input type="text" required placeholder="e.g. Bio-Transport Systems" value={newDeck.title} onChange={(e) => setNewDeck({ ...newDeck, title: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                    <select value={newDeck.subject} onChange={(e) => setNewDeck({ ...newDeck, subject: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white">
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Physics">Physics</option>
                      <option value="Mathematics">Mathematics</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Deck Core Objective</label>
                  <textarea required rows={2} placeholder="Explain what concepts this deck covers..." value={newDeck.description} onChange={(e) => setNewDeck({ ...newDeck, description: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
                </div>

                <div className="space-y-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Card Items Queue ({newDeck.cards.length} cards)</span>
                    <button type="button" onClick={handleAddCardRow} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-350 rounded-lg cursor-pointer">+ Add Card</button>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {newDeck.cards.map((c, index) => (
                      <div key={c.id} className="p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/40 space-y-2 relative">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/50 pb-2">
                          <span className="text-[10px] font-mono text-slate-400">Card #{index + 1}</span>
                          <button type="button" onClick={() => handleRemoveCardRow(index)} className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 rounded"><Trash2 size={12} /></button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] text-slate-400 uppercase font-bold">Topic</label>
                            <input type="text" required placeholder="e.g. Osmosis" value={c.topic} onChange={(e) => handleCardFieldChange(index, "topic", e.target.value)} className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5" />
                          </div>
                          <div className="space-y-1 col-span-2">
                            <label className="text-[9px] text-slate-400 uppercase font-bold">Question</label>
                            <input type="text" required placeholder="Question front..." value={c.question} onChange={(e) => handleCardFieldChange(index, "question", e.target.value)} className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 uppercase font-bold">Answer Details</label>
                          <input type="text" required placeholder="Answer reverse..." value={c.answer} onChange={(e) => handleCardFieldChange(index, "answer", e.target.value)} className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"><Save size={13} /> Publish Deck</button>
              </form>
            </div>

            {/* List decks */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm h-fit space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2 mb-2">My Curated Decks ({myDecks.length})</h3>
              <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                {myDecks.map((deck: any) => (
                  <div key={deck.id} className="text-xs space-y-1 border-b border-slate-50 dark:border-slate-700 pb-2 last:border-b-0">
                    <div className="flex justify-between">
                      <span className="text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">{deck.subject}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{deck.cardCount} cards</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white block leading-tight">{deck.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. ASSIGN HOMEWORK TASKS */}
      {location.pathname === "/teacher/tasks" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">Homework Recall Tasks</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Assign card decks as homework tasks to school cohorts.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Assigner */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm h-fit">
              <h3 className="text-xs font-bold uppercase tracking-wider block border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">Assign Homework</h3>
              <form onSubmit={handleAssignTaskSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Task Name</label>
                  <input type="text" required placeholder="e.g. Quiz AP-5: Alkanes structure" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Link Study Deck</label>
                  <select value={newTask.deckId} onChange={(e) => setNewTask({ ...newTask, deckId: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white">
                    {decks.map(d => (
                      <option key={d.id} value={d.id}>[{d.subject}] {d.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Target Class</label>
                  <select value={newTask.className} onChange={(e) => setNewTask({ ...newTask, className: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white">
                    {myClasses.map((c, i) => (
                      <option key={i} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Target Due Date</label>
                    <input type="date" required value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-800 dark:text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">XP Rewards</label>
                    <select value={newTask.xpReward} onChange={(e) => setNewTask({ ...newTask, xpReward: Number(e.target.value) })} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-800 dark:text-white">
                      <option value={100}>100 XP</option>
                      <option value={150}>150 XP</option>
                      <option value={200}>200 XP</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer text-center">Assign Task</button>
              </form>
            </div>

            {/* List active tasks */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase block border-b border-slate-100 dark:border-slate-700 pb-2">Active Homework Queue ({assignments.length})</h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-3">
                {assignments.map(asg => (
                  <div key={asg.id} className="pt-3.5 first:pt-0 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{asg.title}</span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-slate-400">
                        <span>Class: {asg.className}</span>
                        <span>·</span>
                        <span>Due {asg.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="info">+{asg.xpReward} XP</Badge>
                      <button onClick={() => { setAssignments(assignments.filter(a => a.id !== asg.id)); showToast(`Recalled task "${asg.title}"`); }} className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 rounded"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. GRADINGS AND SUBMISSIONS */}
      {location.pathname === "/teacher/grades" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">Assessment Grading Center</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Review candidate quiz results and write qualitative commentary reports.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-8">
              <DataTable 
                data={grades}
                keyExtractor={(item) => item.id}
                columns={[
                  {
                    header: "Candidate Profile",
                    accessor: (g: any) => (
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{g.studentName}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">{g.className} · {g.subject}</span>
                      </div>
                    )
                  },
                  {
                    header: "Assessed Deck",
                    accessor: (g: any) => (
                      <span className="font-semibold text-slate-600 dark:text-slate-350">{g.deckTitle}</span>
                    )
                  },
                  {
                    header: "Score",
                    accessor: (g: any) => (
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono">{g.score}%</span>
                        <Badge variant={g.score >= 85 ? "success" : g.score >= 60 ? "warning" : "danger"}>Grade {g.grade}</Badge>
                      </div>
                    )
                  },
                  {
                    header: "Review Actions",
                    accessor: (g: any) => {
                      if (g.feedback) {
                        return <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide">Commented</span>;
                      }
                      return (
                        <button onClick={() => { setSelectedGradeId(g.id); setFeedbackText(""); }} className="px-2 py-1 bg-indigo-50 hover:bg-indigo-150 text-[9px] text-indigo-650 rounded font-bold uppercase tracking-wider">Write Review</button>
                      );
                    }
                  }
                ]}
              />
            </div>

            {/* Qualitative Feedback */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm h-fit">
              <h3 className="text-xs font-bold block border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">Assessment feedback</h3>
              {selectedGradeId ? (
                (() => {
                  const curr = grades.find(g => g.id === selectedGradeId);
                  return (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700/40 text-xs">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase mb-1">Student:</span>
                        <strong className="text-slate-800 dark:text-white block">{curr?.studentName}</strong>
                        <span className="text-[10px] text-slate-400 block leading-tight">{curr?.deckTitle} · Score: <strong className="text-emerald-500 font-mono">{curr?.score}%</strong></span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase block">Written Comments</label>
                        <textarea required rows={4} placeholder="Type descriptive advice..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-white" />
                      </div>

                      <div className="flex gap-2">
                        <button type="button" onClick={() => setSelectedGradeId(null)} className="flex-1 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl cursor-pointer">Cancel</button>
                        <button type="submit" className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer text-center">Submit</button>
                      </div>
                    </form>
                  );
                })()
              ) : (
                <div className="py-6 text-center text-slate-400 space-y-1.5">
                  <Info size={20} className="mx-auto text-slate-300" />
                  <p className="text-xs font-medium max-w-[180px] mx-auto leading-relaxed">Select a candidate's "Write Review" trigger to record qualitative tutor comments.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
