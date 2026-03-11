import { supabase } from "./supabase";
import { useState, useEffect } from "react";

// Resize image function (unchanged)
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
        "image/png",
        0.9
      );
    };

    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setLoadingAuth(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      setUser(data.user);
    }
    setLoadingAuth(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const uploadImage = async (file: File) => {
    if (uploading) return;
    setUploading(true);

    try {
      const safeName = `${Date.now()}-${Math.random()}-${file.name}`
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.-]/g, "");

      const resizedBlob = await resizeImage(file);
      const fileToUpload = new File([resizedBlob], safeName, { type: "image/png" });

      const { error } = await supabase.storage.from("uploads").upload(safeName, fileToUpload);
      if (error) throw error;

      const { data } = supabase.storage.from("uploads").getPublicUrl(safeName);

      alert("Uploaded! Public URL: " + data.publicUrl);
    } catch (err: any) {
      console.error(err);
      alert("Upload failed: " + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      {!user ? (
        <div style={{ marginBottom: 20, border: "1px solid #ccc", padding: 20, maxWidth: 300 }}>
          <h3>Sign In</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <button onClick={signIn} disabled={loadingAuth} style={{ width: "100%" }}>
            {loadingAuth ? "Signing in..." : "Sign In"}
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          <p>Signed in as: {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}

      {user && (
        <>
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
        </>
      )}
    </div>
  );
}