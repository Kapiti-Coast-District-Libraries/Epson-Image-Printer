import React, { useEffect, useState, useRef } from 'react';
import { supabase } from "./supabase";
import { BarChart3, ArrowLeft, Clock, Zap, List } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrintLog {
  created_at: string;
  timeLabel: string;
}

export default function AdminPage() {
  const [todayLogs, setTodayLogs] = useState<PrintLog[]>([]);
  const [hourlyStats, setHourlyStats] = useState<number[]>(new Array(24).fill(0));
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchStats = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('print_logs')
      .select('created_at')
      .order('created_at', { ascending: false }); // Newest first

    if (!error && data) {
      const today = new Date().toLocaleDateString();
      
      // 1. Deduplicate & Filter for Today
      const filtered = data.reduce((acc: any[], current: any) => {
        if (acc.length === 0) return [current];
        const lastTime = new Date(acc[0].created_at).getTime(); // Compare with most recent
        const currTime = new Date(current.created_at).getTime();
        
        // Only keep if it's unique (5s gap)
        // Note: Logic flipped slightly because we are descending
        if (Math.abs(lastTime - currTime) > 5000) {
          acc.push(current);
        }
        return acc;
      }, []);

      const todayOnly: PrintLog[] = [];
      const hourBins = new Array(24).fill(0);

      filtered.forEach((log) => {
        const d = new Date(log.created_at);
        if (d.toLocaleDateString() === today) {
          todayOnly.push({
            created_at: log.created_at,
            timeLabel: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          });
          hourBins[d.getHours()]++;
        }
      });

      setTodayLogs(todayOnly);
      setHourlyStats(hourBins);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchStats();
      hasFetched.current = true;
    }
  }, []);

  const maxHourValue = Math.max(...hourlyStats, 1);

  return (
    <div className="min-h-screen bg-[#0D0E10] text-white p-6 font-sans">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase">Admin Terminal</span>
          </div>
          <h1 className="text-2xl font-bold italic tracking-tight">TODAY'S_ACTIVITY</h1>
        </div>
        <Link to="/" className="flex items-center gap-2 text-xs text-[#8E9299] hover:text-white transition-all border border-white/5 bg-white/5 px-4 py-2 rounded-lg font-mono">
          <ArrowLeft className="w-3 h-3" /> RETURN_TO_BASE
        </Link>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Hourly Volume (Visual Bar Chart) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#131417] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#8E9299]">Hourly Distribution</h2>
              </div>
              <span className="text-[10px] font-mono text-[#4A4B50]">00:00 - 23:59</span>
            </div>
            
            <div className="flex items-end justify-between gap-1 h-32 px-2">
              {hourlyStats.map((count, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-blue-500/20 group-hover:bg-blue-500/40 transition-all rounded-t-sm relative"
                    style={{ height: `${(count / maxHourValue) * 100}%`, minHeight: count > 0 ? '4px' : '1px' }}
                  >
                    {count > 0 && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="text-[8px] font-mono text-[#333] hidden md:block">
                    {i % 4 === 0 ? i : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#131417] border border-white/5 p-6 rounded-2xl">
              <Zap className="w-4 h-4 text-yellow-400 mb-3" />
              <div className="text-3xl font-black">{todayLogs.length}</div>
              <div className="text-[10px] font-mono text-[#4A4B50] uppercase mt-1">Prints Today</div>
            </div>
            <div className="bg-[#131417] border border-white/5 p-6 rounded-2xl">
              <Clock className="w-4 h-4 text-emerald-400 mb-3" />
              <div className="text-3xl font-black">
                {todayLogs.length > 0 ? todayLogs[0].timeLabel.split(' ')[0] : "--:--"}
              </div>
              <div className="text-[10px] font-mono text-[#4A4B50] uppercase mt-1">Last Activity</div>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Feed */}
        <div className="bg-[#131417] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
            <List className="w-3 h-3 text-[#8E9299]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299]">Live Timestamp Log</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono scrollbar-hide">
            {loading ? (
              <div className="text-[#4A4B50] text-[10px]">INITIALIZING_SCAN...</div>
            ) : todayLogs.length === 0 ? (
              <div className="text-[#4A4B50] text-[10px]">NO_DATA_FOR_CURRENT_PERIOD</div>
            ) : (
              todayLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] border-b border-white/[0.02] pb-2">
                  <span className="text-blue-500/80">[{log.timeLabel}]</span>
                  <span className="text-[#8E9299]">PRINT_SUCCESS</span>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
