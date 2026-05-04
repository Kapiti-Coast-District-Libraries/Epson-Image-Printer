import React, { useEffect, useState, useRef } from 'react';
import { supabase } from "./supabase";
import { BarChart3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const [totalPrints, setTotalPrints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchStats = async () => {
    setLoading(true);
    
    // 1. Fetch the actual created_at timestamps for all logs
    const { data, error } = await supabase
      .from('print_logs')
      .select('created_at')
      .order('created_at', { ascending: true });

    if (!error && data) {
      // 2. Filter out "double-ups" (logs within 5 seconds of each other)
      const uniqueLogs = data.reduce((acc: any[], current: any) => {
        if (acc.length === 0) return [current];
        
        const lastLogTime = new Date(acc[acc.length - 1].created_at).getTime();
        const currentLogTime = new Date(current.created_at).getTime();
        
        // If the gap is more than 5 seconds (5000ms), it's a unique print
        if (currentLogTime - lastLogTime > 5000) {
          acc.push(current);
        }
        
        return acc;
      }, []);

      setTotalPrints(uniqueLogs.length);
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
      <header className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Print Analytics</h1>
          <p className="text-[#8E9299] text-sm uppercase tracking-widest font-mono">System Usage Overview (Deduplicated)</p>
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm text-[#8E9299] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Terminal
        </Link>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131417] border border-white/5 p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 text-[#FF4444] mb-4">
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-widest font-mono">Total Unique Prints</span>
          </div>
          <div className="text-5xl font-black">
            {loading ? "..." : totalPrints}
          </div>
        </div>

        <div className="md:col-span-2 bg-[#131417] border border-white/5 p-8 rounded-3xl shadow-xl flex items-center justify-center">
          <p className="text-[#4A4B50] font-mono text-xs uppercase tracking-[0.3em]">Engagement Stats Coming Soon</p>
        </div>
      </main>
    </div>
  );
}
