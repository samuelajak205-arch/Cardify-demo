import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { 
  Shield, Users, BookOpen, BarChart3, Settings, 
  GraduationCap, Bookmark, Award, Calendar, Trophy,
  PlusSquare, ClipboardList, Coins, CreditCard, 
  FileText, Bell, MessageSquare, LogOut, ChevronRight
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { currentRole, setCurrentRole } = useRole();
  const location = useLocation();

  // Define sidebar menu options per role with matching icons
  const getMenu = () => {
    switch (currentRole) {
      case "admin":
        return {
          title: "School Admin",
          subtitle: "Principal's Suite",
          items: [
            { label: "System Overview", path: "/admin", icon: Shield },
            { label: "User Management", path: "/admin/users", icon: Users },
            { label: "Classes & Subjects", path: "/admin/classes", icon: BookOpen },
            { label: "Financial Reports", path: "/admin/reports", icon: BarChart3 },
            { label: "System Settings", path: "/admin/settings", icon: Settings }
          ]
        };
      case "student":
        return {
          title: "Student Portal",
          subtitle: "Junior Study Desk",
          items: [
            { label: "Dashboard", path: "/student", icon: GraduationCap },
            { label: "Flashcard Decks", path: "/student/decks", icon: Bookmark },
            { label: "Grades & Progress", path: "/student/grades", icon: Award },
            { label: "Class Schedule", path: "/student/schedule", icon: Calendar },
            { label: "Leaderboard", path: "/student/leaderboard", icon: Trophy }
          ]
        };
      case "teacher":
        return {
          title: "Teacher Suite",
          subtitle: "Curriculum Manager",
          items: [
            { label: "My Classes", path: "/teacher", icon: BookOpen },
            { label: "Student Progress", path: "/teacher/students", icon: Users },
            { label: "Create Decks", path: "/teacher/decks", icon: PlusSquare },
            { label: "Assign Tasks", path: "/teacher/tasks", icon: ClipboardList },
            { label: "Grade Submissions", path: "/teacher/grades", icon: Award }
          ]
        };
      case "burser":
        return {
          title: "Bursary Desk",
          subtitle: "Financial Console",
          items: [
            { label: "Collection Overview", path: "/finance", icon: Coins },
            { label: "Payment Status", path: "/finance/invoices", icon: CreditCard },
            { label: "Fee Ledgers", path: "/finance/ledgers", icon: FileText },
            { label: "Receipts Log", path: "/finance/receipts", icon: Award },
            { label: "Fee Reminders", path: "/finance/reminders", icon: Bell }
          ]
        };
      case "parent":
        return {
          title: "Parent Portal",
          subtitle: "Guardian Dashboard",
          items: [
            { label: "Child Progress", path: "/parent", icon: Users },
            { label: "Fee Payments", path: "/parent/fees", icon: Coins },
            { label: "Attendance Log", path: "/parent/attendance", icon: Calendar },
            { label: "Teacher Messages", path: "/parent/messages", icon: MessageSquare },
            { label: "Announcements", path: "/parent/announcements", icon: Bell }
          ]
        };
      default:
        return { title: "Portal", subtitle: "Cardify System", items: [] };
    }
  };

  const menu = getMenu();

  return (
    <aside className="flex flex-col h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200/80 dark:border-slate-700/80 p-5 shrink-0 justify-between select-none">
      
      <div className="space-y-6">
        {/* Portal Information lockup */}
        <div className="flex items-center gap-3 py-1 border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg shadow-sm">
            C
          </div>
          <div>
            <span className="text-xs font-semibold block text-slate-800 dark:text-slate-100">
              {menu.title}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-550 block font-medium">
              {menu.subtitle}
            </span>
          </div>
        </div>

        {/* Menu Navigation Items */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3 px-3">
            Navigation Menu
          </span>
          {menu.items.map((item) => {
            const ItemIcon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-900/40 shadow-[0_2px_4px_rgba(79,70,229,0.04)]"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent"
                }`}
              >
                <ItemIcon size={15} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={12} className="opacity-70" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Session Area */}
      <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 mt-4 space-y-3">
        <Link
          to="/"
          onClick={() => {
            if (onClose) onClose();
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent hover:border-rose-100/30 transition-all cursor-pointer"
        >
          <LogOut size={15} />
          <span>Exit Portal</span>
        </Link>
        <div className="px-3.5">
          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono text-center">
            demo_environment_v1.0.4
          </p>
        </div>
      </div>
    </aside>
  );
}
