import { UploadCloud, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Document {
  document: string;
  chunks: number;
}

interface Props {
  documents: Document[];
}

export default function ActivityCard({ documents }: Props) {

  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Recent Documents
      </h2>

      {documents.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-10">

          <UploadCloud
            size={60}
            className="text-cyan-400 mb-4"
          />

          <h3 className="text-lg font-semibold">
            No documents uploaded
          </h3>

          <p className="text-slate-400 mt-2 text-center">
            Upload your first PDF to start chatting with your documents.
          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-6 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-lg transition"
          >
            Upload Document
          </button>

        </div>

      ) : (

        <div className="space-y-4">

          {documents.map((doc) => (

            <div
              key={doc.document}
              className="flex justify-between items-center border-b border-slate-800 pb-4"
            >

              <div className="flex items-center gap-3">

                <FileText className="text-cyan-400" />

                <div>

                  <p className="font-medium">
                    {doc.document}.pdf
                  </p>

                  <p className="text-sm text-slate-400">
                    {doc.chunks} chunks
                  </p>

                </div>

              </div>

            </div>

          ))}

          <button
            onClick={() => navigate("/upload")}
            className="mt-4 bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded-lg transition"
          >
            Upload More Documents
          </button>

        </div>

      )}

    </div>
  );
}