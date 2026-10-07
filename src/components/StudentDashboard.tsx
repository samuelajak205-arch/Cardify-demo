import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { 
  GraduationCap, Bookmark, Award, Calendar, Trophy, 
  Flame, Award as XpIcon, Play, RefreshCcw, ArrowRight, 
  Check, ChevronRight, BookOpen, Clock, AlertCircle, Heart,
  CalendarDays, MessageSquare, Star, BookOpen as BookIcon
} from "lucide-react";

import { 
  mockStudents, 
  mockDecks as initialDecks, 
  mockGrades, 
  mockAssignments, 
  mockLeaderboard,
  mockAnnouncements,
  mockEvents
} from "../data/mockData";

import StatCard from "./StatCard";
import ProgressBar from "./ProgressBar";
import Badge from "./Badge";
import DataTable from "./DataTable";

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeStudentId, showToast } = useRole();

  // Find active student (Liam Sekamate)
  const student = mockStudents.find(s => s.id === activeStudentId) || mockStudents[0];

  // State
  const [xp, setXp] = useState(student.xp);
  const [streak, setStreak] = useState(student.streak);
  const [level, setLevel] = useState(student.level);
  const [decks, setDecks] = useState(initialDecks);

  // STUDY STAGE STATES
  const [activeStudyDeck, setActiveStudyDeck] = useState<typeof initialDecks[0] | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studySessionXp, setStudySessionXp] = useState(0);
  const [isStudyFinished, setIsStudyFinished] = useState(false);

  // Filters for browse decks
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = ["All", ...Array.from(new Set(decks.map(d => d.subject)))];

  // Helper: last 30 calendar days generator for Streak Calendar
  const getStreakDays = () => {
    const days = [];
    const today = new Date("2026-10-05");
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const isCompleted = student.streakHistory.includes(dateStr);
      days.push({
        dayNum: d.getDate(),
        dateStr,
        isCompleted
      });
    }
    return days;
  };

  const streakDays = getStreakDays();

  // Today's schedule
  const todaySchedule = [
    { subject: "Chemistry", time: "08:30 - 10:00", room: "Lab A", teacher: "Mr. Joseph Mugisha" },
    { subject: "Pure Math", time: "10:30 - 12:00", room: "Room 12", teacher: "Madam Florence Nakazzi" },
    { subject: "Physics", time: "14:00 - 15:30", room: "Lab B", teacher: "Madam Florence Nakazzi" }
  ];

  // Filter study decks
  const getFilteredDecks = () => {
    let result = decks;
    if (selectedSubjectFilter !== "All") {
      result = decks.filter(d => d.subject === selectedSubjectFilter);
    }
    if (searchQuery) {
      result = result.filter(d => 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  };

  const filteredDecks = getFilteredDecks();

  // Grades related to active student
  const myGrades = mockGrades.filter(g => g.studentId === student.id);

  // Active study deck triggers
  const handleStartStudy = (deck: typeof initialDecks[0]) => {
    setActiveStudyDeck(deck);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setStudySessionXp(0);
    setIsStudyFinished(false);
  };

  const handleGotIt = () => {
    const isLastCard = currentCardIndex === activeStudyDeck!.cards.length - 1;
    const gainedXp = 15;
    setStudySessionXp(prev => prev + gainedXp);
    
    setXp(prev => {
      const newXp = prev + gainedXp;
      const calculatedLevel = Math.floor(newXp / 250) + 1;
      if (calculatedLevel > level) {
        setLevel(calculatedLevel);
        showToast(`✨ LEVEL UP! You reached Level ${calculatedLevel}!`);
      }
      return newXp;
    });

    if (isLastCard) {
      setIsStudyFinished(true);
      if (streak === 0) setStreak(1);
      else setStreak(prev => prev + 1);
      showToast("🎉 Deck completed! Streak updated!");
    } else {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
      }, 150);
    }
  };

  const handleStudyAgain = () => {
    setIsFlipped(false);
    showToast("Flagged for review at the end of the session!");
  };

  return (
    <div className="space-y-6 select-none text-slate-800 dark:text-slate-100">
      
      {/* 1. OVERVIEW DASHBOARD */}
      {location.pathname === "/student" && (
        <div className="space-y-6">
          
          {/* PROFILE HEADER CARD */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-14 h-14 rounded-full border-2 border-brand-primary" 
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-slate-900 dark:text-white font-serif">
                    {student.name}
                  </h1>
                  <Badge variant="success">{student.gradeLevel}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>ID: {student.studentId}</span>
                  <span>·</span>
                  <span>Level {level} Candidate</span>
                </div>
              </div>
            </div>

            {/* Quick stats indicators */}
            <div className="flex flex-wrap gap-4 border-l border-slate-100 dark:border-slate-700 pl-0 md:pl-6 shrink-0 w-full md:w-auto">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-xl">
                  <Flame size={18} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-sm font-bold block font-mono tabular-nums leading-none">{streak} Days</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Current Streak</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-xl">
                  <XpIcon size={18} />
                </div>
                <div>
                  <span className="text-sm font-bold block font-mono tabular-nums leading-none">{xp} XP</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Total Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar + Streak Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left: XP Level Milestone Progress */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col justify-between space-y-5">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Level Milestones</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-200 block">Level {level} Scholar Progression</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">{xp % 250} / 250 XP to Level {level + 1}</span>
              </div>
              <ProgressBar progress={((xp % 250) / 250) * 100} size="lg" variant="primary" />

              {/* Attendance quick block */}
              <div className="grid grid-cols-3 gap-2.5 border-t border-slate-50 dark:border-slate-700 pt-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Present</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-white font-mono">{student.attendanceSummary.present} days</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Absent</span>
                  <span className="text-sm font-bold text-rose-500 font-mono">{student.attendanceSummary.absent} days</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Late Arrivals</span>
                  <span className="text-sm font-bold text-amber-500 font-mono">{student.attendanceSummary.late} days</span>
                </div>
              </div>
            </div>

            {/* Right: Daily Study Streak Calendar (Interactive Visual) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
                Daily Study Calendar
              </h3>
              
              <div className="grid grid-cols-6 gap-1.5 pt-1">
                {streakDays.map((day, idx) => (
                  <div 
                    key={idx}
                    className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${
                      day.isCompleted 
                        ? "bg-emerald-500 text-white shadow-xs" 
                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500"
                    }`}
                    title={day.dateStr}
                  >
                    {day.dayNum}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Today's Schedule & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left: Class Schedule today */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
                Today's Curriculum Schedule
              </h3>
              
              <div className="space-y-3.5">
                {todaySchedule.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/30">
                    <div className="space-y-0.5">
                      <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block leading-tight">{slot.subject}</span>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">{slot.teacher} · {slot.room}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono font-bold">
                      <Clock size={11} />
                      <span>{slot.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Badges Earned */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
                Earned Achievements ({student.badges.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                {student.badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className="p-3 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-xl text-center space-y-1 hover:scale-[1.03] transition-all cursor-pointer"
                    onClick={() => showToast(`Badge: ${badge.title} — ${badge.description}`)}
                  >
                    <span className="text-2xl block">{badge.icon}</span>
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white block leading-tight truncate">{badge.title}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 block leading-none font-medium truncate">Earned {badge.dateEarned}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Assignments list & Alerts split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left: Homework Task queue */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
                Assigned Homework recall tasks
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-3">
                {mockAssignments.slice(0, 3).map((asg) => (
                  <div key={asg.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{asg.title}</span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                        <span>{asg.subject}</span>
                        <span>·</span>
                        <span>Due {asg.dueDate}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const mDeck = decks.find(d => d.id === asg.deckId);
                        if (mDeck) handleStartStudy(mDeck);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                    >
                      Study Task
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Announcements feed */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
                Academy Announcements
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-3">
                {mockAnnouncements.slice(0, 2).map((ann) => (
                  <div key={ann.id} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{ann.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{ann.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. FLASHCARD DECK GRID & STUDY INTERACTIVE OVERLAY */}
      {location.pathname === "/student/decks" && (
        <div className="space-y-6">
          
          {!activeStudyDeck ? (
            // GRID OF DECKS
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                    Study recall library
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    Select a subject to test your active recall and spaced-repetition strengths.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/80">
                  {subjects.slice(0, 5).map((subj) => (
                    <button
                      key={subj}
                      onClick={() => setSelectedSubjectFilter(subj)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
                        selectedSubjectFilter === subj 
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs" 
                          : "text-slate-500"
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDecks.map((deck) => (
                  <div 
                    key={deck.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider">
                          {deck.subject}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          {deck.cardCount} cards
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                        {deck.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {deck.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Popularity: {deck.popularity}% Nom</span>
                      <button
                        onClick={() => handleStartStudy(deck)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-xs cursor-pointer"
                      >
                        Study Recall
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // LIVE INTERACTIVE RECALL CARD COMPONENT
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">ACTIVE RECALL PRACTICE</span>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{activeStudyDeck.title}</h2>
                </div>
                <button onClick={() => setActiveStudyDeck(null)} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white">Exit Studio</button>
              </div>

              {!isStudyFinished ? (
                <div className="space-y-6 animate-scale-up">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">Card {currentCardIndex + 1} of {activeStudyDeck.cards.length}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-500">+{studySessionXp} XP acquired</span>
                  </div>

                  {/* Visual card space */}
                  <div 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={`min-h-[250px] bg-white dark:bg-slate-800 rounded-3xl border-2 cursor-pointer shadow-lg p-8 text-center flex flex-col justify-between items-center transition-all ${
                      isFlipped ? "border-emerald-400 bg-slate-50/20" : "border-slate-250/50 dark:border-slate-700 hover:border-brand-primary"
                    }`}
                  >
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Topic: {activeStudyDeck.cards[currentCardIndex].topic}</span>
                    
                    <div className="my-8 px-4">
                      {isFlipped ? (
                        <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white animate-fade-in leading-relaxed">
                          {activeStudyDeck.cards[currentCardIndex].answer}
                        </p>
                      ) : (
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-relaxed">
                          {activeStudyDeck.cards[currentCardIndex].question}
                        </p>
                      )}
                    </div>

                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <RefreshCcw size={10} className="animate-spin-slow" />
                      <span>{isFlipped ? "Click to view Question" : "Click to view Answer"}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={handleStudyAgain} className="py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 text-xs font-bold uppercase rounded-xl">Review Again</button>
                    <button onClick={handleGotIt} className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10">
                      <Check size={14} />
                      <span>Got It! (+15 XP)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200/60 dark:border-slate-700/60 shadow-md text-center space-y-6">
                  <span className="text-3xl block">🎉</span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Practice Finished!</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Excellent discipline. You recall all cards nominal.</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl inline-flex gap-8">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block font-semibold">XP Earned</span>
                      <span className="text-sm font-mono font-bold text-emerald-500">+{studySessionXp} XP</span>
                    </div>
                    <div className="w-[1px] bg-slate-200 dark:bg-slate-800" />
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block font-semibold">Study Streak</span>
                      <span className="text-sm font-mono font-bold text-rose-500">{streak} Days</span>
                    </div>
                  </div>

                  <button onClick={() => setActiveStudyDeck(null)} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer">Done</button>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* 3. RECENT GRADES AND MARKS TABLE */}
      {location.pathname === "/student/grades" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
              Academic Report Card
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Official records of assessed spaced-repetition recall scores and tutor reviews.
            </p>
          </div>

          <DataTable 
            data={myGrades}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "Curriculum Subject",
                accessor: (item: any) => (
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{item.deckTitle}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{item.className} · {item.subject}</span>
                  </div>
                )
              },
              {
                header: "Score",
                accessor: (item: any) => (
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800 dark:text-white">{item.score}%</span>
                    <Badge variant={item.score >= 85 ? "success" : item.score >= 60 ? "warning" : "danger"}>Grade {item.grade}</Badge>
                  </div>
                )
              },
              {
                header: "Tutor Feedback",
                accessor: (item: any) => (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic max-w-md">
                    "{item.feedback}"
                  </p>
                )
              },
              {
                header: "Attempt Date",
                accessor: (item: any) => (
                  <span className="font-mono text-slate-400 dark:text-slate-500 font-semibold">{item.date}</span>
                )
              }
            ]}
          />
        </div>
      )}

      {/* 4. CLASS SCHEDULE */}
      {location.pathname === "/student/schedule" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
              My Class Schedule
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Term II calendar stream schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4.5 border border-slate-200/60 dark:border-slate-700/60 shadow-sm space-y-4">
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider block border-b border-slate-50 dark:border-slate-700 pb-2">{day}</span>
                <div className="space-y-3">
                  {todaySchedule.map((slot, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-700/30 space-y-1">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block leading-tight">{slot.subject}</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                        <Clock size={10} />
                        <span className="font-mono">{slot.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. LEADERBOARD */}
      {location.pathname === "/student/leaderboard" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
              Active Scholars Leaderboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              See where you stand in the term's recall race. Top positions earn awards.
            </p>
          </div>

          <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {mockLeaderboard.slice(0, 5).map((entry, idx) => {
                const isMe = entry.studentId === student.id;
                return (
                  <div key={entry.studentId} className={`flex items-center justify-between p-4.5 ${isMe ? "bg-indigo-50/50 dark:bg-indigo-950/20" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-slate-400 text-xs w-6 text-center">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}</span>
                      <img src={entry.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-700 shrink-0" />
                      <div>
                        <span className={`text-xs font-bold block ${isMe ? "text-indigo-600 dark:text-indigo-400 font-extrabold" : "text-slate-800 dark:text-slate-200"}`}>{entry.name} {isMe && "(You)"}</span>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Streak: {entry.streak} Days</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-350">{entry.xp} XP</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
