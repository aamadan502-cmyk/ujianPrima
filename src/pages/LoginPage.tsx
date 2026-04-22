import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, ArrowLeft, GraduationCap, ShieldCheck } from "lucide-react";

interface LoginPageProps {
  onLogin: (user: any) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onLogin(data);
        navigate("/app");
      } else {
        const data = await res.json();
        setError(data.message || "Login gagal");
      }
    } catch (err) {
      setError("Koneksi gagal ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-red-600 font-semibold transition-colors">
        <ArrowLeft className="w-5 h-5" /> Kembali
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-red-200">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h2>
          <p className="text-gray-500">Silakan masuk ke akun <span className="font-bold text-red-600">SMKPU</span> Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Username / NISN</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-400 font-medium"
                placeholder="Masukkan username Anda"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-400 font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:opacity-50"
          >
            {loading ? "Menghubungkan..." : "Masuk Sekarang"}
          </button>
        </form>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2 border border-gray-100">
             <GraduationCap className="w-5 h-5 text-red-600" />
             <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Akses Siswa</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2 border border-gray-100">
             <ShieldCheck className="w-5 h-5 text-red-600" />
             <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Akses Guru</span>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-400">
          Gunakan password <span className="font-bold">123</span> untuk akun demo
        </p>
      </motion.div>
    </div>
  );
}
