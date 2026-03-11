import { supabase } from "./supabase";
import { useState } from "react";

const resizeImage = (file: File): Promise<Blob> =>
  new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    img.onload = () => {
      const width = 576;
      const scale = width / img.width;
      canvas.width = width;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.9);
    };

    img.src = URL.createObjectURL(file);
  });

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    if (uploading) return;
    setUploading(true);

    try {
      const resizedImage = await resizeImage(file);
      const fileName = `${Date.now()}-${file.name}`;

      // Upload directly to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, resizedImage);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
      const imageUrl = data.publicUrl;

      // Call edge function to insert URL into print_queue
      const res = await fetch("/.netlify/functions/insertPrintQueue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to queue print");
      }

      alert("Uploaded! Your image will print shortly.");
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          if (!e.target.files) return;
          uploadImage(e.target.files[0]);
        }}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}