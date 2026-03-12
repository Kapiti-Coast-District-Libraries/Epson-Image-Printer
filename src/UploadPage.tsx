import { supabase } from "./supabase";
import { useState, useRef } from "react";

// Resize image to 576px wide
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

      canvas.toBlob((blob) => {
        if (!blob) return reject("Blob conversion failed");
        resolve(blob);
      }, "image/png");
    };

    img.src = URL.createObjectURL(file);
  });

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImage = async (file: File) => {
    if (uploading) return;

    setUploading(true);

    try {
      const safeName = `${Date.now()}-${Math.random()}-${file.name}`
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.-]/g, "");

      const resizedBlob = await resizeImage(file);

      const fileToUpload = new File([resizedBlob], safeName, {
        type: "image/png",
      });

      const { error } = await supabase.storage
        .from("uploads")
        .upload(safeName, fileToUpload);

      if (error) throw error;

      const { data } = supabase.storage.from("uploads").getPublicUrl(safeName);

      await supabase.from("print_queue").insert([
        {
          image_url: data.publicUrl,
        },
      ]);

      alert("Uploaded! Your image will print shortly.");

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.page}>
      <button
        style={styles.button}
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? "Uploading..." : "Tap to Upload Photo"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files) return;
          uploadImage(e.target.files[0]);
        }}
      />
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: 20,
  },

  button: {
    width: "90%",
    maxWidth: 500,
    height: "60vh",
    fontSize: "28px",
    fontWeight: "bold",
    borderRadius: "20px",
    border: "none",
    background: "#000",
    color: "white",
    cursor: "pointer",
  },
};