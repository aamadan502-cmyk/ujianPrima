import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, MapPin, ArrowRight } from "lucide-react";

const majors = [
  { id: "tkj", name: "TKJ", full: "Teknik Komputer & Jaringan", icon: "💻" },
  { id: "dkv", name: "DKV", full: "Desain Komunikasi Visual", icon: "🎨" },
  { id: "ak", name: "AK", full: "Akuntansi", icon: "📊" },
  { id: "bc", name: "BC", full: "Broadcasting", icon: "🎥" },
  { id: "mplb", name: "MPLB", full: "Manajemen Perkantoran & Layanan Bisnis", icon: "🏢" },
  { id: "bd", name: "BD", full: "Bisnis Digital", icon: "🛒" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">SMK PRIMA UNGGUL</span>
          </div>
          <Link 
            to="/login" 
            className="px-6 py-2.5 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Masuk Sistem
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold mb-6">
              Official School Systems
            </span>
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-8">
              Membangun Generasi <br />
              <span className="text-red-600 italic">Cerdas & Unggul</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
              SMK Prima Unggul Kota Tangerang Selatan berdedikasi menciptakan lulusan kompeten yang siap bersaing di era industri digital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all group">
                Mulai Belajar <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 px-8 py-4 border-2 border-gray-100 rounded-xl font-bold text-gray-700">
                <MapPin className="w-5 h-5 text-red-600" /> Tangerang Selatan
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-red-100/50">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Student" />
              </div>
              <div className="p-8 bg-red-600 rounded-3xl text-white">
                <div className="text-4xl font-bold mb-1">98%</div>
                <div className="text-sm opacity-80 uppercase tracking-wider font-bold">Lulusan Terserap</div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="p-8 bg-gray-900 rounded-3xl text-white">
                <div className="text-4xl font-bold mb-1">06</div>
                <div className="text-sm opacity-80 uppercase tracking-wider font-bold">Jurusan Unggulan</div>
              </div>
              <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Learning" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Majors Section */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Keahlian</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kurikulum berbasis industri yang dirancang untuk membekali siswa dengan keterampilan praktis.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {majors.map((m, i) => (
              <motion.div 
                key={m.id}
                whileHover={{ y: -5 }}
                className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-6">{m.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{m.name}</h3>
                <p className="text-gray-500 font-medium">{m.full}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-top border-gray-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-lg">P</div>
             <span className="font-bold text-gray-900">SMK PRIMA UNGGUL</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <span>© 2026 Kota Tangerang Selatan</span>
            <Link to="/login" className="hover:text-red-600">Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
