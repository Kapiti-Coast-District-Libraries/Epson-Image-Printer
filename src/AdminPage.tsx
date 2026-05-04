import React, { useEffect, useState, useRef } from 'react';
import { supabase } from "./supabase";
import { BarChart3, ArrowLeft, Calendar, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrintStats {
  total: number;
  peakDay: { date: string; count: number };
  avgPerDay: number;
  mostActiveHour: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<PrintStats>({
    total: 0,
    peakDay: { date: '-', count: 0 },
    avgPerDay: 0,
    mostActiveHour: '-'
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
      // 1. Filter out "double-ups" (logs within 5 seconds of each other)
      const uniqueLogs = data.reduce((acc: any[], current: any) => {
        if (acc.length === 0) return [current];
        
        const lastLogTime = new Date(acc[acc.length - 1].created_at).getTime();
        const currentLogTime = new Date(current.created_at).getTime();
        
        if (currentLogTime - lastLogTime > 5000) {
          acc.push(current);
        }
        
        return acc;
      }, []);

      // 2. Statistical Analysis
      const dailyCounts: Record<string, number> = {};
      const hourlyCounts: Record<number, number> = {};

      uniqueLogs.forEach(log => {
        const dateObj = new Date(log.created_at);
        
        // Key for day (e.g., "Oct 24, 2023")
        const dateKey = dateObj.toLocaleDateString(undefined, { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
        
        // Key for hour (0-23)
        const hourKey = dateObj.getHours();

        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
        hourlyCounts[hourKey] = (hourlyCounts[hourKey] || 0) + 1;
      });

      // Find Busiest Day
      const peakDayEntry = Object.entries(dailyCounts).reduce(
        (a, b) => (a[1] > b[1] ? a : b), 
        ['No Data', 0]
      );

      // Find Most Active Hour
      const peakHourEntry = Object.entries(hourlyCounts).reduce(
        (a, b) => (a[1] > b[1] ? a : b), 
        ['0', 0]
      );
      
      const hourNum = parseInt(peakHourEntry[0]);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = `${hourNum % 12 || 12}:00 ${ampm}`;

      setStats({
        total: uniqueLogs.length,
        peakDay: { date: peakDayEntry[0], count: peakDayEntry[1] },
        avgPerDay: Math.round(uniqueLogs.length / (Object.keys(dailyCounts).length || 1)),
        mostActiveHour: displayHour
      });
    } else if (error) {
      console.error("Error fetching stats:", error);
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
    <div className="min-h-screen bg-[#0D0E10] text-white p-8">
      <header className="max-w-5xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">System Analytics</h1>
          <p className="text-[#8E9299] text-sm uppercase tracking-widest font-mono">
            Traffic & Volume Report
          </p>
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm text-[#8E9299] hover:text-white transition-all border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
          <ArrowLeft className="w-4 h-4" /> Back to Terminal
        </Link>
      </header>

      <main className="max-w-5xl mx-auto space-y-6">
        {/* Top Row: Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Unique Prints */}
          <div className="bg-[#131417] border border-white/5 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 text-[#FF4444] mb-4">
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-widest font-mono">Gross Volume</span>
            </div>
            <div className="text-5xl font-black">
              {loading ? "..." : stats.total}
            </div>
            <p className="text-[#4A4B50] text-xs mt-4 uppercase font-mono tracking-tighter">Total Unique Entries</p>
          </div>

          {/* Peak Volume Day */}
          <div className="bg-[#131417] border border-white/5 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 text-amber-400 mb-4">
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-widest font-mono">Busiest Day</span>
            </div>
            <div className="text-5xl font-black">
              {loading ? "..." : stats.peakDay.count}
            </div>
            <p className="text-[#4A4B50] text-xs mt-4 uppercase font-mono tracking-tighter">
              Record set on {stats.peakDay.date}
            </p>
          </div>

          {/* Daily Average */}
          <div className="bg-[#131417] border border-white/5 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <Activity className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-widest font-mono">Daily Velocity</span>
            </div>
            <div className="text-5xl font-black">
              {loading ? "..." : stats.avgPerDay}
            </div>
            <p className="text-[#4A4B50] text-xs mt-4 uppercase font-mono tracking-tighter">Average prints per day</p>
          </div>
        </div>

        {/* Bottom Row: Insights */}
        <div className="bg-[#131417] border border-white/5 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-500/10 rounded-2xl">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-[#4A4B50] text-[10px] uppercase tracking-[0.3em] font-mono">Peak Engagement Hour</p>
              <h2 className="text-2xl font-bold">{loading ? "Calculating..." : `Around ${stats.mostActiveHour}`}</h2>
            </div>
          </div>
          
          <div className="hidden md:block h-12 w-[1px] bg-white/10" />

          <div className="text-center md:text-right">
            <p className="text-[#4A4B50] text-[10px] uppercase tracking-[0.3em] font-mono mb-1">System Health</p>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-mono">OPERATIONAL</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
