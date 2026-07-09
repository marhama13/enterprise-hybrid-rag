import { FileText } from "lucide-react";

interface Props {
  source: {
    document: string;
    page: number;
    chunk: number;
  };
}

export default function CitationCard({ source }: Props) {
  return (
    <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800 p-3">

      <div className="flex items-center gap-2">

        <FileText
          size={18}
          className="text-cyan-400"
        />

        <div>

          <p className="text-sm font-semibold">
            {source.document}
          </p>

          <p className="text-xs text-slate-400">
            Page {source.page} • Chunk {source.chunk}
          </p>

        </div>

      </div>

    </div>
  );
}