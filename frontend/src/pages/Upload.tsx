import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import UploadBox from "../components/upload/UploadBox";
import FileList from "../components/upload/FileList";

import { getFiles, deleteFile } from "../services/upload";

interface UploadedFile {
  filename: string;
  size: number;
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const loadFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDelete = async (filename: string) => {
    try {
      await deleteFile(filename);
      loadFiles();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Upload Documents
          </h1>

          <p className="text-slate-400 mt-2">
            Upload PDF documents to build your knowledge base.
          </p>
        </div>

        <UploadBox />

        <FileList
          files={files}
          onDelete={handleDelete}
        />

      </div>
    </MainLayout>
  );
}