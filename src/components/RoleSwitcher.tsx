import React, { useState, useRef, useEffect } from "react";
import { useRole, UserRole } from "../context/RoleContext";
import { Shield, GraduationCap, BookOpen, DollarSign, Users, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const rolesList: { role: UserRole; label: string; icon: React.ComponentType<any>; color: string; path: string }[] = [
    { role: "admin", label: "Admin", icon: Shield, color: "text-indigo-600 dark:text-indigo-400", path: "/admin" },
    { role: "student", label: "Student", icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400", path: "/student" },
    { role: "teacher", label: "Teacher", icon: BookOpen, color: "text-sky-600 dark:text-sky-400", path: "/teacher" },
    { role: "burser", label: "Burser (Finance)", icon: DollarSign, color: "text-amber-600 dark:text-amber-400", path: "/finance" },
    { role: "parent", label: "Parent", icon: Users, color: "text-rose-600 dark:text-rose-400", path: "/parent" }
  ];

  const currentConfig = rolesList.find((r) => r.role === currentRole) || rolesList[1];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSelect = (role: UserRole, path: string) => {
    setCurrentRole(role);
    setIsOpen(false);
    navigate(path);
  };

  const IconComponent = currentConfig.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-sm transition-all cursor-pointer whitespace-nowrap"
      >
        <IconComponent size={14} className={currentConfig.color} />
        <span>{currentConfig.label}</span>
        <ChevronDown size={12} className={`text-slate-400 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700 py-1.5 z-50 animate-fade-in">
          <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-700/80 mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Demo Switchboard
            </span>
          </div>

          {rolesList.map((item) => {
            const ItemIcon = item.icon;
            const isSelected = item.role === currentRole;
            return (
              <button
                key={item.role}
                onClick={() => handleRoleSelect(item.role, item.path)}
                className={`w-full text-left px-3.5 py-2.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                  isSelected ? "bg-slate-50/80 dark:bg-slate-800/30" : ""
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? "bg-slate-100 dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-800"}`}>
                  <ItemIcon size={14} className={item.color} />
                </div>
                <span className={`text-xs font-medium ${isSelected ? "text-slate-900 dark:text-white font-semibold" : "text-slate-600 dark:text-slate-300"}`}>
                  {item.label}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-primary ml-auto" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
