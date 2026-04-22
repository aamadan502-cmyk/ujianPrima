import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database
  const db = {
    users: [
      { id: "admin1", username: "admin", password: "123", role: "admin", name: "Administrator" },
      { id: "guru1", username: "guru", password: "123", role: "guru", name: "Budi Santoso, S.Pd", major: "TKJ" },
      { id: "karyawan1", username: "staf", password: "123", role: "tenaga_kependidikan", name: "Siti Aminah" },
      { id: "siswa1", username: "siswa1", password: "123", role: "siswa", name: "Ahmad Dani", nisn: "12345678", major: "TKJ", class: "XII TKJ 1" },
      { id: "siswa2", username: "siswa2", password: "123", role: "siswa", name: "Bunga Lestari", nisn: "87654321", major: "DKV", class: "XI DKV 2" },
    ],
    attendance: [],
    exams: [
      { id: "e1", title: "Ujian Tengah Semester - Dasar TKJ", major: "TKJ", level: "easy" },
      { id: "e2", title: "Ujian Akhir Semester - Grafis DKV", major: "DKV", level: "hard" },
    ],
    results: []
  };

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ message: "Username atau Password salah" });
    }
  });

  // Get data based on role
  app.get("/api/dashboard", (req, res) => {
    // In a real app, we'd check session/token
    res.json({
      totalStudents: db.users.filter(u => u.role === "siswa").length,
      totalTeachers: db.users.filter(u => u.role === "guru").length,
      recentAttendance: db.attendance.slice(-5),
    });
  });

  app.get("/api/students", (req, res) => {
    res.json(db.users.filter(u => u.role === "siswa"));
  });

  app.post("/api/attendance", (req, res) => {
    const record = { ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString() };
    db.attendance.push(record);
    res.json({ success: true, record });
  });

  app.get("/api/attendance/recap", (req, res) => {
    res.json(db.attendance);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
