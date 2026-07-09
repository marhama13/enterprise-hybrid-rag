import { useState } from "react";
interface Props {
    onSend: (message: string) => void;
    loading: boolean;
}

export default function ChatInput({
    onSend,
    loading,
}: Props) {

  const [text, setText] = useState("");

  const submit = () => {

    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (

    <div className="border-t border-slate-800 p-4">

      <div className="flex gap-3">

        <input

          disabled={loading}
          value={text}


          onChange={(e)=>setText(e.target.value)}

          onKeyDown={(e)=>{

            if(e.key==="Enter") submit();

          }}

          className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"

          placeholder="Ask anything..."
        />

        <button

          onClick={submit}

            disabled={loading}

            className={`px-6 rounded-lg text-white transition ${
                loading
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-500"
            }`}
        >
          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

    </div>

  );

}