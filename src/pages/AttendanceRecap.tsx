import { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AttendanceRecap({ user }: { user: any }) {
  const [recap, setRecap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/attendance/recap")
      .then(res => res.json())
      .then(data => {
        setRecap(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rekapitulasi Absensi</h1>
          <p className="text-gray-500 font-medium">Laporan historis kehadiran seluruh elemen sekolah.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all text-sm">
              <Download className="w-4 h-4" /> Export CSV
           </button>
           <button className="p-2.5 bg-white border border-gray-100 text-gray-500 rounded-xl hover:bg-gray-50 transition-all">
              <CalendarIcon className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Rata-rata Kehadiran</p>
               <p className="text-2xl font-black text-gray-900">94.2%</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
               <XCircle className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Alpa (Bulan Ini)</p>
               <p className="text-2xl font-black text-gray-900">32</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Keterlambatan</p>
               <p className="text-2xl font-black text-gray-900">18 Menit</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h4 className="font-bold text-gray-900">Log Aktivitas Terbaru</h4>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Filter log..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-red-600 text-sm" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu & Tanggal</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Objek / Siswa</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Petugas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="px-8 py-10 text-center text-gray-400 italic">Memuat log...</td></tr>
              ) : recap.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-10 text-center text-gray-400 italic font-medium">Belum ada data terekam hari ini.</td></tr>
              ) : recap.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-900 text-sm">{new Date(r.timestamp).toLocaleTimeString("id-ID")}</p>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-mono">{r.date}</p>
                  </td>
                  <td className="px-8 py-5">
                     <p className="font-bold text-gray-900 text-sm">{r.studentName}</p>
                     <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">{r.class}</p>
                  </td>
                  <td className="px-8 py-5">
                     <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        r.status === "Hadir" ? "bg-green-50 text-green-600" :
                        r.status === "Alpa" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                     }`}>
                        {r.status}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-gray-500 font-bold text-xs">
                     ID: {r.markedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
           <div className="text-xs text-gray-400 font-medium">Menampilkan {recap.length} baris data</div>
           <div className="flex gap-2">
              <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  );
}
