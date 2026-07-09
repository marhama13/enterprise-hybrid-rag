import MainLayout from "../layouts/MainLayout";
import ChatBox from "../components/chat/ChatBox";

export default function Chat() {
  return (
    <MainLayout>
      <div className="h-full flex flex-col">

        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            AI Chat
          </h1>

          <p className="text-slate-400 mt-2">
            Ask questions about your uploaded documents.
          </p>
        </div>

        <div className="flex-1">
          <ChatBox />
        </div>

      </div>
    </MainLayout>
  );
}