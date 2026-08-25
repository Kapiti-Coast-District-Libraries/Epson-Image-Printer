import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import { generateSudokuImage, dataURLtoFile } from './utils/sudoku';

export function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setStatus('');
    }
  };

  const submitPrintJob = async (fileToUpload: File) => {
    setIsSubmitting(true);
    setStatus('Sending to printer...');

    try {
      const fileName = `${Date.now()}_${fileToUpload.name}`;
      const { error: uploadError } = await supabase.storage
        .from('prints')
        .upload(fileName, fileToUpload);

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from('prints')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('print_jobs')
        .insert([{ image_url: publicData.publicUrl, status: 'pending' }]);

      if (dbError) throw dbError;

      setStatus('✅ Sent to printer queue successfully!');
      setFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      console.error('Print failed:', err);
      setStatus(`❌ Error: ${err.message || 'Failed to print'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintSudoku = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus('🎲 Scraper active: generating daily Sudoku...');

    try {
      const dataUrl = await generateSudokuImage();
      const sudokuFile = dataURLtoFile(dataUrl, `sudoku_${Date.now()}.png`);
      await submitPrintJob(sudokuFile);
    } catch (err: any) {
      console.error(err);
      setStatus('❌ Failed to generate Sudoku.');
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  // Handle press of "1" key globally
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement;
      const isInputField =
        activeEl &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName) ||
          activeEl.isContentEditable);

      if (!isInputField && event.key === '1') {
        event.preventDefault();
        handlePrintSudoku();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrintSudoku]);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      submitPrintJob(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Thermal Printer Hub
        </h1>

        {/* Sudoku Action Button */}
        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-center space-y-2">
          <p className="text-xs text-purple-700 font-semibold uppercase tracking-wider">
            Instant Action (Press '1')
          </p>
          <button
            type="button"
            onClick={handlePrintSudoku}
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold rounded-lg shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>🧩</span>
            <span>{isSubmitting ? 'Generating...' : 'Print Daily Sudoku'}</span>
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">
            Or upload photo
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Standard Image Upload Form */}
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Photo to Print
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />

          {previewUrl && (
            <div className="mt-4 rounded-lg overflow-hidden border">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="max-h-64 w-full object-contain bg-black/5"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!file || isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition disabled:opacity-50"
          >
            Print Custom Photo
          </button>
        </form>

        {status && (
          <div className="p-3 bg-gray-100 rounded-lg text-center text-sm font-medium text-gray-700">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
