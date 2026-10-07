import React from "react";
import { useRole, UserRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { Shield, GraduationCap, BookOpen, DollarSign, Users, Sparkles, Brain, CheckCircle } from "lucide-react";

export default function Login() {
  const { setCurrentRole } = useRole();
  const navigate = useNavigate();

  const roles = [
    {
      role: "student" as UserRole,
      title: "Student Portal",
      description: "Practice active recall, view class schedules, check report cards, and climb the leaderboard.",
      demoUser: "Liam Sekamate",
      meta: "Senior 5 · Level 12 · 18 Day Streak",
      icon: GraduationCap,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      borderColor: "hover:border-emerald-500/50 hover:shadow-emerald-100/10",
      path: "/student"
    },
    {
      role: "teacher" as UserRole,
      title: "Teacher Workspace",
      description: "Manage classes, create gamified flashcard decks, assign recall tests, and review student progress.",
      demoUser: "Mr. Joseph Mugisha",
      meta: "AP Chemistry & Biology Director",
      icon: BookOpen,
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-50 dark:bg-sky-950/20",
      borderColor: "hover:border-sky-500/50 hover:shadow-sky-100/10",
      path: "/teacher"
    },
    {
      role: "admin" as UserRole,
      title: "Administrator Desk",
      description: "Oversee school-wide statistics, manage student/teacher profiles, configure subjects, and view reports.",
      demoUser: "Dr. Arthur Vance Katumba",
      meta: "Headmaster & Academic Board Director",
      icon: Shield,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
      borderColor: "hover:border-indigo-500/50 hover:shadow-indigo-100/10",
      path: "/admin"
    },
    {
      role: "burser" as UserRole,
      title: "Bursary & Finance",
      description: "Manage school-wide fee collection ledger, issue invoices, track outstanding balances, and send reminders.",
      demoUser: "Eleanor S. Namubiru",
      meta: "Finance Officer & Treasury Lead",
      icon: DollarSign,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      borderColor: "hover:border-amber-500/50 hover:shadow-amber-100/10",
      path: "/finance"
    },
    {
      role: "parent" as UserRole,
      title: "Guardian Portal",
      description: "Track your children's active recall scores, monitor attendance, pay tuition fees, and message teachers.",
      demoUser: "Hon. Robert Sekamate",
      meta: "2 Children Enrolled · Standings nominal",
      icon: Users,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
      borderColor: "hover:border-rose-500/50 hover:shadow-rose-100/10",
      path: "/parent"
    }
  ];

  const handleRoleSelect = (role: UserRole, path: string) => {
    setCurrentRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex flex-col justify-between select-none">
      
      {/* 1. Header Wordmark (Quiet, elegant) */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
            C
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Cardify
          </span>
        </div>
        <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-md">
          PROTOTYPE v1.0.4 · FULLY HARDCODED DEMO
        </span>
      </header>

      {/* 2. Hero + Selection Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Editorial Pitch */}
        <div className="lg:col-span-5 space-y-6 lg:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-lg">
            <Sparkles size={13} />
            <span>Interactive Recall System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] text-wrap">
            Where active learning meets school <span className="text-indigo-600 dark:text-indigo-400">administration</span>.
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
            Cardify is a modern education platform designed like Notion and Duolingo. It empowers students with gamified study decks, simplifies grading, and secures school-wide fee collections.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Active Recall Study Mode (spaced repetition)",
              "Real-time student progress tracking for teachers",
              "Bursary invoicing, ledgers, and receipt logging",
              "Linked Guardian views with real teacher messages"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-350">
                <CheckCircle size={14} className="text-emerald-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Selection Grid */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1 mb-4">
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Enter Cardify Portals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Click any role to enter that system instantly with preloaded mock records. No password required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {roles.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.role}
                  onClick={() => handleRoleSelect(item.role, item.path)}
                  className={`w-full text-left p-4.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.015)] transition-all duration-200 hover:scale-[1.015] cursor-pointer flex flex-col sm:flex-row gap-4 hover:shadow-lg ${item.borderColor}`}
                >
                  <div className={`p-3 rounded-xl ${item.bgColor} ${item.color} shrink-0 self-start sm:self-center`}>
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        DEMO AS: {item.demoUser}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <span>{item.meta}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* 3. Footer Statement */}
      <footer className="py-6 px-6 border-t border-slate-200/50 dark:border-slate-700/50 text-center bg-white/20 dark:bg-slate-900/20">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          © 2026 Cardify Group · Built for educational design visualization and interactive demos
        </p>
      </footer>
    </div>
  );
}
