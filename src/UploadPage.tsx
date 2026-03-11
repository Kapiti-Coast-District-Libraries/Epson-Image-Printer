import { supabase } from "./supabase";
import { useState } from "react";

// Resize image to 576px wide (thermal printer)
const resizeImage = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Cannot get canvas context"));

    img.onload = () => {
      const width = 576;
      const scale = width / img.width;
      canvas.width = width;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Failed to convert canvas to blob"));
          resolve(blob);
        },
        "image/png", // PNG is safe for Supabase Storage
        0.9
      );
    };

    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    if (uploading) return;
    setUploading(true);

    try {
      // Sanitize filename: remove spaces and special characters
      const safeName = `${Date.now()}-${Math.random()}-${file.name}`
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.-]/g, "");

      const resizedBlob = await resizeImage(file);

      // Convert Blob to File with MIME type
      const fileToUpload = new File([resizedBlob], safeName, { type: "image/png" });

      const { error } = await supabase.storage
        .from("uploads")
        .upload(safeName, fileToUpload);

      if (error) {
        console.error("Supabase Upload Error:", error);
        alert("Upload failed");
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from("uploads").getPublicUrl(safeName);
      const imageUrl = data.publicUrl;

      await supabase.from("print_queue").insert([{ image_url: imageUrl }]);

      alert("Uploaded! Your image will print shortly.");
    } catch (err: any) {
      console.error(err);
      alert("Upload failed: " + (err.message || err));
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