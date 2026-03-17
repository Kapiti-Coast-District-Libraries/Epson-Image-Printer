/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { supabase } from "./supabase";
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Printer, Settings, Image as ImageIcon, Trash2, RefreshCw, ZoomIn, Contrast, Cpu, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const PRINTER_WIDTHS = {
  '58mm': 384, // Standard 58mm printer dot width
  '80mm': 576, // Standard 80mm printer dot width
};

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [printerWidth, setPrinterWidth] = useState<'58mm' | '80mm'>('80mm');
  const [contrast, setContrast] = useState(1.6);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // USB State
  const [usbDevice, setUsbDevice] = useState<any | null>(null);
  const [usbStatus, setUsbStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [usbError, setUsbError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- WebUSB Integration ---
  const connectUsb = async () => {
    setUsbStatus('connecting');
    setUsbError(null);
    try {
      const device = await (navigator as any).usb.requestDevice({ filters: [] });
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);
      setUsbDevice(device);
      setUsbStatus('connected');
    } catch (err: any) {
      console.error('USB Connection Error:', err);
      setUsbStatus('error');
      setUsbError(err instanceof Error ? err.message : String(err));
    }
  };

  const disconnectUsb = async () => {
    if (usbDevice) {
      await usbDevice.close();
      setUsbDevice(null);
      setUsbStatus('disconnected');
    }
  };

  useEffect(() => {
  autoConnectUsb();
}, []);
  // --- Auto connect if permission already granted ---
const autoConnectUsb = async () => {
  try {
    const devices = await (navigator as any).usb.getDevices();

    if (devices.length > 0) {
      const device = devices[0];

      await device.open();
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }

      await device.claimInterface(0);

      setUsbDevice(device);
      setUsbStatus('connected');
    }
  } catch (err: any) {
    console.error("Auto connect failed:", err);
  }
};
  // --- ESC/POS Encoding ---
  const getEscPosData = (canvas: HTMLCanvasElement): Uint8Array => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return new Uint8Array();

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // ESC/POS Image Command: GS v 0 m xL xH yL yH d1...dk
    // m = 0 (Normal), xL/xH = width in bytes (width/8), yL/yH = height in dots
    const widthInBytes = Math.ceil(width / 8);
    const header = new Uint8Array([
      0x1B, 0x40, // ESC @ (Initialize)
      0x1D, 0x76, 0x30, 0, // GS v 0 0
      widthInBytes % 256, Math.floor(widthInBytes / 256), // xL xH
      height % 256, Math.floor(height / 256) // yL yH
    ]);

    const pixelData = new Uint8Array(widthInBytes * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const gray = data[i]; // Since it's dithered, 0 or 255
        if (gray < 128) {
          const byteIdx = y * widthInBytes + Math.floor(x / 8);
          const bitIdx = 7 - (x % 8);
          pixelData[byteIdx] |= (1 << bitIdx);
        }
      }
    }

    const footer = new Uint8Array([0x0A, 0x0A, 0x0A, 0x1D, 0x56, 0x41, 0x03]); // Line feeds + Cut

    const combined = new Uint8Array(header.length + pixelData.length + footer.length);
    combined.set(header);
    combined.set(pixelData, header.length);
    combined.set(footer, header.length + pixelData.length);

    return combined;
  };


  const handleDirectPrint = async () => {
    if (!usbDevice || !canvasRef.current) return;
    
    try {
      if (!usbDevice.opened) {
        await usbDevice.open();
        await usbDevice.selectConfiguration(1);
        await usbDevice.claimInterface(0);
      }
      
      const data = getEscPosData(canvasRef.current);
      const endpoint = usbDevice.configuration?.interfaces[0].alternate.endpoints.find((e: any) => e.direction === 'out');
      if (!endpoint) throw new Error('No output endpoint found');
      
      await usbDevice.transferOut(endpoint.endpointNumber, data);
      
    } catch (err: any) {
      console.error('Print Error:', err);
      setUsbError('Print failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  // --- Image Processing ---
  const processImage = (imgSrc: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const targetWidth = PRINTER_WIDTHS[printerWidth];
      const scale = targetWidth / img.width;
      const targetHeight = Math.floor(img.height * scale);

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i], g = data[i + 1], b = data[i + 2];
        let gray = 0.299 * r + 0.587 * g + 0.114 * b;
        gray = ((gray / 255 - 0.5) * contrast + 0.5) * 255;
        gray = Math.max(0, Math.min(255, gray));
        data[i] = data[i + 1] = data[i + 2] = gray;
      }

      for (let y = 0; y < targetHeight; y++) {
        for (let x = 0; x < targetWidth; x++) {
          const i = (y * targetWidth + x) * 4;
          const oldPixel = data[i];
          const newPixel = oldPixel < 128 ? 0 : 255;
          const err = oldPixel - newPixel;
          data[i] = data[i + 1] = data[i + 2] = newPixel;
          if (x + 1 < targetWidth) { data[(y * targetWidth + (x + 1)) * 4] += (err * 7) / 16; }
          if (y + 1 < targetHeight) {
            if (x > 0) { data[((y + 1) * targetWidth + (x - 1)) * 4] += (err * 3) / 16; }
            data[((y + 1) * targetWidth + x) * 4] += (err * 5) / 16;
            if (x + 1 < targetWidth) { data[((y + 1) * targetWidth + (x + 1)) * 4] += (err * 1) / 16; }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL('image/png'));
setIsProcessing(false);
// auto print after processing
setTimeout(() => {
  handleDirectPrint();
  console.log("Print Attempted");
}, 100);
    };
    img.src = imgSrc;
  };
  useEffect(() => {
  // Subscribe to the print_queue table for new inserts
  const subscription = supabase
    .channel("print_queue_listener")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "print_queue",
      },
      async (payload) => {
        const row = payload.new;
        if (!row) return;

        // Skip if already processed
        if (row.printed) return;
        console.log(`Found image ${row.image_url}`);

        // Set the image for preview/processing
        setImage(row.image_url);

        try {
          // Delete the row from the table
          await supabase
            .from("print_queue")
            .delete()
            .eq("id", row.id);

          console.log(`Deleted row ${row.id} from print_queue`);
          
          // Delete the image from the bucket
          if (row.image_url) {
  const fileName = row.image_url.split("/").pop();

  const { error } = await supabase.storage
    .from("uploads")
    .remove([fileName]);

  if (error) {
    console.error("Failed to delete image from bucket:", error);
  } else {
    console.log(`Deleted image ${fileName}`);
  }
}
        } catch (err: any) {
          console.error("Failed to process row:", err);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
}, []);

  useEffect(() => {
    if (image) processImage(image);
  }, [image, printerWidth, contrast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E10] text-[#FFFFFF] font-sans selection:bg-[#FF4444] selection:text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-[#131417] sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF4444] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,68,68,0.4)]">
            <Printer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Thermal Print Studio</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8E9299] font-mono">Hardware Direct v2.0</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {usbStatus === 'connected' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-[10px] font-mono uppercase tracking-widest"
              >
                <CheckCircle2 className="w-3 h-3" />
                {usbDevice?.productName || 'USB Printer Connected'}
                <div className="flex items-center gap-2 ml-2 border-l border-emerald-500/20 pl-2">
                  <button onClick={disconnectUsb} className="hover:text-white transition-colors">Disconnect</button>
                  <button onClick={connectUsb} className="text-emerald-500/50 hover:text-white transition-colors" title="Force Reconnect"><RefreshCw className="w-3 h-3" /></button>
                </div>
              </motion.div>
            ) : (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={connectUsb}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-[10px] font-mono uppercase tracking-widest text-[#8E9299] hover:text-white"
              >
                <Cpu className="w-4 h-4" />
                Connect USB Printer
              </motion.button>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2 bg-[#FF4444] hover:bg-[#FF5555] rounded-full transition-all text-sm font-bold shadow-[0_0_20px_rgba(255,68,68,0.2)]"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Controls Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <section className="bg-[#131417] border border-white/5 rounded-3xl p-6 space-y-8 shadow-2xl">
            <div className="flex items-center gap-2 text-[#8E9299]">
              <Settings className="w-4 h-4" />
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-mono">Engine Calibration</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] text-[#8E9299] uppercase tracking-widest font-mono">Paper Standard</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['58mm', '80mm'] as const).map((width) => (
                    <button
                      key={width}
                      onClick={() => setPrinterWidth(width)}
                      className={`py-3 rounded-xl border transition-all text-xs font-bold tracking-widest ${
                        printerWidth === width 
                          ? 'bg-[#FF4444] border-[#FF4444] text-white shadow-[0_0_15px_rgba(255,68,68,0.3)]' 
                          : 'bg-white/5 border-white/10 text-[#8E9299] hover:border-white/20'
                      }`}
                    >
                      {width}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-[#8E9299] uppercase tracking-widest font-mono flex items-center gap-2">
                    <Contrast className="w-3 h-3" /> Contrast Gain
                  </label>
                  <span className="text-[10px] font-mono text-[#FF4444] bg-[#FF4444]/10 px-2 py-0.5 rounded">{contrast.toFixed(1)}x</span>
                </div>
                <input 
                  type="range" min="0.5" max="3" step="0.1" value={contrast} 
                  onChange={(e) => setContrast(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#FF4444]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              {usbStatus === 'connected' ? (
                <button 
                  onClick={handleDirectPrint}
                  disabled={!processedImage}
                  className="w-full py-5 bg-[#FF4444] hover:bg-[#FF5555] disabled:opacity-50 text-white rounded-2xl font-black text-sm tracking-[0.2em] flex flex-col items-center justify-center gap-1 transition-all shadow-[0_10px_30px_rgba(255,68,68,0.4)] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5" />
                    DIRECT USB PRINT
                  </div>
                  <span className="text-[8px] opacity-60 font-mono uppercase tracking-widest">Hardware Direct Output</span>
                </button>
              ) : (
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-[#8E9299] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider">Hardware Link Required</p>
                    <p className="text-[9px] text-[#4A4B50] leading-relaxed">
                      Connect your USB thermal printer to enable direct hardware communication and high-fidelity printing.
                    </p>
                  </div>
                </div>
              )}
              
              {usbError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-500 text-[9px] font-mono uppercase">
                  <AlertCircle className="w-3 h-3" />
                  {usbError}
                </div>
              )}
            </div>
          </section>

          {image && (
            <section className="bg-[#131417] border border-white/5 rounded-3xl p-5 group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8E9299] font-mono">Source Buffer</span>
                <button onClick={() => setImage(null)} className="text-[#8E9299] hover:text-[#FF4444] transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img src={image} className="w-full opacity-40 grayscale group-hover:opacity-60 transition-opacity" alt="Original" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131417] to-transparent"></div>
              </div>
            </section>
          )}
        </aside>

        {/* Preview Area */}
        <div className="lg:col-span-8">
          <div className="bg-[#080809] border border-white/5 rounded-[2.5rem] min-h-[700px] flex flex-col items-center justify-center p-12 relative overflow-hidden shadow-inner">
            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <AnimatePresence mode="wait">
              {!image ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                  className="text-center space-y-6 relative z-10"
                >
                  <div className="w-24 h-24 bg-white/5 border border-dashed border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                    <ImageIcon className="w-10 h-10 text-white/10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white/80 tracking-tight">Awaiting Input</h3>
                  <p className="text-xs text-[#8E9299] max-w-xs mx-auto leading-relaxed uppercase tracking-widest font-mono">
                    Drop an image to begin hardware-accelerated dithering.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  {/* The "Receipt" Paper */}
                  <div 
                    className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out overflow-hidden"
                    style={{ 
                      width: printerWidth === '58mm' ? '320px' : '440px',
                      minHeight: '500px'
                    }}
                  >
                    {/* Paper Texture/Edge */}
                    <div className="h-6 w-full bg-gradient-to-b from-black/10 to-transparent"></div>
                    
                    <div className="p-6 flex flex-col items-center">
                      {isProcessing ? (
                        <div className="py-32 flex flex-col items-center gap-6">
                          <RefreshCw className="w-10 h-10 text-black/10 animate-spin" />
                          <span className="text-[9px] font-mono text-black/30 uppercase tracking-[0.4em]">Compiling Bits...</span>
                        </div>
                      ) : (
                        processedImage && (
                          <motion.img 
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            src={processedImage} 
                            className="w-full h-auto pixelated"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        )
                      )}
                    </div>

                    {/* Jagged Bottom Edge */}
                    <div className="h-6 w-full flex overflow-hidden">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="flex-1 h-full bg-white rotate-45 translate-y-3 border-t border-l border-black/5"></div>
                      ))}
                    </div>
                  </div>

                  {/* Overlay Labels */}
                  <div className="absolute -top-12 left-0 flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#FF4444] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#FF4444]/20">Hardware Preview</span>
                    <span className="text-[8px] text-[#8E9299] font-mono uppercase tracking-[0.2em]">{printerWidth} Virtual Paper</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-8 flex items-center justify-between px-6">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${usbStatus === 'connected' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]' : 'bg-white/10'}`}></div>
                <span className="text-[9px] font-mono text-[#8E9299] uppercase tracking-[0.2em]">USB Link: {usbStatus}</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomIn className="w-3.5 h-3.5 text-[#8E9299]" />
                <span className="text-[9px] font-mono text-[#8E9299] uppercase tracking-[0.2em]">Dither: Floyd-Steinberg</span>
              </div>
            </div>
            <p className="text-[9px] font-mono text-[#8E9299] uppercase tracking-[0.2em]">
              Resolution: {printerWidth === '58mm' ? '384' : '576'} Dots
            </p>
          </div>
        </div>
      </main>

      {/* Hidden Canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 p-10 text-center">
        <p className="text-[9px] font-mono text-[#3A3B40] uppercase tracking-[0.5em]">
          Hardware-Direct Thermal Engine // 2026 Edition
        </p>
      </footer>

      <style>{`
        .pixelated {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #FF4444;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255,68,68,0.5);
          border: 2px solid #0D0E10;
        }
      `}</style>
    </div>
  );
}
