"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Trash2, Upload } from "lucide-react";

export default function MediaPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const loadFiles = () => {
    fetch("/api/media")
      .then((r) => r.json())
      .then((data) => setFiles(data.files || []));
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/upload", { method: "POST", body: formData });
    loadFiles();
    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const deleteFile = async (filename: string) => {
    if (!confirm("Delete this file?")) return;
    await fetch(`/api/media/${encodeURIComponent(filename)}`, {
      method: "DELETE",
    });
    loadFiles();
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-white mb-8">Media</h1>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center mb-8 transition-colors ${
          dragOver
            ? "border-accent bg-accent/5"
            : "border-border-subtle hover:border-text-mono"
        }`}
      >
        <Upload size={32} className="mx-auto text-text-mono mb-3" />
        <p className="font-body text-sm text-text-secondary mb-2">
          Drag and drop an image here, or click to browse
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="text-sm text-text-secondary font-body"
        />
        {uploading && (
          <p className="text-xs text-accent font-mono mt-2">Uploading...</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file}
            className="group relative bg-surface-raised border border-border-subtle rounded-lg overflow-hidden"
          >
            <div className="aspect-square bg-surface">
              <img
                src={`/uploads/${file}`}
                alt={file}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="font-mono text-[10px] text-text-mono truncate">
                {file}
              </p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => copyUrl(`/uploads/${file}`)}
                className="p-1.5 bg-black/70 rounded hover:bg-accent transition-colors"
                title="Copy URL"
              >
                <Copy size={12} className="text-white" />
              </button>
              <button
                onClick={() => deleteFile(file)}
                className="p-1.5 bg-black/70 rounded hover:bg-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 size={12} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
