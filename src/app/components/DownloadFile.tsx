"use client";
import { useState } from "react";

export default function DownloadFile() {
  const [status, setStatus] = useState("");

  const downloadFile = async () => {
    setStatus("Preparing...");

    try {
      const response = await fetch("/files/dltest.txt");
      const text = await response.text();

      const fileName = "dltest.txt";

      // Check for File System Access API support
      if ("showSaveFilePicker" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "Text file",
              accept: { "text/plain": [".txt"] },
            },
          ],
        });

        const writable = await handle.createWritable();
        await writable.write(text);
        await writable.close();

        setStatus("✅ Fichier sauvegardé");
      } else {
        // Not supported — fallback
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();

        URL.revokeObjectURL(url);
        setStatus("✅ File downloaded using fallback");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Téléchargement échoué");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        marginTop: "15px",
      }}
    >
      <button
        onClick={downloadFile}
        style={{
          borderRadius: "10px",
          borderColor: "transparent",
          background: "white",
          color: "black",
          fontFamily: "Geist",
          fontWeight: "bold",
          padding: "5px",
          cursor: "pointer",
        }}
      >
        Télécharger le fichier
      </button>
      <p>{status}</p>
    </div>
  );
}
