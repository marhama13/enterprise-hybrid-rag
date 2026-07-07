import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { uploadPDF } from "../../services/upload";

export default function UploadBox() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log("Dropped!", acceptedFiles);

    if (acceptedFiles.length === 0) {
      console.log("No valid PDF detected.");
      return;
    }

    const file = acceptedFiles[0];

    setUploading(true);
    setMessage("");
    setFileName("");

    try {
      const response = await uploadPDF(file);

      setFileName(response.filename);
      setMessage(response.message);
    } catch (err) {
      console.error(err);
      setMessage("Upload Failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const {
  getRootProps,
  getInputProps,
  isDragActive,
  isDragReject,
} = useDropzone({
  multiple: false,
  maxSize: 20 * 1024 * 1024,

  accept: {
    "application/pdf": [".pdf"],
  },

  onDrop: (acceptedFiles, rejectedFiles) => {
    console.log("Accepted:", acceptedFiles);
    console.log("Rejected:", rejectedFiles);

    if (acceptedFiles.length > 0) {
      onDrop(acceptedFiles);
    }
  },
});

  return (
    <div className="space-y-6">

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-300

        ${
          isDragReject
            ? "border-red-500 bg-red-900/20"
            : isDragActive
            ? "border-cyan-400 bg-slate-800"
            : "border-slate-700 bg-slate-900 hover:border-cyan-400"
        }`}
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={70}
          className="mx-auto text-cyan-400 mb-6"
        />

        <h2 className="text-3xl font-semibold">
          {isDragActive
            ? "Drop the PDF here"
            : "Drag & Drop your PDF here"}
        </h2>

        <p className="text-slate-400 mt-4">
          or click to browse files
        </p>

        <div className="mt-8 text-sm text-slate-500">
          Maximum Size: 20 MB
        </div>

        <div className="text-sm text-slate-500">
          Only PDF files are supported
        </div>
      </div>

      {uploading && (
        <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-4 border border-cyan-600">
          <Loader2 className="animate-spin text-cyan-400" />
          <span>Uploading PDF...</span>
        </div>
      )}

      {!uploading && message === "Upload Successful" && (
        <div className="flex items-center gap-3 rounded-lg border border-green-700 bg-green-900/20 p-4">
          <CheckCircle className="text-green-400" />

          <div>
            <p className="font-semibold text-green-400">
              Upload Successful
            </p>

            <p className="text-slate-300">
              {fileName}
            </p>
          </div>
        </div>
      )}

      {!uploading && message === "Upload Failed" && (
        <div className="flex items-center gap-3 rounded-lg border border-red-700 bg-red-900/20 p-4">
          <AlertCircle className="text-red-400" />

          <div>
            <p className="font-semibold text-red-400">
              Upload Failed
            </p>

            <p className="text-slate-300">
              Please try again.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}