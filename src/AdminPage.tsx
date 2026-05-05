import React, { useEffect, useState, useRef } from 'react';
import { supabase } from "./supabase";
import { BarChart3, ArrowLeft, Calendar, Clock, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrintStats {
  total: number;
  peakDay: { date: string; count: number };
  avgPerDay: number;
  mostActiveHour: string;
  dailyHistory: { date: string; count: number }[];
  todayHistory: { hour: number; count: number }[];
}

// Simple SVG Sparkline Component (Zero Dependencies)
const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  if (data.length < 2) return <div className="text-[10px] text-[#4A4B50] font-mono">Insufficient Data</div>;
  const max = Math.max(...data, 1);
  const width = 200;
  const height = 40;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" points={points} />
    </svg>
  );
};

export default function AdminPage() {
  const [stats, setStats] = useState<PrintStats>({
    total: 0,
    peakDay: { date: '-', count: 0 },
    avgPerDay: 0,
    mostActiveHour: '-',
    dailyHistory: [],
    todayHistory: []
  });
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('print_logs')
      .select('created_at')
      .order('created_at', { ascending: true });

    if (!error && data) {
      // 1. Deduplicate
      const uniqueLogs = data.reduce((acc: any[], current: any) => {
        if (acc.length === 0) return [current];
        const lastLogTime = new Date(acc[acc.length - 1].created_at).getTime();
        const currentLogTime = new Date(current.created_at).getTime();
        if (currentLogTime - lastLogTime > 5000) acc.push(current);
        return acc;
      }, []);

      // 2. Analysis Setup
      const dailyCounts: Record<string, number> = {};
      const hourlyCounts: Record<number, number> = {};
      const today = new Date().toLocaleDateString();
      const todayHourly: Record<number, number> = Array.from({ length: 24 }, (_, i) => ({ [i]: 0 })).reduce((a, b) => ({ ...a, ...b }), {});

      uniqueLogs.forEach(log => {
        const dateObj = new Date(log.created_at);
        const dateKey = dateObj.toLocaleDateString();
        const hourKey = dateObj.getHours();

        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
        hourlyCounts[hourKey] = (hourlyCounts[hourKey] || 0) + 1;

        if (dateKey === today) {
          todayHourly[hourKey]++;
        }
      });

      const peakDayEntry = Object.entries(dailyCounts).reduce((a, b) => (a[1] > b[1] ? a : b), ['No Data', 0]);
      const peakHourEntry = Object.entries(hourlyCounts).reduce((a, b) => (a[1] > b[1] ? a : b), ['0', 0]);
      
      // Formatting
      const ampm = parseInt(peakHourEntry[0]) >= 12 ? 'PM' : 'AM';
      const displayHour = `${parseInt(peakHourEntry[0]) % 12 || 12}:00 ${ampm}`;

      setStats({
        total: uniqueLogs.length,
        peakDay: { date: peakDayEntry[0], count: peakDayEntry[1] },
        avgPerDay: Math.round(uniqueLogs.length / (Object.keys(dailyCounts).length || 1)),
        mostActiveHour: displayHour,
        dailyHistory: Object.entries(dailyCounts).map(([date, count]) => ({ date, count })).slice(-7),
        todayHistory: Object.entries(todayHourly).map(([hour, count]) => ({ hour: parseInt(hour), count }))
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchStats();
      hasFetched.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0E10] text-white p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Network Analytics</h1>
          <p className="text-[#8E9299] text-sm uppercase tracking-widest font-mono">Real-time Data Visualization</p>
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm text-[#8E9299] hover:text-white transition-all border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 font-mono uppercase tracking-tighter">
          <ArrowLeft className="w-4 h-4" /> Exit to Root
        </Link>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#131417] border border-white/5 p-6 rounded-3xl">
             <span className="text-[10px] text-[#FF4444] uppercase tracking-widest font-mono block mb-2">Total Prints</span>
             <div className="text-4xl font-black">{loading ? "..." : stats.total}</div>
          </div>
          <div className="bg-[#131417] border border-white/5 p-6 rounded-3xl">
             <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono block mb-2">Peak Vol</span>
             <div className="text-4xl font-black">{loading ? "..." : stats.peakDay.count}</div>
          </div>
          <div className="bg-[#131417] border border-white/5 p-6 rounded-3xl">
             <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono block mb-2">Daily Avg</span>
             <div className="text-4xl font-black">{loading ? "..." : stats.avgPerDay}</div>
          </div>
          <div className="bg-[#131417] border border-white/5 p-6 rounded-3xl">
             <span className="text-[10px] text-blue-400 uppercase tracking-widest font-mono block mb-2">Peak Hour</span>
             <div className="text-4xl font-black text-sm mt-3 uppercase tracking-widest">{loading ? "..." : stats.mostActiveHour}</div>
          </div>
        </div>

        {/* Graphs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Trend (Last 7 Days) */}
          <div className="bg-[#131417] border border-white/5 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-[#8E9299]">7-Day Trend</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-500">SYSTEM_OVERVIEW</span>
            </div>
            <div className="h-32 flex flex-col justify-center">
              <Sparkline data={stats.dailyHistory.map(d => d.count)} color="#10b981" />
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-mono text-[#4A4B50]">
              <span>T-7 DAYS</span>
              <span>CURRENT_SESSION</span>
            </div>
          </div>

          {/* Today's Activity (Hourly) */}
          <div className="bg-[#131417] border border-white/5 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-[#8E9299]">Today's Activity</h3>
              </div>
              <span className="text-[10px] font-mono text-blue-500">LIVE_METRICS</span>
            </div>
            <div className="h-32 flex flex-col justify-center">
              <Sparkline data={stats.todayHistory.map(h => h.count)} color="#3b82f6" />
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-mono text-[#4A4B50]">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>

        <div className="bg-[#131417] border border-white/5 p-4 rounded-2xl flex items-center justify-center gap-3">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-mono tracking-widest text-[#8E9299]">DAEMON ACTIVE // DATA REFRESHED ON MOUNT</span>
        </div>
      </main>
    </div>
  );
}
