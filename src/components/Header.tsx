import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { Moon, Sun, Menu } from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onMenuToggle: () => void;
}

export default function Header({ darkMode, setDarkMode, onMenuToggle }: HeaderProps) {
  const { currentRole } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic links per role for the top-bar (strictly 4-6, single line, no pill decorations)
  const getNavLinks = () => {
    switch (currentRole) {
      case "admin":
        return [
          { label: "Overview", path: "/admin" },
          { label: "Users", path: "/admin/users" },
          { label: "Classes", path: "/admin/classes" },
          { label: "Reports", path: "/admin/reports" },
          { label: "Settings", path: "/admin/settings" }
        ];
      case "student":
        return [
          { label: "Dashboard", path: "/student" },
          { label: "Study Decks", path: "/student/decks" },
          { label: "Report Card", path: "/student/grades" },
          { label: "Schedule", path: "/student/schedule" },
          { label: "Leaderboard", path: "/student/leaderboard" }
        ];
      case "teacher":
        return [
          { label: "Classes", path: "/teacher" },
          { label: "Students", path: "/teacher/students" },
          { label: "My Decks", path: "/teacher/decks" },
          { label: "Tasks", path: "/teacher/tasks" },
          { label: "Grading", path: "/teacher/grades" }
        ];
      case "burser":
        return [
          { label: "Fees Desk", path: "/finance" },
          { label: "Invoices", path: "/finance/invoices" },
          { label: "Ledgers", path: "/finance/ledgers" },
          { label: "Receipts", path: "/finance/receipts" },
          { label: "Reminders", path: "/finance/reminders" }
        ];
      case "parent":
        return [
          { label: "Children", path: "/parent" },
          { label: "Tuition Fees", path: "/parent/fees" },
          { label: "Attendance", path: "/parent/attendance" },
          { label: "Messages", path: "/parent/messages" },
          { label: "Announcements", path: "/parent/announcements" }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500"
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Cardify
        </Link>
      </div>

      {/* Zone 2: Navigation Links, 1-2 word labels, single-line (Hide on small viewports) */}
      <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-500 dark:text-slate-400">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-brand-primary dark:hover:text-brand-primary transition-colors whitespace-nowrap py-1 border-b-2 ${
                isActive
                  ? "text-slate-950 dark:text-white border-brand-primary"
                  : "border-transparent"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Zone 3: Primary Actions (Settings and theme toggles) */}
      <div className="flex items-center gap-2.5">
        
        {/* Dark Mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle theme mode"
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Vertical Separator */}
        <span className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* Demo Switcher */}
        <RoleSwitcher />
      </div>
    </header>
  );
}
