import { Trash2, FileText } from "lucide-react";

interface FileItem {
  filename: string;
  size: number;
}

interface FileListProps {
  files: FileItem[];
  onDelete: (filename: string) => void;
}

export default function FileList({
  files,
  onDelete,
}: FileListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Uploaded Documents
      </h2>

      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.filename}
            className="flex items-center justify-between bg-slate-800 rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <FileText className="text-cyan-400" size={28} />

              <div>
                <p className="font-semibold">
                  {file.filename}
                </p>

                <p className="text-slate-400 text-sm">
                  {file.size} KB
                </p>
              </div>
            </div>

            <button
              onClick={() => onDelete(file.filename)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}