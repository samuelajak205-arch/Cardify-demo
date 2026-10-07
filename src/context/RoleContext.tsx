import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "student" | "teacher" | "burser" | "parent";

interface ToastState {
  show: boolean;
  message: string;
}

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  activeTeacherId: string;
  setActiveTeacherId: (id: string) => void;
  activeParentId: string;
  setActiveParentId: (id: string) => void;
  showToast: (message: string) => void;
  toast: ToastState;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem("cardify_role") as UserRole) || "student";
  });

  const [activeStudentId, setActiveStudentId] = useState<string>("student-1"); // Liam Sekamate
  const [activeTeacherId, setActiveTeacherId] = useState<string>("teacher-1"); // Mr. Joseph Mugisha
  const [activeParentId, setActiveParentId] = useState<string>("parent-1"); // Hon. Robert Sekamate

  const [toast, setToast] = useState<ToastState>({ show: false, message: "" });

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    localStorage.setItem("cardify_role", role);
    
    // Automatically align active entities for realistic demo views
    if (role === "student") {
      setActiveStudentId("student-1"); // Reset to Liam Sekamate
    } else if (role === "teacher") {
      setActiveTeacherId("teacher-1"); // Reset to Mr. Joseph Mugisha
    } else if (role === "parent") {
      setActiveParentId("parent-1"); // Reset to Robert Sekamate
    }
  };

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeStudentId,
        setActiveStudentId,
        activeTeacherId,
        setActiveTeacherId,
        activeParentId,
        setActiveParentId,
        showToast,
        toast
      }}
    >
      {children}

      {/* Global High Fidelity Toast Overlay */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl border border-slate-800/20 dark:border-slate-100/10 animate-fade-in-up text-xs font-semibold">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
          <span>{toast.message}</span>
        </div>
      )}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
