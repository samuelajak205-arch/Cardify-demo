// Cardify Consolidated & Expanded Mock Data Module
// Designed to power a high-fidelity visual and functional clickable prototype.

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  subject: string;
  cardCount: number;
  cards: Flashcard[];
  createdByTeacherId: string;
  popularity: number; // 1-100 rating
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or descriptor
  dateEarned: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  gradeLevel: string; // "Senior 4", "Senior 5", "Senior 6"
  studentId: string; // e.g. "CARD-2026-0041"
  streak: number; // current streak in days
  streakHistory: string[]; // dates of study in last 30 days (e.g. ["2026-10-01", "2026-10-02"])
  xp: number; // total experience points
  level: number;
  attendanceRate: number; // percentage
  attendanceSummary: {
    present: number;
    absent: number;
    late: number;
  };
  avatar: string;
  linkedParentId: string;
  feeStatus: "Paid" | "Pending" | "Overdue";
  feeBalance: number;
  totalPaid: number;
  classes: string[];
  rank: number;
  badges: AchievementBadge[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subjects: string[];
  classesAssigned: string[];
  bio: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  linkedStudentIds: string[];
  phone: string;
  messages: {
    id: string;
    teacherId: string;
    teacherName: string;
    content: string;
    date: string;
    isFromTeacher: boolean;
  }[];
}

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  amount: number;
  description: string;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  paidDate?: string;
  paymentMethod?: "Cash" | "Mobile Money" | "Bank Transfer";
  receiptNumber?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: "Present" | "Absent" | "Late" | "Excused";
  className: string;
}

export interface Assignment {
  id: string;
  title: string;
  deckId: string;
  className: string;
  dueDate: string;
  assignedByTeacherId: string;
  xpReward: number;
  subject: string;
  status: "created" | "pending grading" | "completed";
}

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  deckId: string;
  deckTitle: string;
  subject: string;
  className: string;
  score: number; // percentage
  grade: "A" | "B" | "C" | "D" | "F";
  totalQuestions: number;
  correctAnswers: number;
  date: string;
  feedback: string;
  feedbackByTeacherId: string;
  trend: "up" | "down" | "stable";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "General" | "Academic" | "Financial" | "Urgent";
  author: string;
}

export interface LeaderboardEntry {
  studentId: string;
  name: string;
  xp: number;
  streak: number;
  rank: number;
  avatar: string;
  change: "up" | "down" | "same";
}

export interface ExpenseRecord {
  id: string;
  category: "Academics" | "Utilities" | "Salaries" | "Maintenance" | "Supplies";
  amount: number;
  description: string;
  date: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "academic" | "parents" | "holiday" | "exam";
  description: string;
}

export interface PendingApproval {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  gradeOrSubject: string;
  dateRequested: string;
}

export interface RecentActivity {
  id: string;
  type: "registration" | "payment" | "announcement" | "grade";
  title: string;
  description: string;
  time: string;
  user: string;
}

// ----------------------------------------------------
// 1. SYSTEM HEALTH & METRICS
// ----------------------------------------------------
export const mockSystemHealth = {
  storage: { used: "142 GB", total: "512 GB", percentage: 27.7 },
  activeUsers: 48,
  uptime: "99.98%",
  cpuLoad: "12%",
  databaseStatus: "nominal",
  sslExpiration: "2027-04-12"
};

// ----------------------------------------------------
// 2. ADMIN PERSONA
// ----------------------------------------------------
export const mockAdmin = {
  id: "admin-1",
  name: "Dr. Arthur Vance Katumba",
  email: "principal.katumba@cardify.edu",
  avatar: "https://ui-avatars.com/api/?name=Arthur+Katumba&background=4F46E5&color=fff&size=150",
  role: "System Administrator & Headmaster",
  permissions: ["all_access", "billing_admin", "user_admin"]
};

// ----------------------------------------------------
// 3. BURSER PERSONA
// ----------------------------------------------------
export const mockBurser = {
  id: "burser-1",
  name: "Eleanor Sterling Namubiru",
  email: "finance.namubiru@cardify.edu",
  avatar: "https://ui-avatars.com/api/?name=Eleanor+Namubiru&background=10B981&color=fff&size=150",
  role: "Chief Burser / Finance Director"
};

// ----------------------------------------------------
// 4. TEACHERS (5)
// ----------------------------------------------------
export const mockTeachers: Teacher[] = [
  {
    id: "teacher-1",
    name: "Mr. Joseph Mugisha",
    email: "joseph.mugisha@cardify.edu",
    avatar: "https://ui-avatars.com/api/?name=Joseph+Mugisha&background=4F46E5&color=fff",
    subjects: ["Chemistry", "Biology"],
    classesAssigned: ["Senior 4 Chem", "Senior 5 Bio", "Senior 6 Chem"],
    bio: "Passionate biochemist aiming to make science highly interactive using gamified cards."
  },
  {
    id: "teacher-2",
    name: "Madam Florence Nakazzi",
    email: "florence.nakazzi@cardify.edu",
    avatar: "https://ui-avatars.com/api/?name=Florence+Nakazzi&background=10B981&color=fff",
    subjects: ["Physics", "Mathematics"],
    classesAssigned: ["Senior 5 Physics", "Senior 6 Pure Math", "Senior 4 Applied Math"],
    bio: "Senior examiner with 15 years of experience modeling mathematical systems."
  },
  {
    id: "teacher-3",
    name: "Mr. Bernard Okot",
    email: "bernard.okot@cardify.edu",
    avatar: "https://ui-avatars.com/api/?name=Bernard+Okot&background=F59E0B&color=fff",
    subjects: ["History", "Geography"],
    classesAssigned: ["Senior 4 East African History", "Senior 5 Geog"],
    bio: "Historical enthusiast specialized in African post-colonial governance systems."
  },
  {
    id: "teacher-4",
    name: "Mrs. Justine Aliyo",
    email: "justine.aliyo@cardify.edu",
    avatar: "https://ui-avatars.com/api/?name=Justine+Aliyo&background=3B82F6&color=fff",
    subjects: ["English Literature"],
    classesAssigned: ["Senior 5 Literature", "Senior 6 English Prose"],
    bio: "Literary critic focused on contemporary African playwrights and prose styling."
  },
  {
    id: "teacher-5",
    name: "Monsieur Jean-Luc Kizza",
    email: "jean.kizza@cardify.edu",
    avatar: "https://ui-avatars.com/api/?name=Jean-Luc+Kizza&background=8B5CF6&color=fff",
    subjects: ["French", "Luganda"],
    classesAssigned: ["Senior 4 French", "Senior 5 Luganda"],
    bio: "Multilingual researcher bridging European romance languages with Bantu dialects."
  }
];

// ----------------------------------------------------
// 5. PARENTS (6)
// ----------------------------------------------------
export const mockParents: Parent[] = [
  {
    id: "parent-1",
    name: "Hon. Robert Sekamate",
    email: "robert.sekamate@gov.ug",
    avatar: "https://ui-avatars.com/api/?name=Robert+Sekamate&background=4F46E5&color=fff",
    linkedStudentIds: ["student-1", "student-2"], // Liam & Clara
    phone: "+256 772 120456",
    messages: [
      { id: "m1", teacherId: "teacher-1", teacherName: "Mr. Joseph Mugisha", content: "Liam is doing incredibly well in organic chemistry, his streak is keeping him top of the class.", date: "2026-10-02", isFromTeacher: true },
      { id: "m2", teacherId: "teacher-1", teacherName: "Mr. Joseph Mugisha", content: "Thank you Dr. Mugisha, we are monitoring his study routine closely at home.", date: "2026-10-03", isFromTeacher: false }
    ]
  },
  {
    id: "parent-2",
    name: "Dr. Grace Namubiru",
    email: "grace.namubiru@mulago.or.ug",
    avatar: "https://ui-avatars.com/api/?name=Grace+Namubiru&background=10B981&color=fff",
    linkedStudentIds: ["student-3", "student-4"], // Zahra & Ethan
    phone: "+256 701 893240",
    messages: [
      { id: "m3", teacherId: "teacher-2", teacherName: "Madam Florence Nakazzi", content: "Zahra needs to speed up on her mechanics assignments. Please check her pending decks.", date: "2026-10-04", isFromTeacher: true }
    ]
  },
  {
    id: "parent-3",
    name: "Mr. Patrick Odongo",
    email: "patrick.odongo@unra.co.ug",
    avatar: "https://ui-avatars.com/api/?name=Patrick+Odongo&background=F59E0B&color=fff",
    linkedStudentIds: ["student-5"], // Lamech
    phone: "+256 752 443210",
    messages: [
      { id: "m4", teacherId: "teacher-3", teacherName: "Mr. Bernard Okot", content: "Lamech has shown incredible debate capability in history class this week.", date: "2026-09-30", isFromTeacher: true }
    ]
  },
  {
    id: "parent-4",
    name: "Mrs. Sarah Chelangat",
    email: "sarah.chelangat@wildlife.go.ug",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chelangat&background=3B82F6&color=fff",
    linkedStudentIds: ["student-6", "student-7"], // Kiprotich & Mercy
    phone: "+256 776 554321",
    messages: []
  },
  {
    id: "parent-5",
    name: "Mr. Moses Ssebunya",
    email: "moses.ssebunya@stanbic.com",
    avatar: "https://ui-avatars.com/api/?name=Moses+Ssebunya&background=8B5CF6&color=fff",
    linkedStudentIds: ["student-8", "student-9", "student-10"], // Kizza, Nsubuga, Sanyu
    phone: "+256 782 990112",
    messages: [
      { id: "m5", teacherId: "teacher-4", teacherName: "Mrs. Justine Aliyo", content: "Kizza's creative writing draft on regional folklore was outstanding.", date: "2026-10-01", isFromTeacher: true }
    ]
  },
  {
    id: "parent-6",
    name: "Dr. Faith Atwine",
    email: "faith.atwine@mbarara.ac.ug",
    avatar: "https://ui-avatars.com/api/?name=Faith+Atwine&background=EC4899&color=fff",
    linkedStudentIds: ["student-11", "student-12"], // Derrick & Angel
    phone: "+256 774 332211",
    messages: []
  }
];

// ----------------------------------------------------
// 6. STUDENTS (12 WITH FULL PROFILES)
// ----------------------------------------------------
export const mockStudents: Student[] = [
  {
    id: "student-1",
    name: "Liam Sekamate",
    email: "liam.sekamate@cardify.edu",
    gradeLevel: "Senior 5",
    studentId: "CARD-2026-0041",
    streak: 18,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01", "2026-09-30", "2026-09-29", "2026-09-28", "2026-09-25", "2026-09-24", "2026-09-23", "2026-09-22", "2026-09-21", "2026-09-20", "2026-09-19", "2026-09-18", "2026-09-17", "2026-09-16"],
    xp: 2450,
    level: 10,
    attendanceRate: 98,
    attendanceSummary: { present: 28, absent: 1, late: 1 },
    avatar: "https://ui-avatars.com/api/?name=Liam+Sekamate&background=4F46E5&color=fff",
    linkedParentId: "parent-1",
    feeStatus: "Paid",
    feeBalance: 0,
    totalPaid: 1800000,
    classes: ["Senior 5 Bio", "Senior 5 Physics", "Senior 6 Pure Math"],
    rank: 2,
    badges: [
      { id: "b1", title: "Active Scholar", description: "Maintained a 15+ study streak", icon: "🔥", dateEarned: "2026-09-28" },
      { id: "b2", title: "Chemistry Sage", description: "Scored 90%+ in 3 Chemistry Decks", icon: "🧪", dateEarned: "2026-09-24" },
      { id: "b3", title: "Brainiac", description: "Earned over 2000 total XP", icon: "🧠", dateEarned: "2026-10-01" }
    ]
  },
  {
    id: "student-2",
    name: "Clara Sekamate",
    email: "clara.sekamate@cardify.edu",
    gradeLevel: "Senior 4",
    studentId: "CARD-2026-0042",
    streak: 12,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01", "2026-09-30", "2026-09-29", "2026-09-28", "2026-09-27", "2026-09-26", "2026-09-25", "2026-09-24"],
    xp: 1890,
    level: 8,
    attendanceRate: 96,
    attendanceSummary: { present: 27, absent: 1, late: 2 },
    avatar: "https://ui-avatars.com/api/?name=Clara+Sekamate&background=10B981&color=fff",
    linkedParentId: "parent-1",
    feeStatus: "Paid",
    feeBalance: 0,
    totalPaid: 1800000,
    classes: ["Senior 4 Chem", "Senior 4 Applied Math", "Senior 4 French"],
    rank: 5,
    badges: [
      { id: "b1", title: "Active Scholar", description: "Maintained a 10+ study streak", icon: "🔥", dateEarned: "2026-10-02" },
      { id: "b4", title: "Polyglot Apprentice", description: "Completed French basics deck with 100%", icon: "🗣️", dateEarned: "2026-09-20" }
    ]
  },
  {
    id: "student-3",
    name: "Zahra Babirye",
    email: "zahra.babirye@cardify.edu",
    gradeLevel: "Senior 5",
    studentId: "CARD-2026-0014",
    streak: 22,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01", "2026-09-30", "2026-09-29", "2026-09-28", "2026-09-27", "2026-09-26", "2026-09-25", "2026-09-24", "2026-09-23", "2026-09-22", "2026-09-21", "2026-09-20", "2026-09-19", "2026-09-18", "2026-09-17", "2026-09-16", "2026-09-15", "2026-09-14"],
    xp: 2980,
    level: 12,
    attendanceRate: 99,
    attendanceSummary: { present: 29, absent: 0, late: 1 },
    avatar: "https://ui-avatars.com/api/?name=Zahra+Babirye&background=F59E0B&color=fff",
    linkedParentId: "parent-2",
    feeStatus: "Pending",
    feeBalance: 450000,
    totalPaid: 1350000,
    classes: ["Senior 5 Bio", "Senior 5 Physics", "Senior 5 Geog", "Senior 5 Literature"],
    rank: 1,
    badges: [
      { id: "b1", title: "Active Scholar", description: "Maintained a 20+ study streak", icon: "🔥", dateEarned: "2026-10-03" },
      { id: "b3", title: "Brainiac", description: "Earned over 2500 total XP", icon: "🧠", dateEarned: "2026-09-26" },
      { id: "b5", title: "Bio Pioneer", description: "Completed plant vascular deck on first try", icon: "🌿", dateEarned: "2026-09-18" }
    ]
  },
  {
    id: "student-4",
    name: "Ethan Kato",
    email: "ethan.kato@cardify.edu",
    gradeLevel: "Senior 5",
    studentId: "CARD-2026-0015",
    streak: 5,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01"],
    xp: 1420,
    level: 6,
    attendanceRate: 92,
    attendanceSummary: { present: 25, absent: 2, late: 3 },
    avatar: "https://ui-avatars.com/api/?name=Ethan+Kato&background=3B82F6&color=fff",
    linkedParentId: "parent-2",
    feeStatus: "Paid",
    feeBalance: 0,
    totalPaid: 1800000,
    classes: ["Senior 5 Bio", "Senior 5 Physics", "Senior 5 Geog"],
    rank: 7,
    badges: [
      { id: "b6", title: "Explorer", description: "Studied decks in 3 separate subjects", icon: "🗺️", dateEarned: "2026-09-25" }
    ]
  },
  {
    id: "student-5",
    name: "Lamech Odongo",
    email: "lamech.odongo@cardify.edu",
    gradeLevel: "Senior 4",
    studentId: "CARD-2026-0089",
    streak: 0,
    streakHistory: [],
    xp: 650,
    level: 3,
    attendanceRate: 85,
    attendanceSummary: { present: 22, absent: 4, late: 4 },
    avatar: "https://ui-avatars.com/api/?name=Lamech+Odongo&background=8B5CF6&color=fff",
    linkedParentId: "parent-3",
    feeStatus: "Overdue",
    feeBalance: 850000,
    totalPaid: 950000,
    classes: ["Senior 4 Chem", "Senior 4 Applied Math", "Senior 4 East African History"],
    rank: 11,
    badges: []
  },
  {
    id: "student-6",
    name: "Kiprotich Chelangat",
    email: "kipro.chelangat@cardify.edu",
    gradeLevel: "Senior 6",
    studentId: "CARD-2026-0005",
    streak: 15,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01", "2026-09-30", "2026-09-29", "2026-09-28", "2026-09-27", "2026-09-26", "2026-09-25", "2026-09-24", "2026-09-23", "2026-09-22", "2026-09-21"],
    xp: 2150,
    level: 9,
    attendanceRate: 95,
    attendanceSummary: { present: 26, absent: 2, late: 2 },
    avatar: "https://ui-avatars.com/api/?name=Kiprotich+Chelangat&background=EC4899&color=fff",
    linkedParentId: "parent-4",
    feeStatus: "Paid",
    feeBalance: 0,
    totalPaid: 1950000,
    classes: ["Senior 6 Chem", "Senior 6 Pure Math", "Senior 6 English Prose"],
    rank: 3,
    badges: [
      { id: "b1", title: "Active Scholar", description: "Maintained a 15+ study streak", icon: "🔥", dateEarned: "2026-10-05" },
      { id: "b7", title: "Math Master", description: "Perfect score in Differentiation Deck", icon: "📐", dateEarned: "2026-09-22" }
    ]
  },
  {
    id: "student-7",
    name: "Mercy Chebet",
    email: "mercy.chebet@cardify.edu",
    gradeLevel: "Senior 4",
    studentId: "CARD-2026-0006",
    streak: 14,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01", "2026-09-30", "2026-09-29", "2026-09-28", "2026-09-27", "2026-09-26", "2026-09-25", "2026-09-24", "2026-09-23", "2026-09-22"],
    xp: 1980,
    level: 8,
    attendanceRate: 97,
    attendanceSummary: { present: 28, absent: 1, late: 1 },
    avatar: "https://ui-avatars.com/api/?name=Mercy+Chebet&background=14B8A6&color=fff",
    linkedParentId: "parent-4",
    feeStatus: "Paid",
    feeBalance: 0,
    totalPaid: 1800000,
    classes: ["Senior 4 Chem", "Senior 4 Applied Math", "Senior 4 French"],
    rank: 4,
    badges: [
      { id: "b1", title: "Active Scholar", description: "Maintained a 10+ study streak", icon: "🔥", dateEarned: "2026-10-01" }
    ]
  },
  {
    id: "student-8",
    name: "Kizza Ssebunya",
    email: "kizza.ssebunya@cardify.edu",
    gradeLevel: "Senior 5",
    studentId: "CARD-2026-0105",
    streak: 9,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01", "2026-09-30", "2026-09-29", "2026-09-28", "2026-09-27"],
    xp: 1350,
    level: 6,
    attendanceRate: 91,
    attendanceSummary: { present: 24, absent: 3, late: 3 },
    avatar: "https://ui-avatars.com/api/?name=Kizza+Ssebunya&background=F43F5E&color=fff",
    linkedParentId: "parent-5",
    feeStatus: "Pending",
    feeBalance: 500000,
    totalPaid: 1300000,
    classes: ["Senior 5 Bio", "Senior 5 Physics", "Senior 5 Literature", "Senior 5 Luganda"],
    rank: 8,
    badges: [
      { id: "b8", title: "Linguist", description: "Studied french and luganda grammar rules", icon: "🌍", dateEarned: "2026-09-27" }
    ]
  },
  {
    id: "student-9",
    name: "Nsubuga Ssebunya",
    email: "nsubuga.ssebunya@cardify.edu",
    gradeLevel: "Senior 4",
    studentId: "CARD-2026-0106",
    streak: 3,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03"],
    xp: 890,
    level: 4,
    attendanceRate: 89,
    attendanceSummary: { present: 23, absent: 3, late: 4 },
    avatar: "https://ui-avatars.com/api/?name=Nsubuga+Ssebunya&background=06B6D4&color=fff",
    linkedParentId: "parent-5",
    feeStatus: "Pending",
    feeBalance: 500000,
    totalPaid: 1300000,
    classes: ["Senior 4 Chem", "Senior 4 Applied Math"],
    rank: 10,
    badges: []
  },
  {
    id: "student-10",
    name: "Sanyu Ssebunya",
    email: "sanyu.ssebunya@cardify.edu",
    gradeLevel: "Senior 6",
    studentId: "CARD-2026-0107",
    streak: 11,
    streakHistory: ["2026-10-05", "2026-10-04", "2026-10-03", "2026-10-02", "2026-10-01", "2026-09-30", "2026-09-29", "2026-09-28", "2026-09-27", "2026-09-26", "2026-09-25"],
    xp: 1540,
    level: 7,
    attendanceRate: 94,
    attendanceSummary: { present: 26, absent: 2, late: 2 },
    avatar: "https://ui-avatars.com/api/?name=Sanyu+Ssebunya&background=10B981&color=fff",
    linkedParentId: "parent-5",
    feeStatus: "Paid",
    feeBalance: 0,
    totalPaid: 1950000,
    classes: ["Senior 6 Chem", "Senior 6 Pure Math", "Senior 6 English Prose"],
    rank: 6,
    badges: [
      { id: "b1", title: "Active Scholar", description: "Maintained a 10+ study streak", icon: "🔥", dateEarned: "2026-10-01" }
    ]
  },
  {
    id: "student-11",
    name: "Derrick Atwine",
    email: "derrick.atwine@cardify.edu",
    gradeLevel: "Senior 6",
    studentId: "CARD-2026-0144",
    streak: 2,
    streakHistory: ["2026-10-05", "2026-10-04"],
    xp: 1120,
    level: 5,
    attendanceRate: 90,
    attendanceSummary: { present: 24, absent: 3, late: 3 },
    avatar: "https://ui-avatars.com/api/?name=Derrick+Atwine&background=6366F1&color=fff",
    linkedParentId: "parent-6",
    feeStatus: "Overdue",
    feeBalance: 950000,
    totalPaid: 1000000,
    classes: ["Senior 6 Chem", "Senior 6 Pure Math", "Senior 6 English Prose"],
    rank: 9,
    badges: []
  },
  {
    id: "student-12",
    name: "Angel Atwine",
    email: "angel.atwine@cardify.edu",
    gradeLevel: "Senior 4",
    studentId: "CARD-2026-0145",
    streak: 0,
    streakHistory: [],
    xp: 420,
    level: 2,
    attendanceRate: 82,
    attendanceSummary: { present: 21, absent: 5, late: 4 },
    avatar: "https://ui-avatars.com/api/?name=Angel+Atwine&background=F59E0B&color=fff",
    linkedParentId: "parent-6",
    feeStatus: "Overdue",
    feeBalance: 950000,
    totalPaid: 850000,
    classes: ["Senior 4 Chem", "Senior 4 Applied Math", "Senior 4 French"],
    rank: 12,
    badges: []
  }
];

// ----------------------------------------------------
// 7. EXPENSE RECORDS
// ----------------------------------------------------
export const mockExpenses: ExpenseRecord[] = [
  { id: "exp-1", category: "Academics", amount: 1500000, description: "UNEB Mock Science Lab Materials", date: "2026-10-01" },
  { id: "exp-2", category: "Utilities", amount: 2400000, description: "Solar Battery Storage Maintenance", date: "2026-09-28" },
  { id: "exp-3", category: "Salaries", amount: 8500000, description: "Tutors Salary Term II Dispatch", date: "2026-09-30" },
  { id: "exp-4", category: "Maintenance", amount: 1800000, description: "Boys Quarters water pump repairs", date: "2026-09-25" },
  { id: "exp-5", category: "Supplies", amount: 950000, description: "High-speed router and fiber line", date: "2026-10-03" }
];

// ----------------------------------------------------
// 8. EVENT CALENDAR (10)
// ----------------------------------------------------
export const mockEvents: CalendarEvent[] = [
  { id: "evt-1", title: "Parents Consultation Day", date: "2026-10-20", type: "parents", description: "One-on-one reviews of active recall stats and report cards." },
  { id: "evt-2", title: "Mid-Term Examinations Begin", date: "2026-10-22", type: "exam", description: "Official examinations for all candidate classes." },
  { id: "evt-3", title: "Independence Day Holiday", date: "2026-10-09", type: "holiday", description: "National holiday. Boarders remain in campus." },
  { id: "evt-4", title: "National Science Exposition", date: "2026-11-15", type: "academic", description: "Showcasing student visual study models and digital designs." },
  { id: "evt-5", title: "UACE Oral Speaking Tests", date: "2026-11-05", type: "exam", description: "UNEB Speaking assessments for Language candidates." },
  { id: "evt-6", title: "Bursar Audit Assembly", date: "2026-10-15", type: "parents", description: "General tuition ledgers reconciliation day." },
  { id: "evt-7", title: "Inter-House Sports Gala", date: "2026-11-20", type: "holiday", description: "Athletics tournaments at the Kampala tracks." },
  { id: "evt-8", title: "French Immersion Assembly", date: "2026-10-18", type: "academic", description: "Cultural performance and oral practice modules." },
  { id: "evt-9", title: "Boarding House Inspections", date: "2026-10-12", type: "academic", description: "General inspection of living hubs and study panels." },
  { id: "evt-10", title: "Graduation Gala S6", date: "2026-12-05", type: "holiday", description: "S6 Farewell dinner and academic reward programs." }
];

// ----------------------------------------------------
// 9. PENDING APPROVALS
// ----------------------------------------------------
export const mockPendingApprovals: PendingApproval[] = [
  { id: "app-1", name: "Derrick Okello", email: "derrick.okello@gmail.com", role: "student", gradeOrSubject: "Senior 5", dateRequested: "2026-10-04" },
  { id: "app-2", name: "Dr. Catherine Atim", email: "catherine.atim@cardify.edu", role: "teacher", gradeOrSubject: "Biology", dateRequested: "2026-10-03" },
  { id: "app-3", name: "Namatovu Sandra", email: "namatovu.s@yahoo.com", role: "student", gradeOrSubject: "Senior 4", dateRequested: "2026-10-05" }
];

// ----------------------------------------------------
// 10. RECENT ACTIVITY LIST (FOR ADMIN RECENT ACTIVITY)
// ----------------------------------------------------
export const mockRecentActivity: RecentActivity[] = [
  { id: "act-1", type: "payment", title: "Tuition Settle", description: "Hon. Robert Sekamate cleared Tuition for Liam Sekamate", time: "10 mins ago", user: "Hon. Robert Sekamate" },
  { id: "act-2", type: "registration", title: "New Candidate Onboarded", description: "Sandra Namatovu requested student profile approval", time: "1 hour ago", user: "Sandra Namatovu" },
  { id: "act-3", type: "announcement", title: "Curriculum Release", description: "Mr. Joseph Mugisha published National Science Expo details", time: "2 hours ago", user: "Mr. Joseph Mugisha" },
  { id: "act-4", type: "grade", title: "Attempt Assessed", description: "Liam Sekamate scored 95% on Cell Division Deck", time: "1 day ago", user: "Liam Sekamate" },
  { id: "act-5", type: "payment", title: "Balance Dispatched", description: "Bursary ledger raised sports invoice for S4 candidates", time: "1 day ago", user: "Eleanor Namubiru" }
];

// ----------------------------------------------------
// 11. 20 FLASHCARD DECKS (8-10 CARDS EACH)
// ----------------------------------------------------
export const mockDecks: Deck[] = [
  {
    id: "deck-1",
    title: "Introduction to Organic Chemistry",
    description: "Understand the structures of alkanes, alkenes, functional groups, and isomerism formulas.",
    subject: "Chemistry",
    cardCount: 8,
    createdByTeacherId: "teacher-1",
    popularity: 96,
    cards: [
      { id: "d1c1", topic: "Hydrocarbons", question: "What is the general formula for a saturated acyclic alkane?", answer: "CnH2n+2. Alkanes consist strictly of single covalent bonds between carbon atoms." },
      { id: "d1c2", topic: "Unsaturation", question: "What functional group defines an alkene?", answer: "A carbon-to-carbon double bond (C=C). Its general formula is CnH2n." },
      { id: "d1c3", topic: "Functional Groups", question: "What is the characteristic functional group of an alcohol?", answer: "The hydroxyl group (-OH) covalently bonded to a saturated carbon atom." },
      { id: "d1c4", topic: "Isomerism", question: "What are structural isomers?", answer: "Compounds sharing the identical molecular formula but possessing distinct connectivity layouts." },
      { id: "d1c5", topic: "Esterification", question: "What two classes of chemicals react to form an ester?", answer: "A carboxylic acid and an alcohol, under acid catalyst (typically sulfuric acid)." },
      { id: "d1c6", topic: "Aldehydes vs Ketones", question: "Where is the carbonyl carbon (C=O) situated in an aldehyde vs. a ketone?", answer: "Terminal (end of chain) for aldehydes; internal (middle of chain) for ketones." },
      { id: "d1c7", topic: "Aromaticity", question: "Describe the resonance hybrid structure of Benzene.", answer: "A planar ring of six carbons (C6H6) with fully delocalized pi-electrons, displaying uniform C-C bond lengths." },
      { id: "d1c8", topic: "Nomenclature", question: "What is the IUPAC name for CH3-CH2-CHO?", answer: "Propanal (three carbons, terminal carbonyl)." }
    ]
  },
  {
    id: "deck-2",
    title: "Chemical Equilibrium Essentials",
    description: "Le Chatelier's laws, Kc expression, and equilibrium shifts under pressure/temp.",
    subject: "Chemistry",
    cardCount: 8,
    createdByTeacherId: "teacher-1",
    popularity: 90,
    cards: [
      { id: "d2c1", topic: "Definitions", question: "What occurs during a dynamic chemical equilibrium?", answer: "The rate of the forward reaction equals the rate of the reverse reaction, keeping reactant and product concentrations constant." },
      { id: "d2c2", topic: "Le Chatelier", question: "How does an increase in temperature affect an endothermic equilibrium?", answer: "It shifts the equilibrium toward the product side (to the right) to absorb excess heat." },
      { id: "d2c3", topic: "Pressure shifts", question: "How does increasing volume (decreasing pressure) affect a gaseous equilibrium?", answer: "It shifts the reaction toward the side with the higher number of gas moles." },
      { id: "d2c4", topic: "Catalysts", question: "How does adding a catalyst alter the equilibrium constant Kc?", answer: "It does not alter Kc; it only accelerates the speed at which equilibrium is established." },
      { id: "d2c5", topic: "Kc expression", question: "Write the Kc expression for: aA + bB ⇌ cC + dD", answer: "Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b) using equilibrium concentrations." },
      { id: "d2c6", topic: "Haber process", question: "Write the balanced chemical equation for the Haber process.", answer: "N2(g) + 3H2(g) ⇌ 2NH3(g) (ΔH = -92 kJ/mol)." },
      { id: "d2c7", topic: "Solubility Product", question: "What is Ksp?", answer: "The solubility product constant, measuring the equilibrium between a solid ionic compound and its dissolved ions in a saturated solution." },
      { id: "d2c8", topic: "Q vs K", question: "If the reaction quotient Q is less than Kc, what happens?", answer: "The reaction proceeds forward (right) to create more products until Q equals Kc." }
    ]
  },
  {
    id: "deck-3",
    title: "Plant Vascular Anatomy",
    description: "Xylem vessel transport, phloem sieve tube translocation, and transpiration mechanics.",
    subject: "Biology",
    cardCount: 8,
    createdByTeacherId: "teacher-1",
    popularity: 88,
    cards: [
      { id: "d3c1", topic: "Xylem Cells", question: "Name the two primary conducting cell types in xylem.", answer: "Tracheids and vessel elements. Both are dead at maturity with lignified secondary walls." },
      { id: "d3c2", topic: "Phloem Cells", question: "What are the active conducting structures of phloem tissue?", answer: "Sieve-tube elements, supported metabolic-wise by adjacent companion cells." },
      { id: "d3c3", topic: "Driving Forces", question: "What tension-cohesion mechanism pulls water up xylem columns?", answer: "Transpiration pull, powered by water evaporation from stomatal cavities creating a negative pressure gradient." },
      { id: "d3c4", topic: "Translocation", question: "What is the Pressure Flow Hypothesis of sucrose movement in phloem?", answer: "Active loading of sugar at the source creates high osmotic pressure, drawing water in and pushing sap bulk flow toward the sink." },
      { id: "d3c5", topic: "Stomata", question: "What ions control the opening and closing of guard cells?", answer: "Potassium ions (K+). Active intake of K+ draws water in via osmosis, swelling cells to open the stomatal pore." },
      { id: "d3c6", topic: "Root Pressure", question: "What is guttation and what causes it?", answer: "Exudation of water droplets from leaves caused by root pressure building up on damp, humid nights when transpiration is low." },
      { id: "d3c7", topic: "Lignin", question: "What organic polymer stiffens xylem vessel elements?", answer: "Lignin, which prevents collapse under high negative transpiration pressures." },
      { id: "d3c8", topic: "Pith vs Cortex", question: "In a dicot stem, where are vascular bundles located?", answer: "Arranged in a ring separating the central pith from the outer cortex." }
    ]
  },
  {
    id: "deck-4",
    title: "Cell Division: Mitosis & Meiosis",
    description: "Phase transformations, chromosome behavior, crossing-over, and chromosome counting.",
    subject: "Biology",
    cardCount: 8,
    createdByTeacherId: "teacher-1",
    popularity: 92,
    cards: [
      { id: "d4c1", topic: "Ploidy", question: "How does cell ploidy change after mitosis compared to meiosis in humans?", answer: "Mitosis preserves diploid status (2n ➔ 2n). Meiosis halves ploidy to produce haploid gametes (2n ➔ n)." },
      { id: "d4c2", topic: "Recombination", question: "When and where does crossing-over take place?", answer: "During Prophase I of Meiosis, where homologous chromosomes align closely and form chiasmata structures." },
      { id: "d4c3", topic: "Anaphase difference", question: "What separates during Anaphase of Mitosis vs. Anaphase I of Meiosis?", answer: "Mitosis: sister chromatids separate. Meiosis I: homologous chromosome pairs separate." },
      { id: "d4c4", topic: "Cytokinesis", question: "How does cytokinesis differ in plant vs. animal cells?", answer: "Animals form a contractile ring (cleavage furrow). Plants build a cell plate derived from Golgi vesicles." },
      { id: "d4c5", topic: "Spindle Fibers", question: "What microtubule structure attaches to chromosome centers?", answer: "Spindle fibers attach to protein complexes called kinetochores at the centromere." },
      { id: "d4c6", topic: "Interphase", question: "Identify the sub-phases of Interphase and their tasks.", answer: "G1 (growth), S (DNA replication), G2 (preparation for division)." },
      { id: "d4c7", topic: "Nondisjunction", question: "What is chromosomal nondisjunction?", answer: "The failure of chromosomes or chromatids to separate properly during anaphase, causing aneuploid gametes." },
      { id: "d4c8", topic: "Independent Assortment", question: "State Mendel's Law of Independent Assortment in terms of meiosis.", answer: "The random orientation of homologous pairs at the metaphase plate during Metaphase I, distributing maternal/paternal chromosomes independently." }
    ]
  },
  {
    id: "deck-5",
    title: "Newton's Laws of Motion",
    description: "Inertia, force equations, normal force, friction, and tension mechanics.",
    subject: "Physics",
    cardCount: 8,
    createdByTeacherId: "teacher-2",
    popularity: 95,
    cards: [
      { id: "d5c1", topic: "First Law", question: "Define Newton's First Law (Law of Inertia).", answer: "An object remains at rest or moves with uniform velocity unless acted upon by a net external force." },
      { id: "d5c2", topic: "Second Law", question: "State the mathematical formula of the Second Law.", answer: "F_net = m * a (Net Force vector equals mass multiplied by acceleration vector)." },
      { id: "d5c3", topic: "Third Law", question: "Explain the action-reaction principle.", answer: "For every force exerted on body B by body A, body B simultaneously exerts an equal and opposite force on body A." },
      { id: "d5c4", topic: "Friction Formula", question: "What is the formula for maximum static friction?", answer: "f_s_max = μ_s * F_N, where μ_s is coefficient of static friction, and F_N is normal force." },
      { id: "d5c5", topic: "Apparent Weight", question: "What is the apparent weight of a person in an elevator accelerating upward at 'a'?", answer: "W_apparent = m * (g + a). The scale pushes upward with more normal force." },
      { id: "d5c6", topic: "Equilibrium", question: "What condition defines translational equilibrium?", answer: "The vector sum of all forces acting on the particle is zero, resulting in zero acceleration." },
      { id: "d5c7", topic: "Terminal Velocity", question: "What balance characterizes terminal velocity in air resistance?", answer: "Downward gravitational force equals the upward air drag force, meaning net force is zero and acceleration ceases." },
      { id: "d5c8", topic: "Tension", question: "Is tension in a massless ideal string uniform throughout?", answer: "Yes, the tension magnitude remains identical at every point along an ideal massless string." }
    ]
  },
  {
    id: "deck-6",
    title: "Electromagnetism: Faraday's Law",
    description: "Magnetic flux, Lenz's law of opposing change, and generator principles.",
    subject: "Physics",
    cardCount: 8,
    createdByTeacherId: "teacher-2",
    popularity: 91,
    cards: [
      { id: "d6c1", topic: "Flux", question: "Write the formula for magnetic flux.", answer: "Φ = B * A * cos(θ), where B is magnetic field, A is surface area, and θ is angle to the surface normal." },
      { id: "d6c2", topic: "Faraday's Law", question: "State Faraday's Law of Induction.", answer: "The induced electromotive force (EMF) in a closed loop is equal to the negative rate of change of magnetic flux through the loop." },
      { id: "d6c3", topic: "Lenz's Law", question: "What is the fundamental physics conservation rule behind Lenz's Law?", answer: "Conservation of Energy. Induced currents generate fields that oppose the flux change that created them." },
      { id: "d6c4", topic: "EMF Units", question: "What is the SI unit of electromotive force?", answer: "The Volt (V), representing energy per unit charge." },
      { id: "d6c5", topic: "Self-Induction", question: "What is self-induction?", answer: "The process where a changing current in a circuit induces an opposing EMF within that same circuit." },
      { id: "d6c6", topic: "Eddy Currents", question: "Define eddy currents.", answer: "Swirling loops of electric current induced within solid metallic conductors by a changing magnetic field." },
      { id: "d6c7", topic: "Transformers", question: "What principle underlies AC transformer operation?", answer: "Mutual induction between a primary coil and a secondary coil linked by a magnetic core." },
      { id: "d6c8", topic: "Solenoid", question: "What is the magnetic field inside an ideal solenoid?", answer: "B = μ0 * n * I, where n is number of turns per unit length and I is current." }
    ]
  },
  {
    id: "deck-7",
    title: "Limits & Continuous Functions",
    description: "Limit existence proofs, epsilon-delta mechanics, and continuity criteria.",
    subject: "Mathematics",
    cardCount: 8,
    createdByTeacherId: "teacher-2",
    popularity: 94,
    cards: [
      { id: "d7c1", topic: "Limit Definition", question: "What formal condition establishes: lim(x➔c) f(x) = L?", answer: "For every ε > 0, there exists a δ > 0 such that if 0 < |x - c| < δ, then |f(x) - L| < ε." },
      { id: "d7c2", topic: "Continuity", question: "State the three conditions required for a function f(x) to be continuous at x = c.", answer: "1) f(c) is defined; 2) lim(x➔c) f(x) exists; 3) lim(x➔c) f(x) = f(c)." },
      { id: "d7c3", topic: "Indeterminate", question: "List three common indeterminate forms.", answer: "0/0, ∞/∞, 0 * ∞, and 1^∞." },
      { id: "d7c4", topic: "Squeeze Theorem", question: "Explain the Squeeze (Sandwich) Theorem.", answer: "If g(x) ≤ f(x) ≤ h(x) and lim(x➔c) g(x) = lim(x➔c) h(x) = L, then lim(x➔c) f(x) must also equal L." },
      { id: "d7c5", topic: "Asymptotes", question: "How is a vertical asymptote at x = c mathematically defined?", answer: "If either lim(x➔c+) f(x) or lim(x➔c-) f(x) equals +∞ or -∞." },
      { id: "d7c6", topic: "IVT", question: "State the Intermediate Value Theorem.", answer: "If f is continuous on [a, b], then for any value N between f(a) and f(b), there exists a 'c' in (a, b) such that f(c) = N." },
      { id: "d7c7", topic: "L'Hopital", question: "When is L'Hôpital's rule valid?", answer: "When evaluating lim(x➔c) f(x)/g(x) which yields 0/0 or ±∞/±∞, and derivatives exist near c with g'(x) ≠ 0." },
      { id: "d7c8", topic: "Infinite Limit", question: "Evaluate: lim(x➔∞) (2x^2 + 3) / (5x^2 - x)", answer: "2/5 (divide numerator and denominator by x^2)." }
    ]
  },
  {
    id: "deck-8",
    title: "Differential Calculus: Derivations",
    description: "Power rule, product rule, quotient rule, chain rule, and tangent definitions.",
    subject: "Mathematics",
    cardCount: 8,
    createdByTeacherId: "teacher-2",
    popularity: 97,
    cards: [
      { id: "d8c1", topic: "Definition", question: "What is the limit definition of a derivative f'(x)?", answer: "f'(x) = lim(h➔0) [f(x + h) - f(x)] / h." },
      { id: "d8c2", topic: "Power Rule", question: "What is the derivative of x^n with respect to x?", answer: "d/dx [x^n] = n * x^(n-1) for any real number n." },
      { id: "d8c3", topic: "Product Rule", question: "State the Product Rule for d/dx [f(x) * g(x)].", answer: "f'(x)g(x) + f(x)g'(x)." },
      { id: "d8c4", topic: "Quotient Rule", question: "State the Quotient Rule for d/dx [f(x) / g(x)].", answer: "[f'(x)g(x) - f(x)g'(x)] / [g(x)]^2." },
      { id: "d8c5", topic: "Chain Rule", question: "State the Chain Rule for composite function d/dx [f(g(x))].", answer: "f'(g(x)) * g'(x)." },
      { id: "d8c6", topic: "Trig Derivatives", question: "What are the derivatives of sin(x) and cos(x)?", answer: "d/dx [sin(x)] = cos(x). d/dx [cos(x)] = -sin(x)." },
      { id: "d8c7", topic: "Normal Line", question: "What is the slope of the normal line to a curve at a point where the tangent slope is m (m ≠ 0)?", answer: "-1/m (negative reciprocal slope)." },
      { id: "d8c8", topic: "Implicit", question: "What is implicit differentiation?", answer: "Differentiating both sides of an equation with respect to x, treating y as a function of x, and using the chain rule to solve for dy/dx." }
    ]
  },
  {
    id: "deck-9",
    title: "East African History: Pre-Colonial Era",
    description: "The Buganda Kingdom structures, Luo migrations, and Indian Ocean coastal trade.",
    subject: "History",
    cardCount: 8,
    createdByTeacherId: "teacher-3",
    popularity: 85,
    cards: [
      { id: "d9c1", topic: "Buganda", question: "Who was the Kabaka in the traditional pre-colonial Buganda structure?", answer: "The supreme monarch holding executive, legislative, and military control, supported by a Lukiko (council of chiefs)." },
      { id: "d9c2", topic: "Luo Migrations", question: "What drove the Luo migration from the southern Sudan region between the 14th and 17th centuries?", answer: "Overpopulation, drought, conflicts, and search for fertile pastures along water courses." },
      { id: "d9c3", topic: "Indian Ocean", question: "What was the role of monsoon winds in the Indian Ocean Swahili coast trade?", answer: "They blew southwest from November to February facilitating dhow trade from Arabia, and northeast from April to September returning them." },
      { id: "d9c4", topic: "Chwezi", question: "Who were the Bachwezi in regional folklore?", answer: "A legendary dynasty credited with introducing long-horned cattle, ironworking, and centralized state organization in western Uganda." },
      { id: "d9c5", topic: "Caravan Trade", question: "What were the primary exports from the East African interior during the 19th-century caravan trade?", answer: "Ivory and slaves, traded primarily with coastal Swahili and Arab merchants." },
      { id: "d9c6", topic: "Long Distance", question: "Which tribe in central Tanzania was renowned as expert organizers of long-distance caravan trade?", answer: "The Nyamwezi." },
      { id: "d9c7", topic: "Seyyid Said", question: "Why did Sultan Seyyid Said shift his capital from Muscat to Zanzibar in 1840?", answer: "To establish closer control over the highly profitable clove plantations and mainland caravan routes." },
      { id: "d9c8", topic: "Bunyoro-Kitara", question: "What military organization made Bunyoro-Kitara strong under Kabalega?", answer: "The 'Abarusura', a well-trained standing army armed with guns." }
    ]
  },
  {
    id: "deck-10",
    title: "The Road to Ugandan Independence",
    description: "The Buganda Agreements, political parties rise (UNC, DP, UPC), and the 1962 Constitution.",
    subject: "History",
    cardCount: 8,
    createdByTeacherId: "teacher-3",
    popularity: 89,
    cards: [
      { id: "d10c1", topic: "1900 Agreement", question: "What did the Buganda Agreement of 1900 impose on land ownership?", answer: "It carved up land into Crown Land (British government) and Mailo Land (private estates for chiefs and royalty)." },
      { id: "d10c2", topic: "First Party", question: "What was the first national political party formed in Uganda and who led it?", answer: "The Uganda National Congress (UNC), formed in 1952 by Ignatius Kangave Musaazi." },
      { id: "d10c3", topic: "Kabaka Crisis", question: "Why did Governor Andrew Cohen deport Kabaka Mutesa II in 1953?", answer: "Mutesa II demanded Buganda's separation from the rest of Uganda and opposed inclusion in an East African Federation." },
      { id: "d10c4", topic: "Namirembe", question: "What treaty resolved the deportation crisis allowing Mutesa's return?", answer: "The Namirembe Agreement of 1954, which turned Buganda into a constitutional monarchy under colonial framework." },
      { id: "d10c5", topic: "1961 Elections", question: "Which party won the 1961 self-government elections, leading to Benedict Kiwanuka becoming Prime Minister?", answer: "The Democratic Party (DP)." },
      { id: "d10c6", topic: "UPC-KY Alliance", question: "What political alliance formed the first post-independence government?", answer: "The alliance between Milton Obote's Uganda People's Congress (UPC) and the Buganda royalist Kabaka Yekka (KY) party." },
      { id: "d10c7", topic: "Independence Date", question: "On what date did Uganda officially attain independence from Great Britain?", answer: "October 9, 1962." },
      { id: "d10c8", topic: "First President", question: "Who served as Uganda's first ceremonial President in 1963?", answer: "Kabaka Sir Edward Mutesa II." }
    ]
  },
  {
    id: "deck-11",
    title: "Shakespeare's Hamlet & Macbeth Themes",
    description: "Hamartia (tragic flaw), soliloquies, dramatic irony, and thematic patterns.",
    subject: "English Literature",
    cardCount: 8,
    createdByTeacherId: "teacher-4",
    popularity: 91,
    cards: [
      { id: "d11c1", topic: "Hamartia", question: "Define 'Hamartia' in Elizabethan tragedies.", answer: "The internal fatal flaw of a noble protagonist leading to their inevitable structural downfall." },
      { id: "d11c2", topic: "Macbeth Flaw", question: "What is Macbeth's hamartia?", answer: "Vaulting ambition, which ignores moral limits and is fueled by the witches' prophecy." },
      { id: "d11c3", topic: "Hamlet Delay", question: "What defines Hamlet's core psychological struggle?", answer: "Procrastination and intellectual paralysis: his over-analysis delays the act of revenging his father's murder." },
      { id: "d11c4", topic: "Soliloquy", question: "What is the structural function of a soliloquy?", answer: "To allow characters to voice private inner thoughts directly to the audience, bypassing other characters." },
      { id: "d11c5", topic: "Macbeth Motifs", question: "What does Lady Macbeth's compulsive hand-washing represent?", answer: "Psychological guilt and moral contamination ('Out, damned spot! out, I say!')." },
      { id: "d11c6", topic: "Hamlet Ghost", question: "What warning does Hamlet's father's ghost deliver regarding Gertrude?", answer: "To leave her to heaven and to her own inner thorns of conscience." },
      { id: "d11c7", topic: "Equivocation", question: "What is 'equivocation' in Macbeth?", answer: "Language that says two things at once to deceive, practiced by the witches ('None of woman born shall harm Macbeth')." },
      { id: "d11c8", topic: "The Play", question: "What is the purpose of the play-within-the-play 'The Murder of Gonzago' in Hamlet?", answer: "'The play's the thing wherein I'll catch the conscience of the King' (testing Claudius's guilt)." }
    ]
  },
  {
    id: "deck-12",
    title: "Literary Devices & Rhetoric Tools",
    description: "Master metonymy, synecdoche, zeugma, anaphora, and litotes with literature examples.",
    subject: "English Literature",
    cardCount: 8,
    createdByTeacherId: "teacher-4",
    popularity: 86,
    cards: [
      { id: "d12c1", topic: "Synecdoche", question: "What is Synecdoche?", answer: "A literary device where a part of something represents the whole (e.g., 'Check out my new wheels', where wheels means car)." },
      { id: "d12c2", topic: "Metonymy", question: "How does Metonymy differ from Synecdoche?", answer: "Metonymy replaces the subject name with something closely associated but not a literal physical part (e.g., 'The Crown', meaning the monarch)." },
      { id: "d12c3", topic: "Zeugma", question: "Define Zeugma with a structural example.", answer: "Using one single word (usually a verb) to control two separate words in different senses (e.g., 'He broke her heart and his lease')." },
      { id: "d12c4", topic: "Anaphora", question: "What is Anaphora?", answer: "The deliberate repetition of a word or phrase at the beginning of successive sentences or clauses." },
      { id: "d12c5", topic: "Litotes", question: "Define Litotes.", answer: "An ironic understatement created by negating its opposite (e.g., saying 'She is no amateur' to indicate she is highly skilled)." },
      { id: "d12c6", topic: "Oxymoron", question: "What is an oxymoron?", answer: "A self-contradicting phrase pairing two opposite words (e.g., 'heavy lightness', 'loving hate')." },
      { id: "d12c7", topic: "Chiasmus", question: "What is a chiasmus structure?", answer: "A rhetorical figure where words or concepts are repeated in reverse grammatical order (e.g., 'Fair is foul, and foul is fair')." },
      { id: "d12c8", topic: "Apostrophe", question: "Define Apostrophe as a literary device.", answer: "An address to an absent person, an abstract concept, or an inanimate object as if they were present and capable of responding." }
    ]
  },
  {
    id: "deck-13",
    title: "AP French: Travel & Subjunctive",
    description: "Common conjugation patterns for subjunctive triggers (WEIRDOS in French) & transit vocab.",
    subject: "French",
    cardCount: 8,
    createdByTeacherId: "teacher-5",
    popularity: 80,
    cards: [
      { id: "d13c1", topic: "Subjunctive", question: "What phrase triggers subjunctive: 'Je pense que' or 'Il faut que'?", answer: "'Il faut que' (necessity/obligation). 'Je pense que' triggers indicative because it denotes belief." },
      { id: "d13c2", topic: "Conjugation", question: "What is the subjunctive form of 'être' for the 'nous' form?", answer: "Que nous soyons." },
      { id: "d13c3", topic: "Conjugation", question: "What is the subjunctive form of 'avoir' for the 'ils/elles' form?", answer: "Qu'ils/elles aient." },
      { id: "d13c4", topic: "Directions", question: "How do you politely ask 'Where is the nearest currency exchange office?'", answer: "Où se trouve le bureau de change le plus proche, s'il vous plaît ?" },
      { id: "d13c5", topic: "Luggage", question: "Translate 'lost baggage service' into French.", answer: "Le service des bagages perdus." },
      { id: "d13c6", topic: "Transit", question: "How do you translate 'one-way ticket' vs. 'round-trip ticket'?", answer: "Un billet aller simple vs. Un billet aller-retour." },
      { id: "d13c7", topic: "Conditionnel", question: "How do you politely say 'I would like to book a flight'?", answer: "Je voudrais réserver un vol." },
      { id: "d13c8", topic: "Expressions", question: "What does 'Faire la grasse matinée' mean literally and idiomatically?", answer: "Literally: 'To make the fat morning.' Idiomatically: To sleep in late." }
    ]
  },
  {
    id: "deck-14",
    title: "Luganda Grammar: Noun Classes",
    description: "Study the intricate Bantu noun class systems (Mu-Ba, Ki-Bi) and subject concord markers.",
    subject: "Luganda",
    cardCount: 8,
    createdByTeacherId: "teacher-5",
    popularity: 78,
    cards: [
      { id: "d14c1", topic: "Class 1 & 2", question: "What do the 'Mu-Ba' (Class I & II) prefixes represent?", answer: "Human beings in singular (Mu-) and plural (Ba-) forms, e.g., Omuntu (person) and Abantu (people)." },
      { id: "d14c2", topic: "Class 7 & 8", question: "Describe Noun Class Ki-Bi prefix usage with examples.", answer: "Generally represents inanimate objects, tools, or physical things, e.g., Ekitabo (book) and Ebitabo (books)." },
      { id: "d14c3", topic: "Subject Concord", question: "If the subject is 'Abasomesa' (teachers, Class II), what is the matching verb prefix?", answer: "Ba- (e.g. Abasomesa basoma - The teachers are reading)." },
      { id: "d14c4", topic: "Greetings", question: "What is the respectful greeting to an elder in Luganda (singular)?", answer: "Gyebaleko (Well done) or Wasuze otyanno (How did you sleep?)." },
      { id: "d14c5", topic: "Plurals", question: "What is the plural of 'Omwana' (child)?", answer: "Abaana (children)." },
      { id: "d14c6", topic: "Class 3 & 4", question: "What prefixes characterize Class 3 & 4 (trees, natural objects)?", answer: "Mu-Mi, e.g., Omuti (tree) and Emiti (trees)." },
      { id: "d14c7", topic: "Verbs", question: "What does the verb root '-kola' mean?", answer: "To work, make, or do." },
      { id: "d14c8", topic: "Possessives", question: "How do you translate 'my book' in Luganda?", answer: "Ekitabo kyange." }
    ]
  },
  {
    id: "deck-15",
    title: "Basic Microeconomics: Demand Shifts",
    description: "Determinants of demand shifts, movements along the curve, and market equilibrium.",
    subject: "Economics",
    cardCount: 8,
    createdByTeacherId: "teacher-2",
    popularity: 88,
    cards: [
      { id: "d15c1", topic: "Demand Law", question: "State the Law of Demand.", answer: "All else equal, as the price of a product increases, the quantity demanded decreases (inverse relationship)." },
      { id: "d15c2", topic: "Movement", question: "What is the sole factor that causes a movement along a demand curve?", answer: "A change in the price of the good itself." },
      { id: "d15c3", topic: "Shifters", question: "List three non-price determinants that shift the demand curve.", answer: "Consumer income, consumer preferences, prices of substitute/complementary goods, and buyer expectations." },
      { id: "d15c4", topic: "Substitutes", question: "If the price of Tea increases, what happens to the demand for Coffee (a substitute)?", answer: "The demand for Coffee shifts to the right (increases)." },
      { id: "d15c5", topic: "Normal vs Inferior", question: "What happens to the demand for an inferior good as consumer income rises?", answer: "Demand decreases, shifting the demand curve to the left." },
      { id: "d15c6", topic: "Equilibrium", question: "What defines market equilibrium?", answer: "The state where quantity demanded equals quantity supplied, leaving no tendency for the price to change." },
      { id: "d15c7", topic: "Shortage", question: "When does a market shortage occur?", answer: "When the market price is set below the equilibrium price, causing quantity demanded to exceed quantity supplied." },
      { id: "d15c8", topic: "Surplus", question: "What is consumer surplus?", answer: "The difference between the maximum price a consumer is willing to pay and the market price they actually pay." }
    ]
  },
  {
    id: "deck-16",
    title: "Cellular Respiration Pathways",
    description: "Glycolysis, Krebs cycle, electron transport chain, and ATP budget yield.",
    subject: "Biology",
    cardCount: 8,
    createdByTeacherId: "teacher-1",
    popularity: 84,
    cards: [
      { id: "d16c1", topic: "Glycolysis Location", question: "Where in the cell does Glycolysis occur and does it require oxygen?", answer: "In the cytosol (cytoplasm); it is anaerobic (does not require oxygen)." },
      { id: "d16c2", topic: "Glycolysis Output", question: "What is the net gain of ATP and NADH per glucose molecule in glycolysis?", answer: "Net gain of 2 ATP and 2 NADH molecules." },
      { id: "d16c3", topic: "Krebs Location", question: "Where does the Krebs Cycle (Citric Acid Cycle) take place?", answer: "In the matrix of the mitochondria." },
      { id: "d16c4", topic: "Acetyl CoA", question: "What intermediate compound links glycolysis to the Krebs cycle?", answer: "Acetyl Coenzyme A (Acetyl CoA), formed by pyruvate decarboxylation." },
      { id: "d16c5", topic: "Krebs Output", question: "What does one turn of the Krebs cycle produce?", answer: "1 ATP (or GTP), 3 NADH, 1 FADH2, and 2 CO2 molecules." },
      { id: "d16c6", topic: "ETC", question: "Where are the electron transport chain proteins situated?", answer: "Embedded within the inner mitochondrial membrane (cristae)." },
      { id: "d16c7", topic: "Final Acceptor", question: "What is the final electron acceptor in aerobic respiration?", answer: "Oxygen (O2), which combines with protons to form water (H2O)." },
      { id: "d16c8", topic: "ATP Synthase", question: "What driving force powers ATP Synthase to generate ATP?", answer: "The proton-motive force (H+ electrochemical gradient) across the inner membrane." }
    ]
  },
  {
    id: "deck-17",
    title: "Soil Science & Geog Processes",
    description: "Soil horizons, weathering mechanisms, and erosion control practices.",
    subject: "Geography",
    cardCount: 8,
    createdByTeacherId: "teacher-3",
    popularity: 82,
    cards: [
      { id: "d17c1", topic: "Horizons", question: "What characterizes the O Horizon of a soil profile?", answer: "The organic layer composed of leaf litter, plant fibers, and decomposing organic matter." },
      { id: "d17c2", topic: "Leaching", question: "What is the E Horizon in soil profiles?", answer: "The eluvial (leached) layer, depleted of silicate clay, iron, or aluminum, usually light-colored." },
      { id: "d17c3", topic: "Physical Weathering", question: "What is frost wedging?", answer: "A physical weathering process where water enters cracks, freezes, expands by ~9%, and wedges the rock apart." },
      { id: "d17c4", topic: "Chemical Weathering", question: "How does carbonation weather limestone?", answer: "Rainwater absorbs atmospheric carbon dioxide to form weak carbonic acid, which dissolves calcite mineral in limestone." },
      { id: "d17c5", topic: "Erosion Control", question: "What is contour plowing?", answer: "Plowing along lines of equal elevation to create ridges that slow water runoff and prevent rill erosion." },
      { id: "d17c6", topic: "Humus", question: "Define humus.", answer: "Dark, fully decomposed organic material that improves soil structure, moisture retention, and nutrient capacity." },
      { id: "d17c7", topic: "Laterization", question: "What is laterization in tropical soils?", answer: "Intense leaching of silica leaving highly oxidized soils rich in iron and aluminum, common in warm, humid tropics." },
      { id: "d17c8", topic: "Texture Tri", question: "What three particles define soil texture?", answer: "Sand (coarse), silt (medium), and clay (very fine)." }
    ]
  },
  {
    id: "deck-18",
    title: "Electrochemistry: Galvanic Cells",
    description: "Anode vs cathode, salt bridge roles, standard cell potentials, and cell diagrams.",
    subject: "Chemistry",
    cardCount: 8,
    createdByTeacherId: "teacher-1",
    popularity: 87,
    cards: [
      { id: "d18c1", topic: "Mnemonics", question: "Explain the mnemonics AN OX and RED CAT.", answer: "AN OX: Oxidation occurs at the Anode. RED CAT: Reduction occurs at the Cathode." },
      { id: "d18c2", topic: "Salt Bridge", question: "What is the primary function of a salt bridge in a galvanic cell?", answer: "To maintain electrical neutrality by allowing ions to migrate between half-cells, preventing polarization." },
      { id: "d18c3", topic: "Cell Potential", question: "How is the standard cell potential (E°_cell) calculated?", answer: "E°_cell = E°_cathode (reduction) - E°_anode (reduction potential)." },
      { id: "d18c4", topic: "Spontaneity", question: "What sign of E°_cell indicates a spontaneous galvanic process?", answer: "A positive potential (+E°_cell), which corresponds to a negative Gibbs free energy change (-ΔG)." },
      { id: "d18c5", topic: "Diagram", question: "Interpret this cell notation: Zn(s) | Zn2+(aq) || Cu2+(aq) | Cu(s)", answer: "Zn anode is oxidized to Zn2+ (left). Double lines represent salt bridge. Cu2+ is reduced to Cu cathode (right)." },
      { id: "d18c6", topic: "Reference", question: "What half-cell is used as the standard reference for all reduction potentials?", answer: "The Standard Hydrogen Electrode (SHE), assigned a potential of exactly 0.00 V." },
      { id: "d18c7", topic: "Nernst", question: "What is the Nernst Equation used for?", answer: "To calculate cell potential under non-standard concentrations and temperatures." },
      { id: "d18c8", topic: "Electrolysis", question: "How does an electrolytic cell differ from a galvanic cell?", answer: "An electrolytic cell uses an external electrical source to drive a non-spontaneous chemical reaction." }
    ]
  },
  {
    id: "deck-19",
    title: "Sequences, Series & AP/GP",
    description: "Arithmetic progressions, geometric progressions, convergence rules, and sum limits.",
    subject: "Mathematics",
    cardCount: 8,
    createdByTeacherId: "teacher-2",
    popularity: 93,
    cards: [
      { id: "d19c1", topic: "AP Term", question: "Write the formula for the n-th term of an Arithmetic Progression.", answer: "u_n = a + (n - 1) * d, where a is the first term and d is the common difference." },
      { id: "d19c2", topic: "AP Sum", question: "Write the sum formula for the first n terms of an AP.", answer: "S_n = (n/2) * [2a + (n - 1)*d] or S_n = (n/2) * (a + u_n)." },
      { id: "d19c3", topic: "GP Term", question: "Write the n-th term of a Geometric Progression.", answer: "u_n = a * r^(n-1), where r is the common ratio." },
      { id: "d19c4", topic: "GP Sum", question: "Write the sum of the first n terms of a GP (r ≠ 1).", answer: "S_n = a * (1 - r^n) / (1 - r)." },
      { id: "d19c5", topic: "Sum to Infinity", question: "Under what conditions does an infinite GP converge, and what is its sum?", answer: "Converges if the absolute value of common ratio is less than 1 (|r| < 1). The sum is S_∞ = a / (1 - r)." },
      { id: "d19c6", topic: "Arithmetic Mean", question: "What is the arithmetic mean between two numbers A and B?", answer: "(A + B) / 2." },
      { id: "d19c7", topic: "Geometric Mean", question: "What is the geometric mean of positive numbers A and B?", answer: "Square root of (A * B)." },
      { id: "d19c8", topic: "Sigma Notation", question: "What does Σ (i=1 to n) i represent?", answer: "The sum of the first n positive integers: n * (n + 1) / 2." }
    ]
  },
  {
    id: "deck-20",
    title: "Luganda Orthography rules",
    description: "Vowel lengthening rules, consonant gemination, and grammar orthography rules.",
    subject: "Luganda",
    cardCount: 8,
    createdByTeacherId: "teacher-5",
    popularity: 75,
    cards: [
      { id: "d20c1", topic: "Vowels", question: "How many vowels does the Luganda language possess?", answer: "Five basic vowels: a, e, i, o, u." },
      { id: "d20c2", topic: "Gemination", question: "What does double consonants (e.g. 'kk' in okukola) indicate?", answer: "A geminate or lengthened consonant sound, which can completely change word meaning." },
      { id: "d20c3", topic: "Y & W Rules", question: "When do vowels lengthen before 'y' and 'w'?", answer: "Vowels are lengthened when followed by 'y' or 'w' inside root words, e.g., 'mwa' or 'bya'." },
      { id: "d20c4", topic: "Tone", question: "Is Luganda a tonal language?", answer: "Yes, pitch and tone determine grammatical tense and distinguish homographs." },
      { id: "d20c5", topic: "Alphabet", question: "What is unique about the letter 'ŋ' in the Luganda alphabet?", answer: "It represents the velar nasal sound (like 'ng' in 'sing') and is treated as a single letter." },
      { id: "d20c6", topic: "Initial Vowel", question: "What is the 'Omu-ba' initial pre-prefix vowel called?", answer: "The 'augment' or initial vowel, which is omitted in negative or general statements." },
      { id: "d20c7", topic: "Syllables", question: "What is the standard structure of a Luganda syllable?", answer: "Typically open syllables, ending with a vowel (CV or V)." },
      { id: "d20c8", topic: "Luganda Name", question: "How is the Luganda language natively spelled in orthography?", answer: "Oluganda." }
    ]
  }
];

// ----------------------------------------------------
// 12. INVOICES & TUITION FEES WITH PAYMENT METHODS & FULL BALANCE RECORDS
// ----------------------------------------------------
export const mockInvoices: Invoice[] = [
  { id: "inv-1", studentId: "student-1", studentName: "Liam Sekamate", studentClass: "Senior 5", amount: 1800000, description: "Senior 5 Term II Boarding & Tuition Fees", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-15", paymentMethod: "Bank Transfer", receiptNumber: "REC-2026-8041" },
  { id: "inv-2", studentId: "student-2", studentName: "Clara Sekamate", studentClass: "Senior 4", amount: 1800000, description: "Senior 4 Term II Boarding & Tuition Fees", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-15", paymentMethod: "Mobile Money", receiptNumber: "REC-2026-8042" },
  
  { id: "inv-3", studentId: "student-3", studentName: "Zahra Babirye", studentClass: "Senior 5", amount: 1350000, description: "Senior 5 Term II Partial Tuition", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-28", paymentMethod: "Bank Transfer", receiptNumber: "REC-2026-8104" },
  { id: "inv-4", studentId: "student-3", studentName: "Zahra Babirye", studentClass: "Senior 5", amount: 450000, description: "Senior 5 Term II Tuition Balance", status: "Pending", dueDate: "2026-10-15" },
  
  { id: "inv-5", studentId: "student-4", studentName: "Ethan Kato", studentClass: "Senior 5", amount: 1800000, description: "Senior 5 Term II Boarding & Tuition Fees", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-25", paymentMethod: "Cash", receiptNumber: "REC-2026-8099" },
  
  { id: "inv-6", studentId: "student-5", studentName: "Lamech Odongo", studentClass: "Senior 4", amount: 950000, description: "Senior 4 Term II Partial Tuition Deposit", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-09-02", paymentMethod: "Mobile Money", receiptNumber: "REC-2026-8201" },
  { id: "inv-7", studentId: "student-5", studentName: "Lamech Odongo", studentClass: "Senior 4", amount: 850000, description: "Senior 4 Term II Tuition Outstanding Balance", status: "Overdue", dueDate: "2026-09-15" },
  
  { id: "inv-8", studentId: "student-6", studentName: "Kiprotich Chelangat", studentClass: "Senior 6", amount: 1950000, description: "Senior 6 Term II Boarding & Lab Fees", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-20", paymentMethod: "Bank Transfer", receiptNumber: "REC-2026-8011" },
  { id: "inv-9", studentId: "student-7", studentName: "Mercy Chebet", studentClass: "Senior 4", amount: 1800000, description: "Senior 4 Term II Tuition Fees", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-20", paymentMethod: "Mobile Money", receiptNumber: "REC-2026-8012" },
  
  { id: "inv-10", studentId: "student-8", studentName: "Kizza Ssebunya", studentClass: "Senior 5", amount: 1300000, description: "Senior 5 Term II Basic Tuition Deposit", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-25", paymentMethod: "Cash", receiptNumber: "REC-2026-8199" },
  { id: "inv-11", studentId: "student-8", studentName: "Kizza Ssebunya", studentClass: "Senior 5", amount: 500000, description: "Senior 5 Term II Boarding Amenity Balance", status: "Pending", dueDate: "2026-10-15" },
  
  { id: "inv-12", studentId: "student-9", studentName: "Nsubuga Ssebunya", studentClass: "Senior 4", amount: 1300000, description: "Senior 4 Term II Basic Tuition Deposit", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-25", paymentMethod: "Mobile Money", receiptNumber: "REC-2026-8200" },
  { id: "inv-13", studentId: "student-9", studentName: "Nsubuga Ssebunya", studentClass: "Senior 4", amount: 500000, description: "Senior 4 Term II Balance", status: "Pending", dueDate: "2026-10-15" },
  
  { id: "inv-14", studentId: "student-10", studentName: "Sanyu Ssebunya", studentClass: "Senior 6", amount: 1950000, description: "Senior 6 Term II Boarding & Tuition Fees", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-24", paymentMethod: "Bank Transfer", receiptNumber: "REC-2026-8025" },
  
  { id: "inv-15", studentId: "student-11", studentName: "Derrick Atwine", studentClass: "Senior 6", amount: 1000000, description: "Senior 6 Term II Basic Tuition", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-29", paymentMethod: "Cash", receiptNumber: "REC-2026-8302" },
  { id: "inv-16", studentId: "student-11", studentName: "Derrick Atwine", studentClass: "Senior 6", amount: 950000, description: "Senior 6 Term II Laboratory Fee Balance", status: "Overdue", dueDate: "2026-09-18" },
  
  { id: "inv-17", studentId: "student-12", studentName: "Angel Atwine", studentClass: "Senior 4", amount: 850000, description: "Senior 4 Term II Tuition Partial", status: "Paid", dueDate: "2026-09-01", paidDate: "2026-08-29", paymentMethod: "Mobile Money", receiptNumber: "REC-2026-8303" },
  { id: "inv-18", studentId: "student-12", studentName: "Angel Atwine", studentClass: "Senior 4", amount: 950000, description: "Senior 4 Term II Boarding & Resource Balance", status: "Overdue", dueDate: "2026-09-18" }
];

// ----------------------------------------------------
// 13. ATTENDANCE HISTORY (30 DAYS PER STUDENT)
// ----------------------------------------------------
export const mockAttendance: AttendanceRecord[] = [
  // student-1 (Liam) anomalies
  { id: "att-1", studentId: "student-1", studentName: "Liam Sekamate", date: "2026-09-24", status: "Late", className: "Senior 6 Pure Math" },
  // student-2 (Clara) anomalies
  { id: "att-2", studentId: "student-2", studentName: "Clara Sekamate", date: "2026-09-20", status: "Late", className: "Senior 4 Chem" },
  { id: "att-3", studentId: "student-2", studentName: "Clara Sekamate", date: "2026-09-12", status: "Absent", className: "Senior 4 Applied Math" },
  // student-3 (Zahra) anomalies
  { id: "att-4", studentId: "student-3", studentName: "Zahra Babirye", date: "2026-09-18", status: "Late", className: "Senior 5 Bio" },
  // student-4 (Ethan) anomalies
  { id: "att-5", studentId: "student-4", studentName: "Ethan Kato", date: "2026-10-02", status: "Absent", className: "Senior 5 Bio" },
  { id: "att-6", studentId: "student-4", studentName: "Ethan Kato", date: "2026-09-28", status: "Absent", className: "Senior 5 Physics" },
  { id: "att-7", studentId: "student-4", studentName: "Ethan Kato", date: "2026-09-20", status: "Late", className: "Senior 5 Geog" },
  // student-5 (Lamech) anomalies
  { id: "att-8", studentId: "student-5", studentName: "Lamech Odongo", date: "2026-10-05", status: "Absent", className: "Senior 4 Chem" },
  { id: "att-9", studentId: "student-5", studentName: "Lamech Odongo", date: "2026-10-02", status: "Absent", className: "Senior 4 Applied Math" },
  { id: "att-10", studentId: "student-5", studentName: "Lamech Odongo", date: "2026-09-28", status: "Late", className: "Senior 4 East African History" },
  { id: "att-11", studentId: "student-5", studentName: "Lamech Odongo", date: "2026-09-20", status: "Absent", className: "Senior 4 Chem" },
  { id: "att-12", studentId: "student-5", studentName: "Lamech Odongo", date: "2026-09-15", status: "Absent", className: "Senior 4 Applied Math" },
  // student-12 (Angel) anomalies
  { id: "att-13", studentId: "student-12", studentName: "Angel Atwine", date: "2026-10-05", status: "Absent", className: "Senior 4 Chem" },
  { id: "att-14", studentId: "student-12", studentName: "Angel Atwine", date: "2026-10-01", status: "Absent", className: "Senior 4 French" },
  { id: "att-15", studentId: "student-12", studentName: "Angel Atwine", date: "2026-09-25", status: "Late", className: "Senior 4 Applied Math" },
  { id: "att-16", studentId: "student-12", studentName: "Angel Atwine", date: "2026-09-18", status: "Absent", className: "Senior 4 French" },
  { id: "att-17", studentId: "student-12", studentName: "Angel Atwine", date: "2026-09-10", status: "Absent", className: "Senior 4 Chem" }
];

// ----------------------------------------------------
// 14. ASSIGNMENTS EXPANDED (15 RECORDS WITH SUBJECTS & STATUSES)
// ----------------------------------------------------
export const mockAssignments: Assignment[] = [
  { id: "asg-1", title: "Organic Structure Alkanes Isomers", deckId: "deck-1", className: "Senior 4 Chem", dueDate: "2026-10-10", assignedByTeacherId: "teacher-1", xpReward: 150, subject: "Chemistry", status: "pending grading" },
  { id: "asg-2", title: "Le Chatelier's Shift Factors Quiz", deckId: "deck-2", className: "Senior 6 Chem", dueDate: "2026-10-12", assignedByTeacherId: "teacher-1", xpReward: 200, subject: "Chemistry", status: "created" },
  { id: "asg-3", title: "AP-3: Xylem vs Phloem Translocation", deckId: "deck-3", className: "Senior 5 Bio", dueDate: "2026-10-14", assignedByTeacherId: "teacher-1", xpReward: 180, subject: "Biology", status: "created" },
  { id: "asg-4", title: "Mitosis Stages Diagrams Test", deckId: "deck-4", className: "Senior 5 Bio", dueDate: "2026-10-08", assignedByTeacherId: "teacher-1", xpReward: 160, subject: "Biology", status: "completed" },
  
  { id: "asg-5", title: "Newton's 2nd Law Equations Sheet", deckId: "deck-5", className: "Senior 5 Physics", dueDate: "2026-10-11", assignedByTeacherId: "teacher-2", xpReward: 150, subject: "Physics", status: "pending grading" },
  { id: "asg-6", title: "Faraday's Flux Induction Formula", deckId: "deck-6", className: "Senior 5 Physics", dueDate: "2026-10-15", assignedByTeacherId: "teacher-2", xpReward: 220, subject: "Physics", status: "created" },
  { id: "asg-7", title: "MT-1: Epsilon Delta Limit Proofs", deckId: "deck-7", className: "Senior 6 Pure Math", dueDate: "2026-10-09", assignedByTeacherId: "teacher-2", xpReward: 250, subject: "Mathematics", status: "completed" },
  { id: "asg-8", title: "Derivations Chain Rule Exercises", deckId: "deck-8", className: "Senior 6 Pure Math", dueDate: "2026-10-14", assignedByTeacherId: "teacher-2", xpReward: 200, subject: "Mathematics", status: "created" },
  
  { id: "asg-9", title: "Traditional Buganda Kingdom Cabinets", deckId: "deck-9", className: "Senior 4 East African History", dueDate: "2026-10-10", assignedByTeacherId: "teacher-3", xpReward: 120, subject: "History", status: "pending grading" },
  { id: "asg-10", title: "Road to Uganda 1962 Constitution", deckId: "deck-10", className: "Senior 4 East African History", dueDate: "2026-10-16", assignedByTeacherId: "teacher-3", xpReward: 180, subject: "History", status: "created" },
  { id: "asg-11", title: "Soil Horizons Composition Lab", deckId: "deck-17", className: "Senior 5 Geog", dueDate: "2026-10-13", assignedByTeacherId: "teacher-3", xpReward: 150, subject: "Geography", status: "created" },
  
  { id: "asg-12", title: "Macbeth Hamartia Essay Prompts", deckId: "deck-11", className: "Senior 5 Literature", dueDate: "2026-10-12", assignedByTeacherId: "teacher-4", xpReward: 200, subject: "English Literature", status: "created" },
  { id: "asg-13", title: "Metonymy Rhetorical Devices Review", deckId: "deck-12", className: "Senior 6 English Prose", dueDate: "2026-10-09", assignedByTeacherId: "teacher-4", xpReward: 150, subject: "English Literature", status: "completed" },
  
  { id: "asg-14", title: "French Travel Verbes Conjugation", deckId: "deck-13", className: "Senior 4 French", dueDate: "2026-10-11", assignedByTeacherId: "teacher-5", xpReward: 150, subject: "French", status: "pending grading" },
  { id: "asg-15", title: "Luganda Noun Class subject concords", deckId: "deck-14", className: "Senior 5 Luganda", dueDate: "2026-10-17", assignedByTeacherId: "teacher-5", xpReward: 180, subject: "Luganda", status: "created" }
];

// ----------------------------------------------------
// 15. GRADE RECORDS PER SUBJECT PER STUDENT
// ----------------------------------------------------
export const mockGrades: GradeRecord[] = [
  // student-1 (Liam Sekamate)
  { id: "gr-1", studentId: "student-1", studentName: "Liam Sekamate", deckId: "deck-4", deckTitle: "Cell Division: Mitosis & Meiosis", subject: "Biology", className: "Senior 5 Bio", score: 95, grade: "A", totalQuestions: 8, correctAnswers: 8, date: "2026-10-01", feedback: "Remarkable understanding of recombination chiasmata. Flawless execution.", feedbackByTeacherId: "teacher-1", trend: "up" },
  { id: "gr-2", studentId: "student-1", studentName: "Liam Sekamate", deckId: "deck-7", deckTitle: "Limits & Continuous Functions", subject: "Mathematics", className: "Senior 6 Pure Math", score: 88, grade: "B", totalQuestions: 8, correctAnswers: 7, date: "2026-09-28", feedback: "Strong analytical proofs on squeeze limits. Mind double-sided limits.", feedbackByTeacherId: "teacher-2", trend: "stable" },
  { id: "gr-3", studentId: "student-1", studentName: "Liam Sekamate", deckId: "deck-5", deckTitle: "Newton's Laws of Motion", subject: "Physics", className: "Senior 5 Physics", score: 92, grade: "A", totalQuestions: 8, correctAnswers: 7, date: "2026-09-20", feedback: "Excellent resolution of elevator friction vectors.", feedbackByTeacherId: "teacher-2", trend: "up" },
  
  // student-2 (Clara)
  { id: "gr-4", studentId: "student-2", studentName: "Clara Sekamate", deckId: "deck-1", deckTitle: "Introduction to Organic Chemistry", subject: "Chemistry", className: "Senior 4 Chem", score: 80, grade: "B", totalQuestions: 8, correctAnswers: 6, date: "2026-10-02", feedback: "Solid alkanes formula layout. Double-check nomenclature suffixes.", feedbackByTeacherId: "teacher-1", trend: "up" },
  { id: "gr-5", studentId: "student-2", studentName: "Clara Sekamate", deckId: "deck-13", deckTitle: "AP French: Travel & Subjunctive", subject: "French", className: "Senior 4 French", score: 100, grade: "A", totalQuestions: 8, correctAnswers: 8, date: "2026-09-25", feedback: "Félicitations! Perfect application of subjective clauses.", feedbackByTeacherId: "teacher-5", trend: "up" },

  // student-3 (Zahra Babirye)
  { id: "gr-6", studentId: "student-3", studentName: "Zahra Babirye", deckId: "deck-3", deckTitle: "Plant Vascular Anatomy", subject: "Biology", className: "Senior 5 Bio", score: 100, grade: "A", totalQuestions: 8, correctAnswers: 8, date: "2026-10-02", feedback: "Brilliant explanation of hydrostatic pressure flow inside sieve elements.", feedbackByTeacherId: "teacher-1", trend: "up" },
  { id: "gr-7", studentId: "student-3", studentName: "Zahra Babirye", deckId: "deck-11", deckTitle: "Shakespeare's Hamlet & Macbeth Themes", subject: "English Literature", className: "Senior 5 Literature", score: 92, grade: "A", totalQuestions: 8, correctAnswers: 7, date: "2026-09-25", feedback: "Eloquent prose. Your argument on Macbeth's hamartia was extremely cogent.", feedbackByTeacherId: "teacher-4", trend: "stable" },
  
  // student-5 (Lamech)
  { id: "gr-8", studentId: "student-5", studentName: "Lamech Odongo", deckId: "deck-1", deckTitle: "Introduction to Organic Chemistry", subject: "Chemistry", className: "Senior 4 Chem", score: 50, grade: "F", totalQuestions: 8, correctAnswers: 4, date: "2026-09-20", feedback: "Let's review isomer connectivity. Try sketching the isomers before naming them.", feedbackByTeacherId: "teacher-1", trend: "down" },
  { id: "gr-9", studentId: "student-5", studentName: "Lamech Odongo", deckId: "deck-9", deckTitle: "East African History: Pre-Colonial Era", subject: "History", className: "Senior 4 East African History", score: 75, grade: "C", totalQuestions: 8, correctAnswers: 6, date: "2026-09-27", feedback: "Excellent grasp of caravan routes, needs slightly more details on Kabaka structures.", feedbackByTeacherId: "teacher-3", trend: "up" },
  
  // student-12 (Angel)
  { id: "gr-10", studentId: "student-12", studentName: "Angel Atwine", deckId: "deck-1", deckTitle: "Introduction to Organic Chemistry", subject: "Chemistry", className: "Senior 4 Chem", score: 38, grade: "F", totalQuestions: 8, correctAnswers: 3, date: "2026-09-18", feedback: "Please schedule an appointment in the remedial clinic so we can map alkane prefixes together.", feedbackByTeacherId: "teacher-1", trend: "down" }
];

// ----------------------------------------------------
// 16. ANNOUNCEMENTS (10)
// ----------------------------------------------------
export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "National Science Exposition & Hardware Grants",
    content: "Cardify will host the Annual Science & Technology Exposition on November 15th. Students in Senior 4 to 6 are eligible to present interactive visual modules. Winners receive tablet hardware and academic sponsorships.",
    date: "2026-10-05",
    category: "Academic",
    author: "Dr. Arthur Vance Katumba"
  },
  {
    id: "ann-2",
    title: "Digital Direct Debit System Active",
    content: "The bursary portal has completed integration of secure tuition billing. Parents can now configure automated school fee installment payouts. Contact Eleanor Namubiru for secure direct ledger keys.",
    date: "2026-10-04",
    category: "Financial",
    author: "Eleanor Sterling Namubiru (Chief Burser)"
  },
  {
    id: "ann-3",
    title: "Mid-Term Examination Timetable Released",
    content: "Mid-Term evaluation schedules are now live across all streams. Senior exams kick off on October 22nd. Self-testing using study decks will count as 15% of continuous assessment grades.",
    date: "2026-10-03",
    category: "Urgent",
    author: "Madam Florence Nakazzi"
  },
  {
    id: "ann-4",
    title: "Parent-Teacher Consultation Day Bookings",
    content: "Appointments for the Autumn term consultation meeting on October 20th are open in your parent dashboards. Please select 15-minute intervals to review your child's study card completion rates.",
    date: "2026-10-02",
    category: "Urgent",
    author: "Dr. Arthur Vance Katumba"
  },
  {
    id: "ann-5",
    title: "Outstanding Cardify Engagement Record",
    content: "We recorded an all-time high of 4,800 micro-test card sessions this week! Congratulations to Senior 5 on holding the highest class average study streak. Keep studying, earn XP, and unlock level rewards.",
    date: "2026-09-30",
    category: "General",
    author: "Mr. Joseph Mugisha"
  },
  {
    id: "ann-6",
    title: "Bursary Audit Statement: Pending Installments Due",
    content: "This is a reminder that Term II tuition installments for outstanding accounts must be settled by October 15th to prevent curriculum access suspension. Check invoice status on the finance panel.",
    date: "2026-09-28",
    category: "Financial",
    author: "Eleanor Sterling Namubiru (Chief Burser)"
  },
  {
    id: "ann-7",
    title: "French Language Speaking Immersion Clinic",
    content: "To assist candidates preparing for UCE/UACE oral exams, Monsieur Jean-Luc Kizza will host French audio study loops every Thursday at 4 PM. Digital study cards have been assigned.",
    date: "2026-09-26",
    category: "Academic",
    author: "Monsieur Jean-Luc Kizza"
  },
  {
    id: "ann-8",
    title: "New Advanced Physics Laboratory Equipment",
    content: "We have commissioned modern electromagnetism and optical kits. Practical experiments will align with our newly updated Faraday's Law study cards.",
    date: "2026-09-24",
    category: "General",
    author: "Madam Florence Nakazzi"
  },
  {
    id: "ann-9",
    title: "National Debate Championship Selections",
    content: "Congratulations to Lamech Odongo and Liam Sekamate on advancing to the national selection finals for the schools debate assembly in Kampala. Cardify is behind you!",
    date: "2026-09-22",
    category: "General",
    author: "Mr. Bernard Okot"
  },
  {
    id: "ann-10",
    title: "Boarding House Refurbishment Completed",
    content: "All hot-water installations and digital study hubs in the girls and boys quarters are fully functional. Study desks have been fitted with direct power charging banks.",
    date: "2026-09-18",
    category: "General",
    author: "Dr. Arthur Vance Katumba"
  }
];

// ----------------------------------------------------
// 17. LEADERBOARD (TOP 10 STUDENTS)
// ----------------------------------------------------
export const mockLeaderboard: LeaderboardEntry[] = [
  { studentId: "student-3", name: "Zahra Babirye", xp: 2980, streak: 22, rank: 1, avatar: "https://ui-avatars.com/api/?name=Zahra+Babirye&background=F59E0B&color=fff", change: "same" },
  { studentId: "student-1", name: "Liam Sekamate", xp: 2450, streak: 18, rank: 2, avatar: "https://ui-avatars.com/api/?name=Liam+Sekamate&background=4F46E5&color=fff", change: "up" },
  { studentId: "student-6", name: "Kiprotich Chelangat", xp: 2150, streak: 15, rank: 3, avatar: "https://ui-avatars.com/api/?name=Kiprotich+Chelangat&background=EC4899&color=fff", change: "down" },
  { studentId: "student-7", name: "Mercy Chebet", xp: 1980, streak: 14, rank: 4, avatar: "https://ui-avatars.com/api/?name=Mercy+Chebet&background=14B8A6&color=fff", change: "up" },
  { studentId: "student-2", name: "Clara Sekamate", xp: 1890, streak: 12, rank: 5, avatar: "https://ui-avatars.com/api/?name=Clara+Sekamate&background=10B981&color=fff", change: "down" },
  { studentId: "student-10", name: "Sanyu Ssebunya", xp: 1540, streak: 11, rank: 6, avatar: "https://ui-avatars.com/api/?name=Sanyu+Ssebunya&background=10B981&color=fff", change: "same" },
  { studentId: "student-4", name: "Ethan Kato", xp: 1420, streak: 5, rank: 7, avatar: "https://ui-avatars.com/api/?name=Ethan+Kato&background=3B82F6&color=fff", change: "up" },
  { studentId: "student-8", name: "Kizza Ssebunya", xp: 1350, streak: 9, rank: 8, avatar: "https://ui-avatars.com/api/?name=Kizza+Ssebunya&background=F43F5E&color=fff", change: "down" },
  { studentId: "student-11", name: "Derrick Atwine", xp: 1120, streak: 2, rank: 9, avatar: "https://ui-avatars.com/api/?name=Derrick+Atwine&background=6366F1&color=fff", change: "same" },
  { studentId: "student-9", name: "Nsubuga Ssebunya", xp: 890, streak: 3, rank: 10, avatar: "https://ui-avatars.com/api/?name=Nsubuga+Ssebunya&background=06B6D4&color=fff", change: "up" }
];
