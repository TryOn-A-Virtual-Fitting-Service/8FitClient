import React, { forwardRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ onFileSelect }, ref) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    };

    return (
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    );
  }
);

export default FileUpload;