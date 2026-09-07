"use client";

import { useState, useRef } from "react";
import { services } from "@/data/services";
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
    const newFiles = Array.from(fileList);

    if (files.length + newFiles.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    for (const file of newFiles) {
      const result = validateFile(file);
      if (!result.valid) {
        setError(result.error);
        return;
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Attach Drawings / Specifications
      </label>
      <div
        className={`border-2 border-dashed p-6 text-center transition-colors ${
          dragOver ? "border-brand-red bg-red-50" : "border-gray-300 bg-gray-50"
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
        <p className="text-sm text-gray-600">
          Drag and drop files here, or{" "}
          <button
            type="button"
            className="font-semibold text-brand-red hover:underline"
            onClick={() => inputRef.current?.click()}
          >
            browse
          </button>
        </p>
        <p id="file-help" className="mt-2 text-xs text-gray-500">
          Allowed: PDF, DWG, DXF, STEP, JPG, PNG, ZIP — Max {formatFileSize(MAX_FILE_SIZE)} per file, {MAX_FILES} files
        </p>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <span className="truncate text-gray-700">
                {file.name} ({formatFileSize(file.size)})
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="ml-2 text-brand-red hover:underline"
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
