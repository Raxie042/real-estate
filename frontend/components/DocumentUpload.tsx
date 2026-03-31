'use client';

import { useState } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/lib/toast';

interface FileWithPreview extends File {
  preview?: string;
}

interface DocumentUploadProps {
  listingId?: string;
  onUploadComplete?: (fileUrl: string) => void;
  acceptedTypes?: string;
  maxSize?: number;
}

export default function DocumentUpload({
  listingId,
  onUploadComplete,
  acceptedTypes = 'application/pdf,image/*',
  maxSize = 10485760, // 10MB
}: DocumentUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const { success, error: showError } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      })
    );
    setFiles((prev) => [...prev, ...filesWithPreview]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.split(',').reduce((acc, type) => ({ ...acc, [type.trim()]: [] }), {}),
    maxSize,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const file = prev[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        if (listingId) formData.append('listingId', listingId);

        // In a real app, this would upload to your backend
        // For demo purposes, we'll simulate an upload
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUrl = `https://example.com/documents/${file.name}`;
        onUploadComplete?.(mockUrl);
      }

      success(`${files.length} file(s) uploaded successfully!`);
      setFiles([]);
    } catch (err) {
      showError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-[#C9A96A] bg-[#F6F2EC]'
            : 'border-[#E8E1D7] hover:border-[#C9A96A]'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-[#C9A96A]" />
        {isDragActive ? (
          <p className="text-[#1C1A17] font-medium">Drop files here...</p>
        ) : (
          <div>
            <p className="text-[#1C1A17] font-medium mb-1">
              Drag & drop files here, or click to select
            </p>
            <p className="text-sm text-[#7A6E60]">
              PDF, images up to {(maxSize / 1024 / 1024).toFixed(0)}MB
            </p>
          </div>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-[#1C1A17]">Selected Files ({files.length})</h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-[#F6F2EC] rounded-lg"
            >
              {file.preview ? (
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-[#E8E1D7] rounded flex items-center justify-center">
                  <File className="w-6 h-6 text-[#7A6E60]" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1C1A17] truncate">{file.name}</p>
                <p className="text-xs text-[#7A6E60]">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-2 hover:bg-[#E8E1D7] rounded-lg transition"
              >
                <X className="w-4 h-4 text-[#7A6E60]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <button
          onClick={uploadFiles}
          disabled={uploading}
          className="w-full lux-button disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : `Upload ${files.length} File(s)`}
        </button>
      )}
    </div>
  );
}
