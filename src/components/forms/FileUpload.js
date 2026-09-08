"use client";

import { useRef, useState } from "react";
import {
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_FILES,
  validateFile,
} from "@/lib/validation";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload({ files, setFiles, error, setError }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList) => {
    setError(null);
    const incoming = Array.from(fileList);

    if (files.length + incoming.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    for (const file of incoming) {
      const result = validateFile(file);
      if (!result.valid) {
        setError(result.error);
        return;
      }
    }

    setFiles((prev) => [...prev, ...incoming]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
        Attach Drawings / Specifications
      </label>

      <div
        className={`rounded-2xl border border-dashed p-6 text-center transition-all duration-300 sm:p-8 ${
          dragOver
            ? "border-brand-red bg-brand-red/[0.07]"
            : "border-white/[0.16] bg-white/[0.025] hover:border-white/28"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED_EXTENSIONS.join(",")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          aria-describedby="file-help"
        />

        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-brand-red/20 bg-brand-red/10 text-brand-red-bright">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </span>

        <p className="mt-4 text-[13.5px] text-white/75">
          Drag and drop files here, or{" "}
          <button
            type="button"
            className="font-bold text-brand-red-bright underline-offset-4 transition-colors hover:text-brand-red hover:underline"
            onClick={() => inputRef.current?.click()}
          >
            browse files
          </button>
        </p>

        <p id="file-help" className="mt-3 text-[11px] leading-relaxed text-brand-faint">
          PDF · DWG · DXF · STEP · JPG · PNG · ZIP — max {formatFileSize(MAX_FILE_SIZE)} per file,{" "}
          {MAX_FILES} files
        </p>
      </div>

      {error && (
        <p className="mt-2.5 rounded-lg border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-3.5 space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3"
            >
              <span className="flex min-w-0 items-center gap-3">
                <svg className="h-4 w-4 shrink-0 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-white">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-brand-faint">
                    {formatFileSize(file.size)}
                  </span>
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="shrink-0 rounded-full px-2 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-brand-red transition-colors hover:bg-brand-red/10 hover:text-brand-red-bright"
                aria-label={`Remove ${file.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
