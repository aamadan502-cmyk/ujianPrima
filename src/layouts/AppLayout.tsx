import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  LogOut, 
  UserPen, 
  FileText, 
  Bell,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AppLayoutProps {
  user: any;
  onLogout: () => void;
}

export default function AppLayout({ user, onLogout }: AppLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/app", icon: LayoutDashboard, roles: ["admin", "guru", "tenaga_kependidikan", "siswa"] },
    { name: "Absensi Siswa", path: "/app/attendance", icon: CalendarCheck, roles: ["admin", "guru"] },
    { name: "Absensi Mandiri", path: "/app/attendance/self", icon: UserPen, roles: ["admin", "guru", "tenaga_kependidikan"] },
    { name: "Ujian Online", path: "/app/exam", icon: BookOpen, roles: ["siswa"] },
    { name: "Rekap Absensi", path: "/app/attendance/recap", icon: FileText, roles: ["admin", "guru"] },
    { name: "Data Siswa", path: "/app/users?role=siswa", icon: GraduationCapIcon, roles: ["admin"] },
    { name: "User Management", path: "/app/users", icon: Users, roles: ["admin"] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-72" : "w-0 lg:w-20"
        } bg-[#DC2626] text-white transition-all duration-300 flex flex-col h-screen fixed lg:sticky top-0 z-40 overflow-hidden`}
      >
        <div className="p-6 flex items-center gap-3 mb-8">
          <div className="min-w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-600 font-bold text-xl">
            P
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight whitespace-nowrap">SMKPU ONLINE</span>}
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {filteredMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all group ${
                location.pathname === item.path 
                ? "bg-white/15 text-white" 
                : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? "scale-110" : ""}`} />
              {isSidebarOpen && <span>{item.name}</span>}
              {!isSidebarOpen && (
                 <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                 </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          {isSidebarOpen && (
            <div className="bg-white/10 rounded-2xl p-4 mb-4">
              <p className="text-xs text-white/60 mb-1">Login sebagai:</p>
              <p className="font-bold text-sm truncate">{user.name}</p>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/80 uppercase font-bold tracking-widest mt-2 inline-block">
                {user.role.replace("_", " ")}
              </span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-50 rounded-lg text-gray-500"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 mx-2"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function GraduationCapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.599 9.084a1 1 0 0 0-.019 1.838l1.411.595a.5.5 0 0 0 .565-.102c.313-.314.773-.65 1.544-.65 1.258 0 2.2 1 2.2 2.224v1.896c0 .768.441 1.464 1.135 1.782l3.41 1.564a2 2 0 0 0 1.69 0l3.41-1.564a2 2 0 0 0 1.135-1.782v-1.896c0-1.224.942-2.224 2.2-2.224.771 0 1.231.336 1.544.65a.5.5 0 0 0 .565.102l1.411-.595z" />
      <path d="m4.5 12.5 3 3" />
      <path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
      <path d="m14 15 3-3" />
    </svg>
  );
}
