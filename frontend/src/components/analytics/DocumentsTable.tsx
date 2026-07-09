interface DocumentDetail {
  document: string;
  chunks: number;
}

interface Props {
  documents: DocumentDetail[];
}

export default function DocumentsTable({
  documents,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Uploaded Documents
      </h2>

      <div className="space-y-4">

        {documents.map((doc) => (

          <div
            key={doc.document}
            className="flex justify-between border-b border-slate-800 pb-3"
          >

            <span>{doc.document}</span>

            <span className="text-cyan-400">
              {doc.chunks} chunks
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}