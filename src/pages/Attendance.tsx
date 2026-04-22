import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { UserCheck, Search, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function Attendance({ user }: { user: any }) {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("XII TKJ 1");
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/students")
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  const handleMark = async (studentId: string, status: string) => {
    const student = students.find(s => s.id === studentId);
    setAttendance(prev => ({ ...prev, [studentId]: status }));

    try {
      await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          studentName: student.name,
          status,
          markedBy: user.id,
          class: student.class,
          date: new Date().toISOString().split("T")[0]
        })
      });
    } catch (err) {
      console.error("Gagal mengirim data absensi");
    }
  };

  const filteredStudents = students.filter(s => s.class === selectedClass);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Presensi Siswa</h1>
          <p className="text-gray-500 font-medium">Rekapitulasi kehadiran harian kelas {selectedClass}</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari siswa..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm"
              />
           </div>
           <select 
             value={selectedClass}
             onChange={(e) => setSelectedClass(e.target.value)}
             className="px-4 py-2 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm font-bold text-gray-700"
           >
              <option value="XII TKJ 1">XII TKJ 1</option>
              <option value="XI DKV 2">XI DKV 2</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Siswa</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 <tr>
                    <td colSpan={3} className="px-8 py-10 text-center text-gray-400 font-medium italic">Memuat data siswa...</td>
                 </tr>
              ) : filteredStudents.length === 0 ? (
                 <tr>
                    <td colSpan={3} className="px-8 py-10 text-center text-gray-400 font-medium italic">Tidak ada siswa di kelas ini</td>
                 </tr>
              ) : filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600 font-bold text-xs uppercase tracking-tighter">
                         {s.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 leading-tight">{s.name}</p>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{s.nisn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${
                        attendance[s.id] === "Hadir" ? "bg-green-50 text-green-600 border border-green-100" :
                        attendance[s.id] === "Sakit" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        attendance[s.id] === "Izin" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                        attendance[s.id] === "Alpa" ? "bg-red-50 text-red-600 border border-red-100" :
                        "bg-gray-50 text-gray-400 border border-gray-100"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          attendance[s.id] ? "animate-pulse " + (
                            attendance[s.id] === "Hadir" ? "bg-green-600" :
                            attendance[s.id] === "Sakit" ? "bg-blue-600" :
                            attendance[s.id] === "Izin" ? "bg-orange-600" : "bg-red-600"
                          ) : "bg-gray-400"
                        }`}></div>
                        {attendance[s.id] || "Belum Absen"}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-2">
                       <StatusButton label="H" full="Hadir" active={attendance[s.id] === "Hadir"} onClick={() => handleMark(s.id, "Hadir")} color="green" />
                       <StatusButton label="S" full="Sakit" active={attendance[s.id] === "Sakit"} onClick={() => handleMark(s.id, "Sakit")} color="blue" />
                       <StatusButton label="I" full="Izin" active={attendance[s.id] === "Izin"} onClick={() => handleMark(s.id, "Izin")} color="orange" />
                       <StatusButton label="A" full="Alpa" active={attendance[s.id] === "Alpa"} onClick={() => handleMark(s.id, "Alpa")} color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusButton({ label, full, active, onClick, color }: any) {
  const colors: Record<string, string> = {
    green: "hover:bg-green-50 hover:text-green-600 border-green-100 active:bg-green-600 active:text-white",
    blue: "hover:bg-blue-50 hover:text-blue-600 border-blue-100 active:bg-blue-600 active:text-white",
    orange: "hover:bg-orange-50 hover:text-orange-600 border-orange-100 active:bg-orange-600 active:text-white",
    red: "hover:bg-red-50 hover:text-red-600 border-red-100 active:bg-red-600 active:text-white",
  };

  const activeColors: Record<string, string> = {
    green: "bg-green-600 text-white border-green-600 shadow-lg shadow-green-100",
    blue: "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100",
    orange: "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-100",
    red: "bg-red-600 text-white border-red-600 shadow-lg shadow-red-100",
  };

  return (
    <button 
      onClick={onClick}
      title={full}
      className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold border transition-all ${
        active ? activeColors[color] : `text-gray-400 bg-white ${colors[color]}`
      }`}
    >
      {label}
    </button>
  );
}
