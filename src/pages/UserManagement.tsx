import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, UserPlus, Search, Edit3, Trash2, Shield, GraduationCap, X } from "lucide-react";

export default function UserManagement({ user }: { user: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    username: "", 
    password: "123", 
    name: "", 
    role: "siswa", 
    major: "TKJ", 
    nisn: "" 
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    if (user.role !== "admin") return;
    fetch("/api/students") // Mocking for now, adjust server for real user list
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengguna</h1>
          <p className="text-gray-500 font-medium">Kelola akses akun Siswa, Guru, dan Karyawan SMKPU.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari user..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm w-64"
              />
           </div>
           <button 
             onClick={() => setModalOpen(true)}
             className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
           >
              <UserPlus className="w-4 h-4" /> Tambah User
           </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Identitas</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Jurusan</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 font-bold">
                       {u.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-400 font-medium">@{u.username} • {u.nisn || "Staf"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {u.role === "admin" ? <Shield className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                      {u.role.replace("_", " ")}
                   </div>
                </td>
                <td className="px-8 py-5 font-bold text-gray-600 text-sm">
                   {u.major || "-"}
                </td>
                <td className="px-8 py-5">
                   <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mock Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full max-w-lg bg-white rounded-3xl p-10 shadow-2xl relative"
            >
               <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X />
               </button>
               <h3 className="text-2xl font-bold text-gray-900 mb-8">Tambah Akun Baru</h3>
               
               <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-600 font-medium" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Username</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-600 font-medium" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700 ml-1">Role Utama</label>
                     <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-600 font-bold">
                        <option value="siswa">Siswa (Akses Ujian + Belajar)</option>
                        <option value="guru">Guru (Akses Nilai + Absensi)</option>
                        <option value="tenaga_kependidikan">Staf (Akses Absensi Mandiri)</option>
                     </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100 mt-4"
                  >
                     Simpan & Sinkronisasi
                  </button>
               </form>
            </motion.div>
         </div>
      )}
    </div>
  );
}
