import React, { useEffect, useState, useRef } from 'react';
import { supabase } from "./supabase";
import { 
  BarChart3, ArrowLeft, Clock, List, Calendar, Activity, 
  PieChart, TrendingUp, Sparkles, Layers, RefreshCw 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface PrintLog {
  created_at: string;
  print_type: string;
  timeLabel: string;
}

interface DailyPoint {
  date: string;
  count: number;
}

interface CategoryMeta {
  label: string;
  count: number;
  pct: number;
  color: string;
  bg: string;
  border: string;
}

const CATEGORY_THEMES: Record<string, { color: string; bg: string; border: string }> = {
  'Kupu o te Rā': { color: '#f43f5e', bg: 'bg-rose-500/10 text-rose-400', border: 'border-rose-500/30' },
  'Weather': { color: '#0ea5e9', bg: 'bg-sky-500/10 text-sky-400', border: 'border-sky-500/30' },
  'Sudoku': { color: '#10b981', bg: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/30' },
  'On This Day': { color: '#f59e0b', bg: 'bg-amber-500/10 text-amber-400', border: 'border-amber-500/30' },
  'Uploaded Image': { color: '#a855f7', bg: 'bg-purple-500/10 text-purple-400', border: 'border-purple-500/30' }
};

const DEFAULT_THEME = { color: '#6366f1', bg: 'bg-indigo-500/10 text-indigo-400', border: 'border-indigo-500/30' };

// Normalize legacy/varied print_type database values into standard categories
const normalizeCategory = (rawType: string | null | undefined): string => {
  if (!rawType || rawType.trim() === '') return 'Uploaded Image';
  const t = rawType.trim().toLowerCase();
  if (t.includes('kupu') || t.includes('maori')) return 'Kupu o te Rā';
  if (t.includes('weather')) return 'Weather';
  if (t.includes('sudoku')) return 'Sudoku';
  if (t.includes('history') || t.includes('day') || t.includes('on this')) return 'On This Day';
  if (t.includes('upload') || t.includes('custom') || t.includes('image')) return 'Uploaded Image';
  return rawType;
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [totalUnique, setTotalUnique] = useState(0);
  const [avgPerDay, setAvgPerDay] = useState(0);
  const [peakDay, setPeakDay] = useState({ date: '-', count: 0 });
  const [todayTotal, setTodayTotal] = useState(0);
  
  const [hourlyStats, setHourlyStats] = useState<number[]>(new Array(24).fill(0));
  const [dailyTrend, setDailyTrend] = useState<DailyPoint[]>([]);
  const [categories, setCategories] = useState<CategoryMeta[]>([]);
  const [todayLogs, setTodayLogs] = useState<PrintLog[]>([]);
  const [timeFilter, setTimeFilter] = useState<'all' | '7d'>('7d');

  const hasFetched = useRef(false);

  const fetchStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('print_logs')
      .select('created_at, print_type')
      .order('created_at', { ascending: true });

    if (!error && data) {
      const now = new Date();

      // Check if a timestamp is on today's calendar date in local time
      const isToday = (d: Date) => 
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate();

      // 1. Deduplicate consecutive logs within 3 seconds
      const uniqueLogs = data.reduce((acc: any[], current: any) => {
        if (acc.length === 0) return [current];
        const lastTime = new Date(acc[acc.length - 1].created_at).getTime();
        const currTime = new Date(current.created_at).getTime();
        if (Math.abs(lastTime - currTime) > 3000) acc.push(current);
        return acc;
      }, []);

      setTotalUnique(uniqueLogs.length);

      // 2. Process Statistics
      const dailyMap: Record<string, number> = {};
      const catMap: Record<string, number> = {};
      const todayHourly = new Array(24).fill(0);
      const todayLogsList: PrintLog[] = [];

      uniqueLogs.forEach((log) => {
        const d = new Date(log.created_at);
        const dateKey = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        const typeKey = normalizeCategory(log.print_type);

        // Daily trend tracking
        dailyMap[dateKey] = (dailyMap[dateKey] || 0) + 1;

        // Category popularity tracking
        catMap[typeKey] = (catMap[typeKey] || 0) + 1;

        // Today's hourly tracking
        if (isToday(d)) {
          todayHourly[d.getHours()]++;
          todayLogsList.push({
            created_at: log.created_at,
            print_type: typeKey,
            timeLabel: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          });
        }
      });

      // Peak Day calculation
      const peakEntry = Object.entries(dailyMap).reduce((a, b) => (a[1] > b[1] ? a : b), ['-', 0]);
      setPeakDay({ date: peakEntry[0], count: peakEntry[1] as number });

      // Daily Average calculation
      const totalDays = Object.keys(dailyMap).length || 1;
      setAvgPerDay(Math.round(uniqueLogs.length / totalDays));

      // Trend Series
      const trendPoints: DailyPoint[] = Object.entries(dailyMap).map(([date, count]) => ({ date, count }));
      setDailyTrend(trendPoints);

      // Categories with Percentages
      const catMetaList: CategoryMeta[] = Object.entries(catMap).map(([label, count]) => {
        const theme = CATEGORY_THEMES[label] || DEFAULT_THEME;
        return {
          label,
          count,
          pct: Math.round((count / (uniqueLogs.length || 1)) * 100),
          color: theme.color,
          bg: theme.bg,
          border: theme.border
        };
      }).sort((a, b) => b.count - a.count);

      setCategories(catMetaList);
      setHourlyStats(todayHourly);
      setTodayTotal(todayLogsList.length);
      setTodayLogs(todayLogsList.reverse());
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchStats();
      hasFetched.current = true;
    }
  }, []);

  // Filtered Trend Data
  const visibleTrend = timeFilter === '7d' ? dailyTrend.slice(-7) : dailyTrend;
  const maxTrendValue = Math.max(...visibleTrend.map(d => d.count), 1);
  const maxHourValue = Math.max(...hourlyStats, 1);

  // Smooth SVG Path Builder for Area Graph
  const buildSvgPath = (points: DailyPoint[], width: number, height: number) => {
    if (points.length < 2) return { line: '', area: '', coords: [] };

    const paddingX = 40;
    const paddingY = 30;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - paddingY * 2;

    const coords = points.map((p, i) => {
      const x = paddingX + (i / (points.length - 1)) * usableWidth;
      const y = height - paddingY - (p.count / maxTrendValue) * usableHeight;
      return { x, y };
    });

    let linePath = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cpX = (curr.x + next.x) / 2;
      linePath += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }

    const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;

    return { line: linePath, area: areaPath, coords };
  };

  const svgDimensions = { width: 700, height: 220 };
  const graphPaths = buildSvgPath(visibleTrend, svgDimensions.width, svgDimensions.height);

  // Dynamic SVG Donut Calculations
  const donutRadius = 42;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let accumulatedOffset = 0;

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white p-6 md:p-10 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Telemetry & Visual Analytics
          </div>
          <h1 className="text-3xl font-black tracking-tight">Print System Operations</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchStats}
            className="flex items-center gap-2 text-xs text-[#8E9299] hover:text-white border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-all font-mono"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> REFRESH
          </button>
          <Link to="/" className="flex items-center gap-2 text-xs text-[#8E9299] hover:text-white border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-all font-mono">
            <ArrowLeft className="w-3 h-3" /> BACK_TO_STUDIO
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121318] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-blue-400 mb-3 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" /> Total Volume</span>
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[9px]">LIFETIME</span>
            </div>
            <div className="text-4xl font-black tracking-tight">{loading ? "..." : totalUnique}</div>
            <p className="text-[#5A5C63] text-[10px] mt-2 font-mono uppercase">Unique prints completed</p>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
              <BarChart3 className="w-24 h-24 text-blue-400" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#121318] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-amber-400 mb-3 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Peak Day</span>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[9px]">RECORD</span>
            </div>
            <div className="text-4xl font-black tracking-tight">{loading ? "..." : peakDay.count}</div>
            <p className="text-[#5A5C63] text-[10px] mt-2 font-mono uppercase italic">{peakDay.date}</p>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
              <Calendar className="w-24 h-24 text-amber-400" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121318] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-emerald-400 mb-3 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Daily Pace</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px]">AVERAGE</span>
            </div>
            <div className="text-4xl font-black tracking-tight">{loading ? "..." : avgPerDay}</div>
            <p className="text-[#5A5C63] text-[10px] mt-2 font-mono uppercase">Prints per operating day</p>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity className="w-24 h-24 text-emerald-400" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#121318] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-purple-400 mb-3 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Today's Volume</span>
              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded text-[9px]">ACTIVE</span>
            </div>
            <div className="text-4xl font-black tracking-tight">{loading ? "..." : todayTotal}</div>
            <p className="text-[#5A5C63] text-[10px] mt-2 font-mono uppercase">Jobs printed today</p>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
              <Clock className="w-24 h-24 text-purple-400" />
            </div>
          </motion.div>
        </div>

        {/* SECTION: PRINT VOLUME TREND GRAPH */}
        <div className="bg-[#121318] border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest">
              <TrendingUp className="w-4 h-4" /> Print Volume Trajectory
            </div>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-full p-1 text-[10px] font-mono">
              <button
                onClick={() => setTimeFilter('7d')}
                className={`px-3 py-1 rounded-full transition-all ${timeFilter === '7d' ? 'bg-blue-500 text-white font-bold' : 'text-[#8E9299] hover:text-white'}`}
              >
                7 DAYS
              </button>
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${timeFilter === 'all' ? 'bg-blue-500 text-white font-bold' : 'text-[#8E9299] hover:text-white'}`}
              >
                ALL TIME
              </button>
            </div>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-[#5A5C63] font-mono text-xs">LOADING_TELEMETRY...</div>
          ) : visibleTrend.length < 2 ? (
            <div className="h-48 flex items-center justify-center text-[#5A5C63] font-mono text-xs italic">Insufficient data points to render trend line</div>
          ) : (
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`} className="w-full h-56 overflow-visible">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                  const y = 30 + ratio * (svgDimensions.height - 60);
                  return (
                    <line key={idx} x1="40" y1={y} x2={svgDimensions.width - 40} y2={y} stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
                  );
                })}

                <path d={graphPaths.area} fill="url(#areaGradient)" />
                <path d={graphPaths.line} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                {graphPaths.coords?.map((pt, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#121318" stroke="#3b82f6" strokeWidth="2.5" className="group-hover:r-7 transition-all" />
                    <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" className="opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {visibleTrend[i].count}
                    </text>
                    <text x={pt.x} y={svgDimensions.height - 8} textAnchor="middle" fill="#5A5C63" fontSize="9" fontFamily="monospace">
                      {visibleTrend[i].date}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )}
        </div>

        {/* SECTION: CATEGORY POPULARITY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Donut Chart */}
          <div className="lg:col-span-5 bg-[#121318] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest mb-4">
              <PieChart className="w-4 h-4" /> Category Distribution
            </div>

            {loading ? (
              <div className="h-48 flex items-center justify-center text-[#5A5C63] font-mono text-xs">PROCESSING...</div>
            ) : categories.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-[#5A5C63] font-mono text-xs italic">No category logs available</div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                <div className="relative w-36 h-36 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                    <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#1f2028" strokeWidth="12" />
                    {categories.map((cat, idx) => {
                      const strokeLength = (cat.pct / 100) * donutCircumference;
                      const strokeOffset = -accumulatedOffset;
                      accumulatedOffset += strokeLength;
                      return (
                        <circle
                          key={idx}
                          cx="50"
                          cy="50"
                          r={donutRadius}
                          fill="none"
                          stroke={cat.color}
                          strokeWidth="12"
                          strokeDasharray={`${strokeLength} ${donutCircumference}`}
                          strokeDashoffset={strokeOffset}
                          className="transition-all duration-500"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-xl font-black">{totalUnique}</span>
                    <span className="text-[8px] font-mono text-[#5A5C63] uppercase">Total Prints</span>
                  </div>
                </div>

                <div className="space-y-2 w-full sm:w-auto font-mono text-xs">
                  {categories.map((cat) => (
                    <div key={cat.label} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <span className="text-[#8E9299] text-[11px] truncate max-w-[110px]">{cat.label}</span>
                      </div>
                      <span className="font-bold">{cat.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category Cards */}
          <div className="lg:col-span-7 bg-[#121318] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-6">
              <Layers className="w-4 h-4" /> Category Breakdown Metrics
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div key={cat.label} className={`border ${cat.border} bg-white/[0.02] p-4 rounded-xl flex flex-col justify-between space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.border} ${cat.bg}`}>
                      {cat.label}
                    </span>
                    <span className="text-xs font-mono text-[#5A5C63]">{cat.pct}%</span>
                  </div>
                  
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-3xl font-black">{cat.count}</span>
                    <span className="text-[10px] font-mono text-[#5A5C63] uppercase">Printed Items</span>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cat.pct}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: TODAY'S HOURLY & LIVE FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Hourly Bar Chart */}
          <div className="lg:col-span-2 bg-[#121318] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#8E9299]">24-Hour Activity Spread</h2>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold block">{todayTotal}</span>
                <span className="text-[9px] font-mono text-[#5A5C63] uppercase">Today Total</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between gap-1.5 h-44 px-2">
              {hourlyStats.map((count, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-sky-500/20 group-hover:bg-sky-400/60 transition-all rounded-t-sm relative"
                    style={{ height: `${(count / maxHourValue) * 100}%`, minHeight: count > 0 ? '6px' : '2px' }}
                  >
                    {count > 0 && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-sky-500 text-black font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="text-[8px] font-mono text-[#333] hidden md:block">
                    {i % 4 === 0 ? `${i}h` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Live Feed */}
          <div className="bg-[#121318] border border-white/5 rounded-2xl flex flex-col h-[340px] lg:h-auto overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <List className="w-3.5 h-3.5 text-[#8E9299]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299]">Today's Activity Feed</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 font-mono">
              {loading ? (
                <div className="text-[#5A5C63] text-[10px]">FETCHING_LOGS...</div>
              ) : todayLogs.length === 0 ? (
                <div className="text-[#5A5C63] text-[10px] h-full flex items-center justify-center italic">No activity logged today</div>
              ) : (
                todayLogs.map((log, i) => {
                  const theme = CATEGORY_THEMES[log.print_type] || DEFAULT_THEME;
                  return (
                    <div key={i} className="flex items-center justify-between text-xs border-b border-white/[0.03] pb-2">
                      <span className="text-sky-400/90 text-[11px]">[{log.timeLabel}]</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${theme.border} ${theme.bg}`}>
                        {log.print_type}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#121318] border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
           <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
             <span className="text-[10px] font-mono tracking-[0.2em] text-[#8E9299]">REALTIME_TELEMETRY // OPERATIONAL</span>
           </div>
           <span className="text-[10px] font-mono text-[#4A4B50] uppercase">Normalized Categories & Local Date Matching</span>
        </div>
      </main>
    </div>
  );
}
