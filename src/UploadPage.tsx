import { supabase } from "./supabase";
import { useState } from "react";

const resizeImage = (file: File): Promise<Blob> =>
  new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    img.onload = () => {
      const width = 576; // thermal printer width
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

    const fileName = `${Date.now()}-${Math.random()}-${file.name}`;

    const resizedImage = await resizeImage(file);

const { error } = await supabase.storage
  .from("uploads")
  .upload(fileName, resizedImage);

    if (error) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    await supabase
      .from("print_queue")
      .insert([{ image_url: imageUrl }]);

    alert("Uploaded! Your image will print shortly.");

    setUploading(false);
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