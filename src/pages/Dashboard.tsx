import { motion } from "motion/react";
import { Users, GraduationCap, Calendar, BookOpen, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(data => setStats(data));

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greetings = () => {
    const hour = currentTime.getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {greetings()}, <span className="text-red-600">{user.name}</span>
          </h1>
          <div className="flex items-center gap-4 text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-600" />
              {currentTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-red-600" />
              {currentTime.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              Tangsel, Banten
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
           <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600 font-bold">PU</div>
           <div className="text-sm">
              <p className="font-bold text-gray-900">SMK Prima Unggul</p>
              <p className="text-gray-500 text-xs text-nowrap italic">"Cerdas, Unggul, Berkarakter"</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="Total Guru" 
          value={stats?.totalTeachers || "0"} 
          color="bg-blue-600" 
        />
        <StatCard 
          icon={GraduationCap} 
          label="Total Siswa" 
          value={stats?.totalStudents || "0"} 
          color="bg-red-600" 
        />
        <StatCard 
          icon={Calendar} 
          label="Izin Hari Ini" 
          value="12" 
          color="bg-orange-500" 
        />
        <StatCard 
          icon={BookOpen} 
          label="Ujian Aktif" 
          value="4" 
          color="bg-green-600" 
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* News Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Akademik</h3>
            <div className="space-y-6">
              <NewsItem 
                date="22 April" 
                title="Pelaksanaan Ujian Tengah Semester Genap" 
                desc="Seluruh siswa diharap menyiapkan perangkat dan login NISN masing-masing."
              />
              <NewsItem 
                date="20 April" 
                title="Update Jadwal Absensi Karyawan" 
                desc="Absensi mandiri dilakukan maksimal pukul 07:15 WIB untuk status hadir tepat waktu."
              />
              <NewsItem 
                date="18 April" 
                title="Pendaftaran LKS Tingkat Kota Tangsel" 
                desc="Siswa jurusan TKJ dan DKV yang berminat harap menghubungi konsultan jurusan."
              />
            </div>
          </div>
        </div>

        {/* Quick Links / Status */}
        <div className="space-y-6">
           <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl shadow-gray-200">
             <h3 className="text-lg font-bold mb-4">Status Akun</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                   <span className="text-white/60 text-sm">Role</span>
                   <span className="font-bold capitalize">{user.role.replace("_", " ")}</span>
                </div>
                {user.nisn && (
                   <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/60 text-sm">NISN</span>
                      <span className="font-bold">{user.nisn}</span>
                   </div>
                )}
                {user.major && (
                   <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/60 text-sm">Jurusan</span>
                      <span className="font-bold text-red-500">{user.major}</span>
                   </div>
                )}
                <div className="flex justify-between items-center py-2">
                   <span className="text-white/60 text-sm">Lokasi Login</span>
                   <span className="font-bold text-xs uppercase tracking-wider text-green-400">Tangerang Selatan</span>
                </div>
             </div>
           </div>

           <div className="bg-red-50 p-6 rounded-3xl border border-red-100 italic text-red-800 text-sm">
              "Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia." - Nelson Mandela
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6"
    >
      <div className={`${color} p-4 rounded-2xl text-white shadow-lg shadow-gray-100`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function NewsItem({ date, title, desc }: any) {
  return (
    <div className="flex gap-6 group cursor-pointer">
      <div className="flex flex-col items-center">
        <div className="text-red-600 font-extrabold text-lg leading-none">{date.split(" ")[0]}</div>
        <div className="text-[10px] uppercase font-bold text-gray-400">{date.split(" ")[1]}</div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{title}</h4>
        <p className="text-sm text-gray-500 line-clamp-1">{desc}</p>
      </div>
    </div>
  );
}
