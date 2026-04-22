import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Timer,
  ChevronRight,
  ClipboardList
} from "lucide-react";

const mockQuestions = [
  { 
    id: 1, 
    question: "Apa singkatan dari TKJ?", 
    options: ["Teknik Komputer & Jaringan", "Teknik Komunikasi Jaringan", "Teknologi Komputer Jaya", "Teknik Kabel Jaringan"], 
    answer: 0,
    major: "TKJ"
  },
  { 
    id: 2, 
    question: "Protokol yang digunakan untuk mengirim email adalah?", 
    options: ["HTTP", "FTP", "SMTP", "SSH"], 
    answer: 2,
    major: "TKJ"
  },
  { 
    id: 3, 
    question: "Apa kepanjangan dari OSI Layer?", 
    options: ["Open System Interconnection", "Open Simplex Interface", "Output System Integration", "Optical System Interference"], 
    answer: 0,
    major: "TKJ"
  },
  { 
    id: 4, 
    question: "Apa fungsi utama dari Router?", 
    options: ["Mengolah grafis", "Menghubungkan jaringan yang berbeda", "Penyimpanan data", "Mencetak dokumen"], 
    answer: 1,
    major: "TKJ"
  },
  { 
    id: 5, 
    question: "Port standar untuk HTTP adalah?", 
    options: ["21", "22", "80", "443"], 
    answer: 2,
    major: "TKJ"
  }
  // Simplified for demo, in production we add 30-40
];

export default function Exam({ user }: { user: any }) {
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const questions = mockQuestions.filter(q => q.major === user.major || !q.major);

  useEffect(() => {
    let timer: any;
    if (examStarted && !finished && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !finished) {
      handleFinish();
    }
    return () => clearInterval(timer);
  }, [examStarted, finished, timeLeft]);

  const handleStart = () => {
    setExamStarted(true);
  };

  const handleFinish = () => {
    let s = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) s += 1;
    });
    const finalScore = Math.round((s / questions.length) * 100);
    setScore(finalScore);
    setFinished(true);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ":" : ""}${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl text-center"
        >
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ujian Selesai!</h2>
          <p className="text-gray-500 font-medium mb-10 italic">"Hasil kerja keras Anda telah terekam dalam sistem."</p>
          
          <div className="flex justify-center gap-12 mb-12">
             <div className="text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nilai Akhir</p>
                <p className={`text-6xl font-black ${score >= 50 ? "text-green-600" : "text-red-600"}`}>{score}</p>
             </div>
             <div className="w-px bg-gray-100"></div>
             <div className="text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status</p>
                <p className={`text-2xl font-bold mt-4 ${score >= 50 ? "text-green-600" : "text-red-600"}`}>
                   {score >= 50 ? "LULUS (KKM 50)" : "TIDAK LULUS"}
                </p>
             </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
          >
            Selesai & Keluar
          </button>
        </motion.div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Portal Ujian Online</h1>
          <p className="text-gray-500 font-medium italic">"Kejujuran adalah langkah awal menuju kesuksesan SMK Prima Unggul."</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8">
                   <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Materi TKJ - Dasar Jaringan</h3>
                <p className="text-gray-500 leading-relaxed mb-6 font-medium">
                  Pastikan koneksi internet stabil sebelum memulai. Anda memiliki waktu 60 menit dengan KKM nilai 50.
                </p>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                      <Timer className="w-4 h-4 text-red-600" /> 60 Menit Durasi
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                      <ClipboardList className="w-4 h-4 text-red-600" /> {questions.length} Soal Pilihan Ganda
                   </div>
                </div>
              </div>
              <button 
                onClick={handleStart}
                className="mt-12 w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100"
              >
                Mulai Ujian Sekarang
              </button>
           </div>

           <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <AlertCircle className="w-12 h-12 text-red-500 mb-8" />
              <h3 className="text-2xl font-bold mb-6">Instruksi Penting:</h3>
              <ul className="space-y-6 text-white/80 font-medium">
                 <li className="flex gap-4">
                    <span className="w-6 h-6 flex-shrink-0 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Dilarang membuka tab browser lain selama ujian berlangsung.
                 </li>
                 <li className="flex gap-4">
                    <span className="w-6 h-6 flex-shrink-0 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Sistem akan otomatis submit saat waktu habis.
                 </li>
                 <li className="flex gap-4">
                    <span className="w-6 h-6 flex-shrink-0 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Gunakan login NISN resmi Anda.
                 </li>
              </ul>
           </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Exam Header */}
      <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24 z-20">
         <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-red-600 text-white rounded-xl flex items-center justify-center font-bold">
               {currentQuestion + 1}
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Soal Progres</p>
               <p className="font-extrabold text-gray-900">{currentQuestion + 1} dari {questions.length}</p>
            </div>
         </div>

         <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 font-mono font-bold text-xl ${timeLeft < 300 ? "bg-red-50 text-red-600 animate-pulse" : "bg-gray-50 text-gray-700"}`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
         </div>

         <button 
           onClick={() => { if(confirm("Selesaikan ujian sekarang?")) handleFinish(); }}
           className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all text-sm"
         >
            Selesai Ujian
         </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Question Area */}
        <div className="lg:col-span-3 space-y-8">
           <motion.div 
             key={currentQuestion}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm"
           >
              <h2 className="text-2xl font-bold text-gray-900 mb-10 leading-relaxed">
                {q.question}
              </h2>

              <div className="space-y-4">
                 {q.options.map((opt, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setAnswers(prev => ({ ...prev, [q.id]: idx }))}
                     className={`w-full p-6 rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${
                       answers[q.id] === idx 
                       ? "bg-red-50 border-red-600 text-red-700 ring-4 ring-red-100" 
                       : "bg-white border-gray-100 text-gray-600 hover:border-gray-200"
                     }`}
                   >
                      <div className="flex items-center gap-6">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${
                          answers[q.id] === idx ? "bg-red-600 text-white" : "bg-gray-50 text-gray-400"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-bold text-lg">{opt}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                         answers[q.id] === idx ? "bg-red-600 border-red-600" : "border-gray-100 bg-gray-50"
                      }`}>
                         {answers[q.id] === idx && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                   </button>
                 ))}
              </div>
           </motion.div>

           <div className="flex justify-between items-center px-4">
              <button 
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-500 hover:text-red-600 disabled:opacity-30 transition-all font-bold"
              >
                <ArrowLeft className="w-5 h-5" /> Sebelumnya
              </button>
              <button 
                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-500 hover:text-red-600 disabled:opacity-30 transition-all font-bold"
              >
                Selanjutnya <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Question Map */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-52">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Navigasi Soal</h4>
              <div className="grid grid-cols-5 gap-3">
                 {questions.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentQuestion(idx)}
                      className={`aspect-square rounded-xl border-2 flex items-center justify-center font-bold transition-all text-xs ${
                        currentQuestion === idx 
                        ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-100" 
                        : answers[questions[idx].id] !== undefined 
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-300"
                      }`}
                    >
                       {idx + 1}
                    </button>
                 ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
                 <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase">
                    <div className="w-3 h-3 bg-red-600 rounded"></div> Sedang Dikerjakan
                 </div>
                 <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase">
                    <div className="w-3 h-3 bg-emerald-500 rounded"></div> Sudah Dijawab
                 </div>
                 <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase">
                    <div className="w-3 h-3 bg-gray-100 rounded"></div> Belum Dijawab
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
